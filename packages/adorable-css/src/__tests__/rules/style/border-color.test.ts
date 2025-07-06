import { describe, it, expect } from 'vitest';
import { bc, btc, brc, bbc, blc } from '../../../03-rules/style/border-color';

describe('border-color 03-rules', () => {
  describe('bc (border-color)', () => {
    it('should handle color values', () => {
      expect(bc('red')).toEqual({ 'border-color': 'red' });
      expect(bc('#ff0000')).toEqual({ 'border-color': '#ff0000' });
      expect(bc('rgb(255,0,0)')).toEqual({ 'border-color': 'rgb(255,0,0)' });
    });

    it('should handle color 02-design_tokens', () => {
      expect(bc('primary')).toEqual({ 'border-color': 'var(--color-primary)' });
      expect(bc('blue-500')).toEqual({ 'border-color': 'var(--color-blue-500)' });
    });

    it('should handle opacity values', () => {
      expect(bc('black.5')).toEqual({ 'border-color': 'color-mix(in srgb, black 50%, transparent)' });
      expect(bc('primary.8')).toEqual({ 'border-color': 'color-mix(in srgb, var(--color-primary) 80%, transparent)' });
    });

    it('should return empty object for no value', () => {
      expect(bc()).toEqual({});
    });
  });

  describe('directional border colors', () => {
    it('should apply top border color', () => {
      expect(btc('red')).toEqual({ 'border-top-color': 'red' });
      expect(btc('primary')).toEqual({ 'border-top-color': 'var(--color-primary)' });
    });

    it('should apply right border color', () => {
      expect(brc('blue')).toEqual({ 'border-right-color': 'blue' });
      expect(brc('secondary')).toEqual({ 'border-right-color': 'var(--color-secondary)' });
    });

    it('should apply bottom border color', () => {
      expect(bbc('green')).toEqual({ 'border-bottom-color': 'green' });
      expect(bbc('success')).toEqual({ 'border-bottom-color': 'var(--color-success)' });
    });

    it('should apply left border color', () => {
      expect(blc('orange')).toEqual({ 'border-left-color': 'orange' });
      expect(blc('warning')).toEqual({ 'border-left-color': 'var(--color-warning)' });
    });

    it('should return empty object for no value', () => {
      expect(btc()).toEqual({});
      expect(brc()).toEqual({});
      expect(bbc()).toEqual({});
      expect(blc()).toEqual({});
    });
  });
});