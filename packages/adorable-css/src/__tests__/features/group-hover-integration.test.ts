import { describe, test, expect } from 'vitest';
import { generateClass } from '../../07-generator/generator';

describe('Group Hover Integration Test', () => {
  test('should generate basic CSS without issues', () => {
    const css = generateClass('c(red-500)');
    expect(css).toContain('color');
    expect(css).toContain('var(--red-500)');
  });

  test('should generate background CSS without issues', () => {
    const css = generateClass('bg(blue-500)');
    expect(css).toContain('background-color');
    expect(css).toContain('var(--blue-500)');
  });

  test('should generate hover state CSS correctly', () => {
    const css = generateClass('hover:c(green-500)');
    expect(css).toContain(':hover');
    expect(css).toContain('color');
    expect(css).toContain('var(--green-500)');
  });

  test('should generate group-hover state CSS correctly', () => {
    const css = generateClass('group-hover:bg(purple-500)');
    expect(css).toContain('.group:hover');
    expect(css).toContain('background-color');
    expect(css).toContain('var(--purple-500)');
  });

  test('should generate group-focus state CSS correctly', () => {
    const css = generateClass('group-focus:c(orange-500)');
    expect(css).toContain('.group:focus');
    expect(css).toContain('color');
    expect(css).toContain('var(--orange-500)');
  });

  test('should generate group-active state CSS correctly', () => {
    const css = generateClass('group-active:opacity(0.5)');
    expect(css).toContain('.group:active');
    expect(css).toContain('opacity');
    expect(css).toContain('0.5');
  });

  test('should handle complex AdorableCSS with group states', () => {
    const css = generateClass('group-hover:p(lg)');
    expect(css).toContain('.group:hover');
    expect(css).toContain('padding');
  });
});