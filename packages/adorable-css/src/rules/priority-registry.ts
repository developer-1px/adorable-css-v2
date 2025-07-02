import type { 
  RuleHandler, 
  KeywordRuleHandler, 
  StringRuleHandler, 
  KeywordStringRuleHandler, 
  RuleDefinition, 
  StringRuleDefinition,
  AnyRuleDefinition,
  RuleMetadata,
  EnhancedRuleDefinition,
  EnhancedStringRuleDefinition,
  RuleGroup,
  RuleGroupInfo,
  RuleInfo
} from './types';
import { RulePriority } from './types';

/**
 * Layer-aware rule registry using CSS @layer instead of specificity hacks
 * Rules are organized into CSS layers for natural cascade management
 */
export class PriorityRuleRegistry {
  private rules: Map<string, RuleDefinition | EnhancedRuleDefinition> = new Map();
  private stringRules: Map<string, StringRuleDefinition | EnhancedStringRuleDefinition> = new Map();
  private groups: Map<string, RuleGroup> = new Map();

  /**
   * Register a rule with its priority level
   */
  register(name: string, handler: RuleHandler | KeywordRuleHandler, priority: RulePriority, description?: string): void {
    this.rules.set(name, {
      handler,
      priority,
      description
    });
  }

  /**
   * Register a rule with metadata (enhanced version)
   */
  registerWithMetadata(name: string, definition: EnhancedRuleDefinition): void {
    this.rules.set(name, definition);
    
    // Add to groups if metadata exists
    if (definition.metadata) {
      this._addToGroup(name, definition.metadata);
    }
  }

  /**
   * Register multiple rules with the same priority
   */
  registerBulk(rules: Record<string, RuleHandler | KeywordRuleHandler>, priority: RulePriority): void {
    Object.entries(rules).forEach(([name, handler]) => {
      this.register(name, handler, priority);
    });
  }

  /**
   * Register a string rule with its priority level
   */
  registerString(name: string, handler: StringRuleHandler | KeywordStringRuleHandler, priority: RulePriority, description?: string): void;
  registerString(name: string, definition: StringRuleDefinition): void;
  registerString(name: string, handlerOrDefinition: StringRuleHandler | KeywordStringRuleHandler | StringRuleDefinition, priority?: RulePriority, description?: string): void {
    if (typeof handlerOrDefinition === 'object' && 'handler' in handlerOrDefinition) {
      // Object form: registerString(name, { handler, priority, description })
      this.stringRules.set(name, handlerOrDefinition);
    } else {
      // Function form: registerString(name, handler, priority, description)
      this.stringRules.set(name, {
        handler: handlerOrDefinition as StringRuleHandler | KeywordStringRuleHandler,
        priority: priority!,
        description,
        isStringRule: true
      });
    }
  }

  /**
   * Register multiple string rules with the same priority
   */
  registerStringBulk(rules: Record<string, StringRuleHandler | KeywordStringRuleHandler>, priority: RulePriority): void {
    Object.entries(rules).forEach(([name, handler]) => {
      this.registerString(name, handler, priority);
    });
  }

  /**
   * Register a string rule with metadata (enhanced version)
   */
  registerStringWithMetadata(name: string, definition: EnhancedStringRuleDefinition): void {
    this.stringRules.set(name, definition);
    
    // Add to groups if metadata exists
    if (definition.metadata) {
      this._addToGroup(name, definition.metadata);
    }
  }

  /**
   * Get rule handler by name (CSS object rules only)
   */
  getHandler(name: string): RuleHandler | KeywordRuleHandler | undefined {
    return this.rules.get(name)?.handler;
  }

  /**
   * Get string rule handler by name
   */
  getStringHandler(name: string): StringRuleHandler | KeywordStringRuleHandler | undefined {
    return this.stringRules.get(name)?.handler;
  }

  /**
   * Get any rule handler (string or CSS object)
   */
  getAnyHandler(name: string): RuleHandler | KeywordRuleHandler | StringRuleHandler | KeywordStringRuleHandler | undefined {
    return this.getStringHandler(name) || this.getHandler(name);
  }

  /**
   * Get rule definition with priority (CSS object rules only)
   */
  getRule(name: string): RuleDefinition | EnhancedRuleDefinition | undefined {
    return this.rules.get(name);
  }

  /**
   * Get string rule definition with priority
   */
  getStringRule(name: string): StringRuleDefinition | EnhancedStringRuleDefinition | undefined {
    return this.stringRules.get(name);
  }

  /**
   * Get any rule definition (string or CSS object)
   */
  getAnyRule(name: string): RuleDefinition | StringRuleDefinition | EnhancedRuleDefinition | EnhancedStringRuleDefinition | undefined {
    return this.getStringRule(name) || this.getRule(name);
  }

  /**
   * Get all rules sorted by priority (low to high)
   * Used for CSS generation order
   */
  getRulesByPriority(): Array<[string, RuleDefinition | EnhancedRuleDefinition]> {
    return Array.from(this.rules.entries())
      .sort(([, a], [, b]) => a.priority - b.priority);
  }

  /**
   * Get rules by priority level
   */
  getRulesByPriorityLevel(priority: RulePriority): Array<[string, RuleDefinition | EnhancedRuleDefinition]> {
    return Array.from(this.rules.entries())
      .filter(([, rule]) => rule.priority === priority);
  }

  /**
   * Check if a rule exists (CSS object rules)
   */
  has(name: string): boolean {
    return this.rules.has(name);
  }

  /**
   * Check if a string rule exists
   */
  hasString(name: string): boolean {
    return this.stringRules.has(name);
  }

  /**
   * Check if any rule exists (string or CSS object)
   */
  hasAny(name: string): boolean {
    return this.hasString(name) || this.has(name);
  }

  /**
   * Get all rule names (CSS object rules only)
   */
  getAllRuleNames(): string[] {
    return Array.from(this.rules.keys());
  }

  /**
   * Get all string rule names
   */
  getAllStringRuleNames(): string[] {
    return Array.from(this.stringRules.keys());
  }

  /**
   * Get all rule names (string and CSS object rules)
   */
  getAllAnyRuleNames(): string[] {
    return [...this.getAllStringRuleNames(), ...this.getAllRuleNames()];
  }

  /**
   * Generate CSS with simplified specificity
   * Uses minimal specificity boost only where necessary
   */
  generateCSS(className: string, ruleName: string, args?: string): string {
    const rule = this.getRule(ruleName);
    if (!rule) return '';

    const handler = rule.handler;
    const cssRule = typeof handler === 'function' 
      ? (args !== undefined ? (handler as RuleHandler)(args) : (handler as KeywordRuleHandler)())
      : {};

    // Generate CSS string from rule object
    const cssProperties = Object.entries(cssRule)
      .filter(([, value]) => value !== undefined)
      .map(([property, value]) => `${property}:${value}`)
      .join(';');

    if (!cssProperties) return '';

    // Use simplified selector with minimal specificity boost
    const selector = this.getSimplifiedSelector(className, rule.priority);
    return `${selector}{${cssProperties}}`;
  }

  /**
   * Get CSS layer based on priority
   */
  getLayerFromPriority(priority: RulePriority): string {
    if (priority >= RulePriority.STATE) return 'state';
    if (priority >= RulePriority.UTILITY) return 'utility';
    if (priority >= RulePriority.LAYOUT) return 'layout';
    return 'component';
  }

  /**
   * Generate CSS selector with simplified specificity approach
   */
  private getSimplifiedSelector(className: string, priority: RulePriority): string {
    const baseSelector = `.${className}`;
    
    // Only boost specificity for utilities and states that need to override components
    if (priority >= RulePriority.UTILITY) {
      // Use :where() to avoid specificity issues with nested selectors
      return `:where(${baseSelector})${baseSelector}`;
    }
    
    // Components and layout use simple selectors
    return baseSelector;
  }

  // === GROUP MANAGEMENT METHODS ===

  /**
   * Internal method to add rule to group structure
   */
  private _addToGroup(ruleName: string, metadata: RuleMetadata): void {
    const { group, subgroup } = metadata;
    
    if (!this.groups.has(group)) {
      this.groups.set(group, {
        name: group,
        subgroups: {}
      });
    }
    
    const groupData = this.groups.get(group)!;
    if (!groupData.subgroups[subgroup]) {
      groupData.subgroups[subgroup] = {
        name: subgroup,
        description: `${subgroup} utilities in ${group}`,
        rules: []
      };
    }
    
    groupData.subgroups[subgroup].rules.push(ruleName);
  }

  /**
   * Get all groups
   */
  getAllGroups(): RuleGroup[] {
    return Array.from(this.groups.values());
  }

  /**
   * Get rules by group
   */
  getRulesByGroup(groupName: string): RuleInfo[] {
    const group = this.groups.get(groupName);
    if (!group) return [];
    
    const rules: RuleInfo[] = [];
    
    Object.values(group.subgroups).forEach(subgroup => {
      subgroup.rules.forEach(ruleName => {
        const ruleInfo = this.getRuleInfo(ruleName);
        if (ruleInfo) {
          rules.push(ruleInfo);
        }
      });
    });
    
    return rules;
  }

  /**
   * Get rules by subgroup
   */
  getRulesBySubgroup(groupName: string, subgroupName: string): RuleInfo[] {
    const group = this.groups.get(groupName);
    if (!group || !group.subgroups[subgroupName]) return [];
    
    const subgroup = group.subgroups[subgroupName];
    return subgroup.rules.map(ruleName => this.getRuleInfo(ruleName)).filter(Boolean) as RuleInfo[];
  }

  /**
   * Get complete rule information for inspector
   */
  getRuleInfo(ruleName: string): RuleInfo | null {
    // Check string rules first
    const stringRule = this.stringRules.get(ruleName);
    if (stringRule) {
      return {
        name: ruleName,
        type: 'string',
        handler: stringRule.handler,
        priority: stringRule.priority,
        metadata: (stringRule as EnhancedStringRuleDefinition).metadata,
        description: stringRule.description
      };
    }

    // Check CSS object rules
    const cssRule = this.rules.get(ruleName);
    if (cssRule) {
      return {
        name: ruleName,
        type: 'css',
        handler: cssRule.handler,
        priority: cssRule.priority,
        metadata: (cssRule as EnhancedRuleDefinition).metadata,
        description: cssRule.description
      };
    }

    return null;
  }

  /**
   * Get all rules as RuleInfo array (for inspector)
   */
  getAllRulesInfo(): RuleInfo[] {
    const allRules: RuleInfo[] = [];
    
    // Add string rules
    this.stringRules.forEach((rule, name) => {
      allRules.push({
        name,
        type: 'string',
        handler: rule.handler,
        priority: rule.priority,
        metadata: (rule as EnhancedStringRuleDefinition).metadata,
        description: rule.description
      });
    });
    
    // Add CSS object rules
    this.rules.forEach((rule, name) => {
      allRules.push({
        name,
        type: 'css',
        handler: rule.handler,
        priority: rule.priority,
        metadata: (rule as EnhancedRuleDefinition).metadata,
        description: rule.description
      });
    });
    
    // Return rules in registration order (no sorting)
    return allRules;
  }

  /**
   * Search rules by name or description
   */
  searchRules(query: string): RuleInfo[] {
    const lowercaseQuery = query.toLowerCase();
    
    return this.getAllRulesInfo().filter(rule => {
      return rule.name.toLowerCase().includes(lowercaseQuery) ||
             rule.description?.toLowerCase().includes(lowercaseQuery) ||
             rule.metadata?.description.toLowerCase().includes(lowercaseQuery) ||
             rule.metadata?.group.toLowerCase().includes(lowercaseQuery) ||
             rule.metadata?.subgroup.toLowerCase().includes(lowercaseQuery);
    });
  }
}

// Global registry instance
export const priorityRegistry = new PriorityRuleRegistry();

// Export layer definition for use in CSS generation
export const CSS_LAYER_DEFINITION = '@layer component, layout, utility, state;';