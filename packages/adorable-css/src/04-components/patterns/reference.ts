import type { StringRuleHandler, CSSRule } from '../../03-rules/types';

// Reference page 04-components for documentation

// Page header component for main documentation pages
export const pageHeaderString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const headerVariants: Record<string, (string | CSSRule)[]> = {
    // Default page header
    default: [
      'vbox gap(xl) pb(3xl) border-b(1/gray-200)',
      {
        'margin-bottom': 'var(--spacing-3xl)'
      }
    ],
    
    // Compact header without border
    compact: [
      'vbox gap(lg) pb(xl)',
      {
        'margin-bottom': 'var(--spacing-2xl)'
      }
    ],
    
    // Hero-style header with gradient
    hero: [
      'vbox gap(xl) py(4xl) text(center)',
      {
        'background': 'linear-gradient(to bottom, var(--gray-50), transparent)',
        'margin': 'calc(var(--spacing-3xl) * -1) calc(var(--spacing-3xl) * -1) var(--spacing-3xl)',
        'padding-left': 'var(--spacing-3xl)',
        'padding-right': 'var(--spacing-3xl)'
      }
    ]
  };
  
  return headerVariants[variant] || headerVariants.default;
};

// Category section for grouping related content
export const categorySectionString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const sectionVariants: Record<string, (string | CSSRule)[]> = {
    // Default category section
    default: [
      'vbox gap(2xl) py(3xl)',
      {
        '& + &': {
          'border-top': '1px solid var(--gray-200)'
        }
      }
    ],
    
    // Compact category section
    compact: [
      'vbox gap(xl) py(2xl)',
      {
        '& + &': {
          'border-top': '1px solid var(--gray-100)'
        }
      }
    ],
    
    // Card-style category section
    card: [
      'vbox gap(2xl) p(2xl) bg(gray-50) r(xl)',
      {
        '& + &': {
          'margin-top': 'var(--spacing-2xl)'
        }
      }
    ]
  };
  
  return sectionVariants[variant] || sectionVariants.default;
};

// Category header for section titles
export const categoryHeaderString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const headerVariants: Record<string, (string | CSSRule)[]> = {
    // Default category header
    default: [
      'hbox items(center) gap(lg) pb(lg)',
      {
        'border-bottom': '2px solid var(--gray-200)'
      }
    ],
    
    // Minimal header
    minimal: [
      'hbox items(center) gap(lg) pb(md)',
      {}
    ],
    
    // Accent header with colored border
    accent: [
      'hbox items(center) gap(lg) pb(lg)',
      {
        'border-bottom': '3px solid var(--brand)',
        'margin-bottom': 'var(--spacing-xl)'
      }
    ]
  };
  
  return headerVariants[variant] || headerVariants.default;
};

// Rules table component for displaying reference tables
export const rulesTableString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const tableVariants: Record<string, (string | CSSRule)[]> = {
    // Default table style
    default: [
      'w(100%) r(lg) clip',
      {
        'border': '1px solid var(--gray-200)',
        'background': 'var(--white)',
        'font-size': '0.95rem',
        '& thead': {
          'background': 'var(--gray-50)',
          'border-bottom': '1px solid var(--gray-200)'
        },
        '& th': {
          'text-align': 'left',
          'padding': '0.75rem 1rem',
          'font-weight': '600',
          'color': 'var(--gray-700)',
          'font-size': '0.875rem',
          'text-transform': 'uppercase',
          'letter-spacing': '0.05em'
        },
        '& td': {
          'padding': '0.75rem 1rem',
          'border-bottom': '1px solid var(--gray-100)',
          'vertical-align': 'top'
        },
        '& tbody tr:last-child td': {
          'border-bottom': 'none'
        },
        '& tbody tr:hover': {
          'background': 'var(--gray-50)'
        },
        '& code': {
          'font-size': '0.875rem',
          'padding': '0.125rem 0.375rem',
          'background': 'var(--gray-100)',
          'border-radius': '0.25rem',
          'color': 'var(--gray-900)',
          'font-weight': '500'
        }
      }
    ],
    
    // Minimal table without borders
    minimal: [
      'w(100%)',
      {
        'font-size': '0.95rem',
        '& thead': {
          'border-bottom': '2px solid var(--gray-200)'
        },
        '& th': {
          'text-align': 'left',
          'padding': '0.5rem 0',
          'font-weight': '600',
          'color': 'var(--gray-700)'
        },
        '& td': {
          'padding': '0.75rem 0',
          'border-bottom': '1px solid var(--gray-100)'
        },
        '& tbody tr:last-child td': {
          'border-bottom': 'none'
        },
        '& code': {
          'font-size': '0.875rem',
          'color': 'var(--gray-900)',
          'font-weight': '500'
        }
      }
    ],
    
    // Striped table
    striped: [
      'w(100%) r(lg) clip',
      {
        'border': '1px solid var(--gray-200)',
        'background': 'var(--white)',
        'font-size': '0.95rem',
        '& thead': {
          'background': 'var(--gray-900)',
          'color': 'var(--white)'
        },
        '& th': {
          'text-align': 'left',
          'padding': '0.75rem 1rem',
          'font-weight': '500'
        },
        '& td': {
          'padding': '0.75rem 1rem'
        },
        '& tbody tr:nth-child(odd)': {
          'background': 'var(--gray-50)'
        },
        '& tbody tr:hover': {
          'background': 'var(--gray-100)'
        },
        '& code': {
          'font-size': '0.875rem',
          'padding': '0.125rem 0.375rem',
          'background': 'rgba(0, 0, 0, 0.05)',
          'border-radius': '0.25rem',
          'color': 'var(--gray-900)',
          'font-weight': '500'
        }
      }
    ]
  };
  
  return tableVariants[variant] || tableVariants.default;
};

// Code block component for displaying code examples
export const codeBlockString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const codeVariants: Record<string, (string | CSSRule)[]> = {
    // Default code block
    default: [
      'relative r(lg) clip',
      {
        'background': 'var(--gray-900)',
        'color': 'var(--gray-100)',
        'padding': '1.5rem',
        'font-family': 'SF Mono, Monaco, Consolas, "Courier New", monospace',
        'font-size': '0.875rem',
        'line-height': '1.7',
        'overflow-x': 'auto',
        'tab-size': '2',
        '& code': {
          'background': 'none',
          'padding': '0',
          'color': 'inherit'
        }
      }
    ],
    
    // Inline code style
    inline: [
      '',
      {
        'display': 'inline',
        'background': 'var(--gray-100)',
        'color': 'var(--gray-900)',
        'padding': '0.125rem 0.375rem',
        'border-radius': '0.25rem',
        'font-family': 'SF Mono, Monaco, Consolas, "Courier New", monospace',
        'font-size': '0.875em',
        'font-weight': '500'
      }
    ],
    
    // Terminal/console style
    terminal: [
      'relative r(lg) clip',
      {
        'background': 'var(--black)',
        'color': '#00FF00',
        'padding': '1.5rem',
        'font-family': 'SF Mono, Monaco, Consolas, "Courier New", monospace',
        'font-size': '0.875rem',
        'line-height': '1.5',
        'overflow-x': 'auto',
        '&::before': {
          'content': '"$ "',
          'color': '#00FF00',
          'opacity': '0.7'
        }
      }
    ],
    
    // Light theme code block
    light: [
      'relative r(lg) clip',
      {
        'background': 'var(--gray-50)',
        'border': '1px solid var(--gray-200)',
        'color': 'var(--gray-900)',
        'padding': '1.5rem',
        'font-family': 'SF Mono, Monaco, Consolas, "Courier New", monospace',
        'font-size': '0.875rem',
        'line-height': '1.7',
        'overflow-x': 'auto',
        'tab-size': '2'
      }
    ]
  };
  
  return codeVariants[variant] || codeVariants.default;
};

// Info card component for highlighting important information
export const infoCardString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const cardVariants: Record<string, (string | CSSRule)[]> = {
    // Default info card
    default: [
      'p(xl) r(lg) bg(blue-50) border(1/blue-200)',
      {
        'color': 'var(--blue-900)',
        '& strong': {
          'color': 'var(--blue-900)',
          'font-weight': '600'
        },
        '& code': {
          'background': 'var(--blue-100)',
          'color': 'var(--blue-900)',
          'padding': '0.125rem 0.375rem',
          'border-radius': '0.25rem',
          'font-size': '0.875em'
        }
      }
    ],
    
    // Warning card
    warning: [
      'p(xl) r(lg) bg(amber-50) border(1/amber-200)',
      {
        'color': 'var(--amber-900)',
        '& strong': {
          'color': 'var(--amber-900)',
          'font-weight': '600'
        },
        '& code': {
          'background': 'var(--amber-100)',
          'color': 'var(--amber-900)',
          'padding': '0.125rem 0.375rem',
          'border-radius': '0.25rem',
          'font-size': '0.875em'
        }
      }
    ],
    
    // Success card
    success: [
      'p(xl) r(lg) bg(green-50) border(1/green-200)',
      {
        'color': 'var(--green-900)',
        '& strong': {
          'color': 'var(--green-900)',
          'font-weight': '600'
        },
        '& code': {
          'background': 'var(--green-100)',
          'color': 'var(--green-900)',
          'padding': '0.125rem 0.375rem',
          'border-radius': '0.25rem',
          'font-size': '0.875em'
        }
      }
    ],
    
    // Error card
    error: [
      'p(xl) r(lg) bg(red-50) border(1/red-200)',
      {
        'color': 'var(--red-900)',
        '& strong': {
          'color': 'var(--red-900)',
          'font-weight': '600'
        },
        '& code': {
          'background': 'var(--red-100)',
          'color': 'var(--red-900)',
          'padding': '0.125rem 0.375rem',
          'border-radius': '0.25rem',
          'font-size': '0.875em'
        }
      }
    ],
    
    // Neutral card
    neutral: [
      'p(xl) r(lg) bg(gray-50) border(1/gray-200)',
      {
        'color': 'var(--gray-700)',
        '& strong': {
          'color': 'var(--gray-900)',
          'font-weight': '600'
        },
        '& code': {
          'background': 'var(--gray-100)',
          'color': 'var(--gray-900)',
          'padding': '0.125rem 0.375rem',
          'border-radius': '0.25rem',
          'font-size': '0.875em'
        }
      }
    ]
  };
  
  return cardVariants[variant] || cardVariants.default;
};

// Rule example component for showing usage examples
export const ruleExampleString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const exampleVariants: Record<string, (string | CSSRule)[]> = {
    // Default example with preview and code
    default: [
      'r(lg) border(1/gray-200) clip',
      {
        'background': 'var(--white)',
        '& .example-preview': {
          'padding': '2rem',
          'background': 'var(--white)',
          'border-bottom': '1px solid var(--gray-200)'
        },
        '& .example-code': {
          'background': 'var(--gray-50)',
          'padding': '1rem',
          'font-family': 'SF Mono, Monaco, Consolas, "Courier New", monospace',
          'font-size': '0.875rem',
          'color': 'var(--gray-900)',
          'overflow-x': 'auto'
        }
      }
    ],
    
    // Inline example
    inline: [
      'inline-flex items(center) gap(md) p(sm/lg) r(md) bg(gray-50)',
      {
        'font-size': '0.875rem',
        '& .example-label': {
          'color': 'var(--gray-600)',
          'font-weight': '500'
        },
        '& .example-value': {
          'font-family': 'SF Mono, Monaco, Consolas, "Courier New", monospace',
          'color': 'var(--gray-900)',
          'font-weight': '500'
        }
      }
    ],
    
    // Grid example layout
    grid: [
      'grid(repeat(auto-fit,minmax(200px,1fr))) gap(xl)',
      {
        '& .example-item': {
          'padding': '1.5rem',
          'background': 'var(--gray-50)',
          'border-radius': '0.5rem',
          'text-align': 'center',
          'border': '1px solid var(--gray-200)'
        },
        '& .example-label': {
          'display': 'block',
          'font-size': '0.75rem',
          'color': 'var(--gray-600)',
          'margin-bottom': '0.5rem',
          'text-transform': 'uppercase',
          'letter-spacing': '0.05em'
        },
        '& .example-value': {
          'font-family': 'SF Mono, Monaco, Consolas, "Courier New", monospace',
          'font-size': '0.875rem',
          'color': 'var(--gray-900)',
          'font-weight': '500'
        }
      }
    ]
  };
  
  return exampleVariants[variant] || exampleVariants.default;
};

// Export string-based 03-rules
export const referenceRules = {
  'page-header': pageHeaderString,
  'category-section': categorySectionString,
  'category-header': categoryHeaderString,
  'rules-table': rulesTableString,
  'code-block': codeBlockString,
  'info-card': infoCardString,
  'rule-example': ruleExampleString
};