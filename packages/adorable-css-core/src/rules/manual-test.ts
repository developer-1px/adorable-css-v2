import { generateCSS } from '../index';

// Test 700 font weight
console.log('Test 700:', generateCSS(['700']));
console.log('Test bold:', generateCSS(['bold']));

// Test color with opacity
console.log('Test c(white.8):', generateCSS(['c(white.8)']));
console.log('Test c(white):', generateCSS(['c(white)']));
console.log('Test c(#fff.8):', generateCSS(['c(#fff.8)']));

// Test background with opacity
console.log('Test bg(white.2):', generateCSS(['bg(white.2)']));
console.log('Test bg(white):', generateCSS(['bg(white)']));
console.log('Test bg(#fff.2):', generateCSS(['bg(#fff.2)']));