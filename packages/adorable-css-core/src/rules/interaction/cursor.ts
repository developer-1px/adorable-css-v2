import type { CSSRule, RuleHandler, KeywordRuleHandler } from '../types';

export const cursor: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // cursor(pointer), cursor(not-allowed), etc.
  const validCursors = [
    'auto', 'default', 'none', 'context-menu', 'help', 'pointer', 'progress',
    'wait', 'cell', 'crosshair', 'text', 'vertical-text', 'alias', 'copy',
    'move', 'no-drop', 'not-allowed', 'grab', 'grabbing', 'e-resize',
    'n-resize', 'ne-resize', 'nw-resize', 's-resize', 'se-resize',
    'sw-resize', 'w-resize', 'ew-resize', 'ns-resize', 'nesw-resize',
    'nwse-resize', 'col-resize', 'row-resize', 'all-scroll', 'zoom-in', 'zoom-out'
  ];
  
  if (validCursors.includes(args)) {
    return { cursor: args };
  }
  
  return {};
};

// Common cursor shortcuts
export const pointer: KeywordRuleHandler = () => ({ cursor: 'pointer' });
export const grab: KeywordRuleHandler = () => ({ cursor: 'grab' });
export const grabbing: KeywordRuleHandler = () => ({ cursor: 'grabbing' });

export const cursorRules = {
  cursor,
  pointer,
  grab,
  grabbing
};