/**
 * Dynamic token calculation system
 * Generates calc() values at runtime instead of pre-generating CSS variables
 */

// Scale configuration - centralized to avoid hardcoding
export const SCALE_CONFIG = {
  FONT_RATIO: 1.2,
  SIZE_RATIO: 1.25,
  CONTAINER_RATIO: 1.33,
  FONT_BASE: '1rem',
  SIZE_BASE: '1rem',
  CONTAINER_BASE: '20rem',
  SPACING_BASE: '0.25rem'
};

// Token scale mapping
const TOKEN_SCALE: Record<string, number> = {
  '4xs': -5,
  '3xs': -4,
  '2xs': -3,
  'xs': -2,
  'sm': -1,
  'md': 0,
  'lg': 1,
  'xl': 2,
  // Numbered tokens: 2xl = 2+2 = 4, 3xl = 3+2 = 5, etc.
};

/**
 * Get scale position for a token
 * @param token - Token name (e.g., 'xl', '3xl', '12xl')
 * @returns Scale position relative to md (0)
 */
function getTokenScale(token: string): number {
  // Check if it's in the predefined scale
  if (token in TOKEN_SCALE) {
    return TOKEN_SCALE[token];
  }
  
  // Handle numbered xl tokens (2xl, 3xl, etc.)
  const xlMatch = token.match(/^(\d+)xl$/);
  if (xlMatch) {
    const num = parseInt(xlMatch[1]);
    return num + 2; // 2xl = 4, 3xl = 5, etc.
  }
  
  return 0; // Default to md
}

/**
 * Generate dynamic spacing calc expression
 * @param token - Spacing token (e.g., 'xl', '3xl', '12xl')
 * @param baseUnit - Base spacing unit (default: 0.25rem)
 * @returns Calc expression
 */
export function generateSpacingCalc(token: string, baseUnit = SCALE_CONFIG.SPACING_BASE): string {
  const scale = getTokenScale(token);
  
  // Get multiplier based on progressive scale
  // Index:       0    1    2    3    4    5    6    7     8     9     10   11   12   13   14   15   16
  // Token:      4xs  3xs  2xs   xs   sm   md   lg   xl   2xl   3xl   4xl  5xl  6xl  7xl  8xl  9xl  10xl+
  const multipliers = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20];
  
  const index = scale + 5; // Convert scale to array index (md=0 -> index=5)
  if (index >= 0 && index < multipliers.length) {
    const multiplier = multipliers[index];
    if (multiplier === 1) {
      return 'var(--spacing-base, 0.25rem)'; // For xs token
    }
    return `calc(var(--spacing-base, ${baseUnit}) * ${multiplier})`;
  }
  
  // For scales beyond our array, use exponential growth
  if (index >= multipliers.length) {
    const baseMultiplier = multipliers[multipliers.length - 1]; // Last defined multiplier (20)
    const extraSteps = index - (multipliers.length - 1);
    
    // Calculate the final multiplier by applying 1.5^extraSteps
    const finalMultiplier = baseMultiplier * Math.pow(1.5, extraSteps);
    
    return `calc(var(--spacing-base, ${baseUnit}) * ${finalMultiplier.toFixed(4)})`;
  }
  
  // Fallback
  return 'var(--spacing-base, 0.25rem)';
}

/**
 * Generate dynamic font size calc expression
 * @param token - Font size token (e.g., 'sm', 'xl', '3xl')
 * @param baseSize - Base font size (default: 1rem)
 * @param ratio - Scale ratio (default: 1.2)
 * @returns Calc expression
 */
export function generateFontCalc(token: string, baseSize = SCALE_CONFIG.FONT_BASE, ratio = SCALE_CONFIG.FONT_RATIO): string {
  const scale = getTokenScale(token);
  
  if (scale === 0) {
    return 'var(--font-base, 1rem)'; // md = base
  }
  
  // Build single calc expression with proper CSS syntax
  const baseVar = `var(--font-base, ${baseSize})`;
  const ratioVar = `var(--font-ratio, ${ratio})`;
  
  if (scale > 0) {
    // Positive scales: multiply by ratio multiple times
    // calc(var(--font-base) * var(--font-ratio) * var(--font-ratio) * ...)
    const multipliers = Array(scale).fill(ratioVar);
    return `calc(${baseVar} * ${multipliers.join(' * ')})`;
  } else {
    // Negative scales: divide by ratio multiple times
    // calc(var(--font-base) / var(--font-ratio) / var(--font-ratio) / ...)
    const divisors = Array(Math.abs(scale)).fill(ratioVar);
    return `calc(${baseVar} / ${divisors.join(' / ')})`;
  }
}

/**
 * Generate dynamic size calc expression
 * @param token - Size token
 * @param baseSize - Base size (default: 1rem) 
 * @param ratio - Scale ratio (default: 1.25)
 * @returns Calc expression
 */
export function generateSizeCalc(token: string, baseSize = SCALE_CONFIG.SIZE_BASE, ratio = SCALE_CONFIG.SIZE_RATIO): string {
  const scale = getTokenScale(token);
  
  if (scale === 0) {
    return 'var(--size-base, 1rem)';
  }
  
  // Build single calc expression with proper CSS syntax
  const baseVar = `var(--size-base, ${baseSize})`;
  const ratioVar = `var(--size-ratio, ${ratio})`;
  
  if (scale > 0) {
    const multipliers = Array(scale).fill(ratioVar);
    return `calc(${baseVar} * ${multipliers.join(' * ')})`;
  } else {
    const divisors = Array(Math.abs(scale)).fill(ratioVar);
    return `calc(${baseVar} / ${divisors.join(' / ')})`;
  }
}

/**
 * Generate dynamic container calc expression
 * @param token - Container token
 * @param baseSize - Base container size (default: 20rem)
 * @param ratio - Scale ratio (default: 1.33)
 * @returns Calc expression
 */
export function generateContainerCalc(token: string, baseSize = SCALE_CONFIG.CONTAINER_BASE, ratio = SCALE_CONFIG.CONTAINER_RATIO): string {
  const scale = getTokenScale(token);
  
  if (scale === 0) {
    return 'var(--container-base, 20rem)'; // md = 20rem (320px)
  }
  
  // Build single calc expression with proper CSS syntax
  const baseVar = `var(--container-base, ${baseSize})`;
  const ratioVar = `var(--container-ratio, ${ratio})`;
  
  if (scale > 0) {
    const multipliers = Array(scale).fill(ratioVar);
    return `calc(${baseVar} * ${multipliers.join(' * ')})`;
  } else {
    const divisors = Array(Math.abs(scale)).fill(ratioVar);
    return `calc(${baseVar} / ${divisors.join(' / ')})`;
  }
}