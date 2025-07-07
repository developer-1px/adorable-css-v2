import type { CSSRule, KeywordRuleHandler } from '../types';
import { transitionRules } from '../interaction/transitions';
import { focusRules } from '../interaction/focus';
import { transformRules } from '../effects/transforms';

export const pointer: KeywordRuleHandler = () => ({ cursor: 'pointer' });
export const selectNone: KeywordRuleHandler = () => ({ 'user-select': 'none' });
export const select = (v?: string): CSSRule => v ? { 'user-select': v } : {};
export const pointerEvents = (v?: string): CSSRule => v ? { 'pointer-events': v } : {};
export const transition: KeywordRuleHandler = () => ({ transition: 'all 0.2s ease' });
export const scrollBehavior = (v?: string): CSSRule => v ? { 'scroll-behavior': v } : {};
export const scrollSnap = (v?: string): CSSRule => v ? { 'scroll-snap-align': v } : {};
export const aspectRatio = (v?: string): CSSRule => {
  if (!v) return {};
  // Handle ratio format like "16:9" or single values like "auto", "1"
  if (v.includes(':')) {
    const [w, h] = v.split(':');
    return { 'aspect-ratio': `${w} / ${h}` };
  }
  return { 'aspect-ratio': v };
};
export const float = (v?: string): CSSRule => v ? { float: v } : {};
export const isolation = (v?: string): CSSRule => v ? { isolation: v } : {};
export const objectFit = (v?: string): CSSRule => v ? { 'object-fit': v } : {};
export const objectPosition = (v?: string): CSSRule => v ? { 'object-position': v } : {};

export const utilityRules = {
  pointer: pointerEvents,
  'select-none': selectNone,
  select,
  transition,
  scrollBehavior,
  scrollSnap,
  aspectRatio,
  float,
  isolation,
  objectFit,
  objectPosition,
  ...transitionRules,
  ...focusRules,
  ...transformRules
};