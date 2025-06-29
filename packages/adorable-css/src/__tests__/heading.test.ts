import { describe, it, expect } from 'vitest';
import { heading } from './heading';

describe('Heading Plugin', () => {
  describe('Size-based headings', () => {
    it('should generate heading(xs) styles', () => {
      const result = heading('xs');
      expect(result).toEqual({
        'font-weight': '600',
        'font-size': 'var(--font-sm)',
        'line-height': 'var(--lineHeight-normal)',
        'letter-spacing': 'var(--letterSpacing-normal)',
        'margin-top': '0',
        'margin-bottom': '0.75rem'
      });
    });

    it('should generate heading(xl) styles', () => {
      const result = heading('xl');
      expect(result).toEqual({
        'font-weight': '700',
        'font-size': 'var(--font-2xl)',
        'line-height': 'var(--lineHeight-snug)',
        'letter-spacing': 'var(--letterSpacing-tight)',
        'margin-top': '0',
        'margin-bottom': '0.75rem'
      });
    });

    it('should generate heading(4xl) styles', () => {
      const result = heading('4xl');
      expect(result).toEqual({
        'font-weight': '700',
        'font-size': 'var(--font-5xl)',
        'line-height': 'var(--lineHeight-tight)',
        'letter-spacing': 'var(--letterSpacing-tighter)',
        'margin-top': '0',
        'margin-bottom': '0.75rem'
      });
    });
  });

  describe('Semantic headings', () => {
    it('should generate heading(h1) styles', () => {
      const result = heading('h1');
      expect(result).toEqual({
        'font-weight': '700',
        'font-size': 'var(--font-6xl)',
        'line-height': 'var(--lineHeight-tight)',
        'letter-spacing': 'var(--letterSpacing-tighter)',
        'margin-top': '0',
        'margin-bottom': '0.75rem'
      });
    });

    it('should generate heading(h3) styles', () => {
      const result = heading('h3');
      expect(result).toEqual({
        'font-weight': '600',
        'font-size': 'var(--font-4xl)',
        'line-height': 'var(--lineHeight-snug)',
        'letter-spacing': 'var(--letterSpacing-tight)',
        'margin-top': '0',
        'margin-bottom': '0.75rem'
      });
    });

    it('should generate heading(h6) styles', () => {
      const result = heading('h6');
      expect(result).toEqual({
        'font-weight': '600',
        'font-size': 'var(--font-xl)',
        'line-height': 'var(--lineHeight-normal)',
        'letter-spacing': 'var(--letterSpacing-normal)',
        'margin-top': '0',
        'margin-bottom': '0.75rem'
      });
    });
  });

  describe('Error handling', () => {
    it('should return empty object for invalid heading', () => {
      const result = heading('invalid');
      expect(result).toEqual({});
    });

    it('should return empty object for no args', () => {
      const result = heading();
      expect(result).toEqual({});
    });
  });

  describe('Available styles', () => {
    it('should support all size-based styles', () => {
      const sizeStyles = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl'];
      
      sizeStyles.forEach(size => {
        const result = heading(size);
        expect(result).toHaveProperty('font-weight');
        expect(result).toHaveProperty('font-size');
        expect(result).toHaveProperty('line-height');
        expect(result).toHaveProperty('letter-spacing');
        expect(result).toHaveProperty('margin-top', '0');
        expect(result).toHaveProperty('margin-bottom');
      });
    });

    it('should support all semantic styles', () => {
      const semanticStyles = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
      
      semanticStyles.forEach(level => {
        const result = heading(level);
        expect(result).toHaveProperty('font-weight');
        expect(result).toHaveProperty('font-size');
        expect(result).toHaveProperty('line-height');
        expect(result).toHaveProperty('letter-spacing');
        expect(result).toHaveProperty('margin-top', '0');
        expect(result).toHaveProperty('margin-bottom');
      });
    });
  });
});