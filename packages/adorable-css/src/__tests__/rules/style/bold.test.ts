import { describe, it, expect } from 'vitest';
import { bold } from '../../../rules/text/bold';

describe('bold', () => {
  it('should handle numeric font weights', () => {
    expect(bold('100')).toEqual({ 'font-weight': '100' });
    expect(bold('200')).toEqual({ 'font-weight': '200' });
    expect(bold('300')).toEqual({ 'font-weight': '300' });
    expect(bold('400')).toEqual({ 'font-weight': '400' });
    expect(bold('500')).toEqual({ 'font-weight': '500' });
    expect(bold('600')).toEqual({ 'font-weight': '600' });
    expect(bold('700')).toEqual({ 'font-weight': '700' });
    expect(bold('800')).toEqual({ 'font-weight': '800' });
    expect(bold('900')).toEqual({ 'font-weight': '900' });
  });

  it('should handle named font weight tokens', () => {
    expect(bold('thin')).toEqual({ 'font-weight': 'var(--fontWeight-thin)' });
    expect(bold('light')).toEqual({ 'font-weight': 'var(--fontWeight-light)' });
    expect(bold('normal')).toEqual({ 'font-weight': 'var(--fontWeight-normal)' });
    expect(bold('medium')).toEqual({ 'font-weight': 'var(--fontWeight-medium)' });
    expect(bold('semi')).toEqual({ 'font-weight': 'var(--fontWeight-semi)' });
    expect(bold('bold')).toEqual({ 'font-weight': 'var(--fontWeight-bold)' });
    expect(bold('extrabold')).toEqual({ 'font-weight': 'var(--fontWeight-extrabold)' });
    expect(bold('black')).toEqual({ 'font-weight': 'var(--fontWeight-black)' });
  });

  it('should return empty object for invalid values', () => {
    expect(bold('50')).toEqual({});
    expect(bold('1000')).toEqual({});
    expect(bold('invalid')).toEqual({});
  });
  
  it('should return bold (700) for empty string', () => {
    expect(bold('')).toEqual({ 'font-weight': '700' });
  });

  it('should return bold (700) when no value provided', () => {
    expect(bold()).toEqual({ 'font-weight': '700' });
  });
});