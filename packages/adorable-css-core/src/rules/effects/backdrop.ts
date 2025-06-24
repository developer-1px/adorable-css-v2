import { CSSRule, RuleHandler } from '../../types';

/**
 * Backdrop filter utilities
 * backdrop-blur(sm) -> backdrop-filter: blur(4px)
 * backdrop-blur(md) -> backdrop-filter: blur(8px)
 * backdrop-blur(lg) -> backdrop-filter: blur(16px)
 */
export const backdropBlur: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'backdrop-filter': 'blur(8px)' };
  
  const blurValues: Record<string, string> = {
    'none': 'blur(0)',
    'xs': 'blur(2px)',
    'sm': 'blur(4px)',
    'md': 'blur(8px)',
    'lg': 'blur(16px)',
    'xl': 'blur(24px)',
    '2xl': 'blur(40px)',
    '3xl': 'blur(64px)',
  };
  
  // Handle numeric values
  if (!isNaN(Number(args))) {
    return { 'backdrop-filter': `blur(${args}px)` };
  }
  
  // Handle predefined values
  const blurValue = blurValues[args];
  if (blurValue) {
    return { 'backdrop-filter': blurValue };
  }
  
  return { 'backdrop-filter': `blur(${args})` };
};

/**
 * Backdrop saturation utilities
 * backdrop-saturate(150) -> backdrop-filter: saturate(1.5)
 */
export const backdropSaturate: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'backdrop-filter': 'saturate(1)' };
  
  const value = Number(args);
  if (!isNaN(value)) {
    const saturateValue = value > 1 ? value / 100 : value;
    return { 'backdrop-filter': `saturate(${saturateValue})` };
  }
  
  return { 'backdrop-filter': `saturate(${args})` };
};

/**
 * Backdrop brightness utilities
 * backdrop-brightness(110) -> backdrop-filter: brightness(1.1)
 */
export const backdropBrightness: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'backdrop-filter': 'brightness(1)' };
  
  const value = Number(args);
  if (!isNaN(value)) {
    const brightnessValue = value > 1 ? value / 100 : value;
    return { 'backdrop-filter': `brightness(${brightnessValue})` };
  }
  
  return { 'backdrop-filter': `brightness(${args})` };
};

export const backdropRules = {
  'backdrop-blur': backdropBlur,
  'backdrop-saturate': backdropSaturate,
  'backdrop-brightness': backdropBrightness,
};