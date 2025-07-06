import { defineConfig } from './src/core/config/adorableConfig';

/**
 * Example AdorableCSS configuration file
 * Copy this to your project root as adorable.config.ts
 */
export default defineConfig({
  // Scale configuration
  scale: {
    // Spacing scale
    spacing: {
      mode: 'linear',     // 'linear' | 'exponential' | 'ratio' | 'custom'
      base: 4,            // Base unit in pixels
      factor: 1.5,        // Factor for exponential/ratio modes
    },
    
    // Font scale
    font: {
      mode: 'ratio',      // 'ratio' | 'modular' | 'custom'
      ratio: 1.25,        // Major Third scale
      // Common ratios:
      // 1.067 - Minor Second
      // 1.125 - Major Second  
      // 1.2   - Minor Third
      // 1.25  - Major Third
      // 1.333 - Perfect Fourth
      // 1.5   - Perfect Fifth
      // 1.618 - Golden Ratio
    },
    
    // Size scale
    size: {
      mode: 'ratio',      // 'ratio' | 'linear' | 'custom'
      ratio: 1.5,
    },
  },
  
  // Base values
  base: {
    spacing: '0.25rem',   // 4px
    font: '1rem',         // 16px
    size: '1rem',
    container: '20rem',   // 320px
  },
  
  // Features
  features: {
    autoInject: true,
    resetCSS: true,
    semanticColors: true,
  },
});

// Custom formula example
/*
export default defineConfig({
  scale: {
    spacing: {
      mode: 'custom',
      formula: (step) => {
        // Your custom formula here
        // step: -4 (4xs) to 14 (12xl), 1 = md
        if (step <= 0) return 0.5 * Math.pow(2, step);
        return Math.pow(1.5, step);
      }
    }
  }
});
*/