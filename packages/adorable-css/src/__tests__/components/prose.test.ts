import { describe, it, expect } from 'vitest';
import { generateCSS } from '../../index';

describe('prose component with defineComponent', () => {
  it('should return base classes and CSS rule for default variant', () => {
    const css = generateCSS(['prose()']);
    expect(css).toContain('color:var(--gray-700)');
    expect(css).toContain('font-size:16px');
  });

  it('should apply sm variant classes', () => {
    const css = generateCSS(['prose(sm)']);
    expect(css).toContain('max-width:var(--container-sm)');
  });
});