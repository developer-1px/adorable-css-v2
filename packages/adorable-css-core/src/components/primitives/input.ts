import type { StringRuleHandler, CSSRule } from '../../rules/types';

// String-based input component (shadcn/ui inspired)
export const inputString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  if (!args) {
    // Default input - shadcn/ui style
    return [
      'flex h(40) w(full) rounded(md) px(12) py(8) font(sm) c(gray-900) bg(transparent)',
      {
        'border': '1px solid var(--gray-200)',
        'outline': 'none',
        'transition': 'all 0.2s ease',
        '&::placeholder': {
          'color': 'var(--gray-500)'
        },
        '&:hover': {
          'border-color': 'var(--gray-300)'
        },
        '&:focus': {
          'border-color': 'var(--gray-900)',
          'box-shadow': '0 0 0 1px var(--gray-900)'
        },
        '&:disabled': {
          'cursor': 'not-allowed',
          'opacity': '0.5',
          'background': 'var(--gray-50)'
        },
        // File input styling
        '&[type="file"]': {
          'font-size': 'var(--font-sm)',
          'background': 'white',
          '&::file-selector-button': {
            'border': '0',
            'background': 'var(--gray-100)',
            'padding': '0.5rem 1rem',
            'margin-right': '0.75rem',
            'border-radius': 'var(--radius-md)',
            'font-size': 'var(--font-sm)',
            'font-weight': '500',
            'transition': 'all 0.2s ease',
            'cursor': 'pointer',
            '&:hover': {
              'background': 'var(--gray-200)'
            }
          }
        },
        // Search input
        '&[type="search"]::-webkit-search-cancel-button': {
          '-webkit-appearance': 'none',
          'height': '1em',
          'width': '1em',
          'border-radius': '50em',
          'background': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cline x1='18' y1='6' x2='6' y2='18'/%3E%3Cline x1='6' y1='6' x2='18' y2='18'/%3E%3C/svg%3E") no-repeat 50% 50%`,
          'background-size': 'contain',
          'opacity': '0',
          'pointer-events': 'none',
          'cursor': 'pointer'
        },
        '&[type="search"]:focus::-webkit-search-cancel-button': {
          'opacity': '0.5',
          'pointer-events': 'all'
        }
      }
    ];
  }

  const inputVariants: Record<string, (string | CSSRule)[]> = {
    // Default shadcn style
    default: [
      'flex h(40) w(full) rounded(md) px(12) py(8) font(sm) c(gray-900) bg(transparent)',
      {
        'border': '1px solid var(--gray-200)',
        'outline': 'none',
        'transition': 'all 0.2s ease',
        '&::placeholder': {
          'color': 'var(--gray-500)'
        },
        '&:hover': {
          'border-color': 'var(--gray-300)'
        },
        '&:focus': {
          'border-color': 'var(--gray-900)',
          'box-shadow': '0 0 0 1px var(--gray-900)'
        },
        '&:disabled': {
          'cursor': 'not-allowed',
          'opacity': '0.5',
          'background': 'var(--gray-50)'
        }
      }
    ],
    
    // Ghost input (no visible border)
    ghost: [
      'flex h(40) w(full) rounded(md) px(12) py(8) font(sm) c(gray-900) bg(gray-100)',
      {
        'border': '1px solid transparent',
        'outline': 'none',
        'transition': 'all 0.2s ease',
        '&::placeholder': {
          'color': 'var(--gray-500)'
        },
        '&:hover': {
          'background': 'var(--gray-200)'
        },
        '&:focus': {
          'background': 'white',
          'border-color': 'var(--gray-900)',
          'box-shadow': '0 0 0 1px var(--gray-900)'
        },
        '&:disabled': {
          'cursor': 'not-allowed',
          'opacity': '0.5'
        }
      }
    ],
    
    // Underlined input
    underlined: [
      'flex h(40) w(full) px(0) py(8) font(sm) c(gray-900) bg(transparent) rounded(0)',
      {
        'border': 'none',
        'border-bottom': '1px solid var(--gray-300)',
        'outline': 'none',
        'transition': 'border-color 0.2s ease',
        '&::placeholder': {
          'color': 'var(--gray-500)'
        },
        '&:hover': {
          'border-bottom-color': 'var(--gray-400)'
        },
        '&:focus': {
          'border-bottom-color': 'var(--gray-900)',
          'border-bottom-width': '2px',
          'padding-bottom': '7px'
        },
        '&:disabled': {
          'cursor': 'not-allowed',
          'opacity': '0.5',
          'border-bottom-color': 'var(--gray-200)'
        }
      }
    ],
    
    // Error state
    error: [
      'flex h(40) w(full) rounded(md) px(12) py(8) font(sm) c(gray-900) bg(transparent)',
      {
        'border': '1px solid var(--error-500)',
        'outline': 'none',
        'transition': 'all 0.2s ease',
        '&::placeholder': {
          'color': 'var(--gray-500)'
        },
        '&:hover': {
          'border-color': 'var(--error-600)'
        },
        '&:focus': {
          'border-color': 'var(--error-500)',
          'box-shadow': '0 0 0 1px var(--error-500)'
        },
        '&:disabled': {
          'cursor': 'not-allowed',
          'opacity': '0.5',
          'background': 'var(--gray-50)',
          'border-color': 'var(--error-300)'
        }
      }
    ]
  };

  return inputVariants[args] || inputVariants.default;
};

// textarea - Modern textarea component
export const textareaString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const size = args || 'default';
  
  const sizeClasses: Record<string, string> = {
    sm: 'min-h(80) py(8) px(12)',
    default: 'min-h(120) py(12) px(12)',
    lg: 'min-h(160) py(16) px(16)'
  };
  
  return [
    `flex w(full) rounded(md) font(sm) c(gray-900) bg(transparent) resize(vertical) ${sizeClasses[size] || sizeClasses.default}`,
    {
      'border': '1px solid var(--gray-200)',
      'outline': 'none',
      'transition': 'all 0.2s ease',
      'line-height': '1.5',
      '&::placeholder': {
        'color': 'var(--gray-500)'
      },
      '&:hover': {
        'border-color': 'var(--gray-300)'
      },
      '&:focus': {
        'border-color': 'var(--gray-900)',
        'box-shadow': '0 0 0 1px var(--gray-900)'
      },
      '&:disabled': {
        'cursor': 'not-allowed',
        'opacity': '0.5',
        'background': 'var(--gray-50)',
        'resize': 'none'
      }
    }
  ];
};

// Export string-based rules
export const inputRules = {
  'input': inputString,
  'textarea': textareaString
};