import { defineComponent } from '../../defineComponent';
import type { ComponentDefinition } from '../../defineComponent';

// Title component - for component names and identifiers
export const titleDefinition: ComponentDefinition = {
  base: 'c(gray-900) transition(color/200ms)',
  
  sizes: {
    xs: 'text(sm/1.4) font(medium)',
    sm: 'text(base/1.4) font(medium)',
    base: 'text(lg/1.4) font(semi)',
    lg: 'text(xl/1.4) font(semi)',
    xl: 'text(2xl/1.3) font(bold)',
    '2xl': 'text(3xl/1.3) font(bold)',
    
    // Component-specific sizes
    card: 'text(lg/1.4) font(semi) mb(sm)',
    modal: 'text(xl/1.3) font(semi) mb(md)',
    section: 'text(2xl/1.3) font(bold) mb(lg)',
    
    default: 'text(lg/1.4) font(semi)' // Default to base
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
    gradient: 'c(to-r/blue-600..purple-600)',
    
    // Typography variants
    serif: 'text(serif)',
    mono: 'text(mono)',
    
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

// Export string-based 03-rules
export const titleRules = {
  'title': titleString
};