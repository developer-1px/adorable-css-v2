import type { CSSRule, RuleHandler, KeywordRuleHandler } from '../types';

const cursors = ['auto', 'default', 'none', 'context-menu', 'help', 'pointer', 'progress', 'wait', 'cell', 'crosshair', 'text', 'vertical-text', 'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'grab', 'grabbing', 'e-resize', 'n-resize', 'ne-resize', 'nw-resize', 's-resize', 'se-resize', 'sw-resize', 'w-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'col-resize', 'row-resize', 'all-scroll', 'zoom-in', 'zoom-out'];

export const cursor: RuleHandler = (v?: string): CSSRule => v && cursors.includes(v) ? { cursor: v } : {};
export const pointer: KeywordRuleHandler = () => ({ cursor: 'pointer' });
export const grab: KeywordRuleHandler = () => ({ cursor: 'grab' });
export const grabbing: KeywordRuleHandler = () => ({ cursor: 'grabbing' });

export const cursorRules = { cursor, pointer, grab, grabbing };