import type { CSSRule, RuleHandler } from '../types';
import { px } from '../../values/makeValue';

// Width utilities
export const w: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // w(fill) - expand to fill available space
  if (args === 'fill') return { width: '100%' };
  
  // w(hug) - shrink to fit content
  if (args === 'hug') return { width: 'fit-content' };
  
  // w(auto)
  if (args === 'auto') return { width: 'auto' };
  
  // w(screen) - viewport width
  if (args === 'screen') return { width: '100vw' };
  
  // w(300) or w(50%)
  return { width: String(px(args)) };
};

// Height utilities
export const h: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // h(fill) - expand to fill available space
  if (args === 'fill') return { height: '100%' };
  
  // h(hug) - shrink to fit content
  if (args === 'hug') return { height: 'fit-content' };
  
  // h(auto)
  if (args === 'auto') return { height: 'auto' };
  
  // h(screen) - viewport height
  if (args === 'screen') return { height: '100vh' };
  
  // h(200) or h(50%)
  return { height: String(px(args)) };
};

export const sizeRules = {
  w,
  h
};