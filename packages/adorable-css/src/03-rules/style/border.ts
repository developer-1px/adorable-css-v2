import type { CSSRule, RuleHandler } from '../types';
import { px, makeColor } from '../../01-core/values/makeValue';
import { isToken, getTokenVar } from '../../02-design_tokens/design-system/tokens/index';

const borderStyles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];

// Parse border: "1" | "red" | "1/red" | "1/solid/red"
const parseBorder = (args: string): string => {
  if (!args.includes('/')) {
    if (borderStyles.includes(args)) return args;
    // Allow units in width (1, 1px, 1rem, 100%)
    return /^\d+(\.\d+)?(px|rem|em|%)?$/.test(args) ? `${px(args)} solid currentColor` : `1px solid ${makeColor(args)}`;
  }
  const [w, s, c] = args.split('/');
  const width = w ? px(w) : '1px';
  if (!s) return `${width} solid currentColor`;
  return borderStyles.includes(s) ? `${width} ${s} ${c ? makeColor(c) : 'currentColor'}` : `${width} solid ${makeColor(s)}`;
};

// Handlers
export const b: RuleHandler = (args?: string): CSSRule => !args ? { border: '1px solid currentColor' } : args.startsWith('/') ? { border: `1px solid ${makeColor(args.slice(1))}` } : { border: parseBorder(args) };

export const r: RuleHandler = (args?: string): CSSRule => ({ 'border-radius': !args ? getTokenVar('radius', 'md') : isToken(args, 'radius') ? getTokenVar('radius', args) : args.includes('/') ? args.split('/').map(v => isToken(v, 'radius') ? getTokenVar('radius', v) : px(v || '0')).join(' ') : px(args) });

const side = (s: string): RuleHandler => (args?: string): CSSRule => args ? { [`border-${s}`]: parseBorder(args) } : {};

export const bt = side('top');
export const br = side('right');
export const bb = side('bottom');
export const bl = side('left');

export const border: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { border: '1px solid currentColor' };

  // Handle border-style values (dashed, solid, etc) directly
  if (borderStyles.includes(args) || args === 'none') {
    return { 'border-style': args };
  }

  const [dir, ...rest] = args.split('/');
  return ['top', 'right', 'bottom', 'left'].includes(dir) ? side(dir)(rest.join('/')) : { border: parseBorder(args) };
};

export const borderRules = {
  b, r, border, bt, br, bb, bl,
  'border-top': bt, 'border-right': br, 'border-bottom': bb, 'border-left': bl,
  'border-t': bt, 'border-r': br, 'border-b': bb, 'border-l': bl
};