import { describe, it, expect } from 'vitest';
import { c } from '../04-rules/03-rules_deprecated/text/color';

describe('Gradient Text with c() utility', () => {
  it('should handle simple gradient with .. syntax', () => {
    const result = c('#fff..#000');
    expect(result).toEqual({
      background: 'linear-gradient(90deg, #fff, #000)',
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      '-webkit-text-fill-color': 'transparent'
    });
  });

  it('should handle full gradient syntax with angle and colors', () => {
    const result = c('135deg/#fff..#000');
    expect(result).toEqual({
      background: 'linear-gradient(135deg, #fff, #000)',
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      '-webkit-text-fill-color': 'transparent'
    });
  });

  it('should handle gradient with named direction', () => {
    const result = c('to-r/purple-500..pink-500');
    expect(result).toEqual({
      background: 'linear-gradient(to right, #a855f7, #ec4899)',
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      '-webkit-text-fill-color': 'transparent'
    });
  });

  it('should handle gradient with multiple colors', () => {
    const result = c('45deg/#ff0000..#00ff00..#0000ff');
    expect(result).toEqual({
      background: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)',
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      '-webkit-text-fill-color': 'transparent'
    });
  });

  it('should handle gradient with OKLCH colors', () => {
    const result = c('90deg/oklch(0.7,0.25,330)..oklch(0.65,0.28,360)');
    expect(result).toEqual({
      background: 'linear-gradient(90deg, oklch(0.7,0.25,330), oklch(0.65,0.28,360))',
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      '-webkit-text-fill-color': 'transparent'
    });
  });

  it('should handle regular colors without gradient', () => {
    const result = c('#ff0000');
    expect(result).toEqual({
      color: '#ff0000'
    });
  });

  it('should handle color with alpha', () => {
    const result = c('white.5');
    expect(result).toEqual({
      color: 'rgba(255,255,255,0.5)'
    });
  });

  it('should handle current color', () => {
    const result = c('current');
    expect(result).toEqual({
      color: 'currentColor'
    });
  });

  it('should handle linear-gradient strings', () => {
    const result = c('linear-gradient(90deg, red, blue)');
    expect(result).toEqual({
      background: 'linear-gradient(90deg, red, blue)',
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      '-webkit-text-fill-color': 'transparent'
    });
  });
});