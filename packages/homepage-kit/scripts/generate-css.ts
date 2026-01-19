// @ts-nocheck
import { generateCSS } from 'adorable-css';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../src');
const outputFile = path.resolve(__dirname, '../static/initial.css');

// Recursive function to get files
function getFiles(dir, files = []) {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
        const name = `${dir}/${file}`;
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files);
        } else {
            files.push(name);
        }
    }
    return files;
}

console.log('Scanning for AdorableCSS usage...');

// Get all svelte and ts files
const files = getFiles(rootDir).filter(file =>
    file.endsWith('.svelte') || file.endsWith('.ts') || file.endsWith('.html') || file.endsWith('.md')
);

// Read content and concatenate
let allContent = '';
for (const file of files) {
    allContent += fs.readFileSync(file, 'utf-8') + '\n';
}

console.log(`Scanned ${files.length} files. Generating CSS...`);

// Generate CSS
const css = generateCSS(allContent);

fs.writeFileSync(outputFile, css);

console.log(`CSS generated at: ${outputFile}`);
