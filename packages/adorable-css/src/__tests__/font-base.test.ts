import { describe, it, expect } from 'vitest';
import { font } from '../04-rules/03-rules_deprecated/text/font';
import { generateTokenCSS, defaultTokens, isToken, getTokenVar } from '../02-design_tokens/design-system/tokens/index';

describe('text(base) token resolution', () => {
  it('should resolve text(base) to font-size: var(--font-md)', () => {
    const result = text('base');
    expect(result).toEqual({ 'font-size': 'var(--font-md)' });
  });

  it('should verify that base is properly aliased to md in isToken', () => {
    // Test that 'base' resolves to 'md' token
    const tokenName = 'md';
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

  it('should handle text(base) with line height', () => {
    const result = text('base/1.5');
    expect(result).toEqual({ 
      'font-size': 'var(--font-md)',
      'line-height': '1.5'
    });
  });

  it('should handle text(base) with line height and letter spacing', () => {
    const result = text('base/1.5/0.05em');
    expect(result).toEqual({ 
      'font-size': 'var(--font-md)',
      'line-height': '1.5',
      'letter-spacing': '0.05em'
    });
  });

  it('should handle text(base) with fluid syntax: text(..base)', () => {
    const result = text('..base');
    // Should generate clamp with base (md) as the max value
    expect(result).toHaveProperty('font-size');
    expect(result['font-size']).toContain('clamp(');
    expect(result['font-size']).toContain('var(--font-md)');
  });

  it('should handle text(base) with fluid syntax: text(base..)', () => {
    const result = text('base..');
    // Should generate clamp with base (md) as the min value
    expect(result).toHaveProperty('font-size');
    expect(result['font-size']).toContain('clamp(');
    expect(result['font-size']).toContain('var(--font-md)');
  });

  it('should verify that text(md) and text(base) produce the same result', () => {
    const baseResult = text('base');
    const mdResult = text('md');
    expect(baseResult).toEqual(mdResult);
  });
});