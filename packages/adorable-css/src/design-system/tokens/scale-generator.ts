/**
 * Scale Generator for AdorableCSS Tokens
 * 
 * Common notation:
 * - md is the base (0 point)
 * - Smaller: sm, xs, 2xs, 3xs, 4xs...
 * - Larger: lg, xl, 2xl, 3xl, 4xl...
 */

export type ScaleStep = '4xs' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';

export interface ScaleConfig {
  base: number;      // Base value at 'md'
  ratio: number;     // Scale ratio (e.g., 1.2 for Minor Third)
  unit?: 'px' | 'rem' | 'em';  // Output unit
  precision?: number; // Decimal places for rounding
  clamp?: {         // Optional min/max constraints
    min?: number;
    max?: number;
  };
}

export interface SpacingConfig {
  baseUnit: number;  // Base spacing unit (4 or 8)
  scale: 'linear' | 'fibonacci' | 'progressive' | 'exponential' | number[]; // Scale type or custom multipliers
  unit?: 'px' | 'rem' | 'em';
}

// Standard scale steps in order
const SCALE_STEPS: ScaleStep[] = [
  '4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'
];

// Common scale ratios
export const SCALE_RATIOS = {
  MINOR_SECOND: 1.067,    // 15:16 - Very subtle
  MAJOR_SECOND: 1.125,    // 8:9 - Subtle
  MINOR_THIRD: 1.2,       // 5:6 - Balanced (AdorableCSS default)
  MAJOR_THIRD: 1.25,      // 4:5 - Clear hierarchy
  PERFECT_FOURTH: 1.333,  // 3:4 - Strong contrast
  AUGMENTED_FOURTH: 1.414, // √2 - Dynamic
  PERFECT_FIFTH: 1.5,     // 2:3 - High contrast
  GOLDEN_RATIO: 1.618,    // φ - Natural feeling
} as const;

/**
 * Generate a modular scale based on configuration
 */
export function generateScale(config: ScaleConfig): Record<ScaleStep, string> {
  const { base, ratio, unit = 'rem', precision = 3, clamp } = config;
  const mdIndex = SCALE_STEPS.indexOf('md');
  const scale: Partial<Record<ScaleStep, string>> = {};

  SCALE_STEPS.forEach((step, index) => {
    // Calculate position relative to md (0)
    const n = index - mdIndex;
    
    // Calculate raw value using exponential scale
    let value = base * Math.pow(ratio, n);
    
    // Apply clamping if specified
    if (clamp) {
      if (clamp.min !== undefined) value = Math.max(value, clamp.min);
      if (clamp.max !== undefined) value = Math.min(value, clamp.max);
    }
    
    // Convert to specified unit
    const formattedValue = formatValue(value, unit, precision);
    scale[step] = formattedValue;
  });

  return scale as Record<ScaleStep, string>;
}

/**
 * Generate spacing scale with various patterns
 */
export function generateSpacingScale(config: SpacingConfig): Record<ScaleStep, string> {
  const { baseUnit, scale, unit = 'rem' } = config;
  const result: Partial<Record<ScaleStep, string>> = {};
  
  // Get multipliers based on scale type
  const multipliers = getSpacingMultipliers(scale);
  
  SCALE_STEPS.forEach((step, index) => {
    if (index < multipliers.length) {
      const value = baseUnit * multipliers[index];
      result[step] = formatValue(value, unit);
    }
  });
  
  return result as Record<ScaleStep, string>;
}

/**
 * Get spacing multipliers based on scale type
 */
function getSpacingMultipliers(scale: SpacingConfig['scale']): number[] {
  if (Array.isArray(scale)) {
    return scale;
  }
  
  switch (scale) {
    case 'linear':
      // Simple linear progression: 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 40
      return [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 40];
      
    case 'fibonacci':
      // Fibonacci-like progression: 0.5, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610
      return [0.5, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610].map(n => n / 5);
      
    case 'progressive':
      // Tighter at small sizes, looser at large (IBM Carbon inspired)
      return [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16];
      
    case 'exponential':
      // Exponential growth
      return Array.from({ length: 16 }, (_, i) => {
        const n = i - 5; // md is at index 5
        return Math.pow(1.5, n);
      });
      
    default:
      return [];
  }
}

/**
 * Format value with unit conversion
 */
function formatValue(value: number, unit: string, precision = 3): string {
  let convertedValue: number;
  
  switch (unit) {
    case 'rem':
    case 'em':
      convertedValue = value / 16; // Convert px to rem/em
      break;
    case 'px':
    default:
      convertedValue = value;
      break;
  }
  
  // Round to specified precision
  const rounded = Math.round(convertedValue * Math.pow(10, precision)) / Math.pow(10, precision);
  
  // Remove trailing zeros
  const formatted = rounded.toString();
  
  return `${formatted}${unit}`;
}

/**
 * Preset configurations for common use cases
 */
export const SCALE_PRESETS = {
  // Typography scales
  typography: {
    compact: { base: 16, ratio: SCALE_RATIOS.MINOR_SECOND },
    default: { base: 16, ratio: SCALE_RATIOS.MINOR_THIRD },
    marketing: { base: 16, ratio: SCALE_RATIOS.PERFECT_FOURTH },
    display: { base: 16, ratio: SCALE_RATIOS.PERFECT_FIFTH },
  },
  
  // Spacing scales
  spacing: {
    tight: { baseUnit: 4, scale: 'linear' as const },
    default: { baseUnit: 4, scale: 'progressive' as const },
    loose: { baseUnit: 8, scale: 'progressive' as const },
  },
  
  // Size scales (for containers, components)
  sizing: {
    compact: { base: 320, ratio: SCALE_RATIOS.MAJOR_THIRD },
    default: { base: 384, ratio: SCALE_RATIOS.PERFECT_FOURTH },
    comfortable: { base: 448, ratio: SCALE_RATIOS.PERFECT_FIFTH },
  }
} as const;

/**
 * Generate all token scales with a single configuration
 */
export interface TokenSystemConfig {
  typography?: ScaleConfig;
  spacing?: SpacingConfig;
  sizing?: ScaleConfig;
  borderRadius?: SpacingConfig;
  blur?: ScaleConfig;
  // Add more token types as needed
}

// Alias for backward compatibility
export type TokenScaleConfig = TokenSystemConfig;

export function generateTokenSystem(config: TokenSystemConfig) {
  const tokens: Record<string, any> = {};
  
  if (config.typography) {
    tokens.fontSize = generateScale(config.typography);
  }
  
  if (config.spacing) {
    tokens.spacing = generateSpacingScale(config.spacing);
  }
  
  if (config.sizing) {
    tokens.size = generateScale(config.sizing);
  }
  
  if (config.borderRadius) {
    tokens.radius = generateSpacingScale(config.borderRadius);
  }
  
  if (config.blur) {
    tokens.blur = generateScale(config.blur);
  }
  
  return tokens;
}

// Alias functions for backward compatibility and clarity
export const generateTypographyScale = (config: ScaleConfig) => generateScale(config);
export const generateContainerScale = (config: ScaleConfig) => generateScale(config);
export const generateSizeScale = (config: ScaleConfig) => generateScale(config);

// Default configuration for the token system
export const defaultScaleConfig: TokenSystemConfig = {
  typography: {
    base: 16,
    ratio: SCALE_RATIOS.MINOR_THIRD,
    unit: 'rem',
    clamp: { min: 10, max: 128 }
  },
  spacing: {
    baseUnit: 4,
    scale: 'progressive',
    unit: 'rem'
  },
  sizing: {
    base: 16,
    ratio: SCALE_RATIOS.MAJOR_THIRD,
    unit: 'rem'
  }
};

// Main export for generating all token scales
export function generateTokenScales(config: TokenSystemConfig = defaultScaleConfig) {
  const scales = generateTokenSystem(config);
  
  // Generate container scales with larger base
  const containerConfig = {
    base: 320,
    ratio: SCALE_RATIOS.PERFECT_FOURTH,
    unit: 'px' as const
  };
  
  return {
    font: scales.fontSize || generateScale(config.typography || defaultScaleConfig.typography!),
    spacing: scales.spacing || generateSpacingScale(config.spacing || defaultScaleConfig.spacing!),
    size: scales.size || generateScale(config.sizing || defaultScaleConfig.sizing!),
    container: generateScale(containerConfig)
  };
}

/**
 * Example usage:
 * 
 * const tokens = generateTokenSystem({
 *   typography: {
 *     base: 16,
 *     ratio: SCALE_RATIOS.MINOR_THIRD,
 *     clamp: { min: 12, max: 96 }
 *   },
 *   spacing: {
 *     baseUnit: 4,
 *     scale: 'progressive'
 *   },
 *   sizing: {
 *     base: 320,
 *     ratio: SCALE_RATIOS.PERFECT_FOURTH,
 *     unit: 'px'
 *   }
 * });
 */