import { rule2, getFirstValue } from '../../../01-core/ast-utils';

const WHITESPACE_MAP: Record<string, string> = {
  normal: 'normal',
  nowrap: 'nowrap',
  pre: 'pre',
  'pre-line': 'pre-line',
  'pre-wrap': 'pre-wrap',
  'break-spaces': 'break-spaces'
};

export const whitespace = rule2(s => {
  const value = getFirstValue(s);
  const mapped = WHITESPACE_MAP[value];
  return `white-space:${mapped || value}`;
});