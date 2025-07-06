import type { CSSRule, RuleHandler } from '../types';

// Value transformers
const percentageToDecimal = (v: number): string => String(v > 1 ? v / 100 : v);
const toPixels = (v: number): string => `${v}px`;
const toDegrees = (v: number): string => `${v}deg`;

// Common backdrop filter creator
const createBackdropFilter = (
  filterType: string,
  defaultValue: string,
  valueTransformer?: (value: number) => string,
  presetValues?: Record<string, string>
): RuleHandler => (args?: string): CSSRule => {
  if (!args) return { 'backdrop-filter': `${filterType}(${defaultValue})` };
  if (presetValues?.[args]) return { 'backdrop-filter': presetValues[args] };
  const numValue = Number(args);
  return { 'backdrop-filter': `${filterType}(${!isNaN(numValue) && valueTransformer ? valueTransformer(numValue) : args})` };
};

// Blur presets
const blurPresets: Record<string, string> = {
  'none': 'blur(0)',
  'xs': 'blur(2px)',
  'sm': 'blur(4px)',
  'md': 'blur(8px)',
  'lg': 'blur(16px)',
  'xl': 'blur(24px)',
  '2xl': 'blur(40px)',
  '3xl': 'blur(64px)',
};

// Backdrop filters
export const backdropBlur = createBackdropFilter('blur', '8px', toPixels, blurPresets);
export const backdropSaturate = createBackdropFilter('saturate', '1', percentageToDecimal);
export const backdropBrightness = createBackdropFilter('brightness', '1', percentageToDecimal);
export const backdropContrast = createBackdropFilter('contrast', '1', percentageToDecimal);
export const backdropGrayscale = createBackdropFilter('grayscale', '1', percentageToDecimal);
export const backdropHueRotate = createBackdropFilter('hue-rotate', '0deg', toDegrees);
export const backdropInvert = createBackdropFilter('invert', '1', percentageToDecimal);
export const backdropOpacity = createBackdropFilter('opacity', '1', percentageToDecimal);
export const backdropSepia = createBackdropFilter('sepia', '1', percentageToDecimal);

export const backdropRules = {
  'backdrop-blur': backdropBlur,
  'backdrop-saturate': backdropSaturate,
  'backdrop-brightness': backdropBrightness,
  'backdrop-contrast': backdropContrast,
  'backdrop-grayscale': backdropGrayscale,
  'backdrop-hue-rotate': backdropHueRotate,
  'backdrop-invert': backdropInvert,
  'backdrop-opacity': backdropOpacity,
  'backdrop-sepia': backdropSepia,
};