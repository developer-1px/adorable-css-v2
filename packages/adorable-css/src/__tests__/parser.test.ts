import { describe, it, expect } from 'vitest'
import { parseAdorableCSS } from '../01-core/parser/parser'

describe('parseAdorableCSS', () => {
  describe('Basic Utilities', () => {
    it('should parse simple identifiers', () => {
      const result = parseAdorableCSS('block')
      expect(result.type).toBe('selector')
      expect(result.value).toHaveLength(1)
      expect(result.value[0].selector.image).toBe('block')
      expect(result.value[0].selector.type).toBe('(ident)')
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
      expect(result.value[0].selector.image).toBe('block')
    })
  })

  describe('Function Calls', () => {
    it('should parse simple function calls', () => {
      const result = parseAdorableCSS('w(300)')
      expect(result.value[0].selector.type).toBe('function')
      expect(result.value[0].selector.name).toBe('w')
      expect(result.value[0].selector.args).toHaveLength(1)
      expect(result.value[0].selector.args[0].value[0].image).toBe('300') // Check arg value
    })

    it('should parse function calls with multiple arguments (slash separated)', () => { // Clarified test name
      const result = parseAdorableCSS('p(10/20)')
      expect(result.value[0].selector.type).toBe('function')
      expect(result.value[0].selector.name).toBe('p')
      expect(result.value[0].selector.args).toHaveLength(3) // arg, separator, arg
      expect(result.value[0].selector.args[0].value[0].image).toBe('10')
      expect(result.value[0].selector.args[1].image).toBe('/') // Check separator
      expect(result.value[0].selector.args[2].value[0].image).toBe('20')
    })

    it('should parse function calls with hex colors', () => {
      const result = parseAdorableCSS('bg(#fff)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('#fff')
      expect(result.value[0].selector.args[0].value[0].type).toBe('(hexcolor)') // Added type check
    })

    it('should parse function calls with hex colors with alpha', () => {
      const result = parseAdorableCSS('bg(#000.5)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('#000.5')
      expect(result.value[0].selector.args[0].value[0].type).toBe('(hexcolor)') // Added type check
    })

    it('should parse complex function calls with operators', () => { // Clarified test name
      const result = parseAdorableCSS('hbox(top+right)')
      expect(result.value[0].selector.type).toBe('function')
      expect(result.value[0].selector.name).toBe('hbox')
      expect(result.value[0].selector.args[0].type).toBe('expr') // Expect an expression
      expect(result.value[0].selector.args[0].image).toBe('top+right') // Check expression image
    })

    it('should parse text function with complex syntax', () => {
      const result = parseAdorableCSS('text(Inter/16/1.5/-2%/500)')
      expect(result.value[0].selector.type).toBe('function')
      expect(result.value[0].selector.name).toBe('text')
      expect(result.value[0].selector.image).toBe('text(Inter/16/1.5/-2%/500)')
      expect(result.value[0].selector.args).toHaveLength(9); // 5 args + 4 separators
    })

    it('should parse nested function calls', () => {
      const result = parseAdorableCSS('bg(linear-gradient(45deg/#f00/#00f))')
      expect(result.value[0].selector.type).toBe('function')
      expect(result.value[0].selector.name).toBe('bg')
      expect(result.value[0].selector.args[0].type).toBe('function') // Nested function
      expect(result.value[0].selector.args[0].name).toBe('linear-gradient')
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

    it('should parse triple ranges (min..preferred..max)', () => { // Added new test case
      const result = parseAdorableCSS('text(16..20..24)');
      expect(result.value[0].selector.args[0].type).toBe('range');
      expect(result.value[0].selector.args[0].min.image).toBe('16');
      expect(result.value[0].selector.args[0].preferred.image).toBe('20');
      expect(result.value[0].selector.args[0].max.image).toBe('24');
    })
  })

  describe('Pseudo-classes and Combinators', () => { // Clarified describe block name
    it('should parse hover pseudo-class', () => {
      const result = parseAdorableCSS('hover:bg(blue)')
      expect(result.value[0].combinators).toHaveLength(1)
      expect(result.value[0].combinators[0].combinator).toBe(':')
      expect(result.value[0].selector.image).toBe('hover')
      expect(result.value[0].selector.type).toBe('(ident)')
      expect(result.value[0].combinators[0].selector.image).toBe('bg')
    })

    it('should parse focus pseudo-class', () => {
      const result = parseAdorableCSS('focus:border(2/solid/blue)')
      expect(result.value[0].combinators).toHaveLength(1)
      expect(result.value[0].combinators[0].combinator).toBe(':')
      expect(result.value[0].selector.image).toBe('focus')
      expect(result.value[0].selector.type).toBe('(ident)') // Added type check
    })

    it('should parse responsive prefixes', () => {
      const result = parseAdorableCSS('sm:w(300)')
      expect(result.value[0].combinators).toHaveLength(1)
      expect(result.value[0].combinators[0].combinator).toBe(':')
      expect(result.value[0].selector.image).toBe('sm')
      expect(result.value[0].selector.type).toBe('(ident)')
      expect(result.value[0].combinators[0].selector.image).toBe('w')
    })

    it('should parse group pseudo-classes', () => {
      const result = parseAdorableCSS('group-hover:bg(blue)')
      expect(result.value[0].combinators).toHaveLength(1)
      expect(result.value[0].selector.image).toBe('group-hover')
      expect(result.value[0].selector.type).toBe('(ident)') // Added type check
    })

    it('should parse multiple pseudo-classes/prefixes', () => { // Added new test case
      const result = parseAdorableCSS('md:hover:c(red)');
      expect(result.value[0].combinators).toHaveLength(2);
      expect(result.value[0].selector.image).toBe('md');
      expect(result.value[0].combinators[0].selector.image).toBe('hover');
      expect(result.value[0].combinators[1].selector.image).toBe('c');
    });
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
      expect(result.value[0].selector.args[0].value.value[0].image).toBe('value') // Check value
    })
  })

  describe('Dimensions and Units', () => {
    it('should parse pixel dimensions', () => {
      const result = parseAdorableCSS('w(300px)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('300px')
      expect(result.value[0].selector.args[0].value[0].type).toBe('(dimension)') // Added type check
    })

    it('should parse rem dimensions', () => {
      const result = parseAdorableCSS('w(1.5rem)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('1.5rem')
      expect(result.value[0].selector.args[0].value[0].type).toBe('(dimension)') // Added type check
    })

    it('should parse percentage dimensions', () => {
      const result = parseAdorableCSS('w(50%)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('50%')
      expect(result.value[0].selector.args[0].value[0].type).toBe('(dimension)') // Added type check
    })

    it('should parse negative dimensions', () => {
      const result = parseAdorableCSS('mt(-10)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('-10')
      expect(result.value[0].selector.args[0].value[0].type).toBe('(dimension)') // Added type check
    })
  })

  describe('Special Values', () => {
    it('should parse fill value', () => {
      const result = parseAdorableCSS('w(fill)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('fill')
      expect(result.value[0].selector.args[0].value[0].type).toBe('(ident)') // Added type check
    })

    it('should parse hug value', () => {
      const result = parseAdorableCSS('w(hug)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('hug')
      expect(result.value[0].selector.args[0].value[0].type).toBe('(ident)') // Added type check
    })

    it('should parse auto value', () => {
      const result = parseAdorableCSS('gap(auto)')
      expect(result.value[0].selector.args[0].value[0].image).toBe('auto')
      expect(result.value[0].selector.args[0].value[0].type).toBe('(ident)') // Added type check
    })
  })

  describe('CSS Literals (Not directly supported in current parser)', () => { // Clarified describe block name
    it('should throw error for simple CSS literals', () => {
      expect(() => parseAdorableCSS('{color: red}')).toThrow();
    })

    it('should throw error for CSS literals with important', () => {
      expect(() => parseAdorableCSS('{color: red !important}')).toThrow();
    })
  })

  describe('Complex Expressions', () => {
    it('should parse mathematical expressions with addition', () => { // Clarified test name
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

    it('should parse division expressions', () => { // Added new test case
      const result = parseAdorableCSS('w(100/2)');
      expect(result.value[0].selector.args[0].type).toBe('expr');
      expect(result.value[0].selector.args[0].image).toBe('100/2');
    })
  })

  describe('Error Handling', () => {
    it('should throw error for unclosed parentheses', () => {
      expect(() => parseAdorableCSS('w(300')).toThrow('Expected ) at 5.'); // Added position
    })

    it('should throw error for invalid syntax (e.g., double parentheses)', () => { // Clarified test name
      expect(() => parseAdorableCSS('w((')).toThrow('Expected (dimension), got (operator) "(" at 2.'); // Added position
    })

    it('should throw error for unexpected tokens at EOF', () => { // Clarified test name
      expect(() => parseAdorableCSS('w(300) extra')).toThrow('Unexpected token at 1: (ident) "extra" not EOF.'); // Clarified error message
    });

    it('should throw error for empty input', () => { // Added new test case
      expect(() => parseAdorableCSS('')).toThrow('Expected (ident), got EOF at 0.');
    });
  })

  describe('Real-world Examples', () => {
    it('should parse layout combinations', () => {
      const result = parseAdorableCSS('hbox(pack) gap(16) p(20)')
      expect(result.value).toHaveLength(3)
      expect(result.value[0].selector.name).toBe('hbox')
      expect(result.value[1].selector.name).toBe('gap')
      expect(result.value[2].selector.name).toBe('p')
    })

    it('should parse responsive typography', () => {
      const result = parseAdorableCSS('sm:text(14/1.4) md:text(16/1.5) lg:text(18/1.6)')
      expect(result.value).toHaveLength(3)
      result.value.forEach(selector => {
        expect(selector.combinators[0].selector.name).toBe('font')
        expect(selector.selector.type).toBe('responsive-prefix') // Added type check
      })
    })

    it('should parse complex hover states', () => {
      const result = parseAdorableCSS('hover:bg(blue) hover:c(white) hover:scale(1.05)')
      expect(result.value).toHaveLength(3)
      result.value.forEach(selector => {
        expect(selector.selector.name).toBe('hover') // Changed image to name
        expect(selector.selector.type).toBe('pseudo-class') // Added type check
        expect(selector.combinators[0].combinator).toBe(':')
      })
    })

    it('should parse gradient backgrounds', () => {
      const result = parseAdorableCSS('bg(linear-gradient(45deg/#f00/#00f))')
      expect(result.value[0].selector.type).toBe('function')
      expect(result.value[0].selector.name).toBe('bg')
      expect(result.value[0].selector.args[0].type).toBe('function') // Nested function
      expect(result.value[0].selector.args[0].name).toBe('linear-gradient')
    })

    it('should parse color with dot notation alpha', () => { // Added new test case
      const result = parseAdorableCSS('c(blue-500.5)');
      expect(result.value[0].selector.name).toBe('c');
      expect(result.value[0].selector.args[0].type).toBe('(color-opacity)');
      expect(result.value[0].selector.args[0].image).toBe('blue-500.5');
    });

    it('should parse size with dimension pair', () => { // Added new test case
      const result = parseAdorableCSS('size(320x200)');
      expect(result.value[0].selector.name).toBe('size');
      expect(result.value[0].selector.args[0].type).toBe('(dimension-pair)');
      expect(result.value[0].selector.args[0].image).toBe('320x200');
    });
  })
})
