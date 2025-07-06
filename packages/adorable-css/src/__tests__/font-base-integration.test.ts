import { describe, it, expect } from 'vitest';
import { generateCSSWithTokens } from '../core/generators/generator';

describe('font(base) integration test', () => {
  it('should generate CSS for font(base) with tokens', () => {
    const css = generateCSSWithTokens('font(base)');
    
    // Should include the CSS variable for font-md
    expect(css).toContain('--font-md: 1rem');
    
    // Should generate the CSS class that uses the variable
    expect(css).toContain('.font\\(base\\){font-size:var(--font-md)}');
  });

  it('should generate CSS for font(base/1.5) with tokens', () => {
    const css = generateCSSWithTokens('font(base/1.5)');
    
    // Should include the CSS variable for font-md
    expect(css).toContain('--font-md: 1rem');
    
    // Should generate the CSS class that uses the variable
    expect(css).toContain('.font\\(base\\/1\\.5\\){font-size:var(--font-md);line-height:1.5}');
  });

  it('should generate CSS for font(base/1.5/0.02em) with tokens', () => {
    const css = generateCSSWithTokens('font(base/1.5/0.02em)');
    
    // Should include the CSS variable for font-md
    expect(css).toContain('--font-md: 1rem');
    
    // Should generate the CSS class that uses the variable
    expect(css).toContain('.font\\(base\\/1\\.5\\/0\\.02em\\){font-size:var(--font-md);line-height:1.5;letter-spacing:0.02em}');
  });

  it('should verify that font(base) and font(md) generate identical CSS', () => {
    const cssBase = generateCSSWithTokens('font(base)', { includeTokens: false });
    const cssMd = generateCSSWithTokens('font(md)', { includeTokens: false });
    
    // Both should generate identical CSS rules
    expect(cssBase).toContain('.font\\(base\\){font-size:var(--font-md)}');
    expect(cssMd).toContain('.font\\(md\\){font-size:var(--font-md)}');
  });
});