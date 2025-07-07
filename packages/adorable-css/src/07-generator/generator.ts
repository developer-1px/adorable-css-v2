// Core dependencies
import {parseAdorableCSS} from "../01-core/parser/parser"
import {cleanDuplicateSelectors, cssEscape} from "../01-core/parser/cssEscape"
import {createMemo} from '../01-core/utils/memo'
import {resetCSS} from './reset'
import {addImportanceToSelector, extractImportanceLevel, setImportanceLevel} from './importance-utils'

// Token system
import type {DesignTokens} from '../02-design_tokens/index'
import {defaultTokens, generateTokenCSS, generateUsedTokensCSS, setTokenContext} from '../02-design_tokens/index'

// Rule2 system
import {getRule2Definition, initializeRule2Handlers} from '../04-rules/index'

// Plugins
import {isResponsiveClass, isStateClass} from "../06-plugins/responsive/responsive-decorator"

// Initialize Rule2 handlers when module loads
initializeRule2Handlers();

// Entry point: Parse user input and generate CSS
export const generateCSSWithTokens = (
  classList: string[], 
  options: { includeTokens?: boolean; tokens?: DesignTokens } = {}
): string => {
  const { includeTokens = true, tokens = defaultTokens } = options;
  
  setTokenContext(tokens);
  const css = generateCSS(classList);
  setTokenContext(defaultTokens);
  
  return includeTokens ? `${generateTokenCSS(tokens)}\n\n${css}` : css;
};

// Generate CSS from array of classes with layer system
export const generateCSS = (classList: string[]): string => {
  // Group CSS by layer
  const layerGroups: Record<string, string[]> = {
    base: [],
    components: [],
    composition: [],
    utilities: []
  };
  
  [...new Set(classList)].forEach(className => {
    const result = generateClassWithLayer(className);
    if (result) {
      layerGroups[result.layer].push(result.css);
    }
  });
  
  // Build layered CSS
  let layeredCSS = `@layer base,components,composition,utilities;`;
  layeredCSS += `@layer base{${resetCSS}}`;
  
  if (layerGroups.components.length) {
    layeredCSS += `@layer components{${layerGroups.components.join("\n")}}`;
  }
  if (layerGroups.composition.length) {
    layeredCSS += `@layer composition{${layerGroups.composition.join("\n")}}`;
  }
  if (layerGroups.utilities.length) {
    layeredCSS += `@layer utilities{${layerGroups.utilities.join("\n")}}`;
  }
  
  return generateUsedTokensCSS() + cleanDuplicateSelectors(layeredCSS);
};

// Generate CSS with layer information
function generateClassWithLayer(value: string): { css: string; layer: string } | null {
  if (!value || isResponsiveClass(value)) return null;
  
  try {
    const importanceInfo = extractImportanceLevel(value);
    setImportanceLevel(importanceInfo.level);
    
    const parseResult = parseAdorableCSS(importanceInfo.className);
    const baseSelector = "." + cssEscape(value);
    
    // Determine layer based on the first rule
    let layer = 'utilities'; // default layer
    if (parseResult.value.length > 0) {
      const firstNode = parseResult.value[0];
      const ruleName = firstNode.selector?.name || firstNode.selector?.image || firstNode.image;
      const rule2Definition = getRule2Definition(ruleName);
      if (rule2Definition?.layer) {
        layer = rule2Definition.layer;
      }
    }
    
    const cssRules = parseResult.value
      .map((node: any) => {
        const selector = addImportanceToSelector(baseSelector);
        
        // Handle pseudo-class selectors (e.g., hover:bg(red))
        if (node.combinators?.[0]?.combinator === ":") {
          const innerCSS = generateCSSFromRule2(node.combinators[0].selector);
          return innerCSS ? `${selector}:${node.selector.image}{${innerCSS}}` : "";
        }
        
        // Handle all selectors through Rule2 system
        const css = generateCSSFromRule2(node);
        return css ? `${selector}{${css}}` : "";
      })
      .filter(Boolean);
    
    const css = cleanDuplicateSelectors(cssRules.join(""));
    return css ? { css, layer } : null;
  } catch (_) {
    return null;
  }
}

// Generate CSS from single class (memoized for performance)
export const generateClass = createMemo((value: string): string => {
  const result = generateClassWithLayer(value);
  return result?.css || "";
});

// Generate CSS properties from a parsed selector using Rule2 system
function generateCSSFromRule2(selector: any): string {
  const actualSelector = selector.selector || selector;
  
  // Determine rule name based on selector type
  const ruleName = actualSelector.type === 'position' 
    ? '__positionType' 
    : actualSelector.type === 'function' 
      ? actualSelector.name 
      : (selector.image || actualSelector.image || selector.name);
  
  const rule2Definition = getRule2Definition(ruleName);
  if (!rule2Definition) return "";
  
  try {
    return rule2Definition.handler(selector) || "";
  } catch (_) {
    return "";
  }
}