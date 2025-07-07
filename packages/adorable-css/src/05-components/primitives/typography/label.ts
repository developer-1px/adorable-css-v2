import { defineComponent } from '../../defineComponent-unified';
import type { ComponentDefinition } from '../../defineComponent-unified';

// Label component - for functional UI text
export const labelDefinition: ComponentDefinition = {
  base: 'c(gray-700) transition(color/200ms) select(none)',
  
  sizes: {
    xs: 'text(xs/1.3) font(medium) tracking(0.01em)',
    sm: 'text(sm/1.3) font(medium)',
    base: 'text(sm/1.3) font(semi)',
    lg: 'text(base/1.3) font(semi)',
    xl: 'text(lg/1.3) font(semi)',
    
    // UI-specific sizes
    button: 'text(sm/1) font(semi) tracking(0.01em)',
    input: 'text(sm/1.4) font(medium) mb(xs)',
    tab: 'text(sm/1) font(medium) tracking(0.02em)',
    badge: 'text(xs/1) font(semi) tracking(0.02em) uppercase',
    tooltip: 'text(xs/1.3) font(normal)',
    
    default: 'text(sm/1.3) font(semi)' // Default to base
  },
  
  variants: {
    default: '',
    
    // Color variants
    muted: 'c(gray-500)',
    primary: 'c(blue-700)',
    success: 'c(green-700)',
    warning: 'c(amber-700)',
    danger: 'c(red-700)',
    
    // Style variants
    strong: 'font(bold) c(gray-900)',
    subtle: 'c(gray-500)',
    
    // Typography variants
    mono: 'text(mono) font(normal)',
    
    // Case variants
    uppercase: 'uppercase tracking(widest)',
    capitalize: 'capitalize',
    
    // Functional variants
    required: 'after:content("*") after:c(red-500) after:ml(xs)',
    optional: 'after:content("(optional)") after:c(gray-400) after:ml(xs) after:text(xs) after:normal-case',
    helper: 'c(gray-500) text(xs/1.4)',
    
    // Interactive variants
    clickable: 'cursor(pointer) hover:c(gray-900) active:scale(0.95)'
  },
  
  compounds: [
    // Button labels need specific handling
    {
      size: 'button',
      class: 'text(pack) gap(xs)'
    },
    // Input labels need proper spacing
    {
      size: 'input',
      variant: 'required',
      class: 'block'
    },
    // Badge labels are always uppercase
    {
      size: 'badge',
      class: 'block px(xs) whitespace(nowrap)'
    },
    // Tab labels need hover states
    {
      size: 'tab',
      class: 'px(md) py(sm) bb(2/transparent) hover:bb(gray-300)'
    }
  ],
  
  states: {
    hover: 'c(gray-900)',
    focus: 'outline(2) outline(blue-500) outline-offset(2)',
    active: 'c(gray-600)',
    disabled: 'c(gray-400) cursor(not-allowed)'
  }
};

// Label component using unified defineComponent
const labelSizeOptions = Object.keys(labelDefinition.sizes || {});

export const labelString = defineComponent(labelDefinition, {
  sizeOptions: labelSizeOptions,
  defaultSize: 'default'
});

// Export string-based 03-rules
export const labelRules = {
  'label': labelString
};