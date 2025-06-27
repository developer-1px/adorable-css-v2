import type { RuleHandler, CSSRule } from '../types';
import { makeValue } from '../../core/values/makeValue';

// Border color shorthand utility
export const bc: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  return {
    'border-color': makeValue(value),
  };
};

// Directional border color utilities
export const btc: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  return {
    'border-top-color': makeValue(value),
  };
};

export const brc: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  return {
    'border-right-color': makeValue(value),
  };
};

export const bbc: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  return {
    'border-bottom-color': makeValue(value),
  };
};

export const blc: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  return {
    'border-left-color': makeValue(value),
  };
};