import type { RuleHandler, CSSRule } from '../../rules/types';

// heading - Apple-quality semantic heading component
export const heading: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    // Default h2 heading - Apple typography
    return {
      'font-size': '28px',
      'font-weight': '700',
      'line-height': '1.2',
      'letter-spacing': '-0.01em',
      'margin': '0',
      'color': '#1D1D1F',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
    };
  }

  const parts = args.split('/');
  const level = parts[0] || 'h2';
  const variant = parts[1] || 'default';
  
  // Base heading styles - Apple typography principles
  const baseStyles: CSSRule = {
    'margin': '0',
    'color': '#1D1D1F',
    'font-weight': '700',
    'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
  };

  // Level-specific styles - Apple's type scale
  const levelStyles: Record<string, CSSRule> = {
    h1: {
      'font-size': '48px',
      'line-height': '1.1',
      'font-weight': '800',
      'letter-spacing': '-0.025em'
    },
    h2: {
      'font-size': '36px',
      'line-height': '1.15',
      'font-weight': '700',
      'letter-spacing': '-0.02em'
    },
    h3: {
      'font-size': '28px',
      'line-height': '1.2',
      'font-weight': '700',
      'letter-spacing': '-0.01em'
    },
    h4: {
      'font-size': '22px',
      'line-height': '1.25',
      'font-weight': '600',
      'letter-spacing': '-0.005em'
    },
    h5: {
      'font-size': '19px',
      'line-height': '1.3',
      'font-weight': '600'
    },
    h6: {
      'font-size': '17px',
      'line-height': '1.35',
      'font-weight': '600'
    }
  };

  // Variant styles - Apple-inspired contexts
  const variantStyles: Record<string, CSSRule> = {
    default: {},
    
    hero: {
      'font-size': '72px',
      'line-height': '1.05',
      'font-weight': '800',
      'letter-spacing': '-0.03em'
    },
    
    display: {
      'font-size': '96px',
      'line-height': '1',
      'font-weight': '900',
      'letter-spacing': '-0.035em'
    },
    
    subtitle: {
      'font-weight': '400',
      'color': '#86868B',
      'font-size': '21px',
      'line-height': '1.4'
    },
    
    gradient: {
      'background': 'linear-gradient(135deg, #007AFF, #5856D6)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      'background-clip': 'text'
    },
    
    section: {
      'font-size': '40px',
      'line-height': '1.1',
      'font-weight': '700',
      'letter-spacing': '-0.015em'
    }
  };

  return {
    ...baseStyles,
    ...(levelStyles[level] || levelStyles.h2),
    ...(variantStyles[variant] || {})
  };
};

export const headingRules = {
  heading
};