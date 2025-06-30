import { defineComponent } from '../defineComponent-unified';
import type { ComponentDefinition } from '../defineComponent-unified';

// Badge component definition
export const badgeDefinition: ComponentDefinition = {
  base: 'inline-flex pack bold(medium) r(sm) py(2) transition',
  
  sizes: {
    sm: 'px(sm) text(xs)',
    default: 'px(md) py(xs) text(sm)',
    lg: 'px(lg) py(sm) text(sm)'
  },
  
  variants: {
    default: 'bg(gray-100) c(gray-700) border(1/gray-200)',
    primary: 'bg(purple-600) c(white) hover:bg(purple-700)',
    secondary: 'bg(gray-100) c(gray-700) border(1/gray-200) hover:bg(gray-200)',
    success: 'bg(green-100) c(green-800) border(1/green-200) hover:bg(green-200)',
    warning: 'bg(amber-100) c(amber-800) border(1/amber-200) hover:bg(amber-200)',
    error: 'bg(red-100) c(red-800) border(1/red-200) hover:bg(red-200)',
    info: 'bg(blue-100) c(blue-800) border(1/blue-200) hover:bg(blue-200)',
    accent: 'bg(pink-600) c(white) hover:bg(pink-700)',
    outline: 'bg(transparent) c(gray-700) border(1/gray-300) hover:border(gray-400)'
  }
};

// Badge component using unified defineComponent helper
export const badgeString = defineComponent(badgeDefinition, {
  sizeOptions: ['sm', 'lg'],
  defaultSize: 'default',
  defaultVariant: 'default'
});

// Export badge rules
export const badgeRules = {
  'badge': badgeString
};