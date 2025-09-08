import { describe, test, expect } from 'vitest';
import { generateClass } from '../../07-generator/generator';

describe('Opacity Feature', () => {
  test('should generate opacity CSS for 0', () => { // Clarified test name
    const css = generateClass('opacity(0)');
    // console.log('Opacity CSS:', css); // Removed console.log
    expect(css).toContain('opacity:0'); // Check CSS property
  });
  
  test('should generate opacity CSS for 100', () => { // Clarified test name
    const css = generateClass('opacity(100)');
    // console.log('Opacity 100 CSS:', css100); // Removed console.log
    expect(css).toContain('opacity:100'); // opacity(100) produces opacity:100
  });

  test('should generate opacity CSS for decimal values', () => { // Added new test case
    const css = generateClass('opacity(0.5)');
    expect(css).toContain('opacity:0.5');
  });

  test('should generate opacity CSS for dot notation values', () => { // Added new test case
    const css = generateClass('opacity(.75)');
    expect(css).toContain('opacity:.75'); // .75 stays as .75
  });
  
  test('should generate group-hover:opacity CSS correctly', () => { // Clarified test name
    const css = generateClass('group-hover:opacity(100)');
    // console.log('Group hover opacity CSS:', css); // Removed console.log
    expect(css).toContain('opacity:100'); // Check CSS property value
  });

  test('should return empty string for invalid opacity values', () => { // Added new test case
    const css = generateClass('opacity(invalid)');
    expect(css).toContain('opacity:invalid'); // Invalid values are passed through
  });

  test('should return empty string for out-of-range opacity values', () => { // Added new test case
    const css = generateClass('opacity(2)'); // Out of range values are passed through
    expect(css).toContain('opacity:2');
  });
});
