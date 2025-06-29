import { defineComponent } from '../defineComponent-unified';
import type { ComponentDefinition } from '../defineComponent-unified';

// Heading component definition
export const headingDefinition: ComponentDefinition = {
  base: 'scroll-m(20) c(gray-900) transition-color first:mt(0)',
  
  sizes: {
    h1: 'font(5xl) bold(bold) lh(1.1) tracking(-2.5%) sm:text(6xl)',
    h2: 'pb(2) font(4xl) bold(semi) tracking(-2%) border-b(1/gray-200)',
    h3: 'mt(32) mb(16) font(3xl) bold(semi) tracking(-1.5%) c(135deg/gray-900..gray-600) relative after:content("") after:absolute after:bottom(-8) after:left(0) after:w(48) after:h(2) after:bg(135deg/purple-500.6..pink-500.6) after:r(1)',
    h4: 'mt(24) font(2xl) bold(medium) tracking(-1%)',
    h5: 'mt(16) font(xl) bold(medium) tracking(-0.5%)',
    h6: 'mt(16) font(lg) bold(medium)',
    display: 'font(clamp(4rem,8vw,6rem)) bold(black) lh(0.95) mb(24) tracking(-4%)',
    hero: 'font(clamp(3.75rem,7vw,5rem)) bold(bold) lh(1) mb(24) tracking(-3.5%)',
    page: 'font(5xl) bold(bold) lh(1.1) mb(8) tracking(-2.5%)',
    caption: 'font(sm) bold(medium) c(gray-600) uppercase tracking(5%) mb(8)',
    default: 'pb(2) font(3xl) bold(semi) tracking(tight)' // Default to h2 style
  },
  
  variants: {
    default: '',
    muted: 'c(gray-600)',
    gradient: 'c(135deg/brand-start..brand-end)',
    lead: 'font(xl) c(gray-600) lh(relaxed) font(normal)',
    small: 'font(sm) c(gray-600) bold(medium) uppercase tracking(5%)',
    large: 'font(lg) c(gray-900) font(normal) lh(1.5)'
  },
  
  compounds: [
    // Remove color override for gradient variants
    {
      variant: 'gradient',
      size: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'display', 'hero', 'page'],
      class: 'c(135deg/brand-start..brand-end)'
    }
  ]
};

// Heading component using unified defineComponent
export const headingString = defineComponent(headingDefinition);

// Export string-based rules
export const headingRules = {
  'heading': headingString
};