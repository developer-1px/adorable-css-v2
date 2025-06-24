import type { CSSRule, KeywordRuleHandler, RuleHandler } from '../types';

// Basic display utilities
export const block: KeywordRuleHandler = () => ({ display: 'block' });
export const inline: KeywordRuleHandler = () => ({ display: 'inline' });
export const inlineBlock: KeywordRuleHandler = () => ({ display: 'inline-block' });
export const none: KeywordRuleHandler = () => ({ display: 'none' });
export const grid: KeywordRuleHandler = () => ({ display: 'grid' });

// Flexbox utilities with pack shorthand support
export const hbox: RuleHandler = (value = '') => {
  const rules: CSSRule = { display: 'flex', 'flex-direction': 'row' };
  if (value) {
    if (value === 'pack') {
      rules['justify-content'] = 'center';
      rules['align-items'] = 'center';
    } else {
      const [justify, align] = value.split('+');
      if (justify === 'center') rules['justify-content'] = 'center';
      else if (justify === 'between') rules['justify-content'] = 'space-between';
      else if (justify === 'around') rules['justify-content'] = 'space-around';
      else if (justify === 'end') rules['justify-content'] = 'flex-end';
      
      if (align === 'center') rules['align-items'] = 'center';
      else if (align === 'end') rules['align-items'] = 'flex-end';
      else if (align === 'stretch') rules['align-items'] = 'stretch';
    }
  }
  return rules;
};

export const vbox: RuleHandler = (value = '') => {
  const rules: CSSRule = { display: 'flex', 'flex-direction': 'column' };
  if (value) {
    if (value === 'pack') {
      rules['justify-content'] = 'center';
      rules['align-items'] = 'center';
    } else {
      const [justify, align] = value.split('+');
      if (justify === 'center') rules['justify-content'] = 'center';
      else if (justify === 'between') rules['justify-content'] = 'space-between';
      else if (justify === 'around') rules['justify-content'] = 'space-around';
      else if (justify === 'end') rules['justify-content'] = 'flex-end';
      
      if (align === 'center') rules['align-items'] = 'center';
      else if (align === 'end') rules['align-items'] = 'flex-end';
      else if (align === 'stretch') rules['align-items'] = 'stretch';
    }
  }
  return rules;
};

// Additional flex utilities
export const inlineFlex: KeywordRuleHandler = () => ({ display: 'inline-flex' });
export const flex: KeywordRuleHandler = () => ({ flex: '1 1 0%' });
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
  flex,
  'flex-wrap': flexWrap,
  items,
  justify,
  shrink,
  grow
};