/**
 * Base Color Definitions
 * Single source of truth for all base colors used in the design system
 * These are carefully selected for optimal perception and accessibility
 */

export const baseColors = {
  // Primary colors - scientifically selected for optimal perception
  red: '#ef4444',      // Warm red, good contrast
  orange: '#f97316',   // Vibrant orange
  amber: '#f59e0b',    // Warm amber
  yellow: '#eab308',   // Clear yellow
  lime: '#84cc16',     // Fresh lime
  green: '#22c55e',    // Natural green
  emerald: '#10b981',  // Rich emerald
  teal: '#14b8a6',     // Balanced teal
  cyan: '#06b6d4',     // Pure cyan
  sky: '#0ea5e9',      // Bright sky blue
  blue: '#3b82f6',     // True blue
  indigo: '#6366f1',   // Deep indigo
  violet: '#8b5cf6',   // Rich violet
  purple: '#a855f7',   // Vibrant purple
  fuchsia: '#d946ef',  // Bright fuchsia
  pink: '#ec4899',     // Warm pink
  rose: '#f43f5e',     // Rose red
  
  // Neutrals - optimized for readability
  slate: '#64748b',
  gray: '#6b7280',
  zinc: '#71717a',
  neutral: '#737373',
  stone: '#78716c'
} as const;

export type BaseColorName = keyof typeof baseColors;