import type { RuleHandler, CSSRule } from '../types';
import { makeValue } from '../../core/values/makeValue';

// Scroll margin utilities
export const scrollMt: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  return {
    'scroll-margin-top': makeValue(value),
  };
};

export const scrollMb: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  return {
    'scroll-margin-bottom': makeValue(value),
  };
};

export const scrollMl: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  return {
    'scroll-margin-left': makeValue(value),
  };
};

export const scrollMr: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  return {
    'scroll-margin-right': makeValue(value),
  };
};

export const scrollM: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  return {
    'scroll-margin': makeValue(value),
  };
};