/**
 * Radius tokens following Tailwind CSS
 * Format: none, sm, md, lg, xl, 2xl, 3xl, full
 */

export type RadiusTokenSize = 
  | 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

// Hardcoded values matching Tailwind CSS
export const RADIUS_TOKEN_MAP = {
  'none': '0px',
  'sm': '0.125rem',   // 2px
  'md': '0.375rem',   // 6px  
  'lg': '0.5rem',     // 8px
  'xl': '0.75rem',    // 12px
  '2xl': '1rem',      // 16px
  '3xl': '1.5rem',    // 24px
  'full': '9999px',   // Full rounded
} as const;

export const radiusTokens = Object.keys(RADIUS_TOKEN_MAP) as RadiusTokenSize[];