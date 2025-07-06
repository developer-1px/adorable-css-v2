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
  
  // Check if it's a single token value (e.g., font(sm), font(lg))
  // Handle 'base' as alias for 'md'
  const tokenName = args === 'base' ? 'md' : args;
  if (isToken(tokenName, 'font')) {
    return { 'font-size': generateFontCalc(tokenName) };
  }
  
  const parts = args.split('/');
  const result: CSSRule = {};
  
  parts.forEach((part, index) => {
    if (!part || part === '-') return;
    
    // First part - font size (token or value) OR font-family keyword
    if (index === 0) {
      // Check if first part is a font-family keyword
      if (fontFamilyKeywords.includes(part)) {
        const familyResult = fontFamily(part);
        Object.assign(result, familyResult);
        return;
      }
      
      // Handle fluid syntax: font(..5xl) - scale up to 5xl
      if (part.startsWith('..') && part.length > 2) {
        let maxToken = part.slice(2);
        // Handle 'base' as alias for 'md'
        if (maxToken === 'base') maxToken = 'md';
        if (isToken(maxToken, 'font')) {
          // Calculate proper clamp using responsive typography formula
          // Assume: min size = 1rem at 320px viewport, max size = token value at 1200px viewport
          const minSize = 1; // 1rem
          const minWidth = 320; // px
          const _maxWidth = 1200; // px
          // We'll use a ratio to estimate max size (02-design_tokens are usually larger)
          const slope = 0.00227; // (2.5 - 1) / (1200 - 320) = 1.5 / 880
          const yIntercept = -minWidth * slope + minSize; // -320 * 0.00227 + 1 = 0.274
          const preferredValue = `${yIntercept.toFixed(3)}rem + ${(slope * 100).toFixed(3)}vw`;
          result['font-size'] = `clamp(${minSize}rem, ${preferredValue}, ${generateFontCalc(maxToken)})`;
        } else {
          // For non-token values
          const maxValue = parseFloat(part.slice(2));
          if (!isNaN(maxValue)) {
            const minValue = Number((maxValue * 0.8).toFixed(3));
            const vwValue = Number((maxValue * 1.6).toFixed(2));
            result['font-size'] = `clamp(${minValue}rem, ${vwValue}vw, ${maxValue}rem)`;
          }
        }
        return;
      }
      
      // Handle fluid syntax: font(3xl..) - scale from 3xl up
      if (part.endsWith('..') && part.length > 2) {
        let minToken = part.slice(0, -2);
        // Handle 'base' as alias for 'md'
        if (minToken === 'base') minToken = 'md';
        if (isToken(minToken, 'font')) {
          // Calculate proper clamp using responsive typography formula
          // Scale from token value to a reasonable max (6rem) between 320px-1200px
          const maxSize = 6; // 6rem
          const minWidth = 320; // px
          const _maxWidth = 1200; // px
          // For scaling up from a token, use a more aggressive slope
          const slope = 0.00568; // (6 - 1) / (1200 - 320) = 5 / 880
          const yIntercept = -minWidth * slope + maxSize; // -320 * 0.00568 + 6 = 4.18
          const preferredValue = `${yIntercept.toFixed(3)}rem + ${(slope * 100).toFixed(3)}vw`;
          result['font-size'] = `clamp(${generateFontCalc(minToken)}, ${preferredValue}, ${maxSize}rem)`;
        } else {
          // For non-token values
          const minValue = parseFloat(part.slice(0, -2));
          if (!isNaN(minValue)) {
            const maxValue = Number((minValue * 1.5).toFixed(3));
            const vwValue = Number((maxValue * 1.2).toFixed(2));
            result['font-size'] = `clamp(${minValue}rem, ${vwValue}vw, ${maxValue}rem)`;
          }
        }
        return;
      }
      
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
      // Handle 'base' as alias for 'md'
      const tokenName = part === 'base' ? 'md' : part;
      if (isToken(tokenName, 'font')) {
        result['font-size'] = generateFontCalc(tokenName);
      } else {
        // Check if it's a font family name first
        const fontFamilyKeywords = ['mono', 'sans', 'serif', 'system', 'inter', 'sf-mono'];
        if (fontFamilyKeywords.includes(part)) {
          const familyResult = fontFamily(part);
          Object.assign(result, familyResult);
        } else if (part.match(/^\d+(\.\d+)?(px|rem|em|%)?$/)) {
          // Only process as font-size if it looks like a valid size value
          result['font-size'] = String(pxWithClamp(part));
        }
        // Otherwise ignore the value (don't set any CSS property)
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
        // Font family name - use fontFamily mapping if available
        const familyResult = fontFamily(part);
        Object.assign(result, familyResult);
      }
      return;
    }
    
    // Fourth part and beyond - font family
    if (index >= 3) {
      const familyResult = fontFamily(part);
      Object.assign(result, familyResult);
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
    'sans': "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    'mono': "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
    'serif': "Georgia, 'Times New Roman', Times, serif"
  };
  
  return { 'font-family': fontMap[value] || value };
};

