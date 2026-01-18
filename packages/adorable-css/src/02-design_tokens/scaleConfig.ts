/**
 * Scale configuration system for AdorableCSS
 * Allows users to customize how 02-design_tokens scale
 */

export type ScaleMode = 'linear' | 'exponential' | 'ratio' | 'custom';

/**
 * Unified scale configuration interface
 */
export interface TokenScaleConfig {
  mode: ScaleMode;
  base?: number;      // Base value for md
  ratio?: number;     // Ratio for ratio/exponential modes (e.g., 1.25, 1.333, 1.618)
  factor?: number;    // Factor for exponential modes
  formula?: (step: number) => number;  // Custom formula
  values?: Record<string, number>;     // Custom values for specific steps
}

// Legacy interfaces for backwards compatibility
export type SpacingScaleConfig = TokenScaleConfig;
export type FontScaleConfig = TokenScaleConfig;
export type SizeScaleConfig = TokenScaleConfig;

export interface ScaleConfig {
  spacing?: SpacingScaleConfig;
  font?: FontScaleConfig;
  size?: SizeScaleConfig;
  unit?: 'rem' | 'px';  // Global unit setting
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
  },
  unit: 'px'  // Default to px
};

// Base step values for t-shirt sizes
const BASE_STEPS: Record<string, number> = {
  'xs': -2,
  'sm': -1,
  'md': 0,
  'lg': 1,
  'xl': 2
};

/**
 * Get step value for a token dynamically
 * @param token - The token name (xs, sm, md, lg, xl, 2xl, etc.)
 * @param category - The category of the token for category-specific scaling
 */
export function getTokenStep(token: string, category?: 'font' | 'spacing' | 'size' | 'container'): number {
  // Handle pure numeric tokens (e.g., "10", "20")
  const numericValue = parseInt(token);
  if (!isNaN(numericValue) && token === numericValue.toString()) {
    return numericValue;
  }

  // Handle numbered xl tokens (2xl, 3xl, etc.)
  const xlMatch = token.match(/^(\d+)xl$/);
  if (xlMatch) {
    const num = parseInt(xlMatch[1]);
    return category === 'font' ? num + 1 : num + 4;
  }

  // Handle numbered xs tokens (2xs, 3xs, etc.)
  const xsMatch = token.match(/^(\d+)xs$/);
  if (xsMatch) {
    const num = parseInt(xsMatch[1]);
    return -num + 1; // 2xs = -1, 3xs = -2, 4xs = -3
  }

  // Handle base tokens
  const baseStep = BASE_STEPS[token];
  if (baseStep !== undefined) {
    return category === 'font' ? baseStep : baseStep + 3;
  }

  // Default to md
  return category === 'font' ? 0 : 3;
}