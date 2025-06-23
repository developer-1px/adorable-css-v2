import type { CSSRule, KeywordRuleHandler } from './types';

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

export const transition: KeywordRuleHandler = () => ({ 
  transition: 'all 0.2s ease' 
});

export const utilityRules = {
  fit,
  fill,
  center,
  pointer,
  'select-none': selectNone,
  transition,
};