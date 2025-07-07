// Re-export all 05-plugins
export { 
  animationsPlugin,
  animationKeyframes,
  getAllKeyframes
} from './animations/animations';

export {
  glassmorphismPlugin,
  glassmorphismRules
} from './glassmorphism/glassmorphism';

// export * from './responsive/responsive'; // Spec'd out

// Re-export 04-components
export { glowRules } from '../05-components/features/glow';
export { glassRules } from '../05-components/features/glass';
export { figmaComponents } from '../05-components/features/figma';
export { containerRules } from '../05-components/patterns/container';
export { proseRules } from '../05-components/patterns/prose';

// Export animations as animationRules for backward compatibility
export { animationRules } from './animations/animations';