import type { CSSRule, RuleHandler } from '../types';
import { makeColor } from '../../values/makeValue';

export const bg: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // bg(transparent)
  if (args === 'transparent') return { 'background-color': 'transparent' };
  
  // bg(current)
  if (args === 'current') return { 'background-color': 'currentColor' };
  
  // bg(linear/45deg/#f00/#00f) - gradient
  if (args.startsWith('linear/')) {
    const gradientValue = args.replace(/\//g, ' ').replace('linear ', 'linear-gradient(');
    return { 'background': gradientValue + ')' };
  }
  
  // bg(radial/circle/#f00/#00f) - radial gradient
  if (args.startsWith('radial/')) {
    const gradientValue = args.replace(/\//g, ' ').replace('radial ', 'radial-gradient(');
    return { 'background': gradientValue + ')' };
  }
  
  // bg(#fff) or bg(#000.5) - regular colors
  return { 'background-color': String(makeColor(args)) };
};

export const backgroundRules = {
  bg
};