// CSS rule object type
export interface CSSRule {
  [property: string]: string;
}

// Handler function types
export type RuleHandler = (args?: string) => CSSRule;
export type KeywordRuleHandler = () => CSSRule;

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