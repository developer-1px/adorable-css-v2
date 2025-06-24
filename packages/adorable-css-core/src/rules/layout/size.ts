import type { CSSRule, RuleHandler } from '../types';
import { px } from '../../values/makeValue';
import { isToken, getTokenVar } from '../../tokens';

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
  
  // Check for size tokens
  if (isToken(args, 'size')) {
    return { width: getTokenVar('size', args) };
  }
  
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
  
  // Check for size tokens
  if (isToken(args, 'size')) {
    return { height: getTokenVar('size', args) };
  }
  
  // h(200) or h(50%)
  return { height: String(px(args)) };
};

// Min-width utilities
export const minW: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (args === 'screen') return { 'min-width': '100vw' };
  if (args === 'full') return { 'min-width': '100%' };
  
  // Check for size tokens
  if (isToken(args, 'size')) {
    return { 'min-width': getTokenVar('size', args) };
  }
  
  return { 'min-width': String(px(args)) };
};

// Max-width utilities
export const maxW: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (args === 'screen') return { 'max-width': '100vw' };
  if (args === 'full') return { 'max-width': '100%' };
  if (args === 'none') return { 'max-width': 'none' };
  
  // Check for size tokens
  if (isToken(args, 'size')) {
    return { 'max-width': getTokenVar('size', args) };
  }
  
  return { 'max-width': String(px(args)) };
};

// Min-height utilities
export const minH: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (args === 'screen') return { 'min-height': '100vh' };
  if (args === 'full') return { 'min-height': '100%' };
  
  // Check for size tokens
  if (isToken(args, 'size')) {
    return { 'min-height': getTokenVar('size', args) };
  }
  
  return { 'min-height': String(px(args)) };
};

// Max-height utilities
export const maxH: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (args === 'screen') return { 'max-height': '100vh' };
  if (args === 'full') return { 'max-height': '100%' };
  if (args === 'none') return { 'max-height': 'none' };
  
  // Check for size tokens
  if (isToken(args, 'size')) {
    return { 'max-height': getTokenVar('size', args) };
  }
  
  return { 'max-height': String(px(args)) };
};

export const sizeRules = {
  w,
  h,
  'min-w': minW,
  'max-w': maxW,
  'min-h': minH,
  'max-h': maxH
};