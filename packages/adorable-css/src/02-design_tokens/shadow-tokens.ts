/**
 * Shadow tokens following Tailwind CSS
 * Format: xs, sm, md, lg, xl, 2xl, inner
 */

export type ShadowTokenSize = 
  | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner' | 'none';

// Hardcoded values matching Tailwind CSS
export const SHADOW_TOKEN_MAP = {
  'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  'sm': '0 2px 4px -1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
  'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',  // base
  'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
  'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  'none': '0 0 #0000',
} as const;

export const shadowTokens = Object.keys(SHADOW_TOKEN_MAP) as ShadowTokenSize[];