import { describe, it, expect } from 'vitest';
import { aspectRatio, float, isolation, objectFit, objectPosition, scrollBehavior, scrollSnap } from '../../../04-rules/03-rules_deprecated/utilities/utilities';

describe('utilities 03-rules', () => {
  describe('aspectRatio', () => {
    it('should handle common aspect ratios', () => {
      expect(aspectRatio('1:1')).toEqual({ 'aspect-ratio': '1 / 1' });
      expect(aspectRatio('16:9')).toEqual({ 'aspect-ratio': '16 / 9' });
      expect(aspectRatio('4:3')).toEqual({ 'aspect-ratio': '4 / 3' });
      expect(aspectRatio('21:9')).toEqual({ 'aspect-ratio': '21 / 9' });
    });

    it('should handle single values', () => {
      expect(aspectRatio('auto')).toEqual({ 'aspect-ratio': 'auto' });
      expect(aspectRatio('1')).toEqual({ 'aspect-ratio': '1' });
      expect(aspectRatio('2')).toEqual({ 'aspect-ratio': '2' });
    });

    it('should return empty object for no value', () => {
      expect(aspectRatio()).toEqual({});
    });
  });

  describe('float', () => {
    it('should handle float values', () => {
      expect(float('left')).toEqual({ float: 'left' });
      expect(float('right')).toEqual({ float: 'right' });
      expect(float('none')).toEqual({ float: 'none' });
    });

    it('should return empty object for no value', () => {
      expect(float()).toEqual({});
    });
  });

  describe('isolation', () => {
    it('should handle isolation values', () => {
      expect(isolation('isolate')).toEqual({ isolation: 'isolate' });
      expect(isolation('auto')).toEqual({ isolation: 'auto' });
    });

    it('should return empty object for no value', () => {
      expect(isolation()).toEqual({});
    });
  });

  describe('objectFit', () => {
    it('should handle object-fit values', () => {
      expect(objectFit('contain')).toEqual({ 'object-fit': 'contain' });
      expect(objectFit('cover')).toEqual({ 'object-fit': 'cover' });
      expect(objectFit('fill')).toEqual({ 'object-fit': 'fill' });
      expect(objectFit('none')).toEqual({ 'object-fit': 'none' });
      expect(objectFit('scale-down')).toEqual({ 'object-fit': 'scale-down' });
    });

    it('should return empty object for no value', () => {
      expect(objectFit()).toEqual({});
    });
  });

  describe('objectPosition', () => {
    it('should handle object-position values', () => {
      expect(objectPosition('center')).toEqual({ 'object-position': 'center' });
      expect(objectPosition('top')).toEqual({ 'object-position': 'top' });
      expect(objectPosition('bottom')).toEqual({ 'object-position': 'bottom' });
      expect(objectPosition('left')).toEqual({ 'object-position': 'left' });
      expect(objectPosition('right')).toEqual({ 'object-position': 'right' });
      expect(objectPosition('50% 50%')).toEqual({ 'object-position': '50% 50%' });
    });

    it('should return empty object for no value', () => {
      expect(objectPosition()).toEqual({});
    });
  });

  describe('scrollBehavior', () => {
    it('should handle scroll-behavior values', () => {
      expect(scrollBehavior('smooth')).toEqual({ 'scroll-behavior': 'smooth' });
      expect(scrollBehavior('auto')).toEqual({ 'scroll-behavior': 'auto' });
    });

    it('should return empty object for no value', () => {
      expect(scrollBehavior()).toEqual({});
    });
  });

  describe('scrollSnap', () => {
    it('should handle scroll-snap-align values', () => {
      expect(scrollSnap('start')).toEqual({ 'scroll-snap-align': 'start' });
      expect(scrollSnap('center')).toEqual({ 'scroll-snap-align': 'center' });
      expect(scrollSnap('end')).toEqual({ 'scroll-snap-align': 'end' });
    });

    it('should return empty object for no value', () => {
      expect(scrollSnap()).toEqual({});
    });
  });
});