import type { CSSRule, RuleHandler } from '../types';

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
};