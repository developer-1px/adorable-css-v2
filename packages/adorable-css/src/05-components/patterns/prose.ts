import { defineComponent } from '../defineComponent';
import type { ComponentDefinition } from '../defineComponent';

// VitePress-inspired prose component with refined typography
const proseDefinition: ComponentDefinition = {
  // Base typography with optimal reading experience
  base: 'text(16/1.7) c(gray-700)',
  
  selectors: {
    // Typography hierarchy using heading component with margin
    'h1': 'text(2xl) font(black) tracking(tight) c(gray-900) mt(0) mb(2xl)',
    'h2': 'text(xl) font(black) tracking(tight) c(gray-900) mt(5xl) mb(lg) pb(sm) bb(2/gray-900)',
    'h3': 'text(xl) font(bold) c(gray-900) mt(3xl) mb(md)',
    'h4': 'text(lg) font(bold) c(gray-900) mt(2xl) mb(sm)',
    'h5': 'text(md) font(bold) c(gray-900) mt(lg) mb(sm)',
    'h6': 'text(sm) font(bold) c(gray-900) mt(lg) mb(sm)',
    
    // Body & inline elements - Bold minimal inspired
    'p': 'text(16/1.7) mb(lg) c(gray-700)',
    'strong': 'font(bold) c(gray-900)',
    'em': 'italic c(gray-600)',
    'mark': 'bg(yellow-200) px(xs) py(2xs) r(sm) c(gray-900)',
    
    // Links - Bold minimal style
    'a': 'c(gray-900) font(medium) underline c(gray-900) transition',
    'a:hover': 'c(gray-700)',
    'a:active': 'c(gray-800)',
    
    // Lists - Bold minimal style
    'ul, ol': 'my(lg) pl(xl)',
    'ul': 'list(disc)',
    'ol': 'list(decimal)',
    'li': 'mb(sm) pl(sm) c(gray-700)',
    'li > ul, li > ol': 'my(sm)',
    'li > p': 'mb(sm)',
    'li > p:last-child': 'mb(0)',
    

    // Blockquotes - Bold minimal style
    'blockquote': 'my(xl) p(xl) bl(4/gray-900) bg(gray-50) r(md) italic',
    'blockquote p': 'mb(sm) c(gray-800) text(lg)',
    'blockquote p:last-child': 'mb(0)',
    'blockquote cite': 'block mt(md) text(sm) not-italic c(gray-600) font(medium)',
    'blockquote cite::before': 'content("—") mr(sm)',
    
    // Tables - Bold minimal style
    'table': 'w(full) my(xl) border-collapse border(2/gray-900) r(lg) overflow(hidden)',
    'thead': 'bg(gray-900) c(white)',
    'th': 'px(lg) py(md) text(sm) font(bold) uppercase tracking(wider) text(left)',
    'td': 'px(lg) py(md) bt(1/gray-200) text(sm)',
    'tbody tr:last-child td': 'bt(1/gray-200)',
    'tbody tr:hover': 'bg(gray-50)',
    
    // Media & visual elements - Bold minimal style
    'hr': 'my(4xl) border(0) h(2px) bg(gray-900)',
    'img': 'max-w(full) h(auto) r(lg) border(2/gray-900) shadow(lg) my(xl)',
    'figure': 'my(2xl)',
    'figure img': 'mx(auto) mb(md)',
    'figcaption': 'text(center) text(sm) c(gray-600) font(medium) mt(md)',
    
    // Code & interactive elements - Bold minimal theme
    'code': 'px(sm) py(xs) bg(gray-100) r(sm) border(1/gray-300) font(mono) text(sm) c(gray-900) break-words',
    'pre': 'my(xl) p(xl) bg(gray-900) c(white) r(lg) border(2/gray-900) overflow-x(auto) font(mono) text(sm) shadow(lg)',
    'pre code': 'p(0) bg(transparent) c(inherit) border(0)',
    'kbd': 'inline-block px(sm) py(xs) bg(gray-200) border(2/gray-300) r(sm) shadow(md) font(mono) text(xs) c(gray-900)',
    'abbr[title]': 'underline cursor(help) c(gray-700)',
    
    // Structured content
    'dl': 'my(xl)',
    'dt': 'font(bold) mt(lg) mb(sm) c(gray-900)',
    'dd': 'ml(xl) c(gray-700) mb(md)',
    
    'details': 'my(xl) p(lg) bg(gray-50) r(lg) border(2/gray-200) group',
    'summary': 'font(bold) cursor(pointer) select(none) list(none) c(gray-900)',
    'details[open] summary': 'mb(lg) pb(lg) bb(2/gray-200)',
    
    // Utility classes
    '> *:first-child': 'mt(0)',
    '> *:last-child': 'mb(0)',
    
    '.lead': 'text(20/1.6) c(neutral-600) mb(24)',
    
    // VitePress special elements
    '.tip, .warning, .danger, .info': 'my(16) p(16) r(8) border-l(4)',
    '.tip': 'bg(success.1) border-l(success) c(success-900)',
    '.warning': 'bg(warning.1) border-l(warning) c(warning-900)',
    '.danger': 'bg(error.1) border-l(error) c(error-900)',
    '.info': 'bg(primary.1) border-l(primary) c(primary-900)',
  },
  
  // Size variants - VitePress inspired
  sizes: {
    sm: 'text(base/1.5) max-w(sm)',
    default: '',
    lg: 'text(xl/1.7) max-w(4xl)'
  },
  
  // Style variants
  variants: {
    default: '',
    docs: 'max-w(3xl)',
    article: 'text(serif) hyphens(auto) max-w(prose) mx(auto)',
    technical: 'text(mono) max-w(4xl)',
    marketing: 'text(lg/1.65) tracking(tight)'
  },
  
  // Variant-specific overrides
  variantSelectors: {
    sm: {
      'h1': 'text(24px/1.25) mt(0) mb(lg)',
      'h2': 'text(20px/1.3) mt(3xl) mb(md)',
      'h3': 'text(16px/1.4) mt(2xl) mb(sm)',
      'blockquote': 'pl(12px) bl(3px)',
      'code': 'text(12px)',
      'pre': 'p(12px) text(12px)',
      'th, td': 'px(8px) py(6px) text(13px)'
    },
    
    lg: {
      'h1': 'text(40px/1.2/-2%) mt(0) mb(3xl)',
      'h2': 'text(32px/1.25/-1%) mt(6xl) mb(xl)',
      'h3': 'text(24px/1.3) mt(4xl) mb(lg)',
      'p': 'mb(20px) text(18px/1.7)',
      'blockquote': 'my(24px) pl(24px) bl(5px)',
      'pre': 'p(20px) my(24px)'
    },
    
    docs: {
      'h1': 'scroll-mt(80) mt(0) mb(2xl)',
      'h2': 'scroll-mt(80) mt(5xl) mb(lg) pb(sm) bb(1/neutral-200)',
      'h3': 'scroll-mt(80) mt(3xl) mb(md)',
      'h4': 'scroll-mt(80) mt(2xl) mb(sm)',
      'a[href^="#"]': 'c(primary) decoration(none)',
      'a[href^="#"]:hover': 'c(primary-700) decoration(underline)'
    },
    
    article: {
      'p': 'text-indent(2em) mb(0)',
      'p:first-of-type': 'text-indent(0) text(18/1.8)',
      'p:first-of-type::first-letter': 'float(left) text(72/1) font(700) mr(8) mt(4) c(primary)',
      'p + p': 'mt(0)',
      'h1, h2, h3': 'text(serif) text(center) my(32) mt(3xl) mb(xl)',
      'blockquote': 'text(italic) mx(32) my(32) text(center) border(0)',
      'blockquote p': 'text(20/1.6)'
    },
    
    technical: {
      'h1, h2, h3, h4, h5, h6': 'text(mono) font(400) mt(2xl) mb(lg)',
      'p': 'text(14/1.75)',
      'code': 'bg(primary.1) c(primary-700) px(6) py(2) border(1/primary-200)',
      'pre': 'bg(neutral-50) c(neutral-900) p(16) border(1/neutral-300) text(mono)',
      'pre code': 'p(0) bg(transparent) c(inherit) border(0)',
      'a': 'c(primary) decoration(none) font(500)',
      'a:hover': 'c(primary-700) decoration(underline)',
      'table': 'text(mono) text(13)',
      'ul, ol': 'text(14)'
    },
    
    marketing: {
      'h1': 'text(..5xl/1/-4%) font(black) tracking(tight) c(to-br/primary..primary-700)',
      'h2': 'text(..4xl/1.1/-3%) c(primary)',
      'h3': 'text(..3xl/1.2/-2%) c(primary-800)',
      'p': 'text(lg) lh(1.75) c(neutral-700)',
      'strong': 'c(primary)',
      'a': 'c(primary) font(medium) decoration(none) hover:decoration(underline)',
      'blockquote': 'text(xl) italic border-l(primary) pl(xl) my(2xl)',
      '.lead': 'text(2xl/1.5) font(light) c(neutral-700) max-w(4xl)'
    }
  },
  
  // Dark mode support
  states: {
    // Dark mode colors
    'dark': 'c(neutral-100) bg(neutral-900)',
  }
};

// Create prose component with elegant defaults
export const prose = defineComponent(proseDefinition, {
  defaultVariant: 'default',
  sizeOptions: ['sm', 'default', 'lg'],
});

// Semantic aliases
export const article = defineComponent({
  ...proseDefinition,
  defaults: { variant: 'article' }
});

export const documentation = defineComponent({
  ...proseDefinition,
  defaults: { variant: 'technical' }
});

export const markdown = prose;

// Export for 03-rules
export const proseRules = {
  prose,
  article,
  documentation,
  markdown
};