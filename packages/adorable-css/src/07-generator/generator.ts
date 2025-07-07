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
import {isResponsiveClass, isStateClass, StateSelector, createStateCSS, extractStateBaseClass} from "../06-plugins/responsive/responsive-decorator"

// Initialize Rule2 handlers lazily to avoid circular dependencies
let rule2Initialized = false;
function ensureRule2Initialized() {
  if (!rule2Initialized) {
    initializeRule2Handlers();
    rule2Initialized = true;
  }
}

// Entry point: Parse user input and generate CSS
export const generateCSSWithTokens = (
  classList: string[], 
  options: { includeTokens?: boolean; tokens?: DesignTokens } = {}
): string => {
  // Ensure Rule2 handlers are initialized
  ensureRule2Initialized();
  
  const { includeTokens = true, tokens = defaultTokens } = options;
  
  setTokenContext(tokens);
  const css = generateCSS(classList);
  setTokenContext(defaultTokens);
  
  return includeTokens ? `${generateTokenCSS(tokens)}\n\n${css}` : css;
};

// Generate CSS from array of classes with layer system
export const generateCSS = (classList: string[]): string => {
  // Ensure Rule2 handlers are initialized
  ensureRule2Initialized();
  
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
  
  // Handle state classes (hover:, group-hover:, focus:, etc.)
  if (isStateClass(value)) {
    return generateStateClass(value);
  }
  
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

// Generate CSS for state classes (hover:, group-hover:, focus:, etc.)
function generateStateClass(value: string): { css: string; layer: string } | null {
  const statePattern = StateSelector.analyze(value);
  if (!statePattern) return null;
  
  try {
    // Extract the base class (e.g., "c(red-500)" from "group-hover:c(red-500)")
    const baseClass = statePattern.selector;
    const importanceInfo = extractImportanceLevel(baseClass);
    setImportanceLevel(importanceInfo.level);
    
    // Parse the base class to get CSS properties
    const parseResult = parseAdorableCSS(importanceInfo.className);
    
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
    
    // Generate CSS properties for the base class
    const cssProperties: Record<string, string> = {};
    parseResult.value.forEach((node: any) => {
      const css = generateCSSFromRule2(node);
      if (css) {
        // Parse the CSS string to extract properties
        const lines = css.split(';').filter(Boolean);
        lines.forEach(line => {
          const [property, ...valueParts] = line.split(':');
          if (property && valueParts.length > 0) {
            cssProperties[property.trim()] = valueParts.join(':').trim();
          }
        });
      }
    });
    
    // Create the state selector
    const baseSelector = "." + cssEscape(value);
    const stateCSS = createStateCSS(cssProperties, statePattern, baseSelector);
    
    // Convert the state CSS object to string
    const cssString = Object.entries(stateCSS).map(([selector, properties]) => {
      const propString = Object.entries(properties as Record<string, string>)
        .map(([prop, val]) => `${prop}:${val}`)
        .join(';');
      return `${selector}{${propString}}`;
    }).join('');
    
    return cssString ? { css: cssString, layer } : null;
  } catch (_) {
    return null;
  }
}

// Generate CSS from single class (memoized for performance)
export const generateClass = createMemo((value: string): string => {
  // Ensure Rule2 handlers are initialized
  ensureRule2Initialized();
  
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