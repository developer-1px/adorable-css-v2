import { defineComponent } from '../defineComponent-unified';
import type { ComponentDefinition } from '../defineComponent-unified';

// Button component definition
export const buttonDefinition: ComponentDefinition = {
  base: 'hbox(pack) gap(8) cursor(pointer) select(none) text(medium) whitespace(nowrap) r(md) transition-all',
  
  sizes: {
    sm: 'h(36) px(12) text(xs) r(md)',
    default: 'h(40) px(16) py(8) text(sm)',
    lg: 'h(44) px(32) text(sm) r(md)',
    icon: 'h(40) w(40) p(0)'
  },
  
  variants: {
    default: 'bg(gray-900) c(white) border(transparent) hover:bg(gray-800) active:bg(gray-700)',
    secondary: 'bg(white) c(gray-900) border(1/gray-200) hover:bg(gray-100) active:bg(gray-200)',
    destructive: 'bg(red-600) c(white) border(transparent) hover:bg(red-700) active:bg(red-800)',
    outline: 'bg(transparent) c(gray-900) border(1/gray-200) hover:bg(gray-100) hover:border(gray-300)',
    ghost: 'bg(transparent) c(gray-700) border(transparent) hover:bg(gray-100) hover:c(gray-900) active:bg(gray-200)',
    link: 'bg(transparent) c(gray-900) underline-offset(4) hover:underline hover:c(gray-700) active:c(gray-800)'
  },
  
  compounds: [
    {
      variant: 'link',
      size: ['sm', 'default', 'lg'],
      class: 'h(auto) px(0) py(0)'
    }
  ],
  
  states: {
    focus: 'outline(none) ring(2/blue-500) ring-offset(2)',
    disabled: 'pointer-events(none) opacity(50)'
  }
};

// Button component using unified defineComponent
export const btnString = defineComponent(buttonDefinition, {
  sizeOptions: ['sm', 'default', 'lg', 'icon'],
  defaultSize: 'default',
  defaultVariant: 'default'
});

// Icon button definition
export const iconButtonDefinition: ComponentDefinition = {
  base: 'hbox(center+center) cursor(pointer) select(none) r(md) transition-all',
  
  sizes: {
    sm: 'w(36) h(36) p(0) r(md)',
    default: 'w(40) h(40) p(0) r(md)',
    lg: 'w(44) h(44) p(0) r(md)'
  },
  
  variants: {
    default: 'bg(transparent) c(gray-700) border(transparent) hover:bg(gray-100) hover:c(gray-900) active:bg(gray-200)'
  },
  
  states: {
    focus: 'outline(none) ring(2/blue-500) ring-offset(2)',
    disabled: 'pointer-events(none) opacity(50)'
  }
};

// Icon button helper
export const iconBtnString = defineComponent(iconButtonDefinition);

// Export string-based 03-rules
export const buttonRules = {
  'btn': btnString,
  'icon-btn': iconBtnString
};