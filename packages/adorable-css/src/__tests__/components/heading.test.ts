import { describe, it, expect } from 'vitest';
import { generateCSS } from '../../index';

describe('heading component', () => {
  it('should return default heading styles', () => {
    const css = generateCSS(['heading()']);
    expect(css).toContain('color:var(--gray-900)');
    expect(css).toContain('font-size:var(--font-3xl)');
  });

  it('should apply h1 size', () => {
    const css = generateCSS(['heading(h1)']);
    expect(css).toContain('font-size:clamp(var(--font-sm), 4vw, var(--font-5xl))');
  });
});