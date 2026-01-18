/**
 * Dynamic token calculation system
 * Generates calc() values at runtime based on scale configuration
 */

import { 
  DEFAULT_SCALE_CONFIG
} from './scaleConfig';
import type { 
  ScaleConfig
} from './scaleConfig';
import { registerToken } from './tokenRegistry';

// Legacy scale configuration for backwards compatibility


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
 * Token category type
 */
export type TokenCategory = 'font' | 'spacing' | 'size' | 'container';

/**
 * Generate dynamic token calc expression
 * @param category - Token category (font, spacing, size, container)
 * @param token - Token name (e.g., 'xl', '3xl', '12xl')
 * @returns CSS variable reference
 */
export function generateTokenCalc(
  category: TokenCategory,
  token: string
): string {
  // Register the token for lazy generation
  registerToken(category, token);

  // Return clean CSS variable reference
  return `var(--${category}-${token})`;
}

// Legacy functions for backwards compatibility
export const generateSpacingCalc = (token: string) => generateTokenCalc('spacing', token);
export const generateFontCalc = (token: string) => generateTokenCalc('font', token);
export const generateSizeCalc = (token: string) => generateTokenCalc('size', token);
export const generateContainerCalc = (token: string) => generateTokenCalc('container', token);