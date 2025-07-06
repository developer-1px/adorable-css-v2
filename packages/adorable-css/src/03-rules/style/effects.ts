import type { CSSRule, RuleHandler } from "../types";
import { px } from '../../01-core/values/makeValue';

const filter = (n: string, unit?: boolean): RuleHandler => (v?: string): CSSRule => 
  ({ filter: `${n}(${v ? (unit ? px(v) : v) : ''})` });

export const opacity: RuleHandler = (v?: string): CSSRule => v ? { opacity: v } : {};
export const blur = filter('blur', true);
export const brightness = filter('brightness');
export const contrast = filter('contrast');
export const saturate = filter('saturate');
export const sepia = filter('sepia');

export const backdrop: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};
  const [type, val] = v.split('/');
  return { 'backdrop-filter': type === 'blur' && val ? `blur(${px(val)})` : v };
};

export const effectRules = { opacity, blur, brightness, contrast, saturate, sepia, backdrop };