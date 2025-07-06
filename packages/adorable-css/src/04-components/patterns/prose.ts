import { defineComponent } from '../defineComponent';
import type { ComponentDefinition } from '../defineComponent';

// VitePress-inspired prose component with refined typography
const proseDefinition: ComponentDefinition = {
  // Base typography with optimal reading experience
  base: 'font(16/1.6) c(neutral-700)',
  
  selectors: {
    // Typography hierarchy using heading component with margin
    'h1': 'heading(h1) mt(0) mb(2xl)',
    'h2': 'heading(h2) mt(5xl) mb(lg) pb(sm) border-b(1/neutral-200)',
    'h3': 'heading(h3) mt(3xl) mb(md)',
    'h4': 'heading(h4) mt(2xl) mb(sm)',
    'h5': 'heading(h5) mt(lg) mb(sm)',
    'h6': 'heading(h6) mt(lg) mb(sm)',
    
    // Body & inline elements - VitePress inspired
    'p': 'font(16/1.7) mb(16) c(neutral-700)',
    'strong': 'bold(600) c(primary)',
    'em': 'italic',
    'mark': 'bg(warning.2) px(4) py(1) r(2)',
    
    // Links - VitePress style
    'a': 'c(primary) decoration(underline) decoration(primary.3) underline-offset(2) transition(all/150ms)',
    'a:hover': 'c(primary-700) decoration(primary-700.6)',
    'a:active': 'c(primary-800)',
    
    // Lists - VitePress style
    'ul, ol': 'my(16) pl(20)',
    'ul': 'list(disc)',
    'ol': 'list(decimal)',
    'li': 'mb(4) pl(8)',
    'li > ul, li > ol': 'my(8)',
    'li > p': 'mb(8)',
    'li > p:last-child': 'mb(0)',
    

    // Blockquotes - VitePress style
    'blockquote': 'my(16) pl(16) border-l(4/neutral-300) c(neutral-600) italic',
    'blockquote p': 'mb(8)',
    'blockquote p:last-child': 'mb(0)',
    'blockquote cite': 'block mt(8) font(14) not-italic c(neutral-500)',
    'blockquote cite::before': 'content("—") mr(4)',
    
    // Tables - VitePress style
    'table': 'w(full) my(16) border-collapse text(left)',
    'thead': 'border-b(2/neutral-300)',
    'th': 'px(12) py(8) font(14) bold(600) c(primary) text(left)',
    'td': 'px(12) py(8) border-b(1/neutral-200)',
    'tbody tr:last-child td': 'border-b(0)',
    'tbody tr:hover': 'bg(neutral-50)',
    
    // Media & visual elements - VitePress style
    'hr': 'my(32) border(0) h(1) bg(neutral-200)',
    'img': 'max-w(full) h(auto) r(8) my(16)',
    'figure': 'my(24)',
    'figure img': 'mx(auto) mb(8)',
    'figcaption': 'text(center) font(14) c(neutral-600) mt(8)',
    
    // Code & interactive elements - Light theme
    'code': 'px(4) py(1) bg(neutral-50) r(4) border(1/neutral-200) font(sm) break-words',
    'pre': 'my(16) p(16) c(neutral-900) r(8) border(1/neutral-200) overflow-x(auto) font(mono) font(xs)',
    'pre code': 'p(0) bg(transparent) c(inherit) border(0)',
    'kbd': 'inline-block px(6) py(1) bg(neutral-100) border(1/neutral-300) r(4) shadow(sm) font(mono) font(12) c(neutral-700)',
    'abbr[title]': 'decoration(dotted) underline-offset(2) cursor(help)',
    
    // Structured content
    'dl': 'my(lg)',
    'dt': 'bold(medium) mt(lg) mb(xs) c(primary)',
    'dd': 'ml(lg) c(neutral-700)',
    
    'details': 'my(lg) p(md) bg(neutral-50) r(lg) group',
    'summary': 'bold(medium) cursor(pointer) select(none) list(none)',
    'details[open] summary': 'mb(md)',
    
    // Utility classes
    '> *:first-child': 'mt(0)',
    '> *:last-child': 'mb(0)',
    
    '.lead': 'font(20/1.6) c(neutral-600) mb(24)',
    
    // VitePress special elements
    '.tip, .warning, .danger, .info': 'my(16) p(16) r(8) border-l(4)',
    '.tip': 'bg(success.1) border-l(success) c(success-900)',
    '.warning': 'bg(warning.1) border-l(warning) c(warning-900)',
    '.danger': 'bg(error.1) border-l(error) c(error-900)',
    '.info': 'bg(primary.1) border-l(primary) c(primary-900)',
  },
  
  // Size variants - VitePress inspired
  sizes: {
    sm: 'font(base/1.5) max-w(sm)',
    default: '',
    lg: 'font(xl/1.7) max-w(4xl)'
  },
  
  // Style variants
  variants: {
    default: '',
    docs: 'max-w(3xl)',
    article: 'font(serif) hyphens(auto) max-w(prose) mx(auto)',
    technical: 'font(mono) max-w(4xl)',
    marketing: 'font(lg/1.65) tracking(tight)'
  },
  
  // Variant-specific overrides
  variantSelectors: {
    sm: {
      'h1': 'font(24/1.25) mt(0) mb(lg)',
      'h2': 'font(20/1.3) mt(3xl) mb(md)',
      'h3': 'font(16/1.4) mt(2xl) mb(sm)',
      'blockquote': 'pl(12) border-l(3)',
      'code': 'font(12)',
      'pre': 'p(12) font(12)',
      'th, td': 'px(8) py(6) font(13)'
    },
    
    lg: {
      'h1': 'font(40/1.2/-2%) mt(0) mb(3xl)',
      'h2': 'font(32/1.25/-1%) mt(6xl) mb(xl)',
      'h3': 'font(24/1.3) mt(4xl) mb(lg)',
      'p': 'mb(20) font(18/1.7)',
      'blockquote': 'my(24) pl(24) border-l(5)',
      'pre': 'p(20) my(24)'
    },
    
    docs: {
      'h1': 'scroll-mt(80) mt(0) mb(2xl)',
      'h2': 'scroll-mt(80) mt(5xl) mb(lg) pb(sm) border-b(1/neutral-200)',
      'h3': 'scroll-mt(80) mt(3xl) mb(md)',
      'h4': 'scroll-mt(80) mt(2xl) mb(sm)',
      'a[href^="#"]': 'c(primary) decoration(none)',
      'a[href^="#"]:hover': 'c(primary-700) decoration(underline)'
    },
    
    article: {
      'p': 'text-indent(2em) mb(0)',
      'p:first-of-type': 'text-indent(0) font(18/1.8)',
      'p:first-of-type::first-letter': 'float(left) font(72/1) bold(700) mr(8) mt(4) c(primary)',
      'p + p': 'mt(0)',
      'h1, h2, h3': 'font(serif) text(center) my(32) mt(3xl) mb(xl)',
      'blockquote': 'font(italic) mx(32) my(32) text(center) border(0)',
      'blockquote p': 'font(20/1.6)'
    },
    
    technical: {
      'h1, h2, h3, h4, h5, h6': 'font(mono) bold(400) mt(2xl) mb(lg)',
      'p': 'font(14/1.75)',
      'code': 'bg(primary.1) c(primary-700) px(6) py(2) border(1/primary-200)',
      'pre': 'bg(neutral-50) c(neutral-900) p(16) border(1/neutral-300) font(mono)',
      'pre code': 'p(0) bg(transparent) c(inherit) border(0)',
      'a': 'c(primary) decoration(none) bold(500)',
      'a:hover': 'c(primary-700) decoration(underline)',
      'table': 'font(mono) font(13)',
      'ul, ol': 'font(14)'
    },
    
    marketing: {
      'h1': 'font(..5xl/1/-4%) bold(black) tracking(tight) c(to-br/primary..primary-700)',
      'h2': 'font(..4xl/1.1/-3%) c(primary)',
      'h3': 'font(..3xl/1.2/-2%) c(primary-800)',
      'p': 'font(lg) lh(1.75) c(neutral-700)',
      'strong': 'c(primary)',
      'a': 'c(primary) bold(medium) decoration(none) hover:decoration(underline)',
      'blockquote': 'font(xl) italic border-l(primary) pl(xl) my(2xl)',
      '.lead': 'font(2xl/1.5) bold(light) c(neutral-700) max-w(4xl)'
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