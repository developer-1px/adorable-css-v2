import { describe, it, expect } from 'vitest';
import { generateClass } from '../../07-generator/generator';

// Initialize Rule2 handlers for tests
import { initializeRule2Handlers } from '../../04-rules/rule2-registry';
initializeRule2Handlers();

describe('Cover and Contain Utilities', () => {
  describe('Universal utilities', () => {
    it('should handle cover utility for both background and object', () => {
      const result = generateClass('cover');
      expect(result).toContain('background-size:cover');
      expect(result).toContain('object-fit:cover');
    });

    it('should handle contain utility for both background and object', () => {
      const result = generateClass('contain');
      expect(result).toContain('background-size:contain');
      expect(result).toContain('object-fit:contain');
    });

    it('should handle fill utility for both background and object', () => {
      const result = generateClass('fill');
      expect(result).toContain('background-size:100% 100%');
      expect(result).toContain('object-fit:fill');
    });
  });

  describe('Object-fit utilities', () => {
    it('should handle object-fit with cover', () => {
      expect(generateClass('object-fit(cover)')).toContain('object-fit:cover');
    });

    it('should handle object-fit with contain', () => {
      expect(generateClass('object-fit(contain)')).toContain('object-fit:contain');
    });

    it('should handle object-fit with fill', () => {
      expect(generateClass('object-fit(fill)')).toContain('object-fit:fill');
    });

    it('should handle object-fit with none', () => {
      expect(generateClass('object-fit(none)')).toContain('object-fit:none');
    });

    it('should handle object-fit with scale-down', () => {
      expect(generateClass('object-fit(scale-down)')).toContain('object-fit:scale-down');
    });
  });

  describe('Object-position utilities', () => {
    it('should handle object-position with center', () => {
      expect(generateClass('object-position(center)')).toContain('object-position:center');
    });

    it('should handle object-position with top', () => {
      expect(generateClass('object-position(top)')).toContain('object-position:top');
    });

    it('should handle object-position with compound values', () => {
      expect(generateClass('object-position(top-left)')).toContain('object-position:top left');
    });

    it('should handle object-position with bottom-right', () => {
      expect(generateClass('object-position(bottom-right)')).toContain('object-position:bottom right');
    });
  });

  describe('Object shorthand', () => {
    it('should handle object with fit values', () => {
      expect(generateClass('object(cover)')).toContain('object-fit:cover');
      expect(generateClass('object(contain)')).toContain('object-fit:contain');
      expect(generateClass('object(fill)')).toContain('object-fit:fill');
    });

    it('should handle object with position values', () => {
      expect(generateClass('object(center)')).toContain('object-position:center');
      expect(generateClass('object(top-left)')).toContain('object-position:top left');
    });
  });

  describe('Background-size utilities', () => {
    it('should handle bg-size with cover', () => {
      expect(generateClass('bg-size(cover)')).toContain('background-size:cover');
    });

    it('should handle bg-size with contain', () => {
      expect(generateClass('bg-size(contain)')).toContain('background-size:contain');
    });

    it('should handle bg-size with auto', () => {
      expect(generateClass('bg-size(auto)')).toContain('background-size:auto');
    });

    it('should handle bg-size with full', () => {
      expect(generateClass('bg-size(full)')).toContain('background-size:100% 100%');
    });
  });

  describe('Real-world usage examples', () => {
    it('should work for image elements', () => {
      // <img class="cover" src="..." />
      const imgClass = generateClass('cover');
      expect(imgClass).toContain('object-fit:cover');
      expect(imgClass).toContain('background-size:cover');
    });

    it('should work for background elements', () => {
      // <div class="contain bg-image(url(...))" />
      const bgClass = generateClass('contain');
      expect(bgClass).toContain('background-size:contain');
      expect(bgClass).toContain('object-fit:contain');
    });

    it('should work with specific object utilities', () => {
      // <img class="object(cover) object-position(top)" src="..." />
      const objectCover = generateClass('object(cover)');
      const objectPosition = generateClass('object-position(top)');
      
      expect(objectCover).toContain('object-fit:cover');
      expect(objectPosition).toContain('object-position:top');
    });
  });
});