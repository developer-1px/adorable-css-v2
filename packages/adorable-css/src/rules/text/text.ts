import type { CSSRule, RuleHandler } from '../types';
import { px } from '../../core/values/makeValue';
import { isToken, getTokenVar } from '../../design-system/tokens/index';

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
  
  return isToken(v, 'font') ? { 'font-size': getTokenVar('font', v) } : {};
};

export const textShadow: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};
  const [x = '0', y = '2px', b = '4px', c = 'rgba(0,0,0,0.1)'] = v.split('/');
  return { 'text-shadow': `${px(x)} ${px(y)} ${px(b)} ${c}` };
};