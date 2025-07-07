import { rule2 } from '../../01-core/ast-utils';

// Basic display properties - Figma visibility and layout modes
export const block = rule2(() => 'display:block');
export const inline = rule2(() => 'display:inline');
export const inlineBlock = rule2(() => 'display:inline-block');
export const none = rule2(() => 'display:none');
export const hidden = rule2(() => 'display:none');

// Flexbox display (already handled by hbox/vbox, but adding explicit flex)
export const flex = rule2(() => 'display:flex');
export const inlineFlex = rule2(() => 'display:inline-flex');

// Grid display - Figma grid layout
export const grid = rule2((s) => {
  const args = s.args || s.selector?.args;
  if (!args || args.length === 0) {
    return 'display:grid';
  }
  
  // Extract the first argument (column count)
  const firstArg = args[0];
  const cols = firstArg.image || firstArg.value || firstArg;
  
  // If it's a number, create that many columns
  if (/^\d+$/.test(String(cols))) {
    return `display:grid;grid-template-columns:repeat(${cols}, 1fr)`;
  }
  
  // Otherwise return just grid display
  return 'display:grid';
});
export const inlineGrid = rule2(() => 'display:inline-grid');

// Other display values
export const contents = rule2(() => 'display:contents');
export const tableDisplay = rule2(() => 'display:table');
export const tableCell = rule2(() => 'display:table-cell');
export const tableRow = rule2(() => 'display:table-row');