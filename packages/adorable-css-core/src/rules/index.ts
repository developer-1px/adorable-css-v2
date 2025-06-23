import { typographyRules } from './typography';
import { layoutRules } from './layout';
import { visualRules } from './visuals';
import { positionCategoryRules } from './position';
import { interactionRules } from './interaction';
import { utilityRules } from './utilities';

// Main rules registry
export const rules = {
  ...typographyRules,
  ...layoutRules,
  ...visualRules,
  ...positionCategoryRules,
  ...interactionRules,
  ...utilityRules
};

// Helper function to get rule handler
export function getRuleHandler(name: string) {
  return rules[name as keyof typeof rules];
}