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

const makeRadius = (props: string[]) => (args?: string): CSSRule => {
  const defaults = {
    'border-radius': getTokenVar('radius', 'md'),
    'border-top-left-radius': getTokenVar('radius', 'md'),
    'border-top-right-radius': getTokenVar('radius', 'md'),
    'border-bottom-left-radius': getTokenVar('radius', 'md'),
    'border-bottom-right-radius': getTokenVar('radius', 'md'),
  };

  if (!args) {
    // If no args, use md token for all props
    return props.reduce((acc, p) => ({ ...acc, [p]: getTokenVar('radius', 'md') }), {});
  }

  if (args.includes('/') && props.length === 1 && props[0] === 'border-radius') {
    // Handle r(10/20...) complex syntax for border-radius only
    return { 'border-radius': args.split('/').map(v => isToken(v, 'radius') ? getTokenVar('radius', v) : px(v || '0')).join(' ') };
  }

  const val = isToken(args, 'radius') ? getTokenVar('radius', args) : String(px(args));
  return props.reduce((acc, p) => ({ ...acc, [p]: val }), {});
};

export const r = makeRadius(['border-radius']);
export const rt = makeRadius(['border-top-left-radius', 'border-top-right-radius']);
export const rb = makeRadius(['border-bottom-left-radius', 'border-bottom-right-radius']);
export const rl = makeRadius(['border-top-left-radius', 'border-bottom-left-radius']);
export const rr = makeRadius(['border-top-right-radius', 'border-bottom-right-radius']);
export const rtl = makeRadius(['border-top-left-radius']);
export const rtr = makeRadius(['border-top-right-radius']);
export const rbl = makeRadius(['border-bottom-left-radius']);
export const rbr = makeRadius(['border-bottom-right-radius']);

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
  b, border, bt, br, bb, bl,
  r, rt, rb, rl, rr, rtl, rtr, rbl, rbr,
  'border-top': bt, 'border-right': br, 'border-bottom': bb, 'border-left': bl,
  'border-t': bt, 'border-r': br, 'border-b': bb, 'border-l': bl
};