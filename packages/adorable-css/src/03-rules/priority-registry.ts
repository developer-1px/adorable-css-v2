import type {
  RuleHandler,
  KeywordRuleHandler,
  StringRuleHandler,
  KeywordStringRuleHandler,
  RuleDefinition,
  StringRuleDefinition
} from './types';
import { RulePriority } from './types';

// Storage
const rules = new Map<string, RuleDefinition>();
const stringRules = new Map<string, StringRuleDefinition>();

// Register functions
export const register = (
  name: string,
  handler: RuleHandler | KeywordRuleHandler,
  priority: RulePriority,
  description?: string,
  layer?: 'base' | 'components' | 'composition' | 'utilities'
): void => {
  rules.set(name, { handler, priority, description, layer });
};

export const registerString = (
  name: string,
  handlerOrDefinition: StringRuleHandler | KeywordStringRuleHandler | StringRuleDefinition,
  priority?: RulePriority,
  description?: string,
  layer?: 'base' | 'components' | 'composition' | 'utilities'
): void => {
  if (typeof handlerOrDefinition === 'object' && 'handler' in handlerOrDefinition) {
    stringRules.set(name, handlerOrDefinition);
  } else {
    stringRules.set(name, {
      handler: handlerOrDefinition as StringRuleHandler | KeywordStringRuleHandler,
      priority: priority!,
      description,
      isStringRule: true,
      layer
    });
  }
};

export const registerStringBulk = (
  rules: Record<string, StringRuleHandler>,
  priority: RulePriority = RulePriority.COMPONENT,
  layer: 'base' | 'components' | 'composition' | 'utilities' = 'components'
): void => {
  Object.entries(rules).forEach(([name, handler]) => {
    registerString(name, handler, priority, undefined, layer);
  });
};

// Get handlers/03-rules
export const getHandler = (name: string): RuleHandler | KeywordRuleHandler | undefined =>
  rules.get(name)?.handler;

export const getStringHandler = (name: string): StringRuleHandler | KeywordStringRuleHandler | undefined =>
  stringRules.get(name)?.handler;

export const getRule = (name: string) => rules.get(name);
export const getStringRule = (name: string) => stringRules.get(name);
export const getAnyRule = (name: string) => getStringRule(name) || getRule(name);

// Check existence
export const hasString = (name: string) => stringRules.has(name);

// Clear registry (for testing)
export const clear = () => {
  rules.clear();
  stringRules.clear();
};

// Export a namespace-like object for backwards compatibility
export const priorityRegistry = {
  register,
  registerString,
  registerStringBulk,
  getHandler,
  getStringHandler,
  getRule,
  getStringRule,
  getAnyRule,
  hasString,
  clear
};