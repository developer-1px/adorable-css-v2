/**
 * CSS Combiner processor - combines CSS parts into final output
 */

import type { Processor, PipelineContext } from '../types';
import { cssEscape, cleanDuplicateSelectors } from '../../../parser/cssEscape';
import { cssObjectToString } from '../../css-object-generator';
import { px } from '../../../values/makeValue';

export class CSSCombinerProcessor implements Processor {
  name = 'css-combiner';
  
  canProcess(context: PipelineContext): boolean {
    // Process if we have parsed data but no CSS yet
    return !!context.parsed && !context.css;
  }
  
  process(context: PipelineContext): PipelineContext {
    const { parsed, input, importanceLevel = 0 } = context;
    if (!parsed) return context;
    
    const rawSelector = "." + cssEscape(input);
    let actualSelector = rawSelector;
    
    // Add [class] for importance
    if (importanceLevel > 0) {
      actualSelector = '[class]'.repeat(importanceLevel) + rawSelector;
    }
    
    const allCSSResults: { mainCSS: string; nestedCSS: string[]; priority?: number }[] = [];
    let hasValidRules = false;
    
    // Process each parsed value
    parsed.value.forEach((v: any) => {
      if (v.combinators?.length > 0 && v.combinators[0].combinator === ":") {
        // Handle pseudo-class
        const cssResult = this.handlePseudoClass(v, rawSelector, context);
        allCSSResults.push(cssResult);
        if (cssResult.mainCSS || cssResult.nestedCSS.length > 0) {
          hasValidRules = true;
        }
      } else {
        // Handle regular selector
        const cssResult = this.handleRegularSelector(v, context);
        allCSSResults.push(cssResult);
        if (cssResult.mainCSS || cssResult.nestedCSS.length > 0) {
          hasValidRules = true;
        }
      }
    });
    
    // Warn about empty rules
    if (!hasValidRules && parsed.value.length > 0) {
      console.warn(`⚠️  AdorableCSS: Class "${input}" parsed successfully but generated no CSS`);
    }
    
    // Sort by priority
    allCSSResults.sort((a, b) => (a.priority || 0) - (b.priority || 0));
    
    // Combine CSS
    const mainCSSParts = allCSSResults.map(r => r.mainCSS).filter(Boolean);
    const mainCSS = mainCSSParts.join(";");
    const nestedCSSRules = allCSSResults.flatMap(r => r.nestedCSS);
    
    if (!mainCSS && nestedCSSRules.length === 0) {
      return { ...context, css: { result: '' } };
    }
    
    // Build final CSS
    const cssParts: string[] = [];
    const hasHighPriorityRules = allCSSResults.some(r => (r.priority || 0) >= 300);
    
    if (mainCSS) {
      let finalSelector = actualSelector;
      
      // Boost specificity for high-priority rules
      if (hasHighPriorityRules && importanceLevel === 0) {
        finalSelector = actualSelector + actualSelector.replace(/^\./, '.');
      }
      
      cssParts.push(`${finalSelector}{${mainCSS}}`);
    }
    
    cssParts.push(...nestedCSSRules);
    
    return {
      ...context,
      css: { result: cleanDuplicateSelectors(cssParts.join("")) }
    };
  }
  
  private handlePseudoClass(v: any, rawSelector: string, context: PipelineContext) {
    // For now, return empty - this would need the full implementation
    return { mainCSS: '', nestedCSS: [], priority: 0 };
  }
  
  private handleRegularSelector(v: any, context: PipelineContext) {
    const selector = v.selector;
    
    if (selector.type === "position") {
      const positionResult = cssObjectToString({
        position: "absolute",
        left: String(px(selector.x.image)),
        top: String(px(selector.y.image)),
      }, context.parentSelector);
      return { ...positionResult, priority: 200 };
    }
    
    // Default
    return { mainCSS: '', nestedCSS: [], priority: 0 };
  }
}