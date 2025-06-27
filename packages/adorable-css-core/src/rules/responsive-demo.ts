// Demo script to test responsive functionality
import { generateCSS } from '../parser/generator';

console.log('=== Responsive CSS Demo ===\n');

console.log('1. Basic responsive classes:');
const basicResponsive = [
  'hidden',           // Normal class
  'md:hidden',       // Hide on medium screens and up
  '..lg:block',      // Show as block up to large screens
  'xl:hbox(middle)', // Horizontal box on extra large screens
];

console.log('Classes:', basicResponsive.join(', '));
console.log('Generated CSS:');
console.log(generateCSS(basicResponsive));
console.log('\n');

console.log('2. Complex layout responsive classes:');
const layoutResponsive = [
  'vbox(pack)',           // Default: vertical centered
  'md:hbox(middle+between)', // Medium+: horizontal with space between
  '..sm:p(sm)',          // Small and below: small padding
  'lg:p(xl)',            // Large+: extra large padding
];

console.log('Classes:', layoutResponsive.join(', '));
console.log('Generated CSS:');
console.log(generateCSS(layoutResponsive));
console.log('\n');

console.log('3. All breakpoint variations:');
const allBreakpoints = [
  'sm:hidden',
  'md:block', 
  'lg:hbox',
  'xl:vbox',
  '2xl:flex',
  '..sm:p(sm)',
  '..md:p(md)',
  '..lg:p(lg)',
];

console.log('Classes:', allBreakpoints.join(', '));
console.log('Generated CSS:');
console.log(generateCSS(allBreakpoints));
console.log('\n');

console.log('4. Mixed responsive and flexbox with nested selectors:');
const mixedClasses = [
  'hbox(middle)',       // Always horizontal with middle alignment
  'md:gap(lg)',        // Large gap on medium+ screens  
  '..sm:vbox(pack)',   // Vertical centered layout on small screens
];

console.log('Classes:', mixedClasses.join(', '));
console.log('Generated CSS:');
console.log(generateCSS(mixedClasses));

console.log('\n=== Demo Complete ===');