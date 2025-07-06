import { defineComponent } from '../../defineComponent-unified';
import type { ComponentDefinition } from '../../defineComponent-unified';

// Label component - for functional UI text
export const labelDefinition: ComponentDefinition = {
  base: 'c(gray-700) transition(color/200ms) select(none)',
  
  sizes: {
    xs: 'font(xs/1.3) bold(medium) tracking(0.01em)',
    sm: 'font(sm/1.3) bold(medium)',
    base: 'font(sm/1.3) bold(semi)',
    lg: 'font(base/1.3) bold(semi)',
    xl: 'font(lg/1.3) bold(semi)',
    
    // UI-specific sizes
    button: 'font(sm/1) bold(semi) tracking(0.01em)',
    input: 'font(sm/1.4) bold(medium) mb(xs)',
    tab: 'font(sm/1) bold(medium) tracking(0.02em)',
    badge: 'font(xs/1) bold(semi) tracking(0.02em) uppercase',
    tooltip: 'font(xs/1.3) bold(normal)',
    
    default: 'font(sm/1.3) bold(semi)' // Default to base
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
    strong: 'bold(bold) c(gray-900)',
    subtle: 'c(gray-500)',
    
    // Typography variants
    mono: 'font(mono) bold(normal)',
    
    // Case variants
    uppercase: 'uppercase tracking(widest)',
    capitalize: 'capitalize',
    
    // Functional variants
    required: 'after:content("*") after:c(red-500) after:ml(xs)',
    optional: 'after:content("(optional)") after:c(gray-400) after:ml(xs) after:font(xs) after:normal-case',
    helper: 'c(gray-500) font(xs/1.4)',
    
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
      class: 'px(md) py(sm) border-b(2/transparent) hover:border-b(gray-300)'
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

// Export string-based rules
export const labelRules = {
  'label': labelString
};