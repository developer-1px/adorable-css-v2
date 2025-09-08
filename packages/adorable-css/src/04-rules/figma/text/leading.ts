import { rule2, getFirstValue } from '../../ast-utils/rule2-helpers';

const LEADING_MAP: Record<string, string> = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2'
};

export const leading = rule2(s => {
  const value = getFirstValue(s);
  const mapped = LEADING_MAP[value];
  return `line-height:${mapped || value}`;
});