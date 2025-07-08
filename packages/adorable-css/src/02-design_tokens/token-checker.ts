/**
 * Token checking utilities
 */

import { TEXT_TOKEN_MAP } from './text-tokens';
import { SPACING_TOKEN_MAP } from './spacing-tokens';
import { COLOR_TOKEN_MAP } from './color-tokens';

/**
 * Check if a value is a design token
 */
export function checkIsToken(value: string): boolean {
  return value in TEXT_TOKEN_MAP || 
         value in SPACING_TOKEN_MAP || 
         value in COLOR_TOKEN_MAP;
}