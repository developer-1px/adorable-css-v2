import { describe, test, expect } from 'vitest';
import { generateCSS } from '../index';

describe('text() with font size 02-design_tokens', () => {
  test('should still support text alignment', () => {
    expect(generateCSS(['text(center)'])).toContain('text-align:center');
    expect(generateCSS(['text(left)'])).toContain('text-align:left');
    expect(generateCSS(['text(right)'])).toContain('text-align:right');
    expect(generateCSS(['text(justify)'])).toContain('text-align:justify');
  });
});