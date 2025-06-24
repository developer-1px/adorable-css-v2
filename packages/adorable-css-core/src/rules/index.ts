import { typographyRules } from './typography';
import { layoutRules } from './layout';
import { visualRules } from './visuals';
import { positionCategoryRules } from './position';
import { interactionRules } from './interaction';
import { utilityRules } from './utilities';
import { glowRules, glassRules, cardRules, responsiveRules, advancedRules, adminRules } from './plugins';

// Main rules registry
export const rules = {
  ...typographyRules,
  ...layoutRules,
  ...visualRules,
  ...positionCategoryRules,
  ...interactionRules,
  ...utilityRules,
  ...glowRules,
  ...glassRules,
  ...cardRules,
  ...responsiveRules,
  ...advancedRules,
  ...adminRules
};

// Helper function to get rule handler
export function getRuleHandler(name: string) {
  return rules[name as keyof typeof rules];
}