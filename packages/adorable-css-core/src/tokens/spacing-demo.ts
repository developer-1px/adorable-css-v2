// Demo script to show the new compact spacing values
import { generateCSS } from '../parser/generator';
import { generateTokenCSS } from './index';

console.log('=== New Compact Spacing Demo ===\n');

console.log('1. Updated spacing scale:');
console.log('xs: 2px  (0.125rem) - minimal spacing');
console.log('sm: 4px  (0.25rem)  - very tight spacing');
console.log('md: 8px  (0.5rem)   - default spacing');
console.log('lg: 12px (0.75rem)  - comfortable spacing');
console.log('xl: 16px (1rem)     - large spacing');
console.log('2xl: 20px (1.25rem) - extra large');
console.log('3xl: 24px (1.5rem)  - section spacing');
console.log('4xl: 32px (2rem)    - large section spacing');
console.log('5xl: 40px (2.5rem)  - hero spacing\n');

console.log('2. CSS Variables generated:');
const tokenCSS = generateTokenCSS();
const spacingLines = tokenCSS.split('\n').filter(line => line.includes('--spacing-'));
spacingLines.forEach(line => console.log('  ' + line.trim()));
console.log('\n');

console.log('3. CSS generation with new spacing:');
const paddingClasses = [
  'p(xs)',   // 2px padding
  'p(sm)',   // 4px padding
  'p(md)',   // 8px padding
  'p(lg)',   // 12px padding
  'p(xl)',   // 16px padding
];

console.log('Padding classes:', paddingClasses.join(', '));
console.log('Generated CSS:');
console.log(generateCSS(paddingClasses));
console.log('\n');

console.log('4. Gap with new compact spacing:');
const gapClasses = [
  'gap(xs)',   // 2px gap
  'gap(sm)',   // 4px gap  
  'gap(md)',   // 8px gap
  'gap(lg)',   // 12px gap
  'gap(xl)',   // 16px gap
];

console.log('Gap classes:', gapClasses.join(', '));
console.log('Generated CSS:');
console.log(generateCSS(gapClasses));
console.log('\n');

console.log('5. Responsive spacing with new values:');
const responsiveSpacing = [
  'p(sm)',          // 4px base padding
  'md:p(md)',       // 8px on medium+
  'lg:p(lg)',       // 12px on large+
  'xl:p(xl)',       // 16px on extra large+
];

console.log('Responsive spacing classes:', responsiveSpacing.join(', '));
console.log('Generated CSS:');
console.log(generateCSS(responsiveSpacing));

console.log('\n=== Demo Complete ===');