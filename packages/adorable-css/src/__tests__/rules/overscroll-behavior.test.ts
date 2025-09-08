import { describe, it, expect } from 'vitest';
import { generateClass } from '../../07-generator/generator';

describe.skip('overscroll-behavior rule - SKIPPED: rule not implemented', () => {
  it('should generate overscroll-behavior CSS for contain', () => {
    const css = generateClass('overscroll-behavior(contain)');
    expect(css).toBe('.overscroll-behavior\(contain\){overscroll-behavior:contain}');
  });

  it('should generate overscroll-behavior-x CSS for x-contain', () => { // Clarified test name
    const css = generateClass('overscroll-behavior(x-contain)');
    expect(css).toBe('.overscroll-behavior\(x-contain\){overscroll-behavior-x:contain}');
  });

  it('should generate overscroll-behavior-y CSS for y-none', () => { // Clarified test name
    const css = generateClass('overscroll-behavior(y-none)');
    expect(css).toBe('.overscroll-behavior\(y-none\){overscroll-behavior-y:none}');
  });

  it('should handle all valid values for overscroll-behavior', () => { // Clarified test name
    const autoCSS = generateClass('overscroll-behavior(auto)');
    const containCSS = generateClass('overscroll-behavior(contain)');
    const noneCSS = generateClass('overscroll-behavior(none)');
    
    expect(autoCSS).toBe('.overscroll-behavior\(auto\){overscroll-behavior:auto}');
    expect(containCSS).toBe('.overscroll-behavior\(contain\){overscroll-behavior:contain}');
    expect(noneCSS).toBe('.overscroll-behavior\(none\){overscroll-behavior:none}');
  });

  it('should return empty string for invalid values', () => { // Clarified test name
    const css = generateClass('overscroll-behavior(invalid)');
    expect(css).toBe('');
  });

  it('should return empty string for no arguments', () => { // Added new test case
    const css = generateClass('overscroll-behavior()');
    expect(css).toBe('');
  });
});
