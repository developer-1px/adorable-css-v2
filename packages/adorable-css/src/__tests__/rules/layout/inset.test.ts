import { describe, it, expect } from 'vitest';
import { inset, insetX, insetY } from '../../../03-rules/layout/inset';

describe('inset rules', () => { // Clarified describe block name
  describe('inset', () => {
    it('should handle single value', () => {
      expect(inset('0')).toEqual({ inset: '0px' });
      expect(inset('10')).toEqual({ inset: '10px' });
      expect(inset('auto')).toEqual({ inset: 'auto' });
    });

    it('should handle token values', () => {
      expect(inset('sm')).toEqual({ inset: 'var(--spacing-sm)' });
      expect(inset('md')).toEqual({ inset: 'var(--spacing-md)' });
      expect(inset('lg')).toEqual({ inset: 'var(--spacing-lg)' });
    });

    it('should handle percentage and rem values', () => {
      expect(inset('50%')).toEqual({ inset: '50%' });
      expect(inset('2rem')).toEqual({ inset: '2rem' });
    });

    it('should return empty object for no value', () => {
      expect(inset()).toEqual({});
    });

    it('should return empty object for invalid values', () => { // Added new test case
      expect(inset('invalid')).toEqual({});
    });
  });

  describe('insetX', () => {
    it('should apply horizontal inset', () => {
      expect(insetX('0')).toEqual({ left: '0px', right: '0px' });
      expect(insetX('10')).toEqual({ left: '10px', right: '10px' });
      expect(insetX('auto')).toEqual({ left: 'auto', right: 'auto' });
    });

    it('should handle token values', () => {
      expect(insetX('sm')).toEqual({ left: 'var(--spacing-sm)', right: 'var(--spacing-sm)' });
      expect(insetX('md')).toEqual({ left: 'var(--spacing-md)', right: 'var(--spacing-md)' });
    });

    it('should return empty object for no value', () => {
      expect(insetX()).toEqual({});
    });

    it('should return empty object for invalid values', () => { // Added new test case
      expect(insetX('invalid')).toEqual({});
    });
  });

  describe('insetY', () => {
    it('should apply vertical inset', () => {
      expect(insetY('0')).toEqual({ top: '0px', bottom: '0px' });
      expect(insetY('10')).toEqual({ top: '10px', bottom: '10px' });
      expect(insetY('auto')).toEqual({ top: 'auto', bottom: 'auto' });
    });

    it('should handle token values', () => {
      expect(insetY('sm')).toEqual({ top: 'var(--spacing-sm)', bottom: 'var(--spacing-sm)' });
      expect(insetY('md')).toEqual({ top: 'var(--spacing-md)', bottom: 'var(--spacing-md)' });
    });

    it('should return empty object for no value', () => {
      expect(insetY()).toEqual({});
    });

    it('should return empty object for invalid values', () => { // Added new test case
      expect(insetY('invalid')).toEqual({});
    });
  });
});
