import type { CSSRule, KeywordRuleHandler } from '../types';
import { transitionRules } from '../interaction/transitions';
import { focusRules } from '../interaction/focus';
import { transformRules } from '../effects/transforms';

export const pointer: KeywordRuleHandler = () => ({ cursor: 'pointer' });
export const selectNone: KeywordRuleHandler = () => ({ 'user-select': 'none' });
export const select = (v?: string): CSSRule => v ? { 'user-select': v } : {};
export const pointerEvents = (v?: string): CSSRule => v ? { 'pointer-events': v } : {};
export const transition: KeywordRuleHandler = () => ({ transition: 'all 0.2s ease' });

export const utilityRules = {
  pointer: pointerEvents,
  'select-none': selectNone,
  select,
  transition,
  ...transitionRules,
  ...focusRules,
  ...transformRules
};