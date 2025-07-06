import { describe, it, expect } from 'vitest';
import { generateCSS } from '../core/generators/generator';

describe('Layer Composition System', () => {
  it('should place layout compositions in @layer composition', () => {
    const css = generateCSS(['hbox(pack)', 'vbox(middle)', 'grid(3)']);
    
    expect(css).toContain('@layer base, components, composition, utilities;');
    expect(css).toContain('@layer composition {');
    
    const compositionMatch = css.match(/@layer composition \{([\s\S]*?)\n\}/);
    expect(compositionMatch).toBeTruthy();
    expect(compositionMatch![1]).toContain('.hbox\\(center\\)');
    expect(compositionMatch![1]).toContain('.vbox\\(middle\\)');
    expect(compositionMatch![1]).toContain('.grid\\(3\\)');
  });

  it('should ensure utilities override composition', () => {
    const css = generateCSS(['hbox(pack)', 'p(20)', 'c(white)']);
    
    // Find the positions of each layer
    const compositionIndex = css.indexOf('@layer composition');
    const utilitiesIndex = css.indexOf('@layer utilities');
    
    // Utilities layer should come after composition layer
    expect(utilitiesIndex).toBeGreaterThan(compositionIndex);
  });

  it('should handle all layer types correctly', () => {
    const css = generateCSS([
      'body(base)',      // components
      'hbox(pack)',    // composition
      'c(white)',        // utilities
      'p(16)'           // utilities
    ]);
    
    // Check layer order declaration
    expect(css).toContain('@layer base, components, composition, utilities;');
    
    // Check each layer exists
    expect(css).toContain('@layer base {');
    expect(css).toContain('@layer components {');
    expect(css).toContain('@layer composition {');
    expect(css).toContain('@layer utilities {');
  });

  it('should place layer() utility in composition layer', () => {
    const css = generateCSS(['layer(fill)', 'layer(top/10)']);
    
    const compositionMatch = css.match(/@layer composition \{([\s\S]*?)\n\}/);
    expect(compositionMatch).toBeTruthy();
    expect(compositionMatch![1]).toContain('.layer\\(fill\\)');
    expect(compositionMatch![1]).toContain('.layer\\(top\\/10\\)');
  });
});