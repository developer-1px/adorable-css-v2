#!/usr/bin/env node
import { generateCSSFromAdorableCSS } from 'adorable-css';
import glob from 'fast-glob';
import fs from 'node:fs/promises';
import { resolve } from 'node:path';
import picocolors from 'picocolors';

const { red, green, yellow, gray, bold } = picocolors;

async function main() {
    const args = process.argv.slice(2);
    const pattern = args[0] || "**/*.{ts,tsx,html,jsx}";

    // Custom suggestions/deprecations
    const SUGGESTIONS: Record<string, string> = {
        "hbox(center)": "Use 'hbox(middle)' or just 'hbox' (default is middle). 'center' applies to justification (horizontal), which might be unintentional.",
        // Add more as needed
    };

    console.log(gray(`🔍 Scanning files matching: ${pattern}...`));

    const files = await glob(pattern, {
        ignore: ["**/node_modules/**", "**/dist/**", "**/.git/**"],
        cwd: process.cwd(),
        absolute: true
    });

    console.log(gray(`Found ${files.length} files.`));

    let totalErrors = 0;
    const unknownClasses = new Map<string, string[]>(); // class -> file[]

    for (const file of files) {
        const content = await fs.readFile(file, 'utf-8');

        // Simple regex for class extraction. 
        // Matches class="...", className="...", class: "...", etc.
        const classMatches = content.matchAll(/(?:class|className)\s*[:=]\s*["']([^"']+)["']/g);
        // Also support template literals inside braces? e.g. className={`...`} - simple regex won't catch complex cases but good for MVP.
        const complexMatches = content.matchAll(/(?:class|className)\s*[:=]\s*\{`([^`]+)`\}/g);

        const allClasses = new Set<string>();

        for (const match of classMatches) {
            match[1].split(/\s+/).forEach(c => allClasses.add(c));
        }
        for (const match of complexMatches) {
            match[1].split(/\s+/).forEach(c => allClasses.add(c));
        }

        // Special case for simple template strings usage like `bg-red-500 ${variable}` - we might capture parts.
        // Ideally we use a real parser or a smarter regex, but for "adorable-lint" MVP, regex is standard practice for tailwind-like linters initially.

        // Custom suggestions/deprecations (Moved to top)

        for (const cls of allClasses) {
            if (!cls.trim()) continue;
            if (cls.includes("${")) continue;

            // Check specific suggestions first
            if (SUGGESTIONS[cls]) {
                if (!unknownClasses.has(cls)) {
                    unknownClasses.set(cls, []);
                }
                unknownClasses.get(cls)?.push(file);
                // We can store a custom reason if we want, but for now let's just flag it.
                // The output logic assumes "unknown or invalid", we might want to distinguish.
                continue;
            }

            // Mute console.warn from adorable-css during check
            const originalWarn = console.warn;
            console.warn = () => { };

            try {
                const css = generateCSSFromAdorableCSS(cls);

                if (!css) {
                    if (!unknownClasses.has(cls)) {
                        unknownClasses.set(cls, []);
                    }
                    unknownClasses.get(cls)?.push(file);
                }
            } catch (e) {
                // ignore crash, treat as invalid
                if (!unknownClasses.has(cls)) {
                    unknownClasses.set(cls, []);
                }
                unknownClasses.get(cls)?.push(file);
            } finally {
                console.warn = originalWarn;
            }
        }
    }

    // Report
    if (unknownClasses.size === 0) {
        console.log(green("\n✨ All AdorableCSS classes are valid!"));
    } else {
        console.log(red(`\n❌ Found ${unknownClasses.size} unknown or invalid classes:\n`));

        for (const [cls, fileList] of unknownClasses.entries()) {
            if (SUGGESTIONS[cls]) {
                console.log(`${yellow("⚠")} ${bold(cls)}`);
                console.log(yellow(`  -> ${SUGGESTIONS[cls]}`));
            } else {
                console.log(`${red("✖")} ${bold(cls)}`);
            }

            // Show first 3 files
            fileList.slice(0, 3).forEach(f => {
                // Make path relative for readability
                const rel = f.replace(process.cwd() + '/', '');
                console.log(gray(`  at ${rel}`));
            });
            if (fileList.length > 3) {
                console.log(gray(`  ...and ${fileList.length - 3} more files`));
            }
            console.log("");
        }
        process.exit(1);
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
