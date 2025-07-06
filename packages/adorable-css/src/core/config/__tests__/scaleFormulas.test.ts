import { describe, it, expect } from 'vitest'
import {
  calculateSpacingMultiplier,
  calculateFontMultiplier,
  formatMultiplier
} from '../scaleFormulas'

describe('scaleFormulas', () => {
  describe('calculateSpacingMultiplier', () => {
    it('should calculate linear spacing correctly', () => {
      const config = { mode: 'linear' as const }
      
      expect(calculateSpacingMultiplier(1, config)).toBe(1)
      expect(calculateSpacingMultiplier(5, config)).toBe(5)
      expect(calculateSpacingMultiplier(10, config)).toBe(10)
    })

    it('should calculate exponential spacing correctly', () => {
      const config = { mode: 'exponential' as const, factor: 2 }
      
      expect(calculateSpacingMultiplier(1, config)).toBe(1)
      expect(calculateSpacingMultiplier(2, config)).toBe(2)
      expect(calculateSpacingMultiplier(3, config)).toBe(4)
      expect(calculateSpacingMultiplier(4, config)).toBe(8)
    })

    it('should calculate ratio spacing correctly', () => {
      const config = { mode: 'ratio' as const, ratio: 1.5 }
      
      expect(calculateSpacingMultiplier(1, config)).toBe(1)
      expect(calculateSpacingMultiplier(2, config)).toBe(1.5)
      expect(calculateSpacingMultiplier(3, config)).toBe(2.25)
    })

    it('should use custom spacing values when provided', () => {
      const config = { 
        mode: 'custom' as const, 
        values: { '1': 0.5, '2': 1, '3': 2 } 
      }
      
      expect(calculateSpacingMultiplier(1, config)).toBe(0.5)
      expect(calculateSpacingMultiplier(2, config)).toBe(1)
      expect(calculateSpacingMultiplier(3, config)).toBe(2)
      expect(calculateSpacingMultiplier(4, config)).toBe(4) // Falls back to linear
    })
  })

  describe('calculateFontMultiplier', () => {
    it('should calculate font multipliers with ratio', () => {
      const config = { ratio: 1.25 }
      
      expect(calculateFontMultiplier(-2, config)).toBeCloseTo(0.64, 2)
      expect(calculateFontMultiplier(-1, config)).toBeCloseTo(0.8, 2)
      expect(calculateFontMultiplier(0, config)).toBe(1)
      expect(calculateFontMultiplier(1, config)).toBe(1.25)
      expect(calculateFontMultiplier(2, config)).toBeCloseTo(1.5625, 4)
    })

    it('should use custom font values when provided', () => {
      const config = { 
        ratio: 1.25,
        custom: { '-1': 0.875, '0': 1, '1': 1.125 } 
      }
      
      expect(calculateFontMultiplier(-1, config)).toBe(0.875)
      expect(calculateFontMultiplier(0, config)).toBe(1)
      expect(calculateFontMultiplier(1, config)).toBe(1.125)
      expect(calculateFontMultiplier(2, config)).toBeCloseTo(1.5625, 4) // Falls back to ratio
    })
  })

  describe('formatMultiplier', () => {
    it('should format integer multipliers cleanly', () => {
      expect(formatMultiplier(1)).toBe('1')
      expect(formatMultiplier(10)).toBe('10')
      expect(formatMultiplier(128)).toBe('128')
    })

    it('should format decimal multipliers with up to 4 decimal places', () => {
      expect(formatMultiplier(1.5)).toBe('1.5')
      expect(formatMultiplier(1.25)).toBe('1.25')
      expect(formatMultiplier(1.5625)).toBe('1.5625')
    })

    it('should remove trailing zeros from decimals', () => {
      expect(formatMultiplier(1.5000)).toBe('1.5')
      expect(formatMultiplier(2.2500)).toBe('2.25')
    })

    it('should limit to 4 decimal places', () => {
      expect(formatMultiplier(1.123456789)).toBe('1.1235')
    })
  })
})