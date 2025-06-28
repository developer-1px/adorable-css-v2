import type { StringRuleHandler, CSSRule } from '../../rules/types';

// String-based card components (shadcn/ui inspired)
export const cardString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  if (!args) {
    // Default card - shadcn/ui style with subtle border
    return [
      'rounded(lg) bg(white) p(24) shadow(sm)',
      {
        'border': '1px solid var(--gray-200)',
        'transition': 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    ];
  }

  const parts = args.split('/');
  const variant = parts[0] || 'default';
  const size = parts[1] || 'md';
  
  // Base card classes
  const baseClasses = 'relative clip';
  
  // Size classes
  const sizeClasses: Record<string, string> = {
    sm: 'p(16) rounded(md)',
    md: 'p(24) rounded(lg)',
    lg: 'p(32) rounded(xl)', 
    xl: 'p(48) rounded(2xl)'
  };
  
  // Variant definitions with mixed format for shadcn/ui aesthetic
  const variantDefinitions: Record<string, (string | CSSRule)[]> = {
    // Default shadcn/ui card
    default: [
      'bg(white) shadow(sm)',
      {
        'border': '1px solid var(--gray-200)',
        'transition': 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          'box-shadow': 'var(--shadow-md)',
          'border-color': 'var(--gray-300)'
        }
      }
    ],
    
    // Outlined card (no shadow)
    outlined: [
      'bg(white)',
      {
        'border': '1px solid var(--gray-200)',
        'box-shadow': 'none',
        'transition': 'border-color 0.2s ease',
        '&:hover': {
          'border-color': 'var(--gray-300)'
        }
      }
    ],
    
    // Ghost card (subtle background)
    ghost: [
      'bg(gray-50)',
      {
        'border': '1px solid transparent',
        'transition': 'all 0.2s ease',
        '&:hover': {
          'background': 'var(--gray-100)',
          'border-color': 'var(--gray-200)'
        }
      }
    ],
    
    // Elevated card (stronger shadow)
    elevated: [
      'bg(white) shadow(md)',
      {
        'border': '1px solid var(--gray-100)',
        'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          'transform': 'translateY(-2px)',
          'box-shadow': 'var(--shadow-lg)'
        }
      }
    ],
    
    // Interactive card (clickable)
    interactive: [
      'bg(white) shadow(sm) cursor(pointer)',
      {
        'border': '1px solid var(--gray-200)',
        'transition': 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'user-select': 'none',
        '&:hover': {
          'box-shadow': 'var(--shadow-md)',
          'border-color': 'var(--gray-300)',
          'transform': 'translateY(-1px)'
        },
        '&:active': {
          'transform': 'translateY(0)',
          'box-shadow': 'var(--shadow-sm)'
        }
      }
    ],
    
    // Feature card (for feature sections)
    feature: [
      'bg(white) text(center) vbox gap(16)',
      {
        'border': '1px solid var(--gray-200)',
        'padding': '2rem',
        'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          'border-color': 'var(--brand)',
          'box-shadow': '0 0 0 1px var(--brand)',
          'transform': 'translateY(-2px)'
        }
      }
    ],
    
    // Glass morphism card
    glass: [
      'backdrop-blur(12) backdrop-saturate(200)',
      {
        'background': 'rgba(255, 255, 255, 0.7)',
        'border': '1px solid rgba(255, 255, 255, 0.3)',
        'box-shadow': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'transition': 'all 0.3s ease',
        '&:hover': {
          'background': 'rgba(255, 255, 255, 0.8)',
          'border-color': 'rgba(255, 255, 255, 0.5)'
        }
      }
    ],
    
    // Gradient border card
    gradient: [
      'bg(white) relative',
      {
        'border': '1px solid transparent',
        'background-clip': 'padding-box',
        '&::before': {
          'content': '""',
          'position': 'absolute',
          'inset': '-1px',
          'padding': '1px',
          'border-radius': 'inherit',
          'background': 'linear-gradient(135deg, var(--brand-start), var(--brand-end))',
          '-webkit-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          '-webkit-mask-composite': 'xor',
          'mask-composite': 'exclude',
          'pointer-events': 'none'
        },
        'transition': 'all 0.3s ease',
        '&:hover': {
          'box-shadow': '0 4px 20px rgba(139, 92, 246, 0.15)'
        }
      }
    ]
  };
  
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const variantData = variantDefinitions[variant] || variantDefinitions.default;
  
  return [
    `${baseClasses} ${sizeClass}`,
    ...variantData
  ];
};

// Export string-based rules
export const cardRules = {
  'card': cardString
};