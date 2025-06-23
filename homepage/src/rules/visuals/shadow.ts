import type { CSSRule, RuleHandler, KeywordRuleHandler } from '../types';
import { px, makeColor } from '../../values/makeValue';

export const shadow: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // shadow(md) - predefined shadows
  if (args === 'sm') return { 'box-shadow': '0 1px 2px 0 rgb(0 0 0 / 0.05)' };
  if (args === 'md') return { 'box-shadow': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' };
  if (args === 'lg') return { 'box-shadow': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' };
  if (args === 'xl') return { 'box-shadow': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' };
  if (args === 'none') return { 'box-shadow': 'none' };
  
  // shadow(0/4/16/#000.1) - custom shadow
  if (args.includes('/')) {
    const parts = args.split('/');
    const x = parts[0] ? String(px(parts[0])) : '0';
    const y = parts[1] ? String(px(parts[1])) : '0';
    const blur = parts[2] ? String(px(parts[2])) : '0';
    const color = parts[3] ? String(makeColor(parts[3])) : 'rgb(0 0 0 / 0.1)';
    
    return { 'box-shadow': `${x} ${y} ${blur} ${color}` };
  }
  
  return {};
};

// Opacity
export const opacity: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // opacity(.5) or opacity(50)
  const value = args.startsWith('.') ? args : (+args > 1 ? (+args / 100).toString() : args);
  return { opacity: value };
};

export const shadowRules = {
  shadow,
  opacity
};