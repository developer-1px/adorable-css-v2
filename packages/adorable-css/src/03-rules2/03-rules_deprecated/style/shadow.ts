import type { CSSRule, RuleHandler } from '../types';
import { px, makeColor } from '../../01-core/values/makeValue';
import { isToken, getTokenVar } from '../../02-design_tokens/design-system/tokens/index';

const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
};

export const shadow: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};
  if (isToken(v, 'shadow') || v === 'none') return { 'box-shadow': getTokenVar('shadow', v) };
  if (shadows[v]) return { 'box-shadow': shadows[v] };
  if (!v.includes('/')) return {};
  const [x = '0', y = '0', b = '0', c = 'rgb(0 0 0 / 0.1)'] = v.split('/').map((p, i) => i < 3 ? px(p) : makeColor(p));
  return { 'box-shadow': `${x} ${y} ${b} ${c}` };
};

export const opacity: RuleHandler = (v?: string): CSSRule => 
  v ? { opacity: v.startsWith('.') ? v : +v > 1 ? String(+v / 100) : v } : {};

export const shadowRules = { shadow, opacity };