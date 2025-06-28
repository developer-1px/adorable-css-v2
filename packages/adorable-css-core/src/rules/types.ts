// CSS rule object type
export type CSSRule = {
  [property: string]: string | CSSRule | undefined;
}

// Priority levels for CSS specificity system
export enum RulePriority {
  COMPONENT = 100,    // card, btn, heading - broad component rules
  LAYOUT = 200,       // hbox, vbox, grid - layout system rules  
  UTILITY = 300,      // c, bg, p, m - specific utility rules
  STATE = 400,        // hover, focus, active - interaction states
  RESPONSIVE = 500    // md:, lg:, xl: - responsive breakpoints
}

// Handler function types
export type RuleHandler = (args?: string) => CSSRule;
export type KeywordRuleHandler = () => CSSRule;

// String-based rule handlers (returns AdorableCSS classes instead of CSS objects)
// Can now return mixed AdorableCSS classes + raw CSS objects
export type StringRuleHandler = (args?: string) => string | (string | CSSRule)[];
export type KeywordStringRuleHandler = () => string | (string | CSSRule)[];

// Union types for hybrid support
export type HybridRuleHandler = RuleHandler | StringRuleHandler;
export type HybridKeywordRuleHandler = KeywordRuleHandler | KeywordStringRuleHandler;

// Rule definition with priority metadata
export interface RuleDefinition {
  handler: RuleHandler | KeywordRuleHandler;
  priority: RulePriority;
  description?: string;
}

// String rule definition
export interface StringRuleDefinition {
  handler: StringRuleHandler | KeywordStringRuleHandler;
  priority: RulePriority;
  description?: string;
  isStringRule: true; // Type discriminator
}

// Rule metadata for documentation and grouping
export interface RuleMetadata {
  group: string;              // Primary group: 'Layout', 'Visual', 'Interaction', 'Components'
  subgroup: string;          // Secondary group: 'Auto Layout', 'Colors', 'Typography', etc.
  description: string;       // Brief description of what this rule does
  syntax: string;           // Usage syntax: "w(value)" or "hbox(alignment)"
  examples: string[];       // Array of usage examples
  figmaEquivalent?: string; // Corresponding Figma feature name
  deprecated?: boolean;     // Whether this rule is deprecated
  since?: string;          // Version when this rule was added
}

// Enhanced rule definition with metadata
export interface EnhancedRuleDefinition {
  handler: RuleHandler | KeywordRuleHandler;
  priority: RulePriority;
  description?: string;
  metadata?: RuleMetadata;
}

// Enhanced string rule definition with metadata
export interface EnhancedStringRuleDefinition {
  handler: StringRuleHandler | KeywordStringRuleHandler;
  priority: RulePriority;
  description?: string;
  metadata?: RuleMetadata;
  isStringRule: true;
}

// Union type for both rule types
export type AnyRuleDefinition = RuleDefinition | StringRuleDefinition;
export type AnyEnhancedRuleDefinition = EnhancedRuleDefinition | EnhancedStringRuleDefinition;

// Group information structure
export interface RuleGroup {
  name: string;
  subgroups: Record<string, RuleGroupInfo>;
}

export interface RuleGroupInfo {
  name: string;
  description: string;
  rules: string[];  // Rule names in this subgroup
}

// Complete rule information for inspector
export interface RuleInfo {
  name: string;
  type: 'css' | 'string' | 'legacy';
  handler: RuleHandler | KeywordRuleHandler | StringRuleHandler | KeywordStringRuleHandler;
  priority: RulePriority | string;
  metadata?: RuleMetadata;
  description?: string;
}

// Selector information from parser
export interface ParsedSelector {
  type: 'function' | 'keyword';
  name: string;
  args?: string[];
  image?: string;
}

// Combined selector with pseudo-classes
export interface ParsedItem {
  selector: ParsedSelector;
  combinators?: Array<{
    combinator: string;
    selector: ParsedSelector;
  }>;
}