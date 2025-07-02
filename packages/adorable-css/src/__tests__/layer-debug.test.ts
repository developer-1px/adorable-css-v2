import { describe, it, expect } from 'vitest';
import { generateCSS } from '../core/parser/generator-layer';

describe('Layer Debug', () => {
  it('should generate CSS for c(red)', () => {
    const css = generateCSS(['c(red)']);
    console.log('CSS for c(red):', css);
    expect(css).toBeTruthy();
  });
  
  it('should generate CSS for card', () => {
    const css = generateCSS(['card']);
    console.log('CSS for card:', css);
    expect(css).toBeTruthy();
  });
});