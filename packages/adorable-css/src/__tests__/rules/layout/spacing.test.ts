import { describe, it, expect } from 'vitest';
import { p, px, py, pt, pb, pl, pr, m, mx, my, mt, mb, ml, mr, gap } from '../../../rules/layout/spacing';

describe('spacing rules', () => {
  describe('padding', () => {
    it('should apply default padding', () => {
      expect(p()).toEqual({ padding: 'var(--spacing-md)' });
    });

    it('should handle single value', () => {
      expect(p('16')).toEqual({ padding: '16px' });
      expect(p('2rem')).toEqual({ padding: '2rem' });
    });

    it('should handle token values', () => {
      expect(p('sm')).toEqual({ padding: 'var(--spacing-sm)' });
      expect(p('lg')).toEqual({ padding: 'var(--spacing-lg)' });
    });

    it('should handle two values (vertical/horizontal)', () => {
      expect(p('16/32')).toEqual({
        'padding-top': '16px',
        'padding-right': '32px',
        'padding-bottom': '16px',
        'padding-left': '32px'
      });
    });

    it('should handle four values', () => {
      expect(p('10/20/30/40')).toEqual({
        'padding-top': '10px',
        'padding-right': '20px',
        'padding-bottom': '30px',
        'padding-left': '40px'
      });
    });

    it('should handle hug value', () => {
      expect(px('hug')).toEqual({ 'padding-left': '0.6em', 'padding-right': '0.6em' });
      expect(py('hug')).toEqual({ 'padding-top': '0.2em', 'padding-bottom': '0.2em' });
    });
  });

  describe('padding directions', () => {
    it('should apply directional padding', () => {
      expect(pt('16')).toEqual({ 'padding-top': '16px' });
      expect(pr('16')).toEqual({ 'padding-right': '16px' });
      expect(pb('16')).toEqual({ 'padding-bottom': '16px' });
      expect(pl('16')).toEqual({ 'padding-left': '16px' });
    });

    it('should apply axis padding', () => {
      expect(px('20')).toEqual({ 'padding-left': '20px', 'padding-right': '20px' });
      expect(py('20')).toEqual({ 'padding-top': '20px', 'padding-bottom': '20px' });
    });

    it('should apply default directional padding', () => {
      expect(pt()).toEqual({ 'padding-top': 'var(--spacing-md)' });
      expect(px()).toEqual({ 'padding-left': 'var(--spacing-md)', 'padding-right': 'var(--spacing-md)' });
    });
  });

  describe('margin', () => {
    it('should apply default margin', () => {
      expect(m()).toEqual({ margin: 'var(--spacing-md)' });
    });

    it('should handle single value', () => {
      expect(m('16')).toEqual({ margin: '16px' });
      expect(m('auto')).toEqual({ margin: 'auto' });
    });

    it('should handle two values', () => {
      expect(m('16/auto')).toEqual({
        'margin-top': '16px',
        'margin-right': 'auto',
        'margin-bottom': '16px',
        'margin-left': 'auto'
      });
    });
  });

  describe('margin directions', () => {
    it('should apply directional margin', () => {
      expect(mt('16')).toEqual({ 'margin-top': '16px' });
      expect(mr('auto')).toEqual({ 'margin-right': 'auto' });
      expect(mb('16')).toEqual({ 'margin-bottom': '16px' });
      expect(ml('auto')).toEqual({ 'margin-left': 'auto' });
    });

    it('should apply axis margin', () => {
      expect(mx('auto')).toEqual({ 'margin-left': 'auto', 'margin-right': 'auto' });
      expect(my('20')).toEqual({ 'margin-top': '20px', 'margin-bottom': '20px' });
    });
  });

  describe('gap', () => {
    it('should apply default gap', () => {
      expect(gap()).toEqual({ gap: 'var(--spacing-md)' });
    });

    it('should handle numeric values', () => {
      expect(gap('16')).toEqual({ gap: '16px' });
      expect(gap('2rem')).toEqual({ gap: '2rem' });
    });

    it('should handle token values', () => {
      expect(gap('lg')).toEqual({ gap: 'var(--spacing-lg)' });
    });

    it('should handle auto value', () => {
      expect(gap('auto')).toEqual({
        gap: 'auto',
        'justify-content': 'space-between',
        'align-content': 'space-between'
      });
    });
  });
});