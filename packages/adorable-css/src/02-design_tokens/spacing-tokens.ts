/**
 * Spacing tokens following Tailwind CSS
 * Format: 3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl, etc.
 */

export type SpacingTokenSize = 
  | '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' 
  | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';

// Hardcoded values matching Tailwind CSS spacing scale
export const SPACING_TOKEN_MAP = {
  '4xs': '0.0625rem', // 1px
  '3xs': '0.125rem',  // 2px
  '2xs': '0.25rem',   // 4px
  'xs': '0.5rem',     // 8px
  'sm': '0.75rem',    // 12px
  'md': '1rem',       // 16px
  'lg': '1.5rem',     // 24px
  'xl': '2rem',       // 32px
  '2xl': '3rem',      // 48px
  '3xl': '4rem',      // 64px
  '4xl': '6rem',      // 96px
  '5xl': '8rem',      // 128px
  '6xl': '12rem',     // 192px
  '7xl': '16rem',     // 256px
  '8xl': '20rem',     // 320px
  '9xl': '24rem',     // 384px
} as const;

export const spacingTokens = Object.keys(SPACING_TOKEN_MAP) as SpacingTokenSize[];