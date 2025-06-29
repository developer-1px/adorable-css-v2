import { describe, it, expect } from 'vitest';
import { badgeString } from '../../components/primitives/badge';

describe('badge component', () => {
  it('should return default badge styles', () => {
    const result = badgeString();
    expect(result).toContain('inline-flex items(center) justify(center)');
    expect(result).toContain('px(md) py(xs) text(sm)'); // default size
    expect(result).toContain('bg(gray-100) c(gray-700) border(1/gray-200)'); // default variant
  });

  it('should apply small size', () => {
    const result = badgeString('sm');
    expect(result).toContain('px(sm) text(xs)');
  });

  it('should apply large size', () => {
    const result = badgeString('lg');
    expect(result).toContain('px(lg) py(sm) text(sm)');
  });

  it('should apply primary variant', () => {
    const result = badgeString('primary');
    expect(result).toContain('bg(purple-600) c(white) hover:bg(purple-700)');
  });

  it('should apply secondary variant', () => {
    const result = badgeString('secondary');
    expect(result).toContain('bg(gray-100) c(gray-700) border(1/gray-200) hover:bg(gray-200)');
  });

  it('should apply success variant', () => {
    const result = badgeString('success');
    expect(result).toContain('bg(green-100) c(green-800) border(1/green-200) hover:bg(green-200)');
  });

  it('should apply warning variant', () => {
    const result = badgeString('warning');
    expect(result).toContain('bg(amber-100) c(amber-800) border(1/amber-200) hover:bg(amber-200)');
  });

  it('should apply error variant', () => {
    const result = badgeString('error');
    expect(result).toContain('bg(red-100) c(red-800) border(1/red-200) hover:bg(red-200)');
  });

  it('should apply info variant', () => {
    const result = badgeString('info');
    expect(result).toContain('bg(blue-100) c(blue-800) border(1/blue-200) hover:bg(blue-200)');
  });

  it('should apply accent variant', () => {
    const result = badgeString('accent');
    expect(result).toContain('bg(pink-600) c(white) hover:bg(pink-700)');
  });

  it('should apply outline variant', () => {
    const result = badgeString('outline');
    expect(result).toContain('bg(transparent) c(gray-700) border(1/gray-300) hover:border(gray-400)');
  });

  it('should combine variant and size', () => {
    const result = badgeString('primary/sm');
    expect(result).toContain('px(sm) text(xs)');
    expect(result).toContain('bg(purple-600) c(white) hover:bg(purple-700)');
  });

  it('should handle size/variant order', () => {
    const result1 = badgeString('primary/lg');
    const result2 = badgeString('lg/primary');
    expect(result1).toBe(result2);
  });
});