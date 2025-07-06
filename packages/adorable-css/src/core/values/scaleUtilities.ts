/**
 * Scale utilities for generating custom scale systems
 */

export interface SimpleScaleConfig {
  base: number;
  ratio: number;
  steps: string[];
}

/**
 * Generate CSS variables for a custom font scale
 * @param config - Scale configuration
 * @returns CSS variables string
 */
export function generateFontScaleVariables(config: SimpleScaleConfig): string {
  const { base, ratio, steps } = config;
  const baseIndex = steps.indexOf('md') !== -1 ? steps.indexOf('md') : steps.indexOf('base');
  
  const variables: string[] = [];
  
  steps.forEach((step, index) => {
    const scale = index - baseIndex;
    const multiplier = Math.pow(ratio, scale);
    variables.push(`  --font-scale-${step}: ${multiplier.toFixed(3)};`);
  });
  
  return variables.join('\n');
}

/**
 * Spacing scale modes
 */
export type SpacingScaleMode = 'linear' | 'ratio';

export interface SimpleSpacingScaleConfig extends SimpleScaleConfig {
  mode?: SpacingScaleMode;
}

/**
 * Generate CSS variables for a custom spacing scale
 * @param config - Scale configuration  
 * @returns CSS variables string
 */
export function generateSpacingScaleVariables(config: SimpleSpacingScaleConfig): string {
  const { base, ratio, steps, mode = 'linear' } = config;
  const baseIndex = steps.indexOf('md') !== -1 ? steps.indexOf('md') : steps.indexOf('base');
  
  const variables: string[] = [];
  
  if (mode === 'linear') {
    // Linear scale with predefined multipliers
    const spacingMultipliers: Record<string, number> = {
      '4xs': 0.1,
      '3xs': 0.2,
      '2xs': 0.3,
      'xs': 0.5,
      'sm': 0.75,
      'md': 1,
      'base': 1,
      'lg': 1.5,
      'xl': 2,
      '2xl': 4,
      '3xl': 6,
      '4xl': 8,
      '5xl': 12,
      '6xl': 16,
      '7xl': 24,
      '8xl': 32,
      '9xl': 48,
      '10xl': 64,
      '11xl': 96,
      '12xl': 128
    };
    
    steps.forEach(step => {
      const multiplier = spacingMultipliers[step] || 1;
      variables.push(`  --spacing-scale-${step}: ${multiplier};`);
    });
  } else {
    // Ratio-based scale
    steps.forEach((step, index) => {
      const scale = index - baseIndex;
      const multiplier = Math.pow(ratio, scale);
      variables.push(`  --spacing-scale-${step}: ${multiplier.toFixed(3)};`);
    });
  }
  
  return variables.join('\n');
}

/**
 * Generate complete scale system CSS
 * @param fontConfig - Font scale configuration
 * @param spacingConfig - Spacing scale configuration
 * @returns Complete CSS string
 */
export function generateScaleSystem(
  fontConfig?: SimpleScaleConfig,
  spacingConfig?: SimpleSpacingScaleConfig
): string {
  const parts: string[] = [':root {'];
  
  if (fontConfig) {
    parts.push('  /* Font Scale Variables */');
    parts.push(generateFontScaleVariables(fontConfig));
  }
  
  if (spacingConfig) {
    parts.push('  /* Spacing Scale Variables */');
    parts.push(generateSpacingScaleVariables(spacingConfig));
  }
  
  parts.push('}');
  
  return parts.join('\n');
}

/**
 * Common scale ratios
 */
export const SCALE_RATIOS = {
  MINOR_SECOND: 1.067,
  MAJOR_SECOND: 1.125,
  MINOR_THIRD: 1.2,
  MAJOR_THIRD: 1.25,
  PERFECT_FOURTH: 1.333,
  AUGMENTED_FOURTH: 1.414,
  PERFECT_FIFTH: 1.5,
  GOLDEN_RATIO: 1.618,
} as const;

/**
 * Default scale steps
 */
export const DEFAULT_SCALE_STEPS = [
  '4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'
] as const;