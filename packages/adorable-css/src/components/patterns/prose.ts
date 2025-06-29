import type { CSSRule, RuleHandler } from '../../rules/types';

// Ultra-refined typography styles inspired by high-end editorial design
const proseStyles: Record<string, CSSRule> = {
  // Base text with sophisticated defaults
  base: {
    'font-size': '1.0625rem', // 17px - slightly larger for elegance
    'line-height': '1.68',
    'color': 'var(--gray-750)',
    'max-width': '68ch',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'font-kerning': 'normal',
    'font-variant-ligatures': 'common-ligatures',
    'text-rendering': 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale'
  },

  // Elegant heading hierarchy with golden ratio scaling
  h1: {
    'font-size': 'clamp(2.5rem, 5vw, 3.815rem)',
    'font-weight': '850',
    'line-height': '1.08',
    'letter-spacing': '-0.035em',
    'margin-top': '0',
    'margin-bottom': '1.618rem',
    'color': 'var(--gray-925)',
    'font-feature-settings': '"ss01", "ss03"',
    'word-spacing': '-0.05em'
  },
  
  h2: {
    'font-size': 'clamp(1.875rem, 4vw, 2.361rem)',
    'font-weight': '750',
    'line-height': '1.18',
    'letter-spacing': '-0.028em',
    'margin-top': '3.236rem',
    'margin-bottom': '1.236rem',
    'color': 'var(--gray-900)',
    'font-feature-settings': '"ss01"'
  },
  
  h3: {
    'font-size': 'clamp(1.375rem, 3vw, 1.777rem)',
    'font-weight': '650',
    'line-height': '1.28',
    'letter-spacing': '-0.021em',
    'margin-top': '2.618rem',
    'margin-bottom': '1rem',
    'color': 'var(--gray-875)'
  },
  
  h4: {
    'font-size': '1.333rem',
    'font-weight': '625',
    'line-height': '1.35',
    'letter-spacing': '-0.016em',
    'margin-top': '2.058rem',
    'margin-bottom': '0.809rem',
    'color': 'var(--gray-850)'
  },
  
  h5: {
    'font-size': '1.125rem',
    'font-weight': '600',
    'line-height': '1.42',
    'letter-spacing': '-0.011em',
    'margin-top': '1.618rem',
    'margin-bottom': '0.618rem',
    'color': 'var(--gray-825)'
  },
  
  h6: {
    'font-size': '0.9375rem',
    'font-weight': '575',
    'line-height': '1.5',
    'margin-top': '1.309rem',
    'margin-bottom': '0.5rem',
    'color': 'var(--gray-800)',
    'text-transform': 'uppercase',
    'letter-spacing': '0.08em',
    'font-feature-settings': '"c2sc", "smcp"'
  },
  
  // Refined body text
  p: {
    'margin-top': '0',
    'margin-bottom': '1.309rem',
    'hanging-punctuation': 'first',
    'hyphens': 'auto'
  },
  
  // Sophisticated link styling
  a: {
    'color': 'var(--indigo-650)',
    'text-decoration': 'none',
    'font-weight': '465',
    'transition': 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    'position': 'relative',
    'text-underline-offset': '0.15em',
    'text-decoration-thickness': '0.5px'
  },
  
  'a:hover': {
    'color': 'var(--indigo-750)',
    'text-decoration': 'underline',
    'text-decoration-color': 'var(--indigo-400)',
    'text-underline-offset': '0.2em'
  },
  
  'a:active': {
    'color': 'var(--indigo-800)',
    'transform': 'translateY(0.5px)'
  },
  
  // Editorial-style lists
  ul: {
    'margin-top': '0',
    'margin-bottom': '1.618rem',
    'padding-left': '0',
    'list-style': 'none'
  },
  
  ol: {
    'margin-top': '0',
    'margin-bottom': '1.618rem',
    'padding-left': '0',
    'list-style': 'none',
    'counter-reset': 'prose-counter'
  },
  
  'ul > li': {
    'position': 'relative',
    'padding-left': '2rem',
    'margin-bottom': '0.618rem',
    'min-height': '1.618rem'
  },
  
  'ul > li::before': {
    'content': '"—"', // em dash for sophistication
    'position': 'absolute',
    'left': '0.382rem',
    'color': 'var(--indigo-600)',
    'font-weight': '400',
    'font-size': '0.875em'
  },
  
  'ol > li': {
    'position': 'relative',
    'padding-left': '2rem',
    'margin-bottom': '0.618rem',
    'counter-increment': 'prose-counter',
    'min-height': '1.618rem'
  },
  
  'ol > li::before': {
    'content': 'counter(prose-counter)',
    'position': 'absolute',
    'left': '0',
    'top': '-0.05em',
    'color': 'var(--indigo-650)',
    'font-weight': '500',
    'font-size': '0.875rem',
    'font-feature-settings': '"tnum", "ss01"',
    'width': '1.5rem',
    'text-align': 'right'
  },
  
  // Nested lists with proper indentation
  'li ul, li ol': {
    'margin-top': '0.618rem',
    'margin-bottom': '0.618rem'
  },
  
  'li li': {
    'font-size': '0.98em'
  },
  
  // Elegant code blocks
  pre: {
    'background': 'linear-gradient(135deg, var(--gray-50) 0%, var(--gray-25) 100%)',
    'border': '1px solid var(--gray-150)',
    'border-radius': '0.618rem',
    'padding': '1.618rem 1.309rem',
    'overflow-x': 'auto',
    'margin': '2.058rem -0.5rem',
    'font-size': '0.8125rem',
    'line-height': '1.85',
    'color': 'var(--gray-875)',
    'font-family': '"JetBrains Mono", "SF Mono", Monaco, Consolas, monospace',
    'tab-size': '2',
    'box-shadow': '0 2px 4px -1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.03)',
    'position': 'relative'
  },
  
  'pre::before': {
    'content': '""',
    'position': 'absolute',
    'top': '0.618rem',
    'right': '0.618rem',
    'width': '0.382rem',
    'height': '0.382rem',
    'background': 'var(--green-500)',
    'border-radius': '50%',
    'box-shadow': '-0.618rem 0 0 var(--amber-500), -1.236rem 0 0 var(--red-500)'
  },
  
  code: {
    'font-family': 'inherit',
    'font-size': '0.875em',
    'background': 'rgba(99, 102, 241, 0.08)',
    'padding': '0.125rem 0.382rem',
    'border-radius': '0.236rem',
    'color': 'var(--indigo-700)',
    'font-weight': '450',
    'white-space': 'nowrap'
  },
  
  'pre code': {
    'background': 'transparent',
    'padding': '0',
    'border-radius': '0',
    'color': 'inherit',
    'font-weight': 'normal',
    'white-space': 'pre'
  },
  
  // Magazine-style blockquotes
  blockquote: {
    'margin': '2.618rem -1rem',
    'padding': '1.618rem 2rem',
    'background': 'linear-gradient(to right, var(--gray-50) 0%, transparent 100%)',
    'border-left': '3px solid var(--indigo-500)',
    'font-style': 'italic',
    'font-size': '1.125rem',
    'line-height': '1.75',
    'color': 'var(--gray-700)',
    'position': 'relative',
    'quotes': 'none'
  },
  
  'blockquote::before': {
    'content': '"""',
    'position': 'absolute',
    'top': '0.618rem',
    'left': '1.309rem',
    'font-size': '3rem',
    'line-height': '1',
    'color': 'var(--indigo-200)',
    'font-family': 'Georgia, serif',
    'font-style': 'normal'
  },
  
  'blockquote p': {
    'margin-bottom': '0.618rem'
  },
  
  'blockquote p:last-child': {
    'margin-bottom': '0'
  },
  
  'blockquote cite': {
    'display': 'block',
    'margin-top': '1rem',
    'font-size': '0.875rem',
    'font-style': 'normal',
    'color': 'var(--gray-600)',
    'text-align': 'right'
  },
  
  'blockquote cite::before': {
    'content': '"— "',
    'color': 'var(--indigo-400)'
  },
  
  // Premium table design
  table: {
    'width': '100%',
    'border-collapse': 'separate',
    'border-spacing': '0',
    'margin': '2.618rem 0',
    'font-size': '0.9375rem',
    'font-variant-numeric': 'tabular-nums',
    'background': 'white',
    'box-shadow': '0 0 0 1px var(--gray-200), 0 1px 3px 0 rgb(0 0 0 / 0.05)'
  },
  
  'th, td': {
    'text-align': 'left',
    'padding': '0.809rem 1.309rem',
    'border-bottom': '1px solid var(--gray-100)'
  },
  
  th: {
    'font-weight': '600',
    'background': 'var(--gray-50)',
    'color': 'var(--gray-800)',
    'font-size': '0.8125rem',
    'letter-spacing': '0.05em',
    'text-transform': 'uppercase',
    'border-bottom': '2px solid var(--gray-200)'
  },
  
  'thead th:first-child': {
    'border-top-left-radius': '0.382rem'
  },
  
  'thead th:last-child': {
    'border-top-right-radius': '0.382rem'
  },
  
  'tbody tr': {
    'transition': 'background-color 0.15s ease'
  },
  
  'tbody tr:hover': {
    'background': 'var(--indigo-50)'
  },
  
  'tbody tr:last-child td': {
    'border-bottom': 'none'
  },
  
  'tbody tr:last-child td:first-child': {
    'border-bottom-left-radius': '0.382rem'
  },
  
  'tbody tr:last-child td:last-child': {
    'border-bottom-right-radius': '0.382rem'
  },
  
  // Subtle horizontal rules
  hr: {
    'border': 'none',
    'height': '1px',
    'background': 'radial-gradient(ellipse at center, var(--gray-300) 0%, transparent 70%)',
    'margin': '3.236rem auto',
    'width': '50%',
    'opacity': '0.5'
  },
  
  // Editorial images
  img: {
    'max-width': '100%',
    'height': 'auto',
    'border-radius': '0.618rem',
    'margin': '2.618rem auto',
    'display': 'block',
    'box-shadow': '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  },
  
  // Figure with captions
  figure: {
    'margin': '2.618rem -1rem',
    'text-align': 'center'
  },
  
  'figure img': {
    'margin': '0 auto 1rem'
  },
  
  figcaption: {
    'font-size': '0.875rem',
    'color': 'var(--gray-600)',
    'font-style': 'italic',
    'padding': '0 1rem'
  },
  
  // Text emphasis with style
  strong: {
    'font-weight': '650',
    'color': 'var(--gray-900)',
    'letter-spacing': '-0.01em'
  },
  
  em: {
    'font-style': 'italic',
    'font-variation-settings': '"slnt" -12'
  },
  
  // Refined keyboard input
  kbd: {
    'font-family': '"SF Mono", Monaco, Consolas, monospace',
    'font-size': '0.8125em',
    'padding': '0.1875rem 0.5rem',
    'background': 'linear-gradient(to bottom, var(--gray-50) 0%, var(--gray-100) 100%)',
    'border': '1px solid var(--gray-300)',
    'border-bottom': '2px solid var(--gray-400)',
    'border-radius': '0.309rem',
    'box-shadow': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    'color': 'var(--gray-800)',
    'font-weight': '500',
    'white-space': 'nowrap'
  },
  
  // Sophisticated abbreviations
  abbr: {
    'text-decoration': 'none',
    'border-bottom': '1px dotted var(--gray-400)',
    'cursor': 'help',
    'font-variant-caps': 'all-small-caps',
    'letter-spacing': '0.05em'
  },
  
  // Elegant highlights
  mark: {
    'background': 'linear-gradient(104deg, transparent 0.9%, var(--amber-200) 2.4%, var(--amber-200) 97.6%, transparent 99.1%)',
    'color': 'inherit',
    'padding': '0.125rem 0',
    'border-radius': '0.125rem'
  },
  
  // Definition lists with style
  dl: {
    'margin': '1.618rem 0'
  },
  
  dt: {
    'font-weight': '625',
    'margin-top': '1.309rem',
    'color': 'var(--gray-875)',
    'font-size': '1.0625rem'
  },
  
  dd: {
    'margin-left': '2rem',
    'margin-top': '0.382rem',
    'margin-bottom': '1rem',
    'color': 'var(--gray-650)'
  },
  
  // Interactive details
  details: {
    'margin': '1.618rem 0',
    'padding': '1.309rem',
    'background': 'var(--gray-50)',
    'border': '1px solid var(--gray-200)',
    'border-radius': '0.5rem',
    'transition': 'all 0.2s ease'
  },
  
  'details:hover': {
    'border-color': 'var(--indigo-300)',
    'box-shadow': '0 4px 6px -1px rgb(0 0 0 / 0.05)'
  },
  
  summary: {
    'font-weight': '600',
    'cursor': 'pointer',
    'user-select': 'none',
    'color': 'var(--gray-875)',
    'list-style': 'none',
    'position': 'relative',
    'padding-left': '1.618rem'
  },
  
  'summary::-webkit-details-marker': {
    'display': 'none'
  },
  
  'summary::before': {
    'content': '"▸"',
    'position': 'absolute',
    'left': '0',
    'color': 'var(--indigo-500)',
    'transition': 'transform 0.2s ease',
    'transform-origin': '0.309rem center'
  },
  
  'details[open] summary::before': {
    'transform': 'rotate(90deg)'
  },
  
  'details[open] summary': {
    'margin-bottom': '1rem',
    'color': 'var(--indigo-700)'
  },
  
  // Superscript and subscript
  'sup, sub': {
    'font-size': '0.75em',
    'line-height': '0',
    'position': 'relative',
    'vertical-align': 'baseline'
  },
  
  sup: {
    'top': '-0.5em'
  },
  
  sub: {
    'bottom': '-0.25em'
  },
  
  // First/last child refinements
  '> *:first-child': {
    'margin-top': '0'
  },
  
  '> *:last-child': {
    'margin-bottom': '0'
  },
  
  // Lead paragraph
  '.lead': {
    'font-size': '1.25rem',
    'line-height': '1.6',
    'color': 'var(--gray-650)',
    'font-weight': '350',
    'letter-spacing': '-0.01em'
  }
};

export const prose: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    // Return base prose styles with all nested selectors
    const result: CSSRule = { ...proseStyles.base };
    
    // Add all nested styles
    Object.entries(proseStyles).forEach(([selector, styles]) => {
      if (selector !== 'base') {
        result[`& ${selector}`] = styles;
      }
    });
    
    return result;
  }
  
  // Handle variants
  const variants: Record<string, Partial<typeof proseStyles>> = {
    // Compact variant for UI
    compact: {
      base: { 
        'font-size': '0.9375rem', 
        'line-height': '1.6',
        'max-width': '55ch'
      },
      h1: { 'font-size': '2rem' },
      h2: { 'font-size': '1.618rem' },
      h3: { 'font-size': '1.309rem' },
      blockquote: { 'font-size': '1rem' }
    },
    
    // Large variant for hero sections
    large: {
      base: { 
        'font-size': '1.1875rem', 
        'line-height': '1.75',
        'max-width': '75ch'
      },
      h1: { 'font-size': 'clamp(3rem, 6vw, 4.5rem)' },
      h2: { 'font-size': 'clamp(2.25rem, 5vw, 3rem)' },
      h3: { 'font-size': 'clamp(1.75rem, 4vw, 2.25rem)' }
    },
    
    // Dark mode with refined colors
    dark: {
      base: { 
        'color': 'var(--gray-350)' 
      },
      'h1, h2, h3, h4, h5, h6': { 
        'color': 'var(--gray-100)' 
      },
      a: { 
        'color': 'var(--indigo-400)' 
      },
      'a:hover': { 
        'color': 'var(--indigo-300)',
        'text-decoration-color': 'var(--indigo-500)'
      },
      strong: { 
        'color': 'var(--gray-50)' 
      },
      blockquote: { 
        'background': 'linear-gradient(to right, rgba(99, 102, 241, 0.05) 0%, transparent 100%)',
        'border-left-color': 'var(--indigo-400)',
        'color': 'var(--gray-400)'
      },
      'blockquote::before': {
        'color': 'var(--indigo-700)'
      },
      pre: { 
        'background': 'linear-gradient(135deg, var(--gray-900) 0%, var(--gray-850) 100%)', 
        'border-color': 'var(--gray-700)',
        'color': 'var(--gray-200)'
      },
      code: { 
        'background': 'rgba(99, 102, 241, 0.15)',
        'color': 'var(--indigo-300)'
      },
      th: { 
        'background': 'var(--gray-850)',
        'color': 'var(--gray-200)',
        'border-bottom-color': 'var(--gray-700)'
      },
      'th, td': { 
        'border-bottom-color': 'var(--gray-800)' 
      },
      table: {
        'background': 'var(--gray-900)',
        'box-shadow': '0 0 0 1px var(--gray-700)'
      },
      'tbody tr:hover': {
        'background': 'rgba(99, 102, 241, 0.05)'
      },
      hr: { 
        'background': 'radial-gradient(ellipse at center, var(--gray-600) 0%, transparent 70%)' 
      },
      kbd: {
        'background': 'linear-gradient(to bottom, var(--gray-800) 0%, var(--gray-850) 100%)',
        'border-color': 'var(--gray-600)',
        'border-bottom-color': 'var(--gray-500)',
        'color': 'var(--gray-300)'
      },
      mark: {
        'background': 'linear-gradient(104deg, transparent 0.9%, rgba(251, 191, 36, 0.3) 2.4%, rgba(251, 191, 36, 0.3) 97.6%, transparent 99.1%)'
      },
      details: {
        'background': 'var(--gray-850)',
        'border-color': 'var(--gray-700)'
      },
      'details:hover': {
        'border-color': 'var(--indigo-500)'
      },
      dt: {
        'color': 'var(--gray-100)'
      },
      dd: {
        'color': 'var(--gray-450)'
      },
      summary: {
        'color': 'var(--gray-200)'
      },
      'details[open] summary': {
        'color': 'var(--indigo-400)'
      },
      figcaption: {
        'color': 'var(--gray-500)'
      },
      'blockquote cite': {
        'color': 'var(--gray-500)'
      },
      'ul > li::before': {
        'color': 'var(--indigo-500)'
      },
      'ol > li::before': {
        'color': 'var(--indigo-450)'
      }
    },
    
    // Serif variant for articles
    serif: {
      base: {
        'font-family': '"Crimson Pro", Georgia, serif',
        'font-size': '1.125rem',
        'line-height': '1.8'
      },
      'h1, h2, h3, h4, h5, h6': {
        'font-family': '"Playfair Display", Georgia, serif',
        'font-weight': '700'
      },
      blockquote: {
        'font-family': '"Crimson Pro", Georgia, serif'
      }
    },
    
    // Wide variant for full-width content
    wide: {
      base: {
        'max-width': '90ch'
      },
      pre: {
        'margin-left': '-2rem',
        'margin-right': '-2rem',
        'padding-left': '2rem',
        'padding-right': '2rem'
      },
      blockquote: {
        'margin-left': '-2rem',
        'margin-right': '-2rem'
      },
      figure: {
        'margin-left': '-3rem',
        'margin-right': '-3rem'
      }
    }
  };
  
  if (variants[args]) {
    const variantStyles = variants[args];
    const mergedStyles: CSSRule = { ...proseStyles.base };
    
    // Merge variant base styles
    if (variantStyles.base) {
      Object.assign(mergedStyles, variantStyles.base);
    }
    
    // Add all nested styles with variant overrides
    Object.entries(proseStyles).forEach(([selector, styles]) => {
      if (selector !== 'base') {
        const variantOverrides = variantStyles[selector as keyof typeof variantStyles] || {};
        mergedStyles[`& ${selector}`] = { ...styles, ...variantOverrides };
      }
    });
    
    return mergedStyles;
  }
  
  return {};
};

// Markdown alias
export const markdown = prose;

export const proseRules = {
  prose,
  markdown
};