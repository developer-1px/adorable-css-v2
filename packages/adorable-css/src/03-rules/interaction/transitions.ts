import type { RuleHandler, KeywordRuleHandler, CSSRule } from '../types';

// Duration utilities
export const duration: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};

  // Handle numeric values (including negative)
  // Support numeric-only (e.g. 200) or ms suffix (e.g. 200ms)
  const numericMatch = value.match(/^(-?\d+(\.\d+)?)(ms)?$/);
  if (numericMatch) {
    const numericValue = parseFloat(numericMatch[1]);

    // CSS transition-duration cannot be negative, use 0 instead
    if (numericValue < 0) {
      return { 'transition-duration': '0ms' };
    }

    return { 'transition-duration': `${numericValue}ms` };
  }

  // Handle predefined duration keywords
  const durationMap: Record<string, string> = {
    'fast': '100ms',
    'normal': '150ms',
    'slow': '300ms',
    'slower': '500ms'
  };

  return { 'transition-duration': durationMap[value] || value };
};

// Timing function utilities
export const ease: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};

  const easingMap: Record<string, string> = {
    linear: 'linear',
    in: 'ease-in',
    out: 'ease-out',
    'in-out': 'ease-in-out'
  };

  return { 'transition-timing-function': easingMap[value] || value };
};

// Transition property utilities
export const transitionTransform: KeywordRuleHandler = () => ({
  'transition-property': 'transform',
  'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'transition-duration': '150ms'
});

export const transitionColors: KeywordRuleHandler = () => ({
  'transition-property': 'color, background-color, border-color, text-decoration-color, fill, stroke',
  'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'transition-duration': '150ms'
});

export const transitionAll: KeywordRuleHandler = () => ({
  'transition-property': 'all',
  'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'transition-duration': '150ms'
});

export const transitionRules = {
  duration,
  ease,
  'transition-transform': transitionTransform,
  'transition-colors': transitionColors,
  'transition-all': transitionAll
};