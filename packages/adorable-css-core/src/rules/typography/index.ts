import { font, fontFamily } from './font';
import { c } from './color';
import { text, textShadow } from './text';
import type { RuleHandler, CSSRule } from '../types';
import { px } from '../../values/makeValue';

export const typographyRules = {
  font, c, text, 'font-family': fontFamily, 'text-shadow': textShadow,
  'line-height': lineHeight, 'letter-spacing': letterSpacing, 'underline-offset': underlineOffset,
  
  // Font weights
  '100': () => ({ 'font-weight': '100' }),
  '200': () => ({ 'font-weight': '200' }),
  '300': () => ({ 'font-weight': '300' }),
  '400': () => ({ 'font-weight': '400' }),
  '500': () => ({ 'font-weight': '500' }),
  '600': () => ({ 'font-weight': '600' }),
  '700': () => ({ 'font-weight': '700' }),
  '800': () => ({ 'font-weight': '800' }),
  '900': () => ({ 'font-weight': '900' }),
  
  thin: () => ({ 'font-weight': '200' }),
  light: () => ({ 'font-weight': '300' }),
  regular: () => ({ 'font-weight': 'normal' }),
  medium: () => ({ 'font-weight': '500' }),
  semibold: () => ({ 'font-weight': '600' }),
  bold: () => ({ 'font-weight': 'bold' }),
  heavy: () => ({ 'font-weight': '900' }),
  
  // Text styles
  italic: () => ({ 'font-style': 'italic' }),
  underline: () => ({ 'text-decoration': 'underline' }),
  'line-through': () => ({ 'text-decoration': 'line-through' }),
  strike: () => ({ 'text-decoration': 'line-through' }),
  overline: () => ({ 'text-decoration': 'overline' }),
  'no-underline': () => ({ 'text-decoration': 'none' }),
  
  // Text transform
  uppercase: () => ({ 'text-transform': 'uppercase' }),
  lowercase: () => ({ 'text-transform': 'lowercase' }),
  capitalize: () => ({ 'text-transform': 'capitalize' }),
  
  // White space
  nowrap: () => ({ 'white-space': 'nowrap' }),
  pre: () => ({ 'white-space': 'pre' }),
  'pre-wrap': () => ({ 'white-space': 'pre-wrap' }),
  
  // Text overflow
  truncate: () => ({ 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' })
};

// Line height utilities
export const lineHeight: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  const lineHeightMap: Record<string, string> = {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2'
  };
  
  if (lineHeightMap[args]) {
    return { 'line-height': lineHeightMap[args] };
  }
  
  return { 'line-height': String(px(args)) };
};

// Letter spacing utilities
export const letterSpacing: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  const letterSpacingMap: Record<string, string> = {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  };
  
  if (letterSpacingMap[args]) {
    return { 'letter-spacing': letterSpacingMap[args] };
  }
  
  return { 'letter-spacing': String(px(args)) };
};

// Text decoration utilities
export const underlineOffset: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { 'text-underline-offset': String(px(args)) };
};

// Add to exports
export const extendedTypographyRules = {
  ...typographyRules,
  'line-height': lineHeight,
  'letter-spacing': letterSpacing,
  'underline-offset': underlineOffset
};