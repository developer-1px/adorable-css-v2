import { describe, it, expect } from 'vitest';
import { scrollM, scrollMt, scrollMr, scrollMb, scrollMl, scrollMx, scrollMy } from '../../../rules/layout/scroll-margin';

describe('scroll-margin rules', () => {
  describe('scrollM', () => {
    it('should handle single value', () => {
      expect(scrollM('10')).toEqual({ 'scroll-margin': '10px' });
      expect(scrollM('2rem')).toEqual({ 'scroll-margin': '2rem' });
      expect(scrollM('0')).toEqual({ 'scroll-margin': '0px' });
    });

    it('should handle token values', () => {
      expect(scrollM('sm')).toEqual({ 'scroll-margin': 'var(--spacing-sm)' });
      expect(scrollM('md')).toEqual({ 'scroll-margin': 'var(--spacing-md)' });
      expect(scrollM('lg')).toEqual({ 'scroll-margin': 'var(--spacing-lg)' });
    });

    it('should return empty object for no value', () => {
      expect(scrollM()).toEqual({});
    });
  });

  describe('directional scroll margins', () => {
    it('should apply scroll-margin-top', () => {
      expect(scrollMt('10')).toEqual({ 'scroll-margin-top': '10px' });
      expect(scrollMt('md')).toEqual({ 'scroll-margin-top': 'var(--spacing-md)' });
    });

    it('should apply scroll-margin-right', () => {
      expect(scrollMr('10')).toEqual({ 'scroll-margin-right': '10px' });
      expect(scrollMr('md')).toEqual({ 'scroll-margin-right': 'var(--spacing-md)' });
    });

    it('should apply scroll-margin-bottom', () => {
      expect(scrollMb('10')).toEqual({ 'scroll-margin-bottom': '10px' });
      expect(scrollMb('md')).toEqual({ 'scroll-margin-bottom': 'var(--spacing-md)' });
    });

    it('should apply scroll-margin-left', () => {
      expect(scrollMl('10')).toEqual({ 'scroll-margin-left': '10px' });
      expect(scrollMl('md')).toEqual({ 'scroll-margin-left': 'var(--spacing-md)' });
    });

    it('should return empty object for no value', () => {
      expect(scrollMt()).toEqual({});
      expect(scrollMr()).toEqual({});
      expect(scrollMb()).toEqual({});
      expect(scrollMl()).toEqual({});
    });
  });

  describe('axis scroll margins', () => {
    it('should apply horizontal scroll margins', () => {
      expect(scrollMx('10')).toEqual({ 
        'scroll-margin-left': '10px', 
        'scroll-margin-right': '10px' 
      });
      expect(scrollMx('lg')).toEqual({ 
        'scroll-margin-left': 'var(--spacing-lg)', 
        'scroll-margin-right': 'var(--spacing-lg)' 
      });
    });

    it('should apply vertical scroll margins', () => {
      expect(scrollMy('10')).toEqual({ 
        'scroll-margin-top': '10px', 
        'scroll-margin-bottom': '10px' 
      });
      expect(scrollMy('lg')).toEqual({ 
        'scroll-margin-top': 'var(--spacing-lg)', 
        'scroll-margin-bottom': 'var(--spacing-lg)' 
      });
    });

    it('should return empty object for no value', () => {
      expect(scrollMx()).toEqual({});
      expect(scrollMy()).toEqual({});
    });
  });
});