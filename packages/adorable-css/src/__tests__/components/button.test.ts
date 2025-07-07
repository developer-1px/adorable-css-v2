import { describe, it, expect } from 'vitest';
import { btnString, iconBtnString } from '../../05-components/primitives/button';

describe('button component', () => {
  describe('btnString', () => {
    it('should return default button styles', () => {
      const result = btnString();
      expect(result).toContain('hbox(center+center)');
      expect(result).toContain('h(40) px(16) py(8) text(sm)'); // default size
      expect(result).toContain('bg(gray-900) c(white) border(transparent)'); // default variant
    });

    it('should apply small size', () => {
      const result = btnString('sm');
      expect(result).toContain('h(36) px(12) text(xs) r(md)');
    });

    it('should apply large size', () => {
      const result = btnString('lg');
      expect(result).toContain('h(44) px(32) text(sm) r(md)');
    });

    it('should apply icon size', () => {
      const result = btnString('icon');
      expect(result).toContain('h(40) w(40) p(0)');
    });

    it('should apply secondary variant', () => {
      const result = btnString('secondary');
      expect(result).toContain('bg(white) c(gray-900) border(1/gray-200)');
      expect(result).toContain('hover:bg(gray-100) active:bg(gray-200)');
    });

    it('should apply destructive variant', () => {
      const result = btnString('destructive');
      expect(result).toContain('bg(red-600) c(white) border(transparent)');
      expect(result).toContain('hover:bg(red-700) active:bg(red-800)');
    });

    it('should apply outline variant', () => {
      const result = btnString('outline');
      expect(result).toContain('bg(transparent) c(gray-900) border(1/gray-200)');
      expect(result).toContain('hover:bg(gray-100) hover:border(gray-300)');
    });

    it('should apply ghost variant', () => {
      const result = btnString('ghost');
      expect(result).toContain('bg(transparent) c(gray-700) border(transparent)');
      expect(result).toContain('hover:bg(gray-100) hover:c(gray-900) active:bg(gray-200)');
    });

    it('should apply link variant', () => {
      const result = btnString('link');
      expect(result).toContain('bg(transparent) c(gray-900) underline-offset(4)');
      expect(result).toContain('hover:underline hover:c(gray-700) active:c(gray-800)');
    });

    it('should apply compound variant for link', () => {
      const result = btnString('link/sm');
      expect(result).toContain('h(auto) px(0) py(0)'); // compound variant overrides
    });

    it('should include default styles', () => {
      const result = btnString();
      expect(result).toContain('hbox(center+center)');
      expect(result).toContain('gap(8)');
      expect(result).toContain('cursor(pointer)');
    });

    it('should combine variant and size', () => {
      const result = btnString('secondary/lg');
      expect(result).toContain('h(44) px(32) text(sm)');
      expect(result).toContain('bg(white) c(gray-900) border(1/gray-200)');
    });
  });

  describe('iconBtnString', () => {
    it('should return default icon button styles', () => {
      const result = iconBtnString();
      expect(result).toContain('hbox(center+center)');
      expect(result).toContain('w(40) h(40) p(0) r(md)'); // default size
      expect(result).toContain('bg(transparent) c(gray-700)'); // default variant
    });

    it('should apply small size', () => {
      const result = iconBtnString('sm');
      expect(result).toContain('w(36) h(36) p(0) r(md)');
    });

    it('should apply large size', () => {
      const result = iconBtnString('lg');
      expect(result).toContain('w(44) h(44) p(0) r(md)');
    });

    it('should include hover states', () => {
      const result = iconBtnString();
      expect(result).toContain('hover:bg(gray-100) hover:c(gray-900) active:bg(gray-200)');
    });

    it('should include default icon button styles', () => {
      const result = iconBtnString();
      expect(result).toContain('hbox(center+center)');
      expect(result).toContain('cursor(pointer)');
      expect(result).toContain('w(40) h(40)');
    });
  });
});