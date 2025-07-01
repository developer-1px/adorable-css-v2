import { describe, it, expect } from 'vitest';
import { shadow, opacity } from '../../../rules/style/shadow';

describe('shadow rules', () => {
  describe('shadow', () => {
    it('should handle preset shadow values', () => {
      expect(shadow('sm')).toEqual({ 
        'box-shadow': '0 1px 2px 0 rgb(0 0 0 / 0.05)' 
      });
      expect(shadow('md')).toEqual({ 
        'box-shadow': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' 
      });
      expect(shadow('lg')).toEqual({ 
        'box-shadow': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' 
      });
      expect(shadow('xl')).toEqual({ 
        'box-shadow': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' 
      });
    });

    it('should handle token values', () => {
      expect(shadow('elevation-1')).toEqual({ 
        'box-shadow': 'var(--shadow-elevation-1)' 
      });
      expect(shadow('none')).toEqual({ 
        'box-shadow': 'var(--shadow-none)' 
      });
    });

    it('should handle custom shadow values', () => {
      expect(shadow('2/4/8/black.5')).toEqual({ 
        'box-shadow': '2px 4px 8px color-mix(in srgb, black 50%, transparent)' 
      });
      expect(shadow('0/0/10/primary')).toEqual({ 
        'box-shadow': '0px 0px 10px var(--color-primary)' 
      });
      expect(shadow('4/4/0/red')).toEqual({ 
        'box-shadow': '4px 4px 0px red' 
      });
    });

    it('should return empty object for invalid values', () => {
      expect(shadow()).toEqual({});
      expect(shadow('invalid')).toEqual({});
    });
  });

  describe('opacity', () => {
    it('should handle decimal values', () => {
      expect(opacity('0.5')).toEqual({ opacity: '0.5' });
      expect(opacity('0.75')).toEqual({ opacity: '0.75' });
      expect(opacity('1')).toEqual({ opacity: '1' });
      expect(opacity('0')).toEqual({ opacity: '0' });
    });

    it('should handle dot notation', () => {
      expect(opacity('.5')).toEqual({ opacity: '.5' });
      expect(opacity('.25')).toEqual({ opacity: '.25' });
    });

    it('should convert percentage values', () => {
      expect(opacity('50')).toEqual({ opacity: '0.5' });
      expect(opacity('75')).toEqual({ opacity: '0.75' });
      expect(opacity('100')).toEqual({ opacity: '1' });
      expect(opacity('25')).toEqual({ opacity: '0.25' });
    });

    it('should return empty object for no value', () => {
      expect(opacity()).toEqual({});
    });
  });
});