import type { CSSRule, RuleHandler } from "../types";
import { px } from '../../core/values/makeValue';

export const opacity: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  return { opacity: value };
};

const makeFilterRule =
  (
    name: "blur" | "brightness" | "contrast" | "saturate" | "sepia"
  ): RuleHandler =>
  (value?: string): CSSRule => {
    if (!value) return { filter: `${name}()` };
    const cssValue = name === "blur" ? px(value) : value;
    return { filter: `${name}(${cssValue})` };
  };

export const blur = makeFilterRule("blur");
export const brightness = makeFilterRule("brightness");
export const contrast = makeFilterRule("contrast");
export const saturate = makeFilterRule("saturate");
export const sepia = makeFilterRule("sepia");

// Backdrop filter
export const backdrop: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  if (value.startsWith('blur/')) {
    const blurValue = value.split('/')[1];
    return { 'backdrop-filter': `blur(${px(blurValue)})` };
  }
  
  return { 'backdrop-filter': value };
};

export const effectRules = {
  opacity,
  blur,
  brightness,
  contrast,
  saturate,
  sepia,
  backdrop,
};
