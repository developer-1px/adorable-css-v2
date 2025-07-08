/**
 * Font Family Token System
 */

export const FONT_TOKEN_MAP = {
  // Sans-serif families
  'sans': 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  'system-ui': 'system-ui, sans-serif',
  
  // Serif families
  'serif': 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  'georgia': 'Georgia, serif',
  'times': '"Times New Roman", Times, serif',
  
  // Monospace families
  'mono': 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  'code': 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  'courier': '"Courier New", Courier, monospace',
  
  // Display/heading families
  'display': 'ui-sans-serif, system-ui, sans-serif',
  'heading': 'ui-sans-serif, system-ui, sans-serif',
  
  // Specialized fonts (can be extended)
  'body': 'ui-sans-serif, system-ui, sans-serif',
} as const;

export type FontToken = keyof typeof FONT_TOKEN_MAP;
export const fontTokens = Object.keys(FONT_TOKEN_MAP) as FontToken[];

// Helper to check if a font token exists
export function isFontToken(token: string): token is FontToken {
  return token in FONT_TOKEN_MAP;
}