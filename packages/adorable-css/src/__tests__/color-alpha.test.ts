import { describe, test, expect } from 'vitest'
import { makeColor } from '../core/values/makeValue'
import { bg } from '../rules/style/background'

describe('Color Alpha Support', () => {
  test('should support basic color with alpha', () => {
    const result = makeColor('white.5')
    expect(result).toBe('rgba(255,255,255,0.5)')
  })

  test('should support color token with alpha', () => {
    const result = makeColor('gray-500.3')
    // Should use color-mix for CSS variables
    expect(result).toContain('color-mix')
  })

  test('should support purple-500.5 format', () => {
    const result = makeColor('purple-500.5')
    expect(result).toContain('color-mix')
    expect(result).toContain('var(--purple-500)')
  })

  test('bg() should handle color with alpha', () => {
    const result = bg('white.5')
    expect(result).toEqual({
      'background-color': 'rgba(255,255,255,0.5)'
    })
  })

  test('bg() should handle token with alpha', () => {
    const result = bg('purple-500.5')
    expect(result['background-color']).toContain('color-mix')
  })
})