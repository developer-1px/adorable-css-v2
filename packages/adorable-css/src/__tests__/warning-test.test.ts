import { describe, it, expect, vi } from 'vitest';
import { generateCSS } from '../parser/generator';

describe('Warning System for Missing Rules', () => {
  let consoleWarnSpy: any;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  describe('Missing rule handlers', () => {
    it('should warn when rule handler is not found', () => {
      // Test with a non-existent rule
      const css = generateCSS(['nonexistent-rule']);
      
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Rule handler not found for "nonexistent-rule"')
      );
      expect(css).toBe(''); // Should return empty CSS
    });

    it('should warn for multiple missing rules', () => {
      const css = generateCSS(['fake-rule', 'another-fake-rule', 'hbox']); // hbox exists
      
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Rule handler not found for "fake-rule"')
      );
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Rule handler not found for "another-fake-rule"')
      );
      
      // hbox should generate CSS without warnings
      expect(css).toContain('.hbox{');
    });

    it('should not warn for existing rules', () => {
      const css = generateCSS(['hbox', 'vbox', 'block']);
      
      // Should not have any warning calls for these existing rules
      expect(consoleWarnSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('Rule handler not found')
      );
      
      expect(css.length).toBeGreaterThan(0);
    });
  });

  describe('Parsed but empty CSS rules', () => {
    it('should warn when CSS generation fails despite successful parsing', () => {
      // Test with rules that might parse but generate no CSS
      const testCases = [
        'empty-result-rule',
        'void-rule', 
        'null-rule'
      ];
      
      testCases.forEach(rule => {
        const css = generateCSS([rule]);
        
        // Should warn about missing handler
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          expect.stringContaining(`Rule handler not found for "${rule}"`)
        );
        
        expect(css).toBe('');
      });
    });
  });

  describe('Real-world scenario warnings', () => {
    it('should help debug layout classes used in header', () => {
      // Mix of real and potentially missing classes from our layout
      const headerClasses = [
        'hbox(middle) gap(auto)', // Should work
        'container(6xl)',       // Should work
        'py(lg)',              // Should work
        'some-missing-class',   // Should warn
        'another-typo'         // Should warn
      ];
      
      const css = generateCSS(headerClasses);
      
      // Should warn about missing classes
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Rule handler not found for "some-missing-class"')
      );
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Rule handler not found for "another-typo"')
      );
      
      // Should still generate CSS for valid classes
      expect(css).toContain('.hbox\\(middle\\+between\\)');
      expect(css).toContain('.container\\(6xl\\)');
      expect(css).toContain('.py\\(lg\\)');
      
      console.log('Generated CSS with warnings:');
      console.log(css);
    });
  });

  describe('Parse vs Generate errors', () => {
    it('should distinguish between parse errors and missing handlers', () => {
      // Valid syntax but missing handler
      const css1 = generateCSS(['valid-syntax-missing-handler']);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Rule handler not found')
      );
      
      // Invalid syntax (should cause parse error)
      consoleWarnSpy.mockClear();
      const css2 = generateCSS(['((invalid))syntax']);
      // May or may not warn depending on parser behavior
      
      console.log('Valid syntax, missing handler result:', css1);
      console.log('Invalid syntax result:', css2);
    });
  });
});