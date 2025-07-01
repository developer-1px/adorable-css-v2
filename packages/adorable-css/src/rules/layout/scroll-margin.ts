import type { RuleHandler, CSSRule } from '../types';
import { makeValue } from '../../core/values/makeValue';

const scrollMargin = (prop: string): RuleHandler => (v?: string): CSSRule => v ? { [prop]: makeValue(v) } : {};

export const scrollMt = scrollMargin('scroll-margin-top');
export const scrollMb = scrollMargin('scroll-margin-bottom');
export const scrollMl = scrollMargin('scroll-margin-left');
export const scrollMr = scrollMargin('scroll-margin-right');
export const scrollM = scrollMargin('scroll-margin');