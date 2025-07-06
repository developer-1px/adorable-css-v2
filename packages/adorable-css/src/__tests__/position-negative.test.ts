import { describe, it, expect } from 'vitest';
import { generateCSSFromAdorableCSS } from '../01-core/generators/generator';

describe('Negative position values', () => {
  it('should handle negative spacing tokens by converting to calc(-1 * var(--token)) ', () => { // Clarified test name
    const result = generateCSSFromAdorableCSS('right(-xs) bottom(-sm)');
    expect(result).toContain('.right\(-xs\){right:calc(-1 * var(--spacing-xs))}'); // Full selector and calc
    expect(result).toContain('.bottom\(-sm\){bottom:calc(-1 * var(--spacing-sm))}'); // Full selector and calc
  });

  it('should handle negative pixel values directly', () => { // Clarified test name
    const result = generateCSSFromAdorableCSS('top(-10) left(-20)');
    expect(result).toContain('.top\(-10\){top:-10px}'); // Full selector
    expect(result).toContain('.left\(-20\){left:-20px}'); // Full selector
  });

  it('should handle positive values as before (direct token or px)', () => { // Clarified test name
    const result = generateCSSFromAdorableCSS('right(xs) bottom(sm)');
    expect(result).toContain('.right\(xs\){right:var(--spacing-xs)}'); // Full selector
    expect(result).toContain('.bottom\(sm\){bottom:var(--spacing-sm)}'); // Full selector
  });

  it('should work with all position properties and negative spacing tokens', () => { // Clarified test name
    const result = generateCSSFromAdorableCSS('top(-lg) right(-md) bottom(-xl) left(-2xl)');
    expect(result).toContain('.top\(-lg\){top:calc(-1 * var(--spacing-lg))}');
    expect(result).toContain('.right\(-md\){right:calc(-1 * var(--spacing-md))}');
    expect(result).toContain('.bottom\(-xl\){bottom:calc(-1 * var(--spacing-xl))}');
    expect(result).toContain('.left\(-2xl\){left:calc(-1 * var(--spacing-2xl))}');
  });

  it('should return empty string for invalid arguments', () => { // Added new test case
    const css = generateCSSFromAdorableCSS('top(invalid)');
    expect(css).toBe('');
  });

  it('should return empty string for invalid negative arguments', () => { // Added new test case
    const css = generateCSSFromAdorableCSS('top(-invalid)');
    expect(css).toBe('');
  });
});
