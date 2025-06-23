import type { CSSRule, RuleHandler } from '../types';

export const text: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // text(center), text(left), text(right), text(justify)
  if (['left', 'center', 'right', 'justify', 'start', 'end'].includes(args)) {
    return { 'text-align': args };
  }
  
  return {};
};