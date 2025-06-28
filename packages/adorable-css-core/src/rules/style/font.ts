import type { CSSRule, RuleHandler } from '../types';
import { px, percentToEm, makeNumber, cssvar, makeClamp, makeRangeClamp, pxWithClamp } from '../../core/values/makeValue';
import { isToken, getTokenVar } from '../../design-system/tokens/index';

export const font: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Check if it's a single token value (e.g., font(sm), font(lg))
  if (isToken(args, 'font')) {
    return { 'font-size': getTokenVar('font', args) };
  }
  
  const parts = args.split('/');
  const result: CSSRule = {};
  
  parts.forEach((part, index) => {
    if (!part || part === '-') return;
    
    // First part - font size (token or value)
    if (index === 0) {
      // Handle explicit clamp syntax: font(clamp(sm,4vw,lg))
      if (part.includes('clamp(')) {
        result['font-size'] = makeClamp(part);
        return;
      }
      
      // Handle triple range syntax: font(sm..4vw..lg) 
      if (part.split('..').length === 3) {
        result['font-size'] = makeRangeClamp(part);
        return;
      }
      
      // Handle double range syntax: font(sm..lg) or font(14px..32px)
      if (part.includes('..')) {
        result['font-size'] = makeRangeClamp(part);
        return;
      }
      
      // Handle single value with clamp support
      if (isToken(part, 'font')) {
        result['font-size'] = getTokenVar('font', part);
      } else {
        result['font-size'] = String(pxWithClamp(part));
      }
      return;
    }
    
    // Second part - line height (number or token)
    if (index === 1) {
      if (['tight', 'normal', 'relaxed', 'loose'].includes(part)) {
        result['line-height'] = getTokenVar('lineHeight', part);
      } else if (+part) {
        result['line-height'] = String(+part < 4 ? makeNumber(+part) : px(part));
      }
      return;
    }
    
    // Third part - letter spacing (percentage, value, or token)
    if (index === 2) {
      if (part.includes('%')) {
        result['letter-spacing'] = String(percentToEm(part));
      } else if (['tight', 'normal', 'wide'].includes(part)) {
        result['letter-spacing'] = getTokenVar('letterSpacing', part);
      } else if (+part || part.includes('px') || part.includes('rem') || part.includes('em')) {
        result['letter-spacing'] = String(px(part));
      } else {
        // Font family name
        result['font-family'] = part;
      }
      return;
    }
    
    // Fourth part and beyond - font family
    if (index >= 3) {
      result['font-family'] = part;
    }
  });
  
  return result;
};

// Font family presets
export const fontFamily: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  const fontMap: Record<string, string> = {
    'sf-mono': "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
    'inter': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    'system': "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    'mono': "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
    'serif': "Georgia, 'Times New Roman', Times, serif"
  };
  
  return { 'font-family': fontMap[value] || value };
};

