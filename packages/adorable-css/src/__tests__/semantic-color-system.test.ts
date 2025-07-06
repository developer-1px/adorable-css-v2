import { describe, it, expect } from 'vitest';
import {
  generateSemanticColorVariables,
  buildSemanticColorConfig,
  getColorScheme,
  createFromPrimaryColor,
  COLOR_SCHEMES
} from '../02-design_tokens/design-system/colors/semantic-color-system';

describe('Semantic Color System', () => {
  describe('generateSemanticColorVariables', () => {
    it('should generate CSS variables for semantic colors', () => {
      const config = {
        primary: 'indigo-600',
        secondary: 'slate-600',
        accent: 'violet-500',
        mute: 'gray-500'
      };
      
      const result = generateSemanticColorVariables(config);
      
      expect(result).toContain('--primary: var(--indigo-600);');
      expect(result).toContain('--primary-50: var(--indigo-50);');
      expect(result).toContain('--primary-100: var(--indigo-100);');
      expect(result).toContain('--primary-900: var(--indigo-900);');
      
      expect(result).toContain('--secondary: var(--slate-600);');
      expect(result).toContain('--accent: var(--violet-500);');
      expect(result).toContain('--mute: var(--gray-500);');
    });
    
    it('should handle brand gradient', () => {
      const config = {
        primary: 'indigo-600',
        brand: 'indigo-600..violet-500'
      };
      
      const result = generateSemanticColorVariables(config);
      
      expect(result).toContain('--brand-start: var(--indigo-600);');
      expect(result).toContain('--brand-end: var(--violet-500);');
      expect(result).toContain('--brand-gradient: linear-gradient(135deg, var(--brand-start), var(--brand-end));');
    });
  });
  
  describe('buildSemanticColorConfig', () => {
    it('should build semantic color configuration object', () => {
      const config = {
        primary: 'blue-600',
        success: 'green-500',
        error: 'red-600'
      };
      
      const result = buildSemanticColorConfig(config);
      
      expect(result.primary).toBe('blue-600');
      expect(result['primary-50']).toBe('blue-50');
      expect(result['primary-500']).toBe('blue-500');
      expect(result['primary-900']).toBe('blue-900');
      
      expect(result.success).toBe('green-500');
      expect(result['success-600']).toBe('green-600');
      
      expect(result.error).toBe('red-600');
      expect(result['error-50']).toBe('red-50');
    });
  });
  
  describe('Color Schemes', () => {
    it('should have predefined color schemes', () => {
      expect(COLOR_SCHEMES.default.primary).toBe('indigo-600');
      expect(COLOR_SCHEMES.professional.primary).toBe('blue-600');
      expect(COLOR_SCHEMES.creative.primary).toBe('purple-600');
      expect(COLOR_SCHEMES.nature.primary).toBe('green-600');
      expect(COLOR_SCHEMES.monochrome.primary).toBe('gray-900');
    });
    
    it('should get color scheme by name', () => {
      const scheme = getColorScheme('professional');
      expect(scheme.primary).toBe('blue-600');
      expect(scheme.accent).toBe('cyan-500');
    });
  });
  
  describe('createFromPrimaryColor', () => {
    it('should create color scheme from primary color', () => {
      const scheme = createFromPrimaryColor('purple-600');
      
      expect(scheme.primary).toBe('purple-600');
      expect(scheme.secondary).toBe('slate-600');
      expect(scheme.mute).toBe('gray-500');
      expect(scheme.brand).toContain('purple-600');
    });
    
    it('should accept custom secondary and accent families', () => {
      const scheme = createFromPrimaryColor('blue-600', {
        secondaryFamily: 'gray',
        accentFamily: 'cyan'
      });
      
      expect(scheme.primary).toBe('blue-600');
      expect(scheme.secondary).toBe('gray-600');
      expect(scheme.accent).toBe('cyan-500');
    });
    
    it('should throw error for invalid color format', () => {
      expect(() => createFromPrimaryColor('invalid-color')).toThrow();
      expect(() => createFromPrimaryColor('#123456')).toThrow();
    });
  });
});