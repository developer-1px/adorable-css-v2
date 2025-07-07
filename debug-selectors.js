import { generateCSS } from './packages/adorable-css/dist/index.mjs';

console.log('=== Prose Selector Debug ===');

// Test prose component
const proseCSS = generateCSS(['prose(docs)']);
console.log('Generated CSS length:', proseCSS.length);

// Check if selectors are actually in the CSS
const hasH1Selector = proseCSS.includes('.prose\\(docs\\) h1') || proseCSS.includes('& h1');
const hasH2Selector = proseCSS.includes('.prose\\(docs\\) h2') || proseCSS.includes('& h2');
const hasBlockquoteSelector = proseCSS.includes('.prose\\(docs\\) blockquote') || proseCSS.includes('& blockquote');

console.log('Contains h1 selector:', hasH1Selector);
console.log('Contains h2 selector:', hasH2Selector);
console.log('Contains blockquote selector:', hasBlockquoteSelector);

// Show a sample of the actual CSS to see what's being generated
console.log('\n=== First 2000 characters of CSS ===');
console.log(proseCSS.substring(0, 2000));

console.log('\n=== Last 2000 characters of CSS ===');
console.log(proseCSS.substring(proseCSS.length - 2000));

// Search for any h1 occurrences
const h1Matches = proseCSS.match(/h1/g);
console.log('\nTotal h1 mentions in CSS:', h1Matches ? h1Matches.length : 0);

// Search for specific selectors
if (proseCSS.includes('h1')) {
  const h1Index = proseCSS.indexOf('h1');
  console.log('Context around first h1 mention:');
  console.log(proseCSS.substring(h1Index - 100, h1Index + 100));
}