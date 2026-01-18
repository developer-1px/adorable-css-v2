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

import { px } from '../../01-core/values/makeValue';

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
  if (breakpoint.startsWith('@w') || breakpoint.startsWith('w')) {
    const args = breakpoint.match(/\(([^)]+)\)/)?.[1]; // 360~, ~720, 360~720
    if (args && args.includes('~')) {
      // Range syntax: min~max
      const [min, max] = args.split('~');
      const minQ = min ? `(min-width: ${px(min)})` : '';
      const maxQ = max ? `(max-width: ${px(max)})` : '';
      const query = [minQ, maxQ].filter(Boolean).join(' and ');
      return query ? `@media ${query}` : undefined;
    }
  }

  const breakpointPx = getBreakpointPx(breakpoint);
  if (!breakpointPx) return undefined;

  return isMaxWidth
    ? `@media (max-width: ${breakpointPx})`
    : `@media (min-width: ${breakpointPx})`;
}