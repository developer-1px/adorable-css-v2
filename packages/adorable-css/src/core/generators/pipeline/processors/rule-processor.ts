/**
 * Rule processor - handles regular CSS rules
 */

import type { Processor, PipelineContext } from '../types';
import { getRuleHandler, getPriorityRuleHandler, getRuleWithPriority } from '../../../../rules';
import { cssObjectToString } from '../../css-object-generator';
import { createParsedSelector } from '../../ast-helpers';

export class RuleProcessor implements Processor {
  name = 'rule';
  
  canProcess(context: PipelineContext): boolean {
    // Process if parsed and has selector, but not a string rule
    if (!context.parsed || context.parsed.value.length === 0) return false;
    
    const selector = context.parsed.value[0]?.selector;
    const selectorName = selector?.name || selector?.image;
    
    // Check if handler exists
    return !!(getPriorityRuleHandler(selectorName) || getRuleHandler(selectorName));
  }
  
  process(context: PipelineContext): PipelineContext {
    const selector = context.parsed!.value[0].selector;
    const parsedSelector = createParsedSelector(selector);
    const selectorName = parsedSelector.name;
    
    // Get handler
    let handler = getPriorityRuleHandler(selectorName);
    let ruleInfo = getRuleWithPriority(selectorName);
    
    if (!handler) {
      handler = getRuleHandler(selectorName);
    }
    
    if (!handler) {
      console.warn(`⚠️  AdorableCSS: Rule handler not found for "${selectorName}"`);
      return {
        ...context,
        css: { result: '' }
      };
    }
    
    // Execute handler
    const result = parsedSelector.type === "function" && parsedSelector.args
      ? handler(parsedSelector.args.join(""))
      : handler("");
    
    // Convert to CSS string
    const cssResult = cssObjectToString(result, context.parentSelector);
    
    return {
      ...context,
      cssRule: result,
      css: {
        result: cssResult.mainCSS,
        priority: ruleInfo?.priority || 0
      }
    };
  }
}