/**
 * AST Factory - converts parser output to Visitor pattern nodes
 */

import type { ASTNode } from './types';
import { Selector, Position, Combinator, State, Responsive, StringRule } from './nodes';
import { isStateClass, isResponsiveClass, StateSelector, ResponsiveSelector } from '../../extensions/responsive/responsive-decorator';
import { priorityRegistry } from '../../rules/priority-registry';
import { createParsedSelector } from '../generators/ast-helpers';

export class ASTFactory {
  /**
   * Create AST node from AdorableCSS input string
   */
  static fromAdorableCSS(input: string): ASTNode | null {
    // Check if this is a state class first
    if (isStateClass(input)) {
      return this.createStateNode(input);
    }
    
    // Check if this is a responsive class
    if (isResponsiveClass(input)) {
      return this.createResponsiveNode(input);
    }
    
    // Parse with existing parser and convert to AST
    const { parseAdorableCSS } = require('../../core/parser/parser');
    
    try {
      const result = parseAdorableCSS(input);
      if (result.value && result.value.length > 0) {
        return this.fromParserResult(result.value[0]);
      }
    } catch (e) {
      console.warn(`Failed to parse "${input}":`, e);
    }
    
    return null;
  }
  
  /**
   * Convert parser result to AST node
   */
  static fromParserResult(parserNode: any): ASTNode | null {
    // Handle combinator (pseudo-class)
    if (parserNode.combinators?.length > 0 && parserNode.combinators[0].combinator === ":") {
      const combinator = parserNode.combinators[0];
      const pseudoClass = parserNode.selector.image;
      const targetSelector = combinator.selector;
      
      const targetNode = this.fromSelector(targetSelector);
      if (targetNode) {
        return new Combinator(pseudoClass, targetNode, '');
      }
    }
    
    // Handle regular selector
    return this.fromSelector(parserNode.selector);
  }
  
  /**
   * Create node from selector
   */
  static fromSelector(selector: any): ASTNode | null {
    if (!selector) return null;
    
    // Handle position selector
    if (selector.type === "position") {
      return new Position(selector.x.image, selector.y.image);
    }
    
    // Handle dimension-pair
    if (selector.type === "(dimension-pair)") {
      return new Selector('dimension-pair', 'function', [selector.image]);
    }
    
    // Handle regular function/ident selector
    const selectorName = selector.name || selector.image;
    
    // Check if it's a string rule
    if (priorityRegistry.hasString(selectorName)) {
      const args = selector.args?.map((arg: any) => arg.image).join('');
      return new StringRule(selectorName, args);
    }
    
    // Regular selector
    const parsedSelector = createParsedSelector(selector);
    const functionType = parsedSelector.type === 'function' ? 'function' : 'ident';
    
    return new Selector(
      parsedSelector.name,
      functionType,
      parsedSelector.args
    );
  }
  
  /**
   * Create state node
   */
  static createStateNode(stateClassName: string): StateNode {
    const pattern = StateSelector.analyze(stateClassName);
    if (!pattern) {
      throw new Error(`Invalid state pattern: ${stateClassName}`);
    }
    
    return new State(
      pattern.state,
      pattern.selector,
      stateClassName,
      pattern.isGroup
    );
  }
  
  /**
   * Create responsive node
   */
  static createResponsiveNode(responsiveClassName: string): ResponsiveNode {
    const pattern = ResponsiveSelector.analyze(responsiveClassName);
    if (!pattern) {
      throw new Error(`Invalid responsive pattern: ${responsiveClassName}`);
    }
    
    return new Responsive(
      pattern.breakpoint,
      pattern.selector,
      responsiveClassName,
      pattern.isMaxWidth
    );
  }
}