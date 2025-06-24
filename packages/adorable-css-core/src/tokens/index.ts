// Modern Design Token System for AdorableCSS v2

export interface DesignTokens {
  font: {
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
  };
  spacing: {
    // Semantic spacing tokens only
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  size: {
    // Size tokens for width/height
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
    semibold: string;
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
  // Typography Scale - Major Third (1.333 ratio) for better visual hierarchy
  font: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    md: '1rem',        // 16px (base)
    lg: '1.25rem',     // 20px
    xl: '1.5rem',      // 24px
    '2xl': '2rem',     // 32px
    '3xl': '2.5rem',   // 40px
    '4xl': '3rem',     // 48px
    '5xl': '3.75rem',  // 60px
    '6xl': '4.5rem',   // 72px
    '7xl': '6rem',     // 96px
  },
  
  // Spacing Scale - 4px base unit with practical increments
  spacing: {
    xs: '0.5rem',      // 8px
    sm: '0.75rem',     // 12px
    md: '1rem',        // 16px
    lg: '1.5rem',      // 24px
    xl: '2rem',        // 32px
    '2xl': '2.5rem',   // 40px
    '3xl': '3rem',     // 48px
    '4xl': '4rem',     // 64px
    '5xl': '6rem',     // 96px
  },
  
  // Size Scale - for width/height utilities
  size: {
    xs: '0.5rem',      // 8px
    sm: '0.75rem',     // 12px
    md: '1rem',        // 16px
    lg: '1.5rem',      // 24px
    xl: '2rem',        // 32px
    '2xl': '2.5rem',   // 40px
    '3xl': '3rem',     // 48px
    '4xl': '4rem',     // 64px
    '5xl': '5rem',     // 80px
    '6xl': '6rem',     // 96px
    '7xl': '8rem',     // 128px
  },
  
  lineHeight: {
    none: '1',
    tight: '1.1',
    snug: '1.25',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
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
    semibold: '600',
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
    // Core semantic colors - AdorableCSS brand
    primary: '#0ea5e9',    // Brand blue
    secondary: '#64748b',  // Balanced slate  
    accent: '#0d99ff',     // Figma blue accent
    success: '#10b981',    // Emerald green
    warning: '#f59e0b',    // Amber
    error: '#ef4444',      // Red
    info: '#06b6d4',       // Cyan
    
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
    
    // Primary brand colors (Refined Blue)
    'primary-50': '#f0f9ff',
    'primary-100': '#e0f2fe',
    'primary-200': '#bae6fd',
    'primary-300': '#7dd3fc',
    'primary-400': '#38bdf8',
    'primary-500': '#0ea5e9',
    'primary-600': '#0284c7',
    'primary-700': '#0369a1',
    'primary-800': '#075985',
    'primary-900': '#0c4a6e',
    'primary-950': '#082f49',
    
    // Success colors (Emerald)
    'success-50': '#ecfdf5',
    'success-100': '#d1fae5',
    'success-200': '#a7f3d0',
    'success-300': '#6ee7b7',
    'success-400': '#34d399',
    'success-500': '#10b981',
    'success-600': '#059669',
    'success-700': '#047857',
    'success-800': '#065f46',
    'success-900': '#064e3b',
    'success-950': '#022c22',
    
    // Warning colors (Amber)
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
    
    // Error colors (Red)
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
  
  // Heading System - Type scale with appropriate margins
  heading: {
    h1: {
      fontSize: '3.75rem',      // 60px
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
      fontWeight: '700',
      marginBottom: '2rem',     // 32px
    },
    h2: {
      fontSize: '3rem',         // 48px
      lineHeight: '1.2',
      letterSpacing: '-0.015em',
      fontWeight: '700',
      marginBottom: '1.5rem',   // 24px
    },
    h3: {
      fontSize: '2.25rem',      // 36px
      lineHeight: '1.25',
      letterSpacing: '-0.01em',
      fontWeight: '600',
      marginBottom: '1.25rem',  // 20px
    },
    h4: {
      fontSize: '1.875rem',     // 30px
      lineHeight: '1.3',
      letterSpacing: '-0.005em',
      fontWeight: '600',
      marginBottom: '1rem',     // 16px
    },
    h5: {
      fontSize: '1.5rem',       // 24px
      lineHeight: '1.35',
      letterSpacing: '0',
      fontWeight: '600',
      marginBottom: '0.875rem', // 14px
    },
    h6: {
      fontSize: '1.25rem',      // 20px
      lineHeight: '1.4',
      letterSpacing: '0',
      fontWeight: '600',
      marginBottom: '0.75rem',  // 12px
    },
  },
};

// Token type guards
export function isToken(value: string, category: keyof DesignTokens): boolean {
  const categoryTokens = defaultTokens[category];
  
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
  
  return `:root {\n${cssVars.join('\n')}\n}`;
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