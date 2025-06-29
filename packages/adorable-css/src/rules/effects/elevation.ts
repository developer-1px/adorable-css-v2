import type { CSSRule, RuleHandler } from '../types';

/**
 * Elevation shadows inspired by Material Design
 * Combines key light (directional) and ambient light (soft) shadows
 * for realistic depth perception
 */

interface ElevationLevel {
  keyX: number;        // Key shadow offset X
  keyY: number;        // Key shadow offset Y  
  keyBlur: number;     // Key shadow blur
  keyOpacity: number;  // Key shadow opacity
  ambientY: number;    // Ambient shadow offset Y
  ambientBlur: number; // Ambient shadow blur
  ambientOpacity: number; // Ambient shadow opacity
}

/**
 * Material Design elevation levels
 * Each level combines two shadows: key light and ambient light
 */
const elevationLevels: Record<number, ElevationLevel> = {
  0: {
    keyX: 0, keyY: 0, keyBlur: 0, keyOpacity: 0,
    ambientY: 0, ambientBlur: 0, ambientOpacity: 0
  },
  1: {
    keyX: 0, keyY: 1, keyBlur: 3, keyOpacity: 0.12,
    ambientY: 1, ambientBlur: 2, ambientOpacity: 0.24
  },
  2: {
    keyX: 0, keyY: 1, keyBlur: 5, keyOpacity: 0.14,
    ambientY: 2, ambientBlur: 4, ambientOpacity: 0.12
  },
  3: {
    keyX: 0, keyY: 1, keyBlur: 8, keyOpacity: 0.15,
    ambientY: 3, ambientBlur: 6, ambientOpacity: 0.10
  },
  4: {
    keyX: 0, keyY: 2, keyBlur: 4, keyOpacity: 0.14,
    ambientY: 4, ambientBlur: 8, ambientOpacity: 0.12
  },
  6: {
    keyX: 0, keyY: 3, keyBlur: 5, keyOpacity: 0.16,
    ambientY: 6, ambientBlur: 10, ambientOpacity: 0.14
  },
  8: {
    keyX: 0, keyY: 5, keyBlur: 5, keyOpacity: 0.18,
    ambientY: 8, ambientBlur: 16, ambientOpacity: 0.15
  },
  9: {
    keyX: 0, keyY: 5, keyBlur: 6, keyOpacity: 0.20,
    ambientY: 9, ambientBlur: 18, ambientOpacity: 0.16
  },
  12: {
    keyX: 0, keyY: 7, keyBlur: 8, keyOpacity: 0.22,
    ambientY: 12, ambientBlur: 24, ambientOpacity: 0.18
  },
  16: {
    keyX: 0, keyY: 9, keyBlur: 11, keyOpacity: 0.24,
    ambientY: 16, ambientBlur: 32, ambientOpacity: 0.20
  },
  20: {
    keyX: 0, keyY: 11, keyBlur: 15, keyOpacity: 0.26,
    ambientY: 20, ambientBlur: 40, ambientOpacity: 0.22
  },
  24: {
    keyX: 0, keyY: 13, keyBlur: 19, keyOpacity: 0.28,
    ambientY: 24, ambientBlur: 48, ambientOpacity: 0.24
  }
};

/**
 * Generate elevation shadow CSS
 */
function generateElevationShadow(level: ElevationLevel): string {
  if (level.keyOpacity === 0 && level.ambientOpacity === 0) {
    return 'none';
  }

  const keyShadow = `${level.keyX}px ${level.keyY}px ${level.keyBlur}px rgba(0, 0, 0, ${level.keyOpacity})`;
  const ambientShadow = `0 ${level.ambientY}px ${level.ambientBlur}px rgba(0, 0, 0, ${level.ambientOpacity})`;
  
  return `${keyShadow}, ${ambientShadow}`;
}

/**
 * Elevation rule implementation
 */
export const elevation: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    return { boxShadow: 'none' };
  }
  
  // Parse elevation level
  const level = parseInt(args, 10);
  
  // Validate level
  if (isNaN(level) || level < 0) {
    console.warn(`Invalid elevation level: ${args}. Using elevation(0).`);
    return { boxShadow: 'none' };
  }
  
  // Find the closest defined elevation level
  const availableLevels = Object.keys(elevationLevels).map(Number).sort((a, b) => a - b);
  let targetLevel = level;
  
  if (!elevationLevels[level]) {
    // Find closest level
    targetLevel = availableLevels.reduce((closest, current) => {
      return Math.abs(current - level) < Math.abs(closest - level) ? current : closest;
    });
  }
  
  const elevationConfig = elevationLevels[targetLevel];
  const boxShadow = generateElevationShadow(elevationConfig);
  
  return {
    boxShadow
  };
};

// Export for use in other modules
export { elevationLevels, generateElevationShadow };