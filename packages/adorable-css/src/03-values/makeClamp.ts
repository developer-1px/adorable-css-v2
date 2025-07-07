/**
 * Clamp 및 Range 처리 로직 통합
 * makeClamp, makeRangeClamp, pxWithClamp, cssvarWithClamp 함수들을 통합하여 코드 라인수 감소
 */

import { px, cssvar } from './value-utils'
import { checkIsToken } from '../01-core/utils/token-checker'

// Clamp 처리 인터페이스
export interface ClampProcessor {
  process(value: string): string
}

// 기본 Clamp 처리기
export class DefaultClampProcessor implements ClampProcessor {
  process(value: string): string {
    // Handle explicit clamp syntax: clamp(min,preferred,max)
    if (value.startsWith('clamp(') && value.endsWith(')')) {
      const clampContent = value.slice(6, -1) // Remove 'clamp(' and ')'
      const parts = clampContent.split(',').map(part => part.trim())
      
      if (parts.length === 3) {
        const [min, preferred, max] = parts.map(part => {
          // Apply appropriate value transformation
          if (part.match(/^\d+(\.\d+)?(px|rem|em|vh|vw|%)$/)) return part
          if (part.match(/^\d+xl$/)) return px(part)
          if (checkIsToken(part, 'spacing') || checkIsToken(part, 'font') || checkIsToken(part, 'size')) return cssvar(part)
          return px(part)
        })
        return `clamp(${min}, ${preferred}, ${max})`
      }
    }
    
    return value
  }
}

// Range 처리기
export class RangeClampProcessor implements ClampProcessor {
  private clampProcessor = new DefaultClampProcessor()
  
  process(value: string): string {
    // Handle triple range syntax: xl..8vh..sm (min..preferred..max)
    const tripleRangeMatch = value.match(/^([^.]+)\.\.([^.]+)\.\.([^.]+)$/)
    if (tripleRangeMatch) {
      const [, min, preferred, max] = tripleRangeMatch
      return this.clampProcessor.process(`clamp(${min},${preferred},${max})`)
    }
    
    // Handle double range syntax: xl..30px (min..max with smart preferred)
    const doubleRangeMatch = value.match(/^([^.]+)\.\.([^.]+)$/)
    if (doubleRangeMatch) {
      const [, min, max] = doubleRangeMatch
      const preferred = this.generateSmartPreferred(min, max)
      return this.clampProcessor.process(`clamp(${min},${preferred},${max})`)
    }
    
    return value
  }
  
  private generateSmartPreferred(min: string, max: string): string {
    // If both are size tokens, use viewport-based interpolation
    if (checkIsToken(min, 'font') && max.match(/^\d+px$/)) {
      return '4vw' // Default viewport-based scaling
    } else if (checkIsToken(min, 'spacing') && max.match(/^\d+px$/)) {
      return '8vw' // Larger viewport scaling for spacing
    } else if (min.match(/^\d+xl$/) && max.match(/^\d+px$/)) {
      return '5vw' // For xl tokens to px
    } else {
      // Fallback: try to interpolate between min and max
      const minPx = parseFloat(String(px(min)).replace('px', '')) || 16
      const maxPx = parseFloat(String(px(max)).replace('px', '')) || 32
      const avgPx = (minPx + maxPx) / 2
      return `${avgPx * 0.25}vw` // Use 25% of average as vw
    }
  }
}

// 팩토리 함수
export function createClampProcessor(type: 'default' | 'range' = 'default'): ClampProcessor {
  return type === 'range' ? new RangeClampProcessor() : new DefaultClampProcessor()
}

// 편의 함수들 (기존 API 호환성)
export const makeClamp = (value: string) => createClampProcessor('default').process(value)
export const makeRangeClamp = (value: string) => createClampProcessor('range').process(value)

// Enhanced px/cssvar with clamp support
export const pxWithClamp = (value: string | number) => {
  if (value === undefined || value === null) throw new Error('pxWithClamp: value is undefined')
  if (value === 0 || value === '0') return 0

  const v = String(value)

  // Check for clamp/range syntax first
  if (v.includes('clamp(') || v.includes('..')) {
    const processor = v.includes('clamp(') ? 'default' : 'range'
    return createClampProcessor(processor).process(v)
  }
  
  // Fall back to regular px processing
  return px(v)
}

export const cssvarWithClamp = (value: string | number) => {
  const strValue = String(value)
  
  // Handle clamp/range syntax
  if (strValue.includes('clamp(') || strValue.includes('..')) {
    const processor = strValue.includes('clamp(') ? 'default' : 'range'
    return createClampProcessor(processor).process(strValue)
  }
  
  // Fall back to regular cssvar processing
  return cssvar(strValue)
}