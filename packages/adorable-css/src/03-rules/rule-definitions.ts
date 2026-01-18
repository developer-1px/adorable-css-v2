/**
 * Central rule definitions
 * Single source of truth for all 03-rules and groups
 */

import { RulePriority } from './types';
import type { RuleHandler, KeywordRuleHandler } from './types';

// Import all rule modules - centralized from index files
import {
  displayRules, sizeRules, spacingRules, gridRules,
  overflowRules, insetRules, divideRules, scrollMt, scrollMb, scrollMl, scrollMr, scrollM, visibilityRules
} from './layout';
import { typographyRules, visualRules } from './style';
import { colorRules } from '../02-design_tokens/design-system/colors/colors';
import { positionCategoryRules } from './position';
import { interactionRules, transitionRules } from './interaction';
import { utilityRules } from './utilities/utilities';
import { effectsRules } from './effects';
import { letterSpacing } from './text/text-misc';
import { bold, medium, semibold, light } from './text/bold';
import { duration } from './interaction/transitions';

// Extensions
import {
  glowRules, debugUIComponents,
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
          text: typographyRules.text,
          tracking: letterSpacing, // Map tracking to letterSpacing handler
          leading: typographyRules.line, // Map leading to line-height handler while we are at it
          font: typographyRules.font, // Ensure font is mapped
          bold: bold,
          medium: medium,
          semibold: semibold,
          light: light,
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
          block: displayRules.block,
          inline: displayRules.inline,
          "inline-block": displayRules["inline-block"],
          none: displayRules.none,
          hidden: displayRules.hidden,
          wrap: displayRules.wrap,
          pack: displayRules.pack,
          vpack: displayRules.vpack,
          grid: gridRules.grid,
          "grid-cols": gridRules["grid-cols"],
          "grid-rows": gridRules["grid-rows"],
          "col-span": gridRules["col-span"],
          "row-span": gridRules["row-span"],
          "grid-align": gridRules["grid-align"],
          "grid-justify": gridRules["grid-justify"],
          "grid-place": gridRules["grid-place"],
        },
      },
      gap: {
        name: 'Gap',
        rules: {
          gap: spacingRules.gap,
          vgap: spacingRules.vgap,
          hgap: spacingRules.hgap,
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
      overflow: {
        name: 'Overflow',
        rules: overflowRules,
      },
      visibility: {
        name: 'Visibility',
        rules: visibilityRules,
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
          ...visualRules,
          ...divideRules,
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
          // Negative Margins
          '-m': spacingRules.m_neg,
          '-mx': spacingRules.mx_neg,
          '-my': spacingRules.my_neg,
          '-mt': spacingRules.mt_neg,
          '-mb': spacingRules.mb_neg,
          '-ml': spacingRules.ml_neg,
          '-mr': spacingRules.mr_neg,
        },
      },
      container: {
        name: 'Container',
        rules: containerRules,
      },
    },
  },

  // Interaction Group - Figma Prototype
  interaction: {
    name: 'Interaction',
    priority: RulePriority.UTILITY,
    layer: 'utilities',
    subgroups: {
      states: {
        name: 'States',
        rules: {
          ...interactionRules,
          ...transitionRules,
        },
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
      },
      scroll: {
        name: 'Scroll',
        rules: {
          scrollMt,
          scrollMb,
          scrollMl,
          scrollMr,
          scrollM,
        },
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
          ...debugUIComponents,
        },
      },
      features: {
        name: 'Features',
        rules: {
          ...glowRules,
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


