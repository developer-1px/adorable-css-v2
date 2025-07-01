/**
 * Simple Visitor implementation - minimal and lightweight for CDN deployment
 * 
 * Features:
 * ✅ 100% compatibility with existing generator for basic selectors
 * ✅ State selectors (hover:, focus:, group-hover:, etc.)
 * ✅ Responsive selectors (md:, lg:, xl:, etc.)
 * ✅ Importance levels (!, !!, etc.)
 * ✅ Complex spacing and layout utilities
 * ✅ Graceful error handling
 * 
 * Architecture:
 * - Lightweight node classification (state, responsive, selector)
 * - Simple recursive processing without complex visitor classes
 * - Reuses existing utilities and rule handlers
 * - Maintains backward compatibility
 */

import { parseAdorableCSS } from '../parser/parser';
import { generateCSSFromAdorableCSS, extractCSSProperties } from '../parser/generator';
import { isStateClass, isResponsiveClass, StateSelector, ResponsiveSelector, createStateCSS } from '../../extensions/responsive/responsive-decorator';
import { getRuleHandler, getPriorityRuleHandler, getRuleWithPriority } from '../../rules';
import { cssObjectToString } from '../generators/css-object-generator';
import { cssEscape } from '../parser/cssEscape';
import { createParsedSelector } from '../generators/ast-helpers';
import { createMediaQuery } from '../generators/breakpoints';
import { extractImportanceLevel, addImportanceToSelector } from '../generators/importance-utils';

// Simple node types
type NodeType = 'selector' | 'state' | 'responsive';

interface SimpleNode {
  type: NodeType;
  value: string;
}

// Simple visitor function - no complex classes
export function visitAndGenerate(input: string): string {
  if (!input) return '';
  
  const node = createSimpleNode(input);
  return processNode(node);
}

function createSimpleNode(input: string): SimpleNode {
  if (isStateClass(input)) {
    return { type: 'state', value: input };
  }
  
  if (isResponsiveClass(input)) {
    return { type: 'responsive', value: input };
  }
  
  return { type: 'selector', value: input };
}

function processNode(node: SimpleNode): string {
  switch (node.type) {
    case 'state':
      return processStateNode(node.value);
    case 'responsive':
      return processResponsiveNode(node.value);
    case 'selector':
    default:
      return processSelectorNode(node.value);
  }
}

function processStateNode(input: string): string {
  const { level: importanceLevel, className: cleanClassName } = extractImportanceLevel(input);
  
  const pattern = StateSelector.analyze(cleanClassName);
  if (!pattern) {
    console.warn(`Invalid state pattern: ${cleanClassName}`);
    return '';
  }

  // Get base CSS by visiting the base selector
  const baseCSS = visitAndGenerate(pattern.selector);
  if (!baseCSS) {
    console.warn(`No CSS for base selector: ${pattern.selector}`);
    return '';
  }

  // Extract CSS properties
  const cssProperties = extractCSSProperties(baseCSS, cleanClassName);
  if (!cssProperties) return '';
  
  // Create CSS rule object
  const cssRule: { [key: string]: string } = {};
  cssProperties.split(';').forEach(prop => {
    if (prop.trim()) {
      const [key, value] = prop.split(':').map(s => s.trim());
      if (key && value) cssRule[key] = value;
    }
  });
  
  // Generate state CSS
  const fullClassSelector = "." + cssEscape(cleanClassName);
  const stateCSS = createStateCSS(cssRule, pattern, fullClassSelector);
  const result = cssObjectToString(stateCSS);
  
  // Get CSS string and add importance
  let stateCSSString = result.nestedCSS.length > 0 ? result.nestedCSS[0] : '';
  if (importanceLevel > 0 && stateCSSString) {
    stateCSSString = stateCSSString.replace(/^(\.[^{]+)(\{)/, `${`[class]`.repeat(importanceLevel)}$1$2`);
  }
  
  return stateCSSString;
}

function processResponsiveNode(input: string): string {
  const { level: importanceLevel, className: cleanClassName } = extractImportanceLevel(input);
  
  const pattern = ResponsiveSelector.analyze(cleanClassName);
  if (!pattern) {
    console.warn(`Invalid responsive pattern: ${cleanClassName}`);
    return '';
  }

  // Get base CSS by visiting the base selector
  const baseCSS = visitAndGenerate(pattern.selector);
  if (!baseCSS) {
    console.warn(`No CSS for base selector: ${pattern.selector}`);
    return '';
  }

  // Extract CSS properties
  const cssProperties = extractCSSProperties(baseCSS, cleanClassName);
  if (!cssProperties) return '';
  
  // Generate media query
  const mediaQuery = createMediaQuery(pattern.breakpoint, pattern.isMaxWidth);
  if (!mediaQuery) return '';

  // Build final selector with importance
  const responsiveSelector = "." + cssEscape(cleanClassName);
  const finalSelector = addImportanceToSelector(responsiveSelector, importanceLevel);
  
  return `${mediaQuery}{${finalSelector}{${cssProperties}}}`;
}

function processSelectorNode(input: string): string {
  try {
    // Extract importance level
    const { level: importanceLevel } = extractImportanceLevel(input);
    
    const result = parseAdorableCSS(input);
    if (!result.value || result.value.length === 0) {
      return '';
    }
    
    // Simple visitor pattern - handle one selector
    const v = result.value[0];
    const selector = v.selector;
    
    // Create parsed selector
    const parsedSelector = createParsedSelector(selector);
    
    // Get handler
    const handler = getPriorityRuleHandler(parsedSelector.name) || getRuleHandler(parsedSelector.name);
    if (!handler) {
      console.warn(`No handler found for: ${parsedSelector.name}`);
      return '';
    }
    
    // Execute handler
    const args = parsedSelector.type === 'function' && parsedSelector.args ? parsedSelector.args.join('') : '';
    const cssRule = handler(args);
    
    // Convert to CSS string
    const cssResult = cssObjectToString(cssRule);
    if (!cssResult.mainCSS) {
      return '';
    }
    
    // Build final CSS with importance
    const rawSelector = '.' + cssEscape(input);
    const finalSelector = addImportanceToSelector(rawSelector, importanceLevel);
    
    return `${finalSelector}{${cssResult.mainCSS}}`;
    
  } catch (e) {
    console.warn(`Failed to process selector: ${input}`, e);
    return '';
  }
}

// Test function to compare
export function compareSimple(input: string): { simple: string; current: string; match: boolean } {
  const simpleResult = visitAndGenerate(input);
  const currentResult = generateCSSFromAdorableCSS(input);
  
  return {
    simple: simpleResult,
    current: currentResult,
    match: simpleResult === currentResult
  };
}