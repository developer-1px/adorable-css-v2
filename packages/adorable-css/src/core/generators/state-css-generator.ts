import { cssEscape } from "../parser/cssEscape";
import { StateSelector, createStateCSS } from "../../extensions/responsive/responsive-decorator";
import type { CSSRule } from "../../rules/types";

/**
 * State CSS 생성을 담당하는 제너레이터
 * hover:, focus:, group-hover: 등의 상태 클래스 처리
 */
export class StateCSSGenerator {
  constructor(
    private generateCSSFromAdorableCSS: (value: string) => string,
    private cssObjectToString: (obj: CSSRule, parentSelector?: string) => { mainCSS: string; nestedCSS: string[] }
  ) {}
  
  /**
   * Generate state CSS using decorator pattern
   */
  generate(stateClassName: string): string {
    // Check for importance marks at the end
    const importanceMatch = stateClassName.match(/(!+)$/);
    const importanceLevel = importanceMatch ? importanceMatch[1].length : 0;
    
    const pattern = StateSelector.analyze(stateClassName);
    if (!pattern) {
      console.warn(`⚠️  AdorableCSS: Invalid state pattern "${stateClassName}"`);
      return "";
    }

    // Extract base class and generate its CSS
    const baseClassName = pattern.selector;
    const baseCSS = this.generateCSSFromAdorableCSS(baseClassName);
    
    if (!baseCSS) {
      console.warn(`⚠️  AdorableCSS: Base class "${baseClassName}" generated no CSS for state "${stateClassName}"`);
      return "";
    }

    // Parse the base CSS to extract the rule content
    // Pattern matches: .selector{properties} and captures properties
    // Handle both single and doubled selectors (for specificity)
    const selectorMatch = baseCSS.match(/[^{]+\{([^}]+)\}/);
    if (!selectorMatch) {
      console.warn(`⚠️  AdorableCSS: Could not parse base CSS for state class "${stateClassName}"`);
      console.warn(`   Base CSS: "${baseCSS}"`);
      return "";
    }

    const cssProperties = selectorMatch[1];
    
    // Create state selector using StateDecorator
    const cssRule: { [key: string]: string } = {};
    cssProperties.split(';').forEach((prop: string) => {
      if (prop.trim()) {
        const [key, value] = prop.split(':').map((s: string) => s.trim());
        if (key && value) {
          cssRule[key] = value;
        }
      }
    });
    
    // Use full class selector with importance
    const fullClassSelector = "." + cssEscape(stateClassName);
    const stateCSS = createStateCSS(cssRule, pattern, fullClassSelector);
    
    // Convert the state CSS object to string
    const result = this.cssObjectToString(stateCSS);
    
    // For state CSS, the result is in nestedCSS, not mainCSS
    let stateCSSString = result.nestedCSS.length > 0 ? result.nestedCSS[0] : '';
    
    // Add [class] for importance
    if (importanceLevel > 0 && stateCSSString) {
      // Add [class] at the beginning of the selector
      stateCSSString = stateCSSString.replace(/^(\.[^{]+)(\{)/, `${`[class]`.repeat(importanceLevel)}$1$2`);
    }
    
    return stateCSSString;
  }
}