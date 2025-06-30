import { defineComponent } from '../defineComponent-unified';
import type { StringRuleHandler } from '../../rules/types';

// Link component for consistent link styling
export const linkString = defineComponent({
  base: 'transition(colors/200ms) cursor(pointer)',
  variants: {
    default: '',
    underline: 'underline',
    hover: 'hover:underline'
  }
});

// List container component
export const listContainerString = defineComponent({
  base: 'pl(0) list(none)',
  variants: {
    default: '',
    compact: 'space-y(xs)',
    spaced: 'space-y(md)'
  }
});

// List item component
export const listItemString: StringRuleHandler = (args?: string) => {
  const type = args || 'bullet';
  const baseClasses = 'relative pl(xl)';
  
  if (type === 'bullet') {
    return `${baseClasses} before:content("•") before:absolute before:left(0) before:c(blue-500) before:bold`;
  } else if (type === 'number') {
    return `${baseClasses}`;
  } else if (type === 'dash') {
    return `${baseClasses} before:content("—") before:absolute before:left(0) before:c(gray-500)`;
  } else if (type === 'arrow') {
    return `${baseClasses} before:content("→") before:absolute before:left(0) before:c(green-500)`;
  }
  
  return baseClasses;
};

// Code inline component
export const codeInlineString = defineComponent({
  base: 'font(mono) font(sm) bg(gray-100) px(xs) py(0.5) r(sm)',
  variants: {
    default: '',
    primary: 'bg(blue-100) c(blue-700)',
    success: 'bg(green-100) c(green-700)',
    warning: 'bg(yellow-100) c(yellow-900)',
    error: 'bg(red-100) c(red-700)'
  }
});

// Code block component - already exists in code-block.ts
// This is just an alias for consistency
export const codeBlockAlias = defineComponent({
  base: 'code-block',
  variants: {
    default: '',
    dark: 'code-block(dark)',
    minimal: 'bg(transparent) border(0) shadow(none) p(0)'
  }
});

// Blockquote component
export const blockquoteString = defineComponent({
  base: 'pl(lg) border-l(4) border(blue-200) italic c(gray-700)',
  variants: {
    default: '',
    accent: 'border(purple-400) c(purple-900) bg(purple-50)',
    minimal: 'border(gray-300) not-italic',
    large: 'font(xl) border-l(6)'
  }
});

// Table components
export const tableString = defineComponent({
  base: 'w(full) font(sm) border-collapse',
  variants: {
    default: '',
    striped: 'tbody-tr:nth-child(even):bg(gray-50)',
    bordered: 'border(gray-200) shadow(sm)'
  }
});

export const tableCellString = defineComponent({
  base: 'text(left) p(md) border-b(gray-200)',
  variants: {
    default: '',
    center: 'text(center)',
    right: 'text(right)',
    compact: 'p(sm)'
  }
});

export const tableHeaderString = defineComponent({
  base: 'bold(medium) bg(gray-50) c(gray-700) font(xs) uppercase tracking(wider) p(md) border-b(gray-200)',
  variants: {
    default: '',
    dark: 'bg(gray-800) c(gray-100) border-b(gray-600)',
    primary: 'bg(blue-50) c(blue-900) border-b(blue-200)'
  }
});

// Divider component
export const dividerString = defineComponent({
  base: 'border(0) h(px) bg(gray-200)',
  variants: {
    default: '',
    dashed: 'h(auto) border-t(dashed) border-t(gray-300) bg(transparent)',
    dotted: 'h(auto) border-t(dotted) border-t(gray-300) bg(transparent)',
    gradient: 'h(2) bg(to-r/gray-200..transparent..gray-200)',
    fade: 'bg(radial-gradient(ellipse_at_center,gray-300_0%,transparent_70%))'
  }
});

// Image component
export const imageString = defineComponent({
  base: 'max-w(full) h(auto) block',
  variants: {
    default: 'r(lg)',
    rounded: 'r(full)',
    bordered: 'r(lg) border(2) border(gray-200) shadow(sm)',
    centered: 'mx(auto)',
    shadow: 'r(lg) shadow(xl)'
  }
});

// Figure component
export const figureString = defineComponent({
  base: 'text(center)',
  variants: {
    default: '',
    left: 'text(left)',
    right: 'text(right)',
    card: 'bg(white) p(lg) r(lg) shadow(md)'
  }
});

// Caption component
export const captionString = defineComponent({
  base: 'font(sm) c(gray-600)',
  variants: {
    default: '',
    italic: 'italic',
    bold: 'bold(medium) c(gray-700)',
    muted: 'c(gray-500)'
  }
});

// Keyboard component
export const kbdString = defineComponent({
  base: 'font(mono) font(xs) px(xs) py(0.5) bg(gray-100) border(gray-300) r(sm) shadow(sm) inline-block',
  variants: {
    default: '',
    dark: 'bg(gray-800) border(gray-600) c(gray-100)',
    primary: 'bg(blue-100) border(blue-300) c(blue-800)'
  }
});

// Export all typography helpers as rules
export const typographyHelperRules = {
  'link': linkString,
  'list-container': listContainerString,
  'list-item': listItemString,
  'code-inline': codeInlineString,
  'blockquote': blockquoteString,
  'table': tableString,
  'table-cell': tableCellString,
  'table-header': tableHeaderString,
  'divider': dividerString,
  'image': imageString,
  'figure': figureString,
  'caption': captionString,
  'kbd': kbdString
};