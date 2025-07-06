import { describe, test, expect } from 'vitest';
import { generateCSS } from '../index';

describe('text() with font size 02-design_tokens', () => {
  test('should support font size 02-design_tokens', () => {
    expect(generateCSS(['text(xs)'])).toContain('font-size:var(--font-xs)');
    expect(generateCSS(['text(sm)'])).toContain('font-size:var(--font-sm)');
    expect(generateCSS(['text(md)'])).toContain('font-size:var(--font-md)');
    expect(generateCSS(['text(lg)'])).toContain('font-size:var(--font-lg)');
    expect(generateCSS(['text(xl)'])).toContain('font-size:var(--font-xl)');
    expect(generateCSS(['text(2xl)'])).toContain('font-size:var(--font-2xl)');
    expect(generateCSS(['text(3xl)'])).toContain('font-size:var(--font-3xl)');
  });

  test('should still support text alignment', () => {
    expect(generateCSS(['text(center)'])).toContain('text-align:center');
    expect(generateCSS(['text(left)'])).toContain('text-align:left');
    expect(generateCSS(['text(right)'])).toContain('text-align:right');
    expect(generateCSS(['text(justify)'])).toContain('text-align:justify');
  });

  test('should work with responsive prefixes', () => {
    expect(generateCSS(['md:text(xl)'])).toContain('@media (min-width: 768px)');
    expect(generateCSS(['md:text(xl)'])).toContain('font-size:var(--font-xl)');
  });

  test('should work with hover states', () => {
    expect(generateCSS(['hover:text(lg)'])).toContain(':hover');
    expect(generateCSS(['hover:text(lg)'])).toContain('font-size:var(--font-lg)');
  });
});