import type { CSSRule, RuleHandler } from '../types';
import { px } from '../../01-core/values/makeValue';

// Note: text rule has been migrated to Rule2 system
// See: /src/03-rules2-v2/figma/text/text.ts

// Helper function for text box layout inspired by Figma (remains in Rule1)
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

export const textShadow: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};
  const [x = '0', y = '2px', b = '4px', c = 'rgba(0,0,0,0.1)'] = v.split('/');
  return { 'text-shadow': `${px(x)} ${px(y)} ${px(b)} ${c}` };
};