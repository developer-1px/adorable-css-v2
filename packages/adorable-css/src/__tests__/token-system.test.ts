import { describe, it, expect } from 'vitest';
import { generateCSSWithTokens } from '../07-generator/generator';
import { generateUsedTokensCSS } from '../02-design_tokens/used-tokens';

describe('Token System', () => {
  it('should generate root variables', () => {
    const rootVars = generateUsedTokensCSS();
    expect(rootVars).toContain(':root {');
    expect(rootVars).toContain('--text-sm: 0.875rem;');
    expect(rootVars).toContain('--text-md: 1rem;');
    expect(rootVars).toContain('--text-lg: 1.125rem;');
    expect(rootVars).toContain('--spacing-sm: 0.75rem;');
    expect(rootVars).toContain('--spacing-md: 1rem;');
    expect(rootVars).toContain('--spacing-lg: 1.5rem;');
  });

  it('should use text tokens in generated CSS', () => {
    const css = generateCSSWithTokens(['text(sm)', 'text(md)', 'text(lg)'], { includeTokens: false });
    expect(css).toContain('font-size:var(--text-sm)');
    expect(css).toContain('font-size:var(--text-md)');
    expect(css).toContain('font-size:var(--text-lg)');
  });

  it('should use spacing tokens in generated CSS', () => {
    const css = generateCSSWithTokens(['p(sm)', 'p(md)', 'p(lg)'], { includeTokens: false });
    expect(css).toContain('padding:var(--spacing-sm)');
    expect(css).toContain('padding:var(--spacing-md)');
    expect(css).toContain('padding:var(--spacing-lg)');
  });

  it('should include root variables when includeTokens is true', () => {
    const css = generateCSSWithTokens(['text(sm)']);
    expect(css).toContain(':root {');
    expect(css).toContain('--text-sm: 0.875rem;');
    expect(css).toContain('.text\\(sm\\)');
    expect(css).toContain('font-size:var(--text-sm)');
  });

  it('should handle all size tokens', () => {
    const tokens = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];
    const classes = tokens.map(t => `text(${t})`);
    const css = generateCSSWithTokens(classes, { includeTokens: false });
    
    tokens.forEach(token => {
      expect(css).toContain(`font-size:var(--text-${token})`);
    });
  });
});