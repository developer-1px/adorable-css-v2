import { colorPalette } from '../../02-design_tokens/design-system/colors/colors'
import { isToken } from '../../02-design_tokens/design-system/tokens/index'
import { generateSpacingCalc, generateFontCalc, generateSizeCalc } from '../../02-design_tokens/dynamicTokens'

// Base colors with actual hex values for gradient generation
const baseColorValues: Record<string, string> = {
  // Tailwind-inspired colors with actual hex values
  red: '#ef4444',
  orange: '#f97316',
  amber: '#f59e0b',
  yellow: '#eab308',
  lime: '#84cc16',
  green: '#22c55e',
  emerald: '#10b981',
  teal: '#14b8a6',
  cyan: '#06b6d4',
  sky: '#0ea5e9',
  blue: '#3b82f6',
  indigo: '#6366f1',
  violet: '#8b5cf6',
  purple: '#a855f7',
  fuchsia: '#d946ef',
  pink: '#ec4899',
  rose: '#f43f5e',
  slate: '#64748b',
  gray: '#6b7280',
  zinc: '#71717a',
  neutral: '#737373',
  stone: '#78716c',
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent'
}

// OKLCH tone values for generating color variations
const toneValues: Record<string, { l: number, cFactor: number }> = {
  50: { l: 0.97, cFactor: 0.15 },
  100: { l: 0.93, cFactor: 0.35 },
  200: { l: 0.87, cFactor: 0.55 },
  300: { l: 0.78, cFactor: 0.75 },
  400: { l: 0.68, cFactor: 0.90 },
  500: { l: 0.58, cFactor: 1 }, // Base level
  600: { l: 0.45, cFactor: 0.95 },
  700: { l: 0.38, cFactor: 0.85 },
  800: { l: 0.30, cFactor: 0.75 },
  900: { l: 0.22, cFactor: 0.65 }
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
    const baseHex = baseColorValues[colorFamily]
    if (baseHex && toneValues[shade]) {
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

export const splitValues = (value: string, project = cssvar) => {
  if (value.includes('|')) return value.split('|').map(project)
  return value.split('/').map(project)
}
export const makeValues = (value: string, project = cssvar) => splitValues(value, project).join(' ')

// Alias for backward compatibility
export const makeValue = makeValues

export const makeCommaValues = (value: string, project = cssvar) => value.split(',').map(project).join(',')

export const makeSide = (value: string) => makeValues(value, px)

export const makeRatio = (value: string) => {
  const [w, h] = value.split(/[:/]/)
  return ((+h / +w) * 100).toFixed(2) + '%'
}

export const makeNumber = (num: number) => num.toFixed(2).replace(/^0+|\.00$|0+$/g, '') || '0'

export const cssvar = (value: string | number) => {
  const strValue = String(value);
  
  // CSS 변수 처리
  if (strValue.startsWith('--')) return `var(${value})`;
  
  // 토큰 처리 - 동적으로 calc() 생성
  // spacing 02-design_tokens - generate calc instead of CSS variable
  if (isToken(strValue, 'spacing')) {
    return generateSpacingCalc(strValue);
  }
  
  // font 02-design_tokens - generate calc instead of CSS variable
  if (isToken(strValue, 'font')) {
    return generateFontCalc(strValue);
  }
  
  // size 02-design_tokens - generate calc instead of CSS variable
  if (isToken(strValue, 'size')) {
    return generateSizeCalc(strValue);
  }
  
  // color 02-design_tokens - still use CSS variables
  if (isToken(strValue, 'colors')) {
    return `var(--colors-${strValue})`;
  }
  
  return value;
}

export const cssString = (value: string | number) => (String(value).startsWith('--') ? `var(${value})` : `"${value}"`)

// <length> default: px
export const px = (value: string | number) => {
  if (value === undefined || value === null) throw new Error('px: value is undefined')
  if (value === 0 || value === '0') return 0

  const v = String(value)

  // --css-var
  if (v.startsWith('--')) return cssvar('' + value)
  
  // Handle spacing 02-design_tokens - use dynamic calc
  if (isToken(v, 'spacing')) {
    return generateSpacingCalc(v)
  }
  
  // Handle size 02-design_tokens - use dynamic calc
  if (isToken(v, 'size')) {
    return generateSizeCalc(v)
  }

  // Handle XL 02-design_tokens - check if it's a valid token pattern
  const xlMatch = v.match(/^(\d+)xl$/);
  if (xlMatch) {
    // Always generate calc for xl 02-design_tokens
    return generateSpacingCalc(v);
  }

  // 1/6
  const [n, m] = v.split('/')
  if (+n > 0 && +m > 0) return makeNumber((+n / +m) * 100) + '%'

  // calc
  if (/.[-+*/]/.test(v) && /\d/.test(v)) {
    return 'calc(' + v.replace(/[-+]/g, (a) => ` ${a} `) + ')'
  }

  // number
  if (+value === +value) return value + 'px'
  
  // If it's not a valid value pattern, reject it
  if (!v.match(/^[\w\-.%]+$/)) return '0'
  
  return value
}

export const deg = (value: string | number) => {
  if (value === undefined || value === null) throw new Error('deg: value is undefined')
  if (value === 0 || value === '0') return 0

  const v = String(value)

  // --css-var
  if (v.startsWith('--')) return cssvar('' + value)

  // calc
  if (/.[-+*/]/.test(v) && /\d/.test(v)) {
    return 'calc(' + v.replace(/[-+]/g, (a) => ` ${a} `) + ')'
  }

  // number
  return +value === +value ? value + 'deg' : value
}

export const percentToEm = (value: string) => {
  if (value.endsWith('%')) return +value.slice(0, -1) / 100 + 'em'
  return px(value)
}

export const makeHEX = (value: string) => {
  const [rgb, a] = value.split('.')
  if (a && rgb.length === 4)
    return (
      'rgba(' +
      rgb
        .slice(1)
        .split('')
        .map((value) => parseInt(value + value, 16))
        .join(',') +
      ',0.' +
      a +
      ')'
    )
  if (a)
    return (
      'rgba(' +
      [rgb.slice(1, 3), rgb.slice(3, 5), rgb.slice(5, 7)].map((value) => parseInt(value, 16)).join(',') +
      ',0.' +
      a +
      ')'
    )
  return value
}

export const makeHLS = (value: string) => {
  const [h, s, l, a] = value.split(',')
  return 'hsl' + (a ? 'a' : '') + '(' + [h, s, l, a].filter(Boolean).map(cssvar).join() + ')'
}

export const makeRGB = (value: string) => {
  const [r, g, b, a] = value.split(',')
  return 'rgb' + (a ? 'a' : '') + '(' + [r, g, b, a].filter(Boolean).map(cssvar).join() + ')'
}

export const makeColor = (value = 'transparent') => {
  if (value === '-') return 'transparent'
  if (value === 'transparent') return 'transparent'
  if (value.startsWith('--')) return `var(${value})`

  // Handle colors with alpha using dot notation (white.5, gray-100.2)
  const [colorName, alpha] = value.split('.')
  
  // Handle semantic colors (primary/100, neutral/500, text-primary, etc.)
  const semanticColors = ['primary', 'neutral', 'text-primary', 'text-secondary', 'text-subtle', 'text-accent', 'text-inverse',
                         'surface-base', 'surface-subtle', 'surface-accent', 'surface-inverse',
                         'border-default', 'border-accent', 'border-subtle',
                         'success', 'error', 'warning', 'info']
  
  // Single color names that should default to 500 shade
  const singleColorDefaults: Record<string, string> = {
    'primary': 'primary-500',
    'secondary': 'secondary-500',
    'accent': 'accent-500',
    'mute': 'mute-500',
    'surface': 'surface-500',
    'success': 'success-500',
    'warning': 'warning-500',
    'error': 'error-500',
    'info': 'info-500',
    'blue': 'blue-500',
    'green': 'green-500',
    'red': 'red-500',
    'yellow': 'yellow-500',
    'purple': 'purple-500',
    'pink': 'pink-500',
    'indigo': 'indigo-500',
    'cyan': 'cyan-500',
    'teal': 'teal-500',
    'emerald': 'emerald-500',
    'amber': 'amber-500',
    'orange': 'orange-500',
    'lime': 'lime-500',
    'violet': 'violet-500',
    'fuchsia': 'fuchsia-500',
    'rose': 'rose-500',
    'sky': 'sky-500',
    'slate': 'slate-500',
    'gray': 'gray-500',
    'zinc': 'zinc-500',
    'neutral': 'neutral-500',
    'stone': 'stone-500'
  }
  
  // Check if it's a semantic color with shade (primary/100, neutral/500)
  if (colorName.includes('/')) {
    const [semantic, shade] = colorName.split('/')
    if (semantic === 'primary' || semantic === 'neutral') {
      const cssVar = `var(--${semantic}-${shade || '600'})`
      if (alpha) {
        // Return color with alpha using color-mix (modern browsers)
        return `color-mix(in srgb, ${cssVar} ${alpha.includes('.') ? alpha : '0.' + alpha}, transparent)`
      }
      return cssVar
    }
  }
  
  // Check if it's a full semantic color name (but skip if it's in singleColorDefaults)
  if (semanticColors.includes(colorName) && !singleColorDefaults[colorName]) {
    const cssVar = `var(--${colorName})`
    if (alpha) {
      return `color-mix(in srgb, ${cssVar} ${alpha.includes('.') ? alpha : '0.' + alpha}, transparent)`
    }
    return cssVar
  }
  
  // Basic color names with their hex values
  const basicColors: Record<string, string> = {
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent'
  }
  
  // Check basic colors first
  if (basicColors[colorName]) {
    const baseColor = basicColors[colorName]
    if (alpha && baseColor !== 'transparent') {
      const rgb = baseColor.length === 4
        ? baseColor.slice(1).split('').map(v => parseInt(v + v, 16))
        : [baseColor.slice(1, 3), baseColor.slice(3, 5), baseColor.slice(5, 7)].map(v => parseInt(v, 16))
      return `rgba(${rgb.join(',')},${alpha.includes('.') ? alpha : '0.' + alpha})`
    }
    return baseColor
  }
  
  // Check if it's a single color name that should default to 500
  if (singleColorDefaults[colorName]) {
    const defaultColorName = singleColorDefaults[colorName]
    const cssVar = `var(--${defaultColorName})`
    if (alpha) {
      // Use modern CSS color-mix for alpha blending
      const alphaPercent = alpha.includes('.') ? parseFloat(alpha) * 100 : parseFloat(alpha)
      return `color-mix(in srgb, ${cssVar} ${alphaPercent}%, transparent)`
    }
    return cssVar
  }
  
  // Handle color 02-design_tokens FIRST (prioritize CSS variables over palette)
  if (colorName.match(/^[a-z]+-\d+$/)) {
    const cssVar = `var(--${colorName})`
    if (alpha) {
      // Use modern CSS color-mix for alpha blending
      const alphaPercent = alpha.includes('.') ? parseFloat(alpha) * 100 : parseFloat(alpha)
      return `color-mix(in srgb, ${cssVar} ${alphaPercent}%, transparent)`
    }
    return cssVar
  }

  // Fallback: Check if it's a color from the palette (for backwards compatibility)
  if (colorPalette[colorName]) {
    const baseColor = colorPalette[colorName]
    if (alpha) {
      // Convert hex to rgba with alpha
      if (baseColor.startsWith('#')) {
        const rgb = baseColor.length === 4
          ? baseColor.slice(1).split('').map(v => parseInt(v + v, 16))
          : [baseColor.slice(1, 3), baseColor.slice(3, 5), baseColor.slice(5, 7)].map(v => parseInt(v, 16))
        return `rgba(${rgb.join(',')},${alpha.includes('.') ? alpha : '0.' + alpha})`
      }
      // Handle other color formats if needed
      return baseColor
    }
    return baseColor
  }

  // Handle hex colors with alpha (#fff.3, #000000.5)
  if (value.startsWith('#')) {
    return makeHEX(value)
  }

  // c(255,255,155) or c(100%,0,0)
  if (value.split(',').every((v) => parseFloat(v) >= 0)) {
    // HSL, HSLA (222,100%,50%)
    if (value.includes('%')) {
      return makeHLS(value)
    }
    // RGB, RGBA
    return makeRGB(value)
  }

  // This case is now handled above, so this block is no longer needed

  return value
}

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
