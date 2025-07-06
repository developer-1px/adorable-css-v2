import { describe, it, expect } from 'vitest';
import { 
  generateScale, 
  generateSpacingScale, 
  generateTokenSystem,
  SCALE_RATIOS,
  SCALE_PRESETS 
} from './scale-generator';

describe('Scale Generator', () => {
  describe('generateScale', () => {
    it('should generate scale with md as base point', () => {
      const scale = generateScale({
        base: 16,
        ratio: 1.2, // Minor Third
        unit: 'px'
      });
      
      // md should be exactly the base value
      expect(scale.md).toBe('16px');
      
      // Smaller values should decrease by ratio
      expect(parseFloat(scale.sm)).toBeCloseTo(16 / 1.2, 1);
      expect(parseFloat(scale.xs)).toBeCloseTo(16 / (1.2 * 1.2), 1);
      
      // Larger values should increase by ratio
      expect(parseFloat(scale.lg)).toBeCloseTo(16 * 1.2, 1);
      expect(parseFloat(scale.xl)).toBeCloseTo(16 * 1.2 * 1.2, 1);
    });
    
    it('should convert to rem units correctly', () => {
      const scale = generateScale({
        base: 16,
        ratio: 1.5,
        unit: 'rem'
      });
      
      expect(scale.md).toBe('1rem'); // 16px = 1rem
      expect(scale.lg).toBe('1.5rem'); // 24px = 1.5rem
      expect(scale.xl).toBe('2.25rem'); // 36px = 2.25rem
    });
    
    it('should respect min/max clamps', () => {
      const scale = generateScale({
        base: 16,
        ratio: 2, // Very high ratio
        unit: 'px',
        clamp: {
          min: 12,
          max: 48
        }
      });
      
      // 4xs would be 16 / (2^9) = 0.03125, but clamped to 12
      expect(scale['4xs']).toBe('12px');
      
      // 4xl would be 16 * (2^10) = 16384, but clamped to 48
      expect(scale['4xl']).toBe('48px');
    });
  });
  
  describe('generateSpacingScale', () => {
    it('should generate linear spacing scale', () => {
      const spacing = generateSpacingScale({
        baseUnit: 4,
        scale: 'linear',
        unit: 'px'
      });
      
      expect(spacing['4xs']).toBe('1px');   // 4 * 0.25
      expect(spacing['3xs']).toBe('2px');   // 4 * 0.5
      expect(spacing.md).toBe('6px');       // 4 * 1.5
      expect(spacing.lg).toBe('8px');       // 4 * 2
    });
    
    it('should accept custom multipliers', () => {
      const spacing = generateSpacingScale({
        baseUnit: 8,
        scale: [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32],
        unit: 'rem'
      });
      
      expect(spacing['4xs']).toBe('0.25rem'); // 8 * 0.5 / 16
      expect(spacing.md).toBe('1.5rem');      // 8 * 3 / 16
      expect(spacing['2xl']).toBe('3rem');    // 8 * 6 / 16
    });
    
    it('should handle progressive scale', () => {
      const spacing = generateSpacingScale({
        baseUnit: 4,
        scale: 'progressive'
      });
      
      // Progressive scale should have tighter spacing at small sizes
      const xs = parseFloat(spacing.xs);
      const sm = parseFloat(spacing.sm);
      const md = parseFloat(spacing.md);
      const lg = parseFloat(spacing.lg);
      
      // Check that the differences increase
      expect(sm - xs).toBeLessThan(lg - md);
    });
  });
  
  describe('generateTokenSystem', () => {
    it('should generate complete token system', () => {
      const tokens = generateTokenSystem({
        typography: {
          base: 16,
          ratio: SCALE_RATIOS.MINOR_THIRD
        },
        spacing: {
          baseUnit: 4,
          scale: 'progressive'
        },
        sizing: {
          base: 320,
          ratio: SCALE_RATIOS.PERFECT_FOURTH,
          unit: 'px'
        }
      });
      
      expect(tokens).toHaveProperty('fontSize');
      expect(tokens).toHaveProperty('spacing');
      expect(tokens).toHaveProperty('size');
      
      expect(tokens.fontSize.md).toBe('1rem');
      expect(tokens.spacing.md).toBe('1.5rem');
      expect(tokens.size.md).toBe('320px');
    });
    
    it('should use presets correctly', () => {
      const tokens = generateTokenSystem({
        typography: SCALE_PRESETS.typography.default,
        spacing: SCALE_PRESETS.spacing.default
      });
      
      expect(tokens.fontSize.md).toBe('1rem');
      expect(tokens.fontSize.lg).toBe('1.2rem'); // Minor Third ratio
    });
  });
  
  describe('Common notation consistency', () => {
    it('should maintain consistent ordering', () => {
      const scale = generateScale({
        base: 16,
        ratio: 1.25
      });
      
      const steps = Object.keys(scale);
      const expectedOrder = ['4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
      
      expect(steps).toEqual(expectedOrder);
    });
    
    it('should calculate correct relative positions', () => {
      const scale = generateScale({
        base: 100, // Easy base for mental math
        ratio: 2,   // Simple doubling
        unit: 'px'
      });
      
      // Check that each step is correctly calculated
      expect(scale['2xs']).toBe('25px');  // 100 / 2^3
      expect(scale.xs).toBe('50px');      // 100 / 2^2
      expect(scale.sm).toBe('50px');      // 100 / 2^1 (rounded)
      expect(scale.md).toBe('100px');     // 100 * 2^0
      expect(scale.lg).toBe('200px');     // 100 * 2^1
      expect(scale.xl).toBe('400px');     // 100 * 2^2
      expect(scale['2xl']).toBe('800px'); // 100 * 2^3
    });
  });
});