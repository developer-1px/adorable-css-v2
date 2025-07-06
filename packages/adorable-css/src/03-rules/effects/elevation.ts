import type { CSSRule, RuleHandler } from '../types';

/**
 * Elevation shadows with algorithmic generation
 * Uses mathematical formulas to create consistent, scalable elevation effects
 */

/**
 * Calculate elevation properties using formulas
 * This creates a more natural and consistent progression
 */
function calculateElevation(level: number) {
  if (level === 0) {
    return {
      keyY: 0,
      keyBlur: 0,
      keyOpacity: 0,
      ambientY: 0,
      ambientBlur: 0,
      ambientOpacity: 0
    };
  }

  // Logarithmic progression for more natural shadow growth
  const logLevel = Math.log(level + 1);
  
  // Key shadow (sharp, directional light)
  // Y offset grows slower at first, then faster
  const keyY = Math.round(level * 0.5 + logLevel * 0.5);
  // Blur increases with level but not linearly
  const keyBlur = Math.round(level * 0.3 + logLevel * 2);
  // Opacity stays subtle, increases very slowly
  const keyOpacity = Math.min(0.05 + level * 0.005, 0.15);
  
  // Ambient shadow (soft, diffused light)
  // Y offset matches the level directly
  const ambientY = level;
  // Blur is much larger for soft effect
  const ambientBlur = level * 2;
  // Opacity decreases as blur increases to maintain subtlety
  const ambientOpacity = Math.max(0.12 - level * 0.004, 0.04);
  
  return {
    keyY,
    keyBlur,
    keyOpacity: Math.round(keyOpacity * 1000) / 1000, // Round to 3 decimals
    ambientY,
    ambientBlur,
    ambientOpacity: Math.round(ambientOpacity * 1000) / 1000
  };
}

/**
 * Generate elevation shadow CSS
 */
function generateElevationShadow(level: number): string {
  const elevation = calculateElevation(level);
  
  if (elevation.keyOpacity === 0 && elevation.ambientOpacity === 0) {
    return 'none';
  }

  const keyShadow = `0 ${elevation.keyY}px ${elevation.keyBlur}px rgba(0, 0, 0, ${elevation.keyOpacity})`;
  const ambientShadow = `0 ${elevation.ambientY}px ${elevation.ambientBlur}px rgba(0, 0, 0, ${elevation.ambientOpacity})`;
  
  return `${keyShadow}, ${ambientShadow}`;
}

/**
 * Elevation rule implementation
 */
export const elevation: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    return { 'box-shadow': 'none' };
  }
  
  // Parse elevation level
  const level = parseInt(args, 10);
  
  // Validate level
  if (isNaN(level) || level < 0) {
    console.warn(`Invalid elevation level: ${args}. Using elevation(0).`);
    return { 'box-shadow': 'none' };
  }
  
  // Cap at reasonable maximum (e.g., 24)
  const cappedLevel = Math.min(level, 24);
  
  const boxShadow = generateElevationShadow(cappedLevel);
  
  return {
    'box-shadow': boxShadow
  };
};

// Export for use in other modules
export { calculateElevation, generateElevationShadow };