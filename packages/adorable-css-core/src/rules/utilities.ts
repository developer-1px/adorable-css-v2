import type { CSSRule, KeywordRuleHandler } from './types';
import { transitionRules } from './utilities/transitions';
import { focusRules } from './utilities/focus';
import { transformRules } from './utilities/transforms';

// Additional utilities
export const fit: KeywordRuleHandler = () => ({ 
  width: 'fit-content', 
  height: 'fit-content' 
});

export const fill: KeywordRuleHandler = () => ({ 
  width: '100%', 
  height: '100%' 
});

export const center: KeywordRuleHandler = () => ({ 
  'text-align': 'center' 
});

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
  fit,
  fill,
  center,
  pointer: pointerEvents,
  'select-none': selectNone,
  select,
  transition,
  ...transitionRules,
  ...focusRules,
  ...transformRules
};