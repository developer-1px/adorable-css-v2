import { rule2, getFirstValue } from '../../../01-core/ast-utils';
import { processSize, processDoubleSize } from './size-utils';

export const w = rule2((s) => processSize(getFirstValue(s), 'width'));
export const h = rule2((s) => processSize(getFirstValue(s), 'height'));
export const minW = rule2((s) => processSize(getFirstValue(s), 'min-width'));
export const maxW = rule2((s) => processSize(getFirstValue(s), 'max-width'));
export const minH = rule2((s) => processSize(getFirstValue(s), 'min-height'));
export const maxH = rule2((s) => processSize(getFirstValue(s), 'max-height'));
export const size = rule2((s) => processDoubleSize(getFirstValue(s)));