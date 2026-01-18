import type { CSSRule, RuleHandler } from '../types';
import { isToken, getTokenVar } from '../../02-design_tokens/design-system/tokens/index';

export const bold: RuleHandler = (v?: string): CSSRule => {
  if (!v) return { 'font-weight': '700' };
  if (isToken(v, 'fontWeight')) return { 'font-weight': getTokenVar('fontWeight', v) };
  const n = parseInt(v, 10);
  return !isNaN(n) && n >= 100 && n <= 900 ? { 'font-weight': v } : {};
};

// Font weight aliases
export const semibold: RuleHandler = (): CSSRule => ({ 'font-weight': '600' });
export const medium: RuleHandler = (): CSSRule => ({ 'font-weight': '500' });
export const light: RuleHandler = (): CSSRule => ({ 'font-weight': '300' });