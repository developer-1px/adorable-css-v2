import { describe, it, expect } from 'vitest';
import { elevation, calculateElevation } from '../../03-rules/effects/elevation';

describe('elevation', () => {
  it('should return none shadow for elevation(0)', () => {
    expect(elevation('0')).toEqual({ 'box-shadow': 'none' });
  });

  it('should generate subtle shadows for low levels', () => {
    const result1 = elevation('1');
    expect(result1['box-shadow']).toContain('rgba(0, 0, 0, 0.055)'); // key shadow
    expect(result1['box-shadow']).toContain('rgba(0, 0, 0, 0.116)'); // ambient shadow
    
    const result2 = elevation('2');
    expect(result2['box-shadow']).toContain('rgba(0, 0, 0, 0.06)');
    expect(result2['box-shadow']).toContain('rgba(0, 0, 0, 0.112)');
  });

  it('should increase shadows progressively', () => {
    const calc4 = calculateElevation(4);
    const calc8 = calculateElevation(8);
    const calc16 = calculateElevation(16);
    
    // Y offsets should increase
    expect(calc8.keyY).toBeGreaterThan(calc4.keyY);
    expect(calc16.keyY).toBeGreaterThan(calc8.keyY);
    
    // Blur should increase
    expect(calc8.keyBlur).toBeGreaterThan(calc4.keyBlur);
    expect(calc16.ambientBlur).toBeGreaterThan(calc8.ambientBlur);
    
    // Key opacity should increase slightly
    expect(calc8.keyOpacity).toBeGreaterThan(calc4.keyOpacity);
    
    // Ambient opacity should decrease
    expect(calc8.ambientOpacity).toBeLessThan(calc4.ambientOpacity);
  });

  it('should cap at level 24', () => {
    const result24 = elevation('24');
    const result50 = elevation('50');
    
    expect(result24).toEqual(result50);
  });

  it('should handle invalid inputs', () => {
    expect(elevation()).toEqual({ 'box-shadow': 'none' });
    expect(elevation('invalid')).toEqual({ 'box-shadow': 'none' });
    expect(elevation('-5')).toEqual({ 'box-shadow': 'none' });
  });

  it('should generate reasonable values for common levels', () => {
    // Test some common elevation levels
    const common = [1, 2, 4, 6, 8, 12, 16, 24];
    
    common.forEach(level => {
      const calc = calculateElevation(level);
      
      // Key shadow should be subtle
      expect(calc.keyOpacity).toBeLessThanOrEqual(0.15);
      expect(calc.keyOpacity).toBeGreaterThan(0);
      
      // Ambient shadow should also be subtle
      expect(calc.ambientOpacity).toBeLessThanOrEqual(0.12);
      expect(calc.ambientOpacity).toBeGreaterThan(0);
      
      // Offsets should be reasonable
      expect(calc.keyY).toBeLessThanOrEqual(level);
      expect(calc.ambientY).toBe(level);
    });
  });
});