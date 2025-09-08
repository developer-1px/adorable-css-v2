import { rule2, single, getSideValues, safeCss } from '../ast-utils/rule2-helpers';
import { spacing } from '../../03-values/value-transform';

export const m = rule2(s => {
  const values = getSideValues(s, spacing);
  return safeCss('margin', values);
});

export const mt = single('margin-top', spacing);
export const mr = single('margin-right', spacing);
export const mb = single('margin-bottom', spacing);
export const ml = single('margin-left', spacing);
export const mx = single('margin-inline', spacing);
export const my = single('margin-block', spacing);