import type { RuleHandler, CSSRule } from '../types';
import { makeColor, px } from '../../01-core/values/makeValue';

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

// Ring utilities for focus states - uses border-like syntax
export const ring: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  const parts = value.split('/');
  let width = '2px';
  let offset = '0';
  let color = 'currentColor';
  
  // Parse the values based on the number of parts
  if (parts.length === 1) {
    // ring(2) - just width
    width = px(parts[0]);
  } else if (parts.length === 2) {
    // ring(2/blue) - width/color
    width = px(parts[0]);
    color = makeColor(parts[1]);
  } else if (parts.length === 3) {
    // ring(2/4/blue) - width/offset/color
    width = px(parts[0]);
    offset = px(parts[1]);
    color = makeColor(parts[2]);
  }
  
  // If there's an offset, we need to create two shadows
  if (offset !== '0') {
    // First shadow is the offset (usually white), second is the ring
    return {
      'box-shadow': `0 0 0 ${offset} var(--ring-offset-color, white), 0 0 0 calc(${width} + ${offset}) ${color}`
    };
  }
  
  // No offset, just the ring
  return {
    'box-shadow': `0 0 0 ${width} ${color}`
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