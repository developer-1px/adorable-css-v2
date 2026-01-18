#!/usr/bin/env node
import { generateCSSFromAdorableCSS } from 'adorable-css';
import glob from 'fast-glob';
import fs from 'node:fs/promises';
import { resolve } from 'node:path';
import picocolors from 'picocolors';

const { red, green, yellow, gray, bold } = picocolors;

async function main() {
    const args = process.argv.slice(2);
    const cssFlagIndex = args.indexOf('--css');
    let showCss = false;

    if (cssFlagIndex !== -1) {
        showCss = true;
        args.splice(cssFlagIndex, 1);
    }

    const pattern = args[0] || "**/*.{ts,tsx,html,jsx}";

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

    // Strict Unitless Check
    function checkUnitless(cls: string): string | null {
        // Target spacing/sizing rules: p, m, gap, w, h, min-w, max-w, top, bottom, left, right
        // Pattern: rule + optional direction + ( + number + )
        // We want to catch cases like p(10) but allow p(10px) or p(md) or p(0)

        // Match rule(number) or rule(number.number)
        const match = cls.match(/^(p|m|gap|[wh]|min-[wh]|max-[wh]|top|bottom|left|right)[xytblr]?\((\d+(\.\d+)?)\)$/);

        if (match) {
            const value = parseFloat(match[2]);
            if (value !== 0) {
                return `❌ Unitless value forbidden. You must strictly specify a unit (e.g. ${match[1]}(${match[2]}px)) or use a token.`;
            }
        }
        return null;
    }

    function getLineNumber(content: string, index: number): number {
        return content.substring(0, index).split('\n').length;
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

    // For CSS Output
    interface ClassGroup {
        file: string;
        line: number;
        originalAttribute: string;
        css: string;
    }
    const cssGroups: ClassGroup[] = [];

    for (const file of files) {
        const content = await fs.readFile(file, 'utf-8');

        // Simple regex for class extraction. 
        // Matches class="...", className="...", class: "...", etc.
        const classMatches = content.matchAll(/(?:class|className)\s*[:=]\s*["']([^"']+)["']/g);
        // Also support template literals inside braces? e.g. className={`...`} - simple regex won't catch complex cases but good for MVP.
        const complexMatches = content.matchAll(/(?:class|className)\s*[:=]\s*\{`([^`]+)`\}/g);

        const processMatch = (match: RegExpMatchArray) => {
            const classString = match[1];
            const index = match.index || 0;
            const line = getLineNumber(content, index);
            const classesInGroup = new Set<string>();
            let groupCss = "";

            classString.split(/\s+/).forEach(c => {
                if (c.trim()) classesInGroup.add(c);
            });

            // Validate individual classes
            for (const cls of classesInGroup) {
                if (!cls.trim()) continue;
                if (cls.includes("${")) continue; // dynamic interpolation

                // Custom Suggestions
                if (SUGGESTIONS[cls]) {
                    if (!unknownClasses.has(cls)) {
                        unknownClasses.set(cls, []);
                    }
                    unknownClasses.get(cls)?.push(file);
                    continue;
                }

                // Legacy
                const legacyMsg = checkLegacySyntax(cls);
                if (legacyMsg) {
                    if (!customIssues.has(cls)) {
                        customIssues.set(cls, { files: [], reason: legacyMsg });
                    }
                    customIssues.get(cls)?.files.push(file);
                    continue;
                }

                // Strict Unitless Check
                const unitlessMsg = checkUnitless(cls);
                if (unitlessMsg) {
                    if (!customIssues.has(cls)) {
                        customIssues.set(cls, { files: [], reason: unitlessMsg });
                    }
                    customIssues.get(cls)?.files.push(file);
                    continue;
                }

                // Check Validity & Generate CSS
                const originalWarn = console.warn;
                console.warn = () => { };

                try {
                    const css = generateCSSFromAdorableCSS(cls);
                    if (!css) {
                        if (!unknownClasses.has(cls)) {
                            unknownClasses.set(cls, []);
                        }
                        unknownClasses.get(cls)?.push(file);
                    } else if (showCss) {
                        // Append to group CSS
                        // We generated it again here, but that's fine for now.
                        // Or we could try to format it nicely.
                        // For grouping, let's just append the full rule.
                        groupCss += css + "\n";
                    }
                } catch (e) {
                    if (!unknownClasses.has(cls)) {
                        unknownClasses.set(cls, []);
                    }
                    unknownClasses.get(cls)?.push(file);
                } finally {
                    console.warn = originalWarn;
                }
            }

            if (showCss && groupCss.trim()) {
                cssGroups.push({
                    file,
                    line,
                    originalAttribute: classString,
                    css: groupCss.trim()
                });
            }
        };

        for (const match of classMatches) processMatch(match);
        for (const match of complexMatches) processMatch(match);
    }

    // Report Logic
    if (unknownClasses.size === 0 && customIssues.size === 0) {
        if (!showCss) console.log(green("\n✨ All AdorableCSS classes are valid!"));
    } else {
        const totalIssues = unknownClasses.size + customIssues.size;
        console.log(red(`\n❌ Found ${totalIssues} issues:\n`));

        // Report Unknown
        for (const [cls, fileList] of unknownClasses.entries()) {
            if (SUGGESTIONS[cls]) {
                console.log(`${yellow("⚠")} ${bold(cls)}`);
                console.log(yellow(`  -> ${SUGGESTIONS[cls]}`));
            } else {
                console.log(`${red("✖")} ${bold(cls)}`);
            }
            printFiles(fileList);
        }

        // Report Custom
        for (const [cls, issue] of customIssues.entries()) {
            console.log(`${yellow("⚠")} ${bold(cls)}`);
            console.log(yellow(`  -> ${issue.reason}`));
            printFiles(issue.files);
        }

        if (!showCss) process.exit(1);
    }

    if (showCss) {
        console.log(green(`\n🎨 Generated CSS Groups:\n`));

        // Sort by file and line
        cssGroups.sort((a, b) => {
            if (a.file === b.file) return a.line - b.line;
            return a.file.localeCompare(b.file);
        });

        for (const group of cssGroups) {
            const rel = group.file.replace(process.cwd() + '/', '');
            console.log(gray(`/* ${rel}:${group.line} */`));
            console.log(gray(`/* class="${group.originalAttribute}" */`));
            console.log(`${group.css}\n`);
        }
    }

    if ((unknownClasses.size > 0 || customIssues.size > 0) && !showCss) {
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
