/**
 * CSS Generation Pipeline
 */

import type { Processor, PipelineContext } from './types';

export class CSSPipeline {
  private processors: Processor[] = [];
  
  /**
   * Add a processor to the pipeline
   */
  add(processor: Processor): this {
    this.processors.push(processor);
    return this;
  }
  
  /**
   * Execute the pipeline with given input
   */
  execute(input: string, initialContext?: Partial<PipelineContext>): string {
    // Initialize context
    let context: PipelineContext = {
      input,
      cache: new Map(),
      visited: new Set(),
      ...initialContext
    };
    
    // Run through processors
    for (const processor of this.processors) {
      if (processor.canProcess(context)) {
        context = processor.process(context);
        
        // If CSS is generated, we can potentially short-circuit
        if (context.css?.result) {
          break;
        }
      }
    }
    
    return context.css?.result || '';
  }
  
  /**
   * Get list of processor names for debugging
   */
  getProcessorNames(): string[] {
    return this.processors.map(p => p.name);
  }
}