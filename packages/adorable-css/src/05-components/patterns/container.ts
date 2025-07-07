import { defineComponent } from '../defineComponent-unified';
import type { ComponentDefinition } from '../defineComponent-unified';

// Container component - Apple-inspired responsive container
export const containerDefinition: ComponentDefinition = {
  base: 'relative w(full) mx(auto)',
  
  sizes: {
    // Size-based containers
    xs: 'max-w(xs)',      // 320px
    sm: 'max-w(sm)',      // 480px  
    md: 'max-w(md)',      // 640px
    lg: 'max-w(lg)',      // 960px
    xl: 'max-w(xl)',      // 1280px
    '2xl': 'max-w(2xl)',  // 1440px
    '3xl': 'max-w(3xl)',  // 1600px
    '4xl': 'max-w(4xl)',  // 1920px
    '5xl': 'max-w(5xl)',  // 2240px
    '6xl': 'max-w(6xl)',  // 2560px
    
    // Semantic sizes
    compact: 'max-w(692px)',     // Compact reading width
    default: 'max-w(980px)',     // Standard content
    wide: 'max-w(1190px)',       // Wide content
    full: 'max-w(full)',         // Full width
    
    // Legacy support
    narrow: 'max-w(600px)',
    'wide-legacy': 'max-w(1600px)'
  },
  
  variants: {
    default: 'px(xl)',
    
    // Padding variants
    'no-padding': 'px(0)',
    tight: 'px(sm)',
    comfortable: 'px(lg)',
    spacious: 'px(2xl)',
    
    // Responsive padding variants
    responsive: 'px(lg) sm:px(xl) md:px(2xl) lg:px(3xl)',
    'responsive-tight': 'px(sm) sm:px(md) md:px(lg) lg:px(xl)',
    
    // Apple-style responsive padding
    apple: 'px(22px) sm:px(24px) lg:px(32px)',
    
    // Safe area support
    safe: 'pl(max(xl,env(safe-area-inset-left))) pr(max(xl,env(safe-area-inset-right)))',
    
    // Content variants
    prose: 'max-w(65ch) px(xl)',
    article: 'max-w(720px) px(xl)',
    
    // Section variants
    hero: 'py(5xl) px(xl)',
    section: 'py(4xl) px(xl)',
    
    // Centered content
    centered: 'text(center) items(center)'
  },
  
  compounds: [
    // Full width containers don't need centering
    {
      size: 'full',
      class: 'mx(0)'
    },
    // Compact containers get tighter padding
    {
      size: ['compact', 'narrow'],
      variant: 'default',
      class: 'px(lg)'
    },
    // Wide containers get more padding
    {
      size: ['wide', '4xl', '5xl', '6xl'],
      variant: 'default', 
      class: 'px(2xl)'
    }
  ],
  
  defaults: {
    size: 'default',
    variant: 'default'
  }
};

// Container component string handler
export const containerString = defineComponent(containerDefinition, {
  sizeOptions: Object.keys(containerDefinition.sizes || {}),
  defaultSize: 'default'
});

// Export the rules
export const containerRules = {
  container: containerString
};