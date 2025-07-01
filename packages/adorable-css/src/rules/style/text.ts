import type { CSSRule, RuleHandler } from '../types';
import { px } from '../../core/values/makeValue';
import { isToken, getTokenVar } from '../../design-system/tokens/index';

const aligns = ['left', 'center', 'right', 'justify', 'start', 'end'];

export const text: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};
  if (aligns.includes(v)) return { 'text-align': v };
  return isToken(v, 'font') ? { 'font-size': getTokenVar('font', v) } : {};
};

export const textShadow: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};
  const [x = '0', y = '2px', b = '4px', c = 'rgba(0,0,0,0.1)'] = v.split('/');
  return { 'text-shadow': `${px(x)} ${px(y)} ${px(b)} ${c}` };
};