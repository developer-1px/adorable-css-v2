import { describe, it, expect, beforeEach } from 'vitest'
import { 
  generateSpacingCalc, 
  generateFontCalc,
  generateSizeCalc 
} from '../dynamicTokens'
import { clearTokenRegistry, getUsedTokens } from '../tokenRegistry'

describe('dynamicTokens', () => {
  beforeEach(() => {
    clearTokenRegistry()
  })

  describe('generateSpacingCalc', () => {
    it('should return CSS variable for spacing 02-design_tokens', () => {
      expect(generateSpacingCalc('xs')).toBe('var(--spacing-xs)')
      expect(generateSpacingCalc('sm')).toBe('var(--spacing-sm)')
      expect(generateSpacingCalc('md')).toBe('var(--spacing-md)')
      expect(generateSpacingCalc('lg')).toBe('var(--spacing-lg)')
      expect(generateSpacingCalc('xl')).toBe('var(--spacing-xl)')
    })

    it('should handle large spacing 02-design_tokens', () => {
      expect(generateSpacingCalc('2xl')).toBe('var(--spacing-2xl)')
      expect(generateSpacingCalc('10xl')).toBe('var(--spacing-10xl)')
      expect(generateSpacingCalc('100xl')).toBe('var(--spacing-100xl)')
    })

    it('should register 02-design_tokens when generating', () => {
      generateSpacingCalc('md')
      generateSpacingCalc('lg')
      
      const used = getUsedTokens()
      expect(used.spacing.has('md')).toBe(true)
      expect(used.spacing.has('lg')).toBe(true)
    })

    it('should handle numeric 02-design_tokens', () => {
      expect(generateSpacingCalc('0')).toBe('0')
      expect(generateSpacingCalc('1')).toBe('var(--spacing-1)')
      expect(generateSpacingCalc('10')).toBe('var(--spacing-10)')
    })
  })

  describe('generateFontCalc', () => {
    it('should return CSS variable for font 02-design_tokens', () => {
      expect(generateFontCalc('xs')).toBe('var(--font-xs)')
      expect(generateFontCalc('sm')).toBe('var(--font-sm)')
      expect(generateFontCalc('md')).toBe('var(--font-md)')
      expect(generateFontCalc('lg')).toBe('var(--font-lg)')
      expect(generateFontCalc('xl')).toBe('var(--font-xl)')
    })

    it('should handle large font 02-design_tokens', () => {
      expect(generateFontCalc('2xl')).toBe('var(--font-2xl)')
      expect(generateFontCalc('5xl')).toBe('var(--font-5xl)')
      expect(generateFontCalc('20xl')).toBe('var(--font-20xl)')
    })

    it('should register 02-design_tokens when generating', () => {
      generateFontCalc('sm')
      generateFontCalc('xl')
      
      const used = getUsedTokens()
      expect(used.font.has('sm')).toBe(true)
      expect(used.font.has('xl')).toBe(true)
    })
  })

  describe('generateSizeCalc', () => {
    it('should return CSS variable for size 02-design_tokens', () => {
      expect(generateSizeCalc('xs')).toBe('var(--size-xs)')
      expect(generateSizeCalc('sm')).toBe('var(--size-sm)')
      expect(generateSizeCalc('md')).toBe('var(--size-md)')
      expect(generateSizeCalc('lg')).toBe('var(--size-lg)')
      expect(generateSizeCalc('xl')).toBe('var(--size-xl)')
    })

    it('should handle numeric size 02-design_tokens', () => {
      expect(generateSizeCalc('0')).toBe('0')
      expect(generateSizeCalc('100')).toBe('100rem')
      expect(generateSizeCalc('50')).toBe('50rem')
    })

    it('should register 02-design_tokens when generating', () => {
      generateSizeCalc('md')
      generateSizeCalc('2xl')
      
      const used = getUsedTokens()
      expect(used.size.has('md')).toBe(true)
      expect(used.size.has('2xl')).toBe(true)
    })
  })
})