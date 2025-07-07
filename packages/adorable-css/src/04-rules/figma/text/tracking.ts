import { rule2, getFirstValue } from '../../../01-core/ast-utils';

const TRACKING_MAP: Record<string, string> = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em'
};

export const tracking = rule2(s => {
  const value = getFirstValue(s);
  const mapped = TRACKING_MAP[value];
  return `letter-spacing:${mapped || value}`;
});