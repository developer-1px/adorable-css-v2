import { describe, it, expect } from 'vitest';
import { generateCSS } from '../../index';

describe('button component', () => {
  describe('btn', () => {
    it('should return default button styles', () => {
      const css = generateCSS(['btn()']);
      expect(css).toContain('display:flex');
      expect(css).toContain('height:40px');
    });

    it('should apply small size', () => {
      const css = generateCSS(['btn(sm)']);
      expect(css).toContain('height:36px');
    });
  });

  describe('icon-btn', () => {
    it('should return default icon button styles', () => {
      const css = generateCSS(['icon-btn()']);
      expect(css).toContain('width:40px');
      expect(css).toContain('height:40px');
    });
  });
});