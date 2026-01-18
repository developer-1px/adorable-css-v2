import type { CSSRule, RuleHandler } from '../types';
import { px, percentToEm, makeNumber, makeClamp, makeRangeClamp, pxWithClamp } from '../../01-core/values/makeValue';
import { isToken, getTokenVar } from '../../02-design_tokens/design-system/tokens/index';
import { generateFontCalc } from '../../02-design_tokens/dynamicTokens';

const aligns = ['left', 'center', 'right', 'justify', 'start', 'end'];
const transforms = ['uppercase', 'lowercase', 'capitalize'];
const decorations = ['underline', 'overline'];

// Helper function for text box layout inspired by Figma
const makeTextBox = (value: string): CSSRule => {
  const values = value.split('+');
  const styles: CSSRule = {};

  values.forEach(v => {
    switch (v) {
      case 'left':
        styles['text-align'] = 'left';
        break;
      case 'center':
        styles['text-align'] = 'center';
        break;
      case 'right':
        styles['text-align'] = 'right';
        break;
      case 'justify':
        styles['text-align'] = 'justify';
        break;
      case 'top':
        styles['display'] = 'flex';
        styles['flex-direction'] = 'column';
        styles['justify-content'] = 'flex-start';
        break;
      case 'middle':
        styles['display'] = 'flex';
        styles['flex-direction'] = 'column';
        styles['justify-content'] = 'center';
        break;
      case 'bottom':
        styles['display'] = 'flex';
        styles['flex-direction'] = 'column';
        styles['justify-content'] = 'flex-end';
        break;
      case 'pack':
        styles['display'] = 'flex';
        styles['flex-direction'] = 'column';
        styles['align-items'] = 'center';
        styles['justify-content'] = 'center';
        styles['text-align'] = 'center';
        break;
    }
  });

  return styles;
};

export const text: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};

  // Check for combined values (e.g., text(center+middle))
  if (v.includes('+') || ['top', 'middle', 'bottom', 'pack'].includes(v)) {
    return makeTextBox(v);
  }

  // Single values
  if (aligns.includes(v)) return { 'text-align': v };
  if (transforms.includes(v)) return { 'text-transform': v };
  if (decorations.includes(v)) return { 'text-decoration': v };

  // White space handling
  if (v === 'nowrap') return { 'white-space': 'nowrap' };
  if (v === 'wrap') return { 'white-space': 'normal' };
  if (v === 'pre') return { 'white-space': 'pre' };
  if (v === 'pre-wrap') return { 'white-space': 'pre-wrap' };
  if (v === 'pre-line') return { 'white-space': 'pre-line' };

  // Font Size Handling (Migrated from font.ts)

  // Check if it's a single token value (e.g., text(sm), text(lg))
  // Handle 'base' as alias for 'md'
  const tokenName = v === 'base' ? 'md' : v;
  if (isToken(tokenName, 'font')) {
    return { 'font-size': generateFontCalc(tokenName) };
  }

  const parts = v.split('/');

  // If it's a composite value like xl/1.5 (size/line-height)
  // or just handling complex size strings
  // or clamp, range, etc.
  if (parts.length > 1 || v.includes('clamp(') || v.includes('..') || v.match(/^\d+(\.\d+)?(px|rem|em|%)?$/)) {
    const result: CSSRule = {};

    parts.forEach((part, index) => {
      if (!part || part === '-') return;

      // First part - font size (token or value)
      if (index === 0) {
        // Handle fluid syntax: text(..5xl) - scale up to 5xl
        if (part.startsWith('..') && part.length > 2) {
          let maxToken = part.slice(2);
          if (maxToken === 'base') maxToken = 'md';

          if (isToken(maxToken, 'font')) {
            const minSize = 1; // 1rem
            const minWidth = 320;
            const slope = 0.00227;
            const yIntercept = -minWidth * slope + minSize;
            const preferredValue = `${yIntercept.toFixed(3)}rem + ${(slope * 100).toFixed(3)}vw`;
            result['font-size'] = `clamp(${minSize}rem, ${preferredValue}, ${generateFontCalc(maxToken)})`;
          } else {
            const maxValue = parseFloat(part.slice(2));
            if (!isNaN(maxValue)) {
              const minValue = Number((maxValue * 0.8).toFixed(3));
              const vwValue = Number((maxValue * 1.6).toFixed(2));
              result['font-size'] = `clamp(${minValue}rem, ${vwValue}vw, ${maxValue}rem)`;
            }
          }
          return;
        }

        // Handle fluid syntax: text(3xl..) - scale from 3xl up
        if (part.endsWith('..') && part.length > 2) {
          let minToken = part.slice(0, -2);
          if (minToken === 'base') minToken = 'md';

          if (isToken(minToken, 'font')) {
            const maxSize = 6; // 6rem
            const minWidth = 320;
            const slope = 0.00568;
            const yIntercept = -minWidth * slope + maxSize;
            const preferredValue = `${yIntercept.toFixed(3)}rem + ${(slope * 100).toFixed(3)}vw`;
            result['font-size'] = `clamp(${generateFontCalc(minToken)}, ${preferredValue}, ${maxSize}rem)`;
          } else {
            const minValue = parseFloat(part.slice(0, -2));
            if (!isNaN(minValue)) {
              const maxValue = Number((minValue * 1.5).toFixed(3));
              const vwValue = Number((maxValue * 1.2).toFixed(2));
              result['font-size'] = `clamp(${minValue}rem, ${vwValue}vw, ${maxValue}rem)`;
            }
          }
          return;
        }

        // Handle explicit clamp syntax: text(clamp(sm,4vw,lg))
        if (part.includes('clamp(')) {
          result['font-size'] = makeClamp(part);
          return;
        }

        // Handle triple range syntax: text(sm..4vw..lg) 
        if (part.split('..').length === 3) {
          result['font-size'] = makeRangeClamp(part);
          return;
        }

        // Handle double range syntax: text(sm..lg) or text(14px..32px)
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
          if (part.match(/^\d+(\.\d+)?(px|rem|em|%)?$/)) {
            // Only process as font-size if it looks like a valid size value
            result['font-size'] = String(pxWithClamp(part));
          }
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
        }
        return;
      }
    });

    return result;
  }

  return {};
};

export const textShadow: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};
  const [x = '0', y = '2px', b = '4px', c = 'rgba(0,0,0,0.1)'] = v.split('/');
  return { 'text-shadow': `${px(x)} ${px(y)} ${px(b)} ${c}` };
};