import type { CSSRule, RuleHandler } from '../types';

export const overflow: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { overflow: 'auto' };
  
  // overflow(x) -> overflow-x: scroll
  if (args === 'x') return { 'overflow-x': 'scroll' };
  if (args === 'y') return { 'overflow-y': 'scroll' };
  
  // overflow(hidden), overflow(auto), overflow(clip), etc.
  const validValues = ['visible', 'hidden', 'scroll', 'auto', 'clip'];
  if (validValues.includes(args)) {
    return { overflow: args };
  }
  
  return {};
};

export const scroll: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { overflow: 'scroll' };
  
  // scroll(x) -> overflow-x: scroll
  if (args === 'x') return { 'overflow-x': 'scroll' };
  if (args === 'y') return { 'overflow-y': 'scroll' };
  
  return { overflow: 'scroll' };
};

export const clip = (): CSSRule => ({ overflow: 'clip' });

export const overflowRules = {
  overflow,
  scroll,
  clip
};