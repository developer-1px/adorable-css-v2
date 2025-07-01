import { priorityRegistry } from './priority-registry';
import { 
  RULE_GROUPS, 
  STRING_RULE_GROUPS,
  flattenRuleGroups, 
  extractGroupedRules,
  generateRuleMetadata
} from './rule-definitions';
import type { EnhancedRuleDefinition } from './types';

// Register all rules with metadata from central definitions
Object.entries(RULE_GROUPS).forEach(([groupKey, group]) => {
  Object.entries(group.subgroups).forEach(([subgroupKey, subgroup]) => {
    Object.entries(subgroup.rules).forEach(([ruleName, handler]) => {
      // Generate metadata for each rule
      const metadata = generateRuleMetadata(ruleName, group, subgroup);
      
      // Create enhanced rule definition
      const enhancedRule: EnhancedRuleDefinition = {
        handler,
        priority: group.priority,
        metadata,
        description: metadata.description
      };
      
      // Register with metadata
      priorityRegistry.registerWithMetadata(ruleName, enhancedRule);
    });
  });
});

// Register string-based component rules with metadata
Object.entries(STRING_RULE_GROUPS).forEach(([groupKey, { rules, priority }]) => {
  // Create metadata for string rules
  Object.entries(rules).forEach(([ruleName, handler]) => {
    const metadata = {
      group: 'Components',
      subgroup: groupKey.charAt(0).toUpperCase() + groupKey.slice(1),
      description: `${groupKey} component`,
      syntax: `${ruleName}`,
      examples: [`${ruleName}`],
      figmaEquivalent: 'Component'
    };
    
    priorityRegistry.registerStringWithMetadata(ruleName, {
      handler,
      priority,
      metadata,
      description: metadata.description,
      isStringRule: true
    });
  });
});

// Generate flat rules from central definitions
export const rules = flattenRuleGroups(RULE_GROUPS);

// Generate grouped rules for backward compatibility
export const groupedRules = extractGroupedRules(RULE_GROUPS);

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

// Export priority registry and enhanced types for debugging and inspector
export { priorityRegistry };
export type { RuleMetadata, RuleInfo, RuleGroup, RuleGroupInfo } from './types';

// Export RULE_GROUPS for direct access
export { RULE_GROUPS } from './rule-definitions';