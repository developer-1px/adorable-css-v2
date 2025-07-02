import { describe, it, expect } from 'vitest';
import { generateCSS } from '../core/parser/generator-layer';

describe('Layer-based CSS System', () => {
  it('should generate CSS with @layer definition', () => {
    const css = generateCSS(['c(red)']);
    
    // Should include layer definition
    expect(css).toContain('@layer component, layout, utility, state;');
    
    // Should wrap CSS in appropriate layer
    expect(css).toMatch(/@layer utility\s*\{[\s\S]*\.c\\\(red\\\)/);
  });

  it('should place component rules in component layer', () => {
    const css = generateCSS(['card']);
    
    // Card is a component, should be in component layer
    expect(css).toMatch(/@layer component\s*\{[\s\S]*\.card/);
  });

  it('should place layout rules in layout layer', () => {
    const css = generateCSS(['hbox']);
    
    // hbox is a layout rule, should be in layout layer
    expect(css).toMatch(/@layer layout\s*\{[\s\S]*\.hbox/);
  });

  it('should place utility rules in utility layer', () => {
    const css = generateCSS(['p(24)', 'bg(blue)']);
    
    // Utilities should be in utility layer
    expect(css).toMatch(/@layer layout\s*\{[\s\S]*\.p\\\(24\\\)/); // padding is a layout rule
    expect(css).toMatch(/@layer utility\s*\{[\s\S]*\.bg\\\(blue\\\)/);
  });

  it('should handle multiple rules with different layers', () => {
    const css = generateCSS(['card', 'hbox', 'c(red)', 'p(16)']);
    
    // Each rule should be in its appropriate layer
    expect(css).toMatch(/@layer component\s*\{[\s\S]*\.card/);
    expect(css).toMatch(/@layer layout\s*\{[\s\S]*\.hbox/);
    expect(css).toMatch(/@layer utility\s*\{[\s\S]*\.c\\\(red\\\)/);
    expect(css).toMatch(/@layer layout\s*\{[\s\S]*\.p\\\(16\\\)/); // padding is layout
  });

  it('should not use specificity hacks', () => {
    const css = generateCSS(['c(red)']);
    
    // Should NOT have doubled selectors
    expect(css).not.toContain('.c\\(red\\).c\\(red\\)');
    
    // Should have simple selector
    expect(css).toContain('.c\\(red\\){');
  });

  it('should produce cleaner CSS output', () => {
    const css = generateCSS(['btn', 'bg(primary)', 'hover:bg(primary-dark)']);
    
    console.log('Layer-based CSS output:\n', css);
    
    // Check structure
    expect(css).toContain('@layer component, layout, utility, state;');
    expect(css).toMatch(/@layer component\s*\{[\s\S]*\.btn/);
    expect(css).toMatch(/@layer utility\s*\{[\s\S]*\.bg\\\(primary\\\)/);
    expect(css).toMatch(/@layer utility\s*\{[\s\S]*\.hover\\:bg\\\(primary-dark\\\):hover/); // hover states currently in utility
  });
});