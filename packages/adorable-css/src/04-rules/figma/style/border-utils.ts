import { isToken, getTokenVar } from '../../../02-design_tokens/token-resolver';
import { transformValue, color } from '../../../03-values/value-transform';

const BORDER_STYLES = ['none','hidden','dotted','dashed','solid','double','groove','ridge','inset','outset'];

export const parseBorder = (args: string): string => {
  if (!args.includes('/')) return /^\d+(\.\d+)?$/.test(args) ? `${transformValue(args)} solid currentColor` : `1px solid ${color(args)}`;
  const [w, s, c] = args.split('/');
  const width = w ? transformValue(w) : '1px';
  if (!s) return `${width} solid currentColor`;
  return BORDER_STYLES.includes(s) ? `${width} ${s} ${c ? color(c) : 'currentColor'}` : `${width} solid ${color(s)}`;
};

export const parseRadius = (args: string): string => {
  if (!args) return '0';
  if (isToken(args, 'radius')) return getTokenVar('radius', args);
  if (args.includes('/')) return args.split('/').map(v => isToken(v, 'radius') ? getTokenVar('radius', v) : transformValue(v || '0')).join(' ');
  return transformValue(args);
};