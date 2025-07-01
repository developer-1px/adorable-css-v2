/**
 * CSS Generator using Visitor pattern
 */

import { ASTFactory } from './ast-factory';
import { CSSGeneratorVisitor } from './css-generator-visitor';
import type { VisitorContext, CSSResult } from './types';
import { extractImportanceLevel, addImportanceToSelector } from '../generators/importance-utils';
import { cssEscape, cleanDuplicateSelectors } from '../parser/cssEscape';
import { CacheManager } from '../generators/cache-manager';

// Cache for visitor-based generation
const visitorCache = new CacheManager<string, string>(10000);

/**
 * Generate CSS using Visitor pattern
 */
export function generateCSSWithVisitor(input: string): string {
  // Check cache first
  if (visitorCache.has(input)) {
    return visitorCache.get(input)!;
  }
  
  const result = _generateCSSWithVisitor(input);
  
  // Cache the result
  visitorCache.set(input, result);
  
  return result;
}

function _generateCSSWithVisitor(input: string): string {
  if (!input) return "";
  
  try {
    // Extract importance level
    const { level: importanceLevel } = extractImportanceLevel(input);
    
    // Create AST node
    const astNode = ASTFactory.fromAdorableCSS(input);
    if (!astNode) {
      console.warn(`⚠️  AdorableCSS: Could not create AST for "${input}"`);
      return "";
    }
    
    // Create visitor context
    const context: VisitorContext = {
      importanceLevel,
      visited: new Set(),
      cache: new Map()
    };
    
    // Generate CSS using visitor
    const visitor = new CSSGeneratorVisitor(context);
    const cssResult = astNode.accept(visitor);
    
    // Build final CSS
    return buildFinalCSS(input, cssResult, importanceLevel);
    
  } catch (e) {
    console.warn(`❌ AdorableCSS: Failed to generate CSS for "${input}"`);
    console.warn(`   Error:`, e);
    return "";
  }
}

function buildFinalCSS(input: string, cssResult: CSSResult, importanceLevel: number): string {
  const { mainCSS, nestedCSS, priority = 0 } = cssResult;
  
  // Don't generate empty CSS rules
  if (!mainCSS && nestedCSS.length === 0) {
    return "";
  }
  
  const cssParts: string[] = [];
  
  // Add main rule if there are properties
  if (mainCSS) {
    const rawSelector = "." + cssEscape(input);
    let finalSelector = addImportanceToSelector(rawSelector, importanceLevel);
    
    // Boost specificity for high-priority rules
    if (priority >= 300 && importanceLevel === 0) {
      finalSelector = finalSelector + finalSelector.replace(/^\./, '.');
    }
    
    cssParts.push(`${finalSelector}{${mainCSS}}`);
  }
  
  // Add nested rules
  cssParts.push(...nestedCSS);
  
  return cleanDuplicateSelectors(cssParts.join(""));
}

/**
 * Test function to compare visitor vs current implementation
 */
export function compareImplementations(input: string): { visitor: string; current: string; match: boolean } {
  const { generateCSSFromAdorableCSS } = require('../../core/parser/generator');
  
  const visitorResult = generateCSSWithVisitor(input);
  const currentResult = generateCSSFromAdorableCSS(input);
  const match = visitorResult === currentResult;
  
  return {
    visitor: visitorResult,
    current: currentResult,
    match
  };
}