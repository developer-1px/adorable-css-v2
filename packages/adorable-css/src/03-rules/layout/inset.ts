import type { CSSRule, RuleHandler } from '../types';
import { makeValue } from '../../01-core/values/makeValue';

const v = (args?: string) => args ? String(makeValue(args)) : '0';

export const inset: RuleHandler = (args?: string): CSSRule => ({ inset: v(args) });
export const insetX: RuleHandler = (args?: string): CSSRule => ({ left: v(args), right: v(args) });
export const insetY: RuleHandler = (args?: string): CSSRule => ({ top: v(args), bottom: v(args) });

export const insetRules = { inset, 'inset-x': insetX, 'inset-y': insetY };