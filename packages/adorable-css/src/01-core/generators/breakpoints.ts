// Re-export from responsive-decorator to avoid duplication
export { BREAKPOINTS, type BreakpointKey } from '../../05-plugins/responsive/responsive-decorator';

// Import BREAKPOINTS for local use
import { BREAKPOINTS } from '../../05-plugins/responsive/responsive-decorator';

/**
 * Get breakpoint value in pixels
 */
export const getBreakpointPx = (breakpoint: string): string | undefined =>
  BREAKPOINTS[breakpoint as keyof typeof BREAKPOINTS];

/**
 * Create media query string
 */
export const createMediaQuery = (breakpoint: string, isMaxWidth = false): string | undefined => {
  const breakpointPx = getBreakpointPx(breakpoint);
  return breakpointPx 
    ? `@media (${isMaxWidth ? 'max' : 'min'}-width: ${breakpointPx})`
    : undefined;
};