import type { RuleHandler, CSSRule } from '../../types';

// card - Modern card component
export const card: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    // Default card - Apple-level quality
    return {
      'background': 'white',
      'border': '1px solid rgba(0, 0, 0, 0.06)',
      'border-radius': '12px',
      'padding': '24px',
      'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02)',
      'transition': 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
      'position': 'relative',
      'overflow': 'hidden'
    };
  }

  const parts = args.split('/');
  const variant = parts[0] || 'default';
  const size = parts[1] || 'md';
  
  // Base card styles - Apple-inspired design
  const baseStyles: CSSRule = {
    'background': 'white',
    'border-radius': '12px',
    'transition': 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    'position': 'relative',
    'overflow': 'hidden'
  };

  // Size variations - Perfect proportions like Apple
  const sizeStyles: Record<string, CSSRule> = {
    sm: {
      'padding': '16px',
      'border-radius': '8px'
    },
    md: {
      'padding': '24px',
      'border-radius': '12px'
    },
    lg: {
      'padding': '32px',
      'border-radius': '16px'
    },
    xl: {
      'padding': '48px',
      'border-radius': '20px'
    }
  };

  // Variant styles - Apple-inspired design language
  const variantStyles: Record<string, CSSRule> = {
    default: {
      'border': '1px solid rgba(0, 0, 0, 0.06)',
      'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02)'
    },
    
    elevated: {
      'border': 'none',
      'box-shadow': '0 4px 24px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.1)',
      '&:hover': {
        'box-shadow': '0 8px 40px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.15)',
        'transform': 'translateY(-1px) scale(1.005)'
      }
    },
    
    outlined: {
      'border': '1px solid rgba(0, 0, 0, 0.12)',
      'box-shadow': 'none',
      '&:hover': {
        'border-color': 'rgba(0, 0, 0, 0.2)',
        'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.08)'
      }
    },
    
    flat: {
      'border': 'none',
      'box-shadow': 'none',
      'background': 'rgba(0, 0, 0, 0.02)'
    },
    
    glass: {
      'background': 'rgba(255, 255, 255, 0.8)',
      'border': '1px solid rgba(255, 255, 255, 0.3)',
      'backdrop-filter': 'blur(20px) saturate(180%)',
      'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
    },
    
    gradient: {
      'background': 'linear-gradient(135deg, #8b5cf6, #ec4899)',
      'border': 'none',
      'color': 'white',
      'box-shadow': '0 4px 20px rgba(139, 92, 246, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    },
    
    interactive: {
      'border': '1px solid rgba(0, 0, 0, 0.06)',
      'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02)',
      'cursor': 'pointer',
      '&:hover': {
        'box-shadow': '0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(139, 92, 246, 0.2)',
        'transform': 'translateY(-1px)',
        'border-color': 'rgba(139, 92, 246, 0.2)'
      },
      '&:active': {
        'transform': 'translateY(0)',
        'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(139, 92, 246, 0.3)'
      }
    }
  };

  return {
    ...baseStyles,
    ...(sizeStyles[size] || sizeStyles.md),
    ...(variantStyles[variant] || variantStyles.default)
  };
};

export const cardRules = {
  card
};