/**
 * Token resolution interface for 04-rules layer
 * 
 * This module provides a clean interface for the rules layer to interact with tokens
 * without directly importing from the design tokens layer, maintaining proper
 * architectural separation.
 */

import { isToken as designTokenIsToken, getTokenVar as designTokenGetVar } from '../02-design_tokens/design-system/tokens/index';
import { generateSizeCalc, generateContainerCalc, generateSpacingCalc, generateFontCalc } from '../02-design_tokens/dynamicTokens';

/**
 * Check if a value is a valid token for the given category
 */
export function isToken(value: string, category: string): boolean {
  return designTokenIsToken(value, category);
}

/**
 * Get the resolved token value for the given category and token
 */
export function getTokenVar(category: string, token: string): string {
  return designTokenGetVar(category, token);
}

/**
 * Generate size calculation for size tokens
 */
export function resolveSizeToken(value: string): string {
  return generateSizeCalc(value);
}

/**
 * Generate container calculation for container tokens
 */
export function resolveContainerToken(value: string): string {
  return generateContainerCalc(value);
}

/**
 * Check if a value is a size token and get its resolved value
 */
export function resolveSizeValue(value: string): string | null {
  if (isToken(value, 'size')) {
    return resolveSizeToken(value);
  }
  return null;
}

/**
 * Check if a value is a container token and get its resolved value
 */
export function resolveContainerValue(value: string): string | null {
  if (isToken(value, 'container')) {
    return resolveContainerToken(value);
  }
  return null;
}

/**
 * Get radius token value
 */
export function getRadiusToken(value: string): string {
  if (isToken(value, 'radius')) {
    return getTokenVar('radius', value);
  }
  return value;
}

/**
 * Generate spacing calculation for spacing tokens
 */
export { generateSpacingCalc };

/**
 * Generate font calculation for font tokens
 */
export { generateFontCalc };

/**
 * Generate size calculation for size tokens
 */
export { generateSizeCalc };