import type { CSSRule, RuleHandler } from '../types';
import { px as pxValue } from '../../values/makeValue';

// Padding utilities
export const p: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { padding: String(pxValue(args)) };
};

export const pt: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { 'padding-top': String(pxValue(args)) };
};

export const pr: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { 'padding-right': String(pxValue(args)) };
};

export const pb: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { 'padding-bottom': String(pxValue(args)) };
};

export const pl: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { 'padding-left': String(pxValue(args)) };
};

export const px: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  const value = String(pxValue(args));
  return { 'padding-left': value, 'padding-right': value };
};

export const py: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  const value = String(pxValue(args));
  return { 'padding-top': value, 'padding-bottom': value };
};

// Margin utilities
export const m: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // m(auto) for centering
  if (args === 'auto') return { margin: 'auto' };
  
  return { margin: String(pxValue(args)) };
};

export const mt: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (args === 'auto') return { 'margin-top': 'auto' };
  return { 'margin-top': String(pxValue(args)) };
};

export const mr: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (args === 'auto') return { 'margin-right': 'auto' };
  return { 'margin-right': String(pxValue(args)) };
};

export const mb: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (args === 'auto') return { 'margin-bottom': 'auto' };
  return { 'margin-bottom': String(pxValue(args)) };
};

export const ml: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (args === 'auto') return { 'margin-left': 'auto' };
  return { 'margin-left': String(pxValue(args)) };
};

export const mx: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (args === 'auto') {
    return { 'margin-left': 'auto', 'margin-right': 'auto' };
  }
  
  const value = String(pxValue(args));
  return { 'margin-left': value, 'margin-right': value };
};

export const my: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (args === 'auto') {
    return { 'margin-top': 'auto', 'margin-bottom': 'auto' };
  }
  
  const value = String(pxValue(args));
  return { 'margin-top': value, 'margin-bottom': value };
};

// Gap utility for flexbox/grid
export const gap: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // gap(16/24) for row-gap/column-gap
  if (args.includes('/')) {
    const [rowGap, colGap] = args.split('/');
    return {
      'row-gap': String(pxValue(rowGap)),
      'column-gap': String(pxValue(colGap))
    };
  }
  
  return { gap: String(pxValue(args)) };
};

export const spacingRules = {
  p, pt, pr, pb, pl, px, py,
  m, mt, mr, mb, ml, mx, my,
  gap
};