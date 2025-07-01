/**
 * CSS Generator Visitor - converts AST nodes to CSS
 */

import type { 
  Visitor, 
  CSSResult, 
  SelectorNode, 
  PositionNode, 
  CombinatorNode, 
  StateNode, 
  ResponsiveNode, 
  StringRuleNode,
  VisitorContext 
} from './types';

import { getRuleHandler, getPriorityRuleHandler, getRuleWithPriority } from '../../rules';
import { priorityRegistry } from '../../rules/priority-registry';
import { cssObjectToString } from '../generators/css-object-generator';
import { px } from '../values/makeValue';
import { 
  StateSelector, 
  ResponsiveSelector, 
  createStateCSS 
} from '../../extensions/responsive/responsive-decorator';
import { cssEscape } from '../parser/cssEscape';
import { createMediaQuery } from '../generators/breakpoints';
import { extractCSSProperties } from '../parser/generator';

export class CSSGeneratorVisitor implements Visitor<CSSResult> {
  constructor(private context: VisitorContext = {}) {}
  
  visitSelector(node: SelectorNode): CSSResult {
    // Get handler
    const handler = getPriorityRuleHandler(node.name) || getRuleHandler(node.name);
    const ruleInfo = getRuleWithPriority(node.name);
    
    if (!handler) {
      console.warn(`⚠️  AdorableCSS: Rule handler not found for "${node.name}"`);
      return { mainCSS: "", nestedCSS: [], priority: 0 };
    }

    // Execute handler
    const args = node.functionType === "function" && node.args ? node.args.join("") : "";
    const result = handler(args);
    const cssResult = cssObjectToString(result, this.context.parentSelector);
    
    return { 
      ...cssResult, 
      priority: ruleInfo?.priority || 0 
    };
  }
  
  visitPosition(node: PositionNode): CSSResult {
    const positionResult = cssObjectToString({
      position: "absolute",
      left: String(px(node.x)),
      top: String(px(node.y)),
    }, this.context.parentSelector);
    
    return { ...positionResult, priority: 200 }; // Layout priority
  }
  
  visitCombinator(node: CombinatorNode): CSSResult {
    const pseudoSelector = `${node.base}:${node.combinator}`;
    
    // Create new visitor for the target with updated context
    const targetVisitor = new CSSGeneratorVisitor({
      ...this.context,
      parentSelector: pseudoSelector
    });
    
    return node.target.accept(targetVisitor);
  }
  
  visitState(node: StateNode): CSSResult {
    // Use existing generateStateCSS logic here
    // This would need the full implementation from generator.ts
    return this.generateStateCSS(node);
  }
  
  visitResponsive(node: ResponsiveNode): CSSResult {
    // Use existing generateResponsiveCSS logic here  
    // This would need the full implementation from generator.ts
    return this.generateResponsiveCSS(node);
  }
  
  visitStringRule(node: StringRuleNode): CSSResult {
    // Check for circular dependencies
    const ruleKey = `${node.name}(${node.args || ''})`;
    if (this.context.visited?.has(ruleKey)) {
      console.warn(`⚠️  AdorableCSS: Circular dependency detected for string rule "${ruleKey}"`);
      return { mainCSS: "", nestedCSS: [], priority: 0 };
    }
    
    // Add to visited set
    const newVisited = new Set(this.context.visited);
    newVisited.add(ruleKey);
    
    // Get string rule definition
    const stringRule = priorityRegistry.getStringRule(node.name);
    if (!stringRule) {
      return { mainCSS: "", nestedCSS: [], priority: 0 };
    }
    
    // Execute string rule handler
    let result: string | (string | any)[];
    try {
      const handler = stringRule.handler;
      result = typeof handler === 'function' 
        ? (node.args !== undefined ? handler(node.args) : handler())
        : '';
    } catch (e) {
      console.warn(`⚠️  AdorableCSS: Error executing string rule "${node.name}":`, e);
      return { mainCSS: "", nestedCSS: [], priority: stringRule.priority };
    }
    
    // Process result (would need more implementation here)
    // This is a simplified version
    return { mainCSS: "", nestedCSS: [], priority: stringRule.priority };
  }
  
  private generateStateCSS(node: StateNode): CSSResult {
    // Extract from existing generateStateCSS function
    // This is a placeholder - would need full implementation
    return { mainCSS: "", nestedCSS: [], priority: 0 };
  }
  
  private generateResponsiveCSS(node: ResponsiveNode): CSSResult {
    // Extract from existing generateResponsiveCSS function
    // This is a placeholder - would need full implementation
    return { mainCSS: "", nestedCSS: [], priority: 0 };
  }
}