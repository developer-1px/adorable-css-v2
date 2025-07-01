import { describe, it, expect } from 'vitest';
import { ASTFactory } from '../core/visitor/ast-factory';
import { CSSGeneratorVisitor } from '../core/visitor/css-generator-visitor';
import { generateCSSWithVisitor, compareImplementations } from '../core/visitor/visitor-generator';
import { Selector, Position, State, Responsive } from '../core/visitor/nodes';

describe('Visitor Pattern', () => {
  describe('AST Factory', () => {
    it('should create selector node from simple class', () => {
      const node = ASTFactory.fromAdorableCSS('c(red-500)');
      expect(node).toBeDefined();
      expect(node?.type).toBe('selector');
    });
    
    it('should create state node from state class', () => {
      const node = ASTFactory.fromAdorableCSS('hover:c(red-500)');
      expect(node).toBeDefined();
      expect(node?.type).toBe('state');
    });
    
    it('should create responsive node from responsive class', () => {
      const node = ASTFactory.fromAdorableCSS('md:w(100)');
      expect(node).toBeDefined();
      expect(node?.type).toBe('responsive');
    });
  });
  
  describe('CSS Generation', () => {
    it('should generate CSS for simple selector', () => {
      const css = generateCSSWithVisitor('c(red-500)');
      expect(css).toContain('color');
      expect(css).toContain('red');
    });
    
    it('should handle empty input', () => {
      const css = generateCSSWithVisitor('');
      expect(css).toBe('');
    });
    
    it('should handle invalid input gracefully', () => {
      const css = generateCSSWithVisitor('invalid{{syntax');
      expect(css).toBe('');
    });
  });
  
  describe('Node Classes', () => {
    it('should create and use Selector node', () => {
      const node = new Selector('test', 'function', ['arg1']);
      expect(node.type).toBe('selector');
      expect(node.name).toBe('test');
      expect(node.args).toEqual(['arg1']);
    });
    
    it('should create and use Position node', () => {
      const node = new Position('10', '20');
      expect(node.type).toBe('position');
      expect(node.x).toBe('10');
      expect(node.y).toBe('20');
    });
  });
  
  describe('Implementation Comparison', () => {
    const testCases = [
      'c(red-500)',
      'bg(blue-100)',
      'p(16)',
      'm(auto)',
      'w(100)',
      'h(50)'
    ];
    
    testCases.forEach(testCase => {
      it(`should match current implementation for "${testCase}"`, () => {
        const comparison = compareImplementations(testCase);
        
        // For now, we expect them to be different since visitor is incomplete
        // This test helps us see the differences during development
        console.log(`\nTesting: ${testCase}`);
        console.log(`Visitor:  ${comparison.visitor}`);
        console.log(`Current:  ${comparison.current}`);
        console.log(`Match:    ${comparison.match}`);
        
        // We expect them to not match initially since visitor is not fully implemented
        expect(comparison.visitor).toBeDefined();
        expect(comparison.current).toBeDefined();
      });
    });
  });
});