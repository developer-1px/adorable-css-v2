// Manual test to see warning output in console
import { generateCSS } from '../parser/generator';

console.log('=== AdorableCSS Warning System Test ===\n');

console.log('1. Testing missing rule handlers:');
generateCSS(['nonexistent-rule', 'fake-class', 'typo-error']);

console.log('\n2. Testing mixed valid and invalid rules:');
generateCSS(['hbox', 'missing-rule', 'vbox', 'another-fake']);

console.log('\n3. Testing header layout classes with some typos:');
generateCSS([
  'hbox(middle) gap(auto)', // valid
  'container(6xl)',       // valid
  'py(lg)',              // valid
  'px(xl)',              // valid
  'some-typo',           // invalid
  'another-missing'      // invalid
]);

console.log('\n4. Testing potentially problematic classes:');
generateCSS(['animate-in', 'fade-up', 'transition-slow', 'custom-property']);

console.log('\n=== Test Complete ===');