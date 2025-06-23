import { describe, it, expect } from 'vitest'
import { generateCSSFromAdorableCSS } from './cssGenerator'

describe('AdorableCSS v2 New Features', () => {
  // Test pack shorthand
  describe('Pack shorthand', () => {
    it('should generate center alignment for hbox(pack)', () => {
      const css = generateCSSFromAdorableCSS(['hbox(pack)'])
      expect(css).toContain('display:flex')
      expect(css).toContain('flex-direction:row')
      expect(css).toContain('justify-content:center')
      expect(css).toContain('align-items:center')
    })

    it('should generate center alignment for vbox(pack)', () => {
      const css = generateCSSFromAdorableCSS(['vbox(pack)'])
      expect(css).toContain('display:flex')
      expect(css).toContain('flex-direction:column')
      expect(css).toContain('justify-content:center')
      expect(css).toContain('align-items:center')
    })
  })

  // Test gradient support
  describe('Gradient support', () => {
    it('should generate background gradient with .. syntax', () => {
      const css = generateCSSFromAdorableCSS(['bg(#667eea..#764ba2)'])
      expect(css).toContain('background:linear-gradient(135deg, #667eea, #764ba2)')
    })

    it('should generate text gradient with .. syntax', () => {
      const css = generateCSSFromAdorableCSS(['c(red..blue)'])
      expect(css).toContain('background:linear-gradient(90deg, red, blue)')
      expect(css).toContain('-webkit-background-clip:text')
      expect(css).toContain('background-clip:text')
      expect(css).toContain('-webkit-text-fill-color:transparent')
    })

    it('should generate text gradient with hex colors', () => {
      const css = generateCSSFromAdorableCSS(['c(#fff..#000)'])
      expect(css).toContain('background:linear-gradient(90deg, #fff, #000)')
      expect(css).toContain('-webkit-background-clip:text')
    })

    it('should handle named colors for text gradient', () => {
      const css = generateCSSFromAdorableCSS(['c(white..black)'])
      expect(css).toContain('background:linear-gradient(90deg, white, black)')
    })
  })

  // Test backdrop filter
  describe('Backdrop filter', () => {
    it('should generate backdrop blur effect', () => {
      const css = generateCSSFromAdorableCSS(['backdrop(blur/10)'])
      expect(css).toContain('backdrop-filter:blur(10px)')
    })

    it('should handle backdrop blur with different values', () => {
      const css = generateCSSFromAdorableCSS(['backdrop(blur/5)'])
      expect(css).toContain('backdrop-filter:blur(5px)')
    })

    it('should handle custom backdrop filter values', () => {
      const css = generateCSSFromAdorableCSS(['backdrop(brightness(1.2))'])
      expect(css).toContain('backdrop-filter:brightness(1.2)')
    })
  })

  // Test text shadow
  describe('Text shadow', () => {
    it('should generate text shadow with full syntax', () => {
      const css = generateCSSFromAdorableCSS(['text-shadow(0/2px/4px/rgba(0,0,0,0.1))'])
      expect(css).toContain('text-shadow:0 2px 4px rgba(0,0,0,0.1)')
    })

    it('should use default values when partial syntax provided', () => {
      const css = generateCSSFromAdorableCSS(['text-shadow(2/4)'])
      expect(css).toContain('text-shadow:2px 4px 4px rgba(0,0,0,0.1)')
    })

    it('should handle single value text shadow', () => {
      const css = generateCSSFromAdorableCSS(['text-shadow(1)'])
      expect(css).toContain('text-shadow:1px 2px 4px rgba(0,0,0,0.1)')
    })
  })

  // Test animation
  describe('Animation', () => {
    it('should generate animation with full syntax', () => {
      const css = generateCSSFromAdorableCSS(['animate(float/6s/ease-in-out/infinite)'])
      expect(css).toContain('animation:float 6s ease-in-out infinite')
    })

    it('should use default values when partial syntax provided', () => {
      const css = generateCSSFromAdorableCSS(['animate(fade/2s)'])
      expect(css).toContain('animation:fade 2s ease 1')
    })

    it('should handle animation name only', () => {
      const css = generateCSSFromAdorableCSS(['animate(bounce)'])
      expect(css).toContain('animation:bounce 1s ease 1')
    })
  })

  // Test font family presets
  describe('Font family presets', () => {
    it('should use SF Mono for sf-mono preset', () => {
      const css = generateCSSFromAdorableCSS(['font-family(sf-mono)'])
      expect(css).toContain("font-family:'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace")
    })

    it('should use Inter for inter preset', () => {
      const css = generateCSSFromAdorableCSS(['font-family(inter)'])
      expect(css).toContain("font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif")
    })

    it('should use system fonts for system preset', () => {
      const css = generateCSSFromAdorableCSS(['font-family(system)'])
      expect(css).toContain("font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif")
    })

    it('should handle custom font family', () => {
      const css = generateCSSFromAdorableCSS(['font-family(Helvetica)'])
      expect(css).toContain('font-family:Helvetica')
    })
  })

  // Test directional borders
  describe('Directional borders', () => {
    it('should generate top border only', () => {
      const css = generateCSSFromAdorableCSS(['border(top/1/#333)'])
      expect(css).toContain('border-top:1px solid #333')
    })

    it('should generate right border with custom style', () => {
      const css = generateCSSFromAdorableCSS(['border(right/2/dashed/red)'])
      expect(css).toContain('border-right:2px dashed red')
    })

    it('should generate bottom border with default style', () => {
      const css = generateCSSFromAdorableCSS(['border(bottom/3)'])
      expect(css).toContain('border-bottom:3px solid currentColor')
    })

    it('should generate left border with all options', () => {
      const css = generateCSSFromAdorableCSS(['border(left/1/dotted/#666)'])
      expect(css).toContain('border-left:1px dotted #666')
    })
  })

  // Test improved border syntax
  describe('Enhanced border syntax', () => {
    it('should generate border with width/style/color', () => {
      const css = generateCSSFromAdorableCSS(['border(2/solid/#333)'])
      expect(css).toContain('border:2px solid #333')
    })

    it('should generate border with style and color', () => {
      const css = generateCSSFromAdorableCSS(['border(1/dashed/red)'])
      expect(css).toContain('border:1px dashed red')
    })

    it('should use default solid style', () => {
      const css = generateCSSFromAdorableCSS(['border(1/#666)'])
      expect(css).toContain('border:1px solid #666')
    })
  })

  // Test layout improvements
  describe('Layout improvements', () => {
    it('should handle hbox with justify and align', () => {
      const css = generateCSSFromAdorableCSS(['hbox(between+center)'])
      expect(css).toContain('justify-content:space-between')
      expect(css).toContain('align-items:center')
    })

    it('should handle vbox with justify and align', () => {
      const css = generateCSSFromAdorableCSS(['vbox(around+stretch)'])
      expect(css).toContain('justify-content:space-around')
      expect(css).toContain('align-items:stretch')
    })

    it('should handle end alignment', () => {
      const css = generateCSSFromAdorableCSS(['hbox(end+end)'])
      expect(css).toContain('justify-content:flex-end')
      expect(css).toContain('align-items:flex-end')
    })
  })

  // Test additional utilities
  describe('Additional utilities', () => {
    it('should generate fit utility', () => {
      const css = generateCSSFromAdorableCSS(['fit'])
      expect(css).toContain('width:fit-content')
      expect(css).toContain('height:fit-content')
    })

    it('should generate fill utility', () => {
      const css = generateCSSFromAdorableCSS(['fill'])
      expect(css).toContain('width:100%')
      expect(css).toContain('height:100%')
    })

    it('should generate pointer cursor', () => {
      const css = generateCSSFromAdorableCSS(['pointer'])
      expect(css).toContain('cursor:pointer')
    })

    it('should generate user-select none', () => {
      const css = generateCSSFromAdorableCSS(['select-none'])
      expect(css).toContain('user-select:none')
    })
  })

  // Integration tests
  describe('Integration tests', () => {
    it('should handle multiple new features together', () => {
      const css = generateCSSFromAdorableCSS([
        'vbox(pack)',
        'bg(#667eea..#764ba2)',
        'c(white..#e0e7ff)',
        'text-shadow(0/2px/4px/rgba(0,0,0,0.1))',
        'border(top/1/#333)',
        'backdrop(blur/10)'
      ])
      
      expect(css).toContain('display:flex')
      expect(css).toContain('justify-content:center')
      expect(css).toContain('align-items:center')
      expect(css).toContain('background:linear-gradient(135deg, #667eea, #764ba2)')
      expect(css).toContain('background:linear-gradient(90deg, white, #e0e7ff)')
      expect(css).toContain('-webkit-background-clip:text')
      expect(css).toContain('text-shadow:0 2px 4px rgba(0,0,0,0.1)')
      expect(css).toContain('border-top:1px solid #333')
      expect(css).toContain('backdrop-filter:blur(10px)')
    })

    it('should handle complex real-world example', () => {
      const css = generateCSSFromAdorableCSS([
        'hbox(pack)',
        'p(16/32)',
        'bg(white)',
        'c(#667eea)',
        'r(12)',
        'font(16)',
        'bold',
        'shadow(lg)',
        'gap(8)',
        'pointer'
      ])
      
      expect(css).toMatch(/\.hbox\\\(pack\\\)\{[^}]*display:flex[^}]*justify-content:center[^}]*align-items:center[^}]*\}/)
      expect(css).toContain('padding:16px 32px')
      expect(css).toContain('background:white')
      expect(css).toContain('color:#667eea')
      expect(css).toContain('border-radius:12px')
      expect(css).toContain('cursor:pointer')
    })
  })
})

describe('Backward compatibility', () => {
  it('should still support existing syntax', () => {
    const css = generateCSSFromAdorableCSS([
      'hbox(center+center)',
      'p(20)',
      'bg(#3b82f6)',
      'c(white)',
      'r(8)'
    ])
    
    expect(css).toContain('display:flex')
    expect(css).toContain('justify-content:center')
    expect(css).toContain('align-items:center')
    expect(css).toContain('padding:20px')
    expect(css).toContain('background:#3b82f6')
    expect(css).toContain('color:white')
    expect(css).toContain('border-radius:8px')
  })

  it('should handle mixed old and new syntax', () => {
    const css = generateCSSFromAdorableCSS([
      'vbox(pack)',           // new pack syntax
      'hbox(center+center)',  // old explicit syntax
      'bg(red..blue)',        // new gradient
      'c(#333)',              // old color
      'font-family(sf-mono)', // new font preset
      'font(16)',             // old font syntax
    ])
    
    expect(css).toContain('flex-direction:column')
    expect(css).toContain('flex-direction:row')
    expect(css).toContain('linear-gradient')
    expect(css).toContain('color:#333')
    expect(css).toContain("'SF Mono'")
    expect(css).toContain('font-size:16px')
  })
})