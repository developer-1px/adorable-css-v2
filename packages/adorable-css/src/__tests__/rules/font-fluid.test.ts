import { describe, it, expect } from 'vitest';
import { font } from '../../03-rules/text/font';

describe('font fluid syntax', () => {
  describe('font(..token) - scale up to token', () => {
    it('should handle font(..5xl)', () => {
      const result = font('..5xl');
      expect(result['font-size']).toMatch(/clamp\(/);
      expect(result['font-size']).toContain('var(--font-5xl)');
    });

    it('should handle font(..lg)', () => {
      const result = font('..lg');
      expect(result['font-size']).toMatch(/clamp\(/);
      expect(result['font-size']).toContain('var(--font-lg)');
    });

    it('should handle font(..5xl/tight)', () => {
      const result = font('..5xl/tight');
      expect(result['font-size']).toMatch(/clamp\(/);
      expect(result['font-size']).toContain('var(--font-5xl)');
      expect(result['line-height']).toBe('var(--lineHeight-tight)');
    });

    it('should handle font(..5xl/1.2/-2%)', () => {
      const result = font('..5xl/1.2/-2%');
      expect(result['font-size']).toMatch(/clamp\(/);
      expect(result['font-size']).toContain('var(--font-5xl)');
      expect(result['line-height']).toBe('1.2');
      expect(result['letter-spacing']).toBe('-0.02em');
    });
  });

  describe('font(token..) - scale from token up', () => {
    it('should handle font(3xl..)', () => {
      const result = font('3xl..');
      expect(result['font-size']).toMatch(/clamp\(/);
      expect(result['font-size']).toContain('var(--font-3xl)');
    });

    it('should handle font(base..)', () => {
      const result = font('base..');
      expect(result['font-size']).toMatch(/clamp\(/);
      // base is alias for md
      expect(result['font-size']).toContain('var(--font-md)');
    });

    it('should handle font(2xl../relaxed)', () => {
      const result = font('2xl../relaxed');
      expect(result['font-size']).toMatch(/clamp\(/);
      expect(result['font-size']).toContain('var(--font-2xl)');
      expect(result['line-height']).toBe('var(--lineHeight-relaxed)');
    });
  });

  describe('non-token fluid values', () => {
    it('should handle font(..3)', () => {
      const result = font('..3');
      expect(result['font-size']).toBe('clamp(2.4rem, 4.8vw, 3rem)');
    });

    it('should handle font(2..)', () => {
      const result = font('2..');
      expect(result['font-size']).toBe('clamp(2rem, 3.6vw, 3rem)');
    });
  });

  describe('existing range syntax still works', () => {
    it('should handle font(sm..lg)', () => {
      const result = font('sm..lg');
      expect(result['font-size']).toMatch(/clamp\(/);
    });

    it('should handle font(1rem..2rem)', () => {
      const result = font('1rem..2rem');
      expect(result['font-size']).toMatch(/clamp\(/);
    });

    it('should handle font(sm..4vw..lg)', () => {
      const result = font('sm..4vw..lg');
      expect(result['font-size']).toMatch(/clamp\(/);
    });
  });
});