import type { CSSRule, RuleHandler } from '../types';
import { px } from '../../core/values/makeValue';

export const text: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // text(center), text(left), text(right), text(justify)
  if (['left', 'center', 'right', 'justify', 'start', 'end'].includes(args)) {
    return { 'text-align': args };
  }
  
  return {};
};

// Text shadow: text-shadow(x/y/blur/color)
export const textShadow: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  const parts = value.split('/');
  const x = parts[0] ? px(parts[0]) : '0';
  const y = parts[1] ? px(parts[1]) : '2px';
  const blur = parts[2] ? px(parts[2]) : '4px';
  const color = parts[3] || 'rgba(0,0,0,0.1)';
  
  return { 'text-shadow': `${x} ${y} ${blur} ${color}` };
};