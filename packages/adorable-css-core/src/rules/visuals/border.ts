import type { CSSRule, RuleHandler } from '../types';
import { px, makeColor } from '../../values/makeValue';

export const b: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // b(1) - simple border width
  if (!args.includes('/')) {
    return { border: `${String(px(args))} solid currentColor` };
  }
  
  // b(1/#000/solid) - width/color/style
  const parts = args.split('/');
  const width = parts[0] ? String(px(parts[0])) : '1px';
  const color = parts[1] ? String(makeColor(parts[1])) : 'currentColor';
  const style = parts[2] || 'solid';
  
  return { border: `${width} ${style} ${color}` };
};

// Border radius
export const r: RuleHandler = (args?: string): CSSRule => {
  // r() - fully rounded (when args is undefined or empty)
  if (!args || args === '') return { 'border-radius': '9999px' };
  
  // r(8/0/16/0) - individual corners
  if (args.includes('/')) {
    const corners = args.split('/').map(v => String(px(v || '0')));
    return { 'border-radius': corners.join(' ') };
  }
  
  // r(8) - all corners
  return { 'border-radius': String(px(args)) };
};

// Border sides
export const bt: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (!args.includes('/')) {
    return { 'border-top': `${String(px(args))} solid currentColor` };
  }
  
  const parts = args.split('/');
  const width = parts[0] ? String(px(parts[0])) : '1px';
  const color = parts[1] ? String(makeColor(parts[1])) : 'currentColor';
  const style = parts[2] || 'solid';
  
  return { 'border-top': `${width} ${style} ${color}` };
};

export const br: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (!args.includes('/')) {
    return { 'border-right': `${String(px(args))} solid currentColor` };
  }
  
  const parts = args.split('/');
  const width = parts[0] ? String(px(parts[0])) : '1px';
  const color = parts[1] ? String(makeColor(parts[1])) : 'currentColor';
  const style = parts[2] || 'solid';
  
  return { 'border-right': `${width} ${style} ${color}` };
};

export const bb: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (!args.includes('/')) {
    return { 'border-bottom': `${String(px(args))} solid currentColor` };
  }
  
  const parts = args.split('/');
  const width = parts[0] ? String(px(parts[0])) : '1px';
  const color = parts[1] ? String(makeColor(parts[1])) : 'currentColor';
  const style = parts[2] || 'solid';
  
  return { 'border-bottom': `${width} ${style} ${color}` };
};

export const bl: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (!args.includes('/')) {
    return { 'border-left': `${String(px(args))} solid currentColor` };
  }
  
  const parts = args.split('/');
  const width = parts[0] ? String(px(parts[0])) : '1px';
  const color = parts[1] ? String(makeColor(parts[1])) : 'currentColor';
  const style = parts[2] || 'solid';
  
  return { 'border-left': `${width} ${style} ${color}` };
};

export const borderRules = {
  b, r,
  bt, br, bb, bl
};