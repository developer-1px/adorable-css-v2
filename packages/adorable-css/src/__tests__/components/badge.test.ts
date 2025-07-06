import { describe, it, expect } from 'vitest';
import { badgeString } from '../../04-components/primitives/badge';

describe('badge component', () => {
  it('should return default badge styles', () => {
    const result = badgeString();
    expect(result).toContain('hbox(pack) bold(medium) r(sm)');
    expect(result).toContain('px(md) py(xs) text(sm)'); // default size
    expect(result).toContain('bg(neutral-100) c(neutral-700) b(1/neutral-200)'); // default variant
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
    expect(result).toContain('bg(primary) c(white) hover:bg(primary-700)');
  });

  it('should apply secondary variant', () => {
    const result = badgeString('secondary');
    expect(result).toContain('bg(neutral-100) c(neutral-700) b(1/neutral-200) hover:bg(neutral-200)');
  });

  it('should apply success variant', () => {
    const result = badgeString('success');
    expect(result).toContain('bg(success-100) c(success-800) b(1/success-200) hover:bg(success-200)');
  });

  it('should apply warning variant', () => {
    const result = badgeString('warning');
    expect(result).toContain('bg(warning-100) c(warning-800) b(1/warning-200) hover:bg(warning-200)');
  });

  it('should apply error variant', () => {
    const result = badgeString('error');
    expect(result).toContain('bg(error-100) c(error-800) b(1/error-200) hover:bg(error-200)');
  });

  it('should apply info variant', () => {
    const result = badgeString('info');
    expect(result).toContain('bg(primary-100) c(primary-800) b(1/primary-200) hover:bg(primary-200)');
  });

  it('should apply accent variant', () => {
    const result = badgeString('accent');
    expect(result).toContain('bg(primary-600) c(white) hover:bg(primary-700)');
  });

  it('should apply outline variant', () => {
    const result = badgeString('outline');
    expect(result).toContain('bg(transparent) c(neutral-700) b(1/neutral-300) hover:b(1/neutral-400)');
  });

  it('should combine variant and size', () => {
    const result = badgeString('primary/sm');
    expect(result).toContain('px(sm) text(xs)');
    expect(result).toContain('bg(primary) c(white) hover:bg(primary-700)');
  });

  it('should handle size/variant order', () => {
    const result1 = badgeString('primary/lg');
    const result2 = badgeString('lg/primary');
    expect(result1).toBe(result2);
  });

  it('should apply xs size', () => {
    const result = badgeString('xs');
    expect(result).toContain('px(xs) py(1) text(2xs)');
  });

  it('should apply muted variant', () => {
    const result = badgeString('muted');
    expect(result).toContain('bg(neutral-100) c(neutral-600) b(1/neutral-200)');
  });

  it('should handle xs/primary combination', () => {
    const result = badgeString('xs/primary');
    expect(result).toContain('px(xs) py(1) text(2xs)');
    expect(result).toContain('bg(primary) c(white) hover:bg(primary-700)');
  });

  it('should handle sm/muted combination', () => {
    const result = badgeString('sm/muted');
    expect(result).toContain('px(sm) text(xs)');
    expect(result).toContain('bg(neutral-100) c(neutral-600) b(1/neutral-200)');
  });
});