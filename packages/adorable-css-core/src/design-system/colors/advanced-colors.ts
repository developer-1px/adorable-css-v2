// Advanced OKLCH Color System - Based on the Showroom implementation
// Provides scientific color generation with theme adjustments

import type { CSSRule, RuleHandler } from '../../rules/types';

// OKLCH Color Space
export interface OKLCH {
  l: number; // Lightness (0-1)
  c: number; // Chroma (0-0.37)
  h: number; // Hue (0-360)
}

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorThemeOptions {
  temperature?: number; // -100 to 100 (cool to warm)
  saturation?: number;  // -50 to 50
  lightness?: number;   // -20 to 20
}

// Precise OKLCH conversion functions
function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1/2.4) - 0.055;
}

function rgbToOklab(r: number, g: number, b: number): { l: number; a: number; b: number } {
  // Normalize to 0-1
  r = r / 255;
  g = g / 255;
  b = b / 255;
  
  // Convert to linear RGB
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  
  // Convert to OKLab
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
  
  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);
  
  return {
    l: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
  };
}

function oklabToRgb(l: number, a: number, b: number): RGB {
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;
  
  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;
  
  const lr = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const lg = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const lb = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;
  
  // Convert to sRGB
  const sr = linearToSrgb(lr);
  const sg = linearToSrgb(lg);
  const sb = linearToSrgb(lb);
  
  return {
    r: Math.max(0, Math.min(255, Math.round(sr * 255))),
    g: Math.max(0, Math.min(255, Math.round(sg * 255))),
    b: Math.max(0, Math.min(255, Math.round(sb * 255)))
  };
}

function oklabToOklch(l: number, a: number, b: number): OKLCH {
  const c = Math.sqrt(a * a + b * b);
  let h = Math.atan2(b, a) * (180 / Math.PI);
  if (h < 0) h += 360;
  
  return { l, c, h };
}

function oklchToOklab(l: number, c: number, h: number): { l: number; a: number; b: number } {
  const hRad = h * (Math.PI / 180);
  return {
    l,
    a: c * Math.cos(hRad),
    b: c * Math.sin(hRad)
  };
}

export function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function hexToOklch(hex: string): OKLCH | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  
  const oklab = rgbToOklab(rgb.r, rgb.g, rgb.b);
  return oklabToOklch(oklab.l, oklab.a, oklab.b);
}

export function oklchToHex(l: number, c: number, h: number): string {
  const oklab = oklchToOklab(l, c, h);
  const rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

export function oklchToString(oklch: OKLCH): string {
  const l = (oklch.l * 100).toFixed(1);
  const c = oklch.c.toFixed(3);
  const h = oklch.h.toFixed(1);
  return `oklch(${l}% ${c} ${h})`;
}

// Base colors - scientifically selected for optimal perception
const tailwindColors = {
  red: '#ef4444',
  orange: '#f97316',
  amber: '#f59e0b',
  yellow: '#eab308',
  lime: '#84cc16',
  green: '#22c55e',
  emerald: '#10b981',
  teal: '#14b8a6',
  cyan: '#06b6d4',
  sky: '#0ea5e9',
  blue: '#3b82f6',
  indigo: '#6366f1',
  violet: '#8b5cf6',
  purple: '#a855f7',
  fuchsia: '#d946ef',
  pink: '#ec4899',
  rose: '#f43f5e',
  slate: '#64748b',
  gray: '#6b7280',
  zinc: '#71717a',
  neutral: '#737373',
  stone: '#78716c'
};

// Apply theme adjustments to a color
export function applyThemeAdjustments(
  hex: string, 
  options: ColorThemeOptions = {}
): string {
  const { temperature = 0, saturation = 0, lightness = 0 } = options;
  
  if (temperature === 0 && saturation === 0 && lightness === 0) {
    return hex;
  }
  
  const oklch = hexToOklch(hex);
  if (!oklch) return hex;
  
  // Adjust hue for color temperature (cool/warm)
  let newH = oklch.h + (temperature * 0.3); // Subtle hue shift
  if (newH < 0) newH += 360;
  if (newH > 360) newH -= 360;
  
  // Adjust chroma (saturation)
  let newC = oklch.c * (1 + saturation / 100);
  newC = Math.max(0, Math.min(0.37, newC));
  
  // Adjust lightness
  let newL = oklch.l + (lightness / 100);
  newL = Math.max(0, Math.min(1, newL));
  
  return oklchToHex(newL, newC, newH);
}

// Generate OKLCH tone map with perceptually balanced lightness
export function generateOklchToneMap(baseHex: string): Record<string, string> {
  const baseOklch = hexToOklch(baseHex);
  if (!baseOklch) return {};
  
  // Perceptually balanced tone map
  const tones = {
    50: { l: 0.97, cFactor: 0.15 },   // Very light, almost white
    100: { l: 0.93, cFactor: 0.35 },  // Light pastel
    200: { l: 0.87, cFactor: 0.55 },  // Soft pastel
    300: { l: 0.78, cFactor: 0.75 },  // Light
    400: { l: 0.68, cFactor: 0.90 },  // Medium light
    500: { l: baseOklch.l, cFactor: 1 }, // Original color
    600: { l: Math.max(0.45, baseOklch.l - 0.12), cFactor: 0.95 },
    700: { l: Math.max(0.38, baseOklch.l - 0.22), cFactor: 0.85 },
    800: { l: Math.max(0.30, baseOklch.l - 0.32), cFactor: 0.75 },
    900: { l: Math.max(0.22, baseOklch.l - 0.42), cFactor: 0.65 }
  };
  
  const shades: Record<string, string> = {};
  
  Object.entries(tones).forEach(([shade, config]) => {
    if (shade === '500') {
      shades[shade] = baseHex;
    } else {
      // Adjust chroma based on lightness to avoid oversaturation
      const targetChroma = baseOklch.c * config.cFactor;
      
      // Dynamic max chroma based on lightness
      let maxChroma = 0.37;
      if (config.l > 0.8) {
        maxChroma = 0.15; // Very light colors need low chroma
      } else if (config.l > 0.6) {
        maxChroma = 0.25; // Light colors
      } else if (config.l < 0.3) {
        maxChroma = 0.20; // Very dark colors need low chroma
      }
      
      const finalChroma = Math.min(targetChroma, maxChroma);
      shades[shade] = oklchToHex(config.l, finalChroma, baseOklch.h);
    }
  });
  
  return shades;
}

// Generate complete color palette with theme adjustments
export function generateAdvancedColorPalette(
  themeOptions: ColorThemeOptions = {}
): Record<string, Record<string, string>> {
  const palette: Record<string, Record<string, string>> = {};
  
  Object.entries(tailwindColors).forEach(([colorName, baseHex]) => {
    // Apply theme adjustments to base color
    const adjustedBase = applyThemeAdjustments(baseHex, themeOptions);
    
    // Generate tone map
    palette[colorName] = generateOklchToneMap(adjustedBase);
  });
  
  return palette;
}

// Flatten palette for legacy compatibility
export function flattenColorPalette(
  palette: Record<string, Record<string, string>>
): Record<string, string> {
  const flattened: Record<string, string> = {};
  
  Object.entries(palette).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, color]) => {
      flattened[`${colorName}-${shade}`] = color;
    });
  });
  
  // Add base semantic colors
  flattened.white = '#ffffff';
  flattened.black = '#000000';
  flattened.transparent = 'transparent';
  flattened.current = 'currentColor';
  
  return flattened;
}

// CSS generation utilities
export function generateColorCSS(
  palette: Record<string, Record<string, string>>,
  format: 'hex' | 'oklch' = 'oklch'
): string {
  const cssVars: string[] = [];
  
  Object.entries(palette).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, color]) => {
      if (format === 'oklch') {
        const oklch = hexToOklch(color);
        if (oklch) {
          cssVars.push(`  --${colorName}-${shade}: ${oklchToString(oklch)};`);
        } else {
          cssVars.push(`  --${colorName}-${shade}: ${color};`);
        }
      } else {
        cssVars.push(`  --${colorName}-${shade}: ${color};`);
      }
    });
  });
  
  return `:root {\n${cssVars.join('\n')}\n}`;
}

// Advanced color utilities for CSS rules
export function createAdvancedColorRules(
  palette: Record<string, string>
): Record<string, RuleHandler> {
  const rules: Record<string, RuleHandler> = {};
  
  // Note: Direct color name rules removed - AdorableCSS v2 uses function syntax
  // Instead of 'amber-100' → use c(amber-100)
  // Instead of 'bg-blue-500' → use bg(blue-500)  
  // Instead of 'border-gray-200' → use border(gray-200)
  // The color palette is still available to c(), bg(), and border() handlers
  
  // Dynamic OKLCH color rule
  rules['oklch'] = (args?: string): CSSRule => {
    if (!args) return {};
    
    // Parse OKLCH values: oklch(70/0.15/180) or oklch(70%/0.15/180deg)
    const match = args.match(/([0-9.]+)%?\s*[\/,]\s*([0-9.]+)\s*[\/,]\s*([0-9.]+)/);
    if (!match) return {};
    
    const l = parseFloat(match[1]) / 100;
    const c = parseFloat(match[2]);
    const h = parseFloat(match[3]);
    
    return {
      color: oklchToString({ l, c, h })
    };
  };
  
  return rules;
}

// Create color system instance
export function createAdvancedColorSystem(themeOptions: ColorThemeOptions = {}) {
  const nestedPalette = generateAdvancedColorPalette(themeOptions);
  const flatPalette = flattenColorPalette(nestedPalette);
  const colorRules = createAdvancedColorRules(flatPalette);
  
  return {
    nestedPalette,
    flatPalette,
    colorRules,
    generateCSS: (format: 'hex' | 'oklch' = 'oklch') => 
      generateColorCSS(nestedPalette, format),
    updateTheme: (newOptions: ColorThemeOptions) => 
      createAdvancedColorSystem(newOptions)
  };
}

// Default export
export const advancedColorSystem = createAdvancedColorSystem();
export default advancedColorSystem;