import { describe, it, expect } from 'vitest';
import { parseAdorableCSS } from '../parser/parser';
import { generateCSS } from '../parser/generator';

describe('AdorableCSS Syntax Tests', () => {
  describe('Border Syntax', () => {
    it('should parse border without width (default)', () => {
      const classes = ['border(gray-300)', 'border-b(gray-200)', 'border-l(purple-600)', 'border-t(gray-400)'];
      
      classes.forEach(className => {
        const result = parseAdorableCSS(className);
        expect(result).toBeTruthy();
        expect(result.type).toBe('stylesheet');
        expect(result.value).toHaveLength(1);
      });
    });
    
    it('should generate correct CSS for border syntax', () => {
      const testCases = [
        { input: 'border(gray-300)', expected: 'border' },
        { input: 'border-b(gray-200)', expected: 'border-bottom' },
        { input: 'border-l(purple-600)', expected: 'border-left' },
        { input: 'border-t(gray-400)', expected: 'border-top' },
        { input: 'border-r(red-500)', expected: 'border-right' }
      ];
      
      testCases.forEach(({ input, expected }) => {
        const css = generateCSS([input]);
        expect(css).toContain(expected);
        console.log(`✓ ${input} generates CSS with ${expected}`);
      });
    });
  });

  describe('Gradient Syntax', () => {
    it('should parse gradient with double dots', () => {
      const classes = [
        'bg(135deg/#8b5cf6..#ec4899)',
        'bg(90deg/#3b82f6..#06b6d4)',
        'bg(45deg/red..blue)'
      ];
      
      classes.forEach(className => {
        const result = parseAdorableCSS(className);
        expect(result).toBeTruthy();
        expect(result.type).toBe('stylesheet');
        console.log(`✓ Parsed gradient: ${className}`);
      });
    });
    
    it('should generate correct CSS for gradients', () => {
      const testCases = [
        'bg(135deg/#8b5cf6..#ec4899)',
        'bg(90deg/#3b82f6..#06b6d4)',
        'bg(linear-gradient/45deg/red..blue)'
      ];
      
      testCases.forEach(className => {
        const css = generateCSS([className]);
        expect(css).toContain('background');
        console.log(`✓ Generated CSS for: ${className}`);
        console.log(`   CSS: ${css.trim()}`);
      });
    });
  });

  describe('Responsive Breakpoints', () => {
    it('should parse responsive prefixes with double dots', () => {
      const classes = [
        '..lg:hidden',
        '..md:block', 
        '..sm:flex',
        'lg:hidden' // normal breakpoint
      ];
      
      classes.forEach(className => {
        const result = parseAdorableCSS(className);
        expect(result).toBeTruthy();
        console.log(`✓ Parsed responsive: ${className}`);
      });
    });
    
    it('should generate correct CSS for responsive classes', () => {
      const testCases = [
        '..lg:hidden',
        '..md:block',
        'lg:flex'
      ];
      
      testCases.forEach(className => {
        const css = generateCSS([className]);
        expect(css.length).toBeGreaterThan(0);
        console.log(`✓ Generated responsive CSS for: ${className}`);
        console.log(`   CSS: ${css.trim()}`);
      });
    });
  });

  describe('Layout Classes from Header', () => {
    it('should parse common layout classes used in header', () => {
      const headerClasses = [
        'sticky',
        'top(0)',
        'z(100)',
        'bg(white.95)',
        'backdrop-blur(16px)',
        'border-b(gray-200)',
        'shadow(sm)',
        'container(6xl)',
        'hbox(middle) gap(auto)',
        'py(lg)',
        'px(xl)',
        'vbox(pack)',
        'group-hover:scale(1.05)',
        'transition'
      ];
      
      headerClasses.forEach(className => {
        const result = parseAdorableCSS(className);
        expect(result).toBeTruthy();
        console.log(`✓ Header class parsed: ${className}`);
      });
    });
  });

  describe('Footer Classes', () => {
    it('should parse common footer classes', () => {
      const footerClasses = [
        'bg(gray-50)',
        'border-t(gray-200)',
        'grid',
        'grid-cols(1)',
        'lg:grid-cols(5)',
        'gap(4xl)',
        'vbox',
        'hbox(middle)',
        'r(16px)',
        'lg:col-span(2)',
        'hover:shadow(md)',
        'c(gray-700)',
        'font(2xl/1)',
        'leading(1.6)'
      ];
      
      footerClasses.forEach(className => {
        const result = parseAdorableCSS(className);
        expect(result).toBeTruthy();
        console.log(`✓ Footer class parsed: ${className}`);
      });
    });
  });

  describe('Integration Test - Full Component', () => {
    it('should parse all classes from a typical card component', () => {
      const cardClasses = [
        'bg(white)',
        'border(gray-200)',
        'r(xl)',
        'p(2xl)',
        'shadow(lg)',
        'hover:shadow(2xl)',
        'transition',
        'vbox',
        'gap(lg)',
        'items(center)'
      ];
      
      const css = generateCSS(cardClasses);
      expect(css.length).toBeGreaterThan(0);
      
      cardClasses.forEach(className => {
        const result = parseAdorableCSS(className);
        expect(result).toBeTruthy();
      });
      
      console.log('✓ Full card component CSS generated successfully');
      console.log(`Generated CSS length: ${css.length} characters`);
    });
  });
});