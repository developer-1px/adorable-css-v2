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
    const fontBase = unit === 'px' ? 16 : 1; // 16px or 1rem
    const fontConfig = config.font || DEFAULT_SCALE_CONFIG.font;
    
    usedTokens.font.forEach(token => {
      const step = getTokenStep(token, 'font');
      const multiplier = calculateFontMultiplier(step, fontConfig);
      const value = unit === 'px' 
        ? Math.round(fontBase * multiplier)
        : (fontBase * multiplier).toFixed(3);
      vars.push(`  --font-${token}: ${value}${unit};`);
    });
  }
  return vars;
}

function _generateSpacingVars(config: ScaleConfig, _unit: 'rem' | 'px'): string[] {
  const vars: string[] = [];
  if (usedTokens.spacing.size > 0) {
    vars.push('\n  /* Spacing Tokens */');
    const spacingConfig = config.spacing || DEFAULT_SCALE_CONFIG.spacing;
    
    usedTokens.spacing.forEach(token => {
      const step = getTokenStep(token, 'spacing');
      const multiplier = calculateSpacingMultiplier(step, spacingConfig);
      // Use calc() for dynamic scaling with unit
      vars.push(`  --spacing-${token}: calc(var(--spacing) * ${multiplier});`);
    });
  }
  return vars;
}

function _generateSizeVars(config: ScaleConfig, unit: 'rem' | 'px'): string[] {
  const vars: string[] = [];
  if (usedTokens.size.size > 0) {
    vars.push('\n  /* Size Tokens */');
    const sizeBase = unit === 'px' ? 16 : 1; // 16px or 1rem
    const sizeConfig = config.size || DEFAULT_SCALE_CONFIG.size;
    
    usedTokens.size.forEach(token => {
      const step = getTokenStep(token, 'size');
      const multiplier = calculateSizeMultiplier(step, sizeConfig);
      const value = unit === 'px' 
        ? Math.round(sizeBase * multiplier)
        : (sizeBase * multiplier).toFixed(3);
      vars.push(`  --size-${token}: ${value}${unit};`);
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
  
  // Base CSS variables
  cssVars.push('  /* Base Variables */');
  if (unit === 'px') {
    cssVars.push('  --spacing: 4px;');
    cssVars.push('  --font-base: 16px;');
    cssVars.push('  --size-base: 16px;');
    cssVars.push('  --container-base: 320px;');
  } else {
    cssVars.push('  --spacing: 0.25rem;');
    cssVars.push('  --font-base: 1rem;');
    cssVars.push('  --size-base: 1rem;');
    cssVars.push('  --container-base: 20rem;');
  }
  
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