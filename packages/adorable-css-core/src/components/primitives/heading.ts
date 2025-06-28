import type { StringRuleHandler, CSSRule } from '../../rules/types';

// String-based heading components (shadcn/ui inspired)
export const headingString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  if (!args) {
    // Default heading - h2 with shadcn/ui typography
    return [
      'scroll-m(20) pb(2) font(3xl) bold(semi) tracking(tight) c(gray-900)',
      {
        'transition': 'color 0.2s ease',
        '&:first-child': {
          'margin-top': '0'
        }
      }
    ];
  }

  const parts = args.split('/');
  const level = parts[0] || 'h2';
  const variant = parts[1] || 'default';
  
  // Shadcn/ui heading scales with mixed format
  const headingScales: Record<string, (string | CSSRule)[]> = {
    // H1 - Page titles (48px base -> 60px large screens)
    h1: [
      'scroll-m(20) font(5xl) bold(bold) c(gray-900)',
      {
        'line-height': '1.1',
        'letter-spacing': '-0.025em',
        '@media (min-width: 640px)': {
          'font-size': '3.75rem' // 60px on larger screens
        }
      }
    ],
    
    // H2 - Section headings (36px)
    h2: [
      'scroll-m(20) pb(2) font(4xl) bold(semi) c(gray-900)',
      {
        'border-bottom': '1px solid var(--gray-200)',
        'transition': 'color 0.2s ease',
        'letter-spacing': '-0.02em',
        '&:first-child': {
          'margin-top': '0'
        }
      }
    ],
    
    // H3 - Subsection headings (30px)
    h3: [
      'scroll-m(20) font(3xl) bold(semi) c(gray-900)',
      {
        'margin-top': '2rem',
        'letter-spacing': '-0.015em',
        '&:first-child': {
          'margin-top': '0'
        }
      }
    ],
    
    // H4 - Component headings (24px)
    h4: [
      'scroll-m(20) font(2xl) bold(medium) c(gray-900)',
      {
        'margin-top': '1.5rem',
        'letter-spacing': '-0.01em',
        '&:first-child': {
          'margin-top': '0'
        }
      }
    ],
    
    // H5 - Small headings (20px)
    h5: [
      'scroll-m(20) font(xl) bold(medium) c(gray-900)',
      {
        'margin-top': '1rem',
        'letter-spacing': '-0.005em',
        '&:first-child': {
          'margin-top': '0'
        }
      }
    ],
    
    // H6 - Smallest headings (18px)
    h6: [
      'scroll-m(20) font(lg) bold(medium) c(gray-900)',
      {
        'margin-top': '1rem',
        'letter-spacing': '0',
        '&:first-child': {
          'margin-top': '0'
        }
      }
    ],
    
    // Special display heading (72px -> 96px)
    display: [
      'font(clamp(4rem,8vw,6rem)) bold(black) c(gray-900)',
      {
        'line-height': '0.95',
        'margin-bottom': '1.5rem',
        'letter-spacing': '-0.04em'
      }
    ],
    
    // Hero heading (60px -> 80px)
    hero: [
      'font(clamp(3.75rem,7vw,5rem)) bold(bold) c(gray-900)',
      {
        'line-height': '1',
        'margin-bottom': '1.5rem',
        'letter-spacing': '-0.035em'
      }
    ],
    
    // Page heading (48px)
    page: [
      'font(5xl) bold(bold) c(gray-900)',
      {
        'line-height': '1.1',
        'margin-bottom': '0.5rem',
        'letter-spacing': '-0.025em'
      }
    ],
    
    // Caption heading (14px)
    caption: [
      'font(sm) bold(medium) c(gray-600)',
      {
        'text-transform': 'uppercase',
        'letter-spacing': '0.05em',
        'margin-bottom': '0.5rem'
      }
    ]
  };
  
  // Variant styles
  const variantStyles: Record<string, (string | CSSRule)[]> = {
    default: [
      '',
      {}
    ],
    
    // Muted variant
    muted: [
      'c(gray-600)',
      {}
    ],
    
    // Gradient variant
    gradient: [
      '',
      {
        'background': 'linear-gradient(135deg, var(--brand-start), var(--brand-end))',
        'background-clip': 'text',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        'color': 'transparent'
      }
    ],
    
    // Lead variant (for lead paragraphs)
    lead: [
      'font(xl) c(gray-600) leading(relaxed)',
      {
        'font-weight': '400'
      }
    ],
    
    // Small variant
    small: [
      'font(sm) c(gray-600) bold(medium)',
      {
        'text-transform': 'uppercase',
        'letter-spacing': '0.05em'
      }
    ],
    
    // Large variant  
    large: [
      'font(lg) c(gray-900)',
      {
        'font-weight': '400',
        'line-height': '1.5'
      }
    ]
  };
  
  const scale = headingScales[level] || headingScales.h2;
  const variantData = variantStyles[variant] || variantStyles.default;
  
  // Merge scale and variant
  if (variantData[0]) {
    return [
      scale[0] + ' ' + variantData[0],
      { ...scale[1], ...variantData[1] }
    ];
  }
  
  return scale;
};

// Export string-based rules
export const headingRules = {
  'heading': headingString
};