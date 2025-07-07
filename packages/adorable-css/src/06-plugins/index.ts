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
export { glowRules } from '../04-components/features/glow';
export { glassRules } from '../04-components/features/glass';
export { figmaComponents } from '../04-components/features/figma';
export { containerRules } from '../04-components/patterns/container';
export { proseRules } from '../04-components/patterns/prose';

// Export animations as animationRules for backward compatibility
export { animationRules } from './animations/animations';