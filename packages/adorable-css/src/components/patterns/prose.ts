import { defineComponent } from '../defineComponent';
import type { ComponentDefinition } from '../defineComponent';

// Elegant prose component with refined AdorableCSS syntax
const proseDefinition: ComponentDefinition = {
  // Base typography with golden ratio spacing
  base: 'text(md)',
  
  selectors: {
    // Typography hierarchy using heading component
    'h1': 'heading(h1)',
    'h2': 'heading(h2)',
    'h3': 'heading(h3)',
    'h4': 'heading(h4)',
    'h5': 'heading(h5)',
    'h6': 'heading(h6)',
    
    // Body & inline elements
    'p': 'font(md/relaxed) pb(lg)',
    'strong': 'bold(semi) c(gray-900)',
    'em': 'italic',
    'mark': 'bg(yellow-100) px(xs) r(xs)',
    
    // Links with subtle interaction
    'a': 'link c(blue-600) underline decoration(blue-200) decoration(1) underline-offset(2)',
    'a:hover': 'c(blue-700) decoration(blue-500) decoration(2)',
    'a:active': 'c(blue-800)',
    
    // Lists with refined markers
    'ul, ol': 'list-container my(lg)',
    'ul > li': 'list-item(bullet) mb(sm)',
    'ol > li': 'list-item(number) mb(sm) counter-increment(prose-ol)',
    'ol > li::before': 'content(counter(prose-ol,decimal-leading-zero)) absolute left(0) c(gray-500) font(sm) bold(medium)',
    'ol': 'counter-reset(prose-ol)',
    'li ul, li ol': 'my(sm)',
    'li li': 'font(md)',
    

    // Blockquotes with elegance
    'blockquote': 'blockquote my(2xl)',
    'blockquote p': 'mb(md)',
    'blockquote p:last-child': 'mb(0)',
    'blockquote cite': 'block mt(sm) font(sm) not-italic c(gray-600)',
    'blockquote cite::before': 'content("—") mr(xs)',
    
    // Tables with clean design
    'table': 'table my(xl)',
    'th, td': 'table-cell',
    'th': 'table-header',
    'tbody tr:hover': 'bg(gray-50)',
    'tbody tr:last-child td': 'border-b(0)',
    
    // Media & visual elements
    'hr': 'divider my(3xl)',
    'img': 'image my(xl)',
    'figure': 'figure my(xl)',
    'figure img': 'mx(auto) mb(md)',
    'figcaption': 'caption',
    
    // Interactive elements
    'kbd': 'kbd',
    'abbr[title]': 'decoration(dotted) underline-offset(2) cursor(help)',
    
    // Structured content
    'dl': 'my(lg)',
    'dt': 'bold(medium) mt(lg) mb(xs) c(gray-900)',
    'dd': 'ml(lg) c(gray-700)',
    
    'details': 'my(lg) p(md) bg(gray-50) r(lg) group',
    'summary': 'bold(medium) cursor(pointer) select(none) list(none)',
    'details[open] summary': 'mb(md)',
    
    // Utility classes
    '> *:first-child': 'mt(0)',
    '> *:last-child': 'mb(0)',
    
    '.lead': 'font(xl/1.5) c(gray-700)',
  },
  
  // Size variants
  sizes: {
    sm: 'font(base/1.5) max-w(sm)',
    default: '',
    lg: 'font(xl/1.7) max-w(4xl)'
  },
  
  // Style variants
  variants: {
    default: '',
    article: 'font(serif) hyphens(auto)',
    technical: 'font(mono)',
    marketing: 'font(lg/1.65) tracking(tight)'
  },
  
  // Variant-specific overrides
  variantSelectors: {
    sm: {
      'h1': 'font(2xl)',
      'h2': 'font(xl)',
      'h3': 'font(lg)',
      'blockquote': 'pl(md) border-l(2)',
      'code': 'font(xs)',
      'pre': 'p(md)',
      'th, td': 'p(sm)'
    },
    
    lg: {
      'h1': 'font(5xl/1/-3%)',
      'h2': 'font(4xl/1.1/-2%)',
      'h3': 'font(3xl/1.2/-1%)',
      'p': 'mb(xl)',
      'blockquote': 'my(3xl) pl(xl) border-l(6)',
      'pre': 'p(xl) my(2xl)'
    },
    
    article: {
      'p': 'text-indent(2rem) mb(0)',
      'p:first-of-type': 'text-indent(0)',
      'p + p': 'mt(0)',
      'h1, h2, h3': 'font(serif) text(center)',
      'blockquote': 'font(italic) mx(xl)'
    },
    
    technical: {
      'h1, h2, h3, h4, h5, h6': 'font(mono) bold(normal)',
      'p': 'lh(1.75)',
      'code': 'bg(gray-900) c(green-400)',
      'pre': 'bg(gray-900) c(gray-100) p(xl)',
      'pre code': 'c(inherit)',
      'a': 'c(cyan-500) decoration(none)',
      'a:hover': 'c(cyan-400) underline'
    },
    
    marketing: {
      'h1': 'font(..5xl/1/-4%) bold(black) tracking(tight) c(gradient(to-br/purple-600..pink-600))',
      'h2': 'font(..4xl/1.1/-3%) c(gray-900)',
      'h3': 'font(..3xl/1.2/-2%) c(gray-800)',
      'p': 'font(lg) lh(1.75) c(gray-700)',
      'strong': 'c(purple-600)',
      'a': 'c(purple-600) bold(medium) decoration(none) hover:decoration(underline)',
      'blockquote': 'font(xl) italic border-l(purple-400) pl(xl) my(2xl)',
      '.lead': 'font(2xl/1.5) bold(light) c(gray-700) max-w(4xl)'
    }
  },
  
  // Dark mode support
  states: {
    // Dark mode colors
    'dark': 'c(gray-100) bg(gray-900)',
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

// Export for rules
export const proseRules = {
  prose,
  article,
  documentation,
  markdown
};