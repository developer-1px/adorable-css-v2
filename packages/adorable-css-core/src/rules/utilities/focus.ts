import type { RuleHandler, KeywordRuleHandler, CSSRule } from '../types';
import { makeColor, px } from '../../values/makeValue';

// Outline utilities
export const outline: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  if (value === 'none') {
    return { outline: 'none' };
  }
  
  // outline(2/blue) format
  if (value.includes('/')) {
    const [width, color] = value.split('/');
    return {
      outline: `${px(width)} solid ${makeColor(color)}`
    };
  }
  
  return { outline: value };
};

// Ring utilities for focus states
export const ring: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  // ring(2/blue) format
  if (value.includes('/')) {
    const [width, color] = value.split('/');
    return {
      'box-shadow': `0 0 0 ${px(width)} ${makeColor(color)}`
    };
  }
  
  // ring(2) - default blue ring
  return {
    'box-shadow': `0 0 0 ${px(value)} rgb(59 130 246 / 0.5)`
  };
};

// Ring offset utilities
export const ringOffset: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  // For simplicity, we'll use a white offset ring
  const offsetWidth = px(value);
  return {
    'box-shadow': `0 0 0 ${offsetWidth} ${makeColor('white')}, var(--ring-shadow, 0 0 #0000)`
  };
};

// Whitespace utilities
export const whitespace: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  const whitespaceMap: Record<string, string> = {
    normal: 'normal',
    nowrap: 'nowrap',
    pre: 'pre',
    'pre-line': 'pre-line',
    'pre-wrap': 'pre-wrap'
  };
  
  return { 'white-space': whitespaceMap[value] || value };
};

export const focusRules = {
  outline,
  ring,
  'ring-offset': ringOffset,
  whitespace
};