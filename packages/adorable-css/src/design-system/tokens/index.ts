// Modern Design Token System for AdorableCSS v2

// Re-export semantic design system
export * from '../semantic-system';

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
// Modern, sophisticated color palette inspired by top design systems
export const semanticColors: SemanticColorConfig = {
  primary: "blue-600",       // Primary brand color - professional blue
  secondary: "slate-600",    // Secondary - sophisticated slate
  accent: "cyan-500",        // Accent color - modern cyan
  mute: "gray-400",          // Muted elements - soft gray
  brand: "blue-600..cyan-500",  // Brand gradient - blue to cyan
  success: "emerald-600",    // Success states - emerald green
  warning: "amber-500",      // Warning states - warm amber
  error: "red-600",          // Error states - clear red
  info: "sky-500"            // Info states - sky blue
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
    // Icon and small element sizes (for size() utility)
    '4xs': string;
    '3xs': string;
    '2xs': string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    
    // Legacy container sizes (deprecated, use container tokens)
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
  container: {
    // Container width/height tokens (for w/h/max-w/max-h utilities)
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
    
    // Special container values
    'auto': string;
    'full': string;
    'screen': string;
    'min': string;
    'max': string;
    'fit': string;
    'prose': string;
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
    extra: string;
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
    card: string;
    hover: string;
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
    
    // Basic non-OKLCH colors
    white: string;
    black: string;
    
    // All other colors are generated by OKLCH color system and injected dynamically
    // See colorPalette in generateTokenCSS() for the full color set
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
  
  // Size Scale - for size() utility (icons, avatars, squares)
  size: {
    // Icon and small element sizes (4px base)
    '4xs': '1rem',      // 16px - tiny icons
    '3xs': '1.25rem',   // 20px - small icons
    '2xs': '1.5rem',    // 24px - medium icons
    xs: '2rem',         // 32px - large icons, small squares
    sm: '2.5rem',       // 40px - buttons, medium squares
    md: '3rem',         // 48px - larger buttons
    lg: '4rem',         // 64px - avatar, large squares
    xl: '5rem',         // 80px - large avatars
    '2xl': '6rem',      // 96px - hero avatars
    
    // Legacy container sizes (kept for backward compatibility)
    '3xl': '20rem',     // 320px
    '4xl': '30rem',     // 480px
    '5xl': '40rem',     // 640px
    '6xl': '48rem',     // 768px
    '7xl': '64rem',     // 1024px
    '8xl': '80rem',     // 1280px
    '9xl': '96rem',     // 1536px
    
    // Special values
    'auto': 'auto',
    'full': '100%',
    'screen': '100vw',  // for width, becomes 100vh for height
    'min': 'min-content',
    'max': 'max-content',
    'fit': 'fit-content',
  },
  
  // Container Scale - for w/h/max-w/max-h utilities
  container: {
    // Based on common breakpoints and content widths
    xs: '20rem',        // 320px - mobile content
    sm: '24rem',        // 384px - small mobile
    md: '28rem',        // 448px - large mobile
    lg: '32rem',        // 512px - small tablet
    xl: '36rem',        // 576px - tablet
    '2xl': '42rem',     // 672px - large tablet
    '3xl': '48rem',     // 768px - small desktop
    '4xl': '56rem',     // 896px - medium desktop
    '5xl': '64rem',     // 1024px - desktop
    '6xl': '72rem',     // 1152px - large desktop
    '7xl': '80rem',     // 1280px - extra large desktop
    '8xl': '90rem',     // 1440px - 2K displays
    '9xl': '100rem',    // 1600px - ultra wide
    
    // Special container values
    'auto': 'auto',
    'full': '100%',
    'screen': '100vw',  // becomes 100vh for height
    'min': 'min-content',
    'max': 'max-content',
    'fit': 'fit-content',
    'prose': '65ch',    // Optimal reading width
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
    extra: '800',
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
    card: '0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 6px -2px rgb(0 0 0 / 0.04)',
    hover: '0 12px 24px -4px rgb(0 0 0 / 0.12), 0 6px 12px -4px rgb(0 0 0 / 0.06)',
  },
  
  colors: {
    // Core semantic colors - these will be dynamically resolved from semanticColors config
    primary: '',       // Will be resolved to purple-500
    secondary: '',     // Will be resolved to gray-500
    accent: '',        // Will be resolved to pink-500
    mute: '',          // Will be resolved to gray-500
    brand: '',         // Will be resolved to purple-500..pink-500
    'brand-start': '', // Will be resolved from brand gradient
    'brand-end': '',   // Will be resolved from brand gradient
    success: '',       // Will be resolved to green-500
    warning: '',       // Will be resolved to amber-500
    error: '',         // Will be resolved to red-500
    info: '',          // Will be resolved to blue-500
    
    // Basic non-OKLCH colors only
    white: '#ffffff',
    black: '#000000',
    
    // All other colors (gray-*, blue-*, purple-*, etc.) are generated by the OKLCH color system
    // and injected via colorPalette in generateTokenCSS()
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
      result[key] = resolved.start || '';  // No hardcoded fallback
      result[`${key}-start`] = resolved.start || '';
      result[`${key}-end`] = resolved.end || '';
      result[`${key}-gradient`] = resolved.value;
    } else {
      // Set the base color (500 level)
      result[key] = resolved.value;
      
      // For non-gradient colors, also create color family variations
      // Extract the base color name (e.g., "purple" from "purple-500")
      const colorMatch = value.match(/^(\w+)-500$/);
      if (colorMatch) {
        const baseColorName = colorMatch[1];
        
        // Generate all shades for this semantic color
        const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
        for (const shade of shades) {
          const shadeKey = `${key}-${shade}`;
          const paletteKey = `${baseColorName}-${shade}`;
          
          // Try to resolve from palette
          const shadeValue = colorPalette[paletteKey];
          if (shadeValue) {
            result[shadeKey] = shadeValue;
          }
        }
      }
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
  
  // Add full color palette as CSS variables (gray-100, purple-500, etc.)
  if (colorPalette && Object.keys(colorPalette).length > 0) {
    cssVars.push('\n  /* Full OKLCH Color Palette */');
    for (const [colorName, colorValue] of Object.entries(colorPalette)) {
      cssVars.push(`  --${colorName}: ${colorValue};`);
    }
  }
  
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