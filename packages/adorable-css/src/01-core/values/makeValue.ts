import { colorPalette } from '../../02-design_tokens/design-system/colors/colors'
import { BASE_COLOR_VALUES, TONE_VALUES } from './color-data'
import { makeColor, makeHEX, makeHLS, makeRGB } from './makeColor'
import { 
  cssvar, cssString, splitValues, makeValues, makeCommaValues, 
  makeNumber, makeRatio, percentToEm, px, deg, makeSide 
} from './value-utils'
import { makeBorder } from './makeBorder'
import { makeTransition } from './makeTransition'
import { makePosition1, makePosition2, makePosition2X, makePosition2Y } from './makePosition'
import { makeClamp, makeRangeClamp, pxWithClamp, cssvarWithClamp } from './makeClamp'

// Re-export all functions for backward compatibility
export { 
  makeColor, makeHEX, makeHLS, makeRGB,
  cssvar, cssString, splitValues, makeValues, makeCommaValues,
  makeNumber, makeRatio, percentToEm, px, deg, makeSide,
  makeBorder, makeTransition,
  makePosition1, makePosition2, makePosition2X, makePosition2Y,
  makeClamp, makeRangeClamp, pxWithClamp, cssvarWithClamp
}

/**
 * Get the actual color value (hex/oklch) instead of CSS variable
 * This is essential for proper gradient generation where CSS variables don't work
 */
export function getActualColorValue(colorName: string): string {
  // Handle basic colors first
  if (BASE_COLOR_VALUES[colorName]) {
    return BASE_COLOR_VALUES[colorName]
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

// All value transformation functions are now imported from specialized modules
// This module now serves as the main export point for backward compatibility
