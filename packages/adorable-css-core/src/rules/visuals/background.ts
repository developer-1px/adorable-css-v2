import type { CSSRule, RuleHandler } from '../types';
import { makeColor } from '../../values/makeValue';

export const bg: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // bg(transparent)
  if (args === 'transparent') return { 'background-color': 'transparent' };
  
  // bg(current)
  if (args === 'current') return { 'background-color': 'currentColor' };
  
  // bg(#667eea..#764ba2) - simple gradient with .. syntax
  if (args.includes('..')) {
    const [start, end] = args.split('..');
    return { 'background': `linear-gradient(135deg, ${start}, ${end})` };
  }
  
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

// Background opacity utility
export const bgOpacity: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Convert percentage or decimal to opacity value
  let opacity = args;
  if (args.includes('%')) {
    opacity = (parseFloat(args) / 100).toString();
  } else if (parseFloat(args) > 1) {
    opacity = (parseFloat(args) / 100).toString();
  }
  
  return { 
    opacity: opacity
  };
};

export const backgroundRules = {
  bg,
  'bg-opacity': bgOpacity
};