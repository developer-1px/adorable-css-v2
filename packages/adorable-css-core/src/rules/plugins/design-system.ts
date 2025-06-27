/**
 * Comprehensive Design System Plugin for AdorableCSS
 * 
 * This plugin provides a complete design system with:
 * - Layout utilities (sections, containers, content)
 * - Typography system (headings, body text, special text)
 * - Component system (cards, buttons, badges, alerts)
 * - Spacing and rhythm utilities
 * - Color and visual utilities
 */

import { makeValue } from '../../values/makeValue';
import { isToken, getTokenVar } from '../../tokens';
import type { CSSRule } from '../types';

// ===== Layout System =====

/**
 * Section utilities for consistent page sections
 * Provides automatic spacing and layout for different section types
 */
export const sectionRules = {
  'section': (value?: string): Record<string, string> => {
    const baseStyles = {
      'padding-top': makeValue('4xl'),
      'padding-bottom': makeValue('4xl'),
      'padding-left': makeValue('lg'),
      'padding-right': makeValue('lg')
    };

    switch (value) {
      case 'hero':
        return {
          'min-height': '100vh',
          'padding-top': makeValue('6xl'),
          'padding-bottom': makeValue('6xl'),
          'padding-left': makeValue('lg'),
          'padding-right': makeValue('lg'),
          'display': 'flex',
          'align-items': 'center'
        };
      
      case 'feature':
        return {
          'padding-top': makeValue('5xl'),
          'padding-bottom': makeValue('5xl'),
          'padding-left': makeValue('lg'),
          'padding-right': makeValue('lg')
        };
      
      case 'compact':
        return {
          'padding-top': makeValue('2xl'),
          'padding-bottom': makeValue('2xl'),
          'padding-left': makeValue('lg'),
          'padding-right': makeValue('lg')
        };
      
      case 'flush':
        return {
          'padding-top': '0',
          'padding-bottom': '0',
          'padding-left': makeValue('lg'),
          'padding-right': makeValue('lg')
        };
      
      default:
        return baseStyles;
    }
  }
};

/**
 * Container utilities for consistent max-widths and centering
 */
export const containerRules = {
  'contain': (value?: string) => {
    const baseStyles = {
      'width': '100%',
      'margin-left': 'auto',
      'margin-right': 'auto',
      'padding-left': makeValue('lg'),
      'padding-right': makeValue('lg')
    };

    switch (value) {
      case 'narrow':
        return { ...baseStyles, 'max-width': '48rem' }; // 768px - text content
      
      case 'wide':
        return { ...baseStyles, 'max-width': '80rem' }; // 1280px - wide layouts
      
      case 'full':
        return { ...baseStyles, 'max-width': '96rem' }; // 1536px - full width
      
      default:
        return { ...baseStyles, 'max-width': '64rem' }; // 1024px - default
    }
  }
};

/**
 * Content layout utilities for consistent content blocks
 */
export const contentRules = {
  'content': (value?: string) => {
    const baseStyles = {
      'display': 'flex',
      'flex-direction': 'column',
      'gap': makeValue('lg')
    };

    switch (value) {
      case 'centered':
        return {
          ...baseStyles,
          'align-items': 'center',
          'text-align': 'center'
        };
      
      case 'hero':
        return {
          ...baseStyles,
          'gap': makeValue('2xl'),
          'align-items': 'center',
          'text-align': 'center',
          'max-width': '48rem',
          'margin-left': 'auto',
          'margin-right': 'auto'
        };
      
      default:
        return baseStyles;
    }
  }
};

/**
 * Stack utilities for vertical layouts with consistent spacing
 */
export const stackRules = {
  'stack': (value?: string) => ({
    'display': 'flex',
    'flex-direction': 'column',
    'gap': makeValue(value || 'md')
  })
};

/**
 * Flow utilities for text content with optimal line lengths
 */
export const flowRules = {
  'flow': (value?: string) => {
    const baseStyles = {
      'max-width': '65ch',
      'line-height': '1.6'
    };

    switch (value) {
      case 'narrow':
        return { ...baseStyles, 'max-width': '45ch' };
      
      case 'wide':
        return { ...baseStyles, 'max-width': '75ch' };
      
      default:
        return baseStyles;
    }
  }
};

/**
 * Rhythm utilities for consistent vertical spacing between elements
 */
export const rhythmRules = {
  'rhythm': (value?: string) => ({
    '& > * + *': {
      'margin-top': makeValue(value || '2xl')
    }
  })
};

// ===== Typography System =====

/**
 * Enhanced heading system with consistent scaling
 */
export const headingSystemRules = {
  'hero-text': () => ({
    'font-size': 'clamp(2.5rem, 5vw, 4rem)',
    'font-weight': '900',
    'line-height': '1.1',
    'letter-spacing': '-0.02em'
  }),

  'lead': () => ({
    'font-size': makeValue('xl'),
    'line-height': '1.6',
    'opacity': '0.8'
  }),

  'caption': () => ({
    'font-size': makeValue('sm'),
    'line-height': '1.4',
    'opacity': '0.7'
  }),

  'label': () => ({
    'font-size': makeValue('xs'),
    'font-weight': '600',
    'text-transform': 'uppercase',
    'letter-spacing': '0.05em'
  })
};

// ===== Component System =====

/**
 * Card system with consistent styling
 */
export const cardSystemRules = {
  'card-base': () => ({
    'background': 'white',
    'border-radius': makeValue('lg'),
    'padding': makeValue('xl'),
    'box-shadow': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
  }),

  'card-hover': () => ({
    'transition': 'all 0.2s ease',
    '&:hover': {
      'transform': 'translateY(-2px)',
      'box-shadow': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }
  }),

  'card-gradient': (value?: string): CSSRule => {
    const [direction = '135deg', ...colors] = (value || '').split('/');
    const colorList = colors.join('/').split(',');
    
    if (colorList.length >= 2) {
      return {
        'background': `linear-gradient(${direction}, ${colorList.join(', ')})`
      };
    }
    // Return a proper CSSRule with no properties instead of {}
    return {} as CSSRule;
  }
};

/**
 * Button system with consistent styling
 */
export const buttonSystemRules = {
  'btn-base': () => ({
    'display': 'inline-flex',
    'align-items': 'center',
    'justify-content': 'center',
    'gap': makeValue('sm'),
    'padding': `${makeValue('md')} ${makeValue('xl')}`,
    'border-radius': makeValue('lg'),
    'font-weight': '600',
    'transition': 'all 0.2s ease',
    'cursor': 'pointer',
    'border': 'none',
    'text-decoration': 'none'
  }),

  'btn-primary': () => ({
    'background': getTokenVar('colors', 'primary'),
    'color': 'white',
    '&:hover': {
      'transform': 'translateY(-1px)',
      'box-shadow': '0 10px 15px -3px rgba(139, 92, 246, 0.3)'
    }
  }),

  'btn-secondary': () => ({
    'background': 'white',
    'color': getTokenVar('colors', 'primary'),
    'border': `2px solid ${getTokenVar('colors', 'primary')}`,
    '&:hover': {
      'background': getTokenVar('colors', 'primary'),
      'color': 'white'
    }
  }),

  'btn-ghost': () => ({
    'background': 'transparent',
    'color': 'currentColor',
    '&:hover': {
      'background': 'rgba(0, 0, 0, 0.05)'
    }
  })
};

/**
 * Badge system for labels and tags
 */
export const badgeRules = {
  'badge': (value?: string) => {
    const baseStyles = {
      'display': 'inline-flex',
      'align-items': 'center',
      'padding': `${makeValue('xs')} ${makeValue('sm')}`,
      'border-radius': makeValue('full'),
      'font-size': makeValue('xs'),
      'font-weight': '600'
    };

    switch (value) {
      case 'success':
        return {
          ...baseStyles,
          'background': 'rgb(34 197 94 / 0.1)',
          'color': 'rgb(34 197 94)'
        };
      
      case 'warning':
        return {
          ...baseStyles,
          'background': 'rgb(251 146 60 / 0.1)',
          'color': 'rgb(251 146 60)'
        };
      
      case 'error':
        return {
          ...baseStyles,
          'background': 'rgb(239 68 68 / 0.1)',
          'color': 'rgb(239 68 68)'
        };
      
      case 'info':
        return {
          ...baseStyles,
          'background': 'rgb(59 130 246 / 0.1)',
          'color': 'rgb(59 130 246)'
        };
      
      default:
        return {
          ...baseStyles,
          'background': getTokenVar('colors', 'gray-100'),
          'color': getTokenVar('colors', 'gray-700')
        };
    }
  }
};

/**
 * Alert system for notifications
 */
export const alertRules = {
  'alert': (value?: string) => {
    const baseStyles = {
      'padding': makeValue('md'),
      'border-radius': makeValue('md'),
      'border-width': '1px',
      'border-style': 'solid'
    };

    switch (value) {
      case 'success':
        return {
          ...baseStyles,
          'background': 'rgb(34 197 94 / 0.05)',
          'border-color': 'rgb(34 197 94 / 0.2)',
          'color': 'rgb(22 101 52)'
        };
      
      case 'warning':
        return {
          ...baseStyles,
          'background': 'rgb(251 146 60 / 0.05)',
          'border-color': 'rgb(251 146 60 / 0.2)',
          'color': 'rgb(154 52 18)'
        };
      
      case 'error':
        return {
          ...baseStyles,
          'background': 'rgb(239 68 68 / 0.05)',
          'border-color': 'rgb(239 68 68 / 0.2)',
          'color': 'rgb(127 29 29)'
        };
      
      case 'info':
        return {
          ...baseStyles,
          'background': 'rgb(59 130 246 / 0.05)',
          'border-color': 'rgb(59 130 246 / 0.2)',
          'color': 'rgb(30 58 138)'
        };
      
      default:
        return {
          ...baseStyles,
          'background': getTokenVar('colors', 'gray-50'),
          'border-color': getTokenVar('colors', 'gray-200'),
          'color': getTokenVar('colors', 'gray-700')
        };
    }
  }
};

// ===== Grid System =====

/**
 * Feature grid for showcasing features
 */
export const gridSystemRules = {
  'feature-grid': () => ({
    'display': 'grid',
    'grid-template-columns': 'repeat(auto-fit, minmax(280px, 1fr))',
    'gap': makeValue('xl')
  }),

  'card-grid': () => ({
    'display': 'grid',
    'grid-template-columns': 'repeat(auto-fill, minmax(320px, 1fr))',
    'gap': makeValue('lg')
  })
};

// ===== Visual Utilities =====

/**
 * Divider utilities for visual separation
 */
export const dividerRules = {
  'divider': (value?: string) => {
    const baseStyles = {
      'height': '1px',
      'background': getTokenVar('colors', 'gray-200'),
      'border': 'none'
    };

    switch (value) {
      case 'vertical':
        return {
          'width': '1px',
          'height': 'auto',
          'background': getTokenVar('colors', 'gray-200')
        };
      
      case 'thick':
        return {
          ...baseStyles,
          'height': '2px'
        };
      
      case 'dashed':
        return {
          'height': '0',
          'border-top': `1px dashed ${getTokenVar('colors', 'gray-300')}`
        };
      
      default:
        return baseStyles;
    }
  }
};

/**
 * Highlight utilities for emphasis
 */
export const highlightRules = {
  'highlight': (value?: string) => {
    switch (value) {
      case 'yellow':
        return {
          'background': 'linear-gradient(to bottom, transparent 50%, rgb(254 240 138) 50%)',
          'padding': '0 0.2em'
        };
      
      case 'green':
        return {
          'background': 'linear-gradient(to bottom, transparent 50%, rgb(134 239 172) 50%)',
          'padding': '0 0.2em'
        };
      
      case 'blue':
        return {
          'background': 'linear-gradient(to bottom, transparent 50%, rgb(147 197 253) 50%)',
          'padding': '0 0.2em'
        };
      
      default:
        return {
          'background': 'linear-gradient(to bottom, transparent 50%, rgb(251 207 232) 50%)',
          'padding': '0 0.2em'
        };
    }
  }
};

// ===== Export all rules =====

export const designSystemRules = {
  // Layout
  ...sectionRules,
  ...containerRules,
  ...contentRules,
  ...stackRules,
  ...flowRules,
  ...rhythmRules,
  
  // Typography
  ...headingSystemRules,
  
  // Components
  ...cardSystemRules,
  ...buttonSystemRules,
  ...badgeRules,
  ...alertRules,
  
  // Grid
  ...gridSystemRules,
  
  // Visual
  ...dividerRules,
  ...highlightRules
};