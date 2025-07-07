import { defineComponent } from '../defineComponent';
import type { ComponentDefinition } from '../defineComponent';

// VitePress-inspired prose component with refined typography
const proseDefinition: ComponentDefinition = {
  // Base typography with optimal reading experience
  base: 'font(16/1.7) c(gray-700)',
  
  selectors: {
    // Typography hierarchy using heading component with margin
    'h1': 'display(2xl) font(black) tracking(tight) c(gray-900) mt(0) mb(2xl)',
    'h2': 'display(xl) font(black) tracking(tight) c(gray-900) mt(5xl) mb(lg) pb(sm) bb(2/gray-900)',
    'h3': 'font(xl) font(bold) c(gray-900) mt(3xl) mb(md)',
    'h4': 'font(lg) font(bold) c(gray-900) mt(2xl) mb(sm)',
    'h5': 'font(md) font(bold) c(gray-900) mt(lg) mb(sm)',
    'h6': 'font(sm) font(bold) c(gray-900) mt(lg) mb(sm)',
    
    // Body & inline elements - Bold minimal inspired
    'p': 'font(16/1.7) mb(lg) c(gray-700)',
    'strong': 'font(bold) c(gray-900)',
    'em': 'italic c(gray-600)',
    'mark': 'bg(yellow-200) px(xs) py(2xs) r(sm) c(gray-900)',
    
    // Links - Bold minimal style
    'a': 'c(gray-900) font(medium) decoration(underline) decoration(gray-400) underline-offset(4) transition',
    'a:hover': 'c(gray-900) decoration(gray-900)',
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
    'blockquote': 'my(xl) p(xl) border-l(4/gray-900) bg(gray-50) r(md) italic',
    'blockquote p': 'mb(sm) c(gray-800) font(lg)',
    'blockquote p:last-child': 'mb(0)',
    'blockquote cite': 'block mt(md) font(sm) not-italic c(gray-600) font(medium)',
    'blockquote cite::before': 'content("—") mr(sm)',
    
    // Tables - Bold minimal style
    'table': 'w(full) my(xl) border-collapse border(2/gray-900) r(lg) overflow(hidden)',
    'thead': 'bg(gray-900) c(white)',
    'th': 'px(lg) py(md) font(sm) font(bold) uppercase tracking(wider) text(left)',
    'td': 'px(lg) py(md) border-t(1/gray-200) font(sm)',
    'tbody tr:last-child td': 'border-t(1/gray-200)',
    'tbody tr:hover': 'bg(gray-50)',
    
    // Media & visual elements - Bold minimal style
    'hr': 'my(4xl) border(0) h(2) bg(gray-900)',
    'img': 'max-w(full) h(auto) r(lg) border(2/gray-900) shadow(lg) my(xl)',
    'figure': 'my(2xl)',
    'figure img': 'mx(auto) mb(md)',
    'figcaption': 'text(center) font(sm) c(gray-600) font(medium) mt(md)',
    
    // Code & interactive elements - Bold minimal theme
    'code': 'px(sm) py(xs) bg(gray-100) r(sm) border(1/gray-300) font(mono) font(sm) c(gray-900) break-words',
    'pre': 'my(xl) p(xl) bg(gray-900) c(white) r(lg) border(2/gray-900) overflow-x(auto) font(mono) font(sm) shadow(lg)',
    'pre code': 'p(0) bg(transparent) c(inherit) border(0)',
    'kbd': 'inline-block px(sm) py(xs) bg(gray-200) border(2/gray-300) r(sm) shadow(md) font(mono) font(xs) c(gray-900)',
    'abbr[title]': 'decoration(dotted) underline-offset(2) cursor(help) c(gray-700)',
    
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
      'h2': 'scroll-mt(80) mt(5xl) mb(lg) pb(sm) bb(1/neutral-200)',
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