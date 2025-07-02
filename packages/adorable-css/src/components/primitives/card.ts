import { defineComponent } from '../defineComponent-unified';
import type { ComponentDefinition } from '../defineComponent-unified';

// Card component definition
export const cardDefinition: ComponentDefinition = {
  base: 'relative clip transition-all',
  
  sizes: {
    sm: 'p(16) r(md)',
    default: 'p(24) r(lg)',
    lg: 'p(32) r(xl)',
    xl: 'p(48) r(2xl)'
  },
  
  variants: {
    default: 'bg(white) shadow(xs) border(1/gray-200) hover:shadow(md) hover:border(gray-50)',
    outlined: 'bg(white) border(1/gray-200) shadow(none) hover:border(gray-300)',
    ghost: 'bg(gray-50) border(1/transparent) hover:bg(gray-100) hover:border(gray-200)',
    elevated: 'bg(white) border(1/gray-200.6) hover:border(purple-500.3) hover:bg(gray-50.5)',
    interactive: 'bg(gray-50) cursor(pointer) border(1/gray-200.8) select(none) hover:border(purple-500.4) hover:bg(gray-50) active:bg(gray-100)',
    feature: 'bg(white) text(center) vbox gap(16) border(1/gray-200.8) hover:border(purple-500.4) hover:bg(gray-50.5)',
    glass: 'backdrop-blur(12) backdrop-saturate(200) bg(white.7) border(1/white.3) shadow(lg/black.1) hover:bg(white.8) hover:border(white.5)',
    gradient: 'bg(white) border(1/transparent) relative before:content("") before:absolute before:inset(-1) before:p(1) before:r(inherit) before:bg(135deg/brand-start..brand-end) before:mask(linear-gradient(white_0_0)_content-box,linear-gradient(white_0_0)) before:mask-composite(exclude) before:pointer-events(none) hover:shadow(lg/purple-500.15)'
  },
  
  states: {
    focus: 'outline(none) ring(2/blue-500) ring-offset(2)'
  }
};

// Card component using defineComponent
export const cardString = defineComponent(cardDefinition);

// Export string-based rules
export const cardRules = {
  'card': cardString
};