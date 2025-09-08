import { describe, test, expect } from 'vitest'
import { makeColor } from '../../03-values/makeValue'
import { generateClass } from '../../07-generator/generator'

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
    const result = generateClass('bg(white.5)')
    expect(result).toContain('background-color:rgba(255,255,255,0.5)')
  })

  test('bg() should handle token with alpha', () => {
    const result = generateClass('bg(purple-500.5)')
    expect(result).toContain('color-mix')
  })
})

describe('Single Color Name as 500 Shade', () => {
  test('should treat single color names as 500 shade', () => {
    expect(makeColor('blue')).toBe('var(--blue-500)')
    expect(makeColor('green')).toBe('var(--green-500)')
    expect(makeColor('red')).toBe('var(--red-500)')
    expect(makeColor('yellow')).toBe('var(--yellow-500)')
    expect(makeColor('purple')).toBe('var(--purple-500)')
  })

  test('should treat semantic color names as 500 shade', () => {
    expect(makeColor('primary')).toBe('var(--primary-500)')
    expect(makeColor('secondary')).toBe('var(--secondary-500)')
    expect(makeColor('success')).toBe('var(--success-500)')
    expect(makeColor('warning')).toBe('var(--warning-500)')
    expect(makeColor('error')).toBe('var(--error-500)')
    expect(makeColor('info')).toBe('var(--info-500)')
  })

  test('should support single color names with alpha', () => {
    expect(makeColor('blue.5')).toContain('color-mix')
    expect(makeColor('blue.5')).toContain('var(--blue-500)')
    expect(makeColor('primary.3')).toContain('var(--primary-500)')
  })

  test('bg() should work with single color names', () => {
    const result1 = generateClass('bg(blue)')
    expect(result1).toContain('background-color:var(--blue-500)')
    
    const result2 = generateClass('bg(primary)')
    expect(result2).toContain('background-color:var(--primary-500)')
  })
})