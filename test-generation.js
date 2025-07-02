const { generateCSS } = require('./packages/adorable-css/dist/index.js');

const testClasses = [
  'hbox',
  'vbox', 
  'c(red)',
  'p(24)',
  'hover:bg(gray-100)',
  'lg:hidden'
];

console.log('Testing CSS generation...\n');
console.log(generateCSS(testClasses));