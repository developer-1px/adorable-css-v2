import { describe, it, expect } from 'vitest';
import { generateClass } from '../../core/parser/generator';
import { makeColor } from '../../../03-values/makeValue';

describe('Gradient Bug Debug', () => {
  it('should handle c(135deg/purple-500..pink-500) correctly', () => {
    const css = generateClass('c(135deg/purple-500..pink-500)');
    console.log('Generated CSS:', css);
    
    // Should NOT contain rgb(135deg/purple-500)
    expect(css).not.toContain('rgb(135deg/purple-500)');
    
    // Should contain proper gradient
    expect(css).toContain('linear-gradient(135deg');
    expect(css).toContain('#a855f7'); // purple-500 (actual value)
    expect(css).toContain('#ec4899'); // pink-500
    
    // Should contain text gradient properties
    expect(css).toContain('-webkit-background-clip:text');
    expect(css).toContain('-webkit-text-fill-color:transparent');
  });

  it('should debug the parsing process', () => {
    const input = '135deg/purple-500..pink-500';
    console.log('Input:', input);
    
    const [angleOrDirection, colors] = input.split('/');
    console.log('Angle/Direction:', angleOrDirection);
    console.log('Colors part:', colors);
    
    if (colors) {
      const colorArray = colors.split('..');
      console.log('Color array:', colorArray);
      
      // Test each color individually
      colorArray.forEach((color, index) => {
        console.log(`Color ${index}: "${color.trim()}" -> ${makeColor(color.trim())}`);
      });
      
      // Test the colorList generation
      const colorList = colors.split('..').map(color => makeColor(color.trim())).join(', ');
      console.log('Generated colorList:', colorList);
    }
    
    // Test the actual generation
    const css = generateClass('c(135deg/purple-500..pink-500)');
    console.log('Full CSS output:', css);
  });
});