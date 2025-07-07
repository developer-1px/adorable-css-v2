import { rule2, single, getSideValues, spacing, safeCss } from '../../../01-core/ast-utils';

export const p = rule2(s => safeCss('padding', getSideValues(s, spacing)));
export const pt = single('padding-top', spacing);
export const pr = single('padding-right', spacing);
export const pb = single('padding-bottom', spacing);
export const pl = single('padding-left', spacing);
export const px = single('padding-inline', spacing);
export const py = single('padding-block', spacing);