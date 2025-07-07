import { describe, it, expect } from 'vitest';
import { generateClass } from '../../07-generator/generator'; // Corrected import path
import { parseAdorableCSS } from '../../01-core/parser/parser'; // Corrected import path

describe('Importance (!) feature', () => {
  it('should parse ! marks in selectors and store them', () => { // Clarified test name
    const result = parseAdorableCSS('fixed!');
    expect(result.value[0].important).toBe('!');
    expect(result.value[0].selector.name).toBe('fixed'); // Added name check
    
    const result2 = parseAdorableCSS('fixed!!');
    expect(result2.value[0].important).toBe('!!');
    expect(result2.value[0].selector.name).toBe('fixed');
    
    const result3 = parseAdorableCSS('fixed!!!');
    expect(result3.value[0].important).toBe('!!!');
    expect(result3.value[0].selector.name).toBe('fixed');
  });

  it('should add [class] for each ! mark to increase specificity in generated CSS', () => { // Clarified test name
    const css1 = generateClass('fixed!');
    expect(css1).toContain('[class].fixed\!{');
    expect(css1).toContain('position:fixed'); // Ensure property is present
    
    const css2 = generateClass('fixed!!');
    expect(css2).toContain('[class][class].fixed\!\!{');
    expect(css2).toContain('position:fixed');
    
    const css3 = generateClass('fixed!!!');
    expect(css3).toContain('[class][class][class].fixed\!\!\!{');
    expect(css3).toContain('position:fixed');
  });

  it('should work with function selectors and add specificity', () => { // Clarified test name
    const css = generateClass('p(16)!');
    expect(css).toContain('[class].p\(16\)\!{');
    expect(css).toContain('padding:16px');
  });

  it('should work with multiple ! marks and functions and add specificity', () => { // Clarified test name
    const css = generateClass('bg(red)!!');
    expect(css).toContain('[class][class].bg\(red\)\!\!{');
    expect(css).toContain('background-color:red');
  });

  it('should work with pseudo-classes and add specificity', () => { // Clarified test name
    const css = generateClass('hover:bg(blue)!');
    expect(css).toContain('[class].hover\:bg\(blue\)\!:hover{');
    expect(css).toContain('background-color:blue');
  });

  it('should work with responsive classes and add specificity', () => { // Clarified test name
    const css = generateClass('md:w(100)!');
    expect(css).toContain('[class].md\:w\(100\)\!{');
    expect(css).toContain('width:100px');
  });

  it('should return empty string for invalid arguments', () => { // Added new test case
    const css = generateClass('invalid!');
    expect(css).toBe('');
  });

  it('should return empty string for invalid function arguments with !', () => { // Added new test case
    const css = generateClass('p(invalid)!');
    expect(css).toBe('');
  });
});
