import { priorityRegistry } from './priority-registry';
import { 
  RULE_GROUPS, 
  STRING_RULE_GROUPS,
  flattenRuleGroups
} from './rule-definitions';
import type { StringRuleHandler, KeywordStringRuleHandler } from './types';

// Register all 03-rules from central definitions
Object.entries(RULE_GROUPS).forEach(([groupName, group]) => {
  if (!group || !group.subgroups) {
    console.warn(`Invalid group: ${groupName}`, group);
    return;
  }
  
  Object.entries(group.subgroups).forEach(([subgroupName, subgroup]) => {
    if (!subgroup || !subgroup.rules) {
      console.warn(`Invalid subgroup: ${groupName}.${subgroupName}`, subgroup);
      return;
    }
    
    Object.entries(subgroup.rules).forEach(([ruleName, handler]) => {
      if (!handler) {
        console.warn(`Invalid handler for rule: ${groupName}.${subgroupName}.${ruleName}`, handler);
        return;
      }
      
      // Register rule with layer information
      priorityRegistry.register(ruleName, handler, group.priority, `${subgroup.name} utility`, group.layer);
    });
  });
});

// Register string-based component 03-rules
Object.entries(STRING_RULE_GROUPS).forEach(([groupName, ruleGroup]) => {
  if (!ruleGroup || !ruleGroup.rules) {
    console.warn(`Invalid string rule group: ${groupName}`, ruleGroup);
    return;
  }
  
  Object.entries(ruleGroup.rules).forEach(([ruleName, handler]) => {
    if (!handler) {
      console.warn(`Invalid handler for string rule: ${groupName}.${ruleName}`, handler);
      return;
    }
    
    priorityRegistry.registerString(ruleName, {
      handler: handler as StringRuleHandler | KeywordStringRuleHandler,
      priority: ruleGroup.priority,
      isStringRule: true,
      layer: ruleGroup.layer
    });
  });
});

// Generate flat 03-rules from central definitions
export const rules = flattenRuleGroups(RULE_GROUPS);


// Get rule handler (fallback: priorityRegistry -> flat 03-rules)
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