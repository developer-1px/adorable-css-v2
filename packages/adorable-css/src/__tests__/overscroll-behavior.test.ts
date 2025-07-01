import { describe, it, expect } from 'vitest';
import { generateCSS } from '../index';

describe('overscroll-behavior rule', () => {
  it('should generate overscroll-behavior CSS', () => {
    const css = generateCSS(['overscroll-behavior(contain)']);
    expect(css).toContain('overscroll-behavior:contain');
  });

  it('should generate overscroll-behavior-x CSS', () => {
    const css = generateCSS(['overscroll-behavior(x-contain)']);
    expect(css).toContain('overscroll-behavior-x:contain');
  });

  it('should generate overscroll-behavior-y CSS', () => {
    const css = generateCSS(['overscroll-behavior(y-none)']);
    expect(css).toContain('overscroll-behavior-y:none');
  });

  it('should handle all valid values', () => {
    const autoCSS = generateCSS(['overscroll-behavior(auto)']);
    const containCSS = generateCSS(['overscroll-behavior(contain)']);
    const noneCSS = generateCSS(['overscroll-behavior(none)']);
    
    expect(autoCSS).toContain('overscroll-behavior:auto');
    expect(containCSS).toContain('overscroll-behavior:contain');
    expect(noneCSS).toContain('overscroll-behavior:none');
  });

  it('should return empty for invalid values', () => {
    const css = generateCSS(['overscroll-behavior(invalid)']);
    expect(css).toBe('');
  });
});