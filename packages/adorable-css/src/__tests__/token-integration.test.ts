import { describe, it, expect } from 'vitest';
import { generateCSSWithTokens } from '../07-generator/generator';

describe('Token Integration', () => {
  it('should generate CSS with text tokens', () => {
    const css = generateCSSWithTokens(['text(sm)', 'text(lg)'], { includeTokens: true });
    
    // Check root variables are included
    expect(css).toContain(':root {');
    expect(css).toContain('--text-sm: 0.875rem;');
    expect(css).toContain('--text-lg: 1.125rem;');
    
    // Check classes use variables
    expect(css).toContain('.text\\(sm\\)');
    expect(css).toContain('font-size:var(--text-sm)');
    expect(css).toContain('.text\\(lg\\)');
    expect(css).toContain('font-size:var(--text-lg)');
  });

  it('should generate CSS with spacing tokens', () => {
    const css = generateCSSWithTokens(['p(sm)', 'm(lg)'], { includeTokens: true });
    
    // Check root variables are included
    expect(css).toContain('--spacing-sm: 0.75rem;');
    expect(css).toContain('--spacing-lg: 1.5rem;');
    
    // Check classes use variables
    expect(css).toContain('.p\\(sm\\)');
    expect(css).toContain('padding:var(--spacing-sm)');
    expect(css).toContain('.m\\(lg\\)');
    expect(css).toContain('margin:var(--spacing-lg)');
  });

  it('should only generate used tokens in root (lazy loading)', () => {
    // Generate CSS with specific tokens used
    const classes = ['text(sm)', 'text(lg)', 'p(md)', 'r(full)'];
    const css = generateCSSWithTokens(classes, { includeTokens: true });
    
    // Check only used tokens are included
    expect(css).toContain('--text-sm: 0.875rem;');
    expect(css).toContain('--text-lg: 1.125rem;');
    expect(css).toContain('--spacing-md: 1rem;');
    expect(css).toContain('--radius-full: 9999px;');
    
    // Check unused tokens are NOT included
    expect(css).not.toContain('--text-3xs:');
    expect(css).not.toContain('--spacing-xs:');
    expect(css).not.toContain('--radius-sm:');
  });
});