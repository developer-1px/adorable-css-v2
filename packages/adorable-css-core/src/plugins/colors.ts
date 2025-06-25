// Advanced OKLCH Color System for AdorableCSS v2
// Integrates the Showroom color generator with scientific color theory

import type { RuleHandler, CSSRule } from '../rules/types';
import { 
  createAdvancedColorSystem, 
  generateAdvancedColorPalette,
  flattenColorPalette,
  generateColorCSS,
  applyThemeAdjustments,
  type ColorThemeOptions,
  type OKLCH
} from './advanced-colors';

// Export the advanced color system types
export type { ColorThemeOptions, OKLCH };

// Color theme configuration interface
export interface ColorTheme {
  name: string;
  options: ColorThemeOptions;
}

// Predefined themes using advanced OKLCH system
export const themes: Record<string, ColorTheme> = {
  default: {
    name: 'Default',
    options: {
      temperature: 0,
      saturation: 0,
      lightness: 0
    }
  },
  warm: {
    name: 'Warm',
    options: {
      temperature: 25,
      saturation: 5,
      lightness: 2
    }
  },
  cool: {
    name: 'Cool',
    options: {
      temperature: -25,
      saturation: 3,
      lightness: -1
    }
  },
  vibrant: {
    name: 'Vibrant',
    options: {
      temperature: 0,
      saturation: 15,
      lightness: 3
    }
  },
  muted: {
    name: 'Muted',
    options: {
      temperature: 0,
      saturation: -20,
      lightness: 0
    }
  },
  dark: {
    name: 'Dark',
    options: {
      temperature: 0,
      saturation: -10,
      lightness: -8
    }
  },
  pastel: {
    name: 'Pastel',
    options: {
      temperature: 5,
      saturation: -25,
      lightness: 8
    }
  }
};

// Current active theme and color system
let currentTheme: ColorTheme = themes.default;
let colorSystem = createAdvancedColorSystem(currentTheme.options);



// Generate color palette using the advanced system
export function generateColorPalette(): Record<string, string> {
  return colorSystem.flatPalette;
}

/**
 * Set the current theme and regenerate palette
 */
export function setTheme(themeName: string): Record<string, string> {
  if (themes[themeName]) {
    currentTheme = themes[themeName];
    colorSystem = createAdvancedColorSystem(currentTheme.options);
    colorPalette = colorSystem.flatPalette;
    
    // Update color rules
    Object.assign(colorRules, colorSystem.colorRules);
    
    return colorPalette;
  }
  return colorPalette;
}

/**
 * Get current theme
 */
export function getCurrentTheme(): ColorTheme {
  return currentTheme;
}

/**
 * Get all available themes
 */
export function getAvailableThemes(): string[] {
  return Object.keys(themes);
}

/**
 * Create a custom theme with advanced options
 */
export function createCustomTheme(name: string, options: ColorThemeOptions): void {
  themes[name] = { name, options };
}

/**
 * Create a color variant with fine-tuned adjustments
 */
export function createColorVariant(
  baseTheme: string, 
  name: string, 
  adjustments: ColorThemeOptions
): void {
  const base = themes[baseTheme];
  if (!base) return;

  themes[name] = {
    name,
    options: {
      temperature: (base.options.temperature || 0) + (adjustments.temperature || 0),
      saturation: (base.options.saturation || 0) + (adjustments.saturation || 0),
      lightness: (base.options.lightness || 0) + (adjustments.lightness || 0)
    }
  };
}

/**
 * Apply dynamic theme adjustments without creating a new theme
 */
export function adjustCurrentTheme(adjustments: ColorThemeOptions): Record<string, string> {
  const newOptions = {
    temperature: (currentTheme.options.temperature || 0) + (adjustments.temperature || 0),
    saturation: (currentTheme.options.saturation || 0) + (adjustments.saturation || 0),
    lightness: (currentTheme.options.lightness || 0) + (adjustments.lightness || 0)
  };
  
  colorSystem = createAdvancedColorSystem(newOptions);
  colorPalette = colorSystem.flatPalette;
  
  // Update color rules
  Object.assign(colorRules, colorSystem.colorRules);
  
  return colorPalette;
}

/**
 * Generate CSS variables for the current color palette
 */
export function generateColorVariables(format: 'hex' | 'oklch' = 'oklch'): string {
  return colorSystem.generateCSS(format);
}

/**
 * Get the nested color palette structure
 */
export function getNestedColorPalette(): Record<string, Record<string, string>> {
  return colorSystem.nestedPalette;
}

// Generate initial palette with advanced system
export let colorPalette = colorSystem.flatPalette;

// Enhanced color rule handlers using the advanced system
export const colorRules: Record<string, RuleHandler> = {
  // Advanced OKLCH rules from the color system
  ...colorSystem.colorRules,
  // Text color
  c: (value?: string): CSSRule => {
    if (!value) return {};
    
    // Handle gradient syntax: color1..color2/direction
    const gradientMatch = value.match(/^(.+)\.\.(.+)\/(.+)$/);
    if (gradientMatch) {
      const [, color1, color2, direction] = gradientMatch;
      
      // Get colors from palette or use as-is
      const startColor = colorPalette[color1] || color1;
      const endColor = colorPalette[color2] || color2;
      
      return { color: `linear-gradient(${direction}, ${startColor}, ${endColor})` };
    }
    
    if (colorPalette[value]) {
      return { color: colorPalette[value] };
    }
    
    // Handle opacity
    const opacityMatch = value.match(/^(.+)\/(.+)$/);
    if (opacityMatch) {
      const [, colorName, opacity] = opacityMatch;
      if (colorPalette[colorName]) {
        const baseColor = colorPalette[colorName];
        const alpha = opacity.includes('%') ? parseInt(opacity) / 100 : parseFloat(opacity);
        
        // If it's OKLCH, convert to OKLCH with alpha
        if (baseColor.startsWith('oklch')) {
          const oklchMatch = baseColor.match(/oklch\(([^)]+)\)/);
          if (oklchMatch) {
            return { color: `oklch(${oklchMatch[1]} / ${alpha})` };
          }
        }
        
        // Fallback for hex colors
        const hexFallback = colorPalette[`${colorName}-hex`];
        if (hexFallback) {
          const r = parseInt(hexFallback.slice(1, 3), 16);
          const g = parseInt(hexFallback.slice(3, 5), 16);
          const b = parseInt(hexFallback.slice(5, 7), 16);
          return { color: `rgba(${r}, ${g}, ${b}, ${alpha})` };
        }
      }
    }
    
    // Fallback to original behavior for non-palette colors
    return { color: value };
  },

  // Background color
  bg: (value?: string): CSSRule => {
    if (!value) return {};
    
    // Handle gradient syntax: color1..color2/direction
    const gradientMatch = value.match(/^(.+)\.\.(.+)\/(.+)$/);
    if (gradientMatch) {
      const [, color1, color2, direction] = gradientMatch;
      
      // Get colors from palette or use as-is
      const startColor = colorPalette[color1] || `var(--color-${color1})`;
      const endColor = colorPalette[color2] || `var(--color-${color2})`;
      
      return { background: `linear-gradient(${direction}, ${startColor}, ${endColor})` };
    }
    
    if (colorPalette[value]) {
      return { background: colorPalette[value] };
    }
    
    // Handle opacity
    const opacityMatch = value.match(/^(.+)\/(.+)$/);
    if (opacityMatch) {
      const [, colorName, opacity] = opacityMatch;
      if (colorPalette[colorName]) {
        const baseColor = colorPalette[colorName];
        const alpha = opacity.includes('%') ? parseInt(opacity) / 100 : parseFloat(opacity);
        
        // If it's OKLCH, convert to OKLCH with alpha
        if (baseColor.startsWith('oklch')) {
          const oklchMatch = baseColor.match(/oklch\(([^)]+)\)/);
          if (oklchMatch) {
            return { background: `oklch(${oklchMatch[1]} / ${alpha})` };
          }
        }
        
        // Fallback for hex colors
        const hexFallback = colorPalette[`${colorName}-hex`];
        if (hexFallback) {
          const r = parseInt(hexFallback.slice(1, 3), 16);
          const g = parseInt(hexFallback.slice(3, 5), 16);
          const b = parseInt(hexFallback.slice(5, 7), 16);
          return { background: `rgba(${r}, ${g}, ${b}, ${alpha})` };
        }
      }
    }
    
    // Fallback to original behavior
    return { background: value };
  },

  // Border color
  bc: (value?: string): CSSRule => {
    if (!value) return {};
    
    // Handle gradient syntax: color1..color2/direction
    const gradientMatch = value.match(/^(.+)\.\.(.*)\/(.+)$/);
    if (gradientMatch) {
      const [, color1, color2, direction] = gradientMatch;
      
      // Get colors from palette or use as-is
      const startColor = colorPalette[color1] || color1;
      const endColor = colorPalette[color2] || color2;
      
      return { 'border-color': `linear-gradient(${direction}, ${startColor}, ${endColor})` };
    }
    
    if (colorPalette[value]) {
      return { 'border-color': colorPalette[value] };
    }
    
    // Handle opacity
    const opacityMatch = value.match(/^(.+)\/(.+)$/);
    if (opacityMatch) {
      const [, colorName, opacity] = opacityMatch;
      if (colorPalette[colorName]) {
        const baseColor = colorPalette[colorName];
        const alpha = opacity.includes('%') ? parseInt(opacity) / 100 : parseFloat(opacity);
        
        // If it's OKLCH, convert to OKLCH with alpha
        if (baseColor.startsWith('oklch')) {
          const oklchMatch = baseColor.match(/oklch\(([^)]+)\)/);
          if (oklchMatch) {
            return { 'border-color': `oklch(${oklchMatch[1]} / ${alpha})` };
          }
        }
        
        // Fallback for hex colors
        const hexFallback = colorPalette[`${colorName}-hex`];
        if (hexFallback) {
          const r = parseInt(hexFallback.slice(1, 3), 16);
          const g = parseInt(hexFallback.slice(3, 5), 16);
          const b = parseInt(hexFallback.slice(5, 7), 16);
          return { 'border-color': `rgba(${r}, ${g}, ${b}, ${alpha})` };
        }
      }
    }
    
    return { 'border-color': value };
  },

  // Specific border colors
  btc: (value?: string): CSSRule => {
    if (!value) return {};
    
    // Handle gradient syntax: color1..color2/direction
    const gradientMatch = value.match(/^(.+)\.\.(.*)\/(.+)$/);
    if (gradientMatch) {
      const [, color1, color2, direction] = gradientMatch;
      
      // Get colors from palette or use as-is
      const startColor = colorPalette[color1] || color1;
      const endColor = colorPalette[color2] || color2;
      
      return { 'border-top-color': `linear-gradient(${direction}, ${startColor}, ${endColor})` };
    }
    
    if (colorPalette[value]) {
      return { 'border-top-color': colorPalette[value] };
    }
    
    // Handle opacity
    const opacityMatch = value.match(/^(.+)\/(.+)$/);
    if (opacityMatch) {
      const [, colorName, opacity] = opacityMatch;
      if (colorPalette[colorName]) {
        const baseColor = colorPalette[colorName];
        const alpha = opacity.includes('%') ? parseInt(opacity) / 100 : parseFloat(opacity);
        
        // If it's OKLCH, convert to OKLCH with alpha
        if (baseColor.startsWith('oklch')) {
          const oklchMatch = baseColor.match(/oklch\(([^)]+)\)/);
          if (oklchMatch) {
            return { 'border-top-color': `oklch(${oklchMatch[1]} / ${alpha})` };
          }
        }
        
        // Fallback for hex colors
        const hexFallback = colorPalette[`${colorName}-hex`];
        if (hexFallback) {
          const r = parseInt(hexFallback.slice(1, 3), 16);
          const g = parseInt(hexFallback.slice(3, 5), 16);
          const b = parseInt(hexFallback.slice(5, 7), 16);
          return { 'border-top-color': `rgba(${r}, ${g}, ${b}, ${alpha})` };
        }
      }
    }
    
    return { 'border-top-color': value };
  },

  brc: (value?: string): CSSRule => {
    if (!value) return {};
    
    // Handle gradient syntax: color1..color2/direction
    const gradientMatch = value.match(/^(.+)\.\.(.*)\/(.+)$/);
    if (gradientMatch) {
      const [, color1, color2, direction] = gradientMatch;
      
      // Get colors from palette or use as-is
      const startColor = colorPalette[color1] || color1;
      const endColor = colorPalette[color2] || color2;
      
      return { 'border-right-color': `linear-gradient(${direction}, ${startColor}, ${endColor})` };
    }
    
    if (colorPalette[value]) {
      return { 'border-right-color': colorPalette[value] };
    }
    
    // Handle opacity
    const opacityMatch = value.match(/^(.+)\/(.+)$/);
    if (opacityMatch) {
      const [, colorName, opacity] = opacityMatch;
      if (colorPalette[colorName]) {
        const baseColor = colorPalette[colorName];
        const alpha = opacity.includes('%') ? parseInt(opacity) / 100 : parseFloat(opacity);
        
        // If it's OKLCH, convert to OKLCH with alpha
        if (baseColor.startsWith('oklch')) {
          const oklchMatch = baseColor.match(/oklch\(([^)]+)\)/);
          if (oklchMatch) {
            return { 'border-right-color': `oklch(${oklchMatch[1]} / ${alpha})` };
          }
        }
        
        // Fallback for hex colors
        const hexFallback = colorPalette[`${colorName}-hex`];
        if (hexFallback) {
          const r = parseInt(hexFallback.slice(1, 3), 16);
          const g = parseInt(hexFallback.slice(3, 5), 16);
          const b = parseInt(hexFallback.slice(5, 7), 16);
          return { 'border-right-color': `rgba(${r}, ${g}, ${b}, ${alpha})` };
        }
      }
    }
    
    return { 'border-right-color': value };
  },

  bbc: (value?: string): CSSRule => {
    if (!value) return {};
    
    // Handle gradient syntax: color1..color2/direction
    const gradientMatch = value.match(/^(.+)\.\.(.*)\/(.+)$/);
    if (gradientMatch) {
      const [, color1, color2, direction] = gradientMatch;
      
      // Get colors from palette or use as-is
      const startColor = colorPalette[color1] || color1;
      const endColor = colorPalette[color2] || color2;
      
      return { 'border-bottom-color': `linear-gradient(${direction}, ${startColor}, ${endColor})` };
    }
    
    if (colorPalette[value]) {
      return { 'border-bottom-color': colorPalette[value] };
    }
    
    // Handle opacity
    const opacityMatch = value.match(/^(.+)\/(.+)$/);
    if (opacityMatch) {
      const [, colorName, opacity] = opacityMatch;
      if (colorPalette[colorName]) {
        const baseColor = colorPalette[colorName];
        const alpha = opacity.includes('%') ? parseInt(opacity) / 100 : parseFloat(opacity);
        
        // If it's OKLCH, convert to OKLCH with alpha
        if (baseColor.startsWith('oklch')) {
          const oklchMatch = baseColor.match(/oklch\(([^)]+)\)/);
          if (oklchMatch) {
            return { 'border-bottom-color': `oklch(${oklchMatch[1]} / ${alpha})` };
          }
        }
        
        // Fallback for hex colors
        const hexFallback = colorPalette[`${colorName}-hex`];
        if (hexFallback) {
          const r = parseInt(hexFallback.slice(1, 3), 16);
          const g = parseInt(hexFallback.slice(3, 5), 16);
          const b = parseInt(hexFallback.slice(5, 7), 16);
          return { 'border-bottom-color': `rgba(${r}, ${g}, ${b}, ${alpha})` };
        }
      }
    }
    
    return { 'border-bottom-color': value };
  },

  blc: (value?: string): CSSRule => {
    if (!value) return {};
    
    // Handle gradient syntax: color1..color2/direction
    const gradientMatch = value.match(/^(.+)\.\.(.*)\/(.+)$/);
    if (gradientMatch) {
      const [, color1, color2, direction] = gradientMatch;
      
      // Get colors from palette or use as-is
      const startColor = colorPalette[color1] || color1;
      const endColor = colorPalette[color2] || color2;
      
      return { 'border-left-color': `linear-gradient(${direction}, ${startColor}, ${endColor})` };
    }
    
    if (colorPalette[value]) {
      return { 'border-left-color': colorPalette[value] };
    }
    
    // Handle opacity
    const opacityMatch = value.match(/^(.+)\/(.+)$/);
    if (opacityMatch) {
      const [, colorName, opacity] = opacityMatch;
      if (colorPalette[colorName]) {
        const baseColor = colorPalette[colorName];
        const alpha = opacity.includes('%') ? parseInt(opacity) / 100 : parseFloat(opacity);
        
        // If it's OKLCH, convert to OKLCH with alpha
        if (baseColor.startsWith('oklch')) {
          const oklchMatch = baseColor.match(/oklch\(([^)]+)\)/);
          if (oklchMatch) {
            return { 'border-left-color': `oklch(${oklchMatch[1]} / ${alpha})` };
          }
        }
        
        // Fallback for hex colors
        const hexFallback = colorPalette[`${colorName}-hex`];
        if (hexFallback) {
          const r = parseInt(hexFallback.slice(1, 3), 16);
          const g = parseInt(hexFallback.slice(3, 5), 16);
          const b = parseInt(hexFallback.slice(5, 7), 16);
          return { 'border-left-color': `rgba(${r}, ${g}, ${b}, ${alpha})` };
        }
      }
    }
    
    return { 'border-left-color': value };
  },
};

// Enhanced plugin export with advanced features
export const colorsPlugin = {
  rules: colorRules,
  palette: colorPalette,
  nestedPalette: colorSystem.nestedPalette,
  themes,
  setTheme,
  getCurrentTheme,
  getAvailableThemes,
  createCustomTheme,
  createColorVariant,
  adjustCurrentTheme,
  generateColorVariables,
  getNestedColorPalette,
  
  // Advanced utilities
  applyThemeAdjustments,
  generateAdvancedColorPalette,
  flattenColorPalette,
  generateColorCSS
};

export default colorsPlugin;