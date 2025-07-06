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
} from '../../core/values/dynamicTokens';

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
// Example: text(lg), gap(xl), font(2xl), etc.

// Simplified DesignTokens interface for dynamic calc() system
export interface DesignTokens {
  // Dynamic tokens are now calculated at runtime
  // No need to pre-generate scale-based tokens
  
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
}

// Create tokens - simplified for dynamic calc() system
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
// Current token context for rules to use
let currentTokenContext: DesignTokens = defaultTokens;

export function setTokenContext(tokens: DesignTokens): void {
  currentTokenContext = tokens;
}

export function isToken(value: string, category: string): boolean {
  // For dynamic scale-based tokens, check if they match valid patterns
  if (category === 'font' || category === 'spacing' || category === 'size' || category === 'container') {
    // Check for xl pattern (2xl, 3xl, 10xl, 15xl, etc.)
    if (value.match(/^\d+xl$/)) {
      return true;
    }
    
    // Check for basic size tokens (xs, sm, md, lg, xl)
    if (['4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl'].includes(value)) {
      return true;
    }
  }
  
  // For colors, check if it's in our semantic colors or looks like a color token
  if (category === 'colors') {
    return value in currentTokenContext.colors || 
           colorPalette[value] !== undefined ||
           value.match(/^\w+-\d+$/) !== null; // e.g. blue-500
  }
  
  return false;
}

// Get CSS variable name for token
export function getTokenVar(category: string, token: string): string {
  // For dynamic tokens, use the generator functions
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
  
  // For other static values, return CSS variable
  return `var(--${category}-${token})`;
}

// Generate CSS variables from tokens
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