import type { CSSRule, RuleHandler } from '../types';

// Responsive Typography System inspired by Practical UI
// Provides fluid typography that scales with viewport

// Responsive type scale with fluid sizing
const responsiveScale = {
  xxs: {
    mobile: '0.625rem',   // 10px
    tablet: '0.6875rem',  // 11px
    desktop: '0.75rem',   // 12px
  },
  xs: {
    mobile: '0.75rem',    // 12px
    tablet: '0.8125rem',  // 13px
    desktop: '0.875rem',  // 14px
  },
  sm: {
    mobile: '0.875rem',   // 14px
    tablet: '0.9375rem',  // 15px
    desktop: '1rem',      // 16px
  },
  base: {
    mobile: '1rem',       // 16px
    tablet: '1.0625rem',  // 17px
    desktop: '1.125rem',  // 18px
  },
  lg: {
    mobile: '1.125rem',   // 18px
    tablet: '1.25rem',    // 20px
    desktop: '1.375rem',  // 22px
  },
  xl: {
    mobile: '1.25rem',    // 20px
    tablet: '1.5rem',     // 24px
    desktop: '1.75rem',   // 28px
  },
  '2xl': {
    mobile: '1.5rem',     // 24px
    tablet: '1.875rem',   // 30px
    desktop: '2.25rem',   // 36px
  },
  '3xl': {
    mobile: '1.875rem',   // 30px
    tablet: '2.25rem',    // 36px
    desktop: '3rem',      // 48px
  },
  '4xl': {
    mobile: '2.25rem',    // 36px
    tablet: '3rem',       // 48px
    desktop: '3.75rem',   // 60px
  },
  '5xl': {
    mobile: '3rem',       // 48px
    tablet: '3.75rem',    // 60px
    desktop: '4.5rem',    // 72px
  },
};

// Fluid typography using clamp()
const fluidScale = {
  xs: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
  sm: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
  base: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
  lg: 'clamp(1.125rem, 1rem + 0.625vw, 1.375rem)',
  xl: 'clamp(1.25rem, 1.125rem + 0.625vw, 1.75rem)',
  '2xl': 'clamp(1.5rem, 1.25rem + 1.25vw, 2.25rem)',
  '3xl': 'clamp(1.875rem, 1.5rem + 1.875vw, 3rem)',
  '4xl': 'clamp(2.25rem, 1.75rem + 2.5vw, 3.75rem)',
  '5xl': 'clamp(3rem, 2.25rem + 3.75vw, 4.5rem)',
  '6xl': 'clamp(3.75rem, 2.75rem + 5vw, 6rem)',
};

// Responsive text utility
export const textResponsive: RuleHandler = (scale?: string): CSSRule => {
  if (!scale || !responsiveScale[scale as keyof typeof responsiveScale]) {
    return {};
  }

  const sizes = responsiveScale[scale as keyof typeof responsiveScale];

  return {
    'font-size': sizes.mobile,
    '@media (min-width: 768px)': {
      'font-size': sizes.tablet,
    },
    '@media (min-width: 1024px)': {
      'font-size': sizes.desktop,
    },
  };
};

// Fluid text utility
export const textFluid: RuleHandler = (scale?: string): CSSRule => {
  if (!scale || !fluidScale[scale as keyof typeof fluidScale]) {
    return {};
  }

  return {
    'font-size': fluidScale[scale as keyof typeof fluidScale],
  };
};

// Typography presets with responsive sizing
export const typographyPreset: RuleHandler = (preset?: string): CSSRule => {
  const presets: Record<string, CSSRule> = {
    // Hero/Display text
    hero: {
      'font-size': 'clamp(2.5rem, 2rem + 2.5vw, 4.5rem)',
      'line-height': '1.1',
      'letter-spacing': '-0.05em',
      'font-weight': '900',
    },

    // Page title
    'page-title': {
      'font-size': 'clamp(2rem, 1.5rem + 2.5vw, 3.5rem)',
      'line-height': '1.2',
      'letter-spacing': '-0.025em',
      'font-weight': '800',
    },

    // Section heading
    'section-heading': {
      'font-size': 'clamp(1.5rem, 1.25rem + 1.25vw, 2.25rem)',
      'line-height': '1.3',
      'letter-spacing': '-0.025em',
      'font-weight': '700',
    },

    // Card title
    'card-title': {
      'font-size': 'clamp(1.125rem, 1rem + 0.625vw, 1.375rem)',
      'line-height': '1.4',
      'font-weight': '600',
    },

    // Body text
    'body': {
      'font-size': 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
      'line-height': '1.6',
      'font-weight': '400',
    },

    // Small text
    'small': {
      'font-size': 'clamp(0.875rem, 0.85rem + 0.125vw, 0.9375rem)',
      'line-height': '1.5',
      'font-weight': '400',
    },

    // Caption
    'caption': {
      'font-size': 'clamp(0.75rem, 0.725rem + 0.125vw, 0.8125rem)',
      'line-height': '1.4',
      'font-weight': '400',
    },
  };

  return presets[preset || ''] || {};
};

// Line height utilities with responsive values
export const leadingResponsive: RuleHandler = (value?: string): CSSRule => {
  const leadingValues: Record<string, string> = {
    tight: '1.1',
    snug: '1.2',
    normal: '1.5',
    relaxed: '1.6',
    loose: '1.8',
  };

  if (!value || !leadingValues[value]) {
    return {};
  }

  return {
    'line-height': leadingValues[value],
  };
};

// Export all responsive typography 03-rules
export const responsiveTypographyRules = {
  'text-responsive': textResponsive,
  'text-fluid': textFluid,
  'typography': typographyPreset,
  'leading-responsive': leadingResponsive,
};