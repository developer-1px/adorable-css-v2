import type { CSSRule, RuleHandler } from '../types';
import { px, makeColor } from '../../core/values/makeValue';
import { isToken, getTokenVar } from '../../design-system/tokens/index';

export const b: RuleHandler = (args?: string): CSSRule => {
  // b() - 1px border (default)
  if (!args) return { border: '1px solid currentColor' };
  
  // b(/#color) - color only (1px default)
  if (args.startsWith('/')) {
    const color = args.slice(1); // Remove leading slash
    return { border: `1px solid ${String(makeColor(color))}` };
  }
  
  // b(1) - simple border width OR b(gray-200) - color
  if (!args.includes('/')) {
    // Check if it's a number (width)
    if (/^\d+(\.\d+)?$/.test(args)) {
      return { border: `${String(px(args))} solid currentColor` };
    }
    // Otherwise treat as color
    return { border: `1px solid ${String(makeColor(args))}` };
  }
  
  // b(1/#000/solid) - width/color/style
  const parts = args.split('/');
  const width = parts[0] ? String(px(parts[0])) : '1px';
  // Handle color with opacity (e.g., white.1)
  const color = parts[1] ? String(makeColor(parts[1])) : 'currentColor';
  const style = parts[2] || 'solid';
  
  return { border: `${width} ${style} ${color}` };
};

// Border radius
export const r: RuleHandler = (args?: string): CSSRule => {
  // r() - default to medium radius (when args is undefined or empty)
  if (!args || args === '') return { 'border-radius': getTokenVar('radius', 'md') };
  
  // Check for single token value
  if (isToken(args, 'radius')) {
    return { 'border-radius': getTokenVar('radius', args) };
  }
  
  // r(8/0/16/0) - individual corners
  if (args.includes('/')) {
    const corners = args.split('/').map(v => {
      if (isToken(v, 'radius')) {
        return getTokenVar('radius', v);
      }
      return String(px(v || '0'));
    });
    return { 'border-radius': corners.join(' ') };
  }
  
  // r(8) - all corners
  return { 'border-radius': String(px(args)) };
};

// Border sides
export const bt: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (!args.includes('/')) {
    // Check if it's a number (width)
    if (/^\d+(\.\d+)?$/.test(args)) {
      return { 'border-top': `${String(px(args))} solid currentColor` };
    }
    // Otherwise treat as color
    return { 'border-top': `1px solid ${String(makeColor(args))}` };
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
    // Check if it's a number (width)
    if (/^\d+(\.\d+)?$/.test(args)) {
      return { 'border-right': `${String(px(args))} solid currentColor` };
    }
    // Otherwise treat as color
    return { 'border-right': `1px solid ${String(makeColor(args))}` };
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
    // Check if it's a number (width)
    if (/^\d+(\.\d+)?$/.test(args)) {
      return { 'border-bottom': `${String(px(args))} solid currentColor` };
    }
    // Otherwise treat as color
    return { 'border-bottom': `1px solid ${String(makeColor(args))}` };
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
    // Check if it's a number (width)
    if (/^\d+(\.\d+)?$/.test(args)) {
      return { 'border-left': `${String(px(args))} solid currentColor` };
    }
    // Otherwise treat as color
    return { 'border-left': `1px solid ${String(makeColor(args))}` };
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
  
  // Regular border: border(1/solid/#333) or border(1/#333) or border(gray-300)
  if (!args.includes('/')) {
    // Check if it's a number (width)
    if (/^\d+(\.\d+)?$/.test(args)) {
      return { border: `${String(px(args))} solid currentColor` };
    }
    // Otherwise treat as color
    return { border: `1px solid ${String(makeColor(args))}` };
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


// New border-* aliases for better readability
export const borderTop: RuleHandler = bt;
export const borderRight: RuleHandler = br;
export const borderBottom: RuleHandler = bb;
export const borderLeft: RuleHandler = bl;

export const borderRules = {
  b, r, border,
  bt, br, bb, bl,
  'border-top': borderTop,
  'border-right': borderRight,
  'border-bottom': borderBottom,
  'border-left': borderLeft,
  'border-b': borderBottom,
  'border-t': borderTop,
  'border-l': borderLeft,
  'border-r': borderRight
};