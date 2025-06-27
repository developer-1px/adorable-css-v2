import type { CSSRule, RuleHandler } from '../types';
import { isToken, getTokenVar } from '../../design-system/tokens/index';

export const bold: RuleHandler = (value?: string): CSSRule => {
  // If no value provided, default to bold (700)
  if (!value) {
    return { 'font-weight': '700' };
  }
  
  // Check if it's a font-weight token (thin, light, normal, medium, semi, bold, extrabold, black)
  if (isToken(value, 'fontWeight')) {
    return { 'font-weight': getTokenVar('fontWeight', value) };
  }
  
  // Check if it's a numeric font-weight (100-900)
  const numericValue = parseInt(value, 10);
  if (!isNaN(numericValue) && numericValue >= 100 && numericValue <= 900) {
    return { 'font-weight': value };
  }
  
  // If not recognized, return empty
  return {};
};