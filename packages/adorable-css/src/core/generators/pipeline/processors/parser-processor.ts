/**
 * Parser processor - parses AdorableCSS syntax
 */

import type { Processor, PipelineContext } from '../types';
import { parseAdorableCSS } from '../../../parser/parser';

export class ParserProcessor implements Processor {
  name = 'parser';
  
  canProcess(context: PipelineContext): boolean {
    // Process if not yet parsed and has input
    return !context.parsed && !!context.input;
  }
  
  process(context: PipelineContext): PipelineContext {
    try {
      const parsed = parseAdorableCSS(context.input);
      
      // Extract importance level
      const importanceMatch = context.input.match(/(!+)$/);
      const importanceLevel = importanceMatch ? importanceMatch[1].length : 0;
      
      return {
        ...context,
        parsed,
        importanceLevel
      };
    } catch (e) {
      console.warn(`❌ AdorableCSS: Failed to parse "${context.input}"`);
      console.warn(`   Error:`, e);
      return {
        ...context,
        css: { result: '' } // Return empty CSS on parse error
      };
    }
  }
}