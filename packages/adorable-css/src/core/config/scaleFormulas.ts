/**
 * Scale formula implementations
 */

import type { SpacingScaleConfig, FontScaleConfig, SizeScaleConfig } from './scaleConfig';

/**
 * Calculate spacing multiplier based on config
 */
export function calculateSpacingMultiplier(
  step: number,
  config: SpacingScaleConfig
): number {
  // Check for custom values first
  if (config.mode === 'custom' && config.values) {
    const customValue = config.values[step.toString()];
    if (customValue !== undefined) {
      return customValue;
    }
  }
  
  switch (config.mode) {
    case 'linear':
      // Simple linear progression: 1, 2, 3, 4...
      return step;
      
    case 'exponential':
      // Exponential growth: factor^step
      return Math.pow(config.factor || 1.5, step - 1); // md (step 1) = 1
      
    case 'ratio':
      // Similar to exponential but with different base handling
      const baseStep = 1; // md is step 1
      return Math.pow(config.factor || 1.5, step - baseStep);
      
    case 'custom':
      if (config.formula) {
        return config.formula(step);
      }
      return step;
      
    default:
      return step;
  }
}

/**
 * Calculate font multiplier based on config
 */
export function calculateFontMultiplier(
  step: number,
  config: FontScaleConfig
): number {
  // Check for custom values first
  if (config.custom) {
    const customValue = config.custom[step.toString()];
    if (customValue !== undefined) {
      return customValue;
    }
  }
  
  const baseStep = 0; // base is 0 for font calculations
  
  switch (config.mode) {
    case 'ratio':
      // Classic typographic scale
      return Math.pow(config.ratio, step - baseStep);
      
    case 'modular':
      // Modular scale with multiple ratios
      // For now, use single ratio
      return Math.pow(config.ratio, step - baseStep);
      
    case 'custom':
      if (config.formula) {
        return config.formula(step);
      }
      return Math.pow(config.ratio, step - baseStep);
      
    default:
      return Math.pow(config.ratio, step - baseStep);
  }
}

/**
 * Calculate size multiplier based on config
 */
export function calculateSizeMultiplier(
  step: number,
  config: SizeScaleConfig
): number {
  const baseStep = 1; // md is step 1
  
  switch (config.mode) {
    case 'ratio':
      return Math.pow(config.ratio, step - baseStep);
      
    case 'linear':
      return step;
      
    case 'custom':
      if (config.formula) {
        return config.formula(step);
      }
      return Math.pow(config.ratio, step - baseStep);
      
    default:
      return Math.pow(config.ratio, step - baseStep);
  }
}

/**
 * Round multiplier to clean value
 */
export function cleanMultiplier(value: number): number {
  // Round to nearest 0.25 for values < 10
  if (value < 10) {
    return Math.round(value * 4) / 4;
  }
  // Round to nearest integer for larger values
  return Math.round(value);
}

/**
 * Format multiplier for CSS output
 */
export function formatMultiplier(value: number): string {
  // Remove unnecessary decimals
  if (value === Math.floor(value)) {
    return value.toString();
  }
  
  // Keep up to 4 decimal places
  return value.toFixed(4).replace(/\.?0+$/, '');
}