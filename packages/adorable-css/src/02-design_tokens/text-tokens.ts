/**
 * Text size tokens following Tailwind CSS
 * Format: 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl, etc.
 */

export type TextTokenSize =
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'

// Hardcoded values matching Tailwind CSS
export const TEXT_TOKEN_MAP = {
  '3xs': '0.5rem', // 8px
  '2xs': '0.625rem', // 10px
  'xs': '0.75rem', // 12px
  'sm': '0.875rem', // 14px
  'md': '1rem', // 16px
  'lg': '1.125rem', // 18px
  'xl': '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem', // 48px
  '6xl': '3.75rem', // 60px
  '7xl': '4.5rem', // 72px
  '8xl': '6rem', // 96px
  '9xl': '8rem', // 128px
} as const

export const textTokens = Object.keys(TEXT_TOKEN_MAP) as TextTokenSize[]
