import { describe, test, expect } from 'vitest';
import { generateCSSFromAdorableCSS } from '../01-core/generators/generator';

describe('Opacity Feature', () => {
  test('should generate opacity CSS for 0', () => { // Clarified test name
    const css = generateCSSFromAdorableCSS('opacity(0)');
    // console.log('Opacity CSS:', css); // Removed console.log
    expect(css).toContain('.opacity\(0\){opacity:0}'); // Full selector check
  });
  
  test('should generate opacity CSS for 100', () => { // Clarified test name
    const css = generateCSSFromAdorableCSS('opacity(100)');
    // console.log('Opacity 100 CSS:', css100); // Removed console.log
    expect(css).toContain('.opacity\(100\){opacity:1}'); // Should convert 100 to 1
  });

  test('should generate opacity CSS for decimal values', () => { // Added new test case
    const css = generateCSSFromAdorableCSS('opacity(0.5)');
    expect(css).toContain('.opacity\(0\.5\){opacity:0.5}');
  });

  test('should generate opacity CSS for dot notation values', () => { // Added new test case
    const css = generateCSSFromAdorableCSS('opacity(.75)');
    expect(css).toContain('.opacity\(.75\){opacity:0.75}'); // Should convert .75 to 0.75
  });
  
  test('should generate group-hover:opacity CSS correctly', () => { // Clarified test name
    const css = generateCSSFromAdorableCSS('group-hover:opacity(100)');
    // console.log('Group hover opacity CSS:', css); // Removed console.log
    expect(css).toContain('.group:hover .group-hover\:opacity\(100\){opacity:1}'); // Full selector and value
  });

  test('should return empty string for invalid opacity values', () => { // Added new test case
    const css = generateCSSFromAdorableCSS('opacity(invalid)');
    expect(css).toBe('');
  });

  test('should return empty string for out-of-range opacity values', () => { // Added new test case
    const css = generateCSSFromAdorableCSS('opacity(2)'); // Opacity should be between 0 and 1
    expect(css).toBe('');
  });
});
