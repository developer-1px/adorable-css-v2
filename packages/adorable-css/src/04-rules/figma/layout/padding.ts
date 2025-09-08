import { rule2, single, getSideValues, safeCss } from '../../ast-utils/rule2-helpers';
import { spacing } from '../../../03-values/value-transform';

export const p = rule2(s => safeCss('padding', getSideValues(s, spacing)));
export const pt = single('padding-top', spacing);
export const pr = single('padding-right', spacing);
export const pb = single('padding-bottom', spacing);
export const pl = single('padding-left', spacing);
export const px = single('padding-inline', spacing);
export const py = single('padding-block', spacing);