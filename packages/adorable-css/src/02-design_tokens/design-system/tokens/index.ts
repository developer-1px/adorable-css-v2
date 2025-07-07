// Modern Design Token System for AdorableCSS v2

// Re-export semantic design system (still needed for colors)
export * from '../semantic-system';

import { 
  generateSemanticColorVariables, 
  getColorScheme,
  type SemanticColorSystemConfig 
} from '../colors/semantic-color-system';
import { 
  generateSpacingCalc, 
  generateFontCalc, 
  generateSizeCalc, 
  generateContainerCalc 
} from '../../dynamicTokens';

// Semantic color configuration
export interface SemanticColorConfig {
  primary?: string;      // e.g. "blue-500" or "#0ea5e9"
  secondary?: string;    // e.g. "gray-500"
  accent?: string;       // e.g. "sky-500"
  mute?: string;         // e.g. "gray-400"
  surface?: string;      // e.g. "gray-100"
  brand?: string;        // e.g. "#8b5cf6..#ec4899" for gradient
  success?: string;      // e.g. "green-500"
  warning?: string;      // e.g. "amber-500"
  error?: string;        // e.g. "red-500"
  info?: string;         // e.g. "cyan-500"
}

// Default semantic color mapping using AdorableCSS syntax
// Modern, sophisticated color palette inspired by top design systems
export const semanticColors: SemanticColorConfig = {
  primary: "indigo-600",     // Primary brand color - unified indigo
  secondary: "slate-600",    // Secondary - sophisticated slate  
  accent: "violet-500",      // Accent color - complementary violet
  mute: "gray-500",          // Muted elements - neutral gray
  surface: "gray-100",       // Surface colors - light gray
  brand: "indigo-600..violet-500",  // Brand gradient - indigo to violet
  success: "emerald-600",    // Success states - emerald green
  warning: "amber-500",      // Warning states - warm amber
  error: "red-600",          // Error states - clear red
  info: "sky-500"            // Info states - sky blue
};

// NOTE: Legacy hierarchy scales removed - use dynamic calc() system instead
// Example: fonr(lg), gap(xl), text(2xl), etc.

// Simplified DesignTokens interface for dynamic calc() system
export interface DesignTokens {
  // Dynamic 02-design_tokens are now calculated at runtime
  // No need to pre-generate scale-based 02-design_tokens
  
  colors: {
    // Core semantic colors
    primary: string;
    secondary: string;
    accent: string;
    mute: string;
    surface: string;
    brand: string;
    'brand-start': string;
    'brand-end': string;
    success: string;
    warning: string;
    error: string;
    info: string;
    white: string;
    black: string;
  };
  // Keep some common static 02-design_tokens to prevent errors
  fontWeight?: Record<string, string>;
  lineHeight?: Record<string, string>;
  letterSpacing?: Record<string, string>;
  radius?: Record<string, string>;
  shadow?: Record<string, string>;
  opacity?: Record<string, string>;
  zIndex?: Record<string, string>;
  duration?: Record<string, string>;
  ease?: Record<string, string>;
}

// Create 02-design_tokens - simplified for dynamic calc() system
export function createTokens(): DesignTokens {
  return {
    colors: {
      primary: '',
      secondary: '',
      accent: '',
      mute: '',
      surface: '',
      brand: '',
      'brand-start': '',
      'brand-end': '',
      success: '',
      warning: '',
      error: '',
      info: '',
      white: '#ffffff',
      black: '#000000',
    },
    // Static 02-design_tokens to prevent breaking changes
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
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
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
    radius: {
      none: '0',
      xs: '0.125rem',
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '3rem',
      full: '9999px',
    },
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
  };
}

// Modern token values based on industry best practices
export const defaultTokens: DesignTokens = createTokens();

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
      // Extract the base color name (e.g., "purple" from "purple-500" or "violet" from "violet-500")
      const colorMatch = value.match(/^(\w+)-(\d+)$/);
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
// Current token context for 03-rules to use
let currentTokenContext: DesignTokens = defaultTokens;

export function setTokenContext(tokens: DesignTokens): void {
  currentTokenContext = tokens;
}

export function isToken(value: string, category: string): boolean {
  // For dynamic scale-based 02-design_tokens, check if they match valid patterns
  if (category === 'font' || category === 'spacing' || category === 'size' || category === 'container') {
    // Check for xl pattern (2xl, 3xl, 10xl, 15xl, etc.)
    if (value.match(/^\d+xl$/)) {
      return true;
    }
    
    // Check for basic size 02-design_tokens (xs, sm, md, lg, xl)
    if (['4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl'].includes(value)) {
      return true;
    }
  }
  
  // For colors, check if it's in our semantic colors or looks like a color token
  if (category === 'color' || category === 'colors') {
    return value in currentTokenContext.colors || 
           colorPalette[value] !== undefined ||
           value.match(/^\w+-\d+$/) !== null; // e.g. blue-500
  }
  
  // For static 02-design_tokens, check if they exist in the token context
  if (category === 'fontWeight' || category === 'lineHeight' || category === 'letterSpacing' || 
      category === 'radius' || category === 'shadow' || category === 'opacity' || 
      category === 'zIndex' || category === 'duration' || category === 'ease') {
    const tokens = currentTokenContext[category];
    return !!(tokens && typeof tokens === 'object' && value in tokens);
  }
  
  return false;
}

// Get CSS variable name for token
export function getTokenVar(category: string, token: string): string {
  // For dynamic 02-design_tokens, use the generator functions
  if (category === 'spacing') {
    return generateSpacingCalc(token);
  }
  if (category === 'font') {
    return generateFontCalc(token);
  }
  if (category === 'size') {
    return generateSizeCalc(token);
  }
  if (category === 'container') {
    return generateContainerCalc(token);
  }
  
  // For colors, use CSS variable reference
  if (category === 'colors') {
    return `var(--${token})`;
  }
  
  // For static 02-design_tokens, get the actual value instead of CSS variable
  if (category === 'fontWeight' || category === 'lineHeight' || category === 'letterSpacing' || 
      category === 'radius' || category === 'shadow' || category === 'opacity' || 
      category === 'zIndex' || category === 'duration' || category === 'ease') {
    const tokens = currentTokenContext[category];
    if (tokens && typeof tokens === 'object' && token in tokens) {
      return (tokens as any)[token];
    }
  }
  
  // For other values, return CSS variable
  return `var(--${category}-${token})`;
}

// Generate CSS variables from 02-design_tokens
export function generateTokenCSS(_tokens: DesignTokens = defaultTokens): string {
  const cssVars: string[] = [];
  
  // Don't generate any static token CSS variables anymore
  // Everything should be dynamic calc() or actual values
  
  // Add full color palette as CSS variables (gray-100, purple-500, etc.)
  if (colorPalette && Object.keys(colorPalette).length > 0) {
    cssVars.push('\n  /* Full OKLCH Color Palette */');
    for (const [colorName, colorValue] of Object.entries(colorPalette)) {
      cssVars.push(`  --${colorName}: ${colorValue};`);
    }
  }
  
  // Add semantic color variations if they're not already in the palette
  const semanticColorVariations = buildSemanticColors(semanticColors);
  if (semanticColorVariations && Object.keys(semanticColorVariations).length > 0) {
    cssVars.push('\n  /* Semantic Color Variations */');
    for (const [colorName, colorValue] of Object.entries(semanticColorVariations)) {
      // Only add if not already in colorPalette to avoid duplicates
      if (!colorPalette[colorName] && colorValue) {
        cssVars.push(`  --${colorName}: ${colorValue};`);
      }
    }
  }
  
  // Generate semantic color mappings using the dynamic system
  const semanticColorConfig: SemanticColorSystemConfig = getColorScheme('default');
  const semanticColorVars = generateSemanticColorVariables(semanticColorConfig);
  
  const semanticMappings = `
  /* Semantic Color System */
${semanticColorVars}`;
  
  // No more static token variables - everything is dynamic calc()
  // Just return color variables and semantic mappings
  return `:root {\n${cssVars.join('\n')}\n${semanticMappings}\n}`;
}
