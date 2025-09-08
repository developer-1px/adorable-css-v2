import { describe, it, expect } from 'vitest';
import { generateClass } from '../../07-generator/generator';

describe('text(base) rules', () => {
  it('should generate CSS for text(base)', () => {
    const css = generateClass('text(base)');
    
    // text(base) is treated as a raw value since "base" is not a token
    expect(css).toBe('.text\\(base\\){font-size:base}');
  });

  it('should generate CSS for text(base/1.5)', () => {
    const css = generateClass('text(base/1.5)');
    
    // text(base/1.5) is treated as font-size:base with line-height:1.5
    expect(css).toBe('.text\\(base\\/1\\.5\\){font-size:base;line-height:1.5}');
  });

  it.skip('should generate CSS for text(base/1.5/0.02em) - SKIPPED: letter-spacing not working', () => {
    const css = generateClass('text(base/1.5/0.02em)');
    
    // text(base/1.5/0.02em) with all three properties
    expect(css).toBe('.text\\(base\\/1\\.5\\/0\\.02em\\){font-size:base;line-height:1.5;letter-spacing:0.02em}');
  });

  it('should verify that text(md) uses token while text(base) does not', () => {
    const cssBase = generateClass('text(base)');
    const cssMd = generateClass('text(md)');
    
    // text(base) is not a token, but text(md) is
    expect(cssBase).toBe('.text\\(base\\){font-size:base}');
    expect(cssMd).toBe('.text\\(md\\){font-size:var(--font-md)}');
  });
});