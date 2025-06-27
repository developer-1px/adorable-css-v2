// Re-export all extensions
export * from './advanced/advanced';
export * from './advanced/admin';
export * from './advanced/design-system';
export { 
  aspect, 
  blend, 
  bgBlend,
  scale,
  scaleX,
  scaleY,
  rotate,
  skew,
  skewX,
  skewY,
  masterInspiredRules
} from './advanced/master-inspired';
export { 
  animationsPlugin,
  animationKeyframes,
  getAllKeyframes
} from './animations/animations';
export * from './responsive/responsive';

// Re-export components
export { glowRules } from '../components/features/glow';
export { glassRules } from '../components/features/glass';
export { cardRules } from '../components/primitives/card';
export { buttonRules } from '../components/primitives/button';
export { headingRules } from '../components/primitives/heading';
export { uiCardRules } from '../components/primitives/index';
export { containerRules } from '../components/patterns/container';
export { proseRules } from '../components/patterns/prose';
export { mdxRules } from '../components/patterns/mdx';
export { sectionRules } from '../components/patterns/section';

// Export animations as animationRules for backward compatibility
export { animationsPlugin as animationRules } from './animations/animations';