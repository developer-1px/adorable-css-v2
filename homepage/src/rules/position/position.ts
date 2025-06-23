import type { CSSRule, RuleHandler, KeywordRuleHandler } from '../types';
import { px } from '../../values/makeValue';

// Position types
export const staticPosition: KeywordRuleHandler = () => ({ position: 'static' });
export const relative: KeywordRuleHandler = () => ({ position: 'relative' });
export const absolute: KeywordRuleHandler = () => ({ position: 'absolute' });
export const fixed: KeywordRuleHandler = () => ({ position: 'fixed' });
export const sticky: KeywordRuleHandler = () => ({ position: 'sticky' });

// Position coordinates
export const top: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { top: String(px(args)) };
};

export const right: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { right: String(px(args)) };
};

export const bottom: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { bottom: String(px(args)) };
};

export const left: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { left: String(px(args)) };
};

// Z-index
export const z: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // z(auto)
  if (args === 'auto') return { 'z-index': 'auto' };
  
  // z(top) - highest z-index
  if (args === 'top') return { 'z-index': '9999' };
  
  // z(10)
  return { 'z-index': args };
};

// Layer utility (Figma-style positioning)
export const layer: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { position: 'absolute' };
  
  const result: CSSRule = { position: 'absolute' };
  
  // layer(top:20+left:30) - multiple positions
  if (args.includes('+')) {
    const positions = args.split('+');
    positions.forEach(pos => {
      const [side, value] = pos.split(':');
      if (side && value) {
        result[side] = String(px(value));
      }
    });
  }
  // layer(top:20) - single position
  else if (args.includes(':')) {
    const [side, value] = args.split(':');
    if (side && value) {
      result[side] = String(px(value));
    }
  }
  // layer(top) - edge positioning
  else {
    if (args === 'top') result.top = '0';
    if (args === 'right') result.right = '0';
    if (args === 'bottom') result.bottom = '0';
    if (args === 'left') result.left = '0';
  }
  
  return result;
};

export const positionRules = {
  static: staticPosition, 
  relative, 
  absolute, 
  fixed, 
  sticky,
  top, 
  right, 
  bottom, 
  left,
  z,
  layer
};