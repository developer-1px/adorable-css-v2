// CSS rule object type
export type CSSRule = {
  [property: string]: string | CSSRule | undefined;
}

// Priority levels for CSS specificity system
export enum RulePriority {
  COMPONENT = 100,    // card, btn, heading - broad component 03-rules
  LAYOUT = 200,       // hbox, vbox, grid - layout system 03-rules
  UTILITY = 300,      // c, bg, p, m - specific utility 03-rules
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

// Rule definition with priority
export interface RuleDefinition {
  handler: RuleHandler | KeywordRuleHandler;
  priority: RulePriority;
  description?: string;
  layer?: 'base' | 'components' | 'composition' | 'utilities';
}

// String rule definition
export interface StringRuleDefinition {
  handler: StringRuleHandler | KeywordStringRuleHandler;
  priority: RulePriority;
  description?: string;
  isStringRule: true; // Type discriminator
  layer?: 'base' | 'components' | 'composition' | 'utilities';
}


// Selector information from parser
export interface ParsedSelector {
  type: 'function' | 'keyword';
  name: string;
  args?: string[];
  image?: string;
}

