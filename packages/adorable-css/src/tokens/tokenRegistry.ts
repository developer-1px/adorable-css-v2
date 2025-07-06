/**
 * Token Registry for lazy token generation
 * Tracks used tokens and generates CSS variables on demand
 */

import type { ScaleConfig } from './scaleConfig';
import { getTokenStep, DEFAULT_SCALE_CONFIG } from './scaleConfig';
import { calculateMultiplier, formatMultiplier } from './scaleFormulas';

// Global registry to track used tokens
const usedTokens = {
  font: new Set<string>(),
  spacing: new Set<string>(),
  size: new Set<string>(),
  container: new Set<string>(),
};


/**
 * Start collecting used tokens
 */
export function startTokenCollection(): void {
  // Collection is now always active for lazy generation
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
  // Collection is now always active for lazy generation
}

/**
 * Register a used token
 */
export function registerToken(category: 'font' | 'spacing' | 'size' | 'container', token: string): void {
  // Always collect tokens for lazy generation
  usedTokens[category].add(token);
}

/**
 * Clear the token registry
 */
export function clearTokenRegistry(): void {
  usedTokens.font.clear();
  usedTokens.spacing.clear();
  usedTokens.size.clear();
  usedTokens.container.clear();
}

/**
 * Get all used tokens
 */
export function getUsedTokens() {
  return {
    font: usedTokens.font,
    spacing: usedTokens.spacing,
    size: usedTokens.size,
    container: usedTokens.container,
  };
}

// Helper functions for generating CSS variables for each token category

function _generateFontVars(config: ScaleConfig, unit: 'rem' | 'px'): string[] {
  const vars: string[] = [];
  if (usedTokens.font.size > 0) {
    vars.push('\n  /* Font Tokens */');
    const fontBase = unit === 'px' ? 16 : 1;
    const fontConfig = config.font || DEFAULT_SCALE_CONFIG.font;
    
    usedTokens.font.forEach(token => {
      const step = getTokenStep(token, 'font');
      const multiplier = calculateMultiplier(step, fontConfig, 'font');
      const value = unit === 'px' 
        ? Math.round(fontBase * multiplier)
        : parseFloat((fontBase * multiplier).toFixed(3));
      vars.push(`  --font-${token}: ${formatMultiplier(value)}${unit};`);
    });
  }
  return vars;
}

function _generateSpacingVars(config: ScaleConfig, unit: 'rem' | 'px'): string[] {
  const vars: string[] = [];
  if (usedTokens.spacing.size > 0) {
    vars.push('\n  /* Spacing Tokens */');
    const spacingBase = unit === 'px' ? 4 : 0.25; // 4px or 0.25rem
    const spacingConfig = config.spacing || DEFAULT_SCALE_CONFIG.spacing;
    
    usedTokens.spacing.forEach(token => {
      const step = getTokenStep(token, 'spacing');
      const multiplier = calculateMultiplier(step, spacingConfig, 'spacing');
      const value = unit === 'px' 
        ? Math.round(spacingBase * multiplier)
        : parseFloat((spacingBase * multiplier).toFixed(3));
      vars.push(`  --spacing-${token}: ${formatMultiplier(value)}${unit};`);
    });
  }
  return vars;
}

function _generateSizeVars(config: ScaleConfig, unit: 'rem' | 'px'): string[] {
  const vars: string[] = [];
  if (usedTokens.size.size > 0) {
    vars.push('\n  /* Size Tokens */');
    const sizeBase = unit === 'px' ? 16 : 1;
    const sizeConfig = config.size || DEFAULT_SCALE_CONFIG.size;
    
    usedTokens.size.forEach(token => {
      const step = getTokenStep(token, 'size');
      const multiplier = calculateMultiplier(step, sizeConfig, 'size');
      const value = unit === 'px' 
        ? Math.round(sizeBase * multiplier)
        : parseFloat((sizeBase * multiplier).toFixed(3));
      vars.push(`  --size-${token}: ${formatMultiplier(value)}${unit};`);
    });
  }
  return vars;
}

function _generateContainerVars(_config: ScaleConfig, unit: 'rem' | 'px'): string[] {
  const vars: string[] = [];
  if (usedTokens.container.size > 0) {
    vars.push('\n  /* Container Tokens */');
    
    // Container uses hardcoded breakpoints in pixels
    const containerBreakpoints: Record<string, number> = {
      'xs': 320,
      'sm': 480,
      'md': 640,
      'lg': 960,
      'xl': 1280,
      '2xl': 1440,
      '3xl': 1600,
      '4xl': 1920,
      '5xl': 2240,
      '6xl': 2560,
      '7xl': 2880,
    };
    
    usedTokens.container.forEach(token => {
      let pixels = containerBreakpoints[token];
      
      if (!pixels) {
        // Handle numbered xl tokens
        const xlMatch = token.match(/^(\d+)xl$/);
        if (xlMatch) {
          const num = parseInt(xlMatch[1]);
          pixels = 640 + (num * 320); // Progressive scaling
        } else {
          pixels = 640; // default to md
        }
      }
      
      const value = unit === 'px' ? pixels : (pixels / 16);
      const formatted = unit === 'px' ? value.toString() : value.toFixed(1);
      vars.push(`  --container-${token}: ${formatted}${unit};`);
    });
  }
  return vars;
}

/**
 * Generate CSS variables for used tokens
 */
export function generateUsedTokensCSS(config: ScaleConfig = DEFAULT_SCALE_CONFIG): string {
  const cssVars: string[] = [];
  const unit = config.unit || 'px';
  
  // Generate vars for each category using helper functions
  cssVars.push(..._generateFontVars(config, unit));
  cssVars.push(..._generateSpacingVars(config, unit));
  cssVars.push(..._generateSizeVars(config, unit));
  cssVars.push(..._generateContainerVars(config, unit));
  
  if (cssVars.length === 0) {
    return ':root {\n}';
  }
  
  return `:root {\n${cssVars.join('\n')}\n}`;
}