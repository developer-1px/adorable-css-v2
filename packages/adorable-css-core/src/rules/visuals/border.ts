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

// Directional border: border(top/1/#333)
export const border: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { border: '1px solid currentColor' };
  
  const parts = args.split('/');
  const directions = ['top', 'right', 'bottom', 'left'];
  
  if (directions.includes(parts[0])) {
    const direction = parts[0];
    const remainingParts = parts.slice(1);
    
    if (remainingParts.length === 0) {
      return { [`border-${direction}`]: '1px solid currentColor' };
    } else if (remainingParts.length === 1) {
      return { [`border-${direction}`]: `${px(remainingParts[0])} solid currentColor` };
    } else if (remainingParts.length === 2) {
      const width = px(remainingParts[0]);
      const second = remainingParts[1];
      const borderStyles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
      if (borderStyles.includes(second)) {
        return { [`border-${direction}`]: `${width} ${second} currentColor` };
      } else {
        return { [`border-${direction}`]: `${width} solid ${makeColor(second)}` };
      }
    } else {
      const width = px(remainingParts[0]);
      const style = remainingParts[1] || 'solid';
      const color = remainingParts[2] ? makeColor(remainingParts[2]) : 'currentColor';
      return { [`border-${direction}`]: `${width} ${style} ${color}` };
    }
  }
  
  // Regular border: border(1/solid/#333) or border(1/#333)
  if (!args.includes('/')) {
    return { border: `${String(px(args))} solid currentColor` };
  }
  
  const width = parts[0] ? String(px(parts[0])) : '1px';
  // Check if second part is a style or color
  const borderStyles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
  if (parts.length === 2) {
    if (borderStyles.includes(parts[1])) {
      return { border: `${width} ${parts[1]} currentColor` };
    } else {
      // It's a color
      return { border: `${width} solid ${makeColor(parts[1])}` };
    }
  } else {
    // width/style/color
    const style = parts[1] || 'solid';
    const color = parts[2] ? String(makeColor(parts[2])) : 'currentColor';
    return { border: `${width} ${style} ${color}` };
  }
};

export const borderRules = {
  b, r, border,
  bt, br, bb, bl
};