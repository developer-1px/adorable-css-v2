import { describe, it, expect } from 'vitest';
import { generateClass } from './generator';

describe('Generator with section utilities', () => {
  it('should generate CSS variables for section() utility', () => {
    const css = generateClass('section()');
    expect(css).toContain('.section\\(\\)');
    expect(css).toContain('padding-top:var(--spacing-4xl)');
    expect(css).toContain('padding-bottom:var(--spacing-4xl)');
    expect(css).toContain('padding-left:var(--spacing-lg)');
    expect(css).toContain('padding-right:var(--spacing-lg)');
  });

  it('should generate CSS variables for section(hero)', () => {
    const css = generateClass('section(hero)');
    expect(css).toContain('.section\\(hero\\)');
    expect(css).toContain('padding-top:var(--spacing-6xl)');
    expect(css).toContain('padding-bottom:var(--spacing-6xl)');
    expect(css).toContain('min-height:100vh');
  });

  it('should generate CSS variables for contain()', () => {
    const css = generateClass('contain()');
    expect(css).toContain('.contain\\(\\)');
    expect(css).toContain('padding-left:var(--spacing-lg)');
    expect(css).toContain('padding-right:var(--spacing-lg)');
    expect(css).toContain('max-width:64rem');
  });

  it('should generate CSS variables for stack(lg)', () => {
    const css = generateClass('stack(lg)');
    expect(css).toContain('.stack\\(lg\\)');
    expect(css).toContain('gap:var(--spacing-lg)');
  });

  it('should handle multiple classes', () => {
    const css = generateClass('section() contain()');
    // Multiple classes are combined into a single selector
    expect(css).toContain('.section\\(\\)\\ contain\\(\\)');
    expect(css).toContain('var(--spacing-4xl)');
    expect(css).toContain('var(--spacing-lg)');
    expect(css).toContain('max-width:64rem');
  });
  
  it('should generate correct CSS output format', () => {
    const css = generateClass('section()');
    // Check that it's minified (no spaces after colons)
    expect(css).toMatch(/padding-top:var\(--spacing-4xl\)/);
    // Check that the full CSS rule is properly formed
    expect(css).toMatch(/\.section\\\(\\\)\{[^}]+\}/);
  });
});