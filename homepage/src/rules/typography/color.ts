import type { CSSRule, RuleHandler } from '../types';
import { makeColor } from '../../values/makeValue';

export const c: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (args === 'current') return { color: 'currentColor' };
  
  if (args.startsWith('linear-gradient') || args.startsWith('radial-gradient')) {
    return {
      'background': args.replace(/\//g, ' '),
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent'
    };
  }
  
  return { color: String(makeColor(args)) };
};