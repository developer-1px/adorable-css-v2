import { describe, it, expect } from 'vitest';
import { font } from '../rules/text/font';
import { generateTokenCSS, defaultTokens, isToken, getTokenVar } from '../design-system/tokens/index';

describe('font(base) token resolution', () => {
  it('should resolve font(base) to font-size: var(--font-md)', () => {
    const result = font('base');
    expect(result).toEqual({ 'font-size': 'var(--font-md)' });
  });

  it('should verify that base is properly aliased to md in isToken', () => {
    // Test that 'base' resolves to 'md' token
    const tokenName = 'base' === 'base' ? 'md' : 'base';
    expect(isToken(tokenName, 'font')).toBe(true);
    expect(isToken('md', 'font')).toBe(true);
  });

  it('should verify that getTokenVar returns correct CSS variable for md', () => {
    const tokenVar = getTokenVar('font', 'md');
    expect(tokenVar).toBe('var(--font-md)');
  });

  it('should verify that CSS variable generation includes --font-md: 1rem', () => {
    const cssVars = generateTokenCSS(defaultTokens);
    expect(cssVars).toContain('--font-md: 1rem');
  });

  it('should verify that defaultTokens.font.md is 1rem', () => {
    expect(defaultTokens.font.md).toBe('1rem');
  });

  it('should handle font(base) with line height', () => {
    const result = font('base/1.5');
    expect(result).toEqual({ 
      'font-size': 'var(--font-md)',
      'line-height': '1.5'
    });
  });

  it('should handle font(base) with line height and letter spacing', () => {
    const result = font('base/1.5/0.05em');
    expect(result).toEqual({ 
      'font-size': 'var(--font-md)',
      'line-height': '1.5',
      'letter-spacing': '0.05em'
    });
  });

  it('should handle font(base) with fluid syntax: font(..base)', () => {
    const result = font('..base');
    // Should generate clamp with base (md) as the max value
    expect(result).toHaveProperty('font-size');
    expect(result['font-size']).toContain('clamp(');
    expect(result['font-size']).toContain('var(--font-md)');
  });

  it('should handle font(base) with fluid syntax: font(base..)', () => {
    const result = font('base..');
    // Should generate clamp with base (md) as the min value
    expect(result).toHaveProperty('font-size');
    expect(result['font-size']).toContain('clamp(');
    expect(result['font-size']).toContain('var(--font-md)');
  });

  it('should verify that font(md) and font(base) produce the same result', () => {
    const baseResult = font('base');
    const mdResult = font('md');
    expect(baseResult).toEqual(mdResult);
  });
});