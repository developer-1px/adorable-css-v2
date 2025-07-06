import { defineComponent } from '../../defineComponent-unified';
import type { ComponentDefinition } from '../../defineComponent-unified';

// Heading component definition with VitePress-inspired styling using tokens
export const headingDefinition: ComponentDefinition = {
  base: 'c(gray-900) transition(color/200ms) relative',
  
  sizes: {
    // VitePress-inspired typography without margins
    h1: 'font(..5xl/1.1/-3%) bold',
    h2: 'font(2xl/tight/-1%) bold',
    h3: 'font(xl/snug) bold(semi)',
    h4: 'font(lg/relaxed) bold(semi)',
    h5: 'font(md/relaxed) bold(semi)',
    h6: 'font(sm/relaxed/widest) bold(semi) uppercase',

    default: 'font(3xl/1.3/-1.5%) bold(semi)' // Default to h1-like style
  },
  
  variants: {
    default: '',
    
    // Color variants
    muted: 'c(gray-600)',
    primary: 'c(blue-900)',
    success: 'c(green-900)',
    warning: 'c(amber-900)',
    danger: 'c(red-900)',
    
    // Style variants
    gradient: 'c(135deg/purple-600..pink-600)',
    rainbow: 'c(to-r/red-500..yellow-500..green-500..blue-500..purple-500)',
    
    // Typography variants
    serif: 'font(serif)',
    mono: 'font(mono)',
    
    // Special variants
    underline: 'relative after:content("") after:absolute after:bottom(0) after:left(0) after:w(full) after:h(3) after:bg(to-r/purple-400..pink-400) after:r(full)',
    shadow: 'text-shadow(lg)',
    outline: 'text-stroke(2) text-stroke(gray-900) c(transparent)'
  },
  
  compounds: [
    // Gradient variants get better colors for display sizes
    {
      variant: 'gradient',
      size: ['display', 'hero'],
      class: 'c(135deg/indigo-600..purple-600..pink-600)'
    },
    // Serif variants get adjusted letter spacing
    {
      variant: 'serif',
      size: ['h1', 'h2', 'h3', 'display', 'hero'],
      class: 'font(serif/1.2/-2%)'
    },
    // Mono variants get tighter spacing
    {
      variant: 'mono',
      size: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      class: 'font(mono)'
    }
  ],
  
  // State modifiers
  states: {
    hover: 'c(gray-700)',
    focus: 'outline(2) outline(blue-500) outline-offset(2)',
    active: 'c(gray-800)'
  }
};

// Heading component using unified defineComponent
// Extract all size keys from the definition
const headingSizeOptions = Object.keys(headingDefinition.sizes || {});

export const headingString = defineComponent(headingDefinition, {
  sizeOptions: headingSizeOptions,
  defaultSize: 'default'
});

// Export string-based rules
export const headingRules = {
  'heading': headingString
};