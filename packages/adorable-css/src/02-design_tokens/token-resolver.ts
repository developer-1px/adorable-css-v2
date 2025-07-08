/**
 * Token resolution utilities
 */

import { TEXT_TOKEN_MAP, type TextTokenSize } from './text-tokens';
import { SPACING_TOKEN_MAP, type SpacingTokenSize } from './spacing-tokens';
import { CONTAINER_TOKEN_MAP, type ContainerTokenSize } from './container-tokens';
import { RADIUS_TOKEN_MAP, type RadiusTokenSize } from './radius-tokens';
import { SHADOW_TOKEN_MAP, type ShadowTokenSize } from './shadow-tokens';
import { COLOR_TOKEN_MAP, type ColorToken } from './color-tokens';
import { registerUsedToken } from './used-tokens';
import { registerToken } from './tokenRegistry';

type TokenType = 'spacing' | 'font' | 'text' | 'size' | 'color' | 'container' | 'radius' | 'shadow';

// Global flag to control token tracking
let trackingEnabled = true;

export function setTokenTracking(enabled: boolean): void {
  trackingEnabled = enabled;
}

/**
 * Check if a value is a token
 */
export function isToken(value: string, tokenType: TokenType): boolean {
  switch (tokenType) {
    case 'spacing':
      return value in SPACING_TOKEN_MAP;
    case 'font':
    case 'text':
      return value in TEXT_TOKEN_MAP;
    case 'size':
      // Size can use both spacing and text tokens
      return value in SPACING_TOKEN_MAP || value in TEXT_TOKEN_MAP;
    case 'container':
      // Container uses container tokens
      return value in CONTAINER_TOKEN_MAP;
    case 'radius':
      return value in RADIUS_TOKEN_MAP;
    case 'shadow':
      return value in SHADOW_TOKEN_MAP;
    case 'color':
      return value in COLOR_TOKEN_MAP;
    default:
      return false;
  }
}

/**
 * Get CSS variable for a token and track its usage
 */
export function getTokenVar(tokenType: TokenType, value: string): string {
  switch (tokenType) {
    case 'spacing':
      if (value in SPACING_TOKEN_MAP) {
        const varName = `--spacing-${value}`;
        const varValue = SPACING_TOKEN_MAP[value as SpacingTokenSize];
        if (trackingEnabled) registerUsedToken(varName, varValue);
        return `var(${varName})`;
      }
      break;
    case 'font':
    case 'text':
      if (value in TEXT_TOKEN_MAP) {
        const varName = `--text-${value}`;
        const varValue = TEXT_TOKEN_MAP[value as TextTokenSize];
        if (trackingEnabled) registerUsedToken(varName, varValue);
        return `var(${varName})`;
      }
      break;
    case 'size':
      // Size can use both spacing and text tokens
      if (value in SPACING_TOKEN_MAP) {
        const varName = `--spacing-${value}`;
        const varValue = SPACING_TOKEN_MAP[value as SpacingTokenSize];
        if (trackingEnabled) registerUsedToken(varName, varValue);
        return `var(${varName})`;
      }
      if (value in TEXT_TOKEN_MAP) {
        const varName = `--text-${value}`;
        const varValue = TEXT_TOKEN_MAP[value as TextTokenSize];
        if (trackingEnabled) registerUsedToken(varName, varValue);
        return `var(${varName})`;
      }
      break;
    case 'container':
      // Container uses container tokens
      if (value in CONTAINER_TOKEN_MAP) {
        const varName = `--container-${value}`;
        const varValue = CONTAINER_TOKEN_MAP[value as ContainerTokenSize];
        if (trackingEnabled) registerUsedToken(varName, varValue);
        return `var(${varName})`;
      }
      break;
    case 'radius':
      if (value in RADIUS_TOKEN_MAP) {
        const varName = `--radius-${value}`;
        const varValue = RADIUS_TOKEN_MAP[value as RadiusTokenSize];
        if (trackingEnabled) registerUsedToken(varName, varValue);
        return `var(${varName})`;
      }
      break;
    case 'shadow':
      if (value in SHADOW_TOKEN_MAP) {
        const varName = `--shadow-${value}`;
        const varValue = SHADOW_TOKEN_MAP[value as ShadowTokenSize];
        if (trackingEnabled) registerUsedToken(varName, varValue);
        return `var(${varName})`;
      }
      break;
    case 'color':
      if (value in COLOR_TOKEN_MAP) {
        const varName = `--color-${value}`;
        const varValue = COLOR_TOKEN_MAP[value as ColorToken];
        if (trackingEnabled) registerUsedToken(varName, varValue);
        return `var(${varName})`;
      }
      break;
  }
  
  // Return the value as-is if not a token
  return value;
}

/**
 * Resolve size token value
 */
export function resolveSizeToken(value: string): string {
  // Check if it's a size token
  if (isToken(value, 'size')) {
    return getTokenVar('size', value);
  }
  return value;
}

/**
 * Resolve container token value
 */
export function resolveContainerToken(value: string): string {
  // Container uses container token type
  if (isToken(value, 'container')) {
    return getTokenVar('container', value);
  }
  return value;
}

/**
 * Resolve radius token value
 */
export function resolveRadiusToken(value: string): string {
  // Radius uses radius token type
  if (isToken(value, 'radius')) {
    return getTokenVar('radius', value);
  }
  return value;
}

/**
 * Resolve shadow token value
 */
export function resolveShadowToken(value: string): string {
  // Shadow uses shadow token type
  if (isToken(value, 'shadow')) {
    return getTokenVar('shadow', value);
  }
  return value;
}