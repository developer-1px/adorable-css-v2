import { describe, it, expect } from 'vitest';
import { text } from '../../../03-rules/text/text';

describe('text rule', () => {
  describe('text alignment', () => {
    it('should handle text alignment values', () => {
      expect(text('left')).toEqual({ 'text-align': 'left' });
      expect(text('center')).toEqual({ 'text-align': 'center' });
      expect(text('right')).toEqual({ 'text-align': 'right' });
      expect(text('justify')).toEqual({ 'text-align': 'justify' });
    });
  });

  describe('font size 02-design_tokens', () => {
    it('should handle size token values', () => {
      expect(text('xs')).toEqual({ 'font-size': 'var(--font-xs)' });
      expect(text('sm')).toEqual({ 'font-size': 'var(--font-sm)' });
      expect(text('md')).toEqual({ 'font-size': 'var(--font-md)' });
      expect(text('lg')).toEqual({ 'font-size': 'var(--font-lg)' });
      expect(text('xl')).toEqual({ 'font-size': 'var(--font-xl)' });
      expect(text('2xl')).toEqual({ 'font-size': 'var(--font-2xl)' });
      expect(text('3xl')).toEqual({ 'font-size': 'var(--font-3xl)' });
      expect(text('4xl')).toEqual({ 'font-size': 'var(--font-4xl)' });
      expect(text('5xl')).toEqual({ 'font-size': 'var(--font-5xl)' });
    });
  });

  describe('text styles', () => {
    it('should handle underline', () => {
      expect(text('underline')).toEqual({ 'text-decoration': 'underline' });
    });

    it('should handle uppercase', () => {
      expect(text('uppercase')).toEqual({ 'text-transform': 'uppercase' });
    });

    it('should handle lowercase', () => {
      expect(text('lowercase')).toEqual({ 'text-transform': 'lowercase' });
    });

    it('should handle capitalize', () => {
      expect(text('capitalize')).toEqual({ 'text-transform': 'capitalize' });
    });
  });

  describe('white-space handling', () => {
    it('should handle nowrap', () => {
      expect(text('nowrap')).toEqual({ 'white-space': 'nowrap' });
    });

    it('should handle wrap', () => {
      expect(text('wrap')).toEqual({ 'white-space': 'normal' });
    });

    it('should handle pre', () => {
      expect(text('pre')).toEqual({ 'white-space': 'pre' });
    });

    it('should handle pre-wrap', () => {
      expect(text('pre-wrap')).toEqual({ 'white-space': 'pre-wrap' });
    });

    it('should handle pre-line', () => {
      expect(text('pre-line')).toEqual({ 'white-space': 'pre-line' });
    });
  });

  it('should return empty object for invalid values', () => {
    expect(text('invalid')).toEqual({});
    expect(text('foo')).toEqual({});
  });

  it('should return empty object for no value', () => {
    expect(text()).toEqual({});
  });
});