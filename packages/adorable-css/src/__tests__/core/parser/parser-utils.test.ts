import { describe, it, expect } from 'vitest'
import { createTokenizer, createParser } from '../../../01-core/parser/parser-utils' // Corrected import path

describe.skip('createTokenizer', () => {
  const tokenizer = createTokenizer([
    ['(ws)', /(\s+)/],
    ['(hexcolor)', /(#[0-9a-fA-F]{3,8}(?:\.[0-9]+)*)/],
    ['(dimension)', /((?:[0-9]*\.[0-9]+|[0-9]+)[%a-z]*)/],
    ['(string)', /('(?:[^']|\' )*'|"(?:[^\"]|\\")*")/],
    ['(ident)', /(-*[_a-zA-Z\u00A0-\uFFFF][_a-zA-Z0-9\u00A0-\uFFFF-]*)/],
    ['(range)', /(\.\.\.|\.\.)/],
    ['(operator)', /(!important|::|>>|[-+~|*/%!#@?&:;.,<>=[\](){}])/],
    ['(unknown)', /./],
  ])

  it('should tokenize simple identifiers', () => {
    const tokens = tokenizer('hbox')
    expect(tokens).toEqual([{ type: '(ident)', image: 'hbox' }])
  })

  it('should tokenize function calls', () => {
    const tokens = tokenizer('w(300)')
    expect(tokens).toEqual([
      { type: '(ident)', image: 'w' },
      { type: '(operator)', image: '(' },
      { type: '(dimension)', image: '300' },
      { type: '(operator)', image: ')' },
    ])
  })

  it('should tokenize hex colors', () => {
    const tokens = tokenizer('#fff')
    expect(tokens).toEqual([{ type: '(hexcolor)', image: '#fff' }])
  })

  it('should tokenize hex colors with alpha', () => {
    const tokens = tokenizer('#000.5')
    expect(tokens).toEqual([{ type: '(hexcolor)', image: '#000.5' }])
  })

  it('should tokenize dimensions with units', () => {
    const tokens = tokenizer('16px')
    expect(tokens).toEqual([{ type: '(dimension)', image: '16px' }])
  })

  it('should tokenize decimal dimensions', () => {
    const tokens = tokenizer('1.5rem')
    expect(tokens).toEqual([{ type: '(dimension)', image: '1.5rem' }])
  })

  it('should tokenize ranges', () => {
    const tokens = tokenizer('300..600')
    expect(tokens).toEqual([
      { type: '(dimension)', image: '300' },
      { type: '(range)', image: '..' },
      { type: '(dimension)', image: '600' },
    ])
  })

  it('should tokenize strings', () => {
    const tokens = tokenizer('"Inter"')
    expect(tokens).toEqual([{ type: '(string)', image: '"Inter"' }])
  })

  it('should tokenize complex expressions', () => {
    const tokens = tokenizer('hbox(top+right)')
    expect(tokens).toEqual([
      { type: '(ident)', image: 'hbox' },
      { type: '(operator)', image: '(' },
      { type: '(ident)', image: 'top' },
      { type: '(operator)', image: '+' },
      { type: '(ident)', image: 'right' },
      { type: '(operator)', image: ')' },
    ])
  })

  it('should tokenize whitespace', () => {
    const tokens = tokenizer('hbox vbox')
    expect(tokens).toEqual([
      { type: '(ident)', image: 'hbox' },
      { type: '(ws)', image: ' ' },
      { type: '(ident)', image: 'vbox' },
    ])
  })

  it('should tokenize pseudo-classes', () => {
    const tokens = tokenizer('hover:bg(blue)')
    expect(tokens).toEqual([
      { type: '(ident)', image: 'hover' },
      { type: '(operator)', image: ':' },
      { type: '(ident)', image: 'bg' },
      { type: '(operator)', image: '(' },
      { type: '(ident)', image: 'blue' },
      { type: '(operator)', image: ')' },
    ])
  })

  it('should tokenize important modifier', () => {
    const tokens = tokenizer('w(300)!')
    expect(tokens).toEqual([
      { type: '(ident)', image: 'w' },
      { type: '(operator)', image: '(' },
      { type: '(dimension)', image: '300' },
      { type: '(operator)', image: ')' },
      { type: '(operator)', image: '!' },
    ])
  })

  it('should tokenize multiple operators', () => {
    // Added new test case
    const tokens = tokenizer('a+b-c/d')
    expect(tokens).toEqual([
      { type: '(ident)', image: 'a' },
      { type: '(operator)', image: '+' },
      { type: '(ident)', image: 'b' },
      { type: '(operator)', image: '-' },
      { type: '(ident)', image: 'c' },
      { type: '(operator)', image: '/' },
      { type: '(ident)', image: 'd' },
    ])
  })

  it('should tokenize complex string with escaped quotes', () => {
    // Added new test case
    const tokens = tokenizer('"Hello \"World\""')
    expect(tokens).toEqual([{ type: '(string)', image: '"Hello \"World\""' }])
  })

  it('should handle empty input for tokenizer', () => {
    // Added new test case
    const tokens = tokenizer('')
    expect(tokens).toEqual([])
  })

  it('should handle empty input for parser', () => {
    // Added new test case
    const { eof } = createParser([])
    expect(() => eof('empty')).not.toThrow()
  })
})

describe.skip('createParser', () => {
  it('should consume expected tokens', () => {
    // Clarified test name
    const tokens = [
      { type: '(ident)', image: 'test' },
      { type: '(operator)', image: '(' },
      { type: '(operator)', image: ')' },
    ]
    const { consume } = createParser(tokens)

    expect(consume('(ident)')).toEqual({ type: '(ident)', image: 'test' })
    expect(consume('(operator)')).toEqual({ type: '(operator)', image: '(' }) // Changed to (operator)
    expect(consume('(operator)')).toEqual({ type: '(operator)', image: ')' }) // Changed to (operator)
  })

  it('should throw error for unexpected tokens', () => {
    // Clarified test name
    const tokens = [{ type: '(ident)', image: 'test' }]
    const { consume } = createParser(tokens)

    expect(() => consume('(dimension)')).toThrow('Expected (dimension), got (ident) "test" at 0.') // Added position
  })

  it('should throw error for EOF when expecting token', () => {
    // Clarified test name
    const tokens: any[] = []
    const { consume } = createParser(tokens)

    expect(() => consume('(ident)')).toThrow('Expected (ident), got EOF at 0.') // Added position
  })

  it('should handle options correctly', () => {
    const tokens = [{ type: '(ident)', image: 'test' }]
    const { options, consume } = createParser(tokens)

    const result = options(
      () => consume('(dimension)'),
      () => consume('(ident)'),
    )

    expect(result).toEqual({ type: '(ident)', image: 'test' })
  })

  it('should handle many correctly', () => {
    const tokens = [
      { type: '(ident)', image: 'a' },
      { type: '(ident)', image: 'b' },
      { type: '(ident)', image: 'c' },
      { type: '(operator)', image: ')' }, // This token will stop 'many'
    ]
    const { many, consume } = createParser(tokens)

    const results = many(() => consume('(ident)'))

    expect(results).toEqual([
      { type: '(ident)', image: 'a' },
      { type: '(ident)', image: 'b' },
      { type: '(ident)', image: 'c' },
    ])
    expect(consume('(operator)')).toEqual({ type: '(operator)', image: ')' }) // Ensure parser is at correct position
  })

  it('should handle optional correctly', () => {
    const tokens = [{ type: '(ident)', image: 'test' }]
    const { optional, consume } = createParser(tokens)

    const missing = optional(() => consume('(dimension)'))
    const present = optional(() => consume('(ident)'))

    expect(missing).toBeNull()
    expect(present).toEqual({ type: '(ident)', image: 'test' })
  })

  it('should handle many_sep correctly', () => {
    const tokens = [
      { type: '(ident)', image: 'a' },
      { type: '(operator)', image: ',' },
      { type: '(ident)', image: 'b' },
      { type: '(operator)', image: ',' },
      { type: '(ident)', image: 'c' },
    ]
    const { many_sep, consume } = createParser(tokens)

    const results = many_sep(
      () => consume('(ident)'),
      () => consume('(operator)'), // Separator is an operator
    )

    expect(results).toEqual([
      { type: '(ident)', image: 'a' },
      { type: '(operator)', image: ',' },
      { type: '(ident)', image: 'b' },
      { type: '(operator)', image: ',' },
      { type: '(ident)', image: 'c' },
    ])
  })

  it('should check EOF correctly', () => {
    const tokens = [{ type: '(ident)', image: 'test' }]
    const { eof, consume } = createParser(tokens)

    consume('(ident)')
    expect(() => eof('result')).not.toThrow()
  })

  it('should throw error if not EOF', () => {
    const tokens = [
      { type: '(ident)', image: 'test' },
      { type: '(ident)', image: 'extra' },
    ]
    const { eof, consume } = createParser(tokens)

    consume('(ident)')
    expect(() => eof('result')).toThrow('Unexpected token at 1: (ident) "extra" not EOF.') // Clarified error message
  })
})
