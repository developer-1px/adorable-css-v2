/**
 * All tokens in one place for easy access
 * Used by homepage components and token viewers
 */

import { TEXT_TOKEN_MAP } from './text-tokens';
import { SPACING_TOKEN_MAP } from './spacing-tokens';
import { CONTAINER_TOKEN_MAP } from './container-tokens';
import { RADIUS_TOKEN_MAP } from './radius-tokens';
import { SHADOW_TOKEN_MAP } from './shadow-tokens';
import { COLOR_TOKEN_MAP } from './color-tokens';

// Export all token maps for easy access
export const allTokens = {
  text: TEXT_TOKEN_MAP,
  spacing: SPACING_TOKEN_MAP,
  container: CONTAINER_TOKEN_MAP,
  radius: RADIUS_TOKEN_MAP,
  shadow: SHADOW_TOKEN_MAP,
  color: COLOR_TOKEN_MAP,
  
  // Backwards compatibility aliases
  font: TEXT_TOKEN_MAP,  // alias for text
  size: SPACING_TOKEN_MAP,  // alias for spacing
} as const;

// Helper function to get token categories as arrays
export function getTokenEntries(category: keyof typeof allTokens) {
  return Object.entries(allTokens[category]).map(([key, value]) => ({ key, value }));
}

// Helper to get all token categories
export function getAllTokenCategories() {
  return Object.keys(allTokens) as (keyof typeof allTokens)[];
}