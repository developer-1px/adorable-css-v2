/**
 * String Rule processor - handles string rules without circular dependency
 */

import type { Processor, PipelineContext } from '../types';
import { priorityRegistry } from '../../../../rules/priority-registry';
import { createParsedSelector } from '../../ast-helpers';
import { cssObjectToString } from '../../css-object-generator';
import type { CSSRule } from '../../../../rules/types';

export class StringRuleProcessor implements Processor {
  name = 'string-rule';
  
  constructor(
    private executePipeline: (input: string, context?: Partial<PipelineContext>) => string
  ) {}
  
  canProcess(context: PipelineContext): boolean {
    if (!context.parsed || context.parsed.value.length === 0) return false;
    
    const selector = context.parsed.value[0]?.selector;
    const selectorName = selector?.name || selector?.image;
    
    return priorityRegistry.hasString(selectorName);
  }
  
  process(context: PipelineContext): PipelineContext {
    const selector = context.parsed!.value[0].selector;
    const selectorName = selector.name || selector.image;
    const selectorArgs = selector.args?.map((arg: any) => arg.image).join('');
    
    // Check for circular dependency
    const ruleKey = `${selectorName}(${selectorArgs || ''})`;
    if (context.visited.has(ruleKey)) {
      console.warn(`⚠️  AdorableCSS: Circular dependency detected for string rule "${ruleKey}"`);
      return {
        ...context,
        css: { result: '' }
      };
    }
    
    // Add to visited set
    const newVisited = new Set(context.visited);
    newVisited.add(ruleKey);
    
    // Get string rule definition
    const stringRule = priorityRegistry.getStringRule(selectorName);
    if (!stringRule) {
      return {
        ...context,
        css: { result: '' }
      };
    }
    
    // Execute string rule handler
    let result: string | (string | CSSRule)[];
    try {
      const handler = stringRule.handler;
      result = typeof handler === 'function' 
        ? (selectorArgs !== undefined ? handler(selectorArgs) : handler())
        : '';
    } catch (e) {
      console.warn(`⚠️  AdorableCSS: Error executing string rule "${selectorName}":`, e);
      return {
        ...context,
        css: { result: '', priority: stringRule.priority }
      };
    }
    
    // Process result
    const allCSSResults: string[] = [];
    
    if (Array.isArray(result)) {
      // Mixed array format
      for (const item of result) {
        if (typeof item === 'string') {
          // AdorableCSS classes - process each
          const classes = item.trim().split(/\s+/);
          for (const className of classes) {
            if (!className) continue;
            
            // Use pipeline to process (avoiding circular dependency)
            const css = this.executePipeline(className, {
              visited: newVisited,
              parentSelector: context.parentSelector
            });
            
            if (css) {
              allCSSResults.push(css);
            }
          }
        } else if (typeof item === 'object' && item !== null) {
          // Raw CSS object
          const cssResult = cssObjectToString(item as CSSRule, context.parentSelector);
          if (cssResult.mainCSS) {
            allCSSResults.push(`${context.parentSelector || ''}${cssResult.mainCSS}`);
          }
          allCSSResults.push(...cssResult.nestedCSS);
        }
      }
    } else if (typeof result === 'string') {
      // Legacy string format
      const classes = result.trim().split(/\s+/);
      for (const className of classes) {
        if (!className) continue;
        
        const css = this.executePipeline(className, {
          visited: newVisited,
          parentSelector: context.parentSelector
        });
        
        if (css) {
          allCSSResults.push(css);
        }
      }
    }
    
    return {
      ...context,
      css: {
        result: allCSSResults.join('\n'),
        priority: stringRule.priority
      }
    };
  }
}