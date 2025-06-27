import type { CSSRule, RuleHandler } from '../types';
import { makeValue } from '../../core/values/makeValue';

/**
 * Inset utilities - shorthand for top, right, bottom, left
 * inset(0) -> inset: 0
 * inset(1rem) -> inset: 1rem
 * inset(auto) -> inset: auto
 */
export const inset: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { inset: '0' };
  
  return { inset: String(makeValue(args)) };
};

/**
 * Inset X utilities - shorthand for left and right
 * inset-x(0) -> left: 0; right: 0;
 * inset-x(auto) -> left: auto; right: auto;
 */
export const insetX: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { left: '0', right: '0' };
  
  const value = String(makeValue(args));
  return { left: value, right: value };
};

/**
 * Inset Y utilities - shorthand for top and bottom
 * inset-y(0) -> top: 0; bottom: 0;
 * inset-y(auto) -> top: auto; bottom: auto;
 */
export const insetY: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { top: '0', bottom: '0' };
  
  const value = String(makeValue(args));
  return { top: value, bottom: value };
};

export const insetRules = {
  inset,
  'inset-x': insetX,
  'inset-y': insetY,
};