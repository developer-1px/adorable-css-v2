import { defineComponent } from '../defineComponent-unified';
import type { ComponentDefinition } from '../defineComponent-unified';

// Heading component definition with refined AdorableCSS syntax
export const headingDefinition: ComponentDefinition = {
  base: 'c(gray-900) transition(color/200ms) balance',
  
  sizes: {
    // Primary headings with fluid scaling
    h1: 'font(..5xl/1.1/-3%) bold(black) mt(0) mb(xl)',
    h2: 'font(..4xl/1.2/-2%) bold(extra) mt(3xl) mb(lg) pb(md) border-b(gray-200)',
    h3: 'font(..3xl/1.3/-1.5%) bold(bold) mt(2xl) mb(md)',
    h4: 'font(..2xl/1.4/-1%) bold(semi) mt(xl) mb(sm)',
    h5: 'font(..xl/1.5) bold(medium) mt(lg) mb(xs)',
    h6: 'font(..lg/1.6) bold(medium) mt(md) mb(xs) uppercase',
    
    // Display variations
    display: 'font(..6xl/1/-4%) bold(black) mb(2xl)',
    hero: 'font(..5xl/1/-3.5%) bold(black) mb(xl)',
    page: 'font(..5xl/1.1/-2.5%) bold(black) mb(md)',
    
    // Utility headings
    caption: 'font(sm/1.5/wider) bold(medium) c(gray-600) uppercase mb(sm)',
    eyebrow: 'font(xs/1.5/widest) bold(semi) c(gray-500) uppercase mb(xs)',
    
    default: 'font(3xl/1.3/-1.5%) bold(semi) pb(md)' // Default to h3 style
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
    gradient: 'c(gradient(135deg/purple-600..pink-600))',
    rainbow: 'c(gradient(to-r/red-500..yellow-500..green-500..blue-500..purple-500))',
    
    // Typography variants
    serif: 'font(serif)',
    mono: 'font(mono)',
    
    // Special variants
    underline: 'relative after:content("") after:absolute after:bottom(0) after:left(0) after:w(full) after:h(3) after:bg(gradient(to-r/purple-400..pink-400)) after:r(full)',
    shadow: 'text-shadow(lg)',
    outline: 'text-stroke(2) text-stroke(gray-900) c(transparent)'
  },
  
  compounds: [
    // Gradient variants get better colors for display sizes
    {
      variant: 'gradient',
      size: ['display', 'hero'],
      class: 'c(gradient(135deg/indigo-600..purple-600..pink-600))'
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