import type { CSSRule, RuleHandler } from '../types';
import { isToken, getTokenVar } from '../../design-system/tokens/index';
import { makeColor } from '../../core/values/makeValue';
import { truncate } from './truncate';

// Font style utilities
export const italic: RuleHandler = (): CSSRule => ({
  'font-style': 'italic'
});

// Text decoration utilities
export const overline: RuleHandler = (): CSSRule => ({
  'text-decoration': 'overline'
});

export const underline: RuleHandler = (): CSSRule => ({
  'text-decoration': 'underline'
});


// Decoration handler - decoration(underline), decoration(purple-600.3)
export const decoration: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'text-decoration': 'underline' };
  
  // Handle decoration styles
  if (args === 'underline' || args === 'overline' || args === 'none') {
    return { 'text-decoration': args };
  }
  
  // Handle color values - decoration(purple-600.3)
  return { 'text-decoration-color': String(makeColor(args)) };
};

// Font family utilities
export const sansSerif: RuleHandler = (): CSSRule => ({
  'font-family': 'sans-serif'
});

export const serif: RuleHandler = (): CSSRule => ({
  'font-family': 'serif'
});

export const monospace: RuleHandler = (): CSSRule => ({
  'font-family': 'menlo, monospace'
});

export const cursive: RuleHandler = (): CSSRule => ({
  'font-family': 'cursive'
});

export const fantasy: RuleHandler = (): CSSRule => ({
  'font-family': 'fantasy'
});

export const systemUi: RuleHandler = (): CSSRule => ({
  'font-family': 'system-ui'
});

// Font variant utilities
export const smallCaps: RuleHandler = (): CSSRule => ({
  'font-variant': 'small-caps'
});

// Text transform utilities
export const lowercase: RuleHandler = (): CSSRule => ({
  'text-transform': 'lowercase'
});

export const uppercase: RuleHandler = (): CSSRule => ({
  'text-transform': 'uppercase'
});

export const capitalize: RuleHandler = (): CSSRule => ({
  'text-transform': 'capitalize'
});

// Line height handler
export const line: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Handle numeric values (e.g., lh(1.5), lh(2))
  if (/^\d*\.?\d+$/.test(args)) {
    return { 'line-height': args };
  }
  
  // Handle token values
  if (isToken(args, 'lineHeight')) {
    return { 'line-height': getTokenVar('lineHeight', args) };
  }
  
  // Handle px values
  if (args.includes('px')) {
    return { 'line-height': args };
  }
  
  // Default to the value as-is
  return { 'line-height': args };
};

// Export all typography utilities
export const typographyUtilityRules = {
  italic,
  overline,
  underline,
  decoration,
  'sans-serif': sansSerif,
  serif,
  monospace,
  cursive,
  fantasy,
  'system-ui': systemUi,
  'small-caps': smallCaps,
  lowercase,
  uppercase,
  capitalize,
  line,
  truncate,
};