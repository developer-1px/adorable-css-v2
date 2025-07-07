import { generateCSS } from './packages/adorable-css/dist/index.mjs';

const css = generateCSS([
  'c(mute)',
  'bg(primary)',
  'c(mute-500)',
  'bg(mute-900)',
  'c(primary-600)',
  'bg(accent-300)'
]);

console.log('Generated CSS:');
console.log(css.slice(0, 1000)); // First 1000 chars to see token definitions