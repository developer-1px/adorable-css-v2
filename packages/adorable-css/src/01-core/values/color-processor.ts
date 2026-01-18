/**
 * 색상 처리 로직 통합
 * makeColor, makeHEX, makeHLS, makeRGB 함수들을 전략 패턴으로 통합
 */

import { BASE_COLOR_VALUES, SEMANTIC_COLORS, SINGLE_COLOR_DEFAULTS } from './color-data'
import { cssvar } from './value-utils'

export interface ColorProcessor {
  process(value: string): string
}

// 기본 색상 처리기
export class DefaultColorProcessor implements ColorProcessor {
  process(value = 'transparent'): string {
    if (value === '-' || value === 'transparent') return 'transparent'
    if (value.startsWith('--')) return `var(${value})`

    const [colorName, alpha] = value.split('.')
    
    // 시맨틱 색상 with shade (primary/100, neutral/500)
    if (colorName.includes('/')) {
      return this.processSemanticWithShade(colorName, alpha)
    }
    
    // 전체 시맨틱 색상명
    if (SEMANTIC_COLORS.includes(colorName) && !SINGLE_COLOR_DEFAULTS[colorName]) {
      return this.processSemanticColor(colorName, alpha)
    }
    
    // 기본 색상들
    const basicColor = this.processBasicColor(colorName, alpha)
    if (basicColor) return basicColor
    
    // 단일 색상명 → 500 shade
    if (SINGLE_COLOR_DEFAULTS[colorName]) {
      return this.processSingleColor(colorName, alpha)
    }
    
    // Fallback to CSS variable
    return `var(--${colorName}, ${colorName})`
  }

  private processSemanticWithShade(colorName: string, alpha?: string): string {
    const [semantic, shade] = colorName.split('/')
    if (semantic === 'primary' || semantic === 'neutral') {
      const cssVar = `var(--${semantic}-${shade || '600'})`
      return alpha ? this.applyAlpha(cssVar, alpha) : cssVar
    }
    return `var(--${colorName})`
  }

  private processSemanticColor(colorName: string, alpha?: string): string {
    const cssVar = `var(--${colorName})`
    return alpha ? this.applyAlpha(cssVar, alpha) : cssVar
  }

  private processBasicColor(colorName: string, alpha?: string): string | null {
    const basicColors: Record<string, string> = {
      white: '#ffffff',
      black: '#000000',
      transparent: 'transparent'
    }
    
    const baseColor = basicColors[colorName]
    if (!baseColor) return null
    
    if (alpha && baseColor !== 'transparent') {
      const rgb = this.hexToRgb(baseColor)
      return `rgba(${rgb.join(',')},${alpha.includes('.') ? alpha : '0.' + alpha})`
    }
    return baseColor
  }

  private processSingleColor(colorName: string, alpha?: string): string {
    const defaultColorName = SINGLE_COLOR_DEFAULTS[colorName]
    const cssVar = `var(--${defaultColorName})`
    
    if (alpha) {
      const alphaPercent = alpha.includes('.') ? parseFloat(alpha) * 100 : parseFloat(alpha)
      return `color-mix(in srgb, ${cssVar} ${alphaPercent}%, transparent)`
    }
    return cssVar
  }

  private applyAlpha(color: string, alpha: string): string {
    return `color-mix(in srgb, ${color} ${alpha.includes('.') ? alpha : '0.' + alpha}, transparent)`
  }

  private hexToRgb(hex: string): number[] {
    return hex.length === 4
      ? hex.slice(1).split('').map(v => parseInt(v + v, 16))
      : [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map(v => parseInt(v, 16))
  }
}

// 편의 함수 (기존 API 호환성)
export const makeColor = (value?: string) => new DefaultColorProcessor().process(value || 'transparent')