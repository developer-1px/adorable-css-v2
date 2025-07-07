import { describe, it, expect } from 'vitest';
import { sectionString } from '../../05-components/patterns/section';

describe('Section Component', () => {
  describe('Basic functionality', () => {
    it('should generate default section with medium width', () => {
      const result = sectionString();
      expect(result).toContain('max-w(768px)');
      expect(result).toContain('mx(auto)');
      expect(result).toContain('px(lg)');
    });
  });

  describe('Width variants', () => {
    it('should generate text-optimized width', () => {
      const result = sectionString('text');
      expect(result).toContain('max-w(620px)');
      expect(result).toContain('mx(auto)');
      expect(result).toContain('px(lg)');
    });

    it('should generate narrow width (alias for text)', () => {
      const result = sectionString('narrow');
      expect(result).toContain('max-w(620px)');
      expect(result).toContain('mx(auto)');
      expect(result).toContain('px(lg)');
    });

    it('should generate medium width', () => {
      const result = sectionString('medium');
      expect(result).toContain('max-w(768px)');
      expect(result).toContain('mx(auto)');
      expect(result).toContain('px(lg)');
    });

    it('should generate wide width', () => {
      const result = sectionString('wide');
      expect(result).toContain('max-w(1024px)');
      expect(result).toContain('mx(auto)');
      expect(result).toContain('px(lg)');
    });

    it('should generate breakout width', () => {
      const result = sectionString('breakout');
      expect(result).toContain('max-w(1200px)');
      expect(result).toContain('mx(auto)');
      expect(result).toContain('px(lg)');
    });

    it('should generate full width with padding', () => {
      const result = sectionString('full');
      expect(result).toContain('w(full)');
      expect(result).toContain('px(lg)');
      expect(result).not.toContain('max-w');
    });

    it('should generate canvas width without padding', () => {
      const result = sectionString('canvas');
      expect(result).toContain('w(full)');
      expect(result).not.toContain('px');
      expect(result).not.toContain('max-w');
    });
  });

  describe('Legacy variants (backwards compatibility)', () => {
    it('should support legacy large variant', () => {
      const result = sectionString('large');
      expect(result).toContain('relative');
      expect(result).toContain('w(100%)');
    });

    it('should support legacy compact variant', () => {
      const result = sectionString('compact');
      expect(result).toContain('relative');
      expect(result).toContain('w(100%)');
    });

    it('should support legacy feature variant', () => {
      const result = sectionString('feature');
      expect(result).toContain('relative');
      expect(result).toContain('w(100%)');
    });

    it('should support legacy flush variant', () => {
      const result = sectionString('flush');
      expect(result).toContain('relative');
      expect(result).toContain('w(100%)');
      expect(result).toContain('p(0)');
    });

    it('should support legacy gallery variant', () => {
      const result = sectionString('gallery');
      expect(result).toContain('relative');
      expect(result).toContain('w(100%)');
      expect(result).toContain('clip');
    });
  });

  describe('Invalid variants', () => {
    it('should fallback to default for unknown variant', () => {
      const result = sectionString('unknown');
      expect(result).toContain('max-w(768px)');
      expect(result).toContain('mx(auto)');
      expect(result).toContain('px(lg)');
    });
  });

  describe('Medium.com style layout examples', () => {
    it('should work for article text content', () => {
      const result = sectionString('text');
      expect(result).toContain('max-w(620px)'); // Optimal reading width
    });

    it('should work for hero sections', () => {
      const result = sectionString('wide');
      expect(result).toContain('max-w(1024px)'); // Wide hero content
    });

    it('should work for full-width backgrounds', () => {
      const result = sectionString('canvas');
      expect(result).toContain('w(full)');
      expect(result).not.toContain('px'); // No padding for backgrounds
    });

    it('should work for galleries and media', () => {
      const result = sectionString('breakout');
      expect(result).toContain('max-w(1200px)'); // Slightly breaking out
    });
  });

  describe('Responsive behavior', () => {
    it('should include responsive padding', () => {
      const result = sectionString();
      // Should have px(lg) for responsive behavior
      expect(result).toContain('px(lg)');
    });

    it('should center content with margin auto', () => {
      const result = sectionString('text');
      expect(result).toContain('mx(auto)');
    });
  });
});