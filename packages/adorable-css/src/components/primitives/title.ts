import { defineComponent } from '../defineComponent-unified';
import type { ComponentDefinition } from '../defineComponent-unified';

// Title component - for component names and identifiers
export const titleDefinition: ComponentDefinition = {
  base: 'c(gray-900) transition(color/200ms)',
  
  sizes: {
    xs: 'font(sm/1.4) bold(medium)',
    sm: 'font(base/1.4) bold(medium)',
    base: 'font(lg/1.4) bold(semi)',
    lg: 'font(xl/1.4) bold(semi)',
    xl: 'font(2xl/1.3) bold(bold)',
    '2xl': 'font(3xl/1.3) bold(bold)',
    
    // Component-specific sizes
    card: 'font(lg/1.4) bold(semi) mb(sm)',
    modal: 'font(xl/1.3) bold(semi) mb(md)',
    section: 'font(2xl/1.3) bold(bold) mb(lg)',
    
    default: 'font(lg/1.4) bold(semi)' // Default to base
  },
  
  variants: {
    default: '',
    
    // Color variants
    muted: 'c(gray-600)',
    primary: 'c(blue-800)',
    success: 'c(green-800)',
    warning: 'c(amber-800)',
    danger: 'c(red-800)',
    
    // Style variants
    gradient: 'c(gradient(to-r/blue-600..purple-600))',
    
    // Typography variants
    serif: 'font(serif)',
    mono: 'font(mono)',
    
    // Truncation variants
    truncate: 'truncate',
    clamp: 'line-clamp(2)',
    
    // Special variants
    underline: 'underline underline-offset(4) decoration(2) decoration(gray-300) hover:decoration(gray-500)'
  },
  
  compounds: [
    // Card titles often need truncation
    {
      size: 'card',
      variant: 'truncate',
      class: 'max-w(full)'
    },
    // Modal titles are centered
    {
      size: 'modal',
      class: 'text(center)'
    },
    // Section titles get extra spacing
    {
      size: 'section',
      class: 'mt(xl)'
    }
  ],
  
  states: {
    hover: 'c(gray-700)',
    focus: 'outline(2) outline(blue-500) outline-offset(2)',
    active: 'c(gray-800)'
  }
};

// Title component using unified defineComponent
const titleSizeOptions = Object.keys(titleDefinition.sizes || {});

export const titleString = defineComponent(titleDefinition, {
  sizeOptions: titleSizeOptions,
  defaultSize: 'default'
});

// Export string-based rules
export const titleRules = {
  'title': titleString
};