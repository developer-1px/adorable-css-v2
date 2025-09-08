import { defineComponent } from '../../defineComponent';
import type { ComponentDefinition } from '../../defineComponent';

// Caption component - for supplementary, non-intrusive information
export const captionDefinition: ComponentDefinition = {
  base: 'c(gray-500) transition(color/200ms)',
  
  sizes: {
    xs: 'text(xs/1.5) font(normal)',
    sm: 'text(sm/1.5) font(normal)',
    base: 'text(sm/1.5) font(normal)',
    lg: 'text(base/1.5) font(normal)',
    
    // Context-specific sizes
    figure: 'text(sm/1.5) font(normal) mt(sm) text(center)',
    table: 'text(xs/1.4) font(normal) mb(xs)',
    form: 'text(xs/1.4) font(normal) mt(xs)',
    hint: 'text(xs/1.4) font(normal) italic',
    timestamp: 'text(xs/1.3) font(normal) tracking(0.01em)',
    
    default: 'text(sm/1.5) font(normal)' // Default to base
  },
  
  variants: {
    default: '',
    
    // Color variants - intentionally muted
    muted: 'c(gray-400)',
    primary: 'c(blue-600)',
    success: 'c(green-600)',
    warning: 'c(amber-600)',
    danger: 'c(red-600)',
    info: 'c(sky-600)',
    
    // Style variants
    italic: 'italic',
    light: 'c(gray-400)',
    dark: 'c(gray-600)',
    
    // Typography variants
    serif: 'text(serif) italic',
    mono: 'text(mono) font-size(0.9em) c(gray-600)',
    
    // Functional variants
    error: 'c(red-600) flex items(center) gap(xs)',
    help: 'c(gray-500) flex items(center) gap(xs)',
    note: 'c(blue-600) flex items(center) gap(xs)',
    
    // Position variants
    inline: 'inline ml(xs)',
    block: 'block mt(xs)',
    floating: 'absolute top(full) left(0) mt(xs) whitespace(nowrap)'
  },
  
  compounds: [
    // Figure captions are centered with padding
    {
      size: 'figure',
      class: 'px(md) max-w(prose) mx(auto)'
    },
    // Table captions go above the table
    {
      size: 'table',
      class: 'text(left) caption-side(top)'
    },
    // Form hints have icons
    {
      size: 'form',
      variant: ['error', 'help', 'note'],
      class: 'text(xs)'
    },
    // Timestamps are often inline
    {
      size: 'timestamp',
      class: 'tabular-nums'
    }
  ],
  
  states: {
    hover: 'c(gray-600)',
    focus: 'outline(2) outline(blue-500) outline-offset(2)'
  }
};

// Caption component using unified defineComponent
const captionSizeOptions = Object.keys(captionDefinition.sizes || {});

export const captionString = defineComponent(captionDefinition, {
  sizeOptions: captionSizeOptions,
  defaultSize: 'default'
});

// Export string-based 03-rules
export const captionRules = {
  'caption': captionString
};