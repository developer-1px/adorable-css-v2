import { describe, it, expect } from 'vitest';
import { 
  italic, overline, underline, lineThrough, strike, del,
  sansSerif, serif, monospace, cursive, fantasy, systemUi,
  smallCaps, lowercase, uppercase, capitalize 
} from '../../../04-rules/03-rules_deprecated/text/typography-utils';

describe('typography utilities', () => {
  describe('font-style', () => {
    it('should create italic style', () => {
      expect(italic()).toEqual({ 'font-style': 'italic' });
    });
  });

  describe('text-decoration', () => {
    it('should create overline decoration', () => {
      expect(overline()).toEqual({ 'text-decoration': 'overline' });
    });

    it('should create underline decoration', () => {
      expect(underline()).toEqual({ 'text-decoration': 'underline' });
    });

    it('should create line-through decoration', () => {
      expect(lineThrough()).toEqual({ 'text-decoration': 'line-through' });
    });

    it('should have aliases for line-through', () => {
      expect(strike()).toEqual({ 'text-decoration': 'line-through' });
      expect(del()).toEqual({ 'text-decoration': 'line-through' });
    });
  });

  describe('font-family', () => {
    it('should create sans-serif font family', () => {
      expect(sansSerif()).toEqual({ 'font-family': 'sans-serif' });
    });

    it('should create serif font family', () => {
      expect(serif()).toEqual({ 'font-family': 'serif' });
    });

    it('should create monospace font family', () => {
      expect(monospace()).toEqual({ 'font-family': 'menlo, monospace' });
    });

    it('should create cursive font family', () => {
      expect(cursive()).toEqual({ 'font-family': 'cursive' });
    });

    it('should create fantasy font family', () => {
      expect(fantasy()).toEqual({ 'font-family': 'fantasy' });
    });

    it('should create system-ui font family', () => {
      expect(systemUi()).toEqual({ 'font-family': 'system-ui' });
    });
  });

  describe('font-variant', () => {
    it('should create small-caps variant', () => {
      expect(smallCaps()).toEqual({ 'font-variant': 'small-caps' });
    });
  });

  describe('text-transform', () => {
    it('should create lowercase transform', () => {
      expect(lowercase()).toEqual({ 'text-transform': 'lowercase' });
    });

    it('should create uppercase transform', () => {
      expect(uppercase()).toEqual({ 'text-transform': 'uppercase' });
    });

    it('should create capitalize transform', () => {
      expect(capitalize()).toEqual({ 'text-transform': 'capitalize' });
    });
  });
});