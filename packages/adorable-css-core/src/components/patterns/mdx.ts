import type { CSSRule, RuleHandler } from '../../types';

// MDX-specific components and enhanced markdown styling
const mdxStyles: Record<string, CSSRule> = {
  // Base article styles
  article: {
    'color': '#1D1D1F',
    'line-height': '1.75',
    'font-size': '17px',
    'max-width': '65ch',
    'margin': '0 auto'
  },
  
  // Code blocks with syntax highlighting support
  'pre[class*="language-"]': {
    'background': '#1D1D1F',
    'color': '#F5F5F7',
    'padding': '24px',
    'border-radius': '12px',
    'overflow-x': 'auto',
    'margin': '32px 0',
    'font-size': '14px',
    'line-height': '1.6',
    'tab-size': '2'
  },
  
  // Inline code in light mode
  'code:not([class*="language-"])': {
    'font-family': 'SF Mono, Monaco, "Courier New", monospace',
    'font-size': '0.85em',
    'background': 'rgba(0, 0, 0, 0.04)',
    'padding': '3px 6px',
    'border-radius': '4px',
    'color': '#D73A49'
  },
  
  // MDX-specific components
  // Info/Warning/Error boxes
  '.mdx-info, .mdx-warning, .mdx-error': {
    'padding': '16px 20px',
    'border-radius': '8px',
    'margin': '24px 0',
    'font-size': '16px',
    'line-height': '1.6'
  },
  
  '.mdx-info': {
    'background': '#E8F5FF',
    'border': '1px solid #2997FF',
    'color': '#0051C3'
  },
  
  '.mdx-warning': {
    'background': '#FFF8E1',
    'border': '1px solid #FFAB00',
    'color': '#8B5A00'
  },
  
  '.mdx-error': {
    'background': '#FFEBEE',
    'border': '1px solid #FF3B30',
    'color': '#C62828'
  },
  
  // Interactive code examples
  '.mdx-example': {
    'border': '1px solid rgba(0, 0, 0, 0.08)',
    'border-radius': '12px',
    'overflow': 'hidden',
    'margin': '32px 0'
  },
  
  '.mdx-example-preview': {
    'padding': '32px',
    'background': '#FFFFFF',
    'border-bottom': '1px solid rgba(0, 0, 0, 0.08)'
  },
  
  '.mdx-example-code': {
    'margin': '0'
  },
  
  // Tabs for code examples
  '.mdx-tabs': {
    'border': '1px solid rgba(0, 0, 0, 0.08)',
    'border-radius': '12px',
    'overflow': 'hidden',
    'margin': '32px 0'
  },
  
  '.mdx-tab-list': {
    'display': 'flex',
    'background': '#F5F5F7',
    'border-bottom': '1px solid rgba(0, 0, 0, 0.08)',
    'padding': '0'
  },
  
  '.mdx-tab': {
    'padding': '12px 24px',
    'background': 'transparent',
    'border': 'none',
    'cursor': 'pointer',
    'font-size': '14px',
    'font-weight': '500',
    'color': '#86868B',
    'transition': 'all 0.2s ease'
  },
  
  '.mdx-tab:hover': {
    'color': '#1D1D1F'
  },
  
  '.mdx-tab[data-active="true"]': {
    'color': '#007AFF',
    'background': '#FFFFFF',
    'box-shadow': '0 1px 0 #FFFFFF'
  },
  
  '.mdx-tab-panel': {
    'padding': '24px'
  },
  
  // TOC (Table of Contents)
  '.mdx-toc': {
    'position': 'sticky',
    'top': '24px',
    'padding': '16px',
    'background': '#F5F5F7',
    'border-radius': '8px',
    'font-size': '14px'
  },
  
  '.mdx-toc-title': {
    'font-weight': '600',
    'margin-bottom': '12px',
    'color': '#1D1D1F'
  },
  
  '.mdx-toc ul': {
    'list-style': 'none',
    'padding': '0',
    'margin': '0'
  },
  
  '.mdx-toc li': {
    'margin': '8px 0'
  },
  
  '.mdx-toc a': {
    'color': '#86868B',
    'text-decoration': 'none',
    'transition': 'color 0.2s ease'
  },
  
  '.mdx-toc a:hover': {
    'color': '#007AFF'
  },
  
  '.mdx-toc a[data-active="true"]': {
    'color': '#007AFF',
    'font-weight': '500'
  }
};

// Enhanced prose styles for MDX
const enhancedProseStyles: Record<string, CSSRule> = {
  // Better list styling
  'ul, ol': {
    'margin': '24px 0',
    'padding-left': '0',
    'list-style-position': 'inside'
  },
  
  'li': {
    'margin': '8px 0',
    'padding-left': '28px',
    'text-indent': '-28px'
  },
  
  'li > ul, li > ol': {
    'margin': '8px 0 8px 28px',
    'text-indent': '0'
  },
  
  // Enhanced table styling
  'table': {
    'width': '100%',
    'border-collapse': 'collapse',
    'margin': '32px 0',
    'font-size': '16px',
    'box-shadow': '0 0 0 1px rgba(0, 0, 0, 0.05)',
    'border-radius': '8px',
    'overflow': 'hidden'
  },
  
  'thead': {
    'background': '#F5F5F7'
  },
  
  'tbody tr:hover': {
    'background': 'rgba(0, 0, 0, 0.02)'
  },
  
  // Footnotes
  '.footnotes': {
    'margin-top': '64px',
    'padding-top': '32px',
    'border-top': '1px solid rgba(0, 0, 0, 0.08)',
    'font-size': '14px',
    'color': '#86868B'
  },
  
  // Definition lists
  'dl': {
    'margin': '24px 0'
  },
  
  'dt': {
    'font-weight': '600',
    'margin-top': '16px'
  },
  
  'dd': {
    'margin': '8px 0 8px 24px',
    'color': '#6e6e73'
  }
};

export const mdx: RuleHandler = (args?: string): CSSRule => {
  if (!args || args === 'article') {
    // Return complete MDX article styles
    return {
      ...mdxStyles.article,
      '& pre[class*="language-"]': mdxStyles['pre[class*="language-"]'],
      '& code:not([class*="language-"])': mdxStyles['code:not([class*="language-"])'],
      '& .mdx-info': mdxStyles['.mdx-info'],
      '& .mdx-warning': mdxStyles['.mdx-warning'],
      '& .mdx-error': mdxStyles['.mdx-error'],
      '& .mdx-example': mdxStyles['.mdx-example'],
      '& .mdx-example-preview': mdxStyles['.mdx-example-preview'],
      '& .mdx-example-code': mdxStyles['.mdx-example-code'],
      '& ul, & ol': enhancedProseStyles['ul, ol'],
      '& li': enhancedProseStyles['li'],
      '& li > ul, & li > ol': enhancedProseStyles['li > ul, li > ol'],
      '& table': enhancedProseStyles['table'],
      '& thead': enhancedProseStyles['thead'],
      '& tbody tr:hover': enhancedProseStyles['tbody tr:hover'],
      '& .footnotes': enhancedProseStyles['.footnotes'],
      '& dl': enhancedProseStyles['dl'],
      '& dt': enhancedProseStyles['dt'],
      '& dd': enhancedProseStyles['dd']
    };
  }
  
  // Component-specific styles
  const componentStyles: Record<string, CSSRule> = {
    info: mdxStyles['.mdx-info'],
    warning: mdxStyles['.mdx-warning'],
    error: mdxStyles['.mdx-error'],
    example: mdxStyles['.mdx-example'],
    'example-preview': mdxStyles['.mdx-example-preview'],
    'example-code': mdxStyles['.mdx-example-code'],
    tabs: mdxStyles['.mdx-tabs'],
    'tab-list': mdxStyles['.mdx-tab-list'],
    tab: mdxStyles['.mdx-tab'],
    'tab-panel': mdxStyles['.mdx-tab-panel'],
    toc: mdxStyles['.mdx-toc'],
    'toc-title': mdxStyles['.mdx-toc-title']
  };
  
  if (componentStyles[args]) {
    return componentStyles[args];
  }
  
  // Variants
  const variants: Record<string, CSSRule> = {
    dark: {
      'color': '#F5F5F7',
      '& code:not([class*="language-"])': {
        'background': 'rgba(255, 255, 255, 0.1)',
        'color': '#FF9FF3'
      },
      '& .mdx-info': {
        'background': 'rgba(41, 151, 255, 0.1)',
        'border-color': '#2997FF',
        'color': '#64B5FF'
      },
      '& .mdx-warning': {
        'background': 'rgba(255, 171, 0, 0.1)',
        'border-color': '#FFAB00',
        'color': '#FFD666'
      },
      '& .mdx-error': {
        'background': 'rgba(255, 59, 48, 0.1)',
        'border-color': '#FF3B30',
        'color': '#FF6B6B'
      },
      '& table': {
        'box-shadow': '0 0 0 1px rgba(255, 255, 255, 0.1)'
      },
      '& thead': {
        'background': '#2D2D30'
      },
      '& tbody tr:hover': {
        'background': 'rgba(255, 255, 255, 0.02)'
      }
    },
    
    compact: {
      'font-size': '15px',
      'line-height': '1.65',
      '& pre[class*="language-"]': {
        'padding': '16px',
        'margin': '24px 0',
        'font-size': '13px'
      },
      '& .mdx-info, & .mdx-warning, & .mdx-error': {
        'padding': '12px 16px',
        'margin': '16px 0',
        'font-size': '14px'
      }
    },
    
    wide: {
      'max-width': '80ch',
      'font-size': '18px',
      'line-height': '1.8'
    }
  };
  
  if (variants[args]) {
    return { ...mdxStyles.article, ...variants[args] };
  }
  
  return {};
};

// Export related utilities
export const mdxInfo: RuleHandler = () => mdxStyles['.mdx-info'];
export const mdxWarning: RuleHandler = () => mdxStyles['.mdx-warning'];
export const mdxError: RuleHandler = () => mdxStyles['.mdx-error'];
export const mdxExample: RuleHandler = () => mdxStyles['.mdx-example'];
export const mdxTabs: RuleHandler = () => mdxStyles['.mdx-tabs'];
export const mdxToc: RuleHandler = () => mdxStyles['.mdx-toc'];

export const mdxRules = {
  mdx,
  'mdx-info': mdxInfo,
  'mdx-warning': mdxWarning,
  'mdx-error': mdxError,
  'mdx-example': mdxExample,
  'mdx-tabs': mdxTabs,
  'mdx-toc': mdxToc
};