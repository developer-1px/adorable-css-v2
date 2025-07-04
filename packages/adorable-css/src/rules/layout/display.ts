import type { CSSRule, KeywordRuleHandler, RuleHandler } from '../types';

// Simple display utilities
export const block: KeywordRuleHandler = () => ({ display: 'block' });
export const inline: KeywordRuleHandler = () => ({ display: 'inline' });
export const inlineBlock: KeywordRuleHandler = () => ({ display: 'inline-block' });
// inline-flex is deprecated - use hbox() or vbox() instead
// export const inlineFlex: KeywordRuleHandler = () => ({ display: 'inline-flex' });
export const none: KeywordRuleHandler = () => ({ display: 'none' });
export const hidden = none;
export const grid: KeywordRuleHandler = () => ({ display: 'grid' });

// Flexbox utilities
const flexbox = (dir: string, align?: string, justify?: string): CSSRule => ({
  display: 'flex',
  'flex-direction': dir,
  ...(align && { 'align-items': align }),
  ...(justify && { 'justify-content': justify })
});

const parseAlign = (v: string) => v ? { 
  top: 'flex-start', middle: 'center', bottom: 'flex-end', fill: 'stretch', stretch: 'stretch',
  left: 'flex-start', center: 'center', right: 'flex-end', end: 'flex-end'
}[v] : undefined;

const parseJustify = (v: string) => v ? {
  left: 'flex-start', right: 'flex-end', center: 'center', end: 'flex-end',
  top: 'flex-start', middle: 'center', bottom: 'flex-end',
  between: 'space-between', around: 'space-around', evenly: 'space-evenly'
}[v] : undefined;

export const hbox: RuleHandler = (v = '') => {
  if (v === 'pack') return flexbox('row', 'center', 'center');
  const vals = v.split(/[+/]/);
  const align = vals.find(x => ['top', 'middle', 'bottom', 'fill', 'end'].includes(x));
  const justify = vals.find(x => ['left', 'right', 'center', 'end', 'between', 'around', 'evenly'].includes(x));
  
  // Default to flex-start/flex-start if no alignment specified
  const defaultAlign = align ? parseAlign(align) : 'flex-start';
  const defaultJustify = justify ? parseJustify(justify) : 'flex-start';
  
  return {
    ...flexbox('row', defaultAlign, defaultJustify),
    ...(vals.includes('wrap') && { 'flex-wrap': 'wrap' }),
    ...(vals.includes('reverse') && { 'flex-direction': 'row-reverse' }),
    ":where(&>*)": {"flex": "0 0 auto"}
  };
};

export const vbox: RuleHandler = (v = '') => {
  if (v === 'pack') return {
    ...flexbox('column', 'center', 'center'),
    'text-align': 'center'
  };
  
  const vals = v.split(/[+/]/);
  const align = vals.find(x => ['left', 'center', 'right', 'fill', 'stretch', 'end'].includes(x));
  const justify = vals.find(x => ['top', 'middle', 'bottom', 'around', 'between', 'evenly'].includes(x));
  
  // Default to stretch/flex-start if no alignment specified
  const defaultAlign = align ? parseAlign(align) : 'stretch';
  const defaultJustify = justify ? parseJustify(justify) : 'flex-start';
  
  // Map alignment to text-align
  const getTextAlign = (align: string) => {
    switch (align) {
      case 'left': return 'left';
      case 'center': return 'center';
      case 'right': return 'right';
      case 'fill':
      case 'stretch': return 'justify';
      default: return undefined;
    }
  };
  
  const textAlign = align ? getTextAlign(align) : undefined;
  
  return {
    ...flexbox('column', defaultAlign, defaultJustify),
    ...(vals.includes('wrap') && { 'flex-wrap': 'wrap' }),
    ...(vals.includes('reverse') && { 'flex-direction': 'column-reverse' }),
    ...(textAlign && { 'text-align': textAlign }),
    ":where(&>*)": {"flex": "0 0 auto"}
  };
};

export const wrap = hbox;
export const pack: KeywordRuleHandler = () => flexbox('row', 'center', 'center');

export const flex: RuleHandler = (v?: string): CSSRule => v ? { flex: v } : { flex: '1 1 0%' };
export const flexWrap: KeywordRuleHandler = () => ({ 'flex-wrap': 'wrap' });
export const items: RuleHandler = (v?: string): CSSRule => v ? { 'align-items': parseAlign(v) } : {};
export const justify: RuleHandler = (v?: string): CSSRule => v ? { 'justify-content': parseJustify(v) } : {};
export const shrink: RuleHandler = (v?: string): CSSRule => v ? { 'flex-shrink': v } : {};
export const grow: RuleHandler = (v?: string): CSSRule => v ? { 'flex-grow': v } : {};

export const displayRules = {
  block, inline, 'inline-block': inlineBlock,
  none, hidden, grid, hbox, vbox, wrap, pack,
  flex, 'flex-wrap': flexWrap, items, justify, shrink, grow
};