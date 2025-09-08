import { describe, it, expect } from 'vitest';
import { generateClass } from '../../../07-generator/generator';
import { registerComponentsAsRule2 } from '../../../05-components/register-components';

// Register components for tests
registerComponentsAsRule2();

describe('Generator with section utilities', () => {
  it('should generate CSS variables for section() utility', () => {
    const css = generateClass('section()');
    // section() expands to max-w(768px) mx(auto) px(lg)
    expect(css).toContain('.section\\(\\){');
    expect(css).toContain('max-width:768px');
    expect(css).toContain('margin-inline:auto');
    expect(css).toContain('padding-inline:var(--spacing-lg)');
  });

  it('should generate CSS variables for section(hero)', () => {
    const css = generateClass('section(hero)');
    // section(hero) is not a registered variant, defaults to standard section
    expect(css).toContain('.section\\(hero\\){');
    expect(css).toContain('max-width:768px');
  });

  it('should generate CSS variables for contain()', () => {
    const css = generateClass('contain()');
    expect(css).toContain('.contain\\(\\){');
    expect(css).toContain('background-size:contain');
    expect(css).toContain('object-fit:contain');
  });

  it('should generate CSS variables for stack(lg)', () => {
    const css = generateClass('stack(lg)');
    expect(css).toContain('.stack\\(lg\\){');
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('gap:var(--spacing-lg)');
    expect(css).toContain('width:100%');
  });

  it('should handle multiple classes', () => {
    // generateClass handles this as a single class with spaces, which is escaped
    const css = generateClass('section() contain()');
    // It generates CSS for the escaped class name
    expect(css).toContain('.section\\(\\)\\ contain\\(\\){');
  });
  
  it('should generate correct CSS output format', () => {
    const css = generateClass('section()');
    // Check that it's minified (no spaces after colons)
    expect(css).toMatch(/max-width:768px/);
    // Check that the full CSS rule is properly formed
    expect(css).toMatch(/\.section\\\(\\\)\{[^}]+\}/);
  });
});