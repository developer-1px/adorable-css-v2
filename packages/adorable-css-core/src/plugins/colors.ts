import type { RuleHandler, CSSRule } from '../rules/types';

// Color theme configuration using OKLCH
export interface ColorTheme {
  name: string;
  colors: {
    [key: string]: {
      l: number; // Lightness (0-1)
      c: number; // Chroma (0-0.4, typically)
      h: number; // Hue (0-360)
    };
  };
}

// Predefined themes using OKLCH
export const themes: Record<string, ColorTheme> = {
  default: {
    name: 'Default',
    colors: {
      gray: { l: 0.7, c: 0.01, h: 220 },
      blue: { l: 0.7, c: 0.18, h: 263 },
      purple: { l: 0.7, c: 0.2, h: 300 },
      green: { l: 0.7, c: 0.15, h: 150 },
      red: { l: 0.7, c: 0.2, h: 25 },
      yellow: { l: 0.85, c: 0.15, h: 85 },
      orange: { l: 0.75, c: 0.18, h: 50 },
      pink: { l: 0.75, c: 0.15, h: 350 },
      teal: { l: 0.7, c: 0.12, h: 190 },
      cyan: { l: 0.8, c: 0.12, h: 210 },
      indigo: { l: 0.65, c: 0.15, h: 280 },
      slate: { l: 0.7, c: 0.02, h: 220 },
      zinc: { l: 0.7, c: 0.005, h: 0 },
      neutral: { l: 0.7, c: 0, h: 0 },
      stone: { l: 0.7, c: 0.01, h: 30 },
      amber: { l: 0.8, c: 0.15, h: 75 },
      lime: { l: 0.8, c: 0.18, h: 120 },
      emerald: { l: 0.75, c: 0.13, h: 160 },
      sky: { l: 0.8, c: 0.12, h: 230 },
      violet: { l: 0.7, c: 0.18, h: 290 },
      fuchsia: { l: 0.75, c: 0.2, h: 320 },
      rose: { l: 0.75, c: 0.15, h: 15 },
    },
  },
  warm: {
    name: 'Warm',
    colors: {
      gray: { l: 0.7, c: 0.015, h: 30 },
      blue: { l: 0.7, c: 0.16, h: 250 },
      purple: { l: 0.7, c: 0.18, h: 310 },
      green: { l: 0.7, c: 0.14, h: 140 },
      red: { l: 0.7, c: 0.22, h: 15 },
      yellow: { l: 0.85, c: 0.16, h: 75 },
      orange: { l: 0.75, c: 0.2, h: 45 },
      pink: { l: 0.75, c: 0.16, h: 340 },
      teal: { l: 0.7, c: 0.11, h: 180 },
    },
  },
  cool: {
    name: 'Cool',
    colors: {
      gray: { l: 0.7, c: 0.02, h: 210 },
      blue: { l: 0.7, c: 0.2, h: 260 },
      purple: { l: 0.7, c: 0.22, h: 290 },
      green: { l: 0.7, c: 0.16, h: 155 },
      red: { l: 0.7, c: 0.18, h: 20 },
      yellow: { l: 0.85, c: 0.14, h: 90 },
      orange: { l: 0.75, c: 0.16, h: 55 },
      pink: { l: 0.75, c: 0.14, h: 330 },
      teal: { l: 0.7, c: 0.13, h: 200 },
    },
  },
  dark: {
    name: 'Dark',
    colors: {
      gray: { l: 0.5, c: 0.015, h: 220 },
      blue: { l: 0.55, c: 0.16, h: 263 },
      purple: { l: 0.6, c: 0.18, h: 300 },
      green: { l: 0.6, c: 0.13, h: 150 },
      red: { l: 0.6, c: 0.18, h: 25 },
      yellow: { l: 0.75, c: 0.13, h: 85 },
      orange: { l: 0.65, c: 0.16, h: 50 },
      pink: { l: 0.65, c: 0.13, h: 350 },
      teal: { l: 0.6, c: 0.11, h: 190 },
    },
  },
};

// Current active theme
let currentTheme: ColorTheme = themes.default;

// Lightness scale for different shades (50, 100, 200, ..., 900)
// OKLCH lightness scale - more perceptually uniform
const lightnessScale = {
  50: 0.98,   // Almost white
  100: 0.95,  // Very light
  200: 0.90,  // Light
  300: 0.83,  // Light-medium
  400: 0.75,  // Medium-light
  500: 1.0,   // Base (reference - use theme lightness as-is)
  600: 0.60,  // Medium-dark
  700: 0.50,  // Dark
  800: 0.40,  // Darker
  900: 0.30,  // Very dark
};

/**
 * Generate OKLCH color from theme configuration
 */
function generateOKLCHColor(colorName: string, shade: number): string {
  const colorConfig = currentTheme.colors[colorName];
  if (!colorConfig) {
    return `oklch(0.7 0 0)`; // Fallback gray
  }

  const { l: baseL, c, h } = colorConfig;
  const lightnessMultiplier = lightnessScale[shade as keyof typeof lightnessScale] || 1.0;
  
  // Calculate lightness based on the base lightness and multiplier
  let lightness: number;
  if (shade === 500) {
    lightness = baseL; // Use base lightness for 500
  } else {
    lightness = baseL * lightnessMultiplier;
  }

  // Clamp lightness between 0 and 1
  lightness = Math.max(0, Math.min(1, lightness));
  
  // Adjust chroma slightly for very light and very dark shades
  let adjustedChroma = c;
  if (shade <= 100) {
    adjustedChroma = c * 0.5; // Reduce chroma for very light shades
  } else if (shade >= 800) {
    adjustedChroma = c * 0.7; // Reduce chroma for very dark shades
  }

  return `oklch(${lightness.toFixed(3)} ${adjustedChroma.toFixed(3)} ${h})`;
}

/**
 * Generate RGB hex fallback for OKLCH (basic approximation)
 * This is a simplified conversion - for production use a proper color library like culori
 */
function generateRGBFallback(colorName: string, shade: number): string {
  const colorConfig = currentTheme.colors[colorName];
  if (!colorConfig) {
    return '#808080'; // Fallback gray
  }

  // Simplified conversion from OKLCH-like values to RGB
  // This is just an approximation for basic compatibility
  const { l: baseL, c, h } = colorConfig;
  const lightnessMultiplier = lightnessScale[shade as keyof typeof lightnessScale] || 1.0;
  
  let lightness = baseL * lightnessMultiplier;
  lightness = Math.max(0, Math.min(1, lightness));
  
  // Very basic conversion (not accurate, but gives reasonable colors)
  const hueRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hueRad);
  const b = c * Math.sin(hueRad);
  
  // Simplified Lab to RGB conversion
  let r = lightness + 0.4 * a;
  let g = lightness - 0.2 * a + 0.3 * b;
  let blue = lightness - 0.6 * b;
  
  // Clamp and convert to 0-255 range
  r = Math.max(0, Math.min(1, r)) * 255;
  g = Math.max(0, Math.min(1, g)) * 255;
  blue = Math.max(0, Math.min(1, blue)) * 255;
  
  const toHex = (c: number) => {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(blue)}`;
}

/**
 * Generate dynamic color palette based on current theme
 */
export function generateColorPalette(): Record<string, string> {
  const palette: Record<string, string> = {};
  
  Object.keys(currentTheme.colors).forEach(colorName => {
    Object.keys(lightnessScale).forEach(shade => {
      const shadeNum = parseInt(shade);
      const oklchColor = generateOKLCHColor(colorName, shadeNum);
      // For modern browsers, we can use OKLCH directly
      // For older browsers, we provide hex fallback
      palette[`${colorName}-${shade}`] = oklchColor;
      palette[`${colorName}-${shade}-hex`] = generateRGBFallback(colorName, shadeNum);
    });
  });

  return palette;
}

/**
 * Set the current theme and regenerate palette
 */
export function setTheme(themeName: string): Record<string, string> {
  if (themes[themeName]) {
    currentTheme = themes[themeName];
    colorPalette = generateColorPalette();
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
 * Create a custom theme
 */
export function createCustomTheme(name: string, colors: ColorTheme['colors']): void {
  themes[name] = { name, colors };
}

/**
 * Create a color variant (e.g., warmer, cooler version)
 */
export function createColorVariant(
  baseTheme: string, 
  name: string, 
  adjustments: {
    hueShift?: number;
    chromaMultiplier?: number;
    lightnessShift?: number;
  }
): void {
  const base = themes[baseTheme];
  if (!base) return;

  const newColors: ColorTheme['colors'] = {};
  
  Object.entries(base.colors).forEach(([colorName, config]) => {
    newColors[colorName] = {
      l: Math.max(0, Math.min(1, config.l + (adjustments.lightnessShift || 0))),
      c: Math.max(0, config.c * (adjustments.chromaMultiplier || 1)),
      h: (config.h + (adjustments.hueShift || 0)) % 360,
    };
  });

  themes[name] = { name, colors: newColors };
}

// Generate initial palette
export let colorPalette = generateColorPalette();

// Color rule handlers that use the palette
export const colorRules: Record<string, RuleHandler> = {
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

// Plugin export
export const colorsPlugin = {
  rules: colorRules,
  palette: colorPalette,
  themes,
  setTheme,
  getCurrentTheme,
  getAvailableThemes,
  createCustomTheme,
  createColorVariant,
};

export default colorsPlugin;