import { describe, it, expect } from 'vitest';
import { generateClass } from '../../07-generator/generator';

describe.skip('list rule - SKIPPED: list rule not implemented', () => {
  it('should generate list-style-type CSS for disc', () => {
    const css = generateClass('list(disc)');
    expect(css).toBe('.list\\(disc\\){list-style-type:disc}');
  });

  it('should generate list-style-type CSS for circle', () => {
    const css = generateClass('list(circle)');
    expect(css).toBe('.list\\(circle\\){list-style-type:circle}');
  });

  it('should generate list-style-type CSS for square', () => {
    const css = generateClass('list(square)');
    expect(css).toBe('.list\\(square\\){list-style-type:square}');
  });

  it('should generate list-style-type CSS for decimal', () => {
    const css = generateClass('list(decimal)');
    expect(css).toBe('.list\\(decimal\\){list-style-type:decimal}');
  });

  it('should generate list-style-type CSS for lower-alpha', () => {
    const css = generateClass('list(lower-alpha)');
    expect(css).toBe('.list\\(lower-alpha\\){list-style-type:lower-alpha}');
  });

  it('should generate list-style-type CSS for upper-roman', () => {
    const css = generateClass('list(upper-roman)');
    expect(css).toBe('.list\\(upper-roman\\){list-style-type:upper-roman}');
  });

  it('should generate list-style: none for no arguments', () => {
    const css = generateClass('list()');
    expect(css).toBe('.list\\(\\){list-style:none}');
  });

  it('should generate list-style: none for none argument', () => {
    const css = generateClass('list(none)');
    expect(css).toBe('.list\\(none\\){list-style-type:none}');
  });

  it('should generate list-style-position for inside', () => {
    const css = generateClass('list(inside)');
    expect(css).toBe('.list\\(inside\\){list-style-position:inside}');
  });

  it('should generate list-style-position for outside', () => {
    const css = generateClass('list(outside)');
    expect(css).toBe('.list\\(outside\\){list-style-position:outside}');
  });

  it('should handle list-position rule', () => {
    const insideCSS = generateClass('list-position(inside)');
    expect(insideCSS).toBe('.list-position\\(inside\\){list-style-position:inside}');

    const outsideCSS = generateClass('list-position(outside)');
    expect(outsideCSS).toBe('.list-position\\(outside\\){list-style-position:outside}');

    const defaultCSS = generateClass('list-position()');
    expect(defaultCSS).toBe('.list-position\\(\\){list-style-position:outside}');
  });

  it('should handle list-style alias', () => {
    const css = generateClass('list-style(disc)');
    expect(css).toBe('.list-style\\(disc\\){list-style-type:disc}');
  });

  it('should return empty for invalid values', () => {
    const css = generateClass('list(invalid)');
    expect(css).toBe('.list\\(invalid\\){list-style:none}');
  });
});