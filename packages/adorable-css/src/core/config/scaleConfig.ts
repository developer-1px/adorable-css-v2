/**
 * Scale configuration system for AdorableCSS
 * Allows users to customize how tokens scale
 */

export type ScaleMode = 'linear' | 'exponential' | 'ratio' | 'custom';

export interface SpacingScaleConfig {
  mode: ScaleMode;
  base?: number;      // Base value for md
  factor?: number;    // Factor for exponential/ratio modes
  formula?: (step: number) => number;  // Custom formula
}

export interface FontScaleConfig {
  mode: 'ratio' | 'modular' | 'custom';
  ratio: number;      // 1.25 (Major Third), 1.333 (Perfect Fourth), 1.618 (Golden Ratio)
  formula?: (step: number) => number;
}

export interface SizeScaleConfig {
  mode: 'ratio' | 'linear' | 'custom';
  ratio: number;
  formula?: (step: number) => number;
}

export interface ScaleConfig {
  spacing?: SpacingScaleConfig;
  font?: FontScaleConfig;
  size?: SizeScaleConfig;
}

// Default configurations
export const DEFAULT_SCALE_CONFIG: Required<ScaleConfig> = {
  spacing: {
    mode: 'linear',
    base: 4,        // 4px units
    factor: 1.5,
  },
  font: {
    mode: 'ratio',
    ratio: 1.2,     // Minor Third
  },
  size: {
    mode: 'ratio',
    ratio: 1.25,
  }
};

// Token to step mapping
export const TOKEN_STEPS: Record<string, number> = {
  '4xs': -4,
  '3xs': -3,
  '2xs': -2,
  'xs': -1,
  'sm': 0,
  'md': 1,    // base reference
  'lg': 2,
  'xl': 3,
  '2xl': 4,
  '3xl': 5,
  '4xl': 6,
  '5xl': 7,
  '6xl': 8,
  '7xl': 9,
  '8xl': 10,
  '9xl': 11,
  '10xl': 12,
  '11xl': 13,
  '12xl': 14,
};

/**
 * Get step value for a token
 */
export function getTokenStep(token: string): number {
  // Handle numbered xl tokens
  const xlMatch = token.match(/^(\d+)xl$/);
  if (xlMatch) {
    const num = parseInt(xlMatch[1]);
    return num + 2; // 2xl = 4, 3xl = 5, etc.
  }
  
  return TOKEN_STEPS[token] ?? 1;
}