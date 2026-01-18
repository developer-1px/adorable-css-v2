import type { CSSRule, KeywordRuleHandler, RuleHandler } from '../types';

// Simple display utilities
export const block: KeywordRuleHandler = () => ({ display: 'block' });
export const inline: KeywordRuleHandler = () => ({ display: 'inline' });
export const inlineBlock: KeywordRuleHandler = () => ({ display: 'inline-block' });
// inline-flex is deprecated - use hbox() or vbox() instead
// export const inlineFlex: KeywordRuleHandler = () => ({ display: 'inline-flex' });
export const none: KeywordRuleHandler = () => ({ display: 'none' });
export const hidden = none;
// grid is exported from ./grid.ts with advanced features

// Flexbox utilities
const flexbox = (dir: string, align?: string, justify?: string): CSSRule => ({
  display: 'flex',
  'flex-direction': dir,
  ...(align && { 'align-items': align }),
  ...(justify && { 'justify-content': justify })
});

const parseAlign = (v: string) => v ? {
  top: 'flex-start', middle: 'center', bottom: 'flex-end', fill: 'stretch', stretch: 'stretch',
  left: 'flex-start', center: 'center', right: 'flex-end', end: 'flex-end',
  baseline: 'baseline'
}[v] : undefined;

const parseJustify = (v: string) => v ? {
  left: 'flex-start', right: 'flex-end', center: 'center', end: 'flex-end',
  top: 'flex-start', middle: 'center', bottom: 'flex-end',
  between: 'space-between', around: 'space-around', evenly: 'space-evenly',
  baseline: 'baseline'
}[v] : undefined;

export const hbox: RuleHandler = (v = '') => {
  if (v === 'pack') return flexbox('row', 'center', 'center');
  const vals = v.split(/[+/]/);
  const align = vals.find(x => ['top', 'middle', 'bottom', 'fill', 'end', 'baseline'].includes(x));
  const justify = vals.find(x => ['left', 'right', 'center', 'end', 'between', 'around', 'evenly'].includes(x));

  // Default to flex-start/flex-start if no alignment specified
  const defaultAlign = align ? parseAlign(align) : 'center';
  const defaultJustify = justify ? parseJustify(justify) : 'flex-start';

  return {
    ...flexbox('row', defaultAlign, defaultJustify),
    ...(vals.includes('wrap') && { 'flex-wrap': 'wrap' }),
    ...(vals.includes('reverse') && { 'flex-direction': 'row-reverse' }),
    ":where(&>*)": { "flex": "0 0 auto" }
  };
};

export const vbox: RuleHandler = (v = '') => {
  if (v === 'pack') return {
    ...flexbox('column', 'center', 'center'),
    'text-align': 'center'
  };

  const vals = v.split(/[+/]/);
  // Swapped center/middle to match hbox pattern (center=Main, middle=Cross)
  // AI-Friendly Spec: 'center' works for Align (Cross) too, so vbox(center) -> Center/Center
  const align = vals.find(x => ['left', 'middle', 'center', 'right', 'fill', 'stretch', 'end', 'baseline'].includes(x));
  const justify = vals.find(x => ['top', 'center', 'bottom', 'around', 'between', 'evenly', 'baseline'].includes(x));

  // Default to stretch/flex-start if no alignment specified
  const defaultAlign = align ? parseAlign(align) : 'stretch';
  const defaultJustify = justify ? parseJustify(justify) : 'flex-start';

  // Map alignment to text-align
  const getTextAlign = (align: string) => {
    switch (align) {
      case 'left': return 'left';
      case 'middle': return 'center'; // middle (Cross Axis) -> text-align: center
      case 'center': return 'center'; // keep for safety
      case 'right': return 'right';
      case 'fill':
      case 'stretch': return 'justify';
      case 'baseline': return undefined; // baseline doesn't affect text-align
      default: return undefined;
    }
  };

  const textAlign = align ? getTextAlign(align) : 'justify'

  return {
    ...flexbox('column', defaultAlign, defaultJustify),
    ...(vals.includes('wrap') && { 'flex-wrap': 'wrap' }),
    ...(vals.includes('reverse') && { 'flex-direction': 'column-reverse' }),
    ...(textAlign && { 'text-align': textAlign }),
    ":where(&>*)": { "flex": "0 0 auto" }
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
  none, hidden, hbox, vbox, wrap, pack,
  // Low-level CSS props deprecated for AI-friendliness
  // flex, 'flex-wrap': flexWrap, items, justify, shrink, grow
};