import { describe, it, expect } from 'vitest';
import { cardString } from '../../components/primitives/card';

describe('card component', () => {
  it('should return default card styles', () => {
    const result = cardString();
    expect(result).toContain('relative clip transition-all');
    expect(result).toContain('p(24) r(lg)'); // default size
    expect(result).toContain('bg(white) shadow(sm) border(1/gray-200)'); // default variant
  });

  it('should apply small size', () => {
    const result = cardString('sm');
    expect(result).toContain('p(16) r(md)');
  });

  it('should apply large size', () => {
    const result = cardString('lg');
    expect(result).toContain('p(32) r(xl)');
  });

  it('should apply extra large size', () => {
    const result = cardString('xl');
    expect(result).toContain('p(48) r(2xl)');
  });

  it('should apply outlined variant', () => {
    const result = cardString('outlined');
    expect(result).toContain('bg(white) border(1/gray-200) shadow(none)');
    expect(result).toContain('hover:border(gray-300)');
  });

  it('should apply ghost variant', () => {
    const result = cardString('ghost');
    expect(result).toContain('bg(gray-50) border(1/transparent)');
    expect(result).toContain('hover:bg(gray-100) hover:border(gray-200)');
  });

  it('should apply elevated variant', () => {
    const result = cardString('elevated');
    expect(result).toContain('bg(white) border(1/gray-200.6)');
    expect(result).toContain('hover:border(purple-500.3) hover:bg(gray-50.5)');
  });

  it('should apply interactive variant', () => {
    const result = cardString('interactive');
    expect(result).toContain('bg(gray-50) cursor(pointer) border(1/gray-200.8)');
    expect(result).toContain('select(none)');
    expect(result).toContain('hover:border(purple-500.4) hover:bg(gray-50)');
    expect(result).toContain('active:bg(gray-100)');
  });

  it('should apply feature variant', () => {
    const result = cardString('feature');
    expect(result).toContain('bg(white) text(center) vbox gap(16)');
    expect(result).toContain('border(1/gray-200.8)');
    expect(result).toContain('hover:border(purple-500.4) hover:bg(gray-50.5)');
  });

  it('should apply glass variant', () => {
    const result = cardString('glass');
    expect(result).toContain('backdrop-blur(12) backdrop-saturate(200)');
    expect(result).toContain('bg(white.7) border(1/white.3)');
    expect(result).toContain('shadow(lg/black.1)');
    expect(result).toContain('hover:bg(white.8) hover:border(white.5)');
  });

  it('should apply gradient variant', () => {
    const result = cardString('gradient');
    expect(result).toContain('bg(white) border(1/transparent) relative');
    expect(result).toContain('before:content("")');
    expect(result).toContain('before:bg(135deg/brand-start..brand-end)');
    expect(result).toContain('hover:shadow(lg/purple-500.15)');
  });

  it('should combine variant and size', () => {
    const result = cardString('elevated/lg');
    expect(result).toContain('p(32) r(xl)'); // large size
    expect(result).toContain('bg(white) border(1/gray-200.6)'); // elevated variant
  });

  it('should handle size/variant order', () => {
    const result1 = cardString('ghost/sm');
    const result2 = cardString('sm/ghost');
    expect(result1).toBe(result2);
  });

  it('should include focus state', () => {
    const result = cardString();
    expect(result).toContain('focus:outline(none) ring(2/blue-500) ring-offset(2)');
  });
});