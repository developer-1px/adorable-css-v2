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
 * Token generation options
 */
export interface TokenOptions {
  /** Handle zero value specially */
  allowZero?: boolean;
  /** Handle numeric values for backwards compatibility */
  allowNumeric?: boolean;
  /** Custom fallback unit for numeric values */
  numericUnit?: string;
}

/**
 * Generate dynamic token calc expression (unified interface)
 * @param category - Token category (font, spacing, size, container)
 * @param token - Token name (e.g., 'xl', '3xl', '12xl')
 * @param options - Token generation options
 * @returns CSS variable reference or fallback value
 */
export function generateTokenCalc(
  category: TokenCategory,
  token: string,
  options: TokenOptions = {}
): string {
  const { allowZero = false, allowNumeric = false, numericUnit = 'rem' } = options;
  
  // Handle zero value
  if (allowZero && token === '0') {
    return '0';
  }
  
  // Handle numeric values for backwards compatibility
  if (allowNumeric) {
    const numericValue = parseInt(token);
    if (!isNaN(numericValue) && token === numericValue.toString()) {
      return `${numericValue}${numericUnit}`;
    }
  }
  
  // Register the token for lazy generation
  registerToken(category, token);
  
  // Return clean CSS variable reference
  return `var(--${category}-${token})`;
}

// Legacy functions for backwards compatibility
export const generateSpacingCalc = (token: string) => generateTokenCalc('spacing', token, { allowZero: true });
export const generateFontCalc = (token: string) => generateTokenCalc('font', token);
export const generateSizeCalc = (token: string) => generateTokenCalc('size', token, { allowZero: true, allowNumeric: true, numericUnit: 'rem' });
export const generateContainerCalc = (token: string) => generateTokenCalc('container', token);