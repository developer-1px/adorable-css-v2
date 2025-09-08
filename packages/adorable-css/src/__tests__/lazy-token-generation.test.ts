import { describe, it, expect, beforeEach } from 'vitest';
import { generateCSS } from '../07-generator/generator';
import { clearTokenRegistry } from '../02-design_tokens/tokenRegistry';

describe('Lazy Token Generation', () => {
  beforeEach(() => {
    // Clear token registry before each test
    clearTokenRegistry();
  });

  it('should only generate CSS variables for used tokens', () => {
    const css = generateCSS(['text(sm)', 'p(lg)']);
    
    // Should contain the used tokens
    expect(css).toContain('--text-sm: 0.875rem');
    expect(css).toContain('--spacing-lg: 1.5rem');
    
    // Should NOT contain unused tokens
    expect(css).not.toContain('--text-xs');
    expect(css).not.toContain('--text-md');
    expect(css).not.toContain('--text-lg');
    expect(css).not.toContain('--text-xl');
    expect(css).not.toContain('--spacing-sm');
    expect(css).not.toContain('--spacing-md');
    expect(css).not.toContain('--spacing-xl');
  });

  it('should generate empty :root when no tokens are used', () => {
    const css = generateCSS(['w(100px)', 'h(50px)']);
    
    // Should not have any :root section with CSS variables when no tokens are used
    expect(css).not.toContain(':root {');
  });

  it('should track tokens used in clamp syntax', () => {
    const css = generateCSS(['text(sm..2xl)']);
    
    // Should contain both min and max tokens
    expect(css).toContain('--text-sm: 0.875rem');
    expect(css).toContain('--text-2xl: 1.5rem');
    
    // Should not contain tokens between min and max
    expect(css).not.toContain('--text-md');
    expect(css).not.toContain('--text-lg');
    expect(css).not.toContain('--text-xl');
  });

  it('should track tokens used with default clamp values', () => {
    const css = generateCSS(['text(..3xl)']);
    
    // Should contain the default min token and specified max
    expect(css).toContain('--text-sm: 0.875rem'); // default min
    expect(css).toContain('--text-3xl: 1.875rem'); // specified max
  });

  it('should track tokens from different categories', () => {
    const css = generateCSS(['text(lg)', 'p(md)', 'bg(primary)']);
    
    // Should contain tokens from different categories
    expect(css).toContain('/* Text size tokens */');
    expect(css).toContain('--text-lg: 1.125rem');
    
    expect(css).toContain('/* Spacing tokens */');
    expect(css).toContain('--spacing-md: 1rem');
    
    expect(css).toContain('/* Color tokens */');
    expect(css).toContain('--color-primary');
  });

  it('should handle container tokens separately', () => {
    const css = generateCSS(['max-w(lg)']);
    
    // Should contain container token
    expect(css).toContain('/* Container tokens */');
    expect(css).toContain('--container-lg: 1.5rem');
  });

  it('should not duplicate tokens when used multiple times', () => {
    const css = generateCSS(['text(sm)', 'text(sm)', 'p(sm)', 'p(sm)']);
    
    // Count occurrences of each token
    const smTextCount = (css.match(/--text-sm:/g) || []).length;
    const smSpacingCount = (css.match(/--spacing-sm:/g) || []).length;
    
    // Each token should appear only once
    expect(smTextCount).toBe(1);
    expect(smSpacingCount).toBe(1);
  });

  it('should work with includeTokens option', () => {
    // When includeTokens is false, no :root should be generated
    const cssWithoutTokens = generateCSS(['text(sm)', 'p(lg)'], { includeTokens: false });
    
    expect(cssWithoutTokens).not.toContain(':root {');
    expect(cssWithoutTokens).not.toContain('--text-sm:');
    expect(cssWithoutTokens).not.toContain('--spacing-lg:');
    
    // But the CSS should still use var() references
    expect(cssWithoutTokens).toContain('font-size:var(--text-sm)');
    expect(cssWithoutTokens).toContain('padding:var(--spacing-lg)');
  });
});