/**
 * Color utility functions
 * Shared color conversion and manipulation utilities
 */

/**
 * Convert hex color to RGBA
 * Supports both 3-digit (#RGB) and 6-digit (#RRGGBB) hex codes
 *
 * @param hex - Hex color code (with or without #)
 * @param alpha - Alpha value (0-1)
 * @returns RGBA color string
 *
 * @example
 * hexToRgba('#ff0000', 0.5) // 'rgba(255, 0, 0, 0.5)'
 * hexToRgba('f00', 0.8)     // 'rgba(255, 0, 0, 0.8)'
 */
export function hexToRgba(hex: string, alpha: number): string {
  // Remove # if present
  const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  let r: number, g: number, b: number;

  if (cleanHex.length === 3) {
    // 3-digit hex: #RGB
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    // 6-digit hex: #RRGGBB
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else {
    // Invalid hex, return fallback
    console.warn(`⚠️  AdorableCSS: Invalid hex color "${hex}", using fallback rgba(0, 0, 0, ${alpha})`);
    return `rgba(0, 0, 0, ${alpha})`;
  }

  // Validate RGB values
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    console.warn(`⚠️  AdorableCSS: Failed to parse hex color "${hex}", using fallback`);
    return `rgba(0, 0, 0, ${alpha})`;
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Adjust alpha in existing rgba color string
 *
 * @param rgbaColor - RGBA color string
 * @param newAlpha - New alpha value (0-1)
 * @returns Updated RGBA color string
 *
 * @example
 * adjustRgbaAlpha('rgba(255, 0, 0, 0.5)', 0.8) // 'rgba(255, 0, 0, 0.8)'
 */
export function adjustRgbaAlpha(rgbaColor: string, newAlpha: number): string {
  // Match rgba format: rgba(r, g, b, a)
  const match = rgbaColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);

  if (match) {
    const [, r, g, b] = match;
    return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
  }

  // If not rgba format, return as is
  return rgbaColor;
}
