import { rule2, getAllValues } from '../../../01-core/ast-utils';
import { color } from '../../../03-values/value-transform';
import { parseBorder, parseRadius } from './border-utils';

const borderSide = (side: string) => rule2((s) => { 
  const args = getAllValues(s).join(''); 
  return args ? `border-${side}:${parseBorder(args)}` : `border-${side}:1px solid currentColor`; 
});

export const b = rule2((s) => {
  const args = getAllValues(s).join('');
  if (!args) return 'border:1px solid currentColor';
  return args.startsWith('/') ? `border:1px solid ${color(args.slice(1))}` : `border:${parseBorder(args)}`;
});

export const r = rule2((s) => `border-radius:${parseRadius(getAllValues(s).join('') || '')}`);
export const bt = borderSide('top');
export const br = borderSide('right');
export const bb = borderSide('bottom');
export const bl = borderSide('left');

export const border = rule2((s) => {
  const args = getAllValues(s).join('');
  if (!args) return 'border:1px solid currentColor';
  const [dir, ...rest] = args.split('/');
  if (['top','right','bottom','left'].includes(dir)) { 
    const value = rest.join('/'); 
    return value ? `border-${dir}:${parseBorder(value)}` : `border-${dir}:1px solid currentColor`; 
  }
  return `border:${parseBorder(args)}`;
});