import type { CSSRule, RuleHandler } from '../types';
import { px, percentToEm, makeNumber, makeClamp, makeRangeClamp, pxWithClamp } from '../../01-core/values/makeValue';
import { isToken, getTokenVar } from '../../02-design_tokens/design-system/tokens/index';
import { generateFontCalc } from '../../02-design_tokens/dynamicTokens';

export const font: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};

  // Check if it's a single font-family keyword (mono, sans, serif, etc.)
  const fontFamilyKeywords = ['mono', 'sans', 'serif', 'system', 'inter', 'sf-mono'];
  if (fontFamilyKeywords.includes(args)) {
    return fontFamily(args);
  }

  // Support font weights (bold, medium, etc.) via font() for consistency
  const weightKeywords = ['bold', 'semibold', 'medium', 'light', 'normal'];
  if (weightKeywords.includes(args)) {
    const weightMap: Record<string, string> = {
      bold: '700',
      semibold: '600',
      medium: '500',
      normal: '400',
      light: '300'
    };
    return { 'font-weight': weightMap[args] };
  }

  // Support arbitrary font family string
  return { 'font-family': args };
};

// Font family presets
export const fontFamily: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};

  const fontMap: Record<string, string> = {
    'sf-mono': "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
    'inter': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    'system': "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    'sans': "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    'mono': "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
    'serif': "Georgia, 'Times New Roman', Times, serif"
  };

  return { 'font-family': fontMap[value] || value };
};

