import { defineComponent } from '../../defineComponent-unified';
import type { ComponentDefinition } from '../../defineComponent-unified';

// Body component - for readable content
export const bodyDefinition: ComponentDefinition = {
  base: 'c(gray-800) transition(color/200ms)',
  
  sizes: {
    xs: 'text(xs/1.6) font(normal)',
    sm: 'text(sm/1.6) font(normal)',
    base: 'text(base/1.6) font(normal)',
    lg: 'text(lg/1.6) font(normal)',
    xl: 'text(xl/1.7) font(normal)',
    
    // Reading-optimized sizes
    article: 'text(base/1.7) font(normal) max-w(prose)',
    prose: 'text(lg/1.8) font(normal) max-w(prose)',
    compact: 'text(sm/1.5) font(normal)',
    relaxed: 'text(base/1.8) font(normal)',
    
    default: 'text(base/1.6) font(normal)' // Default to base
  },
  
  variants: {
    default: '',
    
    // Color variants
    muted: 'c(gray-600)',
    secondary: 'c(gray-700)',
    primary: 'c(blue-900)',
    success: 'c(green-900)',
    warning: 'c(amber-900)',
    danger: 'c(red-900)',
    
    // Style variants
    light: 'c(gray-500)',
    
    // Typography variants
    serif: 'text(serif/1.7)',
    mono: 'text(mono/1.5) bg(gray-100) px(xs) py(2) r(sm)',
    
    // Readability variants
    contrast: 'c(gray-900) font(medium)',
    soft: 'c(gray-600)',
    
    // Special variants
    lead: 'text(lg/1.7) c(gray-700)',
    quote: 'italic pl(lg) border-l(4/gray-300)',
    highlight: 'bg(yellow-200) px(xs) r(sm)'
  },
  
  compounds: [
    // Article body gets optimal reading settings
    {
      size: 'article',
      class: 'text-wrap(pretty) hyphens(auto)'
    },
    // Prose gets enhanced typography
    {
      size: 'prose',
      class: 'text-wrap(pretty) selection:bg(blue-200)'
    },
    // Mono variant adjustments
    {
      variant: 'mono',
      class: 'text(mono) text-wrap(nowrap)'
    },
    // Quote variant with size adjustments
    {
      variant: 'quote',
      size: ['lg', 'xl'],
      class: 'text(xl/1.7) pl(xl)'
    }
  ],
  
  states: {
    hover: 'c(gray-700)',
    focus: 'outline(2) outline(blue-500) outline-offset(2)',
    selection: 'selection:bg(blue-100) selection:c(blue-900)'
  }
};

// Body component using unified defineComponent
const bodySizeOptions = Object.keys(bodyDefinition.sizes || {});

export const bodyString = defineComponent(bodyDefinition, {
  sizeOptions: bodySizeOptions,
  defaultSize: 'default'
});

// Export string-based 03-rules
export const bodyRules = {
  'body': bodyString
};