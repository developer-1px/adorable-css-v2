/**
 * Base color definitions
 */

import { COLOR_TOKEN_MAP } from '../../color-tokens';

// Re-export semantic colors from color tokens
export const SEMANTIC_COLORS = COLOR_TOKEN_MAP;

// Single color defaults (for numbered color scales)
export const SINGLE_COLOR_DEFAULTS: Record<string, string> = {
  gray: 'gray-500',    
  red: 'red-500',     
  blue: 'blue-500',    
  green: 'green-500',   
  yellow: 'yellow-500',  
  purple: 'purple-500',  
};