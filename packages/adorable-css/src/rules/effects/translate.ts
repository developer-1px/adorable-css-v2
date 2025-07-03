import type { CSSRule, RuleHandler } from '../types';
import { makeValue } from '../../core/values/makeValue';

// Individual translate utilities for AdorableCSS v2
// Using CSS native values: translate-x(10px), translate-x(-50%), translate-y(2rem)

export const translateX: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};
  return { transform: `translateX(${makeValue(v)})` };
};

export const translateY: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};
  return { transform: `translateY(${makeValue(v)})` };
};

export const translateZ: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};
  return { transform: `translateZ(${makeValue(v)})` };
};

// 3D translate shorthand
export const translate3d: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};
  const [x = '0', y = '0', z = '0'] = v.split('/').map(makeValue);
  return { transform: `translate3d(${x}, ${y}, ${z})` };
};

export const translateRules = {
  'translate-x': translateX,
  'translate-y': translateY,
  'translate-z': translateZ,
  'translate-3d': translate3d,
};