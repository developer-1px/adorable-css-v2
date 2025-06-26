import type { CSSRule, KeywordRuleHandler, RuleHandler } from '../types';

// Layout configuration from v1
const LAYOUT_MAP = {
  row: {
    aligns: {
      top: 'flex-start',
      middle: 'center',
      pack: 'center',
      bottom: 'flex-end',
      fill: 'stretch',
    },
    justify: {
      'left': 'flex-start',
      'left+reverse': 'flex-end',
      'right': 'flex-end',
      'right+reverse': 'flex-start',
      'center': 'center',
      'center+reverse': 'center',
      'pack': 'center',
      'pack+reverse': 'center',
      'between': 'space-between',
      'between+reverse': 'space-between',
    },
    defaultAlign: 'middle',
  },
  column: {
    aligns: {
      left: 'flex-start',
      center: 'center',
      pack: 'center',
      right: 'flex-end',
      fill: 'stretch',
    },
    justify: {
      'top': 'flex-start',
      'top+reverse': 'flex-end',
      'bottom': 'flex-end',
      'bottom+reverse': 'flex-start',
      'middle': 'center',
      'middle+reverse': 'center',
      'pack': 'center',
      'pack+reverse': 'center',
    },
    defaultAlign: 'fill',
  },
} as const;

type BaseDirection = keyof typeof LAYOUT_MAP;

function makeBoxAligns(direction: BaseDirection, value = ''): CSSRule {
  const values = value.split(/[+/|]/);
  const layout = LAYOUT_MAP[direction];
  const hasReverse = values.includes('reverse');
  
  const result: CSSRule = {
    'display': 'flex',
    'flex-direction': hasReverse ? `${direction}-reverse` : direction,
  };
  
  // Handle align-items
  const alignValue = values.find((v) => v in layout.aligns) || layout.defaultAlign;
  result['align-items'] = layout.aligns[alignValue as keyof typeof layout.aligns];
  
  // Handle justify-content
  const justifyKey = values.find((v) => v in layout.justify) as keyof typeof layout.justify | undefined;
  if (justifyKey) {
    const justifyWithReverse = hasReverse ? (`${justifyKey}+reverse` as const) : justifyKey;
    if (justifyWithReverse in layout.justify) {
      result['justify-content'] = layout.justify[justifyWithReverse as keyof typeof layout.justify];
    }
  }
  
  // Handle wrap
  if (values.includes('wrap')) {
    result['flex-wrap'] = 'wrap';
  }
  
  return result;
}

// Basic display utilities
export const block: KeywordRuleHandler = () => ({ display: 'block' });
export const inline: KeywordRuleHandler = () => ({ display: 'inline' });
export const inlineBlock: KeywordRuleHandler = () => ({ display: 'inline-block' });
export const none: KeywordRuleHandler = () => ({ display: 'none' });
export const grid: KeywordRuleHandler = () => ({ display: 'grid' });

// Flexbox utilities with v1 logic
export const hbox: RuleHandler = (value = '') => {
  return makeBoxAligns('row', value);
};

export const vbox: RuleHandler = (value = '') => {
  return makeBoxAligns('column', value);
};

export const wrap: RuleHandler = (value = '') => {
  const result = makeBoxAligns('row', value);
  result['flex-wrap'] = 'wrap';
  return result;
};

export const pack: KeywordRuleHandler = () => {
  return makeBoxAligns('row', 'center+middle');
};

// Additional flex utilities
export const inlineFlex: KeywordRuleHandler = () => ({ display: 'inline-flex' });
export const flex: KeywordRuleHandler = () => ({ flex: '1 1 0%' });
export const flex1: KeywordRuleHandler = () => ({ flex: '1 1 0%' });
export const flexWrap: KeywordRuleHandler = () => ({ 'flex-wrap': 'wrap' });

// Standalone flexbox alignment utilities
export const items: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  const alignMap: Record<string, string> = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    baseline: 'baseline',
    stretch: 'stretch'
  };
  
  return { 'align-items': alignMap[value] || value };
};

export const justify: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  const justifyMap: Record<string, string> = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly'
  };
  
  return { 'justify-content': justifyMap[value] || value };
};

// Flex grow/shrink
export const shrink: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  return { 'flex-shrink': value };
};

export const grow: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  return { 'flex-grow': value };
};

export const displayRules = {
  block,
  inline,
  'inline-block': inlineBlock,
  'inline-flex': inlineFlex,
  none,
  grid,
  hbox,
  vbox,
  wrap,
  pack,
  flex,
  'flex-1': flex1,
  'flex-wrap': flexWrap,
  items,
  justify,
  shrink,
  grow
};