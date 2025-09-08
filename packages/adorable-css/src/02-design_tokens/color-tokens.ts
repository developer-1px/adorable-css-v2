/**
 * OKLCH Color Token System with Shade Support
 * Format: color-shade (e.g. red-500, blue-100, gray-900)
 */

// Base OKLCH color definitions (color-500 as base) - Adjusted for brighter palette
export const OKLCH_BASE_COLORS = {
  // Reds
  'red': 'oklch(68% 0.22 27.41)',
  'rose': 'oklch(70% 0.17 3.48)',
  'pink': 'oklch(71% 0.17 353.16)',
  
  // Oranges  
  'orange': 'oklch(76% 0.14 70.67)',
  'amber': 'oklch(82% 0.12 89.65)',
  'yellow': 'oklch(88% 0.12 102.21)',
  
  // Greens
  'lime': 'oklch(83% 0.13 120.75)',
  'green': 'oklch(70% 0.12 142.5)',
  'emerald': 'oklch(74% 0.13 162.48)',
  'teal': 'oklch(75% 0.10 180.08)',
  'cyan': 'oklch(80% 0.11 191.75)',
  
  // Blues
  'sky': 'oklch(77% 0.11 230.31)',
  'blue': 'oklch(72% 0.17 255.85)',
  'indigo': 'oklch(60% 0.19 271.71)',
  'violet': 'oklch(66% 0.20 296.85)',
  'purple': 'oklch(64% 0.18 309.7)',
  'fuchsia': 'oklch(70% 0.24 328.36)',
  
  // Neutrals
  'slate': 'oklch(58% 0.0133 247.86)',
  'gray': 'oklch(60% 0 0)',
  'zinc': 'oklch(58% 0.0043 247.86)',
  'neutral': 'oklch(60% 0 0)',
  'stone': 'oklch(58% 0.0087 56.29)',
} as const;

// Shade variations (lightness adjustments) - Brighter palette
export const SHADE_LIGHTNESS = {
  '50': '98%',
  '100': '96%',
  '200': '92%', 
  '300': '86%',
  '400': '76%',
  '500': '65%',  // base - brighter
  '600': '56%',
  '700': '46%',
  '800': '36%',
  '900': '26%',
  '950': '16%',
} as const;

// Generate full color map with shades
export const COLOR_TOKEN_MAP = {
  // Generate all color-shade combinations
  ...Object.entries(OKLCH_BASE_COLORS).reduce((acc, [colorName, baseOklch]) => {
    Object.entries(SHADE_LIGHTNESS).forEach(([shade, lightness]) => {
      // Extract chroma and hue from base OKLCH
      const oklchMatch = baseOklch.match(/oklch\([\d.]+%\s+([\d.]+)\s+([\d.]+)\)/);
      if (oklchMatch) {
        const [, chroma, hue] = oklchMatch;
        const key = `${colorName}-${shade}`;
        acc[key] = `oklch(${lightness} ${chroma} ${hue})`;
      }
    });
    return acc;
  }, {} as Record<string, string>),
  
  // Semantic colors (mapped to specific shades)
  'primary': 'oklch(67.29% 0.1966 255.85)',    // blue-500
  'secondary': 'oklch(60.8% 0.2346 296.85)',   // violet-500
  'accent': 'oklch(78.23% 0.1336 89.65)',      // amber-500
  'success': 'oklch(69.59% 0.149 162.48)',     // emerald-500
  'warning': 'oklch(78.23% 0.1336 89.65)',     // amber-500
  'error': 'oklch(62.8% 0.25769 27.41)',       // red-500
  'info': 'oklch(67.29% 0.1966 255.85)',       // blue-500
  
  // Neutral semantic colors
  'foreground': 'oklch(10% 0 0)',              // very dark
  'background': 'oklch(100% 0 0)',             // white
  'muted': 'oklch(53.56% 0 0)',                // gray-500
  'border': 'oklch(90% 0 0)',                  // light gray
  
  // Basic colors
  'white': 'oklch(100% 0 0)',
  'black': 'oklch(0% 0 0)',
  'transparent': 'transparent',
  'current': 'currentColor',
} as const;

export type ColorToken = keyof typeof COLOR_TOKEN_MAP;
export const colorTokens = Object.keys(COLOR_TOKEN_MAP) as ColorToken[];

// Helper to check if a color token exists
export function isColorToken(token: string): token is ColorToken {
  return token in COLOR_TOKEN_MAP;
}

// Helper to check if it's a color-shade format
export function isColorShadeFormat(value: string): boolean {
  return /^[a-z]+-\d+$/.test(value);
}