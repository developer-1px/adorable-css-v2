import { describe, it, expect } from 'vitest';
import { 
  ResponsiveSelector, 
  MediaQueryDecorator, 
  ResponsiveDecoratorFactory,
  isResponsiveClass, 
  extractBaseClass, 
  createResponsiveCSS 
} from '../extensions/responsive/responsive-decorator';
import { generateCSS } from '../core/parser/generator';

describe('Responsive Decorator Pattern', () => {
  describe('ResponsiveSelector.analyze()', () => {
    it('should correctly analyze min-width responsive patterns', () => {
      const pattern = ResponsiveSelector.analyze('md:hidden');
      
      expect(pattern).toEqual({
        breakpoint: 'md',
        isMaxWidth: false,
        selector: 'hidden',
        originalClass: 'md:hidden'
      });
    });
    
    it('should correctly analyze max-width responsive patterns', () => {
      const pattern = ResponsiveSelector.analyze('..lg:block');
      
      expect(pattern).toEqual({
        breakpoint: 'lg',
        isMaxWidth: true,
        selector: 'block',
        originalClass: '..lg:block'
      });
    });
    
    it('should handle complex selectors', () => {
      const pattern = ResponsiveSelector.analyze('xl:hbox(middle+between)');
      
      expect(pattern).toEqual({
        breakpoint: 'xl',
        isMaxWidth: false,
        selector: 'hbox(middle+between)',
        originalClass: 'xl:hbox(middle+between)'
      });
    });
    
    it('should return null for non-responsive classes', () => {
      expect(ResponsiveSelector.analyze('hidden')).toBeNull();
      expect(ResponsiveSelector.analyze('block')).toBeNull();
      expect(ResponsiveSelector.analyze('hbox')).toBeNull();
    });
    
    it('should return null for invalid breakpoints', () => {
      expect(ResponsiveSelector.analyze('invalid:hidden')).toBeNull();
      expect(ResponsiveSelector.analyze('xxl:block')).toBeNull();
    });
  });
  
  describe('MediaQueryDecorator', () => {
    const decorator = new MediaQueryDecorator();
    
    it('should wrap CSS in min-width media query', () => {
      const pattern = {
        breakpoint: 'md' as const,
        isMaxWidth: false,
        selector: 'hidden',
        originalClass: 'md:hidden'
      };
      
      const baseRule = { display: 'none' };
      const result = decorator.decorate(baseRule, pattern);
      
      expect(result).toEqual({
        '@media (min-width: 768px)': {
          display: 'none'
        }
      });
    });
    
    it('should wrap CSS in max-width media query', () => {
      const pattern = {
        breakpoint: 'lg' as const,
        isMaxWidth: true,
        selector: 'block',
        originalClass: '..lg:block'
      };
      
      const baseRule = { display: 'block' };
      const result = decorator.decorate(baseRule, pattern);
      
      expect(result).toEqual({
        '@media (max-width: 1024px)': {
          display: 'block'
        }
      });
    });
  });
  
  describe('ResponsiveDecoratorFactory', () => {
    const factory = new ResponsiveDecoratorFactory();
    
    it('should create responsive rules correctly', () => {
      const pattern = {
        breakpoint: 'sm' as const,
        isMaxWidth: false,
        selector: 'hidden',
        originalClass: 'sm:hidden'
      };
      
      const baseRule = { display: 'none' };
      const result = factory.createResponsiveRule(baseRule, pattern);
      
      expect(result).toEqual({
        '@media (min-width: 640px)': {
          display: 'none'
        }
      });
    });
    
    it('should process multiple responsive classes', () => {
      const rules = [
        { className: 'hidden', cssRule: { display: 'none' } },
        { className: 'md:block', cssRule: { display: 'block' } },
        { className: '..lg:hidden', cssRule: { display: 'none' } }
      ];
      
      const result = factory.processResponsiveClasses(rules);
      
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ display: 'none' }); // non-responsive
      expect(result[1]).toHaveProperty('@media (min-width: 768px)');
      expect(result[2]).toHaveProperty('@media (max-width: 1024px)');
    });
  });
  
  describe('Utility functions', () => {
    it('should correctly identify responsive classes', () => {
      expect(isResponsiveClass('md:hidden')).toBe(true);
      expect(isResponsiveClass('..lg:block')).toBe(true);
      expect(isResponsiveClass('xl:hbox(middle)')).toBe(true);
      expect(isResponsiveClass('hidden')).toBe(false);
      expect(isResponsiveClass('block')).toBe(false);
    });
    
    it('should extract base classes correctly', () => {
      expect(extractBaseClass('md:hidden')).toBe('hidden');
      expect(extractBaseClass('..lg:block')).toBe('block');
      expect(extractBaseClass('xl:hbox(middle)')).toBe('hbox(middle)');
      expect(extractBaseClass('hidden')).toBe('hidden'); // non-responsive passthrough
    });
    
    it('should create responsive CSS', () => {
      const baseCSS = { display: 'none' };
      const result = createResponsiveCSS('md:hidden', baseCSS);
      
      expect(result).toEqual({
        '@media (min-width: 768px)': {
          display: 'none'
        }
      });
    });
    
    it('should return null for non-responsive classes in createResponsiveCSS', () => {
      const baseCSS = { display: 'none' };
      const result = createResponsiveCSS('hidden', baseCSS);
      
      expect(result).toBeNull();
    });
  });
  
  describe('Integration with CSS generation', () => {
    it('should generate responsive CSS for simple classes', () => {
      const css = generateCSS(['md:hidden']);
      
      expect(css).toContain('@media (min-width: 768px)');
      expect(css).toContain('.md\\:hidden{display:none}');
    });
    
    it('should generate responsive CSS for max-width patterns', () => {
      const css = generateCSS(['..lg:block']);
      
      expect(css).toContain('@media (max-width: 1024px)');
      // The class selector is wrapped inside the media query
      expect(css).toMatch(/@media \(max-width: 1024px\)\{\.\\\.lg\\:block\{display:block\}\}/);
    });
    
    it('should handle complex responsive selectors', () => {
      const css = generateCSS(['xl:hbox(middle)']);
      
      expect(css).toContain('@media (min-width: 1280px)');
      expect(css).toContain('xl\\:hbox\\(middle\\)');
    });
    
    it('should handle mixed responsive and non-responsive classes', () => {
      const css = generateCSS(['hidden', 'md:block', 'hbox', '..lg:vbox']);
      
      // Non-responsive classes should generate normal CSS
      expect(css).toContain('.hidden{display:none}');
      expect(css).toContain('.hbox{');
      
      // Responsive classes should generate media queries
      expect(css).toContain('@media (min-width: 768px)');
      expect(css).toContain('@media (max-width: 1024px)');
    });
  });
  
  describe('Edge cases and validation', () => {
    it('should handle invalid responsive patterns gracefully', () => {
      const css = generateCSS(['invalid:hidden', 'xxl:block']);
      
      // Should either warn or handle gracefully
      expect(css).toBeDefined();
    });
    
    it('should handle breakpoint variations', () => {
      const breakpoints = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'];
      
      breakpoints.forEach(bp => {
        const pattern = ResponsiveSelector.analyze(`${bp}:hidden`);
        expect(pattern).not.toBeNull();
        expect(pattern?.breakpoint).toBe(bp);
        
        const maxPattern = ResponsiveSelector.analyze(`..${bp}:hidden`);
        expect(maxPattern).not.toBeNull();
        expect(maxPattern?.isMaxWidth).toBe(true);
      });
    });
    
    it('should properly escape CSS selectors in responsive context', () => {
      const css = generateCSS(['md:hbox(middle+between)']);
      
      // Should properly escape the selector
      expect(css).toContain('md\\:hbox\\(middle\\+between\\)');
      expect(css).toContain('@media (min-width: 768px)');
    });
  });
});