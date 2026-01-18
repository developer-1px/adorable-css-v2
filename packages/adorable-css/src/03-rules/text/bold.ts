import type { CSSRule, RuleHandler } from '../types';
import { isToken, getTokenVar } from '../../02-design_tokens/design-system/tokens/index';

export const bold: RuleHandler = (v?: string): CSSRule => {
  if (!v) return { 'font-weight': '700' };
  if (isToken(v, 'fontWeight')) return { 'font-weight': getTokenVar('fontWeight', v) };
  const n = parseInt(v, 10);
  return !isNaN(n) && n >= 100 && n <= 900 ? { 'font-weight': v } : {};
};

// Font weight aliases
export const thin: RuleHandler = (): CSSRule => ({ 'font-weight': '100' });
export const extraLight: RuleHandler = (): CSSRule => ({ 'font-weight': '200' });
export const light: RuleHandler = (): CSSRule => ({ 'font-weight': '300' });
export const regular: RuleHandler = (): CSSRule => ({ 'font-weight': '400' });
export const medium: RuleHandler = (): CSSRule => ({ 'font-weight': '500' });
export const semibold: RuleHandler = (): CSSRule => ({ 'font-weight': '600' });
export const extraBold: RuleHandler = (): CSSRule => ({ 'font-weight': '800' });
export const heavy: RuleHandler = (): CSSRule => ({ 'font-weight': '900' });
export const black = heavy;

// Legacy/Alternative aliases
export const demilight = extraLight;

// Numeric weights (100-900)
export const w100: RuleHandler = (): CSSRule => ({ 'font-weight': '100' });
export const w200: RuleHandler = (): CSSRule => ({ 'font-weight': '200' });
export const w300: RuleHandler = (): CSSRule => ({ 'font-weight': '300' });
export const w400: RuleHandler = (): CSSRule => ({ 'font-weight': '400' });
export const w500: RuleHandler = (): CSSRule => ({ 'font-weight': '500' });
export const w600: RuleHandler = (): CSSRule => ({ 'font-weight': '600' });
export const w700: RuleHandler = (): CSSRule => ({ 'font-weight': '700' });
export const w800: RuleHandler = (): CSSRule => ({ 'font-weight': '800' });
export const w900: RuleHandler = (): CSSRule => ({ 'font-weight': '900' });

export const fontWeightRules = {
  thin,
  'extra-light': extraLight,
  light,
  regular,
  medium,
  semibold,
  'extra-bold': extraBold,
  heavy,
  black,

  // Legacy
  demilight,

  // Numerics
  '100': w100,
  '200': w200,
  '300': w300,
  '400': w400,
  '500': w500,
  '600': w600,
  '700': w700,
  '800': w800,
  '900': w900,
};