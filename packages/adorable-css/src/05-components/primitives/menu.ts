import { defineComponent } from '../defineComponent';
import type { ComponentDefinition } from '../defineComponent';

/**
 * Menu Component
 * 
 * A clickable row component for navigation, dropdowns, and lists.
 * Supports icon + text + accessory layout pattern.
 * 
 * @example
 * menu() - Default menu item
 * menu(active) - Active/current menu item
 * menu(compact) - Smaller padding variant
 * menu(danger) - Dangerous action styling
 */
export const menuDefinition: ComponentDefinition = {
  base: 'relative block hbox(middle) gap(12) px(16) py(10) r(8) body(sm) c(gray-700) cursor(pointer) transition-all select(none)',
  
  sizes: {
    compact: 'px(12) py(6) gap(8) body(xs)',
    default: 'px(16) py(10) gap(12) body(sm)',
    large: 'px(20) py(12) gap(16) body(base)'
  },
  
  variants: {
    default: 'hover:bg(gray-100) active:bg(gray-200)',
    active: 'bg(white) c(purple-700) bold shadow(sm) hover:bg(purple-50)',
    selected: 'bg(purple-50) c(purple-700) hover:bg(purple-100)',
    disabled: 'opacity(50) cursor(not-allowed) hover:bg(transparent)',
    danger: 'hover:bg(red-50) hover:c(red-700) active:bg(red-100)',
    ghost: 'hover:bg(transparent) hover:c(purple-600)'
  },
  
  states: {
    focus: 'outline(2/purple-500) outline-offset(2)',
    disabled: 'pointer-events(none) opacity(50)'
  }
};

export const menuString = defineComponent(menuDefinition, {
  sizeOptions: ['compact', 'large'],
  defaultSize: 'default',
  defaultVariant: 'default'
});

export const menuRules = {
  'menu': menuString
};