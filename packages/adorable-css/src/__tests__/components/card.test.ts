import { describe, it, expect } from 'vitest';
import { generateCSS } from '../../index';

describe('card component', () => {
  it('should return default card styles', () => {
    const css = generateCSS(['card()']);
    expect(css).toContain('background-color:#ffffff');
    expect(css).toContain('box-shadow');
  });

  it('should apply small size', () => {
    const css = generateCSS(['card(sm)']);
    expect(css).toContain('padding');
    expect(css).toContain('border-radius');
  });
});