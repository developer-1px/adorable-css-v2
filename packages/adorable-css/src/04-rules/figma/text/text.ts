import { getAllValues, rule2 } from '../../ast-utils/rule2-helpers'
import { font as fontTransform } from '../../../03-values/value-transform'
import { registerToken } from '../../../02-design_tokens/tokenRegistry'
import { makeTextClamp } from '../../../03-values/makeClamp'

const LINE_HEIGHTS = { none: '1', snug: '1.375', normal: '1.5', relaxed: '1.625', loose: '2' } as const
const LETTER_SPACINGS = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const

// Text properties constants
const TEXT_PROPERTIES = {
  // Text alignment
  'left': 'text-align:left',
  'center': 'text-align:center',
  'right': 'text-align:right',
  'justify': 'text-align:justify',
  'start': 'text-align:start',
  'end': 'text-align:end',
  // Text transform
  'uppercase': 'text-transform:uppercase',
  'lowercase': 'text-transform:lowercase',
  'capitalize': 'text-transform:capitalize',
  // Text decoration
  'underline': 'text-decoration:underline',
  'overline': 'text-decoration:overline',
  'strike': 'text-decoration:line-through',
  // White space
  'nowrap': 'white-space:nowrap',
  'wrap': 'white-space:normal',
  'pre': 'white-space:pre',
  'pre-wrap': 'white-space:pre-wrap',
  'pre-line': 'white-space:pre-line',
  // Vertical alignment (flex-based)
  'top': 'display:flex;flex-direction:column;justify-content:flex-start',
  'middle': 'display:flex;flex-direction:column;justify-content:center',
  'bottom': 'display:flex;flex-direction:column;justify-content:flex-end',
  'pack': 'display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center',
}

/**
 * Unified text handler that combines typography and text properties
 * Examples:
 * - text(lg) → font-size
 * - text(center) → text-align
 * - text(lg/1.5) → font-size + line-height
 * - text(nowrap+center) → white-space + text-align
 * - text(lg/1.5/tight) → font-size + line-height + letter-spacing
 */
export const text = rule2((s) => {
  const rawValue = getAllValues(s).join('')
  const css: string[] = []

  // First check if it's a simple text property (no slash)
  if (!rawValue.includes('/')) {
    // Check for combined properties with +
    if (rawValue.includes('+')) {
      const properties = rawValue.split('+')
      properties.forEach((prop) => {
        const trimmedProp = prop.trim()
        if (TEXT_PROPERTIES[trimmedProp as keyof typeof TEXT_PROPERTIES]) {
          css.push(TEXT_PROPERTIES[trimmedProp as keyof typeof TEXT_PROPERTIES])
        }
      })
      return css.join(';')
    }

    // Single text property
    const trimmedValue = rawValue.trim()
    if (TEXT_PROPERTIES[trimmedValue as keyof typeof TEXT_PROPERTIES]) {
      return TEXT_PROPERTIES[trimmedValue as keyof typeof TEXT_PROPERTIES]
    }
  }

  // Typography handling (with slashes)
  const parts = rawValue.split('/')

  // Process first part - could be font-size or a contextual keyword
  if (parts[0]) {
    const firstPart = parts[0].trim()

    // Check if first part has combined properties
    if (firstPart.includes('+')) {
      const props = firstPart.split('+')
      props.forEach((prop) => {
        const trimmedProp = prop.trim()
        if (TEXT_PROPERTIES[trimmedProp as keyof typeof TEXT_PROPERTIES]) {
          css.push(TEXT_PROPERTIES[trimmedProp as keyof typeof TEXT_PROPERTIES])
        }
      })
    }
    // Check if first part is a text property
    else if (TEXT_PROPERTIES[firstPart as keyof typeof TEXT_PROPERTIES]) {
      css.push(TEXT_PROPERTIES[firstPart as keyof typeof TEXT_PROPERTIES])
    }
    // Otherwise treat as font-size
    else {
      // Check for clamp/range syntax
      if (firstPart.includes('..')) {
        const clampValue = makeTextClamp(firstPart, registerToken)
        css.push(`font-size:${clampValue}`)
      } else {
        const fs = fontTransform(firstPart)
        if (fs) css.push(`font-size:${fs}`)
      }
    }
  }

  // Process remaining parts contextually by keyword type
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i].trim()

    // Check for combined properties with +
    if (part.includes('+')) {
      const props = part.split('+')
      props.forEach((prop) => {
        const trimmedProp = prop.trim()
        if (TEXT_PROPERTIES[trimmedProp as keyof typeof TEXT_PROPERTIES]) {
          css.push(TEXT_PROPERTIES[trimmedProp as keyof typeof TEXT_PROPERTIES])
        }
      })
      continue
    }

    // Text properties
    if (TEXT_PROPERTIES[part as keyof typeof TEXT_PROPERTIES]) {
      css.push(TEXT_PROPERTIES[part as keyof typeof TEXT_PROPERTIES])
    }
    // Line height keywords (check before letter-spacing to prioritize line-height)
    else if (LINE_HEIGHTS[part as keyof typeof LINE_HEIGHTS]) {
      css.push(`line-height:${LINE_HEIGHTS[part as keyof typeof LINE_HEIGHTS]}`)
    }
    // Letter spacing keywords
    else if (LETTER_SPACINGS[part as keyof typeof LETTER_SPACINGS]) {
      css.push(`letter-spacing:${LETTER_SPACINGS[part as keyof typeof LETTER_SPACINGS]}`)
    }
    // Numeric line-height (1.2, 1.5, etc)
    else if (/^\d+(\.\d+)?$/.test(part) && +part <= 4) {
      css.push(`line-height:${part}`)
    }
    // Pixel line-height (20px, etc)
    else if (part.endsWith('px')) {
      css.push(`line-height:${part}`)
    }
    // Percentage letter-spacing
    else if (part.includes('%')) {
      const value = +part.replace('%', '') / 100
      css.push(`letter-spacing:${value}em`)
    }
  }

  return css.join(';')
})

export const nowrap = rule2(() => 'white-space:nowrap')
export const wrap = rule2(() => 'white-space:normal')
export const pre = rule2(() => 'white-space:pre')
export const preWrap = rule2(() => 'white-space:pre-wrap')
export const preLine = rule2(() => 'white-space:pre-line')
export const uppercase = rule2(() => 'text-transform:uppercase')
export const lowercase = rule2(() => 'text-transform:lowercase')
export const capitalize = rule2(() => 'text-transform:capitalize')
export const underline = rule2(() => 'text-decoration:underline')
export const overline = rule2(() => 'text-decoration:overline')
export const strike = rule2(() => 'text-decoration:line-through')
export const noUnderline = rule2(() => 'text-decoration:none')

// Text decoration with color support
export const decoration = rule2((s) => {
  const value = getAllValues(s).join('')
  if (!value) return 'text-decoration-color:currentColor'

  // Handle color tokens
  if (value === 'primary') return 'text-decoration-color:var(--primary)'
  if (value === 'secondary') return 'text-decoration-color:var(--secondary)'
  if (value === 'accent') return 'text-decoration-color:var(--accent)'
  if (value === 'muted') return 'text-decoration-color:var(--muted)'
  if (value === 'foreground') return 'text-decoration-color:var(--foreground)'

  // Handle CSS color values
  return `text-decoration-color:${value}`
})
