import { layerRegistry, CSSLayer } from './layer-registry';
import { 
  RULE_GROUPS, 
  STRING_RULE_GROUPS,
  flattenRuleGroups, 
  extractGroupedRules,
  generateRuleMetadata
} from './rule-definitions';
import { RulePriority } from './types';

// Map old priority to new layer system
function priorityToLayer(priority: RulePriority): CSSLayer {
  if (priority >= RulePriority.STATE) return CSSLayer.STATE;
  if (priority >= RulePriority.UTILITY) return CSSLayer.UTILITY;
  if (priority >= RulePriority.LAYOUT) return CSSLayer.LAYOUT;
  return CSSLayer.COMPONENT;
}

// Register all rules with metadata from central definitions
Object.entries(RULE_GROUPS).forEach(([groupKey, group]) => {
  Object.entries(group.subgroups).forEach(([subgroupKey, subgroup]) => {
    Object.entries(subgroup.rules).forEach(([ruleName, handler]) => {
      // Generate metadata for each rule
      const metadata = generateRuleMetadata(ruleName, group, subgroup);
      const layer = priorityToLayer(group.priority);
      
      // Register with layer and metadata
      layerRegistry.registerWithMetadata(ruleName, handler, layer, metadata);
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
    
    const layer = priorityToLayer(priority);
    layerRegistry.registerStringWithMetadata(ruleName, handler, layer, metadata);
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

// Layer-aware helper function to get rule handler
export function getLayerRuleHandler(name: string) {
  return layerRegistry.getHandler(name);
}

// Get rule with layer information
export function getRuleWithLayer(name: string) {
  return layerRegistry.getRule(name);
}

// Compatibility exports
export const priorityRegistry = layerRegistry; // Alias for compatibility
export function getPriorityRuleHandler(name: string) {
  return layerRegistry.getHandler(name);
}
export function getRuleWithPriority(name: string) {
  return layerRegistry.getRule(name);
}

// Export layer registry and enhanced types for debugging and inspector
export { layerRegistry };
export type { RuleMetadata, RuleInfo, RuleGroup, RuleGroupInfo } from './types';

// Export RULE_GROUPS for direct access
export { RULE_GROUPS } from './rule-definitions';