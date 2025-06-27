import { typographyRules } from './style';
import { layoutRules } from './layout';
import { visualRules } from './style';
import { positionCategoryRules } from './position';
import { interactionRules } from './interaction';
import { utilityRules } from './utilities';
import { effectsRules } from './effects';
import { glowRules, glassRules, cardRules, responsiveRules, advancedRules, adminRules, containerRules, animationRules, buttonRules, headingRules, uiCardRules, proseRules, mdxRules, sectionRules, designSystemRules, masterInspiredRules } from '../extensions';
import { colorRules } from '../design-system/colors/colors';
import { priorityRegistry } from './priority-registry';
import { RulePriority } from './types';

// Register rules with their appropriate priority levels
// COMPONENT level (Priority 100) - broad component rules
priorityRegistry.registerBulk(cardRules, RulePriority.COMPONENT);
priorityRegistry.registerBulk(buttonRules, RulePriority.COMPONENT);
priorityRegistry.registerBulk(headingRules, RulePriority.COMPONENT);
priorityRegistry.registerBulk(uiCardRules, RulePriority.COMPONENT);
priorityRegistry.registerBulk(proseRules, RulePriority.COMPONENT);
priorityRegistry.registerBulk(mdxRules, RulePriority.COMPONENT);
priorityRegistry.registerBulk(sectionRules, RulePriority.COMPONENT);
priorityRegistry.registerBulk(designSystemRules, RulePriority.COMPONENT);

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
priorityRegistry.registerBulk(masterInspiredRules, RulePriority.UTILITY);
priorityRegistry.registerBulk(interactionRules, RulePriority.UTILITY);

// STATE/RESPONSIVE level (Priority 400-500) - handled by responsive decorator
priorityRegistry.registerBulk(responsiveRules, RulePriority.STATE);
priorityRegistry.registerBulk(advancedRules, RulePriority.STATE);
priorityRegistry.registerBulk(adminRules, RulePriority.STATE);

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
  ...cardRules,
  ...responsiveRules,
  ...advancedRules,
  ...adminRules,
  ...buttonRules,
  ...headingRules,
  ...uiCardRules,
  ...proseRules,
  ...mdxRules,
  ...containerRules,
  ...animationRules.rules,
  ...sectionRules,
  ...designSystemRules,
  ...masterInspiredRules
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
    card: cardRules,
    responsive: responsiveRules,
    advanced: advancedRules,
    admin: adminRules,
    button: buttonRules,
    heading: headingRules,
    uiCard: uiCardRules,
    prose: proseRules,
    mdx: mdxRules,
    container: containerRules,
    animations: animationRules.rules
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