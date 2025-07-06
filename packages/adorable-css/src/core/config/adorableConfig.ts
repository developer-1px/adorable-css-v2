/**
 * AdorableCSS configuration file type definitions
 */

import type { ScaleConfig } from './scaleConfig';

export interface AdorableConfig {
  /**
   * Scale configuration for spacing, font, and size tokens
   */
  scale?: ScaleConfig;
  
  /**
   * Base values
   */
  base?: {
    spacing?: string;    // Default: 0.25rem
    font?: string;       // Default: 1rem
    size?: string;       // Default: 1rem
    container?: string;  // Default: 20rem
  };
  
  /**
   * Enable/disable features
   */
  features?: {
    autoInject?: boolean;      // Auto-inject tokens on import
    resetCSS?: boolean;        // Include reset CSS
    semanticColors?: boolean;  // Generate semantic color variations
  };
}

/**
 * Define configuration for AdorableCSS
 */
export function defineConfig(config: AdorableConfig): AdorableConfig {
  return config;
}