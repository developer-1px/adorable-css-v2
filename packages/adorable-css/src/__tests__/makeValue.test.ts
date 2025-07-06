import { describe, it, expect } from 'vitest';
import { makeValue, cssvar } from './makeValue';

describe('makeValue with token support', () => {
  describe('cssvar function', () => {
    it('should handle spacing 02-design_tokens', () => {
      expect(cssvar('lg')).toBe('var(--spacing-lg)');
      expect(cssvar('xl')).toBe('var(--spacing-xl)');
      expect(cssvar('2xl')).toBe('var(--spacing-2xl)');
    });

    it('should handle font 02-design_tokens', () => {
      expect(cssvar('sm')).toBe('var(--spacing-sm)'); // sm is in both spacing and font
      expect(cssvar('md')).toBe('var(--spacing-md)');
    });

    it('should handle CSS variables', () => {
      expect(cssvar('--custom-var')).toBe('var(--custom-var)');
    });

    it('should return value as-is if not a token', () => {
      expect(cssvar('16px')).toBe('16px');
      expect(cssvar('1rem')).toBe('1rem');
      expect(cssvar('red')).toBe('red');
    });
  });

  describe('makeValue function', () => {
    it('should process spacing 02-design_tokens', () => {
      expect(makeValue('lg')).toBe('var(--spacing-lg)');
      expect(makeValue('xl')).toBe('var(--spacing-xl)');
    });

    it('should handle multiple values', () => {
      expect(makeValue('lg/xl')).toBe('var(--spacing-lg) var(--spacing-xl)');
    });
  });
});