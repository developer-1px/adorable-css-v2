import { describe, it, expect } from 'vitest';
import { b, bt, br, bb, bl, border } from '../../rules/style/border';

describe('border with color names', () => {
  describe('b() function', () => {
    it('should handle color names with default 1px width', () => {
      expect(b('red')).toEqual({ border: '1px solid red' });
      expect(b('blue')).toEqual({ border: '1px solid blue' });
      expect(b('green')).toEqual({ border: '1px solid green' });
    });
    
    it('should handle color tokens with default 1px width', () => {
      expect(b('gray-200')).toEqual({ border: '1px solid var(--gray-200)' });
      expect(b('blue-500')).toEqual({ border: '1px solid var(--blue-500)' });
    });
    
    it('should handle hex colors with default 1px width', () => {
      expect(b('#ff0000')).toEqual({ border: '1px solid #ff0000' });
      expect(b('#333')).toEqual({ border: '1px solid #333' });
    });
    
    it('should handle numeric values as width', () => {
      expect(b('2')).toEqual({ border: '2px solid currentColor' });
      expect(b('1.5')).toEqual({ border: '1.5px solid currentColor' });
      expect(b('0')).toEqual({ border: '0 solid currentColor' });
    });
  });
  
  describe('directional borders', () => {
    it('bt() should handle colors with default 1px', () => {
      expect(bt('red')).toEqual({ 'border-top': '1px solid red' });
      expect(bt('gray-300')).toEqual({ 'border-top': '1px solid var(--gray-300)' });
      expect(bt('2')).toEqual({ 'border-top': '2px solid currentColor' });
    });
    
    it('br() should handle colors with default 1px', () => {
      expect(br('blue')).toEqual({ 'border-right': '1px solid blue' });
      expect(br('blue-400')).toEqual({ 'border-right': '1px solid var(--blue-400)' });
      expect(br('3')).toEqual({ 'border-right': '3px solid currentColor' });
    });
    
    it('bb() should handle colors with default 1px', () => {
      expect(bb('green')).toEqual({ 'border-bottom': '1px solid green' });
      expect(bb('green-600')).toEqual({ 'border-bottom': '1px solid var(--green-600)' });
      expect(bb('0.5')).toEqual({ 'border-bottom': '0.5px solid currentColor' });
    });
    
    it('bl() should handle colors with default 1px', () => {
      expect(bl('yellow')).toEqual({ 'border-left': '1px solid yellow' });
      expect(bl('amber-300')).toEqual({ 'border-left': '1px solid var(--amber-300)' });
      expect(bl('4')).toEqual({ 'border-left': '4px solid currentColor' });
    });
  });
  
  describe('border() function', () => {
    it('should handle color names with default 1px width', () => {
      expect(border('red')).toEqual({ border: '1px solid red' });
      expect(border('transparent')).toEqual({ border: '1px solid transparent' });
    });
    
    it('should handle color tokens with default 1px width', () => {
      expect(border('gray-500')).toEqual({ border: '1px solid var(--gray-500)' });
    });
    
    it('should handle numeric values as width', () => {
      expect(border('1')).toEqual({ border: '1px solid currentColor' });
      expect(border('0')).toEqual({ border: '0 solid currentColor' });
    });
  });
});