/**
 * AdorableCSS Configuration with Token Scale Generator
 * 
 * This configuration uses the scale generator to create consistent,
 * mathematically-based design tokens instead of hardcoded values.
 */

import { generateTokenSystem, SCALE_RATIOS, SCALE_PRESETS } from '../tokens/scale-generator';

// Default configuration
export const defaultConfig = {
  // Use mathematical scales for all tokens
  tokens: generateTokenSystem({
    typography: {
      base: 16,
      ratio: SCALE_RATIOS.MINOR_THIRD, // 1.2 - As originally intended
      clamp: {
        min: 10,  // Minimum 10px for readability
        max: 128  // Maximum 128px for display text
      }
    },
    spacing: {
      baseUnit: 4,
      scale: 'progressive', // Tighter at small sizes, looser at large
    },
    sizing: {
      base: 384,  // Base container width
      ratio: SCALE_RATIOS.PERFECT_FOURTH, // 1.333
      unit: 'px'
    },
    borderRadius: {
      baseUnit: 4,
      scale: [0, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 9999], // Custom for border radius
    },
    blur: {
      base: 4,
      ratio: SCALE_RATIOS.PERFECT_FIFTH, // 1.5 - More dramatic for blur effects
      unit: 'px'
    }
  }),
  
  // Other configuration options
  features: {
    jit: true,
    responsive: true,
    darkMode: 'class',
    printMode: true
  },
  
  // Breakpoints using the sizing scale
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

// Preset configurations for different use cases
export const configPresets = {
  // Compact design system (for dense UIs)
  compact: {
    tokens: generateTokenSystem({
      typography: SCALE_PRESETS.typography.compact,
      spacing: SCALE_PRESETS.spacing.tight,
      sizing: SCALE_PRESETS.sizing.compact
    })
  },
  
  // Marketing/landing pages (high contrast)
  marketing: {
    tokens: generateTokenSystem({
      typography: SCALE_PRESETS.typography.marketing,
      spacing: SCALE_PRESETS.spacing.loose,
      sizing: SCALE_PRESETS.sizing.comfortable
    })
  },
  
  // Display/presentation (dramatic scales)
  display: {
    tokens: generateTokenSystem({
      typography: SCALE_PRESETS.typography.display,
      spacing: {
        baseUnit: 8,
        scale: 'exponential'
      },
      sizing: {
        base: 512,
        ratio: SCALE_RATIOS.GOLDEN_RATIO,
        unit: 'px'
      }
    })
  }
};

// Type-safe configuration merger
export function createConfig(userConfig?: Partial<typeof defaultConfig>) {
  return {
    ...defaultConfig,
    ...userConfig,
    tokens: {
      ...defaultConfig.tokens,
      ...userConfig?.tokens
    }
  };
}

// Example: How users can create custom configurations
export const exampleCustomConfig = createConfig({
  tokens: generateTokenSystem({
    typography: {
      base: 18,  // Larger base for better readability
      ratio: SCALE_RATIOS.MAJOR_THIRD, // 1.25
    },
    spacing: {
      baseUnit: 8,  // 8px grid
      scale: 'fibonacci'
    }
  })
});

// Export the token values for use in the codebase
export const tokens = defaultConfig.tokens;
export const { fontSize, spacing, size, radius, blur } = tokens;

// Backwards compatibility layer
// Map new generated values to old hardcoded structure
export const legacyTokens = {
  font: {
    ...tokens.fontSize,
    // Add any legacy aliases if needed
    heading: tokens.fontSize['2xl'],
    display: tokens.fontSize['4xl']
  },
  space: tokens.spacing,
  size: tokens.size,
  radius: tokens.radius,
  blur: tokens.blur
};