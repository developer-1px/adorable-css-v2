import type { RuleHandler, CSSRule } from '../../rules/types';

// Button variants - Apple-inspired design system
const buttonVariants: Record<string, CSSRule> = {
  primary: {
    'background': 'linear-gradient(135deg, #007AFF, #5856D6)',
    'color': 'white',
    'border': 'none',
    'font-weight': '600',
    'transition': 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    'box-shadow': '0 1px 3px rgba(0, 122, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    '&:hover': {
      'background': 'linear-gradient(135deg, #0051D0, #4C45C7)',
      'box-shadow': '0 4px 16px rgba(0, 122, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      'transform': 'translateY(-1px)'
    },
    '&:active': {
      'transform': 'translateY(0)',
      'box-shadow': '0 1px 3px rgba(0, 122, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    }
  },
  
  secondary: {
    'background': 'rgba(0, 0, 0, 0.04)',
    'color': '#1D1D1F',
    'border': '1px solid rgba(0, 0, 0, 0.1)',
    'font-weight': '600',
    'transition': 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.05)',
    '&:hover': {
      'background': 'rgba(0, 0, 0, 0.08)',
      'border-color': 'rgba(0, 0, 0, 0.15)',
      'box-shadow': '0 2px 8px rgba(0, 0, 0, 0.1)',
      'transform': 'translateY(-1px)'
    },
    '&:active': {
      'transform': 'translateY(0)',
      'background': 'rgba(0, 0, 0, 0.12)'
    }
  },
  
  outline: {
    'background': 'transparent',
    'color': '#007AFF',
    'border': '1px solid #007AFF',
    'font-weight': '600',
    'transition': 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      'background': '#007AFF',
      'color': 'white',
      'box-shadow': '0 2px 8px rgba(0, 122, 255, 0.25)'
    },
    '&:active': {
      'background': '#0051D0'
    }
  },
  
  ghost: {
    'background': 'transparent',
    'color': '#1D1D1F',
    'border': 'none',
    'font-weight': '500',
    'transition': 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      'background': 'rgba(0, 0, 0, 0.04)',
      'color': '#000000'
    },
    '&:active': {
      'background': 'rgba(0, 0, 0, 0.08)'
    }
  }
};

// Button sizes - Apple-inspired proportions
const buttonSizes: Record<string, CSSRule> = {
  sm: {
    'padding': '8px 16px',
    'font-size': '14px',
    'border-radius': '8px',
    'min-height': '32px'
  },
  
  md: {
    'padding': '12px 24px',
    'font-size': '16px',
    'border-radius': '10px',
    'min-height': '44px'
  },
  
  lg: {
    'padding': '16px 32px',
    'font-size': '18px',
    'border-radius': '12px',
    'min-height': '52px'
  },
  
  xl: {
    'padding': '20px 40px',
    'font-size': '20px',
    'border-radius': '16px',
    'min-height': '60px'
  }
};

// btn - Button component
export const btn: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    // Default button - Apple-quality design
    return {
      'display': 'inline-flex',
      'align-items': 'center',
      'justify-content': 'center',
      'gap': '8px',
      'cursor': 'pointer',
      'border': 'none',
      'outline': 'none',
      'user-select': 'none',
      'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
      'text-decoration': 'none',
      'white-space': 'nowrap',
      ...buttonSizes.md,
      ...buttonVariants.primary
    };
  }

  const parts = args.split('/');
  const variant = parts[0] || 'primary';
  const size = parts[1] || 'md';
  
  const baseStyles: CSSRule = {
    'display': 'inline-flex',
    'align-items': 'center',
    'justify-content': 'center',
    'gap': '8px',
    'cursor': 'pointer',
    'border': 'none',
    'outline': 'none',
    'user-select': 'none',
    'font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    'text-decoration': 'none',
    'white-space': 'nowrap'
  };

  return {
    ...baseStyles,
    ...buttonSizes[size] || buttonSizes.md,
    ...buttonVariants[variant] || buttonVariants.primary
  };
};

// icon-btn - Icon button
export const iconBtn: RuleHandler = (args?: string): CSSRule => {
  const size = args || 'md';
  
  const iconSizes: Record<string, CSSRule> = {
    sm: {
      'width': '2rem',
      'height': '2rem',
      'padding': '0.5rem'
    },
    md: {
      'width': '2.5rem',
      'height': '2.5rem',
      'padding': '0.625rem'
    },
    lg: {
      'width': '3rem',
      'height': '3rem',
      'padding': '0.75rem'
    }
  };

  return {
    'display': 'inline-flex',
    'align-items': 'center',
    'justify-content': 'center',
    'border-radius': '0.5rem',
    'cursor': 'pointer',
    'border': 'none',
    'outline': 'none',
    'transition': 'all 0.2s ease',
    'background': 'transparent',
    'color': '#6b7280',
    '&:hover': {
      'background': '#f3f4f6',
      'color': '#374151'
    },
    ...iconSizes[size] || iconSizes.md
  };
};

export const buttonRules = {
  btn,
  'icon-btn': iconBtn
};