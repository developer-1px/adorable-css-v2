const { 
  generateFontCalc,
  isToken,
  startTokenCollection,
  stopTokenCollection,
  generateUsedTokensCSS
} = require('./dist/index.js');

console.log('Testing Font Token Generation');
console.log('=============================\n');

// Test isToken function
console.log('1. Token validation:');
console.log('isToken("2xl", "font"):', isToken('2xl', 'font'));
console.log('isToken("3xl", "font"):', isToken('3xl', 'font'));
console.log('isToken("md", "font"):', isToken('md', 'font'));
console.log('isToken("invalid", "font"):', isToken('invalid', 'font'));

// Start collecting tokens
startTokenCollection();

// Generate font tokens
console.log('\n2. Font token generation:');
console.log('font(md):', generateFontCalc('md'));
console.log('font(2xl):', generateFontCalc('2xl'));
console.log('font(3xl):', generateFontCalc('3xl'));
console.log('font(10xl):', generateFontCalc('10xl'));

// Stop and generate CSS
stopTokenCollection();

console.log('\n3. Generated CSS:');
console.log(generateUsedTokensCSS());