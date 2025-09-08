import { rule2, single, getSideValues, safeCss, getFirstValue } from '../../ast-utils/rule2-helpers';
import { spacing } from '../../../03-values/value-transform';

export const gap = rule2(s => getFirstValue(s) === 'auto' ? 'justify-content:space-between' : safeCss('gap', getSideValues(s, spacing)));
export const gapX = single('column-gap', spacing);
export const gapY = single('row-gap', spacing);