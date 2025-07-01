/**
 * Factory function to create the CSS generation pipeline
 */

import { CSSPipeline } from './pipeline';
import { CacheProcessor } from './processors/cache-processor';
import { StateProcessor } from './processors/state-processor';
import { ResponsiveProcessor } from './processors/responsive-processor';
import { ParserProcessor } from './processors/parser-processor';
import { RuleProcessor } from './processors/rule-processor';
import { CSSCombinerProcessor } from './processors/css-combiner-processor';
import { StringRuleProcessor } from './processors/string-rule-processor';

export interface PipelineOptions {
  generateStateCSS: (className: string) => string;
  generateResponsiveCSS: (className: string) => string;
}

/**
 * Create a configured CSS generation pipeline
 */
export function createCSSPipeline(options: PipelineOptions): CSSPipeline {
  const pipeline = new CSSPipeline();
  
  // Create a function that can execute the pipeline (for string rules)
  const executePipeline = (input: string, context?: Partial<PipelineContext>) => {
    return pipeline.execute(input, context);
  };
  
  // Order matters! Processors run in sequence
  pipeline
    .add(new CacheProcessor())
    .add(new StateProcessor(options.generateStateCSS))
    .add(new ResponsiveProcessor(options.generateResponsiveCSS))
    .add(new ParserProcessor())
    .add(new StringRuleProcessor(executePipeline))  // Before RuleProcessor
    .add(new RuleProcessor())
    .add(new CSSCombinerProcessor());
  
  return pipeline;
}

/**
 * Create and execute pipeline in one call
 */
export function executePipeline(
  input: string,
  options: PipelineOptions & { parentSelector?: string }
): string {
  const pipeline = createCSSPipeline(options);
  
  const result = pipeline.execute(input, {
    parentSelector: options.parentSelector
  });
  
  // Cache the result if successful
  if (result) {
    CacheProcessor.cacheResult(input, result);
  }
  
  return result;
}