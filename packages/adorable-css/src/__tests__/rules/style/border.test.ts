import { describe, it, expect } from 'vitest';
import { border, bt, br, bb, bl, radius, ring } from '../../../03-rules/style/border';

describe('border 03-rules', () => {
  describe('border', () => {
    it('should handle simple border values', () => {
      expect(border('1')).toEqual({ border: '1px solid' });
      expect(border('2px')).toEqual({ border: '2px solid' });
      expect(border('0')).toEqual({ border: '0px solid' });
    });

    it('should handle border with color', () => {
      expect(border('1/red')).toEqual({ border: '1px solid red' });
      expect(border('2/primary')).toEqual({ border: '2px solid var(--color-primary)' });
      expect(border('1px/black.5')).toEqual({ 
        border: '1px solid color-mix(in srgb, black 50%, transparent)' 
      });
    });

    it('should handle border style', () => {
      expect(border('dashed')).toEqual({ 'border-style': 'dashed' });
      expect(border('dotted')).toEqual({ 'border-style': 'dotted' });
      expect(border('solid')).toEqual({ 'border-style': 'solid' });
      expect(border('none')).toEqual({ 'border-style': 'none' });
    });

    it('should handle full border shorthand', () => {
      expect(border('2/dashed/blue')).toEqual({ border: '2px dashed blue' });
      expect(border('1px/solid/primary')).toEqual({ 
        border: '1px solid var(--color-primary)' 
      });
    });

    it('should handle special values', () => {
      expect(border('0')).toEqual({ border: '0px solid' });
      expect(border('none')).toEqual({ 'border-style': 'none' });
    });

    it('should return empty object for no value', () => {
      expect(border()).toEqual({});
    });
  });

  describe('directional borders', () => {
    it('should apply top border', () => {
      expect(bt('1')).toEqual({ 'border-top': '1px solid' });
      expect(bt('2/red')).toEqual({ 'border-top': '2px solid red' });
    });

    it('should apply right border', () => {
      expect(br('1')).toEqual({ 'border-right': '1px solid' });
      expect(br('2/blue')).toEqual({ 'border-right': '2px solid blue' });
    });

    it('should apply bottom border', () => {
      expect(bb('1')).toEqual({ 'border-bottom': '1px solid' });
      expect(bb('2/green')).toEqual({ 'border-bottom': '2px solid green' });
    });

    it('should apply left border', () => {
      expect(bl('1')).toEqual({ 'border-left': '1px solid' });
      expect(bl('2/orange')).toEqual({ 'border-left': '2px solid orange' });
    });

    it('should return empty object for no value', () => {
      expect(bt()).toEqual({});
      expect(br()).toEqual({});
      expect(bb()).toEqual({});
      expect(bl()).toEqual({});
    });
  });

  describe('radius', () => {
    it('should handle single radius value', () => {
      expect(radius('4')).toEqual({ 'border-radius': '4px' });
      expect(radius('8px')).toEqual({ 'border-radius': '8px' });
      expect(radius('0.5rem')).toEqual({ 'border-radius': '0.5rem' });
    });

    it('should handle token values', () => {
      expect(radius('sm')).toEqual({ 'border-radius': 'var(--radius-sm)' });
      expect(radius('md')).toEqual({ 'border-radius': 'var(--radius-md)' });
      expect(radius('lg')).toEqual({ 'border-radius': 'var(--radius-lg)' });
      expect(radius('full')).toEqual({ 'border-radius': 'var(--radius-full)' });
    });

    it('should handle special values', () => {
      expect(radius('50%')).toEqual({ 'border-radius': '50%' });
      expect(radius('999')).toEqual({ 'border-radius': '999px' });
    });

    it('should return empty object for no value', () => {
      expect(radius()).toEqual({});
    });
  });

  describe('ring', () => {
    it('should handle ring width', () => {
      expect(ring('2')).toEqual({ 
        'box-shadow': '0 0 0 2px currentColor' 
      });
      expect(ring('4')).toEqual({ 
        'box-shadow': '0 0 0 4px currentColor' 
      });
    });

    it('should handle ring with color', () => {
      expect(ring('2/red')).toEqual({ 
        'box-shadow': '0 0 0 2px red' 
      });
      expect(ring('4/primary')).toEqual({ 
        'box-shadow': '0 0 0 4px var(--color-primary)' 
      });
      expect(ring('2/black.5')).toEqual({ 
        'box-shadow': '0 0 0 2px color-mix(in srgb, black 50%, transparent)' 
      });
    });

    it('should handle special values', () => {
      expect(ring('0')).toEqual({ 'box-shadow': 'none' });
      expect(ring('none')).toEqual({ 'box-shadow': 'none' });
    });

    it('should return empty object for no value', () => {
      expect(ring()).toEqual({});
    });
  });
});