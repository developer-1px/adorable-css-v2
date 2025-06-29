import type { CSSRule, RuleHandler } from '../types';
import { px } from '../../core/values/makeValue';
import { isToken, getTokenVar } from '../../design-system/tokens/index';

/**
 * Text utility for text alignment and font size tokens
 * 
 * Usage:
 * - Text alignment: text(center), text(left), text(right), text(justify)
 * - Font size tokens: text(xs), text(sm), text(md), text(lg), text(xl), text(2xl), etc.
 * 
 * Examples:
 * - text(center) → text-align: center
 * - text(lg) → font-size: var(--font-lg)
 * - md:text(xl) → responsive font size
 * - hover:text(2xl) → hover state font size
 */
export const text: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // text(center), text(left), text(right), text(justify)
  if (['left', 'center', 'right', 'justify', 'start', 'end'].includes(args)) {
    return { 'text-align': args };
  }
  
  // Check if it's a font size token (e.g., text(xs), text(lg), text(2xl))
  if (isToken(args, 'font')) {
    return { 'font-size': getTokenVar('font', args) };
  }
  
  return {};
};

// Text shadow: text-shadow(x/y/blur/color)
export const textShadow: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  const parts = value.split('/');
  const x = parts[0] ? px(parts[0]) : '0';
  const y = parts[1] ? px(parts[1]) : '2px';
  const blur = parts[2] ? px(parts[2]) : '4px';
  const color = parts[3] || 'rgba(0,0,0,0.1)';
  
  return { 'text-shadow': `${x} ${y} ${blur} ${color}` };
};