import type { RuleHandler, CSSRule } from '../types';
import { makeValue } from '../../values/makeValue';

// Text fill color utility for gradient text effects
export const textFillColor: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  return {
    '-webkit-text-fill-color': makeValue(value),
  };
};

// Background clip utility
export const bgClip: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  return {
    '-webkit-background-clip': value,
    'background-clip': value,
  };
};