import type { RuleHandler, CSSRule } from '../../rules/types';

// Section utilities for consistent spacing and layout

// section - Section with automatic spacing
export const section: RuleHandler = (args?: string): CSSRule => {
  const variant = args || 'default';
  
  // Base styles for all sections
  const baseStyles: CSSRule = {
    'position': 'relative',
    'width': '100%'
  };
  
  // Variant-specific styles
  const variantStyles: Record<string, CSSRule> = {
    hero: {
      'padding-top': 'var(--spacing-5xl, 3rem)',
      'padding-bottom': 'var(--spacing-5xl, 3rem)',
      'min-height': '100vh',
      'display': 'flex',
      'align-items': 'center'
    },
    feature: {
      'padding-top': 'var(--spacing-4xl, 2.5rem)',
      'padding-bottom': 'var(--spacing-4xl, 2.5rem)'
    },
    compact: {
      'padding-top': 'var(--spacing-2xl, 1.5rem)',
      'padding-bottom': 'var(--spacing-2xl, 1.5rem)'
    },
    flush: {
      'padding-top': '0',
      'padding-bottom': '0'
    },
    default: {
      'padding-top': 'var(--spacing-3xl, 2rem)',
      'padding-bottom': 'var(--spacing-3xl, 2rem)'
    }
  };
  
  return {
    ...baseStyles,
    ...(variantStyles[variant] || variantStyles.default)
  };
};

// contain - Container with built-in responsive behavior
export const contain: RuleHandler = (args?: string): CSSRule => {
  const variant = args || 'default';
  
  // Base container styles
  const baseStyles: CSSRule = {
    'width': '100%',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'padding-left': 'max(var(--spacing-md), 5vw)',
    'padding-right': 'max(var(--spacing-md), 5vw)'
  };
  
  // Max-width variants
  const variantStyles: Record<string, CSSRule> = {
    narrow: {
      'max-width': '48rem' // 768px - for text-heavy content
    },
    wide: {
      'max-width': '80rem' // 1280px - for feature sections
    },
    full: {
      'max-width': '96rem' // 1536px - for full-width layouts
    },
    default: {
      'max-width': '64rem' // 1024px - default container
    }
  };
  
  return {
    ...baseStyles,
    ...(variantStyles[variant] || variantStyles.default)
  };
};

// content - Content block utility for automatic text hierarchy
export const content: RuleHandler = (args?: string): CSSRule => {
  const variant = args || 'default';
  
  // Base content styles
  const baseStyles: CSSRule = {
    'display': 'flex',
    'flex-direction': 'column'
  };
  
  // Variant styles
  const variantStyles: Record<string, CSSRule> = {
    centered: {
      'align-items': 'center',
      'text-align': 'center',
      'gap': 'var(--spacing-xl)'
    },
    hero: {
      'align-items': 'center',
      'text-align': 'center',
      'gap': 'var(--spacing-2xl)',
      'max-width': '48rem',
      'margin': '0 auto'
    },
    default: {
      'gap': 'var(--spacing-lg)'
    }
  };
  
  return {
    ...baseStyles,
    ...(variantStyles[variant] || variantStyles.default)
  };
};

// stack - Stack utility for automatic spacing between elements
export const stack: RuleHandler = (args?: string): CSSRule => {
  const gap = args || 'lg';
  
  return {
    'display': 'flex',
    'flex-direction': 'column',
    'gap': `var(--spacing-${gap})`,
    'width': '100%'
  };
};

// flow - Flow utility for better text readability
export const flow: RuleHandler = (args?: string): CSSRule => {
  const variant = args || 'default';
  
  // Base flow styles for readable text
  const baseStyles: CSSRule = {
    'line-height': '1.7',
    'color': 'var(--gray-700)'
  };
  
  // Variant styles
  const variantStyles: Record<string, CSSRule> = {
    narrow: {
      'max-width': '65ch' // Optimal reading width
    },
    wide: {
      'max-width': '80ch'
    },
    default: {
      'max-width': '70ch'
    }
  };
  
  return {
    ...baseStyles,
    ...(variantStyles[variant] || variantStyles.default)
  };
};

// rhythm - Rhythm utility for consistent spacing between sections
export const rhythm: RuleHandler = (args?: string): CSSRule => {
  const variant = args || 'default';
  
  // Base rhythm styles
  const baseStyles: CSSRule = {
    'display': 'flex',
    'flex-direction': 'column'
  };
  
  // Variant styles
  const variantStyles: Record<string, CSSRule> = {
    tight: {
      'gap': 'var(--spacing-2xl)'
    },
    loose: {
      'gap': 'var(--spacing-5xl)'
    },
    varied: {
      'gap': 'var(--spacing-3xl)'
    },
    default: {
      'gap': 'var(--spacing-4xl)'
    }
  };
  
  return {
    ...baseStyles,
    ...(variantStyles[variant] || variantStyles.default)
  };
};

// lead - Lead text for introductory paragraphs
export const lead: RuleHandler = (): CSSRule => {
  return {
    'font-size': 'var(--font-lg)',
    'line-height': '1.7',
    'color': 'var(--gray-600)',
    'max-width': '65ch',
    'margin': '0 auto'
  };
};

export const sectionRules = {
  section,
  contain,
  content,
  stack,
  flow,
  rhythm,
  lead
};