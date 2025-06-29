import { describe, test, expect } from 'vitest';
import { generateCSSFromAdorableCSS } from '../core/parser/generator';

describe('Opacity Feature', () => {
  test('should generate opacity CSS', () => {
    const css = generateCSSFromAdorableCSS('opacity(0)');
    console.log('Opacity CSS:', css);
    expect(css).toContain('opacity:0');
    
    const css100 = generateCSSFromAdorableCSS('opacity(100)');
    console.log('Opacity 100 CSS:', css100);
    expect(css100).toContain('opacity:100');
  });
  
  test('group-hover:opacity should work', () => {
    const css = generateCSSFromAdorableCSS('group-hover:opacity(100)');
    console.log('Group hover opacity CSS:', css);
    expect(css).toContain('.group:hover');
    expect(css).toContain('opacity:100');
  });
});