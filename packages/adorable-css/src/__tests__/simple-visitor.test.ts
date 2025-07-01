import { describe, it, expect } from 'vitest';
import { visitAndGenerate, compareSimple } from '../core/visitor/simple-visitor';

describe('Simple Visitor', () => {
  describe('Basic functionality', () => {
    it('should generate CSS for simple color', () => {
      const css = visitAndGenerate('c(red-500)');
      expect(css).toContain('color');
      expect(css).toContain('red');
    });
    
    it('should handle empty input', () => {
      const css = visitAndGenerate('');
      expect(css).toBe('');
    });
    
    it('should handle background', () => {
      const css = visitAndGenerate('bg(blue-100)');
      expect(css).toContain('background');
    });
  });
  
  describe('Comparison with current implementation', () => {
    const testCases = [
      'c(red-500)',
      'bg(blue-100)', 
      'p(16)',
      'm(auto)',
      'w(100)',
      'h(50)',
      'hover:c(red-500)',
      'md:w(100)',
      // Test importance levels
      'c(red-500)!',
      'bg(blue-100)!!',
      'hover:c(red-500)!',
      'md:w(100)!'
    ];
    
    testCases.forEach(testCase => {
      it(`should match current implementation for "${testCase}"`, () => {
        const result = compareSimple(testCase);
        
        console.log(`Testing: ${testCase}`);
        console.log(`Simple:  ${result.simple}`);
        console.log(`Current: ${result.current}`);
        console.log(`Match:   ${result.match}`);
        
        expect(result.match).toBe(true);
      });
    });
  });

  describe('Edge cases and complex selectors', () => {
    it('should handle empty strings gracefully', () => {
      const result = compareSimple('');
      expect(result.match).toBe(true);
      expect(result.simple).toBe('');
    });

    it('should handle invalid selectors gracefully', () => {
      const result = compareSimple('invalid-selector');
      expect(result.match).toBe(true);
    });

    it('should handle complex color values', () => {
      const result = compareSimple('c(white.5)');
      console.log(`Complex color test: c(white.5)`);
      console.log(`Simple:  "${result.simple}"`);
      console.log(`Current: "${result.current}"`);
      console.log(`Match:   ${result.match}`);
      expect(result.match).toBe(true);
    });

    it('should handle gradient backgrounds', () => {
      const result = compareSimple('bg(purple-500..pink-500/135deg)');
      console.log(`Gradient test: bg(purple-500..pink-500/135deg)`);
      console.log(`Simple:  "${result.simple}"`);
      console.log(`Current: "${result.current}"`);
      console.log(`Match:   ${result.match}`);
      expect(result.match).toBe(true);
    });

    it('should handle nested state selectors', () => {
      const result = compareSimple('group-hover:c(blue-500)');
      expect(result.match).toBe(true);
    });

    it('should handle different breakpoints', () => {
      const testBreakpoints = ['sm:w(100)', 'lg:h(50)', 'xl:p(20)'];
      testBreakpoints.forEach(breakpoint => {
        const result = compareSimple(breakpoint);
        expect(result.match).toBe(true);
      });
    });

    it('should handle complex margin and padding', () => {
      const testSpacing = ['p(16,24)', 'm(auto,16)', 'px(20)', 'py(10)'];
      testSpacing.forEach(spacing => {
        const result = compareSimple(spacing);
        expect(result.match).toBe(true);
      });
    });
  });
});