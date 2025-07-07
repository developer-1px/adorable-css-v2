import { rule2, getFirstValue, getAllValues, isVoid } from '../../01-core/ast-utils';

// Flex - dual purpose: display:flex or flex shorthand
export const flex = rule2(s => {
  // No arguments = display:flex
  if (isVoid(s)) return 'display:flex';
  
  // With arguments = flex shorthand
  const values = getAllValues(s);
  
  // Handle common patterns
  if (values[0] === 'auto') return 'flex:auto';
  if (values[0] === 'none') return 'flex:none';
  if (values[0] === 'fill') return 'flex:1 1 0%';
  
  // Handle numeric values
  if (values.length === 1) return `flex:${values[0]}`;
  if (values.length === 2) return `flex:${values[0]} ${values[1]}`;
  if (values.length === 3) return `flex:${values[0]} ${values[1]} ${values[2]}`;
  
  return `flex:${values.join(' ')}`;
});

export const inlineFlex = rule2(() => 'display:inline-flex');

// Flex direction
export const flexRow = rule2(() => 'flex-direction:row');
export const flexRowReverse = rule2(() => 'flex-direction:row-reverse');
export const flexCol = rule2(() => 'flex-direction:column');
export const flexColReverse = rule2(() => 'flex-direction:column-reverse');

// Flex wrap
export const flexWrap = rule2(() => 'flex-wrap:wrap');
export const flexNoWrap = rule2(() => 'flex-wrap:nowrap');
export const flexWrapReverse = rule2(() => 'flex-wrap:wrap-reverse');

// Align items
const ITEMS_MAP: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  baseline: 'baseline',
  stretch: 'stretch'
};

export const items = rule2(s => {
  const value = getFirstValue(s);
  const mapped = ITEMS_MAP[value];
  return `align-items:${mapped || value}`;
});

// Justify content
const JUSTIFY_MAP: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly'
};

export const justify = rule2(s => {
  const value = getFirstValue(s);
  const mapped = JUSTIFY_MAP[value];
  return `justify-content:${mapped || value}`;
});

// Align content
const CONTENT_MAP: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
  stretch: 'stretch'
};

export const content = rule2(s => {
  const value = getFirstValue(s);
  const mapped = CONTENT_MAP[value];
  return `align-content:${mapped || value}`;
});

// Align self
const SELF_MAP: Record<string, string> = {
  auto: 'auto',
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  baseline: 'baseline',
  stretch: 'stretch'
};

export const self = rule2(s => {
  const value = getFirstValue(s);
  const mapped = SELF_MAP[value];
  return `align-self:${mapped || value}`;
});

// Flex grow/shrink/basis
export const grow = rule2(s => {
  const value = getFirstValue(s) || '1';
  return `flex-grow:${value}`;
});

export const shrink = rule2(s => {
  const value = getFirstValue(s) || '1';
  return `flex-shrink:${value}`;
});

export const basis = rule2(s => {
  const value = getFirstValue(s);
  if (!value) return 'flex-basis:auto';
  if (value === 'auto' || value === 'full') return `flex-basis:${value === 'full' ? '100%' : value}`;
  if (value === 'fill') return 'flex-basis:0;flex-grow:1';
  if (/^\d+$/.test(value)) return `flex-basis:${value}px`;
  return `flex-basis:${value}`;
});


// Order
export const order = rule2(s => {
  const value = getFirstValue(s) || '0';
  return `order:${value}`;
});

// Gap (already exists but including here for completeness)
export { gap, gapX, gapY } from '../figma/layout/gap';

// Compositions (from autoLayout)
export { hbox, vbox, pack, wrap } from '../figma/layout/autoLayout';

// Contents display utility
export const contents = rule2(() => 'display:contents');