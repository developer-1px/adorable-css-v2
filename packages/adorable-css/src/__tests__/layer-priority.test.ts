import { describe, it, expect } from 'vitest';
import { generateCSS } from '../01-core/generators/generator';

describe('Layer Priority System', () => {
  it('should wrap component styles in @layer 04-components', () => {
    const css = generateCSS(['body(base)']);
    expect(css).toContain('@layer base, 04-components, utilities;');
    expect(css).toContain('@layer 04-components {');
    expect(css).toContain('.body\\(base\\)');
  });

  it('should wrap utility styles in @layer utilities', () => {
    const css = generateCSS(['c(white)']);
    expect(css).toContain('@layer base, 04-components, utilities;');
    expect(css).toContain('@layer utilities {');
    expect(css).toContain('.c\\(white\\)');
  });

  it('should place both 04-components and utilities in correct layers', () => {
    const css = generateCSS(['body(base)', 'c(white)', 'p(16)']);
    
    // Check layer declaration
    expect(css).toContain('@layer base, 04-components, utilities;');
    
    // Check 04-components layer contains body
    expect(css).toMatch(/@layer components \{[^}]*body\\\\?\(base\\\\?\)/);
    
    // Check utilities layer contains c and p
    const utilitiesMatch = css.match(/@layer utilities \{([\s\S]*?)\n\}/);
    expect(utilitiesMatch).toBeTruthy();
    expect(utilitiesMatch![1]).toContain('.c\\(white\\)');
    expect(utilitiesMatch![1]).toContain('.p\\(16\\)');
  });

  it('should ensure utilities override 04-components', () => {
    // This is more of a browser behavior test, but we can check the structure
    const css = generateCSS(['body(base)', 'c(white)']);
    
    // Find the positions of each layer
    const componentsIndex = css.indexOf('@layer 04-components');
    const utilitiesIndex = css.indexOf('@layer utilities');
    
    // Utilities layer should come after 04-components layer
    expect(utilitiesIndex).toBeGreaterThan(componentsIndex);
  });

  it('should handle multiple component types', () => {
    const css = generateCSS([
      'body(base)',
      'heading(lg)',
      'title(md)'
    ]);
    
    expect(css).toContain('@layer 04-components {');
    expect(css).toContain('.body\\(base\\)');
    expect(css).toContain('.heading\\(lg\\)');
    expect(css).toContain('.title\\(md\\)');
  });
});