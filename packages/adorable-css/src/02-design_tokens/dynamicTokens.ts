/**
 * Dynamic token generation utilities
 */

import { TEXT_TOKEN_MAP } from './text-tokens';
import { SPACING_TOKEN_MAP } from './spacing-tokens';
import { registerToken } from './tokenRegistry';

// Use the same tracking state as token-resolver
let trackingEnabled = true;

export function setDynamicTokenTracking(enabled: boolean): void {
  trackingEnabled = enabled;
}

/**
 * Generate spacing calculation and track token usage
 */
export function generateSpacingCalc(token: string): string {
  if (token in SPACING_TOKEN_MAP) {
    if (trackingEnabled) registerToken('spacing', token);
    return `var(--spacing-${token})`;
  }
  return token;
}

/**
 * Generate font calculation and track token usage
 */
export function generateFontCalc(token: string): string {
  if (token in TEXT_TOKEN_MAP) {
    if (trackingEnabled) registerToken('text', token);
    return `var(--text-${token})`;
  }
  return token;
}

/**
 * Generate size calculation (can use both spacing and text tokens) and track token usage
 */
export function generateSizeCalc(token: string): string {
  if (token in SPACING_TOKEN_MAP) {
    if (trackingEnabled) registerToken('spacing', token);
    return `var(--spacing-${token})`;
  }
  if (token in TEXT_TOKEN_MAP) {
    if (trackingEnabled) registerToken('text', token);
    return `var(--text-${token})`;
  }
  return token;
}