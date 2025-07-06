import { describe, it, expect } from 'vitest'
import { generateCSS } from '../index'

describe('Basic utilities', () => {
  describe('Width utilities', () => {
    it('should generate width with px value', () => {
      const css = generateCSS(['w(80px)'])
      // console.log('Generated CSS for w(80px):', css) // Removed console.log
      expect(css).toContain('.w\\(80px\\){width:80px}') // Added full selector check
    })

    it('should generate width with number value and append px', () => { // Clarified test name
      const css = generateCSS(['w(80)'])
      // console.log('Generated CSS for w(80):', css) // Removed console.log
      expect(css).toContain('.w\\(80\\){width:80px}') // Added full selector check
    })

    it('should generate width with percentage', () => {
      const css = generateCSS(['w(50%)'])
      // console.log('Generated CSS for w(50%):', css) // Removed console.log
      expect(css).toContain('.w\\(50%\\){width:50%}') // Added full selector check
    })

    it('should generate width with fill keyword', () => { // Added new test case
      const css = generateCSS(['w(fill)'])
      expect(css).toContain('.w\\(fill\\){width:100%;flex:1}')
    })

    it('should generate width with hug keyword', () => { // Added new test case
      const css = generateCSS(['w(hug)'])
      expect(css).toContain('.w\\(hug\\){width:fit-content}')
    })
  })

  describe('Height utilities', () => {
    it('should generate height with px value', () => {
      const css = generateCSS(['h(80px)'])
      // console.log('Generated CSS for h(80px):', css) // Removed console.log
      expect(css).toContain('.h\\(80px\\){height:80px}') // Added full selector check
    })

    it('should generate height with number value and append px', () => { // Clarified test name
      const css = generateCSS(['h(80)'])
      // console.log('Generated CSS for h(80):', css) // Removed console.log
      expect(css).toContain('.h\\(80\\){height:80px}') // Added full selector check
    })

    it('should generate height with fill keyword', () => { // Added new test case
      const css = generateCSS(['h(fill)'])
      expect(css).toContain('.h\\(fill\\){height:100%;flex:1}')
    })

    it('should generate height with hug keyword', () => { // Added new test case
      const css = generateCSS(['h(hug)'])
      expect(css).toContain('.h\\(hug\\){height:fit-content}')
    })
  })

  describe('Gap utilities', () => {
    it('should generate gap with px value', () => {
      const css = generateCSS(['gap(16px)'])
      // console.log('Generated CSS for gap(16px):', css) // Removed console.log
      expect(css).toContain('.gap\\(16px\\){gap:16px}') // Added full selector check
    })

    it('should generate gap with number value and append px', () => { // Clarified test name
      const css = generateCSS(['gap(16)'])
      // console.log('Generated CSS for gap(16):', css) // Removed console.log
      expect(css).toContain('.gap\\(16\\){gap:16px}') // Added full selector check
    })

    it('should generate gap(auto) for space-between', () => {
      const css = generateCSS(['gap(auto)'])
      // console.log('Generated CSS for gap(auto):', css) // Removed console.log
      expect(css).toContain('.gap\\(auto\\){gap:auto;justify-content:space-between;align-content:space-content}') // Added full selector check and align-content
    })

    it('should generate gap with token value', () => { // Added new test case
      const css = generateCSS(['gap(lg)'])
      expect(css).toContain('.gap\\(lg\\){gap:var(--spacing-lg)}')
    })
  })

  describe('Color utilities', () => {
    it('should generate color with hex value', () => {
      const css = generateCSS(['c(#333)'])
      // console.log('Generated CSS for c(#333):', css) // Removed console.log
      expect(css).toContain('.c\\(\\#333\\){color:\#333}') // Added full selector check
    })

    it('should generate background color with named value', () => { // Clarified test name
      const css = generateCSS(['bg(white)'])
      // console.log('Generated CSS for bg(white):', css) // Removed console.log
      expect(css).toContain('.bg\\(white\\){background-color:white}') // Added full selector check
    })

    it('should generate color with token value', () => { // Added new test case
      const css = generateCSS(['c(primary)'])
      expect(css).toContain('.c\\(primary\\){color:var(--primary)}')
    })

    it('should generate background color with hex value', () => { // Added new test case
      const css = generateCSS(['bg(#f0f0f0)'])
      expect(css).toContain('.bg\\(\\#f0f0f0\\){background-color:\#f0f0f0}')
    })
  })

  describe('Basic layout', () => {
    it('should generate hbox with default alignment', () => { // Clarified test name
      const css = generateCSS(['hbox'])
      // console.log('Generated CSS for hbox:', css) // Removed console.log
      expect(css).toContain('.hbox{display:flex;flex-direction:row;align-items:center}') // Added full selector check and default align-items
    })

    it('should generate vbox with default alignment', () => { // Clarified test name
      const css = generateCSS(['vbox'])
      // console.log('Generated CSS for vbox:', css) // Removed console.log
      expect(css).toContain('.vbox{display:flex;flex-direction:column;align-items:stretch}') // Added full selector check and default align-items
    })

    it('should generate hbox with pack alignment', () => { // Added new test case
      const css = generateCSS(['hbox(pack)'])
      expect(css).toContain('.hbox\\(pack\\){display:flex;flex-direction:row;justify-content:center;align-items:center}')
    })

    it('should generate vbox with pack alignment', () => { // Added new test case
      const css = generateCSS(['vbox(pack)'])
      expect(css).toContain('.vbox\\(pack\\){display:flex;flex-direction:column;justify-content:center;align-items:center}')
    })
  })

  it('should return empty string for invalid arguments', () => { // Added new test case
    const css = generateCSS(['invalid-class']);
    expect(css).toBe('');
  });

  it('should return empty string for array with invalid arguments', () => { // Added new test case
    const css = generateCSS(['hbox', 'invalid-class']);
    expect(css).toContain('.hbox{display:flex;flex-direction:row;align-items:center}'); // Valid class should still be generated
    expect(css).not.toContain('invalid-class'); // Invalid class should not be in output
  });
})