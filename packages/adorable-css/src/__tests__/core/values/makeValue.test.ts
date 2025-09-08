import { describe, it, expect } from 'vitest';
import { makeValue, cssvar } from '../../../03-values/makeValue';

describe('makeValue with token support', () => {
  describe('cssvar function', () => {
    it('should handle spacing 02-design_tokens', () => {
      // Without token checker registered, tokens are returned as-is
      expect(cssvar('lg')).toBe('lg');
      expect(cssvar('xl')).toBe('xl');
      expect(cssvar('2xl')).toBe('2xl');
    });

    it('should handle font 02-design_tokens', () => {
      // Without token checker registered, tokens are returned as-is
      expect(cssvar('sm')).toBe('sm');
      expect(cssvar('md')).toBe('md');
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
      // Without token checker registered, tokens are returned as-is
      expect(makeValue('lg')).toBe('lg');
      expect(makeValue('xl')).toBe('xl');
    });

    it('should handle multiple values', () => {
      // Without token checker registered, tokens are returned as-is
      expect(makeValue('lg/xl')).toBe('lg xl');
    });
  });
});