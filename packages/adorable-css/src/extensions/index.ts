// Re-export all extensions
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

// Re-export components
export { glowRules } from '../components/features/glow';
export { glassRules } from '../components/features/glass';
export { figmaComponents } from '../components/features/figma';
export { containerRules } from '../components/patterns/container';
export { proseRules } from '../components/patterns/prose';

// Export animations as animationRules for backward compatibility
export { animationRules } from './animations/animations';