import { describe, it, expect } from 'vitest';
import { text } from '../../03-rules/text/text';

describe('text fluid syntax', () => {
  describe('text(..token) - scale up to token', () => {
    it('should handle text(..5xl)', () => {
      const result = text('..5xl');
      expect(result['font-size']).toMatch(/clamp\(/);
      expect(result['font-size']).toContain('var(--font-5xl)');
    });

    it('should handle text(..lg)', () => {
      const result = text('..lg');
      expect(result['font-size']).toMatch(/clamp\(/);
      expect(result['font-size']).toContain('var(--font-lg)');
    });

    it('should handle text(..5xl/tight)', () => {
      const result = text('..5xl/tight');
      expect(result['font-size']).toMatch(/clamp\(/);
      expect(result['font-size']).toContain('var(--font-5xl)');
      expect(result['line-height']).toBe('1.25');
    });

    it('should handle text(..5xl/1.2/-2%)', () => {
      const result = text('..5xl/1.2/-2%');
      expect(result['font-size']).toMatch(/clamp\(/);
      expect(result['font-size']).toContain('var(--font-5xl)');
      expect(result['line-height']).toBe('1.2');
      expect(result['letter-spacing']).toBe('-0.02em');
    });
  });

  describe('text(token..) - scale from token up', () => {
    it('should handle text(3xl..)', () => {
      const result = text('3xl..');
      expect(result['font-size']).toMatch(/clamp\(/);
      expect(result['font-size']).toContain('var(--font-3xl)');
    });

    it('should handle text(base..)', () => {
      const result = text('base..');
      expect(result['font-size']).toMatch(/clamp\(/);
      // base is alias for md
      expect(result['font-size']).toContain('var(--font-md)');
    });

    it('should handle text(2xl../relaxed)', () => {
      const result = text('2xl../relaxed');
      expect(result['font-size']).toMatch(/clamp\(/);
      expect(result['font-size']).toContain('var(--font-2xl)');
      expect(result['line-height']).toBe('1.625');
    });
  });

  describe('non-token fluid values', () => {
    it('should handle text(..3)', () => {
      const result = text('..3');
      expect(result['font-size']).toBe('clamp(2.4rem, 4.8vw, 3rem)');
    });

    it('should handle text(2..)', () => {
      const result = text('2..');
      expect(result['font-size']).toBe('clamp(2rem, 3.6vw, 3rem)');
    });
  });

  describe('existing range syntax still works', () => {
    it('should handle text(sm..lg)', () => {
      const result = text('sm..lg');
      expect(result['font-size']).toMatch(/clamp\(/);
    });

    it('should handle text(1rem..2rem)', () => {
      const result = text('1rem..2rem');
      expect(result['font-size']).toMatch(/clamp\(/);
    });

    it('should handle text(sm..4vw..lg)', () => {
      const result = text('sm..4vw..lg');
      expect(result['font-size']).toMatch(/clamp\(/);
    });
  });
});