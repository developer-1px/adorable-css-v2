import { describe, it, expect } from 'vitest';
import { backdropBlur, backdropSaturate, backdropBrightness, backdropContrast, backdropGrayscale, backdropHueRotate, backdropInvert, backdropOpacity, backdropSepia } from '../../../03-rules/style/backdrop'; // Corrected import path

describe('backdrop filter rules', () => { // Clarified describe block name
  describe('backdropBlur', () => {
    it('should apply default blur', () => {
      expect(backdropBlur()).toEqual({ 'backdrop-filter': 'blur(8px)' });
    });

    it('should handle preset values', () => {
      expect(backdropBlur('sm')).toEqual({ 'backdrop-filter': 'blur(4px)' });
      expect(backdropBlur('lg')).toEqual({ 'backdrop-filter': 'blur(16px)' });
      expect(backdropBlur('2xl')).toEqual({ 'backdrop-filter': 'blur(40px)' });
    });

    it('should handle numeric values', () => {
      expect(backdropBlur('12')).toEqual({ 'backdrop-filter': 'blur(12px)' });
      expect(backdropBlur('24')).toEqual({ 'backdrop-filter': 'blur(24px)' });
    });

    it('should pass through custom values', () => {
      expect(backdropBlur('5rem')).toEqual({ 'backdrop-filter': 'blur(5rem)' });
    });

    it('should return empty object for invalid values', () => { // Added new test case
      expect(backdropBlur('invalid')).toEqual({});
    });
  });

  describe('backdropSaturate', () => {
    it('should apply default saturation', () => {
      expect(backdropSaturate()).toEqual({ 'backdrop-filter': 'saturate(1)' });
    });

    it('should handle percentage values', () => {
      expect(backdropSaturate('150')).toEqual({ 'backdrop-filter': 'saturate(1.5)' });
      expect(backdropSaturate('200')).toEqual({ 'backdrop-filter': 'saturate(2)' });
    });

    it('should handle decimal values', () => {
      expect(backdropSaturate('0.5')).toEqual({ 'backdrop-filter': 'saturate(0.5)' });
      expect(backdropSaturate('0.8')).toEqual({ 'backdrop-filter': 'saturate(0.8)' });
    });

    it('should return empty object for invalid values', () => { // Added new test case
      expect(backdropSaturate('invalid')).toEqual({});
    });
  });

  describe('backdropBrightness', () => {
    it('should apply default brightness', () => {
      expect(backdropBrightness()).toEqual({ 'backdrop-filter': 'brightness(1)' });
    });

    it('should handle percentage values', () => {
      expect(backdropBrightness('110')).toEqual({ 'backdrop-filter': 'brightness(1.1)' });
      expect(backdropBrightness('50')).toEqual({ 'backdrop-filter': 'brightness(0.5)' });
    });

    it('should return empty object for invalid values', () => { // Added new test case
      expect(backdropBrightness('invalid')).toEqual({});
    });
  });

  describe('backdropContrast', () => {
    it('should apply default contrast', () => {
      expect(backdropContrast()).toEqual({ 'backdrop-filter': 'contrast(1)' });
    });

    it('should handle percentage values', () => {
      expect(backdropContrast('150')).toEqual({ 'backdrop-filter': 'contrast(1.5)' });
      expect(backdropContrast('75')).toEqual({ 'backdrop-filter': 'contrast(0.75)' });
    });

    it('should return empty object for invalid values', () => { // Added new test case
      expect(backdropContrast('invalid')).toEqual({});
    });
  });

  describe('backdropGrayscale', () => {
    it('should apply full grayscale by default', () => {
      expect(backdropGrayscale()).toEqual({ 'backdrop-filter': 'grayscale(1)' });
    });

    it('should handle percentage values', () => {
      expect(backdropGrayscale('50')).toEqual({ 'backdrop-filter': 'grayscale(0.5)' });
      expect(backdropGrayscale('0')).toEqual({ 'backdrop-filter': 'grayscale(0)' });
    });

    it('should return empty object for invalid values', () => { // Added new test case
      expect(backdropGrayscale('invalid')).toEqual({});
    });
  });

  describe('backdropHueRotate', () => {
    it('should apply default rotation', () => {
      expect(backdropHueRotate()).toEqual({ 'backdrop-filter': 'hue-rotate(0deg)' });
    });

    it('should handle degree values', () => {
      expect(backdropHueRotate('90')).toEqual({ 'backdrop-filter': 'hue-rotate(90deg)' });
      expect(backdropHueRotate('180')).toEqual({ 'backdrop-filter': 'hue-rotate(180deg)' });
    });

    it('should return empty object for invalid values', () => { // Added new test case
      expect(backdropHueRotate('invalid')).toEqual({});
    });
  });

  describe('backdropInvert', () => {
    it('should apply full invert by default', () => {
      expect(backdropInvert()).toEqual({ 'backdrop-filter': 'invert(1)' });
    });

    it('should handle percentage values', () => {
      expect(backdropInvert('50')).toEqual({ 'backdrop-filter': 'invert(0.5)' });
      expect(backdropInvert('25')).toEqual({ 'backdrop-filter': 'invert(0.25)' });
    });

    it('should return empty object for invalid values', () => { // Added new test case
      expect(backdropInvert('invalid')).toEqual({});
    });
  });

  describe('backdropOpacity', () => {
    it('should apply full opacity by default', () => {
      expect(backdropOpacity()).toEqual({ 'backdrop-filter': 'opacity(1)' });
    });

    it('should handle percentage values', () => {
      expect(backdropOpacity('50')).toEqual({ 'backdrop-filter': 'opacity(0.5)' });
      expect(backdropOpacity('75')).toEqual({ 'backdrop-filter': 'opacity(0.75)' });
    });

    it('should return empty object for invalid values', () => { // Added new test case
      expect(backdropOpacity('invalid')).toEqual({});
    });
  });

  describe('backdropSepia', () => {
    it('should apply full sepia by default', () => {
      expect(backdropSepia()).toEqual({ 'backdrop-filter': 'sepia(1)' });
    });

    it('should handle percentage values', () => {
      expect(backdropSepia('50')).toEqual({ 'backdrop-filter': 'sepia(0.5)' });
      expect(backdropSepia('0')).toEqual({ 'backdrop-filter': 'sepia(0)' });
    });

    it('should return empty object for invalid values', () => { // Added new test case
      expect(backdropSepia('invalid')).toEqual({});
    });
  });
});
