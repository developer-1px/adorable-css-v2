import type { 
  RuleHandler, 
  KeywordRuleHandler, 
  StringRuleHandler, 
  KeywordStringRuleHandler, 
  RuleDefinition, 
  StringRuleDefinition,
  AnyRuleDefinition
} from './types';
import { RulePriority } from './types';

/**
 * Priority-aware rule registry for CSS specificity management
 * Rules with higher priority values will override rules with lower priority values
 */
export class PriorityRuleRegistry {
  private rules: Map<string, RuleDefinition> = new Map();
  private stringRules: Map<string, StringRuleDefinition> = new Map();

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
  getRule(name: string): RuleDefinition | undefined {
    return this.rules.get(name);
  }

  /**
   * Get string rule definition with priority
   */
  getStringRule(name: string): StringRuleDefinition | undefined {
    return this.stringRules.get(name);
  }

  /**
   * Get any rule definition (string or CSS object)
   */
  getAnyRule(name: string): AnyRuleDefinition | undefined {
    return this.getStringRule(name) || this.getRule(name);
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