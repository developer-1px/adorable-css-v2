/**
 * Container tokens following Tailwind CSS
 * Based on responsive breakpoints
 */

export type ContainerTokenSize = 
  | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

// Hardcoded values matching Tailwind CSS container sizes
export const CONTAINER_TOKEN_MAP = {
  'xs': '20rem',    // 320px
  'sm': '24rem',    // 384px  
  'md': '28rem',    // 448px
  'lg': '32rem',    // 512px
  'xl': '36rem',    // 576px
  '2xl': '42rem',   // 672px
  '3xl': '48rem',   // 768px
  '4xl': '56rem',   // 896px
  '5xl': '64rem',   // 1024px
  '6xl': '72rem',   // 1152px
  '7xl': '80rem',   // 1280px
} as const;

export const containerTokens = Object.keys(CONTAINER_TOKEN_MAP) as ContainerTokenSize[];