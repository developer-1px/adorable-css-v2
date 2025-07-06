import { describe, it, expect } from 'vitest';
import { generateCSS } from '../index';

describe('overscroll-behavior rule', () => {
  it('should generate overscroll-behavior CSS for contain', () => {
    const css = generateCSS(['overscroll-behavior(contain)']);
    expect(css).toContain('.overscroll-behavior\(contain\){overscroll-behavior:contain}'); // Full selector check
  });

  it('should generate overscroll-behavior-x CSS for x-contain', () => { // Clarified test name
    const css = generateCSS(['overscroll-behavior(x-contain)']);
    expect(css).toContain('.overscroll-behavior\(x-contain\){overscroll-behavior-x:contain}'); // Full selector check
  });

  it('should generate overscroll-behavior-y CSS for y-none', () => { // Clarified test name
    const css = generateCSS(['overscroll-behavior(y-none)']);
    expect(css).toContain('.overscroll-behavior\(y-none\){overscroll-behavior-y:none}'); // Full selector check
  });

  it('should handle all valid values for overscroll-behavior', () => { // Clarified test name
    const autoCSS = generateCSS(['overscroll-behavior(auto)']);
    const containCSS = generateCSS(['overscroll-behavior(contain)']);
    const noneCSS = generateCSS(['overscroll-behavior(none)']);
    
    expect(autoCSS).toContain('.overscroll-behavior\(auto\){overscroll-behavior:auto}');
    expect(containCSS).toContain('.overscroll-behavior\(contain\){overscroll-behavior:contain}');
    expect(noneCSS).toContain('.overscroll-behavior\(none\){overscroll-behavior:none}');
  });

  it('should return empty string for invalid values', () => { // Clarified test name
    const css = generateCSS(['overscroll-behavior(invalid)']);
    expect(css).toBe('');
  });

  it('should return empty string for no arguments', () => { // Added new test case
    const css = generateCSS(['overscroll-behavior()']);
    expect(css).toBe('');
  });
});
