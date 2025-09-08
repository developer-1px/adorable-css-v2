import { rule2, getFirstValue, getAllValues } from '../../ast-utils/rule2-helpers';
import { filter, processShadow, processElevation, processBackdrop } from './effects-utils';

export const opacity = rule2((s) => { const v = getFirstValue(s); return v ? `opacity:${v}` : ''; });
export const blur = rule2((s) => filter('blur', getFirstValue(s) || '', true));
export const brightness = rule2((s) => filter('brightness', getFirstValue(s) || ''));
export const contrast = rule2((s) => filter('contrast', getFirstValue(s) || ''));
export const saturate = rule2((s) => filter('saturate', getFirstValue(s) || ''));
export const sepia = rule2((s) => filter('sepia', getFirstValue(s) || ''));
export const grayscale = rule2((s) => filter('grayscale', getFirstValue(s) || ''));
export const hueRotate = rule2((s) => filter('hue-rotate', getFirstValue(s) || ''));
export const invert = rule2((s) => filter('invert', getFirstValue(s) || ''));
export const backdrop = rule2((s) => processBackdrop(getAllValues(s).join('') || ''));
export const shadow = rule2((s) => processShadow(getFirstValue(s) || ''));
export const elevation = rule2((s) => processElevation(getFirstValue(s) || '0'));