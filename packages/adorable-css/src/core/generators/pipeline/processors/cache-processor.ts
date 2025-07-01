/**
 * Cache processor - checks if result is already cached
 */

import type { Processor, PipelineContext } from '../types';
import { CacheManager } from '../../cache-manager';

// Reuse existing cache
const cssGeneratorCache = new CacheManager<string, string>(10000);

export class CacheProcessor implements Processor {
  name = 'cache';
  
  canProcess(context: PipelineContext): boolean {
    return cssGeneratorCache.has(context.input);
  }
  
  process(context: PipelineContext): PipelineContext {
    const cached = cssGeneratorCache.get(context.input);
    if (cached) {
      return {
        ...context,
        css: { result: cached }
      };
    }
    return context;
  }
  
  /**
   * Store result in cache (called after pipeline completes)
   */
  static cacheResult(input: string, result: string): void {
    cssGeneratorCache.set(input, result);
  }
}