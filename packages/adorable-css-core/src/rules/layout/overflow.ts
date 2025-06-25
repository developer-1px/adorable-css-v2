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
  if (!args) return { overflow: 'auto' };
  
  // scroll(x) -> overflow-x: auto
  if (args === 'x') return { 'overflow-x': 'auto' };
  if (args === 'y') return { 'overflow-y': 'auto' };
  
  return { overflow: 'auto' };
};

export const clip: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { overflow: 'hidden' };
  if (args === 'none') return { overflow: 'visible' };
  return { overflow: 'hidden' };
};

export const overflowX: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'overflow-x': 'auto' };
  
  const validValues = ['visible', 'hidden', 'scroll', 'auto', 'clip'];
  if (validValues.includes(args)) {
    return { 'overflow-x': args };
  }
  
  return {};
};

export const overflowY: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'overflow-y': 'auto' };
  
  const validValues = ['visible', 'hidden', 'scroll', 'auto', 'clip'];
  if (validValues.includes(args)) {
    return { 'overflow-y': args };
  }
  
  return {};
};

export const overflowRules = {
  overflow,
  'overflow-x': overflowX,
  'overflow-y': overflowY,
  scroll,
  clip
};