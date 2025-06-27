import { typographyRules } from './typography';
import { layoutRules } from './layout';
import { visualRules } from './visuals';
import { positionCategoryRules } from './position';
import { interactionRules } from './interaction';
import { utilityRules } from './utilities';
import { effectsRules } from './effects';
import { glowRules, glassRules, cardRules, responsiveRules, advancedRules, adminRules, containerRules, animationRules, buttonRules, headingRules, headingPluginRules, uiCardRules, proseRules, mdxRules, sectionRules, designSystemRules, masterInspiredRules } from './plugins';
import { colorRules } from '../plugins/colors';

// Main rules registry
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
  ...headingPluginRules,
  ...uiCardRules,
  ...proseRules,
  ...mdxRules,
  ...containerRules,
  ...animationRules,
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
    animations: animationRules
  }
};

// Helper function to get rule handler
export function getRuleHandler(name: string) {
  return rules[name as keyof typeof rules];
}