import { makeColor } from '../values/makeValue';
import { rules } from './index';

// Test makeColor directly
console.log('makeColor("white"):', makeColor('white'));
console.log('makeColor("white.8"):', makeColor('white.8'));
console.log('makeColor("black.2"):', makeColor('black.2'));
console.log('makeColor("#fff.8"):', makeColor('#fff.8'));

// Test rule functions directly
if (rules.c && typeof rules.c === 'function') {
  console.log('\nc rule test:');
  console.log('c("white"):', rules.c('white'));
  console.log('c("white.8"):', rules.c('white.8'));
}

if (rules.bg && typeof rules.bg === 'function') {
  console.log('\nbg rule test:');
  console.log('bg("white"):', rules.bg('white'));
  console.log('bg("white.2"):', rules.bg('white.2'));
}

// Check if '700' rule exists
console.log('\n700 rule exists?', '700' in rules);
console.log('Rules that start with 7:', Object.keys(rules).filter(k => k.startsWith('7')));
console.log('Font weight rules:', Object.keys(rules).filter(k => k.match(/^\d{3}$/)));