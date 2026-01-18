import { describe, it, expect } from 'vitest';
import { border, bt, br, bb, bl, r as radius } from '../../../03-rules/style/border';
import { ring } from '../../../03-rules/interaction/focus';

describe('border 03-rules', () => {
  describe('border', () => {
    it('should handle simple border values', () => {
      expect(border('1')).toEqual({ border: '1px solid currentColor' });
      expect(border('2px')).toEqual({ border: '2px solid currentColor' });
      expect(border('0')).toEqual({ border: '0 solid currentColor' });
    });

    it('should handle border with color', () => {
      expect(border('1/red')).toEqual({ border: '1px solid var(--red-500)' });
      expect(border('2/primary')).toEqual({ border: '2px solid var(--primary-500)' });
      expect(border('1px/black.5')).toEqual({
        border: '1px solid rgba(0,0,0,0.5)'
      });
    });

    it('should handle border style', () => {
      expect(border('dashed')).toEqual({ 'border-style': 'dashed' });
      expect(border('dotted')).toEqual({ 'border-style': 'dotted' });
      expect(border('solid')).toEqual({ 'border-style': 'solid' });
      expect(border('none')).toEqual({ 'border-style': 'none' });
    });

    it('should handle full border shorthand', () => {
      expect(border('2/dashed/blue')).toEqual({ border: '2px dashed var(--blue-500)' });
      expect(border('1px/solid/primary')).toEqual({
        border: '1px solid var(--primary-500)'
      });
    });

    it('should handle special values', () => {
      expect(border('0')).toEqual({ border: '0 solid currentColor' });
      expect(border('none')).toEqual({ 'border-style': 'none' });
    });

    it('should return empty object for no value', () => {
      expect(border()).toEqual({ border: '1px solid currentColor' });
    });
  });

  describe('directional borders', () => {
    it('should apply top border', () => {
      expect(bt('1')).toEqual({ 'border-top': '1px solid currentColor' });
      expect(bt('2/red')).toEqual({ 'border-top': '2px solid var(--red-500)' });
    });

    it('should apply right border', () => {
      expect(br('1')).toEqual({ 'border-right': '1px solid currentColor' });
      expect(br('2/blue')).toEqual({ 'border-right': '2px solid var(--blue-500)' });
    });

    it('should apply bottom border', () => {
      expect(bb('1')).toEqual({ 'border-bottom': '1px solid currentColor' });
      expect(bb('2/green')).toEqual({ 'border-bottom': '2px solid var(--green-500)' });
    });

    it('should apply left border', () => {
      expect(bl('1')).toEqual({ 'border-left': '1px solid currentColor' });
      expect(bl('2/orange')).toEqual({ 'border-left': '2px solid var(--orange-500)' });
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
      expect(radius('sm')).toEqual({ 'border-radius': '0.25rem' });
      expect(radius('md')).toEqual({ 'border-radius': '0.5rem' });
      expect(radius('lg')).toEqual({ 'border-radius': '0.75rem' });
      expect(radius('full')).toEqual({ 'border-radius': '9999px' });
    });

    it('should handle special values', () => {
      expect(radius('50%')).toEqual({ 'border-radius': '50%' });
      expect(radius('999')).toEqual({ 'border-radius': '999px' });
    });

    it('should return empty object for no value', () => {
      expect(radius()).toEqual({ 'border-radius': '0.5rem' });
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
        'box-shadow': '0 0 0 2px var(--red-500)'
      });
      expect(ring('4/primary')).toEqual({
        'box-shadow': '0 0 0 4px var(--primary-500)'
      });
      expect(ring('2/black.5')).toEqual({
        'box-shadow': '0 0 0 2px rgba(0,0,0,0.5)'
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