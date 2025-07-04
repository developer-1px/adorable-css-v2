// Advanced OKLCH Color System for AdorableCSS v2
// Integrates the Showroom color generator with scientific color theory

import type { RuleHandler, CSSRule } from '../../rules/types';
import { makeColor, getActualColorValue } from '../../core/values/makeValue';
import { 
  createAdvancedColorSystem, 
  generateAdvancedColorPalette,
  flattenColorPalette,
  generateColorCSS,
  applyThemeAdjustments,
  type ColorThemeOptions,
  type OKLCH
} from './advanced-colors';
import { setColorPalette, buildSemanticColors, semanticColors, type SemanticColorConfig } from '../tokens/index';

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
let currentSemanticConfig: SemanticColorConfig = semanticColors;

// Generate color palette using the advanced system
export function generateColorPalette(): Record<string, string> {
  // Get base palette
  const basePalette = colorSystem.flatPalette;
  
  // Update token system with palette
  setColorPalette(basePalette);
  
  // Build semantic colors
  const semanticPalette = buildSemanticColors(currentSemanticConfig);
  
  // Merge palettes
  return {
    ...basePalette,
    ...semanticPalette
  };
}

/**
 * Set the current theme and regenerate palette
 */
export function setTheme(themeName: string): Record<string, string> {
  if (themes[themeName]) {
    currentTheme = themes[themeName];
    colorSystem = createAdvancedColorSystem(currentTheme.options);
    
    // Regenerate palette with semantic colors
    colorPalette = generateColorPalette();
    
    // Update color rules
    Object.assign(colorRules, colorSystem.colorRules);
    
    return colorPalette;
  }
  return colorPalette;
}

/**
 * Configure semantic colors
 */
export function configureSemanticColors(config: SemanticColorConfig): Record<string, string> {
  currentSemanticConfig = { ...semanticColors, ...config };
  colorPalette = generateColorPalette();
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

// Generate initial palette with advanced system and ensure token system is updated
export let colorPalette = generateColorPalette();

// Enhanced color rule handlers using the advanced system
export const colorRules: Record<string, RuleHandler> = {
  // Advanced OKLCH rules from the color system
  ...colorSystem.colorRules,
  // Text color
  c: (value?: string): CSSRule => {
    if (!value) return {};
    
    if (value === "current") return { color: "currentColor" };
    
    // Handle special brand gradient for text
    if (value === 'brand' || value === 'gradient-brand') {
      return {
        background: colorPalette['brand-gradient-text'] || colorPalette['brand-gradient'] || 'var(--brand-gradient)',
        "-webkit-background-clip": "text",
        "background-clip": "text", 
        "-webkit-text-fill-color": "transparent",
      };
    }

    // c(135deg/color1..color2..color3) - full gradient syntax matching bg() utility  
    if (value.includes('/') && value.includes('..')) {
      const [angleOrDirection, colors] = value.split('/');
      
      // Handle direction/angle (do NOT apply makeColor to this part!)
      let gradientDirection = '90deg';
      let isRadial = false;
      
      if (angleOrDirection) {
        if (angleOrDirection.includes('deg')) {
          gradientDirection = angleOrDirection;
        } else if (angleOrDirection.startsWith('radial')) {
          isRadial = true;
          // Extract radial direction if specified
          if (angleOrDirection === 'radial-gradient') {
            gradientDirection = 'circle';
          } else {
            gradientDirection = angleOrDirection.replace('radial-gradient/', '').replace('radial/', '') || 'circle';
          }
        } else if (['to-r', 'to-l', 'to-t', 'to-b', 'to-tr', 'to-tl', 'to-br', 'to-bl', 'to-right', 'to-left', 'to-top', 'to-bottom', 'to-top-right', 'to-top-left', 'to-bottom-right', 'to-bottom-left'].includes(angleOrDirection)) {
          const directionMap: Record<string, string> = {
            'to-r': 'to right',
            'to-l': 'to left', 
            'to-t': 'to top',
            'to-b': 'to bottom',
            'to-tr': 'to top right',
            'to-tl': 'to top left',
            'to-br': 'to bottom right',
            'to-bl': 'to bottom left',
            // Legacy support
            'to-right': 'to right',
            'to-left': 'to left',
            'to-top': 'to top',
            'to-bottom': 'to bottom',
            'to-top-right': 'to top right',
            'to-top-left': 'to top left',
            'to-bottom-right': 'to bottom right',
            'to-bottom-left': 'to bottom left'
          };
          gradientDirection = directionMap[angleOrDirection] || '90deg';
        } else if (!isNaN(Number(angleOrDirection))) {
          gradientDirection = angleOrDirection + 'deg';
        }
      }

      // Process ONLY colors with .. separator (AdorableCSS v2 spec)
      const colorList = colors ? colors.split('..').map(color => {
        const trimmedColor = color.trim();
        // Use actual color values for gradients instead of CSS variables
        return getActualColorValue(trimmedColor);
      }).join(', ') : '';
      
      // Return appropriate gradient type for text
      const gradientType = isRadial ? 'radial-gradient' : 'linear-gradient';
      
      return {
        background: `${gradientType}(${gradientDirection}, ${colorList})`,
        "-webkit-background-clip": "text",
        "background-clip": "text", 
        "-webkit-text-fill-color": "transparent",
      };
    }

    // c(red..blue) - simple text gradient with .. syntax  
    if (value.includes('..')) {
      const [start, end] = value.split('..');
      // Use actual color values for gradients instead of CSS variables
      const startColor = getActualColorValue(start);
      const endColor = getActualColorValue(end);
      return {
        background: `linear-gradient(90deg, ${startColor}, ${endColor})`,
        "-webkit-background-clip": "text",
        "background-clip": "text", 
        "-webkit-text-fill-color": "transparent",
      };
    }

    if (
      value.startsWith("linear-gradient") ||
      value.startsWith("radial-gradient")
    ) {
      return {
        background: value.replace(/\//g, " "),
        "-webkit-background-clip": "text",
        "-webkit-text-fill-color": "transparent",
      };
    }
    
    // Check colorPalette first
    if (colorPalette[value]) {
      return { color: colorPalette[value] };
    }
    
    // Handle all colors including opacity syntax (white.8, black.2) with makeColor
    const processedColor = makeColor(value);
    return { color: processedColor };
  },

  // Background color
  bg: (value?: string): CSSRule => {
    if (!value) return {};
    
    // Handle special brand gradient
    if (value === 'brand' || value === 'gradient-brand') {
      return { background: colorPalette['brand-gradient'] || 'var(--brand-gradient)' };
    }
    
    // Handle gradient syntax - direction first: 135deg/purple-500..pink-500
    if (value.includes('..')) {
      let colors: string[] = [];
      let direction = '135deg'; // default direction
      let isRadial = false;
      
      // Check if there's a direction specified with /
      if (value.includes('/')) {
        const parts = value.split('/');
        
        // Check if first part is direction (contains deg, keyword, or radial)
        if (parts[0].includes('deg') || parts[0].startsWith('to-') || parts[0].startsWith('radial')) {
          direction = parts[0];
          colors = parts[1].split('..');
          
          // Check if it's radial gradient
          if (parts[0].startsWith('radial')) {
            isRadial = true;
            // Extract radial direction if specified
            if (parts[0] === 'radial-gradient') {
              direction = 'circle';
            } else {
              direction = parts[0].replace('radial-gradient/', '').replace('radial/', '');
            }
          }
        } else {
          // Old format: colors/direction
          colors = parts[0].split('..');
          direction = parts[1];
          
          if (direction.startsWith('radial')) {
            isRadial = true;
            direction = direction.replace('radial-gradient/', '').replace('radial/', '') || 'circle';
          }
        }
        
        // Convert direction keywords to degrees (for linear gradients only)
        if (!isRadial) {
          const directionMap: Record<string, string> = {
            'to-t': 'to top',
            'to-r': 'to right', 
            'to-b': 'to bottom',
            'to-l': 'to left',
            'to-tr': 'to top right',
            'to-tl': 'to top left',
            'to-br': 'to bottom right',
            'to-bl': 'to bottom left',
            // Legacy support
            'to-top': 'to top',
            'to-right': 'to right',
            'to-bottom': 'to bottom',
            'to-left': 'to left',
            'to-top-right': 'to top right',
            'to-top-left': 'to top left',
            'to-bottom-right': 'to bottom right',
            'to-bottom-left': 'to bottom left'
          };
          
          direction = directionMap[direction] || direction;
        }
      } else {
        colors = value.split('..');
      }
      
      // Build the gradient string
      const colorStops = colors.map(color => {
        // Use actual color values for gradients instead of CSS variables
        return getActualColorValue(color.trim());
      }).join(', ');
      
      // Return appropriate gradient type
      if (isRadial) {
        return { background: `radial-gradient(${direction}, ${colorStops})` };
      } else {
        return { background: `linear-gradient(${direction}, ${colorStops})` };
      }
    }
    
    // Handle colors with opacity using dot notation (white.5, black.2)
    if (value.includes('.')) {
      const processedColor = makeColor(value);
      return { background: processedColor };
    }
    
    if (colorPalette[value]) {
      return { background: colorPalette[value] };
    }
    
    // Handle opacity with slash syntax (deprecated)
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
    
    // Fallback to makeColor for basic colors
    const processedColor = makeColor(value);
    return { background: processedColor };
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
  configureSemanticColors,
  
  // Advanced utilities
  applyThemeAdjustments,
  generateAdvancedColorPalette,
  flattenColorPalette,
  generateColorCSS
};

export default colorsPlugin;