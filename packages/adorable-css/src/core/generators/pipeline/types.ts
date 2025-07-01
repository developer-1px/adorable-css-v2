/**
 * Pipeline architecture types for CSS generation
 */

import type { ParsedSelector, CSSRule } from '../../../rules/types';

export interface ParsedResult {
  value: any[];
  errors?: string[];
}

export interface CSSResult {
  result: string;
  priority?: number;
}

/**
 * Pipeline context containing all processing state
 */
export interface PipelineContext {
  // Input
  input: string;
  
  // Processing state
  parsed?: ParsedResult;
  selector?: ParsedSelector;
  cssRule?: CSSRule;
  
  // Output
  css?: CSSResult;
  
  // Shared state
  cache: Map<string, any>;
  visited: Set<string>;
  
  // Options
  importanceLevel?: number;
  parentSelector?: string;
}

/**
 * Processor interface for pipeline steps
 */
export interface Processor {
  /**
   * Processor name for debugging
   */
  name: string;
  
  /**
   * Check if this processor can handle the current context
   */
  canProcess(context: PipelineContext): boolean;
  
  /**
   * Process the context and return updated context
   * Should return a new context object (immutable)
   */
  process(context: PipelineContext): PipelineContext;
}