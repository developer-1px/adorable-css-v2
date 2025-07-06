import { priorityRegistry } from './priority-registry';
import { 
  RULE_GROUPS, 
  STRING_RULE_GROUPS,
  flattenRuleGroups
} from './rule-definitions';

// Register all rules from central definitions
Object.entries(RULE_GROUPS).forEach(([, group]) => {
  Object.entries(group.subgroups).forEach(([, subgroup]) => {
    Object.entries(subgroup.rules).forEach(([ruleName, handler]) => {
      // Register rule with layer information
      priorityRegistry.register(ruleName, handler, group.priority, `${subgroup.name} utility`, group.layer);
    });
  });
});

// Register string-based component rules
Object.entries(STRING_RULE_GROUPS).forEach(([, ruleGroup]) => {
  Object.entries(ruleGroup.rules).forEach(([ruleName, handler]) => {
    priorityRegistry.registerString(ruleName, {
      handler,
      priority: ruleGroup.priority,
      isStringRule: true,
      layer: ruleGroup.layer
    });
  });
});

// Generate flat rules from central definitions
export const rules = flattenRuleGroups(RULE_GROUPS);


// Get rule handler (fallback: priorityRegistry -> flat rules)
export function getRuleHandler(name: string) {
  return priorityRegistry.getHandler(name) || rules[name as keyof typeof rules];
}

// Get rule with priority information
export function getRuleWithPriority(name: string) {
  return priorityRegistry.getAnyRule(name);
}

// Export priority registry
export { priorityRegistry };

// Export RULE_GROUPS for direct access
export { RULE_GROUPS } from './rule-definitions';