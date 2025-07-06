import { describe, it, expect, beforeEach } from 'vitest'
import { 
  registerToken, 
  clearTokenRegistry, 
  generateUsedTokensCSS,
  getUsedTokens 
} from '../tokenRegistry'
import { DEFAULT_SCALE_CONFIG } from '../../config/scaleConfig'

describe('tokenRegistry', () => {
  beforeEach(() => {
    clearTokenRegistry()
  })

  describe('registerToken', () => {
    it('should register spacing tokens', () => {
      registerToken('spacing', 'xl')
      registerToken('spacing', '2xl')
      
      const used = getUsedTokens()
      expect(used.spacing.has('xl')).toBe(true)
      expect(used.spacing.has('2xl')).toBe(true)
    })

    it('should register font tokens', () => {
      registerToken('font', 'sm')
      registerToken('font', 'lg')
      
      const used = getUsedTokens()
      expect(used.font.has('sm')).toBe(true)
      expect(used.font.has('lg')).toBe(true)
    })

    it('should not register duplicate tokens', () => {
      registerToken('spacing', 'xl')
      registerToken('spacing', 'xl')
      
      const used = getUsedTokens()
      expect(Array.from(used.spacing)).toHaveLength(1)
    })
  })

  describe('generateUsedTokensCSS', () => {
    it('should generate CSS for used spacing tokens', () => {
      registerToken('spacing', 'sm')
      registerToken('spacing', 'md')
      registerToken('spacing', 'lg')
      
      const css = generateUsedTokensCSS()
      
      expect(css).toContain('--spacing-sm: calc(var(--spacing) * 2)')
      expect(css).toContain('--spacing-md: calc(var(--spacing) * 3)')
      expect(css).toContain('--spacing-lg: calc(var(--spacing) * 4)')
    })

    it('should generate CSS for used font tokens', () => {
      registerToken('font', 'xs')
      registerToken('font', 'sm')
      registerToken('font', 'md')
      
      const css = generateUsedTokensCSS()
      
      expect(css).toContain('--font-xs: ')
      expect(css).toContain('--font-sm: ')
      expect(css).toContain('--font-md: ')
      expect(css).toContain('px;') // Default unit is px
    })

    it('should handle large token values', () => {
      registerToken('spacing', '12xl')
      registerToken('font', '20xl')
      
      const css = generateUsedTokensCSS()
      
      expect(css).toContain('--spacing-12xl: calc(var(--spacing) * 16)')
      expect(css).toContain('--font-20xl:')
    })

    it('should generate CSS with base variables when no tokens are used', () => {
      const css = generateUsedTokensCSS()
      expect(css).toContain(':root {')
      expect(css).toContain('/* Base Variables */')
      expect(css).toContain('--spacing: 4px;')
    })

    it('should use custom scale config', () => {
      registerToken('spacing', 'lg')
      
      const customConfig = {
        ...DEFAULT_SCALE_CONFIG,
        spacing: {
          mode: 'exponential' as const,
          factor: 2
        }
      }
      
      const css = generateUsedTokensCSS(customConfig)
      expect(css).toContain('--spacing-lg:')
    })

    it('should generate rem units when unit is rem', () => {
      registerToken('font', 'md')
      registerToken('spacing', 'lg')
      registerToken('size', 'xl')
      
      const remConfig = {
        ...DEFAULT_SCALE_CONFIG,
        unit: 'rem' as const
      }
      
      const css = generateUsedTokensCSS(remConfig)
      expect(css).toContain('--spacing: 0.25rem;')
      expect(css).toContain('--font-base: 1rem;')
      expect(css).toContain('--font-md:')
      expect(css).toContain('rem;')
      expect(css).toContain('--size-xl:')
      expect(css).toContain('rem;')
    })
  })
})