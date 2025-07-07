import { transformValue, color } from '../../../03-values/value-transform';
import { isToken, getTokenVar } from '../../../03-values/token-resolver';

const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
};

const ELEVATIONS = {
  '0': 'none',
  '1': '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  '2': '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  '3': '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
  '4': '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  '6': '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
  '8': '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
  '12': '0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)',
  '16': '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
  '24': '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)'
};

export const filter = (name: string, value: string, needsUnit = false) => 
  `filter:${name}(${needsUnit ? transformValue(value) : value})`;

export const processShadow = (value: string): string => {
  if (!value) return 'box-shadow:none';
  if (isToken(value, 'shadow')) return `box-shadow:${getTokenVar('shadow', value)}`;
  if (SHADOWS[value as keyof typeof SHADOWS]) return `box-shadow:${SHADOWS[value as keyof typeof SHADOWS]}`;
  
  if (value.includes('/')) {
    const [x = '0', y = '0', blur = '0', spread = '', col = 'rgba(0,0,0,0.1)'] = value.split('/');
    const shadow = `${transformValue(x)} ${transformValue(y)} ${transformValue(blur)}${spread ? ' ' + transformValue(spread) : ''} ${color(col)}`;
    return `box-shadow:${shadow}`;
  }
  
  return `box-shadow:${value}`;
};

export const processElevation = (value: string): string => {
  if (isToken(value, 'elevation')) return `box-shadow:${getTokenVar('elevation', value)}`;
  return ELEVATIONS[value as keyof typeof ELEVATIONS] ? `box-shadow:${ELEVATIONS[value as keyof typeof ELEVATIONS]}` : '';
};

export const processBackdrop = (value: string): string => {
  if (!value) return '';
  const [type, val] = value.split('/');
  return type === 'blur' && val ? `backdrop-filter:blur(${transformValue(val)})` : `backdrop-filter:${value}`;
};