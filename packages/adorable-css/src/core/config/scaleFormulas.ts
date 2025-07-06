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
  const baseStep = 1; // md is step 1
  
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
  const cleaned = cleanMultiplier(value);
  
  // Remove unnecessary decimals
  if (cleaned === Math.floor(cleaned)) {
    return cleaned.toString();
  }
  
  // Keep up to 3 decimal places
  return cleaned.toFixed(3).replace(/\.?0+$/, '');
}