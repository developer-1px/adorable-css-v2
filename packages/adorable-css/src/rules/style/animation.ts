import type { CSSRule, RuleHandler } from '../types';

const ms = (v: string) => !isNaN(Number(v)) ? `${v}ms` : v;

export const animate: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};
  const [n = 'none', d = '1s', t = 'ease', i = '1'] = v.split('/');
  return { animation: `${n} ${d} ${t} ${i}` };
};

export const delay: RuleHandler = (v?: string): CSSRule => v ? { 'animation-delay': ms(v) } : {};
export const duration: RuleHandler = (v?: string): CSSRule => v ? { 'animation-duration': ms(v) } : {};

export const animationRules = { animate, delay, duration };