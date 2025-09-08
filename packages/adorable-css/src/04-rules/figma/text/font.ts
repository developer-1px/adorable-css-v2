// Keep font() for explicit font-weight only
import { getAllValues, rule2 } from '../../ast-utils/rule2-helpers'
import { FONT_TOKEN_MAP, isFontToken } from '../../../02-design_tokens/font-tokens'
import { registerUsedToken } from '../../../02-design_tokens/used-tokens'

// font weight
const WEIGHTS = {
  thin: '100',
  extralight: '200',
  light: '300',
  regular: '400',
  normal: '400',
  medium: '500',
  semi: '600',
  semibold: '600',
  bold: '700',
  extra: '800',
  black: '900',
}

export const font = rule2((s) => {
  const v = getAllValues(s).join('')
  
  // Check if it's a font family token
  if (isFontToken(v)) {
    const varName = `--font-${v}`
    const varValue = FONT_TOKEN_MAP[v]
    
    // Register the token for lazy loading
    registerUsedToken(varName, varValue)
    
    return `font-family:var(${varName})`
  }
  
  // Otherwise treat as font weight
  return `font-weight:${WEIGHTS[v as keyof typeof WEIGHTS] || v || '700'}`
})

// Export other text utilities
export const italic = rule2(() => 'font-style:italic')
