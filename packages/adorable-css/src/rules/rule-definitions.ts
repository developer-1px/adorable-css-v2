/**
 * Central rule definitions
 * Single source of truth for all rules and groups
 */

import { RulePriority } from './types';
import type { RuleHandler, KeywordRuleHandler } from './types';

// Import all rule modules - centralized from index files
import { 
  displayRules, sizeRules, spacingRules, gridRules, 
  overflowRules, insetRules, scrollMt, scrollMb, scrollMl, scrollMr, scrollM 
} from './layout';
import { typographyRules, visualRules } from './style';
import { colorRules } from '../design-system/colors/colors';
import { positionCategoryRules } from './position';
import { interactionRules } from './interaction';
import { utilityRules } from './utilities/utilities';
import { effectsRules } from './effects';

// Extensions
import { 
  glowRules, glassRules, figmaComponents, 
  animationRules, glassmorphismRules
} from '../extensions';

// Components
import {
  buttonRules, headingRules, displayTextRules, titleRules,
  bodyRules, labelRules, captionRules, cardRules, inputRules,
  badgeRules, iconBoxRules, codeBlockRules, codeRule,
  menuRules, menuItemRules
} from '../components/primitives';
import {
  heroRules, sectionRules, referenceRules, docsRules,
  featureCardRules, typographyHelperRules, containerRules, proseRules
} from '../components/patterns';

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
 * This is the single source of truth for all rules
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
  // Text Group - Figma Text Properties
  text: {
    name: 'Text',
    priority: RulePriority.UTILITY,
    layer: 'utilities',
    subgroups: {
      typography: {
        name: 'Typography',
        rules: typographyRules,
      },
      layout: {
        name: 'Text Layout',
        rules: {
          text: typographyRules.text
        },
      }
    }
  },

  // 🔗 1. POSITION - Figma's Position (X, Y) - FIRST!
  position: {
    name: 'Position',
    priority: RulePriority.LAYOUT,
    layer: 'utilities',
    subgroups: {
      position: {
        name: 'Position & Layer',
        rules: positionCategoryRules,
      }
    }
  },

  // 📐 2. LAYOUT - Figma's Auto Layout panel
  autoLayout: {
    name: 'Layout',
    priority: RulePriority.LAYOUT,
    layer: 'composition',
    subgroups: {
      autoLayout: {
        name: 'Auto Layout',
        rules: {
          hbox: displayRules.hbox,
          vbox: displayRules.vbox,
          wrap: displayRules.wrap,
          pack: displayRules.pack,
        },
      },
      gap: {
        name: 'Gap',
        rules: {
          gap: spacingRules.gap,
        },
      },
      padding: {
        name: 'Padding',
        rules: {
          p: spacingRules.p,
          px: spacingRules.px,
          py: spacingRules.py,
          pt: spacingRules.pt,
          pb: spacingRules.pb,
          pl: spacingRules.pl,
          pr: spacingRules.pr,
        },
      },
      sizing: {
        name: 'Sizing',
        rules: sizeRules,
      },
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
      borders: {
        name: 'Borders & Radius',
        rules: {
          ...visualRules
        },
      },
      Radius: {
        name: 'Radius',
        rules: {
          r: visualRules.r,
        },
      },
      effects: {
        name: 'Effects',
        rules: {
          ...effectsRules,
        },
      },
    }
  },

  css: {
    name: 'CSS',
    priority: RulePriority.UTILITY,
    layer: 'utilities',
    subgroups: {
      margin: {
        name: 'Margin',
        rules: {
          m: spacingRules.m,
          mx: spacingRules.mx,
          my: spacingRules.my,
          mt: spacingRules.mt,
          mb: spacingRules.mb,
          ml: spacingRules.ml,
          mr: spacingRules.mr,
        },
      },
      display: {
        name: 'Display',
        rules: {
          block: displayRules.block,
          inline: displayRules.inline,
          'inline-block': displayRules['inline-block'],
          // 'inline-flex': displayRules['inline-flex'], // Deprecated - use hbox/vbox
          none: displayRules.none,
          hidden: displayRules.hidden,
        },
      },

      flexbox: {
        name: 'Flexbox',
        rules: {
          items: displayRules.items,
          justify: displayRules.justify,
          flex: displayRules.flex,
          shrink: displayRules.shrink,
          grow: displayRules.grow,
          'flex-wrap': displayRules['flex-wrap'],
        },
      },

      grid: {
        name: 'Grid',
        rules: gridRules,
      },
      overflow: {
        name: 'Overflow',
        rules: overflowRules,
      },
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
  //       rules: responsiveRules,
  //     }
  //   }
  // },

  // Components Group - CSS-based component rules
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


// String-based component rules (handled separately due to different type)
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


