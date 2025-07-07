import {SEMANTIC_COLORS, SINGLE_COLOR_DEFAULTS} from './color-data'
import {cssvar} from './value-utils'
import {registerToken} from '../02-design_tokens/tokenRegistry'

const BASIC_COLORS = {white: '#ffffff', black: '#000000', transparent: 'transparent'}

const hexToRgb = (hex: string): number[] =>
  hex.length === 4
    ? hex.slice(1).split('').map(v => parseInt(v + v, 16))
    : [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16))

const applyAlpha = (color: string, alpha: string): string =>
  `color-mix(in srgb,${color} ${alpha.includes('.') ? parseFloat(alpha) * 100 : parseFloat(alpha)}%,transparent)`

export const makeColor = (value = 'transparent'): string => {
  if (value === '-' || value === 'transparent') return 'transparent'
  if (value.startsWith('--')) return `var(${value})`

  const [colorName, alpha] = value.split('.')
  
  // Handle dash colors and semantic colors without 500 default
  if (colorName.includes('-') || (SEMANTIC_COLORS.includes(colorName) && !SINGLE_COLOR_DEFAULTS[colorName])) {
    registerToken('color', colorName)
    const cssVar = `var(--${colorName})`
    return alpha ? applyAlpha(cssVar, alpha) : cssVar
  }
  
  // Basic colors
  const baseColor = BASIC_COLORS[colorName as keyof typeof BASIC_COLORS]
  if (baseColor) {
    return alpha && baseColor !== 'transparent'
      ? `rgba(${hexToRgb(baseColor).join(',')},${alpha.includes('.') ? alpha : '0.' + alpha})`
      : baseColor
  }
  
  // Single color names → 500 shade
  const defaultName = SINGLE_COLOR_DEFAULTS[colorName]
  if (defaultName) {
    registerToken('color', defaultName)
    const defaultVar = `var(--${defaultName})`
    return alpha ? applyAlpha(defaultVar, alpha) : defaultVar
  }
  
  return `var(--${colorName}, ${colorName})`
}

export const makeHEX = (value: string): string => {
  const [rgb, a] = value.split('.')
  return a && rgb.length === 4
    ? `rgba(${[1, 2, 3].map(i => parseInt(rgb[i] + rgb[i], 16)).join(',')},${a.includes('.') ? a : '0.' + a})`
    : value
}

export const makeHLS = (value: string): string => {
  const parts = value.split(',')
  return `hsl${parts[3] ? 'a' : ''}(${parts.filter(Boolean).map(cssvar).join()})`
}

export const makeRGB = (value: string): string => {
  const parts = value.split(',')
  return `rgb${parts[3] ? 'a' : ''}(${parts.filter(Boolean).map(cssvar).join()})`
}