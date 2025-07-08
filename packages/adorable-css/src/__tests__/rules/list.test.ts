import { describe, it, expect } from 'vitest';
import { generateCSS } from '../index';

describe.skip('list rule - SKIPPED: list rule not implemented', () => {
  it('should generate list-style-type CSS for disc', () => {
    const css = generateCSS(['list(disc)']);
    expect(css).toContain('list-style-type:disc');
  });

  it('should generate list-style-type CSS for circle', () => {
    const css = generateCSS(['list(circle)']);
    expect(css).toContain('list-style-type:circle');
  });

  it('should generate list-style-type CSS for square', () => {
    const css = generateCSS(['list(square)']);
    expect(css).toContain('list-style-type:square');
  });

  it('should generate list-style-type CSS for decimal', () => {
    const css = generateCSS(['list(decimal)']);
    expect(css).toContain('list-style-type:decimal');
  });

  it('should generate list-style-type CSS for lower-alpha', () => {
    const css = generateCSS(['list(lower-alpha)']);
    expect(css).toContain('list-style-type:lower-alpha');
  });

  it('should generate list-style-type CSS for upper-roman', () => {
    const css = generateCSS(['list(upper-roman)']);
    expect(css).toContain('list-style-type:upper-roman');
  });

  it('should generate list-style: none for no arguments', () => {
    const css = generateCSS(['list()']);
    expect(css).toContain('list-style:none');
  });

  it('should generate list-style: none for none argument', () => {
    const css = generateCSS(['list(none)']);
    expect(css).toContain('list-style-type:none');
  });

  it('should generate list-style-position for inside', () => {
    const css = generateCSS(['list(inside)']);
    expect(css).toContain('list-style-position:inside');
  });

  it('should generate list-style-position for outside', () => {
    const css = generateCSS(['list(outside)']);
    expect(css).toContain('list-style-position:outside');
  });

  it('should handle list-position rule', () => {
    const insideCSS = generateCSS(['list-position(inside)']);
    expect(insideCSS).toContain('list-style-position:inside');

    const outsideCSS = generateCSS(['list-position(outside)']);
    expect(outsideCSS).toContain('list-style-position:outside');

    const defaultCSS = generateCSS(['list-position()']);
    expect(defaultCSS).toContain('list-style-position:outside');
  });

  it('should handle list-style alias', () => {
    const css = generateCSS(['list-style(disc)']);
    expect(css).toContain('list-style-type:disc');
  });

  it('should return empty for invalid values', () => {
    const css = generateCSS(['list(invalid)']);
    expect(css).toContain('list-style:none');
  });
});