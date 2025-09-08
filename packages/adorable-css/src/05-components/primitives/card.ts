import { defineComponent } from '../defineComponent';
import type { ComponentDefinition } from '../defineComponent';

// Card component definition
export const cardDefinition: ComponentDefinition = {
  base: 'relative clip transition-all',
  
  sizes: {
    sm: 'p(sm) r(sm)',
    md: 'p(md) r(md)',
    lg: 'p(lg) r(lg)',
    xl: 'p(xl) r(xl)',
    '2xl': 'p(2xl) r(2xl)',
    '3xl': 'p(3xl) r(3xl)'
  },
  
  defaults: {
    size: 'md',
    variant: 'default'
  },
  
  variants: {
    default: 'bg(white) shadow(sm) border(1/gray-200) hover:shadow(lg) hover:border(gray-300) hover:translate-y(-2)',
    outlined: 'bg(white) border(1/gray-300) shadow(none) hover:border(gray-400) hover:shadow(sm)',
    ghost: 'bg(gray-50) border(1/transparent) hover:bg(gray-100) hover:border(gray-200)',
    elevated: 'bg(white) shadow(lg) border(1/gray-100) hover:shadow(xl) hover:translate-y(-4)',
    interactive: 'bg(white) cursor(pointer) border(1/gray-200) shadow(sm) select(none) hover:border(primary) hover:shadow(lg) hover:translate-y(-2) active:translate-y(0) active:shadow(md)',
    feature: 'bg(white) text(center) vbox gap(24) border(1/gray-200) shadow(md) hover:border(primary) hover:shadow(xl) hover:translate-y(-4)',
    glass: 'backdrop-blur(16) backdrop-saturate(180) bg(white.8) border(1/white.2) shadow(xl) hover:bg(white.9) hover:border(white.3)',
    gradient: 'bg(to-br/primary..accent) c(white) border(1/transparent) shadow(lg) hover:shadow(2xl) hover:translate-y(-2)'
  },
  
  states: {
    focus: 'outline(none) ring(2/blue-500) ring-offset(2)'
  }
};

// Card component using defineComponent
export const cardString = defineComponent(cardDefinition);

// Export string-based 03-rules
export const cardRules = {
  'card': cardString
};