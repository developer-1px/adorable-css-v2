// OKLCH Color System for AdorableCSS v2
// Compact version without circular dependencies

import { 
  createAdvancedColorSystem, 
  type ColorThemeOptions,
  type OKLCH
} from './advanced-colors';
import { setColorPalette, buildSemanticColors, semanticColors, type SemanticColorConfig } from '../tokens/index';

export type { ColorThemeOptions, OKLCH };

// Theme configuration
export interface ColorTheme {
  name: string;
  options: ColorThemeOptions;
}

// Predefined themes
export const themes: Record<string, ColorTheme> = {
  default: { name: 'Default', options: { temperature: 0, saturation: 0, lightness: 0 } },
  warm: { name: 'Warm', options: { temperature: 25, saturation: 5, lightness: 2 } },
  cool: { name: 'Cool', options: { temperature: -25, saturation: 3, lightness: -1 } },
  vibrant: { name: 'Vibrant', options: { temperature: 0, saturation: 15, lightness: 3 } },
  muted: { name: 'Muted', options: { temperature: 0, saturation: -20, lightness: 0 } },
  dark: { name: 'Dark', options: { temperature: 0, saturation: -10, lightness: -8 } },
  pastel: { name: 'Pastel', options: { temperature: 5, saturation: -25, lightness: 8 } }
};

// Current state
let currentTheme: ColorTheme = themes.default;
let colorSystem = createAdvancedColorSystem(currentTheme.options);
let currentSemanticConfig: SemanticColorConfig = semanticColors;

// Generate color palette
export function generateColorPalette(): Record<string, string> {
  const basePalette = colorSystem.flatPalette;
  setColorPalette(basePalette);
  const semanticPalette = buildSemanticColors(currentSemanticConfig);
  return { ...basePalette, ...semanticPalette };
}

// Theme management
export function setTheme(themeName: string): Record<string, string> {
  if (themes[themeName]) {
    currentTheme = themes[themeName];
    colorSystem = createAdvancedColorSystem(currentTheme.options);
    colorPalette = generateColorPalette();
    return colorPalette;
  }
  return colorPalette;
}

export function configureSemanticColors(config: SemanticColorConfig): Record<string, string> {
  currentSemanticConfig = { ...semanticColors, ...config };
  colorPalette = generateColorPalette();
  return colorPalette;
}

export function getCurrentTheme(): ColorTheme {
  return currentTheme;
}

export function getAvailableThemes(): string[] {
  return Object.keys(themes);
}

// Generate initial palette
export let colorPalette = generateColorPalette();

/**
 * Get actual color value for gradients (no CSS variables)
 * This version can access the dynamic colorPalette
 */
export function getActualColorValue(colorName: string): string {
  // Check dynamic palette first
  if (colorPalette[colorName]) {
    return colorPalette[colorName];
  }
  
  // Fallback to CSS variable
  return `var(--${colorName}, ${colorName})`;
}

// Enhanced plugin export
export const colorsPlugin = {
  palette: colorPalette,
  themes,
  setTheme,
  getCurrentTheme,
  getAvailableThemes,
  configureSemanticColors,
  getActualColorValue
};