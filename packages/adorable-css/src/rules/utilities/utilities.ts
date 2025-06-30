import type { CSSRule, KeywordRuleHandler } from '../types';
import { transitionRules } from '../interaction/transitions';
import { focusRules } from '../interaction/focus';
import { transformRules } from '../effects/transforms';

export const pointer: KeywordRuleHandler = () => ({
  cursor: 'pointer' 
});

export const selectNone: KeywordRuleHandler = () => ({ 
  'user-select': 'none' 
});

export const select = (value?: string): CSSRule => {
  if (!value) return {};
  return { 'user-select': value };
};

export const pointerEvents = (value?: string): CSSRule => {
  if (!value) return {};
  return { 'pointer-events': value };
};

export const transition: KeywordRuleHandler = () => ({ 
  transition: 'all 0.2s ease' 
});

export const utilityRules = {
  pointer: pointerEvents,
  'select-none': selectNone,
  select,
  transition,
  ...transitionRules,
  ...focusRules,
  ...transformRules
};