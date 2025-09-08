/**
 * Clamp 및 Range 처리 로직
 */

import { px, cssvar } from './value-utils'
import { registerUsedToken } from '../02-design_tokens/used-tokens'
import { TEXT_TOKEN_MAP } from '../02-design_tokens/text-tokens'

const FONT_TOKENS = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'] as const

export interface ClampOptions {
  tokenType?: string
  trackingEnabled?: boolean
  onTokenFound?: (tokenType: string, token: string) => void
}

// Transform value for clamp
function transformClampValue(value: string, options?: ClampOptions): string {
  // Already has unit
  if (/^\d+(\.\d+)?(px|rem|em|vh|vw|%)$/.test(value)) return value
  
  // Font token
  if (FONT_TOKENS.includes(value as any)) {
    if (options?.trackingEnabled) {
      // Register token with new system
      const varName = `--text-${value}`
      const varValue = TEXT_TOKEN_MAP[value as keyof typeof TEXT_TOKEN_MAP]
      if (varValue) {
        registerUsedToken(varName, varValue)
      }
      // Also call the old callback for backward compatibility
      options?.onTokenFound?.(options.tokenType || 'text', value)
    }
    return `var(--text-${value})`
  }
  
  // Try cssvar, fallback to px
  const transformed = cssvar(value)
  return transformed !== value ? transformed : px(value)
}

// Main clamp processing
export function makeClamp(value: string, options?: ClampOptions): string {
  // Explicit clamp syntax
  if (value.startsWith('clamp(') && value.endsWith(')')) {
    const content = value.slice(6, -1)
    const parts = content.split(',').map(p => p.trim())
    
    if (parts.length === 3) {
      const [min, preferred, max] = parts.map(p => transformClampValue(p, options))
      return `clamp(${min}, ${preferred}, ${max})`
    }
  }
  
  // Triple range: min..preferred..max
  const triple = value.match(/^([^.]+)\.\.([^.]+)\.\.([^.]+)$/)
  if (triple) {
    const [, min, preferred, max] = triple
    return makeClamp(`clamp(${min},${preferred},${max})`, options)
  }
  
  // Double range: min..max
  const double = value.match(/^([^.]*)\.\.([^.]*)$/)
  if (double?.[1] || double?.[2]) {
    const [, min = '', max = ''] = double
    const minVal = min || (options?.tokenType === 'text' ? 'sm' : '0')
    const maxVal = max || (options?.tokenType === 'text' ? '6xl' : '100%')
    const preferred = '4vw' // Default
    return makeClamp(`clamp(${minVal},${preferred},${maxVal})`, options)
  }
  
  return value
}

// Alias for backward compatibility
export const makeRangeClamp = makeClamp

// Text-specific clamp with tracking
export function makeTextClamp(value: string, onTokenFound?: (tokenType: string, token: string) => void): string {
  return makeClamp(value, {
    tokenType: 'text',
    trackingEnabled: true,
    onTokenFound
  })
}

// Enhanced px/cssvar with clamp support
export function pxWithClamp(value: string | number): string | number {
  if (value === undefined || value === null) throw new Error('pxWithClamp: value is undefined')
  if (value === 0 || value === '0') return 0

  const v = String(value)
  if (v.includes('clamp(') || v.includes('..')) {
    return makeClamp(v)
  }
  
  return px(v)
}

export function cssvarWithClamp(value: string | number): string {
  const v = String(value)
  if (v.includes('clamp(') || v.includes('..')) {
    return makeClamp(v)
  }
  
  return cssvar(v)
}