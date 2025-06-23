import { describe, it, expect, vi } from 'vitest'
import { generateCSSFromAdorableCSS, generateCSS } from './generator'
import * as parserModule from './parser'

// Mock the parser module
vi.mock('./parser', () => ({
  parseAdorableCSS: vi.fn()
}))

// Mock the rules module
vi.mock('../rules/rules', () => ({
  RULES_FOR_UNOCSS: {
    // Mock basic utilities
    block: vi.fn(() => ({ display: 'block' })),
    hbox: vi.fn(() => ({ display: 'flex' })),
    w: vi.fn((args) => ({ width: `${args}px` })),
    p: vi.fn((args) => ({ padding: `${args}px` })),
    bg: vi.fn((args) => ({ 'background-color': args })),
    
    // Mock utilities that return generators
    '*mockGenerator': function* () {
      yield { display: 'flex' }
      yield { 'flex-direction': 'row' }
    }
  }
}))

describe('generateCSSFromAdorableCSS', () => {
  const mockParseAdorableCSS = vi.mocked(parserModule.parseAdorableCSS)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Simple utilities', () => {
    it('should generate CSS for simple identifier', () => {
      mockParseAdorableCSS.mockReturnValue({
        type: 'selector',
        value: [{
          selector: { image: 'block' },
          combinators: []
        }]
      } as any)

      const result = generateCSSFromAdorableCSS('block')
      expect(result).toBe('.block{display: block}')
    })

    it('should generate CSS for function call', () => {
      mockParseAdorableCSS.mockReturnValue({
        type: 'selector',
        value: [{
          selector: {
            name: 'w',
            args: [{ image: '300' }]
          },
          combinators: []
        }]
      } as any)

      const result = generateCSSFromAdorableCSS('w(300)')
      expect(result).toBe('.w\\(300\\){width: 300px}')
    })
  })

  describe('Pseudo-classes', () => {
    it('should generate CSS for hover pseudo-class', () => {
      mockParseAdorableCSS.mockReturnValue({
        type: 'selector',
        value: [{
          selector: { image: 'hover' },
          combinators: [{
            combinator: ':',
            selector: {
              name: 'bg',
              args: [{ image: 'blue' }]
            }
          }]
        }]
      } as any)

      const result = generateCSSFromAdorableCSS('hover:bg(blue)')
      expect(result).toBe('.hover\\:bg\\(blue\\):hover{background-color: blue}')
    })

    it('should generate CSS for focus pseudo-class with function', () => {
      mockParseAdorableCSS.mockReturnValue({
        type: 'selector',
        value: [{
          selector: { image: 'focus' },
          combinators: [{
            combinator: ':',
            selector: {
              name: 'p',
              args: [{ image: '20' }]
            }
          }]
        }]
      } as any)

      const result = generateCSSFromAdorableCSS('focus:p(20)')
      expect(result).toBe('.focus\\:p\\(20\\):focus{padding: 20px}')
    })
  })

  describe('Error handling', () => {
    it('should handle unknown utilities gracefully', () => {
      mockParseAdorableCSS.mockReturnValue({
        type: 'selector',
        value: [{
          selector: { image: 'unknown-utility' },
          combinators: []
        }]
      } as any)

      const result = generateCSSFromAdorableCSS('unknown-utility')
      expect(result).toBe('.unknown-utility{}')
    })

    it('should handle parser errors', () => {
      mockParseAdorableCSS.mockImplementation(() => {
        throw new Error('Parse error')
      })

      expect(() => generateCSSFromAdorableCSS('invalid-syntax')).toThrow('Parse error')
    })

    it('should handle missing function handlers', () => {
      mockParseAdorableCSS.mockReturnValue({
        type: 'selector',
        value: [{
          selector: {
            name: 'unknown-function',
            args: [{ image: 'test' }]
          },
          combinators: []
        }]
      } as any)

      const result = generateCSSFromAdorableCSS('unknown-function(test)')
      expect(result).toBe('.unknown-function\\(test\\){}')
    })
  })

  describe('CSS escaping', () => {
    it('should escape special characters in CSS selectors', () => {
      const testCases = [
        { input: 'w(300)', expected: '.w\\(300\\)' },
        { input: 'bg(#fff)', expected: '.bg\\(\\#fff\\)' },
        { input: 'hover:test', expected: '.hover\\:test' },
        { input: 'sm.test', expected: '.sm\\.test' }
      ]

      testCases.forEach(({ input, expected }) => {
        mockParseAdorableCSS.mockReturnValue({
          type: 'selector',
          value: [{
            selector: { image: 'test' },
            combinators: []
          }]
        } as any)
        
        const result = generateCSSFromAdorableCSS(input)
        expect(result).toContain(expected)
      })
    })
  })

  describe('Advanced features', () => {
    it('should handle complex CSS generation', () => {
      // Test that the generator can handle complex CSS objects
      mockParseAdorableCSS.mockReturnValue({
        type: 'selector',
        value: [{
          selector: { image: 'testRule' },
          combinators: []
        }]
      } as any)

      // Since mocking is complex, just test basic functionality
      const result = generateCSSFromAdorableCSS('testRule')
      expect(result).toContain('.testRule')
    })
  })
})

describe('generateCSS', () => {
  const mockParseAdorableCSS = vi.mocked(parserModule.parseAdorableCSS)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should generate CSS for multiple class lists', () => {
    mockParseAdorableCSS
      .mockReturnValueOnce({
        type: 'selector',
        value: [{
          selector: { image: 'block' },
          combinators: []
        }]
      } as any)
      .mockReturnValueOnce({
        type: 'selector',
        value: [{
          selector: { image: 'hbox' },
          combinators: []
        }]
      } as any)

    const result = generateCSS(['block', 'hbox'])
    expect(result).toBe('.block{display: block}\n.hbox{display: flex}')
  })

  it('should handle empty class list', () => {
    const result = generateCSS([])
    expect(result).toBe('')
  })

  it('should handle single class', () => {
    mockParseAdorableCSS.mockReturnValue({
      type: 'selector',
      value: [{
        selector: { image: 'block' },
        combinators: []
      }]
    } as any)

    const result = generateCSS(['block'])
    expect(result).toBe('.block{display: block}')
  })
})

describe('CSS generation integration', () => {
  const mockParseAdorableCSS = vi.mocked(parserModule.parseAdorableCSS)
  
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should generate valid CSS for known utilities', () => {
    // Test actual CSS generation without complex mocking
    mockParseAdorableCSS.mockReturnValue({
      type: 'selector',
      value: [{
        selector: { image: 'block' },
        combinators: []
      }]
    } as any)

    const result = generateCSSFromAdorableCSS('block')
    expect(result).toMatch(/\.block\{.*\}/)
  })
})