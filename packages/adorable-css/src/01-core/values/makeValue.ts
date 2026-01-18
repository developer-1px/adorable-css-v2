
import { colorPalette } from '../../02-design_tokens/design-system/colors/colors'
import { BASE_COLOR_VALUES, TONE_VALUES } from './color-data'
import { makeColor, makeHEX, makeHLS, makeRGB } from './color-processor'
import {
  cssvar, cssString, splitValues, makeValues, makeCommaValues,
  makeNumber, makeRatio, percentToEm, px, pxGrid, deg, makeSide
} from './value-utils'

// Local implementation of isToken (removed external import)
import { isToken } from '../../02-design_tokens/design-system/tokens/index'

// Re-export all functions for backward compatibility
export {
  makeColor, makeHEX, makeHLS, makeRGB,
  cssvar, cssString, splitValues, makeValues, makeCommaValues,
  makeNumber, makeRatio, percentToEm, px, pxGrid, deg, makeSide
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

  // Handle color-shade format (e.g., purple-500, gray-100) - without regex
  const lastDashIndex = colorName.lastIndexOf('-');
  if (lastDashIndex > 0) {
    const colorFamily = colorName.slice(0, lastDashIndex);
    const shade = colorName.slice(lastDashIndex + 1);

    // Check if shade is all digits
    const isNumericShade = shade.length > 0 && !isNaN(Number(shade)) && shade === parseInt(shade).toString();

    if (isNumericShade) {
      // Get base color hex value
      const baseHex = BASE_COLOR_VALUES[colorFamily];
      if (baseHex && TONE_VALUES[shade]) {
        // For now, return the base color - could implement OKLCH tone generation later
        // This provides proper gradient support immediately
        return baseHex;
      }
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
  return `${widthValue} ${styleValue}${colorValue ? ' ' + colorValue : ''} `
}

export const makeTransition = (value: string) => {
  if (!/\d/.test(value)) return value
  if (!value.includes('=')) return makeValues(value)
  return value
    .split(/[/|]/)
    .map((item) => item.replace('=', ' '))
    .join(',')
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
        // Check if it has CSS unit (px, rem, em, vh, vw, %) - without regex
        const hasUnit = part.endsWith('px') || part.endsWith('rem') || part.endsWith('em') ||
                        part.endsWith('vh') || part.endsWith('vw') || part.endsWith('%');
        if (hasUnit) {
          // Find the first letter or % character
          let unitIndex = -1;
          for (let i = 0; i < part.length; i++) {
            const char = part[i];
            if ((char >= 'a' && char <= 'z') || char === '%') {
              unitIndex = i;
              break;
            }
          }
          if (unitIndex > 0) {
            const numPart = part.slice(0, unitIndex);
            if (!isNaN(parseFloat(numPart))) return part;
          }
        }

        // Check for xl pattern - without regex
        if (part.endsWith('xl') && part.length > 2) {
          const numPart = part.slice(0, -2);
          if (!isNaN(parseInt(numPart)) && numPart === parseInt(numPart).toString()) {
            return px(part);
          }
        }

        if (isToken(part, 'spacing') || isToken(part, 'font') || isToken(part, 'size')) return cssvar(part);
        return px(part);
      });
      return `clamp(${min}, ${preferred}, ${max})`;
    }
  }

  return value;
}

// Helper function to check if value ends with pattern - without regex
function endsWithPx(value: string): boolean {
  return value.endsWith('px');
}

function isXlToken(value: string): boolean {
  if (value.endsWith('xl') && value.length > 2) {
    const numPart = value.slice(0, -2);
    return !isNaN(parseInt(numPart)) && numPart === parseInt(numPart).toString();
  }
  return false;
}

// Range syntax support for clamp generation
export const makeRangeClamp = (value: string) => {
  // Handle triple range syntax: xl..8vh..sm (min..preferred..max) - without regex
  // Count occurrences of '..' without regex
  let dotsCount = 0;
  for (let i = 0; i < value.length - 1; i++) {
    if (value[i] === '.' && value[i + 1] === '.') {
      dotsCount++;
      i++; // Skip next character
    }
  }

  if (dotsCount === 2) {
    // Triple range: split by '..'
    const parts = value.split('..');
    if (parts.length === 3) {
      const [min, preferred, max] = parts;
      return makeClamp(`clamp(${min}, ${preferred}, ${max})`);
    }
  }

  // Handle double range syntax: xl..30px (min..max with smart preferred) - without regex
  if (dotsCount === 1) {
    const parts = value.split('..');
    if (parts.length === 2) {
      const [min, max] = parts;

      // Smart preferred value generation
      let preferred: string;

      // If both are size tokens, use viewport-based interpolation - without regex
      if (isToken(min, 'font') && endsWithPx(max)) {
        preferred = '4vw'; // Default viewport-based scaling
      } else if (isToken(min, 'spacing') && endsWithPx(max)) {
        preferred = '8vw'; // Larger viewport scaling for spacing
      } else if (isXlToken(min) && endsWithPx(max)) {
        preferred = '5vw'; // For xl tokens to px
      } else {
        // Fallback: try to interpolate between min and max
        const minPx = parseFloat(String(px(min)).replace('px', '')) || 16;
        const maxPx = parseFloat(String(px(max)).replace('px', '')) || 32;
        const avgPx = (minPx + maxPx) / 2;
        preferred = `${avgPx * 0.25} vw`; // Use 25% of average as vw
      }

      return makeClamp(`clamp(${min}, ${preferred}, ${max})`);
    }
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

// Enhanced pxGrid function with clamp and range support
export const pxGridWithClamp = (value: string | number) => {
  if (value === undefined || value === null) throw new Error('pxGridWithClamp: value is undefined')
  if (value === 0 || value === '0') return 0

  const v = String(value)

  // Check for clamp syntax first
  if (v.includes('clamp(')) {
    return makeClamp(v);
    // Note: makeClamp currently uses px() internally, might need update for full grid support in clamps later
  }

  // Check for range syntax
  if (v.includes('..')) {
    return makeRangeClamp(v);
  }

  // Fall back to regular pxGrid processing
  return pxGrid(v);
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
