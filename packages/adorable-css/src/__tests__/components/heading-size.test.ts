import { describe, it, expect } from 'vitest';
import { headingString } from '../../05-components/primitives/typography/heading';

describe('heading component size variants', () => {
  it('should apply default size when no argument', () => {
    const result = headingString();
    console.log('heading():', result);
    expect(result).toContain('text(3xl/1.3/-1.5%)'); // default size
  });

  it('should apply h1 size', () => {
    const result = headingString('h1');
    console.log('heading(h1):', result);
    expect(result).toContain('text(..5xl/1.1/-3%)');
  });

  it('should apply h2 size', () => {
    const result = headingString('h2');
    console.log('heading(h2):', result);
    expect(result).toContain('text(2xl/tight/-1%)');
    expect(result).not.toContain('text(3xl/1.3/-1.5%)'); // should not have default
  });

  it('should apply h3 size', () => {
    const result = headingString('h3');
    console.log('heading(h3):', result);
    expect(result).toContain('text(xl/snug)');
  });

  it('should apply h6 size', () => {
    const result = headingString('h6');
    console.log('heading(h6):', result);
    expect(result).toContain('text(sm/relaxed/widest)');
    expect(result).toContain('uppercase');
  });

  it('should handle size/variant combination', () => {
    const result = headingString('h1/gradient');
    console.log('heading(h1/gradient):', result);
    expect(result).toContain('text(..5xl/1.1/-3%)');
    expect(result).toContain('c(135deg/purple-600..pink-600)');
  });

  it('should handle variant/size combination', () => {
    const result = headingString('gradient/h1');
    console.log('heading(gradient/h1):', result);
    expect(result).toContain('text(..5xl/1.1/-3%)');
    expect(result).toContain('c(135deg/purple-600..pink-600)');
  });
});