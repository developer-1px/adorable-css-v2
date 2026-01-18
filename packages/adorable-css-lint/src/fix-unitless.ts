
import { readFileSync, writeFileSync } from 'fs';
import fg from 'fast-glob';

const tokenMap: Record<string, string> = {
    '4': 'xs',
    '8': 'sm',
    '12': 'md',
    '16': 'lg',
    '20': 'xl',
    '24': '2xl',
    '32': '3xl',
    '40': '4xl',
    '64': '6xl'
};

const RULES = ['p', 'm', 'gap', 'w', 'h', 'min-w', 'max-w', 'top', 'bottom', 'left', 'right', 'px', 'py', 'pl', 'pr', 'pt', 'pb', 'mx', 'my', 'ml', 'mr', 'mt', 'mb'];

// Create regex: \b(p|m|...)\s*\(\s*(\d+(\.\d+)?)\s*\)
const regex = new RegExp(`\\b(${RULES.join('|')})\\s*\\(\\s*(\\d+(?:\\.\\d+)?)\\s*\\)`, 'g');

async function main() {
    const args = process.argv.slice(2);
    const patterns = args.length > 0 ? args : ['**/*.{svelte,ts,tsx,html}'];

    console.log(`🔍 Scanning files matching: ${patterns.join(', ')}...`);

    const files = fg.globSync(patterns, {
        ignore: ['**/node_modules/**', '**/dist/**', '**/.git/**'],
        absolute: true
    });

    console.log(`Found ${files.length} files.`);

    let totalReplacements = 0;

    for (const file of files) {
        const content = readFileSync(file, 'utf-8');
        let hasChange = false;

        // Replace logic
        const newContent = content.replace(regex, (match, rule, value) => {
            if (value === '0') return match; // Allow 0

            const token = tokenMap[value];
            const newValue = token ? token : `${value}px`;

            hasChange = true;
            totalReplacements++;
            // console.log(`  Fixing ${match} -> ${rule}(${newValue}) in ${file}`);
            return `${rule}(${newValue})`;
        });

        if (hasChange) {
            console.log(`✏️  Modified: ${file}`);
            writeFileSync(file, newContent);
        }
    }

    console.log(`✨ Done! Fixed ${totalReplacements} unitless values.`);
}

main();
