import { describe, it, expect } from 'vitest';
import { generateCSSFromAdorableCSS } from '../01-core/generators/generator';

describe('Negative position values', () => {
  it('should handle negative spacing 02-design_tokens', () => {
    const result = generateCSSFromAdorableCSS('right(-xs) bottom(-sm)');
    expect(result).toContain('right:calc(-1 * var(--spacing-xs))');
    expect(result).toContain('bottom:calc(-1 * var(--spacing-sm))');
  });

  it('should handle negative pixel values', () => {
    const result = generateCSSFromAdorableCSS('top(-10) left(-20)');
    expect(result).toContain('top:-10px');
    expect(result).toContain('left:-20px');
  });

  it('should handle positive values as before', () => {
    const result = generateCSSFromAdorableCSS('right(xs) bottom(sm)');
    expect(result).toContain('right:var(--spacing-xs)');
    expect(result).toContain('bottom:var(--spacing-sm)');
  });

  it('should work with all position properties', () => {
    const result = generateCSSFromAdorableCSS('top(-lg) right(-md) bottom(-xl) left(-2xl)');
    expect(result).toContain('top:calc(-1 * var(--spacing-lg))');
    expect(result).toContain('right:calc(-1 * var(--spacing-md))');
    expect(result).toContain('bottom:calc(-1 * var(--spacing-xl))');
    expect(result).toContain('left:calc(-1 * var(--spacing-2xl))');
  });
});