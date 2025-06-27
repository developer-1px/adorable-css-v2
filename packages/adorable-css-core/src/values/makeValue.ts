import { colorPalette } from '../plugins/colors'
import { isToken, getTokenVar } from '../tokens'

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
  
  // 토큰 처리
  // spacing tokens
  if (isToken(strValue, 'spacing')) {
    return `var(--spacing-${strValue})`;
  }
  
  // font tokens
  if (isToken(strValue, 'font')) {
    return `var(--font-${strValue})`;
  }
  
  // size tokens
  if (isToken(strValue, 'size')) {
    return `var(--size-${strValue})`;
  }
  
  // color tokens
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

  // Handle numeric XL tokens (e.g., 6xl, 7xl)
  const xlMatch = v.match(/^(\d+)xl$/);
  if (xlMatch) {
    const multiplier = parseInt(xlMatch[1]);
    // Base xl = 24px, so 2xl = 32px, 3xl = 40px, 4xl = 48px, 5xl = 64px, 6xl = 96px
    let calculatedValue: number;
    if (multiplier <= 5) {
      // Linear progression for 1-5: xl=24, 2xl=32, 3xl=40, 4xl=48, 5xl=64
      const values = [0, 24, 32, 40, 48, 64];
      calculatedValue = values[multiplier] || multiplier * 16;
    } else {
      // Exponential growth after 5xl
      calculatedValue = 64 + (multiplier - 5) * 32;
    }
    return calculatedValue + 'px';
  }

  // 1/6
  const [n, m] = v.split('/')
  if (+n > 0 && +m > 0) return makeNumber((+n / +m) * 100) + '%'

  // calc
  if (/.[-+*/]/.test(v) && /\d/.test(v)) {
    return 'calc(' + v.replace(/[-+]/g, (a) => ` ${a} `) + ')'
  }

  // number
  return +value === +value ? value + 'px' : value
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

export const rpx = (value: string | number) => {
  if (value === 'fill') return '9999px'
  return px(value)
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
  
  // Check if it's a full semantic color name
  if (semanticColors.includes(colorName)) {
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
  
  // Check if it's a color from the palette
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
