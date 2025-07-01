import { describe, it, expect } from 'vitest';
import { opacity, blur, brightness, contrast, saturate, sepia, backdrop } from '../../../rules/style/effects';

describe('effects rules', () => {
  describe('opacity', () => {
    it('should handle opacity values', () => {
      expect(opacity('0.5')).toEqual({ opacity: '0.5' });
      expect(opacity('1')).toEqual({ opacity: '1' });
      expect(opacity('0')).toEqual({ opacity: '0' });
    });

    it('should return empty object for no value', () => {
      expect(opacity()).toEqual({});
    });
  });

  describe('filter effects', () => {
    it('should apply blur filter', () => {
      expect(blur('5')).toEqual({ filter: 'blur(5px)' });
      expect(blur('10px')).toEqual({ filter: 'blur(10px)' });
      expect(blur('2rem')).toEqual({ filter: 'blur(2rem)' });
    });

    it('should apply brightness filter', () => {
      expect(brightness('1.5')).toEqual({ filter: 'brightness(1.5)' });
      expect(brightness('0.5')).toEqual({ filter: 'brightness(0.5)' });
      expect(brightness('200%')).toEqual({ filter: 'brightness(200%)' });
    });

    it('should apply contrast filter', () => {
      expect(contrast('1.5')).toEqual({ filter: 'contrast(1.5)' });
      expect(contrast('0.5')).toEqual({ filter: 'contrast(0.5)' });
      expect(contrast('150%')).toEqual({ filter: 'contrast(150%)' });
    });

    it('should apply saturate filter', () => {
      expect(saturate('2')).toEqual({ filter: 'saturate(2)' });
      expect(saturate('0.5')).toEqual({ filter: 'saturate(0.5)' });
      expect(saturate('150%')).toEqual({ filter: 'saturate(150%)' });
    });

    it('should apply sepia filter', () => {
      expect(sepia('0.5')).toEqual({ filter: 'sepia(0.5)' });
      expect(sepia('1')).toEqual({ filter: 'sepia(1)' });
      expect(sepia('50%')).toEqual({ filter: 'sepia(50%)' });
    });
  });

  describe('backdrop', () => {
    it('should handle backdrop blur', () => {
      expect(backdrop('blur/5')).toEqual({ 'backdrop-filter': 'blur(5px)' });
      expect(backdrop('blur/10px')).toEqual({ 'backdrop-filter': 'blur(10px)' });
      expect(backdrop('blur/2rem')).toEqual({ 'backdrop-filter': 'blur(2rem)' });
    });

    it('should pass through other backdrop values', () => {
      expect(backdrop('brightness(0.5)')).toEqual({ 'backdrop-filter': 'brightness(0.5)' });
      expect(backdrop('contrast(1.5)')).toEqual({ 'backdrop-filter': 'contrast(1.5)' });
    });

    it('should return empty object for no value', () => {
      expect(backdrop()).toEqual({});
    });
  });
});