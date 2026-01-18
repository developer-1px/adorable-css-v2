import { defineComponent } from '../defineComponent';
import type { ComponentDefinition } from '../defineComponent';

/**
 * Menu Item Component
 * 
 * A simpler, more focused version of menu component.
 * Ideal for list items, dropdown options, and simple clickable rows.
 * 
 * @example
 * menu-item() - Default menu item
 * menu-item(active) - Active/current item
 * menu-item(sm) - Small size variant
 */
export const menuItemDefinition: ComponentDefinition = {
  base: 'block px(12) py(8) caption(base) c(gray-600) cursor(pointer) transition-all',
  
  sizes: {
    sm: 'px(8) py(4) caption(xs)',
    default: 'px(12) py(8) caption(base)',
    lg: 'px(16) py(10) body(sm)'
  },
  
  variants: {
    default: 'hover:c(gray-900) hover:bg(gray-50)',
    active: 'c(purple-600) bold pl(8) border-l(2/purple-500)',
    muted: 'c(gray-500) hover:c(gray-700)',
    danger: 'hover:c(red-600) hover:bg(red-50)'
  },
  
  states: {
    hover: 'transition-colors'
  }
};

export const menuItemString = defineComponent(menuItemDefinition, {
  sizeOptions: ['sm', 'lg'],
  defaultSize: 'default',
  defaultVariant: 'default'
});

export const menuItemRules = {
  'menu-item': menuItemString
};