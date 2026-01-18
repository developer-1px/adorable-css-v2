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

  // 1. Text Alignment (User Spec: text(left), text(center)...)
  const aligns = ['left', 'center', 'right', 'justify', 'start', 'end'];
  if (aligns.includes(v)) return { 'text-align': v };

  // 2. Vertical Alignment in Flexbox (User Spec: text(top) -> align-items: flex-start)
  // text(top), text(middle), text(bottom)
  if (v === 'top') return { 'align-items': 'flex-start' };
  if (v === 'middle') return { 'align-items': 'center' };
  if (v === 'bottom') return { 'align-items': 'flex-end' };
  if (v === 'baseline') return { 'align-items': 'baseline' };

  // 3. Text Decoration (User Spec implicitly separates simple ones, but let's support legacy text(...) if needed? 
  // actually User Spec says 'underline', 'strike' are top-level properties in "Text Decoration" section.
  // But 'text(left)' is explicitly under 'Text Alignment'.
  // So 'text()' primarily handles alignment and vertical alignment in this spec.

  // However, User Spec Typography section shows:
  // text(left)
  // ...
  // underline (as separate prop)
  //
  // So I will NOT include underline/transform in text() unless explicitly requested. 
  // Wait, legacy AdorableCSS often did. The user spec lists 'uppercase', 'lowercase' as top level. 
  // "text(left)" is the ONLY usage of text() in the spec examples for alignment.

  return {};
};

export const textShadow: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};
  const [x = '0', y = '2px', b = '4px', c = 'rgba(0,0,0,0.1)'] = v.split('/');
  return { 'text-shadow': `${px(x)} ${px(y)} ${px(b)} ${c}` };
};