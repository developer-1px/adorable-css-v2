import { rule2, single, getSideValues, spacing, safeCss, getFirstValue } from '../../../01-core/ast-utils';

export const gap = rule2(s => getFirstValue(s) === 'auto' ? 'justify-content:space-between' : safeCss('gap', getSideValues(s, spacing)));
export const gapX = single('column-gap', spacing);
export const gapY = single('row-gap', spacing);