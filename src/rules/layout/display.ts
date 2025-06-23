import type { CSSRule, KeywordRuleHandler } from '../types';

// Basic display utilities
export const block: KeywordRuleHandler = () => ({ display: 'block' });
export const inline: KeywordRuleHandler = () => ({ display: 'inline' });
export const inlineBlock: KeywordRuleHandler = () => ({ display: 'inline-block' });
export const none: KeywordRuleHandler = () => ({ display: 'none' });
export const grid: KeywordRuleHandler = () => ({ display: 'grid' });

// Flexbox utilities
export const hbox: KeywordRuleHandler = () => ({ display: 'flex' });
export const vbox: KeywordRuleHandler = () => ({ display: 'flex', 'flex-direction': 'column' });

export const displayRules = {
  block,
  inline,
  'inline-block': inlineBlock,
  none,
  grid,
  hbox,
  vbox
};