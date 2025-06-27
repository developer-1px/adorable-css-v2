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

// Rule definition with priority metadata
export interface RuleDefinition {
  handler: RuleHandler | KeywordRuleHandler;
  priority: RulePriority;
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