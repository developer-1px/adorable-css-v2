import { colorPalette } from '../../02-design_tokens/design-system/colors/colors'
import { BASE_COLOR_VALUES, TONE_VALUES } from './color-data'
import { makeColor, makeHEX, makeHLS, makeRGB } from './color-processor'
import { 
  cssvar, cssString, splitValues, makeValues, makeCommaValues, 
  makeNumber, makeRatio, percentToEm, px, deg, makeSide 
} from './value-utils'

// Re-export all functions for backward compatibility
export { 
  makeColor, makeHEX, makeHLS, makeRGB,
  cssvar, cssString, splitValues, makeValues, makeCommaValues,
  makeNumber, makeRatio, percentToEm, px, deg, makeSide
}

/**
 * Get the actual color value (hex/oklch) instead of CSS variable
 * This is essential for proper gradient generation where CSS variables don't work
 */
export function getActualColorValue(colorName: string): string {
  // Handle basic colors first
  if (baseColorValues[colorName]) {
    return baseColorValues[colorName]
  }
  
  // Handle color-shade format (e.g., purple-500, gray-100)
  const colorShadeMatch = colorName.match(/^([a-z]+)-(\d+)$/)
  if (colorShadeMatch) {
    const [, colorFamily, shade] = colorShadeMatch
    
    // Get base color hex value
    const baseHex = BASE_COLOR_VALUES[colorFamily]
    if (baseHex && TONE_VALUES[shade]) {
      // For now, return the base color - could implement OKLCH tone generation later
      // This provides proper gradient support immediately
      return baseHex
    }
  }
  
  // Check if it's already in the colorPalette (OKLCH values)
  if (colorPalette[colorName]) {
    return colorPalette[colorName]
  }
  
  // Fallback to CSS variable (existing behavior)
  return `var(--${colorName}, ${colorName})`
}

// Functions now imported from value-utils
// Alias for backward compatibility
export const makeValue = makeValues

// Basic utility functions now imported from value-utils
// Color functions now imported from color-processor

// makeColor function now imported from color-processor

// @TODO:
export const makeBorder = (value: string) => {
  if (!value || value === 'none' || value === '0' || value === '-') return 'none'

  const borderStyles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']

  let widthValue = null
  let styleValue = null
  let colorValue = null

  // 입력값 처리 및 각 값 유형 식별
  splitValues(value, (val) => {
    if (+val > 0) {
      widthValue = px(val)
      return widthValue
    }

    if (borderStyles.includes(String(val))) {
      styleValue = val
      return val
    }

    colorValue = makeColor(String(val))
    return colorValue
  })

  // 기본값 설정
  if (!widthValue) widthValue = '1px'
  if (!styleValue) styleValue = 'solid'

  // 값을 표준 순서로 반환: width style color
  return `${widthValue} ${styleValue}${colorValue ? ' ' + colorValue : ''}`
}

export const makeTransition = (value: string) => {
  if (!/\d/.test(value)) return value
  if (!value.includes('=')) return makeValues(value)
  return value
    .split(/[/|]/)
    .map((item) => item.replace('=', ' '))
    .join(',')
}

export const makePosition1 = (value: string) => {
  const values = value.split(' ').map(px)
  values[1] = values[1] || values[0]
  values[2] = values[2] || values[0]
  values[3] = values[3] || values[1] || values[0]

  return ['top', 'right', 'bottom', 'left']
    .map((prop, index) => {
      const value = values[index]
      if (!value || value === '-') return
      return `${prop}:${px(value)};`
    })
    .filter(Boolean)
    .join('')
}

export const makePosition2X = (x: string) => {
  if (x.startsWith('center')) {
    const offset = x.slice(6) || 0
    return {
      left: '50%',
      transform: `translateX(-50%) translateX(${px(offset)})`,
    }
  }

  const [left, right] = x.split(/\.\.|~/)
  return {
    ...(left ? { left: px(left) } : {}),
    ...(right ? { right: px(right) } : {}),
  }
}

export const makePosition2Y = (y: string) => {
  if (y.startsWith('center')) {
    const offset = y.slice(6) || 0
    return {
      top: '50%',
      transform: `translateY(-50%) translateY(${px(offset)})`,
    }
  }

  const [top, bottom] = y.split(/\.\.|~/)
  return {
    ...(top ? { top: px(top) } : {}),
    ...(bottom ? { bottom: px(bottom) } : {}),
  }
}

export const makePosition2 = (x: string, y: string) => {
  const posX = makePosition2X(x)
  const posY = makePosition2Y(y)

  let transform = {}
  if (posX.transform && posY.transform) {
    transform = { transform: `${posX.transform} ${posY.transform}` }
  }

  return {
    ...makePosition2X(x),
    ...makePosition2Y(y),
    ...transform,
  }
}

// Clamp function support
export const makeClamp = (value: string) => {
  // Handle explicit clamp syntax: clamp(min,preferred,max)
  if (value.startsWith('clamp(') && value.endsWith(')')) {
    const clampContent = value.slice(6, -1); // Remove 'clamp(' and ')'
    const parts = clampContent.split(',').map(part => part.trim());
    
    if (parts.length === 3) {
      const [min, preferred, max] = parts.map(part => {
        // Apply appropriate value transformation
        if (part.match(/^\d+(\.\d+)?(px|rem|em|vh|vw|%)$/)) return part;
        if (part.match(/^\d+xl$/)) return px(part);
        if (isToken(part, 'spacing') || isToken(part, 'font') || isToken(part, 'size')) return cssvar(part);
        return px(part);
      });
      return `clamp(${min}, ${preferred}, ${max})`;
    }
  }
  
  return value;
}

// Range syntax support for clamp generation
export const makeRangeClamp = (value: string) => {
  // Handle triple range syntax: xl..8vh..sm (min..preferred..max)
  const tripleRangeMatch = value.match(/^([^.]+)\.\.([^.]+)\.\.([^.]+)$/);
  if (tripleRangeMatch) {
    const [, min, preferred, max] = tripleRangeMatch;
    return makeClamp(`clamp(${min},${preferred},${max})`);
  }
  
  // Handle double range syntax: xl..30px (min..max with smart preferred)
  const doubleRangeMatch = value.match(/^([^.]+)\.\.([^.]+)$/);
  if (doubleRangeMatch) {
    const [, min, max] = doubleRangeMatch;
    
    // Smart preferred value generation
    let preferred: string;
    
    // If both are size 02-design_tokens, use viewport-based interpolation
    if (isToken(min, 'font') && max.match(/^\d+px$/)) {
      preferred = '4vw'; // Default viewport-based scaling
    } else if (isToken(min, 'spacing') && max.match(/^\d+px$/)) {
      preferred = '8vw'; // Larger viewport scaling for spacing
    } else if (min.match(/^\d+xl$/) && max.match(/^\d+px$/)) {
      preferred = '5vw'; // For xl 02-design_tokens to px
    } else {
      // Fallback: try to interpolate between min and max
      const minPx = parseFloat(String(px(min)).replace('px', '')) || 16;
      const maxPx = parseFloat(String(px(max)).replace('px', '')) || 32;
      const avgPx = (minPx + maxPx) / 2;
      preferred = `${avgPx * 0.25}vw`; // Use 25% of average as vw
    }
    
    return makeClamp(`clamp(${min},${preferred},${max})`);
  }
  
  return value;
}

// Enhanced px function with clamp and range support
export const pxWithClamp = (value: string | number) => {
  if (value === undefined || value === null) throw new Error('pxWithClamp: value is undefined')
  if (value === 0 || value === '0') return 0

  const v = String(value)

  // Check for clamp syntax first
  if (v.includes('clamp(')) {
    return makeClamp(v);
  }
  
  // Check for range syntax
  if (v.includes('..')) {
    return makeRangeClamp(v);
  }
  
  // Fall back to regular px processing
  return px(v);
}

// Enhanced cssvar with clamp support
export const cssvarWithClamp = (value: string | number) => {
  const strValue = String(value);
  
  // Handle clamp syntax
  if (strValue.includes('clamp(')) {
    return makeClamp(strValue);
  }
  
  // Handle range syntax
  if (strValue.includes('..')) {
    return makeRangeClamp(strValue);
  }
  
  // Fall back to regular cssvar processing
  return cssvar(strValue);
}
