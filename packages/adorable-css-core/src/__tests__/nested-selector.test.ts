import { describe, it, expect } from 'vitest';
import { generateCSS } from '../parser/generator';
import { parseAdorableCSS } from '../parser/parser';

describe('Nested Selector Feature', () => {
  describe('hbox and vbox with child selectors', () => {
    it('should generate CSS with nested child selectors for hbox', () => {
      const css = generateCSS(['hbox']);
      
      console.log('Generated hbox CSS:');
      console.log(css);
      
      expect(css).toContain('display:flex');
      expect(css).toContain('flex-direction:row');
      expect(css).toContain('& > *{flex:0 0 auto}');
    });
    
    it('should generate CSS with nested child selectors for vbox', () => {
      const css = generateCSS(['vbox']);
      
      console.log('Generated vbox CSS:');
      console.log(css);
      
      expect(css).toContain('display:flex');
      expect(css).toContain('flex-direction:column');
      expect(css).toContain('& > *{flex:0 0 auto}');
    });
    
    it('should generate CSS with nested child selectors for hbox(middle)', () => {
      const css = generateCSS(['hbox(middle)']);
      
      console.log('Generated hbox(middle) CSS:');
      console.log(css);
      
      expect(css).toContain('display:flex');
      expect(css).toContain('align-items:center');
      expect(css).toContain('& > *{flex:0 0 auto}');
    });
    
    it('should replace & with actual selector', () => {
      const css = generateCSS(['hbox']);
      
      console.log('Full hbox CSS output:');
      console.log(css);
      
      // The & should be replaced with the actual class selector
      expect(css).toContain('.hbox > *{flex:0 0 auto}');
    });
  });
  
  describe('CSS object structure', () => {
    it('should parse hbox and return correct structure', () => {
      const result = parseAdorableCSS('hbox');
      expect(result).toBeTruthy();
      
      console.log('Parsed hbox result:');
      console.log(JSON.stringify(result, null, 2));
    });
    
    it('should handle complex nested CSS structures', () => {
      const testCases = [
        'hbox(middle+between)',
        'vbox(pack)',
        'hbox(center+wrap)'
      ];
      
      testCases.forEach(className => {
        const css = generateCSS([className]);
        expect(css.length).toBeGreaterThan(0);
        expect(css).toContain('& > *{flex:0 0 auto}');
        
        console.log(`✓ ${className} generates nested CSS:`);
        console.log(css);
      });
    });
  });
  
  describe('Integration with layout classes', () => {
    it('should work with header layout classes', () => {
      const headerClasses = [
        'hbox(middle+between)',
        'vbox(pack)', 
        'container(6xl)',
        'py(lg)',
        'px(xl)'
      ];
      
      const css = generateCSS(headerClasses);
      expect(css.length).toBeGreaterThan(0);
      
      // Check that flexbox classes include nested selectors
      expect(css).toContain('.hbox\\(middle\\+between\\) > *{flex:0 0 auto}');
      expect(css).toContain('.vbox\\(pack\\) > *{flex:0 0 auto}');
      
      console.log('Header integration CSS:');
      console.log(css);
    });
  });
});