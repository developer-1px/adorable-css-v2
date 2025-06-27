import type { CSSRule, RuleHandler } from '../../rules/types';

// Apple-inspired typography styles for markdown content
const proseStyles: Record<string, CSSRule> = {
  base: {
    'color': '#1D1D1F',
    'line-height': '1.75',
    'font-size': '17px',
    'max-width': '65ch'
  },
  
  // Headings with Apple's typographic scale
  h1: {
    'font-size': '56px',
    'font-weight': '700',
    'line-height': '1.1',
    'letter-spacing': '-0.02em',
    'margin-top': '0',
    'margin-bottom': '32px'
  },
  
  h2: {
    'font-size': '40px',
    'font-weight': '700',
    'line-height': '1.2',
    'letter-spacing': '-0.015em',
    'margin-top': '56px',
    'margin-bottom': '24px'
  },
  
  h3: {
    'font-size': '28px',
    'font-weight': '600',
    'line-height': '1.3',
    'letter-spacing': '-0.01em',
    'margin-top': '48px',
    'margin-bottom': '16px'
  },
  
  h4: {
    'font-size': '21px',
    'font-weight': '600',
    'line-height': '1.4',
    'letter-spacing': '-0.005em',
    'margin-top': '32px',
    'margin-bottom': '12px'
  },
  
  // Body text
  p: {
    'margin-top': '0',
    'margin-bottom': '24px'
  },
  
  // Links with smooth transitions
  a: {
    'color': '#007AFF',
    'text-decoration': 'none',
    'transition': 'color 0.2s ease'
  },
  
  'a:hover': {
    'color': '#5856D6',
    'text-decoration': 'underline'
  },
  
  // Lists
  ul: {
    'margin-top': '0',
    'margin-bottom': '24px',
    'padding-left': '24px'
  },
  
  ol: {
    'margin-top': '0',
    'margin-bottom': '24px',
    'padding-left': '24px'
  },
  
  li: {
    'margin-bottom': '8px',
    'padding-left': '4px'
  },
  
  'li::marker': {
    'color': '#86868B'
  },
  
  // Code blocks with modern styling
  pre: {
    'background': '#F5F5F7',
    'border': '1px solid rgba(0, 0, 0, 0.08)',
    'border-radius': '12px',
    'padding': '24px',
    'overflow-x': 'auto',
    'margin': '32px 0',
    'font-size': '14px',
    'line-height': '1.6'
  },
  
  code: {
    'font-family': 'SF Mono, Monaco, "Courier New", monospace',
    'font-size': '0.85em',
    'background': 'rgba(0, 0, 0, 0.04)',
    'padding': '3px 6px',
    'border-radius': '4px'
  },
  
  'pre code': {
    'background': 'none',
    'padding': '0',
    'font-size': 'inherit'
  },
  
  // Blockquotes
  blockquote: {
    'margin': '32px 0',
    'padding-left': '24px',
    'border-left': '4px solid #007AFF',
    'color': '#6e6e73',
    'font-style': 'italic'
  },
  
  // Tables
  table: {
    'width': '100%',
    'border-collapse': 'collapse',
    'margin': '32px 0',
    'font-size': '16px'
  },
  
  'th, td': {
    'text-align': 'left',
    'padding': '12px 16px',
    'border-bottom': '1px solid rgba(0, 0, 0, 0.08)'
  },
  
  th: {
    'font-weight': '600',
    'background': '#F5F5F7',
    'border-top': '1px solid rgba(0, 0, 0, 0.08)'
  },
  
  // Horizontal rules
  hr: {
    'border': 'none',
    'border-top': '1px solid rgba(0, 0, 0, 0.08)',
    'margin': '48px 0'
  },
  
  // Images
  img: {
    'max-width': '100%',
    'height': 'auto',
    'border-radius': '8px',
    'margin': '32px 0'
  },
  
  // Strong and emphasis
  strong: {
    'font-weight': '600',
    'color': '#000'
  },
  
  em: {
    'font-style': 'italic'
  },
  
  // First/last child adjustments
  '> *:first-child': {
    'margin-top': '0'
  },
  
  '> *:last-child': {
    'margin-bottom': '0'
  }
};

// Generate scoped CSS for prose content
function generateProseCSS(variant: string): string {
  const styles = Object.entries(proseStyles).map(([selector, rules]) => {
    const cssRules = Object.entries(rules)
      .map(([prop, value]) => `${prop}:${value}`)
      .join(';');
    
    // Handle base styles
    if (selector === 'base') {
      return cssRules;
    }
    
    // Handle pseudo-selectors
    if (selector.includes(':')) {
      return `.prose${variant ? `-${variant}` : ''} ${selector}{${cssRules}}`;
    }
    
    // Handle regular selectors
    return `.prose${variant ? `-${variant}` : ''} ${selector}{${cssRules}}`;
  }).join('');
  
  // Add base styles to the prose class itself
  const baseStyles = proseStyles.base;
  const baseCss = Object.entries(baseStyles)
    .map(([prop, value]) => `${prop}:${value}`)
    .join(';');
  
  return `.prose${variant ? `-${variant}` : ''}{${baseCss}}${styles}`;
}

export const prose: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    // Return base prose styles
    return {
      ...proseStyles.base,
      '& h1': proseStyles.h1,
      '& h2': proseStyles.h2,
      '& h3': proseStyles.h3,
      '& h4': proseStyles.h4,
      '& p': proseStyles.p,
      '& a': proseStyles.a,
      '& a:hover': proseStyles['a:hover'],
      '& ul': proseStyles.ul,
      '& ol': proseStyles.ol,
      '& li': proseStyles.li,
      '& li::marker': proseStyles['li::marker'],
      '& pre': proseStyles.pre,
      '& code': proseStyles.code,
      '& pre code': proseStyles['pre code'],
      '& blockquote': proseStyles.blockquote,
      '& table': proseStyles.table,
      '& th, & td': proseStyles['th, td'],
      '& th': proseStyles.th,
      '& hr': proseStyles.hr,
      '& img': proseStyles.img,
      '& strong': proseStyles.strong,
      '& em': proseStyles.em,
      '& > *:first-child': proseStyles['> *:first-child'],
      '& > *:last-child': proseStyles['> *:last-child']
    };
  }
  
  // Handle variants
  const variants: Record<string, Partial<typeof proseStyles>> = {
    sm: {
      base: { 'font-size': '15px', 'line-height': '1.65' }
    },
    lg: {
      base: { 'font-size': '19px', 'line-height': '1.8' },
      h1: { 'font-size': '64px' },
      h2: { 'font-size': '48px' },
      h3: { 'font-size': '32px' }
    },
    xl: {
      base: { 'font-size': '21px', 'line-height': '1.85' },
      h1: { 'font-size': '72px' },
      h2: { 'font-size': '56px' },
      h3: { 'font-size': '40px' }
    },
    dark: {
      base: { 'color': '#F5F5F7' },
      a: { 'color': '#2997FF' },
      'a:hover': { 'color': '#9B59F7' },
      strong: { 'color': '#FFFFFF' },
      blockquote: { 'color': '#A1A1A6', 'border-left-color': '#2997FF' },
      pre: { 'background': '#1D1D1F', 'border-color': 'rgba(255, 255, 255, 0.1)' },
      code: { 'background': 'rgba(255, 255, 255, 0.1)' },
      th: { 'background': '#2D2D30' },
      'th, td': { 'border-bottom-color': 'rgba(255, 255, 255, 0.1)' },
      hr: { 'border-top-color': 'rgba(255, 255, 255, 0.1)' }
    }
  };
  
  if (variants[args]) {
    const variantStyles = variants[args];
    const mergedStyles: any = { ...proseStyles.base };
    
    // Merge variant styles
    if (variantStyles.base) {
      Object.assign(mergedStyles, variantStyles.base);
    }
    
    const result: CSSRule = mergedStyles;
    
    // Add all nested styles
    Object.entries(proseStyles).forEach(([selector, styles]) => {
      if (selector !== 'base') {
        const variantOverrides = variantStyles[selector as keyof typeof variantStyles] || {};
        result[`& ${selector}`] = { ...styles, ...variantOverrides };
      }
    });
    
    return result;
  }
  
  return {};
};

// Markdown alias
export const markdown = prose;

export const proseRules = {
  prose,
  markdown
};