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
  values?: Record<string, number>;  // Custom values for specific steps
}

export interface FontScaleConfig {
  mode: 'ratio' | 'modular' | 'custom';
  ratio: number;      // 1.25 (Major Third), 1.333 (Perfect Fourth), 1.618 (Golden Ratio)
  formula?: (step: number) => number;
  custom?: Record<string, number>;  // Custom values for specific steps
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

// Base token order (smallest to largest)
const TOKEN_ORDER = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const MD_INDEX = 2; // md is at index 2

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
  
  // Handle numbered xs tokens (4xs, 3xs, 2xs)
  const xsMatch = token.match(/^(\d+)xs$/);
  if (xsMatch) {
    const num = parseInt(xsMatch[1]);
    return -num + 1; // 4xs = -3, 3xs = -2, 2xs = -1
  }
  
  // Handle numbered xl tokens (2xl, 3xl, etc.)
  const xlMatch = token.match(/^(\d+)xl$/);
  if (xlMatch) {
    const num = parseInt(xlMatch[1]);
    if (category === 'font') {
      // For font: 2xl = 3, 3xl = 4, etc.
      return num + 1;
    } else {
      // For spacing/size: 2xl = 6, 3xl = 7, etc.
      return num + 4;
    }
  }
  
  // Handle base tokens
  const baseIndex = TOKEN_ORDER.indexOf(token as any);
  if (baseIndex !== -1) {
    if (category === 'font') {
      // For font: md = 0 (base 16px)
      return baseIndex - MD_INDEX; // xs=-2, sm=-1, md=0, lg=1, xl=2
    } else {
      // For spacing/size: md = 3
      return baseIndex + 1; // xs=1, sm=2, md=3, lg=4, xl=5
    }
  }
  
  return category === 'font' ? 0 : 3; // default to md
}