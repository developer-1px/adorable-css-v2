/**
 * 색상 관련 상수 데이터들
 * makeValue.ts에서 분리하여 코드 라인수 감소
 */

// Base colors with actual hex values for gradient generation
export const BASE_COLOR_VALUES: Record<string, string> = {
  // Tailwind-inspired colors with actual hex values
  red: '#ef4444',
  orange: '#f97316',
  amber: '#f59e0b',
  yellow: '#eab308',
  lime: '#84cc16',
  green: '#22c55e',
  emerald: '#10b981',
  teal: '#14b8a6',
  cyan: '#06b6d4',
  sky: '#0ea5e9',
  blue: '#3b82f6',
  indigo: '#6366f1',
  violet: '#8b5cf6',
  purple: '#a855f7',
  fuchsia: '#d946ef',
  pink: '#ec4899',
  rose: '#f43f5e',
  slate: '#64748b',
  gray: '#6b7280',
  zinc: '#71717a',
  neutral: '#737373',
  stone: '#78716c',
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent'
}

// OKLCH tone values for generating color variations
export const TONE_VALUES: Record<string, { l: number, cFactor: number }> = {
  50: { l: 0.97, cFactor: 0.15 },
  100: { l: 0.93, cFactor: 0.35 },
  200: { l: 0.87, cFactor: 0.55 },
  300: { l: 0.78, cFactor: 0.75 },
  400: { l: 0.68, cFactor: 0.90 },
  500: { l: 0.58, cFactor: 1 }, // Base level
  600: { l: 0.45, cFactor: 0.95 },
  700: { l: 0.38, cFactor: 0.85 },
  800: { l: 0.30, cFactor: 0.75 },
  900: { l: 0.22, cFactor: 0.65 }
}

// Handle semantic colors
export const SEMANTIC_COLORS = [
  'primary', 'neutral', 'text-primary', 'text-secondary', 'text-subtle', 'text-accent', 'text-inverse',
  'surface-base', 'surface-subtle', 'surface-accent', 'surface-inverse',
  'border-default', 'border-accent', 'border-subtle',
  'success', 'error', 'warning', 'info'
]

// Single color names that should default to 500 shade
export const SINGLE_COLOR_DEFAULTS: Record<string, string> = {
  'primary': 'primary-500',
  'secondary': 'secondary-500',
  'accent': 'accent-500',
  'mute': 'mute-500',
  'surface': 'surface-500',
  'success': 'success-500',
  'warning': 'warning-500',
  'error': 'error-500',
  'info': 'info-500',
  'blue': 'blue-500',
  'green': 'green-500',
  'red': 'red-500',
  'yellow': 'yellow-500',
  'purple': 'purple-500',
  'pink': 'pink-500',
  'indigo': 'indigo-500',
  'cyan': 'cyan-500',
  'teal': 'teal-500',
  'emerald': 'emerald-500',
  'amber': 'amber-500',
  'orange': 'orange-500',
  'lime': 'lime-500',
  'violet': 'violet-500',
  'fuchsia': 'fuchsia-500',
  'rose': 'rose-500',
  'sky': 'sky-500',
  'slate': 'slate-500',
  'gray': 'gray-500',
  'zinc': 'zinc-500',
  'neutral': 'neutral-500',
  'stone': 'stone-500'
}