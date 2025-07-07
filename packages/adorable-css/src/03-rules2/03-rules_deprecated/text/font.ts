import type { CSSRule, RuleHandler } from '../types';

// Note: font rule has been migrated to Rule2 system
// See: /src/03-rules2-v2/figma/text/font.ts

// Font family presets remain in Rule1
export const fontFamily: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  const fontMap: Record<string, string> = {
    'sf-mono': "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
    'inter': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    'system': "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    'sans': "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
    'mono': "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace",
    'serif': "Georgia, 'Times New Roman', Times, serif"
  };
  
  return { 'font-family': fontMap[value] || value };
};