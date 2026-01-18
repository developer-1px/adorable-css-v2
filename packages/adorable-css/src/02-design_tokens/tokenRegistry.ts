/**
 * Token Registry for lazy token generation
 * Tracks used 02-design_tokens and generates CSS variables on demand
 */

import type { ScaleConfig } from './scaleConfig';
import { getTokenStep, DEFAULT_SCALE_CONFIG } from './scaleConfig';
import { calculateMultiplier, formatMultiplier } from './scaleFormulas';

// Global registry to track used 02-design_tokens
const usedTokens = {
  font: new Set<string>(),
  spacing: new Set<string>(),
  size: new Set<string>(),
  container: new Set<string>(),
};


/**
 * Start collecting used 02-design_tokens
 */
export function startTokenCollection(): void {
  // Collection is now always active for lazy generation
  // DO NOT clear existing 02-design_tokens - we want to accumulate them
  // for proper lazy generation across multiple generateCSS calls
}

/**
 * Stop collecting 02-design_tokens
 */
export function stopTokenCollection(): void {
  // Collection is now always active for lazy generation
}

/**
 * Register a used token
 */
export function registerToken(category: 'font' | 'spacing' | 'size' | 'container', token: string): void {
  // Always collect 02-design_tokens for lazy generation
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
 * Get all used 02-design_tokens
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

// Common helper to calculate token value
import { FontSizeScale, SpaceScale, RadiusScale } from './scales';

function _calculateTokenValue(
  category: 'font' | 'spacing' | 'size' | 'container',
  token: string,
  config: ScaleConfig,
  unit: 'rem' | 'px'
): number {
  if (category === 'container') {
    const containerBreakpoints: Record<string, number> = {
      'xs': 320, 'sm': 480, 'md': 640, 'lg': 960, 'xl': 1280,
      '2xl': 1440, '3xl': 1600, '4xl': 1920, '5xl': 2240,
      '6xl': 2560, '7xl': 2880,
    };

    let pixels = containerBreakpoints[token];
    if (!pixels) {
      const xlMatch = token.match(/^(\d+)xl$/);
      pixels = xlMatch ? 640 + (parseInt(xlMatch[1]) * 320) : 640;
    }
    return unit === 'px' ? pixels : pixels / 16;
  }

  // Handle explicit numeric scales if present
  if (category === 'font') {
    // Map standard sizes to scale indices (approximate based on standard ramp)
    // 9, 10, 11, 12, 13, 14, 15, 16, 18, 20...
    // xs=12(3), sm=14(5), md=16(7), lg=18(8), xl=20(9), 2xl=24(11)...
    const namedMap: Record<string, number> = {
      'xs': 12, 'sm': 14, 'md': 16, 'lg': 18, 'xl': 20, '2xl': 24, '3xl': 32, '4xl': 36, '5xl': 48, '6xl': 64
    };
    if (namedMap[token]) return unit === 'px' ? namedMap[token] : namedMap[token] / 16;

    // Check if token matches a value in the scale directly (e.g. font(16))
    const num = parseFloat(token);
    if (!isNaN(num) && FontSizeScale.includes(num as any)) {
      return unit === 'px' ? num : num / 16;
    }

    // Otherwise fallback to calculation for fluid/unknown values
  }

  if (category === 'spacing' || category === 'size') {
    // Map standard t-shirt sizes
    const namedMap: Record<string, number> = {
      'xs': 4, 'sm': 8, 'md': 16, 'lg': 24, 'xl': 32,
      '2xl': 48, '3xl': 64, '4xl': 96, '5xl': 128, '6xl': 160,
      'full': unit === 'px' ? 9999 : 9999 // Should 'full' be 100%? No, usually spacing/size tokens are absolute. w(full) is different.
      // Actually size(full) should probably be handled differently in CSS generation but here we return a value. 
      // width: full is usually width: 100%. 
      // But here we are returning a number. 
      // If the user uses w(full), the parser usually handles 'full' directly or it maps to a value.
      // In AdorableCSS v1, w(full) generates width: 100%.
      // Let's stick to pixels for scale.
    };

    if (namedMap[token]) return unit === 'px' ? namedMap[token] : namedMap[token] / 16;

    // Check if token is strictly numeric (e.g. "4", "16", "2.5")
    // parseFloat('4xl') -> 4, which is bad.
    const isStrictlyNumeric = !isNaN(Number(token)) && !isNaN(parseFloat(token));

    if (isStrictlyNumeric) {
      const num = parseFloat(token);
      if (SpaceScale.includes(num as any)) {
        return unit === 'px' ? num : num / 16;
      }
    }
  }

  const baseValues = {
    font: unit === 'px' ? 16 : 1,
    spacing: unit === 'px' ? 4 : 0.25,
    size: unit === 'px' ? 16 : 1,
  };

  const base = baseValues[category as keyof typeof baseValues];
  const categoryConfig = config[category] || DEFAULT_SCALE_CONFIG[category];
  const step = getTokenStep(token, category);
  const multiplier = calculateMultiplier(step, categoryConfig!, category);

  return unit === 'px'
    ? Math.round(base * multiplier)
    : parseFloat((base * multiplier).toFixed(3));
}

// Generic token variable generator
function _generateTokenVars(
  category: 'font' | 'spacing' | 'size' | 'container',
  config: ScaleConfig,
  unit: 'rem' | 'px'
): string[] {
  const vars: string[] = [];
  const tokens = usedTokens[category];

  if (tokens.size > 0) {
    const titles = {
      font: 'Font Tokens',
      spacing: 'Spacing Tokens',
      size: 'Size Tokens',
      container: 'Container Tokens',
    };

    vars.push(`\n  /* ${titles[category]} */`);

    tokens.forEach(token => {
      const value = _calculateTokenValue(category, token, config, unit);
      const formatted = category === 'container' && unit !== 'px'
        ? value.toFixed(1)
        : formatMultiplier(value);
      vars.push(`  --${category}-${token}: ${formatted}${unit};`);
    });
  }

  return vars;
}

/**
 * Generate CSS variables for used 02-design_tokens
 */
export function generateUsedTokensCSS(config: ScaleConfig = DEFAULT_SCALE_CONFIG): string {
  const cssVars: string[] = [];
  const unit = config.unit || 'px';

  // Generate vars for each category
  const categories: Array<'font' | 'spacing' | 'size' | 'container'> = ['font', 'spacing', 'size', 'container'];
  categories.forEach(category => {
    cssVars.push(..._generateTokenVars(category, config, unit));
  });

  if (cssVars.length === 0) {
    return ':root {\n}';
  }

  return `:root {\n${cssVars.join('\n')}\n}`;
}

/**
 * Get token value for a specific token
 */
export function getTokenValue(
  category: 'font' | 'spacing' | 'size' | 'container',
  token: string,
  config: ScaleConfig = DEFAULT_SCALE_CONFIG
): string {
  const unit = config.unit || 'px';
  const value = _calculateTokenValue(category, token, config, unit);
  const formatted = category === 'container' && unit !== 'px'
    ? value.toFixed(1)
    : formatMultiplier(value);
  return `${formatted}${unit}`;
}