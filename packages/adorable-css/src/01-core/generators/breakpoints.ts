/**
 * Responsive breakpoint configuration
 */
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
  '4xl': '2560px',
  '5xl': '3200px',
  '6xl': '3840px',
  '7xl': '4096px'
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

/**
 * Get breakpoint value in pixels
 */
export function getBreakpointPx(breakpoint: string): string | undefined {
  return BREAKPOINTS[breakpoint as BreakpointKey];
}

/**
 * Create media query string
 */
export function createMediaQuery(breakpoint: string, isMaxWidth: boolean = false): string | undefined {
  const breakpointPx = getBreakpointPx(breakpoint);
  if (!breakpointPx) return undefined;
  
  return isMaxWidth 
    ? `@media (max-width: ${breakpointPx})`
    : `@media (min-width: ${breakpointPx})`;
}