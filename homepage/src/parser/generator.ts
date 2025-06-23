import { parseAdorableCSS } from "./parser";
import { getRuleHandler } from "../rules";
import type { CSSRule, ParsedSelector } from "../rules/types";
import { cssEscape } from "./cssEscape";

// Convert CSS object to string
const cssObjectToString = (obj: CSSRule): string => 
  Object.entries(obj || {})
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");

// Create ParsedSelector from AST node
const createParsedSelector = (node: any): ParsedSelector => ({
  type: node.name ? 'function' : 'keyword',
  name: node.name || node.image,
  args: node.args?.map((arg: any) => arg.image)
});

// Generate CSS from parsed selector
const generateCSSFromSelector = (selector: ParsedSelector): string => {
  const handler = getRuleHandler(selector.name);
  if (!handler) return "";

  const result = selector.type === 'function' && selector.args
    ? handler(selector.args.join(""))
    : handler();
    
  return cssObjectToString(result);
};

// Handle pseudo-class selector
const handlePseudoClass = (v: any, rawSelector: string): { selector: string; css: string } => {
  const combinator = v.combinators[0];
  const pseudoClass = v.selector.image;
  const targetSelector = combinator.selector;
  
  return {
    selector: `${rawSelector}:${pseudoClass}`,
    css: generateCSSFromSelector(createParsedSelector(targetSelector))
  };
};

// Handle regular selector
const handleRegularSelector = (v: any): string => 
  generateCSSFromSelector(createParsedSelector(v.selector));

export function generateCSSFromAdorableCSS(value: string): string {
  try {
    const result = parseAdorableCSS(value);
    const rawSelector = "." + cssEscape(value);
    let actualSelector = rawSelector;
    
    const cssRules = result.value.map((v: any) => {
      if (v.combinators?.length > 0 && v.combinators[0].combinator === ":") {
        const { selector, css } = handlePseudoClass(v, rawSelector);
        actualSelector = selector;
        return css;
      } else {
        return handleRegularSelector(v);
      }
    }).filter(Boolean);

    const cssBody = cssRules.join("; ");
    return cssBody.includes("&") 
      ? cssBody.replace(/&/g, actualSelector)
      : `${actualSelector}{${cssBody}}`;
      
  } catch (e) {
    throw e;
  }
}

export function generateCSS(classList: string[]): string {
  return classList.map((v) => generateCSSFromAdorableCSS(v)).join("\n");
}
