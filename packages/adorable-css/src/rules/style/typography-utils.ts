import type { CSSRule, RuleHandler } from '../types';
import { isToken, getTokenVar } from '../../design-system/tokens/index';
import { px } from '../../core/values/makeValue';

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

export const lineThrough: RuleHandler = (): CSSRule => ({
  'text-decoration': 'line-through'
});

// Aliases for line-through
export const strike = lineThrough;
export const del = lineThrough;

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
export const lh: RuleHandler = (args?: string): CSSRule => {
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


// Text rendering optimization
export const textRendering: RuleHandler = (args?: string): CSSRule => {
  const validValues = ['auto', 'optimizeSpeed', 'optimizeLegibility', 'geometricPrecision'];
  if (!args || !validValues.includes(args)) {
    return { 'text-rendering': 'optimizeLegibility' };
  }
  return { 'text-rendering': args };
};

// Webkit font smoothing
export const webkitFontSmoothing: RuleHandler = (args?: string): CSSRule => {
  const validValues = ['auto', 'none', 'antialiased', 'subpixel-antialiased'];
  if (!args || !validValues.includes(args)) {
    return { '-webkit-font-smoothing': 'antialiased' };
  }
  return { '-webkit-font-smoothing': args };
};

// Mozilla font smoothing
export const mozFontSmoothing: RuleHandler = (args?: string): CSSRule => {
  const validValues = ['auto', 'grayscale'];
  if (!args || !validValues.includes(args)) {
    return { '-moz-osx-font-smoothing': 'grayscale' };
  }
  return { '-moz-osx-font-smoothing': args };
};

// Export all typography utilities
export const typographyUtilityRules = {
  italic,
  overline,
  underline,
  'line-through': lineThrough,
  strike,
  del,
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
  lh,
  'text-rendering': textRendering,
  '-webkit-font-smoothing': webkitFontSmoothing,
  '-moz-osx-font-smoothing': mozFontSmoothing,
};