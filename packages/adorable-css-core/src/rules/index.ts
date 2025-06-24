import { typographyRules } from './typography';
import { layoutRules } from './layout';
import { visualRules } from './visuals';
import { positionCategoryRules } from './position';
import { interactionRules } from './interaction';
import { utilityRules } from './utilities';
import { effectsRules } from './effects';
import { glowRules, glassRules, cardRules, responsiveRules, advancedRules, adminRules } from './plugins';
import { headingRules } from './plugins/heading';

// Main rules registry
export const rules = {
  ...typographyRules,
  ...layoutRules,
  ...visualRules,
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
  ...headingRules
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
    heading: headingRules
  }
};

// Helper function to get rule handler
export function getRuleHandler(name: string) {
  return rules[name as keyof typeof rules];
}