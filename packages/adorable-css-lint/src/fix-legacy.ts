
import { readFileSync, writeFileSync } from 'fs';
import fg from 'fast-glob';

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
        let newContent = content;

        // Fix duration-500 -> duration(500ms)
        newContent = newContent.replace(/\bduration-(\d+)/g, (match, val) => {
            totalReplacements++;
            return `duration(${val}ms)`;
        });

        // Fix min-h-screen -> min-h(screen)
        newContent = newContent.replace(/\bmin-h-screen\b/g, () => {
            totalReplacements++;
            return 'min-h(screen)';
        });

        // Fix scroll-smooth -> scroll(smooth)
        newContent = newContent.replace(/\bscroll-smooth\b/g, () => {
            totalReplacements++;
            return 'scroll(smooth)';
        });

        // Fix text-align(center) -> text(center)
        newContent = newContent.replace(/\btext-align\(([^)]+)\)/g, (match, val) => {
            totalReplacements++;
            return `text(${val})`;
        });

        // Fix radius(lg) -> r(lg)
        newContent = newContent.replace(/\bradius\(([^)]+)\)/g, (match, val) => {
            totalReplacements++;
            return `r(${val})`;
        });

        // Fix aspect-square -> aspect(square)
        newContent = newContent.replace(/\baspect-(square|video)\b/g, (match, val) => {
            totalReplacements++;
            return `aspect(${val})`;
        });

        // Fix object-cover -> object(cover)
        newContent = newContent.replace(/\bobject-(cover|contain|fill|none|scale-down)\b/g, (match, val) => {
            totalReplacements++;
            return `object(${val})`;
        });

        if (newContent !== content) {
            console.log(`✏️  Modified: ${file}`);
            writeFileSync(file, newContent);
        }
    }

    console.log(`✨ Done! Fixed ${totalReplacements} legacy/unknown values.`);
}

main();
