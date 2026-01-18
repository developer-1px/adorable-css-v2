
import { RulePriority } from './types';
import type { RuleDefinitions } from './types';
import { displayRules, scrollMt, scrollMb, scrollMl, scrollMr, scrollM } from './layout';

/**
 * Extended/Rare rule definitions
 * These are rules that are less commonly used but still part of the system.
 * They are separated to keep the main rule-definitions.ts clean (Pareto Principle).
 */
export const RARE_RULE_GROUPS: RuleDefinitions = {
    extendedLayout: {
        name: 'Extended Layout',
        priority: RulePriority.UTILITY,
        layer: 'utilities',
        subgroups: {
            legacyDisplay: {
                name: 'Legacy Display',
                rules: {
                    inline: displayRules.inline,
                    'inline-block': displayRules['inline-block'],
                    'inline-flex': displayRules['inline-flex'],
                }
            },
            scrollSnaps: {
                name: 'Scroll Snaps',
                rules: {
                    'scroll-mt': scrollMt,
                    'scroll-mb': scrollMb,
                    'scroll-ml': scrollMl,
                    'scroll-mr': scrollMr,
                    'scroll-m': scrollM,
                }
            }
        }
    }
};
