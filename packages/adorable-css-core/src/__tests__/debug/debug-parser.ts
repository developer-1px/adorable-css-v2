import { parseAdorableCSS } from '../parser/parser';
import { generateCSS } from '../index';

// Test parsing
console.log('Parse c(white):', JSON.stringify(parseAdorableCSS('c(white)'), null, 2));
console.log('Parse c(white.8):', JSON.stringify(parseAdorableCSS('c(white.8)'), null, 2));
console.log('Parse bg(white.2):', JSON.stringify(parseAdorableCSS('bg(white.2)'), null, 2));
console.log('Parse 700:', JSON.stringify(parseAdorableCSS('700'), null, 2));

// Test CSS generation
console.log('\nCSS Generation:');
console.log('c(white):', generateCSS(['c(white)']));
console.log('c(white.8):', generateCSS(['c(white.8)']));
console.log('bg(white.2):', generateCSS(['bg(white.2)']));
console.log('700:', generateCSS(['700']));