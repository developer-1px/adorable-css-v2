import { describe, it, expect } from 'vitest'
import { generateCSS } from '../index'

describe('Basic utilities', () => {
  describe('Width utilities', () => {
    it('should generate width with px value', () => {
      const css = generateCSS(['w(80px)'])
      console.log('Generated CSS for w(80px):', css)
      expect(css).toContain('width:80px')
    })

    it('should generate width with number value', () => {
      const css = generateCSS(['w(80)'])
      console.log('Generated CSS for w(80):', css)
      expect(css).toContain('width:80px')
    })

    it('should generate width with percentage', () => {
      const css = generateCSS(['w(50%)'])
      console.log('Generated CSS for w(50%):', css)
      expect(css).toContain('width:50%')
    })
  })

  describe('Height utilities', () => {
    it('should generate height with px value', () => {
      const css = generateCSS(['h(80px)'])
      console.log('Generated CSS for h(80px):', css)
      expect(css).toContain('height:80px')
    })

    it('should generate height with number value', () => {
      const css = generateCSS(['h(80)'])
      console.log('Generated CSS for h(80):', css)
      expect(css).toContain('height:80px')
    })
  })

  describe('Gap utilities', () => {
    it('should generate gap with px value', () => {
      const css = generateCSS(['gap(16px)'])
      console.log('Generated CSS for gap(16px):', css)
      expect(css).toContain('gap:16px')
    })

    it('should generate gap with number value', () => {
      const css = generateCSS(['gap(16)'])
      console.log('Generated CSS for gap(16):', css)
      expect(css).toContain('gap:16px')
    })

    it('should generate gap(auto) for space-between', () => {
      const css = generateCSS(['gap(auto)'])
      console.log('Generated CSS for gap(auto):', css)
      expect(css).toContain('justify-content:space-between')
    })
  })

  describe('Color utilities', () => {
    it('should generate color with hex value', () => {
      const css = generateCSS(['c(#333)'])
      console.log('Generated CSS for c(#333):', css)
      expect(css).toContain('color:#333')
    })

    it('should generate background color', () => {
      const css = generateCSS(['bg(white)'])
      console.log('Generated CSS for bg(white):', css)
      expect(css).toContain('background')
    })
  })

  describe('Basic layout', () => {
    it('should generate hbox', () => {
      const css = generateCSS(['hbox'])
      console.log('Generated CSS for hbox:', css)
      expect(css).toContain('display:flex')
      expect(css).toContain('flex-direction:row')
    })

    it('should generate vbox', () => {
      const css = generateCSS(['vbox'])
      console.log('Generated CSS for vbox:', css)
      expect(css).toContain('display:flex')
      expect(css).toContain('flex-direction:column')
    })
  })
})