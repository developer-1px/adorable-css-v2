import type { StringRuleHandler, CSSRule } from '../../rules/types';

// Enhanced string-based button components with mixed AdorableCSS + raw CSS (shadcn/ui inspired)
export const btnString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  if (!args) {
    // Default button - shadcn/ui primary style
    return [
      'inline-flex items(center) justify(center) gap(8) cursor(pointer) select(none) font(system) text(no-decoration) whitespace(nowrap) rounded(md) font(sm) bold(medium) h(40) px(16) py(8)',
      {
        'background': 'var(--gray-900)',
        'color': 'white',
        'border': '1px solid transparent',
        'outline': 'none',
        'transition': 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          'background': 'var(--gray-800)'
        },
        '&:active': {
          'background': 'var(--gray-700)'
        },
        '&:focus-visible': {
          'outline': '2px solid transparent',
          'outline-offset': '2px',
          'box-shadow': '0 0 0 2px var(--background), 0 0 0 4px var(--gray-900)'
        },
        '&:disabled': {
          'pointer-events': 'none',
          'opacity': '0.5'
        }
      }
    ];
  }

  const parts = args.split('/');
  const variant = parts[0] || 'default';
  const size = parts[1] || 'default';
  
  // Base button classes that are always applied
  const baseClasses = 'inline-flex items(center) justify(center) gap(8) cursor(pointer) select(none) font(system) text(no-decoration) whitespace(nowrap) rounded(md) bold(medium)';
  
  // Size variants - shadcn/ui standard sizes
  const sizeClasses: Record<string, string> = {
    'default': 'h(40) px(16) py(8) font(sm)',
    'sm': 'h(36) px(12) font(xs) rounded(md)',
    'lg': 'h(44) px(32) font(sm) rounded(md)',
    'icon': 'h(40) w(40) p(0)'  // Icon button size
  };
  
  // Variant definitions with mixed AdorableCSS + raw CSS - shadcn/ui style
  const variantDefinitions: Record<string, (string | CSSRule)[]> = {
    // Default (primary) button
    default: [
      '',
      {
        'background': 'var(--gray-900)',
        'color': 'white',
        'border': '1px solid transparent',
        'outline': 'none',
        'transition': 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          'background': 'var(--gray-800)'
        },
        '&:active': {
          'background': 'var(--gray-700)'
        },
        '&:focus-visible': {
          'outline': '2px solid transparent',
          'outline-offset': '2px',
          'box-shadow': '0 0 0 2px var(--background), 0 0 0 4px var(--gray-900)'
        },
        '&:disabled': {
          'pointer-events': 'none',
          'opacity': '0.5'
        }
      }
    ],
    
    // Secondary button
    secondary: [
      '',
      {
        'background': 'white',
        'color': 'var(--gray-900)',
        'border': '1px solid var(--gray-200)',
        'outline': 'none',
        'transition': 'all 0.2s ease',
        '&:hover': {
          'background': 'var(--gray-100)',
          'color': 'var(--gray-900)'
        },
        '&:active': {
          'background': 'var(--gray-200)'
        },
        '&:focus-visible': {
          'outline': '2px solid transparent',
          'outline-offset': '2px',
          'box-shadow': '0 0 0 2px var(--background), 0 0 0 4px var(--gray-900)'
        },
        '&:disabled': {
          'pointer-events': 'none',
          'opacity': '0.5'
        }
      }
    ],
    
    // Destructive button
    destructive: [
      '',
      {
        'background': 'var(--error-500)',
        'color': 'white',
        'border': '1px solid transparent',
        'outline': 'none',
        'transition': 'all 0.2s ease',
        '&:hover': {
          'background': 'var(--error-600)'
        },
        '&:active': {
          'background': 'var(--error-700)'
        },
        '&:focus-visible': {
          'outline': '2px solid transparent',
          'outline-offset': '2px',
          'box-shadow': '0 0 0 2px var(--background), 0 0 0 4px var(--error-500)'
        },
        '&:disabled': {
          'pointer-events': 'none',
          'opacity': '0.5'
        }
      }
    ],
    
    // Outline button
    outline: [
      '',
      {
        'background': 'transparent',
        'color': 'var(--gray-900)',
        'border': '1px solid var(--gray-200)',
        'outline': 'none',
        'transition': 'all 0.2s ease',
        '&:hover': {
          'background': 'var(--gray-100)',
          'border-color': 'var(--gray-300)'
        },
        '&:active': {
          'background': 'var(--gray-200)'
        },
        '&:focus-visible': {
          'outline': '2px solid transparent',
          'outline-offset': '2px',
          'box-shadow': '0 0 0 2px var(--background), 0 0 0 4px var(--gray-900)'
        },
        '&:disabled': {
          'pointer-events': 'none',
          'opacity': '0.5',
          'border-color': 'var(--gray-200)'
        }
      }
    ],
    
    // Ghost button
    ghost: [
      '',
      {
        'background': 'transparent',
        'color': 'var(--gray-900)',
        'border': '1px solid transparent',
        'outline': 'none',
        'transition': 'all 0.2s ease',
        '&:hover': {
          'background': 'var(--gray-100)',
          'color': 'var(--gray-900)'
        },
        '&:active': {
          'background': 'var(--gray-200)'
        },
        '&:focus-visible': {
          'outline': '2px solid transparent',
          'outline-offset': '2px',
          'box-shadow': '0 0 0 2px var(--background), 0 0 0 4px var(--gray-900)'
        },
        '&:disabled': {
          'pointer-events': 'none',
          'opacity': '0.5'
        }
      }
    ],
    
    // Link button
    link: [
      'underline-offset(4)',
      {
        'background': 'transparent',
        'color': 'var(--gray-900)',
        'border': 'none',
        'outline': 'none',
        'height': 'auto',
        'padding': '0',
        'text-underline-offset': '4px',
        'transition': 'all 0.2s ease',
        '&:hover': {
          'text-decoration': 'underline',
          'color': 'var(--gray-900)'
        },
        '&:active': {
          'color': 'var(--gray-700)'
        },
        '&:focus-visible': {
          'outline': '2px solid transparent',
          'outline-offset': '2px',
          'box-shadow': '0 0 0 2px var(--background), 0 0 0 4px var(--gray-900)',
          'border-radius': 'var(--radius-sm)'
        },
        '&:disabled': {
          'pointer-events': 'none',
          'opacity': '0.5'
        }
      }
    ]
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.default;
  const variantData = variantDefinitions[variant] || variantDefinitions.default;
  
  // Return mixed array: base classes, size classes, and variant data
  return [
    `${baseClasses} ${sizeClass}`,
    ...variantData
  ];
};

export const iconBtnString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const size = args || 'default';
  
  const sizeClasses: Record<string, string> = {
    default: 'w(40) h(40) p(0) rounded(md)',
    sm: 'w(36) h(36) p(0) rounded(md)',
    lg: 'w(44) h(44) p(0) rounded(md)'
  };
  
  return [
    `inline-flex items(center) justify(center) cursor(pointer) select(none) ${sizeClasses[size] || sizeClasses.default}`,
    {
      'background': 'transparent',
      'color': 'var(--gray-700)',
      'border': '1px solid transparent',
      'outline': 'none',
      'transition': 'all 0.2s ease',
      '&:hover': {
        'background': 'var(--gray-100)',
        'color': 'var(--gray-900)'
      },
      '&:active': {
        'background': 'var(--gray-200)'
      },
      '&:focus-visible': {
        'outline': '2px solid transparent',
        'outline-offset': '2px',
        'box-shadow': '0 0 0 2px var(--background), 0 0 0 4px var(--gray-900)'
      },
      '&:disabled': {
        'pointer-events': 'none',
        'opacity': '0.5'
      }
    }
  ];
};

// Export string-based rules
export const buttonRules = {
  'btn': btnString,
  'icon-btn': iconBtnString
};