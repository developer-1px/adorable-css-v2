import { describe, it, expect } from 'vitest';
import { generateClass } from '../07-generator/generator';

describe('Unified Text Handler', () => {
  describe('Typography features', () => {
    it('should handle font-size only', () => {
      const css = generateClass('text(16px)');
      expect(css).toContain('font-size:16px');
    });

    it('should handle font-size with token', () => {
      const css = generateClass('text(lg)');
      expect(css).toContain('font-size:var(--font-lg)');
    });

    it('should handle font-size with line-height', () => {
      const css = generateClass('text(16px/1.5)');
      expect(css).toContain('font-size:16px');
      expect(css).toContain('line-height:1.5');
    });

    it('should handle full typography', () => {
      const css = generateClass('text(lg/1.5/-2%)');
      expect(css).toContain('font-size:var(--font-lg)');
      expect(css).toContain('line-height:1.5');
      expect(css).toContain('letter-spacing:-0.02em');
    });
  });

  describe('Text properties features', () => {
    it('should handle text alignment', () => {
      expect(generateClass('text(center)')).toContain('text-align:center');
      expect(generateClass('text(right)')).toContain('text-align:right');
      expect(generateClass('text(left)')).toContain('text-align:left');
    });

    it('should handle text transform', () => {
      expect(generateClass('text(uppercase)')).toContain('text-transform:uppercase');
      expect(generateClass('text(lowercase)')).toContain('text-transform:lowercase');
      expect(generateClass('text(capitalize)')).toContain('text-transform:capitalize');
    });

    it('should handle white-space', () => {
      expect(generateClass('text(nowrap)')).toContain('white-space:nowrap');
      expect(generateClass('text(pre)')).toContain('white-space:pre');
      expect(generateClass('text(pre-wrap)')).toContain('white-space:pre-wrap');
    });

    it('should handle text decoration', () => {
      expect(generateClass('text(underline)')).toContain('text-decoration:underline');
      expect(generateClass('text(strike)')).toContain('text-decoration:line-through');
    });

    it('should handle combined text properties', () => {
      const css = generateClass('text(nowrap+center)');
      expect(css).toContain('white-space:nowrap');
      expect(css).toContain('text-align:center');
    });

    it('should handle multiple combined properties', () => {
      const css = generateClass('text(uppercase+center+underline)');
      expect(css).toContain('text-transform:uppercase');
      expect(css).toContain('text-align:center');
      expect(css).toContain('text-decoration:underline');
    });
  });

  describe('Mixed features', () => {
    it('should handle typography with text properties', () => {
      const css = generateClass('text(lg/1.5/center)');
      expect(css).toContain('font-size:var(--font-lg)');
      expect(css).toContain('line-height:1.5');
      expect(css).toContain('text-align:center');
    });

    it('should handle complex combinations', () => {
      const css = generateClass('text(16px/1.4/nowrap+right)');
      expect(css).toContain('font-size:16px');
      expect(css).toContain('line-height:1.4');
      expect(css).toContain('white-space:nowrap');
      expect(css).toContain('text-align:right');
    });
  });

  describe('Edge cases', () => {
    it('should handle text size names (xs, sm, etc)', () => {
      const css = generateClass('text(xs)');
      expect(css).toContain('font-size:var(--font-xs)');
    });

    it('should handle semantic tokens vs properties', () => {
      // "center" as alignment, not as a size token
      const css = generateClass('text(center)');
      expect(css).toContain('text-align:center');
      expect(css).not.toContain('font-size');
    });
  });

  describe('Clamp support', () => {
    it('should handle double range syntax (min..max)', () => {
      const css = generateClass('text(sm..6xl)');
      expect(css).toContain('font-size:clamp(');
      expect(css).toContain('var(--font-sm)');
      expect(css).toContain('var(--font-6xl)');
    });

    it('should handle triple range syntax (min..preferred..max)', () => {
      const css = generateClass('text(16px..4vw..48px)');
      expect(css).toContain('font-size:clamp(16px, 4vw, 48px)');
    });

    it('should handle token to pixel range', () => {
      const css = generateClass('text(lg..32px)');
      expect(css).toContain('font-size:clamp(');
      expect(css).toContain('var(--font-lg)');
      expect(css).toContain('32px');
    });

    it('should work with line-height and other properties', () => {
      const css = generateClass('text(sm..2xl/1.5/tight)');
      expect(css).toContain('font-size:clamp(');
      expect(css).toContain('line-height:1.5');
      expect(css).toContain('letter-spacing:-0.025em');
    });

    it('should work with text properties combined', () => {
      const css = generateClass('text(lg..3xl/1.4/center)');
      expect(css).toContain('font-size:clamp(');
      expect(css).toContain('line-height:1.4');
      expect(css).toContain('text-align:center');
    });
  });
});