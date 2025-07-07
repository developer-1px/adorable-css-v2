import { describe, it, expect } from 'vitest';
import { prose } from '../../05-components/patterns/prose';
// Type definitions
type CSSRule = Record<string, string | Record<string, any>>;
export type RuleHandler = (args: string) => CSSRule;
export type KeywordRuleHandler = () => CSSRule;

describe('prose component with defineComponent', () => {
  it('should return base classes and CSS rule for default variant', () => {
    const result = prose();
    
    expect(Array.isArray(result)).toBe(true);
    
    if (Array.isArray(result)) {
      const [classes, cssRule] = result as [string, CSSRule];
      
      // Check base classes
      expect(classes).toContain('text(16/1.7)');
      expect(classes).toContain('c(gray-700)');
      
      // Check CSS rule has selectors
      expect(cssRule).toBeDefined();
      expect(cssRule['& h1']).toBeDefined();
      expect(cssRule['& h2']).toBeDefined();
      expect(cssRule['& a']).toBeDefined();
      expect(cssRule['& li']).toBeDefined();
    }
  });
  
  it('should apply sm variant classes', () => {
    const result = prose('sm');
    
    if (Array.isArray(result)) {
      const [classes, cssRule] = result as [string, CSSRule];
      
      // Check variant classes
      expect(classes).toContain('text(base/1.5)');
      expect(classes).toContain('max-w(sm)');
      
      // Check variant selector overrides
      expect(cssRule['& h1']).toBeDefined();
      expect(cssRule['& h2']).toBeDefined();
      expect(cssRule['& blockquote']).toBeDefined();
    }
  });
  
  it('should apply lg variant classes', () => {
    const result = prose('lg');
    
    if (Array.isArray(result)) {
      const [classes, cssRule] = result as [string, CSSRule];
      
      // Check variant classes
      expect(classes).toContain('text(xl/1.7)');
      expect(classes).toContain('max-w(4xl)');
      
      // Check variant selector overrides
      expect(cssRule['& h1']).toBeDefined();
      expect(cssRule['& p']).toBeDefined();
      expect(cssRule['& blockquote']).toBeDefined();
    }
  });
  
  it('should apply article variant', () => {
    const result = prose('article');
    
    if (Array.isArray(result)) {
      const [classes, cssRule] = result as [string, CSSRule];
      
      // Check article variant classes
      expect(classes).toContain('text(serif)');
      expect(classes).toContain('hyphens(auto)');
      
      // Check article variant selector overrides
      expect(cssRule['& p']).toBeDefined();
      expect(cssRule['& h1, h2, h3']).toBeDefined();
      expect(cssRule['& blockquote']).toBeDefined();
    }
  });
  
  it('should apply technical variant', () => {
    const result = prose('technical');
    
    if (Array.isArray(result)) {
      const [classes] = result as [string, CSSRule];
      
      // Check technical variant classes
      expect(classes).toContain('text(mono)');
    }
  });
  
  it('should apply marketing variant', () => {
    const result = prose('marketing');
    
    if (Array.isArray(result)) {
      const [classes, cssRule] = result as [string, CSSRule];
      
      // Check marketing variant classes
      expect(classes).toContain('text(lg/1.65)');
      expect(classes).toContain('tracking(tight)');
      
      // Check marketing variant selector overrides
      expect(cssRule['& h1']).toBeDefined();
      expect(cssRule['& strong']).toBeDefined();
      expect(cssRule['& .lead']).toBeDefined();
    }
  });
  
  it('should handle states', () => {
    const result = prose();
    
    if (Array.isArray(result)) {
      const [classes] = result as [string, CSSRule];
      
      // Check state classes
      expect(classes).toContain('dark:c(neutral-100)');
      expect(classes).toContain('dark:bg(neutral-900)');
    }
  });
  
  it('should handle combined size and style variants', () => {
    const result = prose('lg/article');
    
    if (Array.isArray(result)) {
      const [classes, cssRule] = result as [string, CSSRule];
      
      // Should have both lg and article variant classes
      expect(classes).toContain('text(xl/1.7)');
      expect(classes).toContain('max-w(4xl)');
      expect(classes).toContain('text(serif)');
      expect(classes).toContain('hyphens(auto)');
      
      // Should have merged selectors from both variants
      expect(cssRule['& h1']).toBeDefined();
      expect(cssRule['& p']).toBeDefined();
    }
  });
});