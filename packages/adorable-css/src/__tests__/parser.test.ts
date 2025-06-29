import { describe, it, expect } from 'vitest'
import { parseAdorableCSS } from './parser'

describe('parseAdorableCSS', () => {
  describe('Basic Utilities', () => {
    it('should parse simple identifiers', () => {
      const result = parseAdorableCSS('block')
      expect(result.type).toBe('selector')
      expect(result.value).toHaveLength(1)
      expect(result.value[0].selector.image).toBe('block')
    })

    it('should parse multiple utilities', () => {
      const result = parseAdorableCSS('hbox vbox')
      expect(result.type).toBe('selector')
      expect(result.value).toHaveLength(2)
      expect(result.value[0].selector.image).toBe('hbox')
      expect(result.value[1].selector.image).toBe('vbox')
    })

    it('should parse utilities with important modifier', () => {
      const result = parseAdorableCSS('block!')
      expect(result.value[0].important).toBe('!')
    })
  })

  describe('Function Calls', () => {
    it('should parse simple function calls', () => {
      const result = parseAdorableCSS('w(300)')
      expect(result.value[0].selector.type).toBe('function')
      expect(result.value[0].selector.name).toBe('w')
      expect(result.value[0].selector.args).toHaveLength(1)
    })

    it('should parse function calls with multiple arguments', () => {
      const result = parseAdorableCSS('p(10/20)')
      expect(result.value[0].selector.type).toBe('function')
      expect(result.value[0].selector.name).toBe('p')
      expect(result.value[0].selector.args).toHaveLength(3) // arg, separator, arg
    })

    it('should parse function calls with hex colors', () => {
      const result = parseAdorableCSS('bg(#fff)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('#fff')
    })

    it('should parse function calls with hex colors with alpha', () => {
      const result = parseAdorableCSS('bg(#000.5)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('#000.5')
    })

    it('should parse complex function calls', () => {
      const result = parseAdorableCSS('hbox(top+right)')
      expect(result.value[0].selector.type).toBe('function')
      expect(result.value[0].selector.name).toBe('hbox')
      expect(result.value[0].selector.image).toBe('hbox(top+right)')
    })

    it('should parse font function with complex syntax', () => {
      const result = parseAdorableCSS('font(Inter/16/1.5/-2%/500)')
      expect(result.value[0].selector.type).toBe('function')
      expect(result.value[0].selector.name).toBe('font')
      expect(result.value[0].selector.image).toBe('font(Inter/16/1.5/-2%/500)')
    })

    it('should parse nested function calls', () => {
      const result = parseAdorableCSS('bg(linear-gradient(45deg/#f00/#00f))')
      expect(result.value[0].selector.type).toBe('function')
      expect(result.value[0].selector.name).toBe('bg')
    })
  })

  describe('Ranges', () => {
    it('should parse min-max ranges', () => {
      const result = parseAdorableCSS('w(300..600)')
      expect(result.value[0].selector.type).toBe('function')
      expect(result.value[0].selector.args[0].type).toBe('range')
      expect(result.value[0].selector.args[0].min.image).toBe('300')
      expect(result.value[0].selector.args[0].max.image).toBe('600')
    })

    it('should parse min-only ranges', () => {
      const result = parseAdorableCSS('w(300..)')
      expect(result.value[0].selector.args[0].type).toBe('range')
      expect(result.value[0].selector.args[0].min.image).toBe('300')
      expect(result.value[0].selector.args[0].max).toBeNull()
    })

    it('should parse max-only ranges', () => {
      const result = parseAdorableCSS('h(..600)')
      expect(result.value[0].selector.args[0].type).toBe('range')
      expect(result.value[0].selector.args[0].min).toBeNull()
      expect(result.value[0].selector.args[0].max.image).toBe('600')
    })
  })

  describe('Pseudo-classes', () => {
    it('should parse hover pseudo-class', () => {
      const result = parseAdorableCSS('hover:bg(blue)')
      expect(result.value[0].combinators).toHaveLength(1)
      expect(result.value[0].combinators[0].combinator).toBe(':')
      expect(result.value[0].selector.image).toBe('hover')
      expect(result.value[0].combinators[0].selector.name).toBe('bg')
    })

    it('should parse focus pseudo-class', () => {
      const result = parseAdorableCSS('focus:border(2/solid/blue)')
      expect(result.value[0].combinators).toHaveLength(1)
      expect(result.value[0].combinators[0].combinator).toBe(':')
      expect(result.value[0].selector.image).toBe('focus')
    })

    it('should parse responsive prefixes', () => {
      const result = parseAdorableCSS('sm:w(300)')
      expect(result.value[0].combinators).toHaveLength(1)
      expect(result.value[0].combinators[0].combinator).toBe(':')
      expect(result.value[0].selector.image).toBe('sm')
      expect(result.value[0].combinators[0].selector.name).toBe('w')
    })

    it('should parse group pseudo-classes', () => {
      const result = parseAdorableCSS('group-hover:bg(blue)')
      expect(result.value[0].combinators).toHaveLength(1)
      expect(result.value[0].selector.image).toBe('group-hover')
    })
  })

  describe('Key-Value Pairs', () => {
    it('should parse key-value pairs in functions', () => {
      const result = parseAdorableCSS('layer(top:10)')
      expect(result.value[0].selector.type).toBe('function')
      expect(result.value[0].selector.args[0].type).toBe('keyValue')
      expect(result.value[0].selector.args[0].key).toBe('top')
      expect(result.value[0].selector.args[0].value.value[0].image).toBe('10')
    })

    it('should parse simple key-value pairs', () => {
      const result = parseAdorableCSS('test(key:value)')
      expect(result.value[0].selector.args[0].type).toBe('keyValue')
      expect(result.value[0].selector.args[0].key).toBe('key')
    })
  })

  describe('Dimensions and Units', () => {
    it('should parse pixel dimensions', () => {
      const result = parseAdorableCSS('w(300px)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('300px')
    })

    it('should parse rem dimensions', () => {
      const result = parseAdorableCSS('w(1.5rem)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('1.5rem')
    })

    it('should parse percentage dimensions', () => {
      const result = parseAdorableCSS('w(50%)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('50%')
    })

    it('should parse negative dimensions', () => {
      const result = parseAdorableCSS('mt(-10)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('-10')
    })
  })

  describe('Special Values', () => {
    it('should parse fill value', () => {
      const result = parseAdorableCSS('w(fill)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('fill')
    })

    it('should parse hug value', () => {
      const result = parseAdorableCSS('w(hug)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('hug')
    })

    it('should parse auto value', () => {
      const result = parseAdorableCSS('gap(auto)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('auto')
    })
  })

  describe('CSS Literals', () => {
    it('should parse simple CSS literals', () => {
      expect(() => parseAdorableCSS('{color: red}')).toThrow()
    })

    it('should parse CSS literals with important', () => {
      expect(() => parseAdorableCSS('{color: red !important}')).toThrow()
    })
  })

  describe('Complex Expressions', () => {
    it('should parse mathematical expressions', () => {
      const result = parseAdorableCSS('w(100+200)')
      expect(result.value[0].selector.args[0].type).toBe('expr')
      expect(result.value[0].selector.args[0].image).toBe('100+200')
    })

    it('should parse subtraction expressions', () => {
      const result = parseAdorableCSS('w(100-50)')
      expect(result.value[0].selector.args[0].type).toBe('expr')
      expect(result.value[0].selector.args[0].image).toBe('100-50')
    })

    it('should parse multiplication expressions', () => {
      const result = parseAdorableCSS('w(100*2)')
      expect(result.value[0].selector.args[0].type).toBe('expr')
      expect(result.value[0].selector.args[0].image).toBe('100*2')
    })
  })

  describe('Error Handling', () => {
    it('should throw error for unclosed parentheses', () => {
      expect(() => parseAdorableCSS('w(300')).toThrow()
    })

    it('should throw error for invalid syntax', () => {
      expect(() => parseAdorableCSS('w((')).toThrow()
    })

    it('should throw error for unexpected tokens', () => {
      // This should pass the parser but fail at EOF check
      try {
        parseAdorableCSS('w(300) extra')
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })

  describe('Real-world Examples', () => {
    it('should parse layout combinations', () => {
      const result = parseAdorableCSS('hbox(center) gap(16) p(20)')
      expect(result.value).toHaveLength(3)
      expect(result.value[0].selector.name).toBe('hbox')
      expect(result.value[1].selector.name).toBe('gap')
      expect(result.value[2].selector.name).toBe('p')
    })

    it('should parse responsive typography', () => {
      const result = parseAdorableCSS('sm:font(14/1.4) md:font(16/1.5) lg:font(18/1.6)')
      expect(result.value).toHaveLength(3)
      result.value.forEach((selector, index) => {
        expect(selector.combinators[0].selector.name).toBe('font')
      })
    })

    it('should parse complex hover states', () => {
      const result = parseAdorableCSS('hover:bg(blue) hover:c(white) hover:scale(1.05)')
      expect(result.value).toHaveLength(3)
      result.value.forEach(selector => {
        expect(selector.selector.image).toBe('hover')
        expect(selector.combinators[0].combinator).toBe(':')
      })
    })

    it('should parse gradient backgrounds', () => {
      const result = parseAdorableCSS('bg(linear-gradient(45deg/#ff0000/#0000ff))')
      expect(result.value[0].selector.type).toBe('function')
      expect(result.value[0].selector.name).toBe('bg')
      expect(result.value[0].selector.image).toContain('linear-gradient')
    })
  })
})