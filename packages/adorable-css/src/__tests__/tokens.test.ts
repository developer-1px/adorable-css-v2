import { describe, it, expect } from 'vitest';
import { isToken, getTokenVar, generateTokenCSS, defaultTokens } from './index';
import { r } from '../04-rules/03-rules_deprecated/visuals/border';
import { shadow } from '../04-rules/03-rules_deprecated/visuals/shadow';
import { font } from '../04-rules/03-rules_deprecated/typography/font';
import { p, m, gap } from '../04-rules/03-rules_deprecated/layout/spacing';

describe('Token System', () => {
  describe('isToken', () => {
    it('should recognize valid 02-design_tokens', () => {
      expect(isToken('sm', 'radius')).toBe(true);
      expect(isToken('md', 'radius')).toBe(true);
      expect(isToken('lg', 'radius')).toBe(true);
      expect(isToken('full', 'radius')).toBe(true);
      expect(isToken('none', 'radius')).toBe(true);
    });

    it('should reject invalid 02-design_tokens', () => {
      expect(isToken('xyz', 'radius')).toBe(false);
      expect(isToken('8', 'radius')).toBe(false);
    });
  });

  describe('getTokenVar', () => {
    it('should generate CSS variable names', () => {
      expect(getTokenVar('radius', 'sm')).toBe('var(--radius-sm)');
      expect(getTokenVar('font', 'lg')).toBe('var(--font-lg)');
      expect(getTokenVar('spacing', 'md')).toBe('var(--spacing-md)');
    });
  });

  describe('generateTokenCSS', () => {
    it('should generate CSS variables', () => {
      const css = generateTokenCSS(defaultTokens);
      expect(css).toContain(':root{');
      expect(css).toContain('--radius-sm:0.25rem;');
      expect(css).toContain('--font-lg:1.25rem;');
      expect(css).toContain('--spacing-md:0.75rem;');
    });
  });

  describe('Rule Integration', () => {
    it('border radius should use 02-design_tokens', () => {
      expect(r('sm')).toEqual({ 'border-radius': 'var(--radius-sm)' });
      expect(r('md')).toEqual({ 'border-radius': 'var(--radius-md)' });
      expect(r('full')).toEqual({ 'border-radius': 'var(--radius-full)' });
    });

    it('shadow should use 02-design_tokens', () => {
      expect(shadow('sm')).toEqual({ 'box-shadow': 'var(--shadow-sm)' });
      expect(shadow('lg')).toEqual({ 'box-shadow': 'var(--shadow-lg)' });
    });

    it('font should use 02-design_tokens', () => {
      expect(text('sm')).toEqual({ 'font-size': 'var(--font-sm)' });
      expect(text('lg')).toEqual({ 'font-size': 'var(--font-lg)' });
    });

    it('spacing should use 02-design_tokens', () => {
      expect(p('sm')).toEqual({ padding: 'var(--spacing-sm)' });
      expect(m('lg')).toEqual({ margin: 'var(--spacing-lg)' });
      expect(gap('md')).toEqual({ gap: 'var(--spacing-md)' });
    });

    it('should handle numeric values', () => {
      expect(r('8')).toEqual({ 'border-radius': '8px' });
      expect(p('20')).toEqual({ padding: '20px' });
      expect(text('16')).toEqual({ 'font-size': '16px' });
    });
  });
});