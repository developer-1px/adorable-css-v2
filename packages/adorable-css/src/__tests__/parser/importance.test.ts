import { describe, it, expect } from 'vitest';
import { generateCSSFromAdorableCSS } from '../../01-core/generators/generator';
import { parseAdorableCSS } from '../../01-core/parser/parser';

describe('Importance (!) feature', () => {
  it('should parse ! marks in selectors', () => {
    const result = parseAdorableCSS('fixed!');
    expect(result.value[0].important).toBe('!');
    
    const result2 = parseAdorableCSS('fixed!!');
    expect(result2.value[0].important).toBe('!!');
    
    const result3 = parseAdorableCSS('fixed!!!');
    expect(result3.value[0].important).toBe('!!!');
  });

  it('should add [class] for each ! mark to increase specificity', () => {
    const css1 = generateCSSFromAdorableCSS('fixed!');
    expect(css1).toContain('[class].fixed\\!{');
    
    const css2 = generateCSSFromAdorableCSS('fixed!!');
    expect(css2).toContain('[class][class].fixed\\!\\!{');
    
    const css3 = generateCSSFromAdorableCSS('fixed!!!');
    expect(css3).toContain('[class][class][class].fixed\\!\\!\\!{');
  });

  it('should work with function selectors', () => {
    const css = generateCSSFromAdorableCSS('p(16)!');
    expect(css).toContain('[class].p\\(16\\)\\!{');
    expect(css).toContain('padding:16px');
  });

  it('should work with multiple ! marks and functions', () => {
    const css = generateCSSFromAdorableCSS('bg(red)!!');
    expect(css).toContain('[class][class].bg\\(red\\)\\!\\!{');
    expect(css).toContain('background-color:red');
  });

  it('should work with pseudo-classes', () => {
    const css = generateCSSFromAdorableCSS('hover:bg(blue)!');
    expect(css).toContain('[class].hover\\:bg\\(blue\\)\\!:hover{');
    expect(css).toContain('background-color:blue');
  });

  it('should work with responsive classes', () => {
    const css = generateCSSFromAdorableCSS('md:w(100)!');
    expect(css).toContain('[class].md\\:w\\(100\\)\\!{');
    expect(css).toContain('width:100px');
  });
});