import { describe, it, expect } from 'vitest';
import { headingString } from '../../04-components/primitives/typography/heading';

describe('heading component', () => {
  it('should return default heading styles', () => {
    const result = headingString();
    expect(result).toContain('scroll-m(20) c(gray-900) transition-color first:mt(0)');
    expect(result).toContain('pb(2) font(3xl) bold(semi) tracking(tight)'); // default (h2) size
  });

  it('should apply h1 size', () => {
    const result = headingString('h1');
    expect(result).toContain('font(5xl) bold(bold) lh(1.1) tracking(-2.5%)');
    expect(result).toContain('sm:text(6xl)');
  });

  it('should apply h2 size', () => {
    const result = headingString('h2');
    expect(result).toContain('pb(2) font(4xl) bold(semi) tracking(-2%)');
    expect(result).toContain('border-b(1/gray-200)');
  });

  it('should apply h3 size with gradient and underline', () => {
    const result = headingString('h3');
    expect(result).toContain('mt(32) mb(16) font(3xl) bold(semi) tracking(-1.5%)');
    expect(result).toContain('c(135deg/gray-900..gray-600)');
    expect(result).toContain('after:content("")');
    expect(result).toContain('after:bg(135deg/purple-500.6..pink-500.6)');
  });

  it('should apply h4 size', () => {
    const result = headingString('h4');
    expect(result).toContain('mt(24) font(2xl) bold(medium) tracking(-1%)');
  });

  it('should apply h5 size', () => {
    const result = headingString('h5');
    expect(result).toContain('mt(16) font(xl) bold(medium) tracking(-0.5%)');
  });

  it('should apply h6 size', () => {
    const result = headingString('h6');
    expect(result).toContain('mt(16) font(lg) bold(medium)');
  });

  it('should apply display size', () => {
    const result = headingString('display');
    expect(result).toContain('font(clamp(4rem,8vw,6rem)) bold(black)');
    expect(result).toContain('lh(0.95) mb(24) tracking(-4%)');
  });

  it('should apply hero size', () => {
    const result = headingString('hero');
    expect(result).toContain('font(clamp(3.75rem,7vw,5rem)) bold(bold)');
    expect(result).toContain('lh(1) mb(24) tracking(-3.5%)');
  });

  it('should apply page size', () => {
    const result = headingString('page');
    expect(result).toContain('font(5xl) bold(bold) lh(1.1)');
    expect(result).toContain('mb(8) tracking(-2.5%)');
  });

  it('should apply caption size', () => {
    const result = headingString('caption');
    expect(result).toContain('font(sm) bold(medium) c(gray-600)');
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
    expect(result).toContain('font(xl) c(gray-600) lh(relaxed) font(normal)');
  });

  it('should apply small variant', () => {
    const result = headingString('small');
    expect(result).toContain('font(sm) c(gray-600) bold(medium)');
    expect(result).toContain('uppercase tracking(5%)');
  });

  it('should apply large variant', () => {
    const result = headingString('large');
    expect(result).toContain('font(lg) c(gray-900) font(normal) lh(1.5)');
  });

  it('should combine size and variant', () => {
    const result = headingString('h1/gradient');
    expect(result).toContain('font(5xl) bold(bold)'); // h1 size
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