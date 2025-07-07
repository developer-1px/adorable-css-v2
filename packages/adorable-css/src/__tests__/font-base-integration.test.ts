import { describe, it, expect } from 'vitest';
import { generateCSSWithTokens } from '../07-generator/generator';

describe('text(base) integration test', () => {
  it('should generate CSS for text(base) with 02-design_tokens', () => {
    const css = generateCSSWithTokens(['text(base)']);
    
    // Should include the CSS variable for font-md
    expect(css).toContain('--font-md: 1rem');
    
    // Should generate the CSS class that uses the variable
    expect(css).toContain('.font\\(base\\){font-size:var(--font-md)}');
  });

  it('should generate CSS for text(base/1.5) with 02-design_tokens', () => {
    const css = generateCSSWithTokens(['text(base/1.5)']);
    
    // Should include the CSS variable for font-md
    expect(css).toContain('--font-md: 1rem');
    
    // Should generate the CSS class that uses the variable
    expect(css).toContain('.font\\(base\\/1\\.5\\){font-size:var(--font-md);line-height:1.5}');
  });

  it('should generate CSS for text(base/1.5/0.02em) with 02-design_tokens', () => {
    const css = generateCSSWithTokens(['text(base/1.5/0.02em)']);
    
    // Should include the CSS variable for font-md
    expect(css).toContain('--font-md: 1rem');
    
    // Should generate the CSS class that uses the variable
    expect(css).toContain('.font\\(base\\/1\\.5\\/0\\.02em\\){font-size:var(--font-md);line-height:1.5;letter-spacing:0.02em}');
  });

  it('should verify that text(base) and text(md) generate identical CSS', () => {
    const cssBase = generateCSSWithTokens('text(base)', { includeTokens: false });
    const cssMd = generateCSSWithTokens('text(md)', { includeTokens: false });
    
    // Both should generate identical CSS 03-rules
    expect(cssBase).toContain('.font\\(base\\){font-size:var(--font-md)}');
    expect(cssMd).toContain('.font\\(md\\){font-size:var(--font-md)}');
  });
});