import { defineComponent } from '../../defineComponent-unified';
import type { ComponentDefinition } from '../../defineComponent-unified';

// Display component - for maximum visual impact
export const displayDefinition: ComponentDefinition = {
  base: 'balance',
  
  sizes: {
    xs: 'text(3xl/1.2/-1%) font(bold)',
    sm: 'text(4xl/1.2/-1.5%) font(bold)',
    base: 'text(5xl/1.1/-2%) font(extra)',
    lg: 'text(6xl/1.1/-2.5%) font(extra)',
    xl: 'text(7xl/1/-3%) font(black)',
    '2xl': 'text(8xl/1/-3.5%) font(black)',
    '3xl': 'text(9xl/1/-4%) font(black)',
    '4xl': 'text(10xl/1/-4.5%) font(black)',
    '5xl': 'text(11xl/0.9/-5%) font(black)',
    
    // Contextual sizes
    hero: 'text(..6xl/1/-3%) font(black) mb(2xl)',
    banner: 'text(..7xl/1/-3.5%) font(black) mb(3xl)',
    splash: 'text(..8xl/0.9/-4%) font(black) mb(4xl)',
    
    default: 'text(5xl/1.1/-2%) font(extra)' // Default to base
  },
  
  variants: {
    default: '',
    
    // Weight variants
    light: 'font(light)',
    thin: 'font(thin)',
    
    // Color variants
    muted: 'c(gray-700)',
    primary: 'c(blue-900)',
    
    // Style variants
    gradient: 'c(135deg/purple-600..pink-600)',
    rainbow: 'c(to-r/red-500..yellow-500..green-500..blue-500..purple-500)',
    chrome: 'c(180deg/gray-300..gray-600..gray-300)',
    
    // Typography variants
    serif: 'text(serif)',
    mono: 'text(mono) font(medium)',
    
    // Effect variants
    shadow: 'text-shadow(2xl)',
    outline: 'text-stroke(3) text-stroke(gray-900) c(transparent)',
    glow: 'text-shadow(0_0_20px_rgba(147,51,234,0.5))',
    
    // Special variants
    split: 'relative after:content(attr(data-text)) after:absolute after:top(0) after:left(0) after:c(to-r/purple-600..pink-600) after:clip-path(polygon(0_0,100%_0,100%_50%,0_50%))'
  },
  
  compounds: [
    // Extra large displays get even tighter tracking
    {
      size: ['xl', '2xl', '3xl', '4xl', '5xl', 'banner', 'splash'],
      class: 'tracking(-0.04em)'
    },
    // Gradient variants get enhanced colors for larger sizes
    {
      variant: 'gradient',
      size: ['lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'hero', 'banner', 'splash'],
      class: 'c(135deg/indigo-600..purple-600..pink-600)'
    },
    // Light/thin variants need darker color for readability
    {
      variant: ['light', 'thin'],
      class: 'c(gray-800)'
    }
  ],
  states: {
    hover: 'scale(1.02) transition(transform/300ms/cubic-bezier(0.34,1.56,0.64,1))',
    active: 'scale(0.98)'
  }
};

// Display component using unified defineComponent
const displaySizeOptions = Object.keys(displayDefinition.sizes || {});

export const displayString = defineComponent(displayDefinition, {
  sizeOptions: displaySizeOptions,
  defaultSize: 'default'
});

// Export string-based 03-rules
export const displayTextRules = {
  'display': displayString
};