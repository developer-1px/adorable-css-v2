import { describe, it, expect } from 'vitest';
import { transformRules } from '../03-rules/effects/transforms';

const scale = transformRules.scale;

describe('Scale Transform', () => {
  it('should use decimal values directly', () => {
    expect(scale('1')).toEqual({ transform: 'scale(1)' });
    expect(scale('1.05')).toEqual({ transform: 'scale(1.05)' });
    expect(scale('0.95')).toEqual({ transform: 'scale(0.95)' });
    expect(scale('2')).toEqual({ transform: 'scale(2)' });
    expect(scale('0.5')).toEqual({ transform: 'scale(0.5)' });
  });

  it('should convert integer values >= 100 to percentage', () => {
    // Integer values >= 100 should be converted to percentage
    expect(scale('100')).toEqual({ transform: 'scale(100%)' });
    expect(scale('110')).toEqual({ transform: 'scale(110%)' });
    expect(scale('105')).toEqual({ transform: 'scale(105%)' });
    
    // Values < 100 should not be converted
    expect(scale('95')).toEqual({ transform: 'scale(95)' });
    expect(scale('50')).toEqual({ transform: 'scale(50)' });
  });

  it('should not convert decimal values or explicit percentages', () => {
    // Decimal values should be passed through as-is
    expect(scale('1.1')).toEqual({ transform: 'scale(1.1)' });
    expect(scale('2.5')).toEqual({ transform: 'scale(2.5)' });
    
    // Already percentage values should be passed through
    expect(scale('110%')).toEqual({ transform: 'scale(110%)' });
    expect(scale('95%')).toEqual({ transform: 'scale(95%)' });
  });

  it('should handle default and empty value', () => {
    expect(scale()).toEqual({ transform: 'scale(1)' });
    // Empty string should still return scale() for CSS validity
    expect(scale('')).toEqual({ transform: 'scale()' });
  });
});