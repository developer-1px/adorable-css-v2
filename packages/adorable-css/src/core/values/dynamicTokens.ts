/**
 * Dynamic token calculation system
 * Generates calc() values at runtime based on scale configuration
 */

import { 
  getTokenStep, 
  DEFAULT_SCALE_CONFIG
} from '../config/scaleConfig';
import type { 
  ScaleConfig,
  SpacingScaleConfig,
  FontScaleConfig,
  SizeScaleConfig
} from '../config/scaleConfig';
import {
  calculateSpacingMultiplier,
  calculateFontMultiplier,
  calculateSizeMultiplier,
  formatMultiplier
} from '../config/scaleFormulas';

// Legacy scale configuration for backwards compatibility
export const SCALE_CONFIG = {
  FONT_RATIO: 1.2,
  SPACING_RATIO: 1.5,
  SIZE_RATIO: 1.25,
  CONTAINER_RATIO: 1.33,
  FONT_BASE: '1rem',
  SIZE_BASE: '1rem',
  CONTAINER_BASE: '20rem',
  SPACING_BASE: '0.25rem'
};

// Global scale configuration
let globalScaleConfig: ScaleConfig = DEFAULT_SCALE_CONFIG;

/**
 * Set global scale configuration
 */
export function setScaleConfig(config: Partial<ScaleConfig>): void {
  globalScaleConfig = {
    ...globalScaleConfig,
    ...config
  };
}

/**
 * Get current scale configuration
 */
export function getScaleConfig(): ScaleConfig {
  return globalScaleConfig;
}

/**
 * Generate dynamic spacing calc expression
 * @param token - Spacing token (e.g., 'xl', '3xl', '12xl')
 * @param customConfig - Optional custom spacing config
 * @returns Calc expression
 */
export function generateSpacingCalc(
  token: string, 
  customConfig?: Partial<SpacingScaleConfig>
): string {
  const config = { ...globalScaleConfig.spacing, ...customConfig } as SpacingScaleConfig;
  const step = getTokenStep(token);
  
  // md (step 1) returns base value
  if (step === 1) {
    return 'var(--spacing)';
  }
  
  const multiplier = calculateSpacingMultiplier(step, config);
  const formatted = formatMultiplier(multiplier);
  
  return `calc(var(--spacing) * ${formatted})`;
}

/**
 * Generate dynamic font size calc expression
 * @param token - Font size token (e.g., 'sm', 'xl', '3xl')
 * @param customConfig - Optional custom font config
 * @returns Calc expression
 */
export function generateFontCalc(
  token: string,
  customConfig?: Partial<FontScaleConfig>
): string {
  const config = { ...globalScaleConfig.font, ...customConfig } as FontScaleConfig;
  const step = getTokenStep(token);
  
  // md (step 1) returns base value
  if (step === 1) {
    return 'var(--font-base, 1rem)';
  }
  
  const multiplier = calculateFontMultiplier(step, config);
  const formatted = formatMultiplier(multiplier);
  
  return `calc(var(--font-base, 1rem) * ${formatted})`;
}

/**
 * Generate dynamic size calc expression
 * @param token - Size token
 * @param customConfig - Optional custom size config
 * @returns Calc expression
 */
export function generateSizeCalc(
  token: string,
  customConfig?: Partial<SizeScaleConfig>
): string {
  const config = { ...globalScaleConfig.size, ...customConfig } as SizeScaleConfig;
  const step = getTokenStep(token);
  
  // md (step 1) returns base value
  if (step === 1) {
    return 'var(--size-base, 1rem)';
  }
  
  const multiplier = calculateSizeMultiplier(step, config);
  const formatted = formatMultiplier(multiplier);
  
  return `calc(var(--size-base, 1rem) * ${formatted})`;
}

/**
 * Generate dynamic container calc expression
 * Containers use predefined breakpoint values with clean multipliers
 * @param token - Container token
 * @returns Calc expression
 */
export function generateContainerCalc(token: string): string {
  // Container breakpoints (aligned with common screen sizes)
  const containerMultipliers: Record<string, number> = {
    'xs': 16,    // 320px  (20rem * 16/20)
    'sm': 24,    // 480px  (20rem * 24/20)
    'md': 32,    // 640px  (20rem * 32/20) - base
    'lg': 48,    // 960px  (20rem * 48/20)
    'xl': 64,    // 1280px (20rem * 64/20)
    '2xl': 72,   // 1440px (20rem * 72/20)
    '3xl': 80,   // 1600px (20rem * 80/20)
    '4xl': 96,   // 1920px (20rem * 96/20)
    '5xl': 112,  // 2240px (20rem * 112/20)
    '6xl': 128,  // 2560px (20rem * 128/20)
    '7xl': 144,  // 2880px (20rem * 144/20)
  };
  
  const multiplier = containerMultipliers[token];
  
  if (!multiplier) {
    // Handle numbered xl tokens with formula
    const xlMatch = token.match(/^(\d+)xl$/);
    if (xlMatch) {
      const num = parseInt(xlMatch[1]);
      // Simple formula for larger sizes: base + (n * increment)
      const calculated = 32 + (num * 16);
      return `calc(var(--container-base, 20rem) * ${calculated} / 20)`;
    }
    return 'var(--container-base, 20rem)'; // fallback to md
  }
  
  // md is the base
  if (multiplier === 32) {
    return 'calc(var(--container-base, 20rem) * 32 / 20)';
  }
  
  return `calc(var(--container-base, 20rem) * ${multiplier} / 20)`;
}