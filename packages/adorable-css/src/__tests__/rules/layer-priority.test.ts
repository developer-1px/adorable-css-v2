import { describe, it, expect } from 'vitest';
import { generateCSS } from '../../07-generator/generator';

describe.skip('Layer Priority System', () => {
  it('should wrap component styles in @layer components', () => {
    const css = generateCSS(['body(base)']);
    expect(css).toContain('@layer base,components,composition,utilities;');
    expect(css).toContain('@layer components{');
    expect(css).toContain('.body\\(base\\)');
  });

  it('should wrap utility styles in @layer utilities', () => {
    const css = generateCSS(['c(white)']);
    expect(css).toContain('@layer base,components,composition,utilities;');
    expect(css).toContain('@layer utilities{');
    expect(css).toContain('.c\\(white\\)');
  });

  it('should place both components and utilities in correct layers', () => {
    const css = generateCSS(['body(base)', 'c(white)', 'p(16)']);
    
    // Check layer declaration
    expect(css).toContain('@layer base,components,composition,utilities;');
    
    // Check components layer contains body
    expect(css).toMatch(/@layer components\{[^}]*body\\\\?\(base\\\\?\)/);
    
    // Check utilities layer contains c and p
    const utilitiesMatch = css.match(/@layer utilities\{([\s\S]*?)\}/);
    expect(utilitiesMatch).toBeTruthy();
    expect(utilitiesMatch![1]).toContain('.c\\(white\\)');
    expect(utilitiesMatch![1]).toContain('.p\\(16\\)');
  });

  it('should ensure utilities override components', () => {
    // This is more of a browser behavior test, but we can check the structure
    const css = generateCSS(['body(base)', 'c(white)']);
    
    // Find the positions of each layer
    const componentsIndex = css.indexOf('@layer components');
    const utilitiesIndex = css.indexOf('@layer utilities');
    
    // Utilities layer should come after components layer
    expect(utilitiesIndex).toBeGreaterThan(componentsIndex);
  });

  it('should handle multiple component types', () => {
    const css = generateCSS([
      'body(base)',
      'heading(lg)',
      'title(md)'
    ]);
    
    expect(css).toContain('@layer components{');
    expect(css).toContain('.body\\(base\\)');
    expect(css).toContain('.heading\\(lg\\)');
    expect(css).toContain('.title\\(md\\)');
  });
});