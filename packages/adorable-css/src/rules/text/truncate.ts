import type { RuleHandler } from '../types';

/**
 * Truncate text with ellipsis
 * - truncate: single line truncation
 * - truncate(2): multi-line clamping (2 lines)
 * - truncate(3): multi-line clamping (3 lines)
 */
export const truncate: RuleHandler = (value) => {
  // No value: single line truncation
  if (!value) {
    return {
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap'
    };
  }

  // Parse numeric value for line clamping
  const lines = parseInt(value);
  
  if (isNaN(lines) || lines < 1) {
    // Invalid value, fallback to single line
    return {
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap'
    };
  }

  if (lines === 1) {
    // Explicit single line
    return {
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap'
    };
  }

  // Multi-line clamping (2 or more lines)
  return {
    'display': '-webkit-box',
    '-webkit-line-clamp': String(lines),
    '-webkit-box-orient': 'vertical',
    'overflow': 'hidden',
    'text-overflow': 'ellipsis'
  };
};