import { rule2, single, extractValue, getAllArgs, getFirstArg } from '../../ast-utils/rule2-helpers';
import { spacing } from '../../../03-values/value-transform';
import { px } from '../../../03-values/makeValue';

const Z_MAP = {auto:'auto',base:'0',below:'-1',above:'1',dropdown:'1000',modal:'2000',popover:'3000',tooltip:'4000',max:'9999',top:'9999'};
const LAYER_MAP = {
  base:'position:relative;z-index:0',
  card:'position:relative;z-index:1',
  dropdown:'position:absolute;z-index:1000',
  overlay:'position:fixed;z-index:1500',
  modal:'position:fixed;z-index:2000',
  popover:'position:absolute;z-index:3000',
  tooltip:'position:absolute;z-index:4000',
  notification:'position:fixed;z-index:5000',
  // Special position variants
  top:'position:absolute;inset:0;bottom:auto',
  right:'position:absolute;inset:0;left:auto',
  bottom:'position:absolute;inset:0;top:auto',
  left:'position:absolute;inset:0;right:auto'
};
const POS_MAP = {absolute:'absolute',relative:'relative',fixed:'fixed',sticky:'sticky',static:'static'};

// Position with optional coordinates: absolute(10,20) or just absolute
export const absolute = rule2((s) => {
  const args = getAllArgs(s);
  if (args.length === 2) {
    const x = extractValue(args[0]);
    const y = extractValue(args[1]);
    return `position:absolute;left:${px(x)};top:${px(y)}`;
  }
  return 'position:absolute';
});

export const relative = rule2(() => 'position:relative');
export const fixed = rule2(() => 'position:fixed');
export const sticky = rule2(() => 'position:sticky');
export const static_ = rule2(() => 'position:static');

// Individual position properties
export const x = single('left', (v) => px(v));
export const y = single('top', (v) => px(v));
export const top = single('top', spacing);
export const right = single('right', spacing);
export const bottom = single('bottom', spacing);
export const left = single('left', spacing);

export const inset = rule2((s) => {
  const v = extractValue(s.args?.[0]);
  return v ? (v.includes(' ') ? `inset:${v.split(' ').map(spacing).join(' ')}` : `inset:${spacing(v)}`) : 'inset:0';
});
export const insetX = rule2((s) => { const r = spacing(extractValue(s.args?.[0]) || '0'); return `left:${r};right:${r}`; });
export const insetY = rule2((s) => { const r = spacing(extractValue(s.args?.[0]) || '0'); return `top:${r};bottom:${r}`; });
export const z = single('z-index', (v) => {
  const mapped = Z_MAP[v as keyof typeof Z_MAP];
  return mapped !== undefined ? mapped : v;
});
export const layer = rule2((s) => {
  // Get arguments from the AST node
  const args = s.args || s.selector?.args;
  if (!args || args.length === 0) {
    return 'position:absolute;inset:0';
  }
  
  // Extract the value from the first argument
  const firstArg = args[0];
  const arg = firstArg.image || firstArg.value || firstArg;
  
  // Check if it's a preset
  if (typeof arg === 'string' && LAYER_MAP[arg as keyof typeof LAYER_MAP]) {
    return LAYER_MAP[arg as keyof typeof LAYER_MAP];
  }
  
  // Default to position:absolute;inset:0
  return 'position:absolute;inset:0';
});
export const position = rule2((s) => { const v = extractValue(s.args?.[0]); return POS_MAP[v as keyof typeof POS_MAP] ? `position:${POS_MAP[v as keyof typeof POS_MAP]}` : ''; });

// Special handler for parser's position type syntax: (10,20)
export const __positionType = (node: any) => {
  // Handle position type from parser
  if (node.selector?.type === 'position') {
    const { x, y } = node.selector;
    return `position:absolute;left:${px(x.image)};top:${px(y.image)}`;
  }
  // Handle position node directly
  if (node.type === 'position') {
    return `position:absolute;left:${px(node.x.image)};top:${px(node.y.image)}`;
  }
  return '';
};