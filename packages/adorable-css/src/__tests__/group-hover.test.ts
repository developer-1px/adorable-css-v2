import { describe, test, expect } from 'vitest';
import { generateCSSFromAdorableCSS } from '../core/parser/generator';
import { StateSelector, isStateClass } from '../extensions/responsive/responsive-decorator';

describe('Group Hover Feature', () => {
  test('should recognize state patterns', () => {
    const isGroupHover = isStateClass('group-hover:c(red-500)');
    const isHover = isStateClass('hover:c(blue-500)');
    
    console.log('Is group-hover a state class:', isGroupHover);
    console.log('Is hover a state class:', isHover);
    
    expect(isGroupHover).toBe(true);
    expect(isHover).toBe(true);
    
    const groupHoverPattern = StateSelector.analyze('group-hover:c(red-500)');
    const hoverPattern = StateSelector.analyze('hover:c(blue-500)');
    
    console.log('Group hover pattern:', groupHoverPattern);
    console.log('Hover pattern:', hoverPattern);
    
    expect(groupHoverPattern?.isGroup).toBe(true);
    expect(hoverPattern?.isGroup).toBe(false);
  });
  
  test('should generate base CSS first', () => {
    const baseCSS = generateCSSFromAdorableCSS('c(red-500)');
    console.log('Base CSS for c(red-500):', baseCSS);
    
    expect(baseCSS).not.toBe('');
    expect(baseCSS).toContain('color');
  });

  test('should generate group-hover CSS correctly', () => {
    const css = generateCSSFromAdorableCSS('group-hover:c(red-500)');
    console.log('Generated group-hover CSS:', css);
    
    expect(css).toContain('.group:hover');
    expect(css).toContain('color');
  });

  test('should generate regular hover CSS correctly', () => {
    const css = generateCSSFromAdorableCSS('hover:c(blue-500)');
    console.log('Generated hover CSS:', css);
    
    expect(css).toContain(':hover');
    expect(css).toContain('color');
  });

  test('should handle group-focus CSS correctly', () => {
    const css = generateCSSFromAdorableCSS('group-focus:bg(gray-100)');
    console.log('Generated group-focus CSS:', css);
    
    expect(css).toContain('.group:focus');
    expect(css).toContain('background');
  });
});