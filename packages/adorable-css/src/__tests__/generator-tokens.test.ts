import { describe, it, expect } from 'vitest';
import { generateCSSWithTokens } from '../01-core/generators/generator';
import { defaultTokens } from '../02-design_tokens/design-system/tokens/index';

describe('generateCSSWithTokens', () => {
  it('should include 02-design_tokens by default', () => {
    const css = generateCSSWithTokens('p(lg)');
    
    expect(css).toContain(':root {');
    expect(css).toContain('--spacing-lg: 1rem');
    expect(css).toContain('.p\\(lg\\){padding:var(--spacing-lg)}');
  });

  it('should work with array input', () => {
    const css = generateCSSWithTokens(['p(lg)', 'c(red)']);
    
    expect(css).toContain(':root {');
    expect(css).toContain('.p\\(lg\\){padding:var(--spacing-lg)}');
    expect(css).toContain('.c\\(red\\){color:red}');
  });

  it('should exclude 02-design_tokens when disabled', () => {
    const css = generateCSSWithTokens('p(lg)', { includeTokens: false });
    
    expect(css).not.toContain(':root {');
    expect(css).toContain('.p\\(lg\\){padding:var(--spacing-lg)}');
  });

  it('should use custom 02-design_tokens', () => {
    const customTokens = {
      ...defaultTokens,
      spacing: {
        ...defaultTokens.spacing,
        mega: '999rem'
      }
    };
    
    const css = generateCSSWithTokens('p(mega)', { tokens: customTokens });
    
    expect(css).toContain('--spacing-mega: 999rem');
    expect(css).toContain('.p\\(mega\\){padding:var(--spacing-mega)}');
  });

  it('should minify when requested', () => {
    const css = generateCSSWithTokens('p(lg)', { minify: true });
    
    // Should not have unnecessary whitespace
    expect(css).not.toContain('\n');
    expect(css).not.toContain(' {');
    expect(css).not.toContain('; ');
    expect(css).not.toContain(': ');
    
    // Should still be valid CSS
    expect(css).toContain(':root{');
    expect(css).toContain('.p\\(lg\\){padding:var(--spacing-lg)}');
  });

  it('should handle complex classes with 02-design_tokens', () => {
    const css = generateCSSWithTokens([
      'vbox(pack)',
      'gap(lg)',
      'p(xl)',
      'r(md)',
      'shadow(lg)'
    ]);
    
    expect(css).toContain(':root {');
    expect(css).toContain('--spacing-lg: 1rem');
    expect(css).toContain('--spacing-xl: 1.25rem');
    expect(css).toContain('--radius-md: 0.5rem');
    expect(css).toContain('--shadow-lg:');
    
    expect(css).toContain('.vbox\\(pack\\)');
    expect(css).toContain('.gap\\(lg\\){gap:var(--spacing-lg)}');
    expect(css).toContain('.p\\(xl\\){padding:var(--spacing-xl)}');
    expect(css).toContain('.r\\(md\\){border-radius:var(--radius-md)}');
    expect(css).toContain('.shadow\\(lg\\){box-shadow:var(--shadow-lg)}');
  });

  it('should include animations when used', () => {
    const css = generateCSSWithTokens(['fade-in', 'p(lg)']);
    
    expect(css).toContain(':root {');
    expect(css).toContain('@keyframes fade-in');
    expect(css).toContain('.fade-in');
    expect(css).toContain('.p\\(lg\\)');
  });
});