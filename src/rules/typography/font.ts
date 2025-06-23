import type { CSSRule, RuleHandler } from '../types';
import { px, percentToEm, makeNumber, cssvar } from '../../values/makeValue';

export const font: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  const parts = args.split('/');
  const result: CSSRule = {};
  
  parts.forEach((part, index) => {
    if (!part || part === '-') return;
    
    // font-family (string, not number)
    if (isNaN(+part) && !part.includes('%')) {
      result['font-family'] = String(cssvar(part));
    }
    // font-size (first number or has px/rem/em)
    else if ((index === 0 || !result['font-size']) && (+part || part.includes('px') || part.includes('rem') || part.includes('em'))) {
      result['font-size'] = String(px(part));
    }
    // line-height (second number)
    else if (!result['line-height'] && +part) {
      result['line-height'] = String(+part < 4 ? makeNumber(+part) : px(part));
    }
    // letter-spacing (has % or third number)
    else if (part.includes('%')) {
      result['letter-spacing'] = String(px(percentToEm(part)));
    }
    // font-weight (number 100-900 or weight keyword)
    else if ((+part >= 100 && +part <= 900) || ['bold', 'normal', 'light', 'medium'].includes(part)) {
      result['font-weight'] = part;
    }
  });
  
  return result;
};

