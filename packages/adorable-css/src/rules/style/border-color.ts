import type { RuleHandler, CSSRule } from '../types';
import { makeValue } from '../../core/values/makeValue';

const borderColor = (prop: string): RuleHandler => (v?: string): CSSRule => v ? { [prop]: makeValue(v) } : {};

export const bc = borderColor('border-color');
export const btc = borderColor('border-top-color');
export const brc = borderColor('border-right-color');
export const bbc = borderColor('border-bottom-color');
export const blc = borderColor('border-left-color');