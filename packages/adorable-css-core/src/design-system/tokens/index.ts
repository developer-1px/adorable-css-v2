// Modern Design Token System for AdorableCSS v2

// Semantic color configuration
export interface SemanticColorConfig {
  primary?: string;      // e.g. "blue-500" or "#0ea5e9"
  secondary?: string;    // e.g. "gray-500"
  accent?: string;       // e.g. "sky-500"
  mute?: string;         // e.g. "gray-400"
  brand?: string;        // e.g. "#8b5cf6..#ec4899" for gradient
  success?: string;      // e.g. "green-500"
  warning?: string;      // e.g. "amber-500"
  error?: string;        // e.g. "red-500"
  info?: string;         // e.g. "cyan-500"
}

// Default semantic color mapping using AdorableCSS syntax
// Monochrome design with gray primary and brand accent
export const semanticColors: SemanticColorConfig = {
  primary: "gray-900",       // Primary text/UI color - monochrome approach
  secondary: "gray-700",     // Secondary text - for supporting content
  accent: "gray-600",        // Accent color - for interactive elements
  mute: "gray-500",          // Muted elements - for captions/labels
  brand: "violet..pink",     // Brand gradient - only colorful element
  success: "gray-700",       // Keep monochrome
  warning: "gray-700",       // Keep monochrome
  error: "gray-700",         // Keep monochrome
  info: "gray-600"           // Keep monochrome
};

// CONSISTENCY ENFORCING TEXT HIERARCHY - USE THESE ONLY
export const textHierarchy = {
  'text-primary': 'gray-900',    // Main headings, important text
  'text-secondary': 'gray-700',  // Subheadings, secondary content  
  'text-tertiary': 'gray-600',   // Body text, descriptions
  'text-subtle': 'gray-500',     // Captions, labels, placeholders
  'text-brand': 'brand'          // Brand colored text (sparingly)
} as const;

// CONSISTENCY ENFORCING BACKGROUND HIERARCHY - USE THESE ONLY
export const backgroundHierarchy = {
  'bg-primary': 'white',         // Main content areas
  'bg-secondary': 'gray-50',     // Alternate sections
  'bg-tertiary': 'gray-100',     // Cards, elevated content
  'bg-subtle': 'gray-200',       // Borders, dividers
  'bg-brand': 'brand'            // Brand backgrounds (sparingly)
} as const;

// CONSISTENCY ENFORCING TYPOGRAPHY SCALE - USE THESE ONLY
// Semantic font sizes with clear purpose
export const typographyScale = {
  'text-xs': 'xs',      // 12px - labels, captions, fine print
  'text-sm': 'sm',      // 14px - small body text, secondary content
  'text-md': 'md',      // 16px - primary body text (default)
  'text-lg': 'lg',      // 18px - large body text, small headings
  'text-xl': 'xl',      // 20px - subheadings
  'text-2xl': '2xl',    // 24px - section headings  
  'text-3xl': '3xl',    // 30px - page headings
  'text-4xl': '4xl',    // 36px - hero headings
  'text-5xl': '5xl',    // 48px - large hero
  'text-6xl': '6xl'     // 60px - display text
} as const;

// CONSISTENCY ENFORCING FONT WEIGHTS - USE THESE ONLY
export const fontWeights = {
  'weight-normal': 'normal',  // 400 - body text
  'weight-medium': 'medium',  // 500 - emphasized text
  'weight-semi': 'semi',      // 600 - subheadings
  'weight-bold': 'bold',      // 700 - headings
  'weight-black': 'black'     // 900 - hero text
} as const;

// CONSISTENCY ENFORCING SPACING SCALE - USE THESE ONLY
export const spacingScale = {
  'space-xs': 'xs',      // 4px - tight spacing
  'space-sm': 'sm',      // 8px - small gaps
  'space-md': 'md',      // 12px - standard spacing
  'space-lg': 'lg',      // 16px - comfortable spacing
  'space-xl': 'xl',      // 20px - large spacing
  'space-2xl': '2xl',    // 24px - section spacing
  'space-3xl': '3xl',    // 32px - large section spacing
  'space-4xl': '4xl'     // 48px - page-level spacing
} as const;

export interface DesignTokens {
  font: {
    '3xs': string;
    '2xs': string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    '7xl': string;
    '8xl': string;
    '9xl': string;
  };
  spacing: {
    // Semantic spacing tokens for better control
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    '7xl': string;
    '8xl': string;
    '9xl': string;
  };
  size: {
    // Comprehensive size tokens (TailwindCSS compatible)
    '3xs': string;
    '2xs': string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
    '7xl': string;
    '8xl': string;
    '9xl': string;
    
    // Special sizes
    'auto': string;
    'full': string;
    'screen': string;
    'min': string;
    'max': string;
    'fit': string;
  };
  lineHeight: {
    none: string;
    tight: string;
    snug: string;
    normal: string;
    relaxed: string;
    loose: string;
  };
  letterSpacing: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
  };
  fontWeight: {
    thin: string;
    extralight: string;
    light: string;
    normal: string;
    medium: string;
    semi: string;
    bold: string;
    extrabold: string;
    black: string;
  };
  radius: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    full: string;
  };
  shadow: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
  };
  colors: {
    // Core semantic colors
    primary: string;
    secondary: string;
    accent: string;
    mute: string;
    brand: string;
    'brand-start': string;
    'brand-end': string;
    success: string;
    warning: string;
    error: string;
    info: string;
    
    // Extended color system
    white: string;
    black: string;
    
    // Gray scale
    gray: {
      '50': string;
      '100': string;
      '200': string;
      '300': string;
      '400': string;
      '500': string;
      '600': string;
      '700': string;
      '800': string;
      '900': string;
      '950': string;
    };
    
    // Primary brand colors
    'primary-50': string;
    'primary-100': string;
    'primary-200': string;
    'primary-300': string;
    'primary-400': string;
    'primary-500': string;
    'primary-600': string;
    'primary-700': string;
    'primary-800': string;
    'primary-900': string;
    'primary-950': string;
    
    // Success colors
    'success-50': string;
    'success-100': string;
    'success-200': string;
    'success-300': string;
    'success-400': string;
    'success-500': string;
    'success-600': string;
    'success-700': string;
    'success-800': string;
    'success-900': string;
    'success-950': string;
    
    // Warning colors
    'warning-50': string;
    'warning-100': string;
    'warning-200': string;
    'warning-300': string;
    'warning-400': string;
    'warning-500': string;
    'warning-600': string;
    'warning-700': string;
    'warning-800': string;
    'warning-900': string;
    'warning-950': string;
    
    // Error colors
    'error-50': string;
    'error-100': string;
    'error-200': string;
    'error-300': string;
    'error-400': string;
    'error-500': string;
    'error-600': string;
    'error-700': string;
    'error-800': string;
    'error-900': string;
    'error-950': string;
    
    // Info colors
    'info-50': string;
    'info-100': string;
    'info-200': string;
    'info-300': string;
    'info-400': string;
    'info-500': string;
    'info-600': string;
    'info-700': string;
    'info-800': string;
    'info-900': string;
    'info-950': string;
    
    // Blue colors
    'blue-50': string;
    'blue-100': string;
    'blue-200': string;
    'blue-300': string;
    'blue-400': string;
    'blue-500': string;
    'blue-600': string;
    'blue-700': string;
    'blue-800': string;
    'blue-900': string;
    'blue-950': string;
    
    // Green colors
    'green-50': string;
    'green-100': string;
    'green-200': string;
    'green-300': string;
    'green-400': string;
    'green-500': string;
    'green-600': string;
    'green-700': string;
    'green-800': string;
    'green-900': string;
    'green-950': string;
    
    // Amber colors
    'amber-50': string;
    'amber-100': string;
    'amber-200': string;
    'amber-300': string;
    'amber-400': string;
    'amber-500': string;
    'amber-600': string;
    'amber-700': string;
    'amber-800': string;
    'amber-900': string;
    'amber-950': string;
    
    // Red colors
    'red-50': string;
    'red-100': string;
    'red-200': string;
    'red-300': string;
    'red-400': string;
    'red-500': string;
    'red-600': string;
    'red-700': string;
    'red-800': string;
    'red-900': string;
    'red-950': string;
  };
  opacity: {
    '0': string;
    '5': string;
    '10': string;
    '20': string;
    '25': string;
    '30': string;
    '40': string;
    '50': string;
    '60': string;
    '70': string;
    '75': string;
    '80': string;
    '90': string;
    '95': string;
    '100': string;
  };
  zIndex: {
    hide: string;
    auto: string;
    base: string;
    docked: string;
    dropdown: string;
    sticky: string;
    banner: string;
    overlay: string;
    modal: string;
    popover: string;
    skipLink: string;
    toast: string;
    tooltip: string;
  };
  duration: {
    instant: string;
    fast: string;
    normal: string;
    slow: string;
    slower: string;
    slowest: string;
  };
  ease: {
    linear: string;
    in: string;
    out: string;
    'in-out': string;
    back: string;
    bounce: string;
  };
  heading: {
    h1: {
      fontSize: string;
      lineHeight: string;
      letterSpacing: string;
      fontWeight: string;
      marginBottom: string;
    };
    h2: {
      fontSize: string;
      lineHeight: string;
      letterSpacing: string;
      fontWeight: string;
      marginBottom: string;
    };
    h3: {
      fontSize: string;
      lineHeight: string;
      letterSpacing: string;
      fontWeight: string;
      marginBottom: string;
    };
    h4: {
      fontSize: string;
      lineHeight: string;
      letterSpacing: string;
      fontWeight: string;
      marginBottom: string;
    };
    h5: {
      fontSize: string;
      lineHeight: string;
      letterSpacing: string;
      fontWeight: string;
      marginBottom: string;
    };
    h6: {
      fontSize: string;
      lineHeight: string;
      letterSpacing: string;
      fontWeight: string;
      marginBottom: string;
    };
  };
}

// Modern token values based on industry best practices
export const defaultTokens: DesignTokens = {
  // Typography Scale - Minor Third (1.2) ratio for better web readability
  // Based on 16px (1rem) with more conservative scaling
  font: {
    '3xs': '0.5rem',   // 8px     (16 × 0.5)
    '2xs': '0.625rem', // 10px    (16 × 0.625)
    xs: '0.75rem',     // 12px    (16 ÷ 1.333)
    sm: '0.875rem',    // 14px    (16 × 0.875)
    md: '1rem',        // 16px    (base - perfect for body text)
    lg: '1.125rem',    // 18px    (16 × 1.125)
    xl: '1.25rem',     // 20px    (16 × 1.25)
    '2xl': '1.5rem',   // 24px    (16 × 1.5)
    '3xl': '1.875rem', // 30px    (16 × 1.875)
    '4xl': '2.25rem',  // 36px    (16 × 2.25)
    '5xl': '3rem',     // 48px    (16 × 3)
    '6xl': '3.75rem',  // 60px    (16 × 3.75)
    '7xl': '4.5rem',   // 72px    (16 × 4.5)
    '8xl': '6rem',     // 96px    (16 × 6)
    '9xl': '8rem',     // 128px   (16 × 8)
  },
  
  // Spacing Scale - Based on 4px grid system
  spacing: {
    // Base 4px grid increments
    xs: '0.25rem',        // 4px - smallest unit (1x base)
    sm: '0.5rem',         // 8px - small spacing (2x base)
    md: '0.75rem',        // 12px - medium spacing (3x base)
    lg: '1rem',           // 16px - default spacing (4x base)
    xl: '1.25rem',        // 20px - large spacing (5x base)
    '2xl': '1.5rem',      // 24px - extra large (6x base)
    '3xl': '2rem',        // 32px - section spacing (8x base)
    '4xl': '2.5rem',      // 40px - subsection spacing (10x base)
    '5xl': '3rem',        // 48px - large section (12x base)
    '6xl': '4rem',        // 64px - hero spacing (16x base)
    '7xl': '5rem',        // 80px - extra hero (20x base)
    '8xl': '6rem',        // 96px - maximum spacing (24x base)
    '9xl': '8rem'         // 128px - mega spacing (32x base)
  },
  
  // Size Scale - for width/height utilities (matches container breakpoint system)
  size: {
    // Small sizes
    '3xs': '16rem',     // 256px - very small content
    '2xs': '20rem',     // 320px - mobile content
    xs: '30rem',        // 480px - small tablet
    sm: '40rem',        // 640px - tablet
    md: '48rem',        // 768px - small desktop
    lg: '64rem',        // 1024px - desktop
    xl: '80rem',        // 1280px - large desktop
    '2xl': '96rem',     // 1536px - extra large
    '3xl': '120rem',    // 1920px - ultra wide
    '4xl': '160rem',    // 2560px - 4K
    '5xl': '200rem',    // 3200px - 5K
    '6xl': '240rem',    // 3840px - 6K
    '7xl': '280rem',    // 4480px - 7K
    '8xl': '320rem',    // 5120px - 8K
    '9xl': '400rem',    // 6400px - 9K
    
    // Special values
    'auto': 'auto',
    'full': '100%',
    'screen': '100vw',  // for width, becomes 100vh for height
    'min': 'min-content',
    'max': 'max-content',
    'fit': 'fit-content',
  },
  
  lineHeight: {
    none: '1',        // 100% - for titles that need tight spacing
    tight: '1.1',     // 110% - for large headings (minimal line spacing)
    snug: '1.2',      // 120% - for medium headings
    normal: '1.4',    // 140% - for body text (optimal readability)
    relaxed: '1.6',   // 160% - for comfortable reading
    loose: '1.8',     // 180% - for maximum readability
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semi: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  // Modern rounded design with practical values
  radius: {
    none: '0',
    xs: '0.125rem',    // 2px - subtle rounding
    sm: '0.25rem',     // 4px - small elements
    md: '0.5rem',      // 8px - default radius
    lg: '0.75rem',     // 12px - cards, modals
    xl: '1rem',        // 16px - large cards
    '2xl': '1.5rem',   // 24px - hero sections
    '3xl': '2rem',     // 32px - decorative
    '4xl': '3rem',     // 48px - extra decorative
    full: '9999px',    // pills, circles
  },
  
  // Sophisticated layered shadow system
  shadow: {
    none: 'none',
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 2px 4px -1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
    md: '0 4px 8px -2px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.04)',
    lg: '0 10px 20px -3px rgb(0 0 0 / 0.08), 0 4px 8px -3px rgb(0 0 0 / 0.04)',
    xl: '0 20px 40px -4px rgb(0 0 0 / 0.1), 0 8px 16px -4px rgb(0 0 0 / 0.04)',
    '2xl': '0 32px 64px -6px rgb(0 0 0 / 0.14), 0 16px 32px -6px rgb(0 0 0 / 0.04)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
  },
  
  colors: {
    // Core semantic colors - will be resolved from semanticColors config
    primary: '#18181b',    // Gray-900 - monochrome primary
    secondary: '#64748b',  // Default fallback
    accent: '#0d99ff',     // Default fallback
    mute: '#71717a',       // Default fallback
    brand: '#8b5cf6',      // Default fallback
    'brand-start': '#8b5cf6', // Brand gradient start
    'brand-end': '#ec4899',   // Brand gradient end
    success: '#10b981',    // Default fallback
    warning: '#f59e0b',    // Default fallback
    error: '#ef4444',      // Default fallback
    info: '#06b6d4',       // Default fallback
    
    // Basic colors
    white: '#ffffff',
    black: '#000000',
    
    // Gray scale - neutral with slight cool tone
    gray: {
      '50': '#fafafa',
      '100': '#f4f4f5',
      '200': '#e4e4e7',
      '300': '#d4d4d8',
      '400': '#a1a1aa',
      '500': '#71717a',
      '600': '#52525b',
      '700': '#3f3f46',
      '800': '#27272a',
      '900': '#18181b',
      '950': '#09090b',
    },
    
    // Blue colors (Primary brand color)
    'blue-50': '#eff6ff',
    'blue-100': '#dbeafe', 
    'blue-200': '#bfdbfe',
    'blue-300': '#93c5fd',
    'blue-400': '#60a5fa',
    'blue-500': '#3b82f6',
    'blue-600': '#2563eb',
    'blue-700': '#1d4ed8',
    'blue-800': '#1e40af',
    'blue-900': '#1e3a8a',
    'blue-950': '#172554',
    
    // Primary brand colors (using blue scale)
    'primary-50': '#eff6ff',
    'primary-100': '#dbeafe',
    'primary-200': '#bfdbfe',
    'primary-300': '#93c5fd',
    'primary-400': '#60a5fa',
    'primary-500': '#3b82f6',
    'primary-600': '#2563eb',
    'primary-700': '#1d4ed8',
    'primary-800': '#1e40af',
    'primary-900': '#1e3a8a',
    'primary-950': '#172554',
    
    // Green colors
    'green-50': '#f0fdf4',
    'green-100': '#dcfce7',
    'green-200': '#bbf7d0',
    'green-300': '#86efac',
    'green-400': '#4ade80',
    'green-500': '#22c55e',
    'green-600': '#16a34a',
    'green-700': '#15803d',
    'green-800': '#166534',
    'green-900': '#14532d',
    'green-950': '#052e16',
    
    // Success colors (using green scale)
    'success-50': '#f0fdf4',
    'success-100': '#dcfce7',
    'success-200': '#bbf7d0',
    'success-300': '#86efac',
    'success-400': '#4ade80',
    'success-500': '#22c55e',
    'success-600': '#16a34a',
    'success-700': '#15803d',
    'success-800': '#166534',
    'success-900': '#14532d',
    'success-950': '#052e16',
    
    // Amber colors
    'amber-50': '#fffbeb',
    'amber-100': '#fef3c7',
    'amber-200': '#fde68a',
    'amber-300': '#fcd34d',
    'amber-400': '#fbbf24',
    'amber-500': '#f59e0b',
    'amber-600': '#d97706',
    'amber-700': '#b45309',
    'amber-800': '#92400e',
    'amber-900': '#78350f',
    'amber-950': '#451a03',
    
    // Warning colors (using amber scale)
    'warning-50': '#fffbeb',
    'warning-100': '#fef3c7',
    'warning-200': '#fde68a',
    'warning-300': '#fcd34d',
    'warning-400': '#fbbf24',
    'warning-500': '#f59e0b',
    'warning-600': '#d97706',
    'warning-700': '#b45309',
    'warning-800': '#92400e',
    'warning-900': '#78350f',
    'warning-950': '#451a03',
    
    // Red colors
    'red-50': '#fef2f2',
    'red-100': '#fee2e2',
    'red-200': '#fecaca',
    'red-300': '#fca5a5',
    'red-400': '#f87171',
    'red-500': '#ef4444',
    'red-600': '#dc2626',
    'red-700': '#b91c1c',
    'red-800': '#991b1b',
    'red-900': '#7f1d1d',
    'red-950': '#450a0a',
    
    // Error colors (using red scale)
    'error-50': '#fef2f2',
    'error-100': '#fee2e2',
    'error-200': '#fecaca',
    'error-300': '#fca5a5',
    'error-400': '#f87171',
    'error-500': '#ef4444',
    'error-600': '#dc2626',
    'error-700': '#b91c1c',
    'error-800': '#991b1b',
    'error-900': '#7f1d1d',
    'error-950': '#450a0a',
    
    // Info colors (Sky)
    'info-50': '#f0f9ff',
    'info-100': '#e0f2fe',
    'info-200': '#bae6fd',
    'info-300': '#7dd3fc',
    'info-400': '#38bdf8',
    'info-500': '#0ea5e9',
    'info-600': '#0284c7',
    'info-700': '#0369a1',
    'info-800': '#075985',
    'info-900': '#0c4a6e',
    'info-950': '#082f49',
  },
  
  opacity: {
    '0': '0',
    '5': '0.05',
    '10': '0.1',
    '20': '0.2',
    '25': '0.25',
    '30': '0.3',
    '40': '0.4',
    '50': '0.5',
    '60': '0.6',
    '70': '0.7',
    '75': '0.75',
    '80': '0.8',
    '90': '0.9',
    '95': '0.95',
    '100': '1',
  },
  
  zIndex: {
    hide: '-1',
    auto: 'auto',
    base: '0',
    docked: '10',
    dropdown: '1000',
    sticky: '1100',
    banner: '1200',
    overlay: '1300',
    modal: '1400',
    popover: '1500',
    skipLink: '1600',
    toast: '1700',
    tooltip: '1800',
  },
  
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
    slowest: '1000ms',
  },
  
  ease: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    back: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  // Heading System - More reasonable sizes for web
  heading: {
    h1: {
      fontSize: '2.25rem',      // 36px - Main page title
      lineHeight: '1.1',        // tight - for maximum impact
      letterSpacing: '-0.025em', // tight - better visual density for large text
      fontWeight: '700',        // bold - strong hierarchy
      marginBottom: '1.5rem',   // 24px
    },
    h2: {
      fontSize: '1.875rem',     // 30px - Section titles
      lineHeight: '1.2',        // snug
      letterSpacing: '-0.02em',
      fontWeight: '700',        // bold
      marginBottom: '1.25rem',  // 20px
    },
    h3: {
      fontSize: '1.5rem',       // 24px - Subsection titles
      lineHeight: '1.25',       // snug
      letterSpacing: '-0.015em',
      fontWeight: '600',        // semi
      marginBottom: '1rem',     // 16px
    },
    h4: {
      fontSize: '1.25rem',      // 20px - Content headings
      lineHeight: '1.3',        // snug
      letterSpacing: '-0.01em',
      fontWeight: '600',        // semi
      marginBottom: '0.875rem', // 14px
    },
    h5: {
      fontSize: '1.125rem',     // 18px - Minor headings
      lineHeight: '1.4',        // normal
      letterSpacing: '0',
      fontWeight: '600',        // semi
      marginBottom: '0.75rem',  // 12px
    },
    h6: {
      fontSize: '1rem',         // 16px - Small headings
      lineHeight: '1.4',        // normal - better readability for smaller headings
      letterSpacing: '0',       // normal
      fontWeight: '600',        // semi
      marginBottom: '0.5rem',   // 8px (spacing-sm)
    },
  },
};

// Color palette for resolving semantic colors
// This will be populated by the color system
export let colorPalette: Record<string, string> = {};

// Set color palette (called by color system)
export function setColorPalette(palette: Record<string, string>): void {
  colorPalette = palette;
}

// Resolve semantic color value from configuration
export function resolveSemanticColor(value: string): { type: 'solid' | 'gradient', value: string, start?: string, end?: string } {
  // Check if it's a gradient (contains ..)
  if (value.includes('..')) {
    const [start, end] = value.split('..');
    return {
      type: 'gradient',
      value: `linear-gradient(135deg, ${resolveColorValue(start)}, ${resolveColorValue(end)})`,
      start: resolveColorValue(start),
      end: resolveColorValue(end)
    };
  }
  
  // Otherwise it's a solid color
  return {
    type: 'solid',
    value: resolveColorValue(value)
  };
}

// Resolve a single color value (from palette or hex)
function resolveColorValue(value: string): string {
  // If it's a hex color, return as-is
  if (value.startsWith('#')) {
    return value;
  }
  
  // Check if it's in the color palette
  if (colorPalette[value]) {
    return colorPalette[value];
  }
  
  // If it's a color with a number (like blue-500), try to find it
  // This handles cases where colorPalette might use different naming
  const colorMatch = value.match(/^(\w+)-(\d+)$/);
  if (colorMatch) {
    const [, colorName, shade] = colorMatch;
    const paletteKey = `${colorName}-${shade}`;
    if (colorPalette[paletteKey]) {
      return colorPalette[paletteKey];
    }
  }
  
  // Fallback to the value itself
  return value;
}

// Build semantic colors from configuration
export function buildSemanticColors(config: SemanticColorConfig = semanticColors): Record<string, any> {
  const result: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(config)) {
    if (!value) continue;
    
    const resolved = resolveSemanticColor(value);
    
    if (resolved.type === 'gradient') {
      result[key] = resolved.start || '#8b5cf6';  // fallback for gradient start
      result[`${key}-start`] = resolved.start || '#8b5cf6';
      result[`${key}-end`] = resolved.end || '#ec4899';
      result[`${key}-gradient`] = resolved.value;
    } else {
      result[key] = resolved.value;
    }
  }
  
  return result;
}

// Token type guards
// Current token context for rules to use
let currentTokenContext: DesignTokens = defaultTokens;

export function setTokenContext(tokens: DesignTokens): void {
  currentTokenContext = tokens;
}

export function isToken(value: string, category: keyof DesignTokens): boolean {
  const categoryTokens = currentTokenContext[category];
  
  // Handle nested objects like colors.gray
  if (typeof categoryTokens === 'object' && categoryTokens !== null) {
    // Check top-level keys
    if (value in categoryTokens) {
      return true;
    }
    
    // Check nested keys (like gray.500)
    for (const [key, nestedValue] of Object.entries(categoryTokens)) {
      if (typeof nestedValue === 'object' && nestedValue !== null) {
        if (value in nestedValue) {
          return true;
        }
      }
    }
  }
  
  return false;
}

// Get CSS variable name for token
export function getTokenVar(category: keyof DesignTokens, token: string): string {
  return `var(--${category}-${token})`;
}

// Generate CSS variables from tokens
export function generateTokenCSS(tokens: DesignTokens = defaultTokens): string {
  const cssVars: string[] = [];
  
  function processTokens(obj: any, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Handle nested objects like colors.gray
        processTokens(value, fullKey);
      } else {
        cssVars.push(`  --${fullKey}: ${value};`);
      }
    }
  }
  
  processTokens(tokens);
  
  // Add semantic color mappings
  const semanticMappings = `
  /* Semantic Color System */
  /* Primary colors (using purple as brand color) */
  --primary-50: var(--purple-50, #faf5ff);
  --primary-100: var(--purple-100, #f3e8ff);
  --primary-200: var(--purple-200, #e9d5ff);
  --primary-300: var(--purple-300, #d8b4fe);
  --primary-400: var(--purple-400, #c084fc);
  --primary-500: var(--purple-500, #a855f7);
  --primary-600: var(--purple-600, #9333ea);
  --primary-700: var(--purple-700, #7c3aed);
  --primary-800: var(--purple-800, #6b21a8);
  --primary-900: var(--purple-900, #581c87);
  
  /* Neutral colors (using gray) */
  --neutral-50: var(--gray-50);
  --neutral-100: var(--gray-100);
  --neutral-200: var(--gray-200);
  --neutral-300: var(--gray-300);
  --neutral-400: var(--gray-400);
  --neutral-500: var(--gray-500);
  --neutral-600: var(--gray-600);
  --neutral-700: var(--gray-700);
  --neutral-800: var(--gray-800);
  --neutral-900: var(--gray-900);
  
  /* Surface colors */
  --surface-base: var(--white);
  --surface-subtle: var(--gray-50);
  --surface-accent: var(--purple-50);
  --surface-inverse: var(--gray-900);
  
  /* Text colors */
  --text-primary: var(--gray-900);
  --text-secondary: var(--gray-600);
  --text-subtle: var(--gray-500);
  --text-accent: var(--purple-600);
  --text-inverse: var(--white);
  
  /* Border colors */
  --border-default: var(--gray-200);
  --border-accent: var(--purple-200);
  --border-subtle: var(--gray-100);
  
  /* Brand gradient */
  --brand-gradient: linear-gradient(135deg, var(--brand-start), var(--brand-end));
  --brand-gradient-hover: linear-gradient(135deg, #7c3aed, #db2777);
  --brand-gradient-text: linear-gradient(90deg, var(--brand-start), var(--brand-end));`;
  
  return `:root {\n${cssVars.join('\n')}\n${semanticMappings}\n}`;
}

// Inject design tokens into the document
export function injectTokens(tokens: DesignTokens = defaultTokens): void {
  if (typeof document === 'undefined') return;
  
  const existingStyle = document.getElementById('adorable-css-tokens');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  const style = document.createElement('style');
  style.id = 'adorable-css-tokens';
  style.textContent = generateTokenCSS(tokens);
  document.head.appendChild(style);
}

// Note: Semantic color functions are already exported above