/**
 * Central rule definitions
 * Single source of truth for all 03-rules and groups
 */

import { RulePriority } from './types';
import type { RuleHandler, KeywordRuleHandler } from './types';

// Import all rule modules - centralized from index files
import { insetRules, scrollMt, scrollMb, scrollMl, scrollMr, scrollM } from './layout';
import { visualRules } from './style';
import { colorRules } from '../02-design_tokens/design-system/colors/colors';
import { interactionRules } from './interaction';
import { utilityRules } from './utilities/utilities';
import { effectsRules } from './effects';

// Extensions
import { 
  glowRules, glassRules, figmaComponents, 
  animationRules, glassmorphismRules
} from '../05-plugins';

// Components
import {
  buttonRules, headingRules, displayTextRules, titleRules,
  bodyRules, labelRules, captionRules, cardRules, inputRules,
  badgeRules, iconBoxRules, codeBlockRules, codeRule,
  menuRules, menuItemRules
} from '../04-components/primitives';
import {
  heroRules, sectionRules, referenceRules, docsRules,
  featureCardRules, typographyHelperRules, containerRules, proseRules
} from '../04-components/patterns';

// Type definitions for rule groups
export interface RuleSubgroup {
  name: string;
  rules: Record<string, RuleHandler | KeywordRuleHandler>;
  description?: string;
}

export interface RuleGroupDefinition {
  name: string;
  priority: RulePriority;
  subgroups: Record<string, RuleSubgroup>;
  type?: 'css' | 'string';
  layer?: 'base' | 'components' | 'composition' | 'utilities';
}

export interface RuleDefinitions {
  [key: string]: RuleGroupDefinition;
}

/**
 * Central rule group definitions - FIGMA FIRST ORDER
 * This is the single source of truth for all 03-rules
 * 
 * FIGMA DESIGN PANEL ORDER:
 * 1. Position (X, Y coordinates) - FIRST in Figma
 * 2. Auto Layout (Layout & Spacing)
 * 3. Fill & Stroke (Colors & Backgrounds) 
 * 4. Text (Typography)
 * 5. CSS (Properties not in Figma)
 * 6. Interaction (States & Animation)
 * 7. Additional utilities
 */
export const RULE_GROUPS: RuleDefinitions = {
  // Note: Text group rules migrated to Rule2

  // 🔗 1. POSITION - Migrated to Rule2
  // See: /src/03-rules2-v2/figma/layout/position.ts

  // 📐 2. LAYOUT - Figma's Auto Layout panel
  autoLayout: {
    name: 'Layout',
    priority: RulePriority.LAYOUT,
    layer: 'composition',
    subgroups: {
      // All autoLayout rules migrated to Rule2
      // See: /src/03-rules2-v2/figma/layout/autoLayout.ts
      // See: /src/03-rules2-v2/figma/layout/gap.ts
      // See: /src/03-rules2-v2/figma/layout/padding.ts
      // See: /src/03-rules2-v2/figma/layout/size.ts
    }
  },

  // Visual Group - Figma Appearance (Fill/Stroke/Effects)
  visual: {
    name: 'Visual',
    priority: RulePriority.UTILITY,
    layer: 'utilities',
    subgroups: {
      colors: {
        name: 'Fill',
        rules: colorRules,
      },
      // Note: border and radius rules migrated to Rule2
      // Note: effects rules (opacity, blur, etc.) migrated to Rule2
    }
  },

  css: {
    name: 'CSS',
    priority: RulePriority.UTILITY,
    layer: 'utilities',
    subgroups: {
      // All CSS layout rules migrated to Rule2
      // See: /src/03-rules2-v2/misc-css/margin.ts
      // See: /src/03-rules2-v2/misc-css/display.ts
      // See: /src/03-rules2-v2/misc-css/flexbox.ts
      // See: /src/03-rules2-v2/figma/layout/grid.ts
      // See: /src/03-rules2-v2/figma/layout/overflow.ts
      positioning: {
        name: 'Positioning',
        rules: {
          ...insetRules,
          'scroll-mt': scrollMt,
          'scroll-mb': scrollMb,
          'scroll-ml': scrollMl,
          'scroll-mr': scrollMr,
          'scroll-m': scrollM,
        },
      },
      container: {
        name: 'Container',
        rules: containerRules,
      }
    }
  },

  // Interaction Group - Figma Prototype
  interaction: {
    name: 'Interaction',
    priority: RulePriority.UTILITY,
    layer: 'utilities',
    subgroups: {
      states: {
        name: 'States',
        rules: interactionRules,
      },
      animation: {
        name: 'Animation',
        rules: animationRules,
      }
    }
  },

  // Utilities Group
  utilities: {
    name: 'Utilities',
    priority: RulePriority.UTILITY,
    layer: 'utilities',
    subgroups: {
      misc: {
        name: 'Miscellaneous',
        rules: utilityRules,
      }
    }
  },

  // Responsive Group - SPEC'D OUT
  // responsive: {
  //   name: 'Responsive',
  //   priority: RulePriority.STATE,
  //   subgroups: {
  //     breakpoints: {
  //       name: 'Breakpoints',
  //       03-rules: responsiveRules,
  //     }
  //   }
  // },

  // Components Group - CSS-based component 03-rules
  components: {
    name: 'Components',
    priority: RulePriority.COMPONENT,
    layer: 'components',
    subgroups: {
      patterns: {
        name: 'Patterns',
        rules: {
          ...figmaComponents,
        },
      },
      features: {
        name: 'Features',
        rules: {
          ...glowRules,
          ...glassRules,
          ...glassmorphismRules,
        },
      }
    }
  }
};


// String-based component 03-rules (handled separately due to different type)
export const STRING_RULE_GROUPS = {
  hero: { rules: heroRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  section: { rules: sectionRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  reference: { rules: referenceRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  docs: { rules: docsRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  button: { rules: buttonRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  heading: { rules: headingRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  display: { rules: displayTextRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  title: { rules: titleRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  body: { rules: bodyRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  label: { rules: labelRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  caption: { rules: captionRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  card: { rules: cardRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  input: { rules: inputRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  badge: { rules: badgeRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  iconBox: { rules: iconBoxRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  codeBlock: { rules: codeBlockRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  code: { rules: codeRule, priority: RulePriority.COMPONENT, layer: 'components' as const },
  menu: { rules: menuRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  menuItem: { rules: menuItemRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  featureCard: { rules: featureCardRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  typographyHelpers: { rules: typographyHelperRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
  prose: { rules: proseRules, priority: RulePriority.COMPONENT, layer: 'components' as const },
};

/**
 * Helper function to flatten rule groups into a single object
 */
export function flattenRuleGroups(groups: RuleDefinitions): Record<string, RuleHandler | KeywordRuleHandler> {
  const flatRules: Record<string, RuleHandler | KeywordRuleHandler> = {};
  
  Object.values(groups).forEach(group => {
    Object.values(group.subgroups).forEach(subgroup => {
      Object.assign(flatRules, subgroup.rules);
    });
  });
  
  return flatRules;
}


