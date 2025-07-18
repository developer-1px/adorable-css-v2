import { describe, it, expect } from 'vitest';
import { headingString } from '../../05-components/primitives/typography/heading';

describe('heading component', () => {
  it('should return default heading styles', () => {
    const result = headingString();
    expect(result).toContain('scroll-m(20) c(gray-900) transition-color first:mt(0)');
    expect(result).toContain('pb(2) text(3xl) font(semi) tracking(tight)'); // default (h2) size
  });

  it('should apply h1 size', () => {
    const result = headingString('h1');
    expect(result).toContain('text(5xl) font(bold) lh(1.1) tracking(-2.5%)');
    expect(result).toContain('sm:text(6xl)');
  });

  it('should apply h2 size', () => {
    const result = headingString('h2');
    expect(result).toContain('pb(2) text(4xl) font(semi) tracking(-2%)');
    expect(result).toContain('bb(1/gray-200)');
  });

  it('should apply h3 size with gradient and underline', () => {
    const result = headingString('h3');
    expect(result).toContain('mt(32) mb(16) text(3xl) font(semi) tracking(-1.5%)');
    expect(result).toContain('c(135deg/gray-900..gray-600)');
    expect(result).toContain('after:content("")');
    expect(result).toContain('after:bg(135deg/purple-500.6..pink-500.6)');
  });

  it('should apply h4 size', () => {
    const result = headingString('h4');
    expect(result).toContain('mt(24) text(2xl) font(medium) tracking(-1%)');
  });

  it('should apply h5 size', () => {
    const result = headingString('h5');
    expect(result).toContain('mt(16) text(xl) font(medium) tracking(-0.5%)');
  });

  it('should apply h6 size', () => {
    const result = headingString('h6');
    expect(result).toContain('mt(16) text(lg) font(medium)');
  });

  it('should apply display size', () => {
    const result = headingString('display');
    expect(result).toContain('text(clamp(4rem,8vw,6rem)) font(black)');
    expect(result).toContain('lh(0.95) mb(24) tracking(-4%)');
  });

  it('should apply hero size', () => {
    const result = headingString('hero');
    expect(result).toContain('text(clamp(3.75rem,7vw,5rem)) font(bold)');
    expect(result).toContain('lh(1) mb(24) tracking(-3.5%)');
  });

  it('should apply page size', () => {
    const result = headingString('page');
    expect(result).toContain('text(5xl) font(bold) lh(1.1)');
    expect(result).toContain('mb(8) tracking(-2.5%)');
  });

  it('should apply caption size', () => {
    const result = headingString('caption');
    expect(result).toContain('text(sm) font(medium) c(gray-600)');
    expect(result).toContain('uppercase tracking(5%) mb(8)');
  });

  it('should apply muted variant', () => {
    const result = headingString('muted');
    expect(result).toContain('c(gray-600)');
  });

  it('should apply gradient variant', () => {
    const result = headingString('gradient');
    expect(result).toContain('c(135deg/brand-start..brand-end)');
  });

  it('should apply lead variant', () => {
    const result = headingString('lead');
    expect(result).toContain('text(xl) c(gray-600) lh(relaxed) text(normal)');
  });

  it('should apply small variant', () => {
    const result = headingString('small');
    expect(result).toContain('text(sm) c(gray-600) font(medium)');
    expect(result).toContain('uppercase tracking(5%)');
  });

  it('should apply large variant', () => {
    const result = headingString('large');
    expect(result).toContain('text(lg) c(gray-900) text(normal) lh(1.5)');
  });

  it('should combine size and variant', () => {
    const result = headingString('h1/gradient');
    expect(result).toContain('text(5xl) font(bold)'); // h1 size
    expect(result).toContain('c(135deg/brand-start..brand-end)'); // gradient color from compound variant
  });

  it('should apply compound variant for gradient', () => {
    const result = headingString('h2/gradient');
    expect(result).toContain('c(135deg/brand-start..brand-end)');
  });

  it('should handle variant/size order', () => {
    const result1 = headingString('h4/muted');
    const result2 = headingString('muted/h4');
    expect(result1).toBe(result2);
  });
});