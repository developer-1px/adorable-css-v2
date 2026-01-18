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
    // Custom suggestions/deprecations
    const SUGGESTIONS: Record<string, string> = {
        // "hbox(center)": "...", // Removed as per user request (it is valid)
    };

    // Dynamic legacy checks
    function checkLegacySyntax(cls: string): string | null {
        const durationMatch = cls.match(/^duration-(\d+)$/);
        if (durationMatch) {
            return `Legacy syntax detected. Use functional syntax: duration(${durationMatch[1]}ms)`;
        }
        // Add more legacy checks here (e.g. tracking-wide -> tracking(wide))
        if (cls === 'tracking-wide') return "Legacy syntax. Use tracking(wide)";
        if (cls === 'tracking-widest') return "Legacy syntax. Use tracking(widest)";
        return null;
    }

    const customIssues = new Map<string, { files: string[], reason: string }>();

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
                continue;
            }

            // Check for legacy syntax (dynamic)
            const legacyMsg = checkLegacySyntax(cls);
            if (legacyMsg) {
                if (!unknownClasses.has(cls)) {
                    // Store the warning message in a map or repurpose unknownClasses to store reason?
                    // For MVP, we'll just log it as an "invalid" class but maybe print the reason in a separate map if we refactored.
                    // But looking at existing code: unknownClasses is Map<string, string[]>.
                    // To support custom messages without refactoring everything, let's inject it into SUGGESTIONS dynamically?
                    // No, SUGGESTIONS is const.
                    // Let's just treat it as valid but warn? OR treat as invalid.
                    // User wants it to Warn. 
                    // Let's modify the report section to handle a new `warnings` map.
                    // But to minimize changes, let's hack it: add to SUGGESTIONS dynamically if possible? No.
                    // Let's just create a new map for custom issues.
                    if (!customIssues.has(cls)) {
                        customIssues.set(cls, { files: [], reason: legacyMsg });
                    }
                    customIssues.get(cls)?.files.push(file);
                }
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
    if (unknownClasses.size === 0 && customIssues.size === 0) {
        console.log(green("\n✨ All AdorableCSS classes are valid!"));
    } else {
        const totalIssues = unknownClasses.size + customIssues.size;
        console.log(red(`\n❌ Found ${totalIssues} issues:\n`));

        // Report Unknown/Invalid
        for (const [cls, fileList] of unknownClasses.entries()) {
            if (SUGGESTIONS[cls]) {
                console.log(`${yellow("⚠")} ${bold(cls)}`);
                console.log(yellow(`  -> ${SUGGESTIONS[cls]}`));
            } else {
                console.log(`${red("✖")} ${bold(cls)}`);
            }
            printFiles(fileList);
        }

        // Report Custom Issues (Legacy etc)
        for (const [cls, issue] of customIssues.entries()) {
            console.log(`${yellow("⚠")} ${bold(cls)}`);
            console.log(yellow(`  -> ${issue.reason}`));
            printFiles(issue.files);
        }

        process.exit(1);
    }
}

function printFiles(fileList: string[]) {
    fileList.slice(0, 3).forEach(f => {
        const rel = f.replace(process.cwd() + '/', '');
        console.log(gray(`  at ${rel}`));
    });
    if (fileList.length > 3) {
        console.log(gray(`  ...and ${fileList.length - 3} more files`));
    }
    console.log("");
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
