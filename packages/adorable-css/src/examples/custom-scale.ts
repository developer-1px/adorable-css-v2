/**
 * Example: How to create custom scale systems
 */

import { generateScaleSystem, SCALE_RATIOS } from '../core/values/scaleUtilities';

// Example 1: Custom font scale with Golden Ratio
const customFontScale = generateScaleSystem({
  fontConfig: {
    base: 16,
    ratio: SCALE_RATIOS.GOLDEN_RATIO,
    steps: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
  }
});

console.log('Custom Font Scale CSS:');
console.log(customFontScale);
/* Output:
:root {
  /* Font Scale Variables */
  --font-scale-xs: 0.382;
  --font-scale-sm: 0.618;
  --font-scale-md: 1.000;
  --font-scale-lg: 1.618;
  --font-scale-xl: 2.618;
  --font-scale-2xl: 4.236;
  --font-scale-3xl: 6.854;
}
*/

// Example 2: Custom spacing scale - Linear mode (default)
const linearSpacingScale = generateScaleSystem(
  undefined,
  {
    base: 8, // 8px base
    ratio: 1.5,
    steps: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    mode: 'linear' // Uses predefined multipliers
  }
);

console.log('\nLinear Spacing Scale CSS:');
console.log(linearSpacingScale);
/* Output:
:root {
  /* Spacing Scale Variables */
  --spacing-scale-xs: 0.5;
  --spacing-scale-sm: 0.75;
  --spacing-scale-md: 1;
  --spacing-scale-lg: 1.5;
  --spacing-scale-xl: 2;
  --spacing-scale-2xl: 4;
}
*/

// Example 3: Custom spacing scale - Ratio mode
const ratioSpacingScale = generateScaleSystem(
  undefined,
  {
    base: 4, // 4px base
    ratio: 1.5,
    steps: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    mode: 'ratio' // Uses mathematical ratio
  }
);

console.log('\nRatio Spacing Scale CSS:');
console.log(ratioSpacingScale);
/* Output:
:root {
  /* Spacing Scale Variables */
  --spacing-scale-xs: 0.444;
  --spacing-scale-sm: 0.667;
  --spacing-scale-md: 1.000;
  --spacing-scale-lg: 1.500;
  --spacing-scale-xl: 2.250;
  --spacing-scale-2xl: 3.375;
}
*/

// Example 4: Complete custom scale system
const myDesignSystem = generateScaleSystem(
  {
    base: 16,
    ratio: SCALE_RATIOS.MAJOR_THIRD, // 1.25
    steps: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']
  },
  {
    base: 4,
    ratio: 1.5,
    steps: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']
  }
);

// Usage in CSS:
/*
<style>
  ${myDesignSystem}
  
  /* Override base values */
  :root {
    --font-base: 18px;
    --spacing: 0.5rem;
  }
  
  /* Your styles will now use the custom scale */
  .title {
    font-size: calc(var(--font-base) * var(--font-scale-xl));
  }
</style>
*/

// Example 5: Runtime scale adjustment
const scaleAdjustmentCSS = `
/* Adjust scale for different breakpoints */
@media (min-width: 768px) {
  :root {
    --font-base: 18px;
    --font-ratio: 1.333; /* Perfect Fourth for larger screens */
  }
}

@media (min-width: 1200px) {
  :root {
    --font-base: 20px;
    --font-ratio: 1.414; /* Augmented Fourth for desktop */
  }
}
`;

// Example 6: Component-specific scale override
const componentScaleCSS = `
/* Override scale for specific component */
.hero-section {
  --font-base: 1.25rem;
  --font-ratio: 1.618; /* Golden ratio for hero text */
}

.compact-card {
  --spacing: 0.125rem; /* Tighter spacing */
  --font-base: 0.875rem; /* Smaller base */
}
`;

// Example 7: Switching between linear and ratio modes
const dualModeSpacingCSS = `
/* Default: Linear scale */
:root {
  --spacing: 0.25rem;
  ${linearSpacingScale}
}

/* Switch to ratio mode for specific contexts */
.ratio-spacing {
  --spacing-scale-xs: 0.444;
  --spacing-scale-sm: 0.667;
  --spacing-scale-md: 1.000;
  --spacing-scale-lg: 1.500;
  --spacing-scale-xl: 2.250;
  --spacing-scale-2xl: 3.375;
}

/* Usage in AdorableCSS */
/* Linear: p(xl) → padding: calc(0.25rem * 2) */
/* Ratio: .ratio-spacing p(xl) → padding: calc(0.25rem * 2.250) */
`;