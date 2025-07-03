import type { CSSRule, RuleHandler } from '../types';
import { isToken, getTokenVar } from '../../design-system/tokens/index';

export const bold: RuleHandler = (v?: string): CSSRule => {
  if (!v) return { 'font-weight': '700' };
  if (isToken(v, 'fontWeight')) return { 'font-weight': getTokenVar('fontWeight', v) };
  const n = parseInt(v, 10);
  return !isNaN(n) && n >= 100 && n <= 900 ? { 'font-weight': v } : {};
};