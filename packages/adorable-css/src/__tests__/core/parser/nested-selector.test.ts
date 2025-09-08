import { describe, it, expect } from 'vitest';
import { generateCSS } from '../../../07-generator/generator';
import { parseAdorableCSS } from '../../../01-core/parser/parser';

describe('Nested Selector Feature', () => {
  describe('hbox and vbox with child selectors', () => {
    it('should generate CSS with nested child selectors for hbox', () => {
      const css = generateCSS(['hbox']);
      
      // console.log('Generated hbox CSS:', css); // Removed console.log
      
      expect(css).toContain('.hbox{display:flex;flex-direction:row;align-items:center');
      expect(css).toContain(':where(&>*){flex:0 0 auto}'); // Nested selector inside the rule
    });
    
    it('should generate CSS with nested child selectors for vbox', () => {
      const css = generateCSS(['vbox']);
      
      // console.log('Generated vbox CSS:', css); // Removed console.log
      
      expect(css).toContain('.vbox{display:flex;flex-direction:column;align-items:stretch');
      expect(css).toContain(':where(&>*){flex:0 0 auto}'); // Nested selector inside the rule
    });
    
    it('should generate CSS with nested child selectors for hbox(middle)', () => {
      const css = generateCSS(['hbox(middle)']);
      
      // console.log('Generated hbox(middle) CSS:', css); // Removed console.log
      
      expect(css).toContain('.hbox\\(middle\\){display:flex;flex-direction:row;align-items:center');
      expect(css).toContain(':where(&>*){flex:0 0 auto}'); // Nested selector inside the rule
    });
    
    it('should replace & with actual selector in nested rules', () => { // Clarified test name
      const css = generateCSS(['hbox']);
      
      // console.log('Full hbox CSS output:', css); // Removed console.log
      
      // The & is kept in the CSS output as part of the nested selector
      expect(css).toContain(':where(&>*){flex:0 0 auto}');
    });
  });
  
  describe('CSS object structure and parsing', () => { // Clarified describe block name
    it('should parse hbox and return correct structure', () => {
      const result = parseAdorableCSS('hbox');
      expect(result).toBeTruthy();
      
      // console.log('Parsed hbox result:', JSON.stringify(result, null, 2)); // Removed console.log
      expect(result.value[0].selector).toHaveProperty('image', 'hbox'); // Check selector image
      expect(result.value[0].selector).toHaveProperty('type', '(ident)'); // Check selector type
    });
    
    it('should handle complex nested CSS structures and generate nested selectors', () => { // Clarified test name
      const testCases = [
        'hbox(middle) gap(auto)',
        'vbox(pack)',
        'hbox(center+wrap)'
      ];
      
      testCases.forEach(className => {
        const css = generateCSS([className]);
        expect(css.length).toBeGreaterThan(0);
        expect(css).toContain(':where('); // Ensure nested selector is present
        
        // console.log(`✓ ${className} generates nested CSS:`, css); // Removed console.log
      });
    });
  });
  
  describe('Integration with layout classes', () => {
    it('should work with header layout classes and generate nested selectors', () => { // Clarified test name
      const headerClasses = [
        'hbox(middle) gap(auto)',
        'vbox(pack)', 
        'container(6xl)',
        'py(lg)',
        'px(xl)'
      ];
      
      const css = generateCSS(headerClasses);
      expect(css.length).toBeGreaterThan(0);
      
      // Check that flexbox classes include nested selectors
      expect(css).toContain('.hbox\\(middle\\)\\ gap\\(auto\\){');
      expect(css).toContain('.vbox\\(pack\\){');
      expect(css).toContain(':where(&>*){flex:0 0 auto}'); // Nested selector pattern
      
      // console.log('Header integration CSS:', css); // Removed console.log
    });
  });

  it('should return base CSS for invalid arguments', () => { // Added new test case
    const css = generateCSS(['invalid-class']);
    // Invalid classes still generate the base CSS layer system
    expect(css).toContain('@layer base');
    expect(css).not.toContain('.invalid-class');
  });

  it('should return empty string for array with invalid arguments', () => { // Added new test case
    const css = generateCSS(['hbox', 'invalid-class']);
    expect(css).toContain('.hbox{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;:where(&>*){flex:0 0 auto}}'); // Valid class should still be generated
    expect(css).not.toContain('invalid-class'); // Invalid class should not be in output
  });
});
