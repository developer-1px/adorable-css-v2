import type { 
  RuleHandler, 
  KeywordRuleHandler, 
  StringRuleHandler, 
  KeywordStringRuleHandler, 
  RuleDefinition, 
  StringRuleDefinition,
  EnhancedRuleDefinition,
  EnhancedStringRuleDefinition,
  RuleMetadata,
  RuleInfo
} from './types';

/**
 * CSS @layer based rule registry
 * Uses native CSS cascade layers instead of specificity hacks
 */
export enum CSSLayer {
  COMPONENT = 'component',
  LAYOUT = 'layout',
  UTILITY = 'utility',
  STATE = 'state'
}

interface LayerRule {
  handler: RuleHandler | KeywordRuleHandler | StringRuleHandler | KeywordStringRuleHandler;
  layer: CSSLayer;
  description?: string;
  metadata?: RuleMetadata;
  isStringRule?: boolean;
}

export class LayerRegistry {
  private rules = new Map<string, LayerRule>();
  
  /**
   * Define CSS layers order (lower layers have lower priority)
   */
  getLayerDefinition(): string {
    return '@layer component, layout, utility, state;';
  }

  /**
   * Register a CSS rule
   */
  register(name: string, handler: RuleHandler | KeywordRuleHandler, layer: CSSLayer, description?: string): void {
    this.rules.set(name, { handler, layer, description });
  }

  /**
   * Register a string rule
   */
  registerString(name: string, handler: StringRuleHandler | KeywordStringRuleHandler, layer: CSSLayer, description?: string): void {
    this.rules.set(name, { handler, layer, description, isStringRule: true });
  }

  /**
   * Register with metadata
   */
  registerWithMetadata(name: string, handler: RuleHandler | KeywordRuleHandler, layer: CSSLayer, metadata: RuleMetadata): void {
    this.rules.set(name, { handler, layer, metadata, description: metadata.description });
  }

  /**
   * Register string rule with metadata
   */
  registerStringWithMetadata(name: string, handler: StringRuleHandler | KeywordStringRuleHandler, layer: CSSLayer, metadata: RuleMetadata): void {
    this.rules.set(name, { handler, layer, metadata, description: metadata.description, isStringRule: true });
  }

  /**
   * Get handler by name
   */
  getHandler(name: string): RuleHandler | KeywordRuleHandler | undefined {
    const rule = this.rules.get(name);
    if (!rule || rule.isStringRule) return undefined;
    return rule.handler as RuleHandler | KeywordRuleHandler;
  }

  /**
   * Get string handler by name
   */
  getStringHandler(name: string): StringRuleHandler | KeywordStringRuleHandler | undefined {
    const rule = this.rules.get(name);
    if (!rule || !rule.isStringRule) return undefined;
    return rule.handler as StringRuleHandler | KeywordStringRuleHandler;
  }

  /**
   * Get any handler
   */
  getAnyHandler(name: string): RuleHandler | KeywordRuleHandler | StringRuleHandler | KeywordStringRuleHandler | undefined {
    return this.rules.get(name)?.handler;
  }

  /**
   * Get rule with layer info
   */
  getRule(name: string): LayerRule | undefined {
    return this.rules.get(name);
  }

  /**
   * Check if rule exists
   */
  has(name: string): boolean {
    return this.rules.has(name);
  }

  /**
   * Check if string rule exists
   */
  hasString(name: string): boolean {
    const rule = this.rules.get(name);
    return rule?.isStringRule === true;
  }

  /**
   * Check if any rule exists
   */
  hasAny(name: string): boolean {
    return this.rules.has(name);
  }

  /**
   * Get all rule names
   */
  getAllRuleNames(): string[] {
    return Array.from(this.rules.entries())
      .filter(([, rule]) => !rule.isStringRule)
      .map(([name]) => name);
  }

  /**
   * Get all string rule names
   */
  getAllStringRuleNames(): string[] {
    return Array.from(this.rules.entries())
      .filter(([, rule]) => rule.isStringRule)
      .map(([name]) => name);
  }

  /**
   * Get all any rule names
   */
  getAllAnyRuleNames(): string[] {
    return Array.from(this.rules.keys());
  }

  /**
   * Get rules by layer
   */
  getRulesByLayer(layer: CSSLayer): string[] {
    return Array.from(this.rules.entries())
      .filter(([, rule]) => rule.layer === layer)
      .map(([name]) => name);
  }

  /**
   * Get rule info for compatibility
   */
  getRuleInfo(ruleName: string): RuleInfo | null {
    const rule = this.rules.get(ruleName);
    if (!rule) return null;

    // Map layer to old priority values for compatibility
    const priorityMap = {
      [CSSLayer.COMPONENT]: 100,
      [CSSLayer.LAYOUT]: 200,
      [CSSLayer.UTILITY]: 300,
      [CSSLayer.STATE]: 400
    };

    return {
      name: ruleName,
      type: rule.isStringRule ? 'string' : 'css',
      handler: rule.handler,
      priority: priorityMap[rule.layer],
      metadata: rule.metadata,
      description: rule.description
    };
  }

  /**
   * Get all rules info
   */
  getAllRulesInfo(): RuleInfo[] {
    return Array.from(this.rules.entries()).map(([name, rule]) => {
      const priorityMap = {
        [CSSLayer.COMPONENT]: 100,
        [CSSLayer.LAYOUT]: 200,
        [CSSLayer.UTILITY]: 300,
        [CSSLayer.STATE]: 400
      };

      return {
        name,
        type: rule.isStringRule ? 'string' : 'css',
        handler: rule.handler,
        priority: priorityMap[rule.layer],
        metadata: rule.metadata,
        description: rule.description
      };
    });
  }

  /**
   * Search rules
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

// Global layer registry instance
export const layerRegistry = new LayerRegistry();