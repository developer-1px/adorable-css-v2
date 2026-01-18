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

  // For backward compatibility during migration, we could forward to text() logic if it looks like a size
  // But strictly per request, font() should be family only or eventually deprecated/merged.
  // Given we are "fixing" the mental model, let's keep font() for family only.

  return {};
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

