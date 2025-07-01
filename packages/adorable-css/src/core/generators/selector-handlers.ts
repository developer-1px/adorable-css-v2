import { px } from '../values/makeValue';
import { getRuleHandler } from '../../rules';
import { cssObjectToString } from './css-object-generator';
import type { ParsedSelector, CSSRule } from '../../rules/types';

/**
 * Selector 처리를 위한 핸들러 함수들
 */

export interface SelectorResult {
  mainCSS: string;
  nestedCSS: string[];
  priority?: number;
}

/**
 * Handle pseudo-class selector
 */
export function handlePseudoClass(
  v: any,
  rawSelector: string,
  generateCSSFromSelector: (selector: ParsedSelector, parentSelector?: string) => SelectorResult
): { selector: string; cssResult: SelectorResult } {
  const combinator = v.combinators[0];
  const pseudoClass = v.selector.image;
  const targetSelector = combinator.selector;
  const pseudoSelector = `${rawSelector}:${pseudoClass}`;

  return {
    selector: pseudoSelector,
    cssResult: generateCSSFromSelector(targetSelector, pseudoSelector),
  };
}

/**
 * Handle regular selector
 */
export function handleRegularSelector(
  v: any,
  parentSelector?: string,
  generateCSSFromSelector?: (selector: ParsedSelector, parentSelector?: string) => SelectorResult
): SelectorResult {
  const selector = v.selector;
  
  if (selector.type === "position") {
    const positionResult = cssObjectToString({
      position: "absolute",
      left: String(px(selector.x.image)),
      top: String(px(selector.y.image)),
    }, parentSelector);
    return { ...positionResult, priority: 200 }; // Layout priority
  }
  
  // Handle dimension-pair tokens (e.g., 64x64)
  if (selector.type === "(dimension-pair)") {
    const dimensionPairHandler = getRuleHandler('dimension-pair');
    if (dimensionPairHandler) {
      const result = dimensionPairHandler(selector.image);
      const cssResult = cssObjectToString(result, parentSelector);
      return { ...cssResult, priority: 200 }; // Layout priority
    }
  }
  
  // Fallback to generateCSSFromSelector if provided
  if (generateCSSFromSelector) {
    return generateCSSFromSelector(selector, parentSelector);
  }
  
  // Default empty result
  return { mainCSS: '', nestedCSS: [], priority: 0 };
}