import { describe, it, expect } from 'vitest';
import { inputString, textareaString } from '../../05-components/primitives/input';

describe('input component', () => {
  describe('inputString', () => {
    it('should return default input styles', () => {
      const result = inputString();
      expect(result).toContain('flex h(40) w(full) r(md) px(12) py(8)');
      expect(result).toContain('text(sm) c(gray-900) bg(transparent)');
      expect(result).toContain('outline(none) transition-all placeholder:c(gray-500)');
      expect(result).toContain('border(1/gray-200)'); // default variant
    });

    it('should apply default variant hover and focus states', () => {
      const result = inputString();
      expect(result).toContain('hover:border(gray-300)');
      expect(result).toContain('focus:border(gray-900) focus:ring(1/gray-900)');
    });

    it('should apply disabled state', () => {
      const result = inputString();
      expect(result).toContain('disabled:cursor(not-allowed) disabled:opacity(50) disabled:bg(gray-50)');
    });

    it('should apply ghost variant', () => {
      const result = inputString('ghost');
      expect(result).toContain('bg(gray-100) border(1/transparent)');
      expect(result).toContain('hover:bg(gray-200)');
      expect(result).toContain('focus:bg(white) focus:border(gray-900) focus:ring(1/gray-900)');
    });

    it('should apply underlined variant', () => {
      const result = inputString('underlined');
      expect(result).toContain('px(0) r(0) border(none) bb(1/gray-300)');
      expect(result).toContain('hover:bb(gray-400)');
      expect(result).toContain('focus:bb(2/gray-900) focus:pb(7)');
      expect(result).toContain('disabled:bb(gray-200)');
    });

    it('should apply error variant', () => {
      const result = inputString('error');
      expect(result).toContain('border(1/red-500)');
      expect(result).toContain('hover:border(red-600)');
      expect(result).toContain('focus:border(red-500) focus:ring(1/red-500)');
      expect(result).toContain('disabled:border(red-300)');
    });

    it('should include state classes from states object', () => {
      const result = inputString();
      expect(result).toContain('hover:border(gray-300)');
      expect(result).toContain('focus:border(gray-900) ring(1/gray-900)');
      expect(result).toContain('disabled:cursor(not-allowed) opacity(50) bg(gray-50)');
    });
  });

  describe('textareaString', () => {
    it('should return default textarea styles', () => {
      const result = textareaString();
      expect(result).toContain('flex w(full) r(md) text(sm) c(gray-900)');
      expect(result).toContain('bg(transparent) resize(vertical)');
      expect(result).toContain('min-h(120) py(12) px(12)'); // default size
      expect(result).toContain('border(1/gray-200)');
    });

    it('should apply small size', () => {
      const result = textareaString('sm');
      expect(result).toContain('min-h(80) py(8) px(12)');
    });

    it('should apply large size', () => {
      const result = textareaString('lg');
      expect(result).toContain('min-h(160) py(16) px(16)');
    });

    it('should include all interactive states', () => {
      const result = textareaString();
      expect(result).toContain('outline(none) transition-all lh(1.5)');
      expect(result).toContain('placeholder:c(gray-500)');
      expect(result).toContain('hover:border(gray-300)');
      expect(result).toContain('focus:border(gray-900) focus:ring(1/gray-900)');
    });

    it('should include disabled state', () => {
      const result = textareaString();
      expect(result).toContain('disabled:cursor(not-allowed)');
      expect(result).toContain('disabled:opacity(50)');
      expect(result).toContain('disabled:bg(gray-50)');
      expect(result).toContain('disabled:resize(none)');
    });
  });
});