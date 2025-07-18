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

  it('should apply display size', () => {
    const result = headingString('display');
    console.log('display(lg):', result);
    expect(result).toContain('text(..6xl/1/-4%)');
    expect(result).not.toContain('text(3xl/1.3/-1.5%)'); // should not have default
  });

  it('should apply hero size', () => {
    const result = headingString('hero');
    console.log('heading(hero):', result);
    expect(result).toContain('text(..5xl/1/-3.5%)');
  });

  it('should apply caption size', () => {
    const result = headingString('caption');
    console.log('heading(caption):', result);
    expect(result).toContain('text(sm/1.5/wider)');
  });

  it('should handle size/variant combination', () => {
    const result = headingString('display/gradient');
    console.log('heading(display/gradient):', result);
    expect(result).toContain('text(..6xl/1/-4%)');
    expect(result).toContain('c(135deg/indigo-600..purple-600..pink-600)');
  });

  it('should handle variant/size combination', () => {
    const result = headingString('gradient/display');
    console.log('heading(gradient/display):', result);
    expect(result).toContain('text(..6xl/1/-4%)');
  });
});