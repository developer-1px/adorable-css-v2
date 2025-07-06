/**
 * Dynamic token calculation system
 * Generates calc() values at runtime based on scale configuration
 */

import { 
  DEFAULT_SCALE_CONFIG
} from '../config/scaleConfig';
import type { 
  ScaleConfig
} from '../config/scaleConfig';
import { registerToken } from '../runtime/tokenRegistry';

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
 * Generate dynamic spacing calc expression
 * @param token - Spacing token (e.g., 'xl', '3xl', '12xl')
 * @returns CSS variable reference
 */
export function generateSpacingCalc(
  token: string
): string {
  // Special case for 0
  if (token === '0') {
    return '0';
  }
  
  // Register the token for lazy generation
  registerToken('spacing', token);
  
  // Return clean CSS variable reference
  return `var(--spacing-${token})`;
}

/**
 * Generate dynamic font size calc expression
 * @param token - Font size token (e.g., 'sm', 'xl', '3xl')
 * @returns CSS variable reference
 */
export function generateFontCalc(
  token: string
): string {
  // Register the token for lazy generation
  registerToken('font', token);
  
  // Return clean CSS variable reference
  return `var(--font-${token})`;
}

/**
 * Generate dynamic size calc expression
 * @param token - Size token
 * @returns CSS variable reference
 */
export function generateSizeCalc(
  token: string
): string {
  // Special case for 0
  if (token === '0') {
    return '0';
  }
  
  // Handle numeric values - these should remain unitless for now
  // The actual unit will be applied in the CSS generation
  const numericValue = parseInt(token);
  if (!isNaN(numericValue) && token === numericValue.toString()) {
    return `${numericValue}rem`; // Keep as rem for backward compatibility
  }
  
  // Register the token for lazy generation
  registerToken('size', token);
  
  // Return clean CSS variable reference
  return `var(--size-${token})`;
}

/**
 * Generate dynamic container calc expression
 * @param token - Container token
 * @returns CSS variable reference
 */
export function generateContainerCalc(token: string): string {
  // Register the token for lazy generation
  registerToken('container', token);
  
  // Return clean CSS variable reference
  return `var(--container-${token})`;
}