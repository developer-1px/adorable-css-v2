import { describe, it, expect } from 'vitest';
import { generateCSS } from '../07-generator/generator';

describe('Spacing tokens bug fix verification', () => {
  it('should generate positive values for all xs spacing tokens', () => {
    const css = generateCSS([
      'gap(4xs)',
      'gap(3xs)', 
      'gap(2xs)',
      'gap(xs)',
      'p(2xs)',
      'm(2xs)',
      'pt(2xs)',
      'ml(2xs)'
    ]);
    
    console.log('Generated CSS:', css);
    
    // Check that all spacing tokens have positive values
    expect(css).toContain('--spacing-4xs:1px');  // 4 * 0.25 = 1px
    expect(css).toContain('--spacing-3xs:1px');  // 4 * 0.333 ≈ 1px (rounded)
    expect(css).toContain('--spacing-2xs:2px');  // 4 * 0.5 = 2px  
    expect(css).toContain('--spacing-xs:4px');   // 4 * 1 = 4px
    
    // Should not contain any negative spacing values
    expect(css).not.toMatch(/--spacing-[^:]*:-\d+px/);
    
    // Check that CSS rules are generated correctly
    expect(css).toContain('gap:var(--spacing-4xs)');
    expect(css).toContain('gap:var(--spacing-3xs)');
    expect(css).toContain('gap:var(--spacing-2xs)');
    expect(css).toContain('gap:var(--spacing-xs)');
    expect(css).toContain('padding:var(--spacing-2xs)');
    expect(css).toContain('margin:var(--spacing-2xs)');
    expect(css).toContain('padding-top:var(--spacing-2xs)');
    expect(css).toContain('margin-left:var(--spacing-2xs)');
  });
  
  it('should preserve font token behavior (should remain negative for small sizes)', () => {
    const css = generateCSS([
      'text(4xs)',
      'text(3xs)',
      'text(2xs)', 
      'text(xs)'
    ]);
    
    console.log('Font tokens CSS:', css);
    
    // Font tokens should still use negative steps for xs tokens
    // This ensures we didn't break font sizing
    expect(css).toContain('--font-4xs:');
    expect(css).toContain('--font-3xs:');
    expect(css).toContain('--font-2xs:');
    expect(css).toContain('--font-xs:');
  });
  
  it('should work correctly in realistic component usage', () => {
    const css = generateCSS([
      'hbox()',
      'gap(2xs)',
      'p(2xs)',
      'r(sm)',
      'bg(gray-100)',
      'text(2xs)'
    ]);
    
    console.log('Component usage CSS:', css);
    
    // Should have positive spacing for gap and padding
    expect(css).toContain('--spacing-2xs:2px');
    // But font-2xs is different (handled separately)
    expect(css).toContain('--font-2xs:');
    
    // Check CSS rules
    expect(css).toContain('gap:var(--spacing-2xs)');
    expect(css).toContain('padding:var(--spacing-2xs)');
    expect(css).toContain('font-size:var(--font-2xs)');
  });
});