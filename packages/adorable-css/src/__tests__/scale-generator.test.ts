import { describe, it, expect } from 'vitest';
import {
  generateTypographyScale,
  generateSpacingScale,
  generateContainerScale,
  generateSizeScale,
  generateTokenScales,
  SCALE_RATIOS,
  createTokens,
} from '../design-system/tokens/index';

describe('Scale Generator', () => {
  describe('generateTypographyScale', () => {
    it('should generate default typography scale', () => {
      const scale = generateTypographyScale();
      
      expect(scale).toHaveProperty('3xs', '0.5rem');
      expect(scale).toHaveProperty('md', '1rem');
      expect(scale).toHaveProperty('9xl', '8rem');
      expect(Object.keys(scale)).toHaveLength(15);
    });
  });

  describe('generateSpacingScale', () => {
    it('should generate default spacing scale', () => {
      const scale = generateSpacingScale();
      
      expect(scale).toHaveProperty('xs', '0.25rem');
      expect(scale).toHaveProperty('lg', '1rem');
      expect(scale).toHaveProperty('9xl', '8rem');
      expect(Object.keys(scale)).toHaveLength(13);
    });
  });

  describe('generateContainerScale', () => {
    it('should generate container scale with special values', () => {
      const scale = generateContainerScale();
      
      expect(scale).toHaveProperty('xs', '20rem');
      expect(scale).toHaveProperty('9xl', '100rem');
      expect(scale).toHaveProperty('full', '100%');
      expect(scale).toHaveProperty('screen', '100vw');
      expect(scale).toHaveProperty('prose', '65ch');
    });
  });

  describe('generateSizeScale', () => {
    it('should generate size scale with legacy values', () => {
      const scale = generateSizeScale();
      
      expect(scale).toHaveProperty('4xs', '1rem');
      expect(scale).toHaveProperty('2xl', '6rem');
      // Legacy container sizes
      expect(scale).toHaveProperty('3xl', '20rem');
      expect(scale).toHaveProperty('9xl', '96rem');
      // Special values
      expect(scale).toHaveProperty('full', '100%');
    });
  });

  describe('generateTokenScales', () => {
    it('should generate all scales with default config', () => {
      const scales = generateTokenScales();
      
      expect(scales).toHaveProperty('font');
      expect(scales).toHaveProperty('spacing');
      expect(scales).toHaveProperty('container');
      expect(scales).toHaveProperty('size');
      
      expect(scales.font.md).toBe('1rem');
      expect(scales.spacing.lg).toBe('1rem');
    });

    it('should accept custom configuration', () => {
      const scales = generateTokenScales({
        typography: {
          base: 18,
          ratio: SCALE_RATIOS.MAJOR_THIRD,
          steps: 10,
        },
      });
      
      expect(scales.font).toBeDefined();
      expect(scales.spacing).toBeDefined();
    });
  });

  describe('createTokens', () => {
    it('should create complete token structure', () => {
      const tokens = createTokens();
      
      // Check generated scales
      expect(tokens.font).toBeDefined();
      expect(tokens.spacing).toBeDefined();
      expect(tokens.container).toBeDefined();
      expect(tokens.size).toBeDefined();
      
      // Check static tokens
      expect(tokens.lineHeight).toBeDefined();
      expect(tokens.letterSpacing).toBeDefined();
      expect(tokens.fontWeight).toBeDefined();
      expect(tokens.radius).toBeDefined();
      expect(tokens.shadow).toBeDefined();
      expect(tokens.colors).toBeDefined();
      expect(tokens.opacity).toBeDefined();
      expect(tokens.zIndex).toBeDefined();
      expect(tokens.duration).toBeDefined();
      expect(tokens.ease).toBeDefined();
      expect(tokens.heading).toBeDefined();
    });

    it('should match default tokens structure', () => {
      const tokens = createTokens();
      
      // Verify some key values match expectations
      expect(tokens.font.md).toBe('1rem');
      expect(tokens.spacing.lg).toBe('1rem');
      expect(tokens.radius.md).toBe('0.5rem');
      expect(tokens.shadow.md).toContain('0 4px 8px');
    });
  });
});