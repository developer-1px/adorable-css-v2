import { describe, it, expect } from 'vitest';
import { font } from '../../../03-rules/text/font';

describe('font', () => {
  it('should handle font size only', () => {
    expect(font('16px')).toEqual({ 'font-size': '16px' });
    expect(font('lg')).toEqual({ 'font-size': 'var(--font-lg)' });
  });

  it('should handle font size and line height', () => {
    expect(font('16px/1.5')).toEqual({
      'font-size': '16px',
      'line-height': '1.5'
    });
    expect(font('lg/1.6')).toEqual({
      'font-size': 'var(--font-lg)',
      'line-height': '1.6'
    });
  });

  it('should handle font size, line height, and letter spacing', () => {
    expect(font('16px/1.5/-1%')).toEqual({
      'font-size': '16px',
      'line-height': '1.5',
      'letter-spacing': '-0.01em'
    });
    
    expect(font('lg/1.6/0.05em')).toEqual({
      'font-size': 'var(--font-lg)',
      'line-height': '1.6',
      'letter-spacing': '0.05em'
    });
  });

  it('should handle letter spacing with percentage', () => {
    expect(font('lg/1.5/-2%')).toEqual({
      'font-size': 'var(--font-lg)',
      'line-height': '1.5',
      'letter-spacing': '-0.02em'
    });
    
    expect(font('20px/1.4/1%')).toEqual({
      'font-size': '20px',
      'line-height': '1.4',
      'letter-spacing': '0.01em'
    });
  });

  it('should handle named line height 02-design_tokens', () => {
    expect(font('lg/tight')).toEqual({
      'font-size': 'var(--font-lg)',
      'line-height': 'var(--lineHeight-tight)'
    });
  });

  it('should handle named letter spacing 02-design_tokens', () => {
    expect(font('lg/1.5/tight')).toEqual({
      'font-size': 'var(--font-lg)',
      'line-height': '1.5',
      'letter-spacing': 'var(--letterSpacing-tight)'
    });
  });

  it('should handle font family', () => {
    expect(font('lg/1.5/inter')).toEqual({
      'font-size': 'var(--font-lg)',
      'line-height': '1.5',
      'font-family': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    });
  });

  it('should return empty object when no value provided', () => {
    expect(font()).toEqual({});
  });
});