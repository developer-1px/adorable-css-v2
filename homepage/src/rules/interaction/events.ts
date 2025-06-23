import type { CSSRule, RuleHandler, KeywordRuleHandler } from '../types';

// Pointer events
export const pointerEvents: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // pointer-events(none), pointer-events(auto)
  if (args === 'none') return { 'pointer-events': 'none' };
  if (args === 'auto') return { 'pointer-events': 'auto' };
  
  return {};
};

// User select
export const select: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // select(none), select(text), select(all)
  if (['none', 'text', 'all', 'auto'].includes(args)) {
    return { 'user-select': args };
  }
  
  return {};
};

// Resize
export const resize: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { resize: 'both' };
  
  // resize(x), resize(y), resize(none)
  if (['x', 'y', 'none', 'both', 'horizontal', 'vertical'].includes(args)) {
    const value = args === 'x' ? 'horizontal' : args === 'y' ? 'vertical' : args;
    return { resize: value };
  }
  
  return {};
};

// Appearance
export const appearance: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // appearance(none)
  if (args === 'none') return { appearance: 'none' };
  
  return {};
};

// Shortcuts
export const noSelect: KeywordRuleHandler = () => ({ 'user-select': 'none' });
export const noPointer: KeywordRuleHandler = () => ({ 'pointer-events': 'none' });

export const eventRules = {
  'pointer-events': pointerEvents,
  select,
  resize,
  appearance,
  'no-select': noSelect,
  'no-pointer': noPointer
};