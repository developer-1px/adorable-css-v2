import { typographyRules } from './style';
import { layoutRules } from './layout';
import { visualRules } from './style';
import { positionCategoryRules } from './position';
import { interactionRules } from './interaction';
import { utilityRules } from './utilities';
import { effectsRules } from './effects';
import { glowRules, glassRules, figmaComponents, responsiveRules, containerRules, animationRules, proseRules, mdxRules } from '../extensions';
import { heroRules } from '../components/patterns/hero';
import { sectionRules } from '../components/patterns/section';
import { referenceRules } from '../components/patterns/reference';
import { docsRules } from '../components/patterns/docs';
import { buttonRules } from '../components/primitives/button';
import { headingRules } from '../components/primitives/heading';
import { cardRules } from '../components/primitives/card';
import { inputRules } from '../components/primitives/input';
import { colorRules } from '../design-system/colors/colors';
import { priorityRegistry } from './priority-registry';
import { RulePriority } from './types';

// Register rules with their appropriate priority levels
// COMPONENT level (Priority 100) - broad component rules
priorityRegistry.registerBulk(proseRules, RulePriority.COMPONENT);
priorityRegistry.registerBulk(mdxRules, RulePriority.COMPONENT);
priorityRegistry.registerBulk(figmaComponents, RulePriority.COMPONENT);

// String-based component rules (now the primary rules)
priorityRegistry.registerStringBulk(heroRules, RulePriority.COMPONENT);
priorityRegistry.registerStringBulk(sectionRules, RulePriority.COMPONENT);
priorityRegistry.registerStringBulk(referenceRules, RulePriority.COMPONENT);
priorityRegistry.registerStringBulk(docsRules, RulePriority.COMPONENT);
priorityRegistry.registerStringBulk(buttonRules, RulePriority.COMPONENT);
priorityRegistry.registerStringBulk(headingRules, RulePriority.COMPONENT);
priorityRegistry.registerStringBulk(cardRules, RulePriority.COMPONENT);
priorityRegistry.registerStringBulk(inputRules, RulePriority.COMPONENT);

// LAYOUT level (Priority 200) - layout system rules
priorityRegistry.registerBulk(layoutRules, RulePriority.LAYOUT);
priorityRegistry.registerBulk(containerRules, RulePriority.LAYOUT);
priorityRegistry.registerBulk(positionCategoryRules, RulePriority.LAYOUT);

// UTILITY level (Priority 300) - specific utility rules
priorityRegistry.registerBulk(typographyRules, RulePriority.UTILITY);
priorityRegistry.registerBulk(colorRules, RulePriority.UTILITY);
priorityRegistry.registerBulk(visualRules, RulePriority.UTILITY);
priorityRegistry.registerBulk(utilityRules, RulePriority.UTILITY);
priorityRegistry.registerBulk(effectsRules, RulePriority.UTILITY);
priorityRegistry.registerBulk(glowRules, RulePriority.UTILITY);
priorityRegistry.registerBulk(glassRules, RulePriority.UTILITY);
priorityRegistry.registerBulk(animationRules.rules, RulePriority.UTILITY);
priorityRegistry.registerBulk(interactionRules, RulePriority.UTILITY);

// STATE/RESPONSIVE level (Priority 400-500) - handled by responsive decorator
priorityRegistry.registerBulk(responsiveRules, RulePriority.STATE);

// Legacy rules registry for backward compatibility
export const rules = {
  ...typographyRules,
  ...layoutRules,
  ...colorRules,  
  ...visualRules,  // visualRules의 bg가 colorRules의 bg를 덮어씀 (이게 올바른 그라디언트 지원)
  ...positionCategoryRules,
  ...interactionRules,
  ...utilityRules,
  ...effectsRules,
  ...glowRules,
  ...glassRules,
  ...responsiveRules,
  ...proseRules,
  ...mdxRules,
  ...containerRules,
  ...animationRules.rules,
  ...figmaComponents
};

// Grouped rules for testing/debugging
export const groupedRules = {
  typography: typographyRules,
  layout: layoutRules,
  visuals: visualRules,
  position: positionCategoryRules,
  interaction: interactionRules,
  utilities: utilityRules,
  effects: effectsRules,
  plugins: {
    glow: glowRules,
    glass: glassRules,
    responsive: responsiveRules,
    prose: proseRules,
    mdx: mdxRules,
    container: containerRules,
    animations: animationRules.rules,
    figma: figmaComponents
  }
};

// Helper function to get rule handler
export function getRuleHandler(name: string) {
  return rules[name as keyof typeof rules];
}

// Priority-aware helper function to get rule handler
export function getPriorityRuleHandler(name: string) {
  return priorityRegistry.getHandler(name);
}

// Get rule with priority information
export function getRuleWithPriority(name: string) {
  return priorityRegistry.getRule(name);
}

// Export priority registry for debugging
export { priorityRegistry };