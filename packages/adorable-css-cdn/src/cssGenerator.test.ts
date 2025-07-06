import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { generateCSS, generateCSSFromAdorableCSS, checkFailedClasses, analyzeClasses } from './index'

describe('CDN Package Integration', () => {
  describe('generateCSS function', () => {
    it('should export and work correctly', () => {
      const css = generateCSS(['hbox(pack)', 'p(20)', 'bg(blue)'])
      expect(css).toContain('display:flex')
      expect(css).toContain('justify-content:center')
      expect(css).toContain('align-items:center')
      expect(css).toContain('padding:20px')
      expect(css).toContain('background-color:blue')
    })
  })

  describe('generateCSSFromAdorableCSS function (legacy)', () => {
    it('should provide backward compatibility', () => {
      const css = generateCSSFromAdorableCSS(['c(red)', 'font(16)'])
      expect(css).toContain('color:red')
      expect(css).toContain('font-size:16px')
    })
  })

  describe('Package dependencies', () => {
    it('should properly delegate to 01-core package', () => {
      // Test that both functions produce identical output
      const classes = ['vbox(pack)', 'bg(#667eea..#764ba2)', 'r(8)']
      const css1 = generateCSS(classes)
      const css2 = generateCSSFromAdorableCSS(classes)
      
      expect(css1).toBe(css2)
      expect(css1).toContain('flex-direction:column')
      expect(css1).toContain('linear-gradient')
      expect(css1).toContain('border-radius:8px')
    })
  })

  describe('Failed class detection', () => {
    beforeEach(() => {
      vi.spyOn(console, 'warn').mockImplementation(() => {})
      vi.spyOn(console, 'log').mockImplementation(() => {})
    })

    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('should detect failed classes', () => {
      const failedClasses = checkFailedClasses(['invalid-class', 'hbox(pack)', 'another-invalid'])
      expect(failedClasses).toContain('invalid-class')
      expect(failedClasses).toContain('another-invalid')
      expect(failedClasses).not.toContain('hbox(pack)')
    })

    it('should analyze class generation results', () => {
      const result = analyzeClasses(['hbox(pack)', 'invalid-class', 'p(20)', 'unknown-utility'])
      
      expect(result.total).toBe(4)
      expect(result.successful).toContain('hbox(pack)')
      expect(result.successful).toContain('p(20)')
      expect(result.failed).toContain('invalid-class')
      expect(result.failed).toContain('unknown-utility')
      expect(result.successRate).toBe('50%')
    })

    it('should handle empty class list', () => {
      const result = analyzeClasses([])
      expect(result.total).toBe(0)
      expect(result.successful).toEqual([])
      expect(result.failed).toEqual([])
      expect(result.successRate).toBe('100%') // Empty list is 100% successful
    })
  })
})