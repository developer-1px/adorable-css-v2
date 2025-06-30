/**
 * Central rule definitions with metadata
 * Single source of truth for all rules, groups, and metadata
 */

import { RulePriority } from './types';
import type { RuleHandler, KeywordRuleHandler, RuleMetadata } from './types';

// Import all rule modules
import { displayRules } from './layout/display';
import { sizeRules } from './layout/size';
import { spacingRules } from './layout/spacing';
import { gridRules } from './layout/grid';
import { overflowRules } from './layout/overflow';
import { insetRules } from './layout/inset';
import { scrollMt, scrollMb, scrollMl, scrollMr, scrollM } from './layout/scroll-margin';

import { typographyRules } from './style';
import { visualRules } from './style';
import { colorRules } from '../design-system/colors/colors';

import { positionCategoryRules } from './position';
import { interactionRules } from './interaction';
import { utilityRules } from './utilities/utilities';
import { effectsRules } from './effects';

// Extensions
import { 
  glowRules, 
  glassRules, 
  figmaComponents, 
  responsiveRules, 
  containerRules, 
  animationRules,
  proseRules
} from '../extensions';

// Components
import { heroRules } from '../components/patterns/hero';
import { sectionRules } from '../components/patterns/section';
import { referenceRules } from '../components/patterns/reference';
import { docsRules } from '../components/patterns/docs';
import { buttonRules } from '../components/primitives/button';
import { headingRules } from '../components/primitives/heading';
import { displayTextRules } from '../components/primitives/display';
import { titleRules } from '../components/primitives/title';
import { bodyRules } from '../components/primitives/body';
import { labelRules } from '../components/primitives/label';
import { captionRules } from '../components/primitives/caption';
import { cardRules } from '../components/primitives/card';
import { inputRules } from '../components/primitives/input';
import { badgeRules } from '../components/primitives/badge';
import { iconBoxRules } from '../components/primitives/icon-box';
import { codeBlockRules } from '../components/primitives/code-block';
import { featureCardRules } from '../components/patterns/feature-card';
import { typographyHelperRules } from '../components/patterns/typography-helpers';

// Type definitions for rule groups
export interface RuleSubgroup {
  name: string;
  rules: Record<string, RuleHandler | KeywordRuleHandler>;
  metadata?: Partial<RuleMetadata>;
  description?: string;
}

export interface RuleGroupDefinition {
  name: string;
  priority: RulePriority;
  metadata?: {
    group: string;
    figmaSection?: string;
    description?: string;
  };
  subgroups: Record<string, RuleSubgroup>;
  type?: 'css' | 'string';
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
  // 🔗 1. POSITION - Figma's Position (X, Y) - FIRST!
  position: {
    name: 'Position',
    priority: RulePriority.LAYOUT,
    metadata: {
      group: 'Position',
      figmaSection: 'Position (X, Y)',
      description: 'Figma Position - positioning, constraints, layers'
    },
    subgroups: {
      position: {
        name: 'Position & Layer',
        rules: positionCategoryRules,
        metadata: { 
          subgroup: 'Position',
          figmaEquivalent: 'Position (X, Y) & Constraints'
        }
      }
    }
  },

  // 📐 2. AUTO LAYOUT - Figma's Auto Layout panel
  autoLayout: {
    name: 'Auto Layout',
    priority: RulePriority.LAYOUT,
    metadata: {
      group: 'Auto Layout',
      figmaSection: 'Auto Layout',
      description: 'Figma Auto Layout - flexbox, spacing, sizing'
    },
    subgroups: {
      autoLayout: {
        name: 'Auto Layout',
        rules: {
          hbox: displayRules.hbox,
          vbox: displayRules.vbox,
          wrap: displayRules.wrap,
          pack: displayRules.pack,
          items: displayRules.items,
          justify: displayRules.justify,
          flex: displayRules.flex,
          shrink: displayRules.shrink,
          grow: displayRules.grow,
          'flex-wrap': displayRules['flex-wrap'],
        },
        metadata: { 
          subgroup: 'Auto Layout',
          figmaEquivalent: 'Auto Layout'
        }
      },
      sizing: {
        name: 'Sizing',
        rules: sizeRules,
        metadata: { 
          subgroup: 'Sizing',
          figmaEquivalent: 'Width & Height'
        }
      },
      gap: {
        name: 'Gap',
        rules: {
          gap: spacingRules.gap,
        },
        metadata: { 
          subgroup: 'Gap',
          figmaEquivalent: 'Gap'
        }
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
        metadata: { 
          subgroup: 'Padding',
          figmaEquivalent: 'Padding'
        }
      },
    }
  },

  // Visual Group - Figma Appearance (Fill/Stroke/Effects)
  visual: {
    name: 'Visual',
    priority: RulePriority.UTILITY,
    metadata: {
      group: 'Visual',
      figmaSection: 'Appearance',
      description: 'Visual appearance - fill, stroke, effects'
    },
    subgroups: {
      colors: {
        name: 'Colors',
        rules: colorRules,
        metadata: { 
          subgroup: 'Colors',
          figmaEquivalent: 'Fill'
        }
      },
      borders: {
        name: 'Borders & Radius',
        rules: {
          b: visualRules.b,
          bt: visualRules.bt,
          br: visualRules.br,
          bb: visualRules.bb,
          bl: visualRules.bl,
          r: visualRules.r,
        },
        metadata: { 
          subgroup: 'Borders & Radius',
          figmaEquivalent: 'Stroke & Corner Radius'
        }
      },
      effects: {
        name: 'Effects',
        rules: {
          ...visualRules,
          ...effectsRules,
        },
        metadata: { 
          subgroup: 'Effects',
          figmaEquivalent: 'Effects'
        }
      },
      background: {
        name: 'Background',
        rules: {},
        metadata: { 
          subgroup: 'Background'
        }
      }
    }
  },

  // Text Group - Figma Text Properties
  text: {
    name: 'Text',
    priority: RulePriority.UTILITY,
    metadata: {
      group: 'Text',
      figmaSection: 'Text',
      description: 'Typography and text styling'
    },
    subgroups: {
      typography: {
        name: 'Typography',
        rules: typographyRules,
        metadata: { 
          subgroup: 'Typography',
          figmaEquivalent: 'Text Properties'
        }
      }
    }
  },

  css: {
    name: 'CSS',
    priority: RulePriority.UTILITY,
    metadata: {
      group: 'CSS',
      description: 'CSS-specific properties not in Figma'
    },
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
        metadata: {
          subgroup: 'Margin',
          figmaEquivalent: 'Not available in Figma'
        }
      },
      display: {
        name: 'Display',
        rules: {
          block: displayRules.block,
          inline: displayRules.inline,
          'inline-block': displayRules['inline-block'],
          'inline-flex': displayRules['inline-flex'],
          none: displayRules.none,
          hidden: displayRules.hidden,
        },
        metadata: {
          subgroup: 'Display',
          figmaEquivalent: 'Advanced CSS Properties'
        }
      },
      grid: {
        name: 'Grid',
        rules: gridRules,
        metadata: {
          subgroup: 'Grid',
          figmaEquivalent: 'CSS Grid'
        }
      },
      overflow: {
        name: 'Overflow',
        rules: overflowRules,
        metadata: {
          subgroup: 'Overflow',
          figmaEquivalent: 'Scroll behavior'
        }
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
        metadata: {
          subgroup: 'Positioning',
          figmaEquivalent: 'Advanced positioning'
        }
      },
      container: {
        name: 'Container',
        rules: containerRules,
        metadata: {
          subgroup: 'Container',
          figmaEquivalent: 'Frame Constraints'
        }
      }
    }
  },

  // Interaction Group - Figma Prototype
  interaction: {
    name: 'Interaction',
    priority: RulePriority.UTILITY,
    metadata: {
      group: 'Interaction',
      figmaSection: 'Prototype',
      description: 'Interactive behaviors'
    },
    subgroups: {
      states: {
        name: 'States',
        rules: interactionRules,
        metadata: { 
          subgroup: 'States',
          figmaEquivalent: 'Interactive Components'
        }
      },
      animation: {
        name: 'Animation',
        rules: animationRules.rules,
        metadata: { 
          subgroup: 'Animation',
          figmaEquivalent: 'Smart Animate'
        }
      }
    }
  },

  // Utilities Group
  utilities: {
    name: 'Utilities',
    priority: RulePriority.UTILITY,
    metadata: {
      group: 'Utilities',
      description: 'Utility helpers'
    },
    subgroups: {
      misc: {
        name: 'Miscellaneous',
        rules: utilityRules,
        metadata: { 
          subgroup: 'Miscellaneous'
        }
      }
    }
  },

  // Responsive Group
  responsive: {
    name: 'Responsive',
    priority: RulePriority.STATE,
    metadata: {
      group: 'Responsive',
      description: 'Responsive modifiers'
    },
    subgroups: {
      breakpoints: {
        name: 'Breakpoints',
        rules: responsiveRules,
        metadata: { 
          subgroup: 'Breakpoints'
        }
      }
    }
  },

  // Components Group - CSS-based component rules
  components: {
    name: 'Components',
    priority: RulePriority.COMPONENT,
    metadata: {
      group: 'Components',
      figmaSection: 'Components',
      description: 'Pre-built component patterns'
    },
    subgroups: {
      patterns: {
        name: 'Patterns',
        rules: {
          ...figmaComponents,
          ...proseRules,
        },
        metadata: { 
          subgroup: 'Patterns',
          figmaEquivalent: 'Component Patterns'
        }
      },
      features: {
        name: 'Features',
        rules: {
          ...glowRules,
          ...glassRules,
        },
        metadata: { 
          subgroup: 'Features',
          figmaEquivalent: 'Visual Effects'
        }
      }
    }
  }
};

// Import prose component
import { prose } from '../components/patterns/prose';

// String-based component rules (handled separately due to different type)
export const STRING_RULE_GROUPS = {
  hero: { rules: heroRules, priority: RulePriority.COMPONENT },
  section: { rules: sectionRules, priority: RulePriority.COMPONENT },
  reference: { rules: referenceRules, priority: RulePriority.COMPONENT },
  docs: { rules: docsRules, priority: RulePriority.COMPONENT },
  button: { rules: buttonRules, priority: RulePriority.COMPONENT },
  heading: { rules: headingRules, priority: RulePriority.COMPONENT },
  display: { rules: displayTextRules, priority: RulePriority.COMPONENT },
  title: { rules: titleRules, priority: RulePriority.COMPONENT },
  body: { rules: bodyRules, priority: RulePriority.COMPONENT },
  label: { rules: labelRules, priority: RulePriority.COMPONENT },
  caption: { rules: captionRules, priority: RulePriority.COMPONENT },
  card: { rules: cardRules, priority: RulePriority.COMPONENT },
  input: { rules: inputRules, priority: RulePriority.COMPONENT },
  badge: { rules: badgeRules, priority: RulePriority.COMPONENT },
  iconBox: { rules: iconBoxRules, priority: RulePriority.COMPONENT },
  codeBlock: { rules: codeBlockRules, priority: RulePriority.COMPONENT },
  featureCard: { rules: featureCardRules, priority: RulePriority.COMPONENT },
  typographyHelpers: { rules: typographyHelperRules, priority: RulePriority.COMPONENT },
  prose: { rules: { prose }, priority: RulePriority.COMPONENT },
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

/**
 * Extract grouped rules for backward compatibility
 */
export function extractGroupedRules(groups: RuleDefinitions) {
  const grouped: Record<string, any> = {};
  
  // Layout rules (combine position + autoLayout)
  grouped.layout = {};
  if (groups.position?.subgroups) {
    Object.values(groups.position.subgroups).forEach(subgroup => {
      Object.assign(grouped.layout, subgroup.rules);
    });
  }
  if (groups.autoLayout?.subgroups) {
    Object.values(groups.autoLayout.subgroups).forEach(subgroup => {
      Object.assign(grouped.layout, subgroup.rules);
    });
  }
  
  // Typography rules
  grouped.typography = groups.visual?.subgroups?.typography?.rules || {};
  
  // Visual rules
  grouped.visuals = {};
  if (groups.visual?.subgroups) {
    Object.values(groups.visual.subgroups).forEach(subgroup => {
      Object.assign(grouped.visuals, subgroup.rules);
    });
  }
  
  // Position rules
  grouped.position = groups.position?.subgroups?.position?.rules || {};
  
  // Interaction rules
  grouped.interaction = groups.interaction?.subgroups?.states?.rules || {};
  
  // Utilities
  grouped.utilities = groups.utilities?.subgroups?.misc?.rules || {};
  
  // Effects
  grouped.effects = groups.visual?.subgroups?.effects?.rules || {};
  
  // Plugins (with safe access)
  grouped.plugins = {
    responsive: groups.responsive?.subgroups?.breakpoints?.rules || {},
    container: groups.autoLayout?.subgroups?.container?.rules || {},
  };
  
  return grouped;
}

/**
 * Generate metadata for a rule based on its group and subgroup
 */
export function generateRuleMetadata(
  ruleName: string,
  group: RuleGroupDefinition,
  subgroup: RuleSubgroup
): RuleMetadata {
  return {
    group: group.metadata?.group || group.name,
    subgroup: subgroup.metadata?.subgroup || subgroup.name,
    description: `${subgroup.name} utility`,
    syntax: `${ruleName}(value)`,
    examples: [`${ruleName}(16)`, `${ruleName}(auto)`],
    figmaEquivalent: subgroup.metadata?.figmaEquivalent,
  };
}