import { defineComponent } from '../defineComponent-unified';
import type { ComponentDefinition } from '../defineComponent-unified';

// Display component - for maximum visual impact
export const displayDefinition: ComponentDefinition = {
  base: 'c(gray-900) transition(color/200ms) balance block',
  
  sizes: {
    xs: 'font(3xl/1.2/-1%) bold(bold)',
    sm: 'font(4xl/1.2/-1.5%) bold(bold)',
    base: 'font(5xl/1.1/-2%) bold(extra)',
    lg: 'font(6xl/1.1/-2.5%) bold(extra)',
    xl: 'font(7xl/1/-3%) bold(black)',
    '2xl': 'font(8xl/1/-3.5%) bold(black)',
    '3xl': 'font(9xl/1/-4%) bold(black)',
    
    // Contextual sizes
    hero: 'font(..6xl/1/-3%) bold(black) mb(2xl)',
    banner: 'font(..7xl/1/-3.5%) bold(black) mb(3xl)',
    splash: 'font(..8xl/0.9/-4%) bold(black) mb(4xl)',
    
    default: 'font(5xl/1.1/-2%) bold(extra)' // Default to base
  },
  
  variants: {
    default: '',
    
    // Weight variants
    light: 'bold(light)',
    thin: 'bold(thin)',
    
    // Color variants
    muted: 'c(gray-700)',
    primary: 'c(blue-900)',
    
    // Style variants
    gradient: 'c(gradient(135deg/purple-600..pink-600))',
    rainbow: 'c(gradient(to-r/red-500..yellow-500..green-500..blue-500..purple-500))',
    chrome: 'c(gradient(180deg/gray-300..gray-600..gray-300)) bg-clip-text',
    
    // Typography variants
    serif: 'font(serif)',
    mono: 'font(mono) bold(medium)',
    
    // Effect variants
    shadow: 'text-shadow(2xl)',
    outline: 'text-stroke(3) text-stroke(gray-900) c(transparent)',
    glow: 'text-shadow(0_0_20px_rgba(147,51,234,0.5))',
    
    // Special variants
    split: 'relative after:content(attr(data-text)) after:absolute after:top(0) after:left(0) after:c(gradient(to-r/purple-600..pink-600)) after:clip-path(polygon(0_0,100%_0,100%_50%,0_50%))'
  },
  
  compounds: [
    // Extra large displays get even tighter tracking
    {
      size: ['xl', '2xl', '3xl', 'banner', 'splash'],
      class: 'tracking(-0.04em)'
    },
    // Gradient variants get enhanced colors for larger sizes
    {
      variant: 'gradient',
      size: ['lg', 'xl', '2xl', '3xl', 'hero', 'banner', 'splash'],
      class: 'c(gradient(135deg/indigo-600..purple-600..pink-600))'
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

// Export string-based rules
export const displayTextRules = {
  'display': displayString
};