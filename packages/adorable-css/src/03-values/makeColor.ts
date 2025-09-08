import { COLOR_TOKEN_MAP, isColorToken, isColorShadeFormat } from '../02-design_tokens/color-tokens'
import { registerUsedToken } from '../02-design_tokens/used-tokens'
import { cssvar } from './value-utils'

const hexToRgb = (hex: string): number[] =>
  hex.length === 4
    ? hex.slice(1).split('').map(v => parseInt(v + v, 16))
    : [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16))

const applyAlpha = (color: string, alpha: string): string => {
  // For OKLCH colors, use opacity instead of color-mix for better support
  if (color.startsWith('oklch(')) {
    const alphaValue = alpha.includes('.') ? alpha : '0.' + alpha
    return color.replace(')', ` / ${alphaValue})`)
  }
  
  // For CSS variables (which will resolve to OKLCH), use color-mix
  if (color.startsWith('var(')) {
    const alphaPercent = alpha.includes('.') ? parseFloat(alpha) * 100 : parseFloat(alpha)
    return `color-mix(in oklch, ${color} ${alphaPercent}%, transparent)`
  }
  
  // Fallback for hex/rgb colors
  return `color-mix(in srgb, ${color} ${alpha.includes('.') ? parseFloat(alpha) * 100 : parseFloat(alpha)}%, transparent)`
}

export const makeColor = (value = 'transparent'): string => {
  if (value === '-' || value === 'transparent') return 'transparent'
  if (value.startsWith('--')) return `var(${value})`

  const [colorName, alpha] = value.split('.')
  
  // Handle hex colors
  if (colorName.startsWith('#')) {
    const hexColor = makeHEX(alpha ? `${colorName}.${alpha}` : colorName)
    return hexColor
  }
  
  // Handle OKLCH colors directly
  if (colorName.startsWith('oklch(')) {
    return alpha ? applyAlpha(colorName, alpha) : colorName
  }
  
  // Check if it's a valid color token (including color-shade format)
  if (isColorToken(colorName)) {
    const varName = `--color-${colorName}`
    const varValue = COLOR_TOKEN_MAP[colorName]
    
    // Register the token for lazy loading
    registerUsedToken(varName, varValue)
    
    const cssVar = `var(${varName})`
    return alpha ? applyAlpha(cssVar, alpha) : cssVar
  }
  
  // Handle single color names (e.g., "red" → "red-500")
  const defaultColorShade = `${colorName}-500`
  if (isColorToken(defaultColorShade)) {
    const varName = `--color-${defaultColorShade}`
    const varValue = COLOR_TOKEN_MAP[defaultColorShade]
    
    registerUsedToken(varName, varValue)
    
    const cssVar = `var(${varName})`
    return alpha ? applyAlpha(cssVar, alpha) : cssVar
  }
  
  // Fallback: return as CSS variable with fallback
  return `var(--color-${colorName}, ${colorName})`
}

export const makeHEX = (value: string): string => {
  const [rgb, a] = value.split('.')
  
  // Handle alpha values
  if (a) {
    const alphaValue = a.includes('.') ? a : '0.' + a
    if (rgb.length === 4) {
      // 3-digit hex: #RGB
      return `rgba(${[1, 2, 3].map(i => parseInt(rgb[i] + rgb[i], 16)).join(',')},${alphaValue})`
    } else if (rgb.length === 7) {
      // 6-digit hex: #RRGGBB
      return `rgba(${hexToRgb(rgb).join(',')},${alphaValue})`
    }
  }
  
  // Return hex color as-is if no alpha or invalid format
  return rgb
}

export const makeHLS = (value: string): string => {
  const parts = value.split(',')
  return `hsl${parts[3] ? 'a' : ''}(${parts.filter(Boolean).map(cssvar).join()})`
}

export const makeRGB = (value: string): string => {
  const parts = value.split(',')
  return `rgb${parts[3] ? 'a' : ''}(${parts.filter(Boolean).map(cssvar).join()})`
}