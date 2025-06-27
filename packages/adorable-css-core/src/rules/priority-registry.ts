import type { RuleHandler, KeywordRuleHandler, RuleDefinition, RulePriority } from './types';

/**
 * Priority-aware rule registry for CSS specificity management
 * Rules with higher priority values will override rules with lower priority values
 */
export class PriorityRuleRegistry {
  private rules: Map<string, RuleDefinition> = new Map();

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
   * Register multiple rules with the same priority
   */
  registerBulk(rules: Record<string, RuleHandler | KeywordRuleHandler>, priority: RulePriority): void {
    Object.entries(rules).forEach(([name, handler]) => {
      this.register(name, handler, priority);
    });
  }

  /**
   * Get rule handler by name
   */
  getHandler(name: string): RuleHandler | KeywordRuleHandler | undefined {
    return this.rules.get(name)?.handler;
  }

  /**
   * Get rule definition with priority
   */
  getRule(name: string): RuleDefinition | undefined {
    return this.rules.get(name);
  }

  /**
   * Get all rules sorted by priority (low to high)
   * Used for CSS generation order
   */
  getRulesByPriority(): Array<[string, RuleDefinition]> {
    return Array.from(this.rules.entries())
      .sort(([, a], [, b]) => a.priority - b.priority);
  }

  /**
   * Get rules by priority level
   */
  getRulesByPriorityLevel(priority: RulePriority): Array<[string, RuleDefinition]> {
    return Array.from(this.rules.entries())
      .filter(([, rule]) => rule.priority === priority);
  }

  /**
   * Check if a rule exists
   */
  has(name: string): boolean {
    return this.rules.has(name);
  }

  /**
   * Get all rule names
   */
  getAllRuleNames(): string[] {
    return Array.from(this.rules.keys());
  }

  /**
   * Generate CSS with proper priority ordering
   * Higher priority rules get higher CSS specificity
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

    // Boost CSS specificity for high-priority rules
    const selector = this.getSpecificitySelector(className, rule.priority);
    return `${selector}{${cssProperties}}`;
  }

  /**
   * Generate CSS selector with appropriate specificity based on priority
   */
  private getSpecificitySelector(className: string, priority: RulePriority): string {
    const baseSelector = `.${className}`;
    
    // Higher priority = higher specificity
    if (priority >= RulePriority.STATE) {
      // Highest specificity for state/responsive rules
      return `${baseSelector}${baseSelector}`;
    } else if (priority >= RulePriority.UTILITY) {
      // High specificity for utility rules
      return `${baseSelector}.\\${className}`;
    } else {
      // Normal specificity for component/layout rules
      return baseSelector;
    }
  }
}

// Global registry instance
export const priorityRegistry = new PriorityRuleRegistry();