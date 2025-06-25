import { generateCSSFromAdorableCSS, parseAdorableCSS } from './packages/adorable-css-core/src/parser/index.js';
import { getRuleHandler } from './packages/adorable-css-core/src/rules/index.js';

console.log('=== Testing layer parsing ===');

// Test cases
const testCases = ['layer', 'layer()', 'layer(fill)', 'layer(center)', 'layer(top:20+left:30)'];

testCases.forEach(testCase => {
  console.log(`\nTesting: "${testCase}"`);
  
  // Parse
  try {
    const parsed = parseAdorableCSS(testCase);
    console.log('Parsed:', JSON.stringify(parsed, null, 2));
  } catch (e) {
    console.log('Parse error:', e.message);
  }
  
  // Generate CSS
  const css = generateCSSFromAdorableCSS(testCase);
  console.log('Generated CSS:', css);
  
  // Direct handler test
  const handler = getRuleHandler('layer');
  if (handler) {
    console.log('Direct handler("") result:', handler(""));
    console.log('Direct handler("fill") result:', handler("fill"));
    console.log('Direct handler() result:', handler());
  }
});