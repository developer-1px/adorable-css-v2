/**
 * Token Registry for lazy token generation
 * Tracks used tokens and generates CSS variables on demand
 */

import type { ScaleConfig } from '../config/scaleConfig';
import { getTokenStep, DEFAULT_SCALE_CONFIG } from '../config/scaleConfig';
import { calculateFontMultiplier, calculateSpacingMultiplier, calculateSizeMultiplier } from '../config/scaleFormulas';

// Global registry to track used tokens
const usedTokens = {
  font: new Set<string>(),
  spacing: new Set<string>(),
  size: new Set<string>(),
  container: new Set<string>(),
};

// Track if we're in collection mode
let isCollecting = false;

/**
 * Start collecting used tokens
 */
export function startTokenCollection(): void {
  isCollecting = true;
  // Clear previous collections
  usedTokens.font.clear();
  usedTokens.spacing.clear();
  usedTokens.size.clear();
  usedTokens.container.clear();
}

/**
 * Stop collecting tokens
 */
export function stopTokenCollection(): void {
  isCollecting = false;
}

/**
 * Register a used token
 */
export function registerToken(category: 'font' | 'spacing' | 'size' | 'container', token: string): void {
  if (isCollecting) {
    usedTokens[category].add(token);
  }
}

/**
 * Get all used tokens
 */
export function getUsedTokens() {
  return {
    font: Array.from(usedTokens.font),
    spacing: Array.from(usedTokens.spacing),
    size: Array.from(usedTokens.size),
    container: Array.from(usedTokens.container),
  };
}

/**
 * Generate CSS variables for used tokens
 */
export function generateUsedTokensCSS(config: ScaleConfig = DEFAULT_SCALE_CONFIG): string {
  const cssVars: string[] = [];
  
  // Font tokens
  if (usedTokens.font.size > 0) {
    cssVars.push('  /* Font Tokens */');
    const fontBase = 1; // 1rem
    const fontConfig = config.font || DEFAULT_SCALE_CONFIG.font;
    
    usedTokens.font.forEach(token => {
      const step = getTokenStep(token);
      const multiplier = calculateFontMultiplier(step, fontConfig);
      const value = (fontBase * multiplier).toFixed(3);
      cssVars.push(`  --font-${token}: ${value}rem;`);
    });
  }
  
  // Spacing tokens
  if (usedTokens.spacing.size > 0) {
    cssVars.push('\n  /* Spacing Tokens */');
    const spacingBase = 0.25; // 0.25rem
    const spacingConfig = config.spacing || DEFAULT_SCALE_CONFIG.spacing;
    
    usedTokens.spacing.forEach(token => {
      const step = getTokenStep(token);
      const multiplier = calculateSpacingMultiplier(step, spacingConfig);
      const value = (spacingBase * multiplier).toFixed(3);
      cssVars.push(`  --spacing-${token}: ${value}rem;`);
    });
  }
  
  // Size tokens
  if (usedTokens.size.size > 0) {
    cssVars.push('\n  /* Size Tokens */');
    const sizeBase = 1; // 1rem
    const sizeConfig = config.size || DEFAULT_SCALE_CONFIG.size;
    
    usedTokens.size.forEach(token => {
      const step = getTokenStep(token);
      const multiplier = calculateSizeMultiplier(step, sizeConfig);
      const value = (sizeBase * multiplier).toFixed(3);
      cssVars.push(`  --size-${token}: ${value}rem;`);
    });
  }
  
  // Container tokens
  if (usedTokens.container.size > 0) {
    cssVars.push('\n  /* Container Tokens */');
    const containerBase = 20; // 20rem (320px)
    
    // Container uses hardcoded breakpoints
    const containerBreakpoints: Record<string, number> = {
      'xs': 16,    // 320px
      'sm': 24,    // 480px
      'md': 32,    // 640px
      'lg': 48,    // 960px
      'xl': 64,    // 1280px
      '2xl': 72,   // 1440px
      '3xl': 80,   // 1600px
      '4xl': 96,   // 1920px
      '5xl': 112,  // 2240px
      '6xl': 128,  // 2560px
      '7xl': 144,  // 2880px
    };
    
    usedTokens.container.forEach(token => {
      let multiplier = containerBreakpoints[token];
      
      if (!multiplier) {
        // Handle numbered xl tokens
        const xlMatch = token.match(/^(\d+)xl$/);
        if (xlMatch) {
          const num = parseInt(xlMatch[1]);
          multiplier = 32 + (num * 16);
        } else {
          multiplier = 32; // default to md
        }
      }
      
      const value = (containerBase * multiplier / 20).toFixed(1);
      cssVars.push(`  --container-${token}: ${value}rem;`);
    });
  }
  
  if (cssVars.length === 0) {
    return '';
  }
  
  return `:root {\n${cssVars.join('\n')}\n}`;
}