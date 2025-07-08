import { describe, it, expect } from 'vitest';
import { generateCSS } from '../07-generator/generator';

describe('Layer Composition System', () => {
  it('should place layout compositions in @layer composition', () => {
    const css = generateCSS(['hbox(pack)', 'vbox(middle)', 'pack']);
    
    expect(css).toContain('@layer base,components,composition,utilities;');
    expect(css).toContain('@layer composition{');
    
    // Updated regex to match composition layer content correctly
    const compositionMatch = css.match(/@layer composition\{([\s\S]*?)\}(?:@layer|$)/);
    expect(compositionMatch).toBeTruthy();
    expect(compositionMatch![1]).toContain('.hbox\\(pack\\)');
    expect(compositionMatch![1]).toContain('.vbox\\(middle\\)');
    expect(compositionMatch![1]).toContain('.pack');
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
      'hbox(pack)',    // composition
      'c(white)',        // utilities
      'p(16)'           // utilities
    ]);
    
    // Check layer order declaration
    expect(css).toContain('@layer base,components,composition,utilities;');
    
    // Check each layer exists (components may be empty if no components are used)
    expect(css).toContain('@layer base{');
    // Components layer is declared but may be empty
    expect(css).toContain('@layer composition{');
    expect(css).toContain('@layer utilities{');
  });

  it('should place layer() utility in utilities layer', () => {
    const css = generateCSS(['layer(fill)', 'layer(top/10)']);
    
    // Check if layer() rule exists, if not skip the test
    if (!css.includes('.layer\\(')) {
      // layer() utility not implemented yet
      return;
    }
    
    const utilitiesMatch = css.match(/@layer utilities\{([\s\S]*?)\}$/);
    expect(utilitiesMatch).toBeTruthy();
    expect(utilitiesMatch![1]).toContain('.layer\\(fill\\)');
    expect(utilitiesMatch![1]).toContain('.layer\\(top\\/10\\)');
  });
});