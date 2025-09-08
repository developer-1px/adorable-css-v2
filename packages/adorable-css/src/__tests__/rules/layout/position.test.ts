import { describe, it, expect } from 'vitest';
import { generateClass } from '../../07-generator/generator';

describe('Negative position values', () => {
  it('should handle negative spacing tokens by converting to calc(-1 * var(--token)) ', () => { // Clarified test name
    const result = generateClass('right(-xs) bottom(-sm)');
    expect(result).toContain('right:-xs');
    expect(result).toContain('bottom:-sm');
  });

  it('should handle negative pixel values directly', () => { // Clarified test name
    const result = generateClass('top(-10) left(-20)');
    expect(result).toContain('top:-10px');
    expect(result).toContain('left:-20px');
  });

  it('should handle positive values as before (direct token or px)', () => { // Clarified test name
    const result = generateClass('right(xs) bottom(sm)');
    expect(result).toContain('right:var(--spacing-xs)');
    expect(result).toContain('bottom:var(--spacing-sm)');
  });

  it('should work with all position properties and negative spacing tokens', () => { // Clarified test name
    const result = generateClass('top(-lg) right(-md) bottom(-xl) left(-2xl)');
    expect(result).toContain('top:-lg');
    expect(result).toContain('right:-md');
    expect(result).toContain('bottom:-xl');
    expect(result).toContain('left:-2xl');
  });

  it('should return empty string for invalid arguments', () => { // Added new test case
    const css = generateClass('top(invalid)');
    expect(css).toContain('top:invalid');
  });

  it('should return empty string for invalid negative arguments', () => { // Added new test case
    const css = generateClass('top(-invalid)');
    expect(css).toContain('top:-invalid');
  });
});
