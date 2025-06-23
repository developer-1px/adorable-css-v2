import { font } from './font';
import { c } from './color';
import { text } from './text';

export const typographyRules = {
  font, c, text,
  
  // Font weights
  '100': () => ({ 'font-weight': '100' }),
  '200': () => ({ 'font-weight': '200' }),
  '300': () => ({ 'font-weight': '300' }),
  '400': () => ({ 'font-weight': '400' }),
  '500': () => ({ 'font-weight': '500' }),
  '600': () => ({ 'font-weight': '600' }),
  '700': () => ({ 'font-weight': '700' }),
  '800': () => ({ 'font-weight': '800' }),
  '900': () => ({ 'font-weight': '900' }),
  
  thin: () => ({ 'font-weight': '200' }),
  light: () => ({ 'font-weight': '300' }),
  regular: () => ({ 'font-weight': 'normal' }),
  medium: () => ({ 'font-weight': '500' }),
  semibold: () => ({ 'font-weight': '600' }),
  bold: () => ({ 'font-weight': 'bold' }),
  heavy: () => ({ 'font-weight': '900' }),
  
  // Text styles
  italic: () => ({ 'font-style': 'italic' }),
  underline: () => ({ 'text-decoration': 'underline' }),
  'line-through': () => ({ 'text-decoration': 'line-through' }),
  strike: () => ({ 'text-decoration': 'line-through' }),
  overline: () => ({ 'text-decoration': 'overline' }),
  'no-underline': () => ({ 'text-decoration': 'none' }),
  
  // Text transform
  uppercase: () => ({ 'text-transform': 'uppercase' }),
  lowercase: () => ({ 'text-transform': 'lowercase' }),
  capitalize: () => ({ 'text-transform': 'capitalize' }),
  
  // White space
  nowrap: () => ({ 'white-space': 'nowrap' }),
  pre: () => ({ 'white-space': 'pre' }),
  'pre-wrap': () => ({ 'white-space': 'pre-wrap' }),
  
  // Text overflow
  truncate: () => ({ 'overflow': 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' })
};