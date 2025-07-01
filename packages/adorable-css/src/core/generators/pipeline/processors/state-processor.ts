/**
 * State processor - handles hover:, focus:, etc.
 */

import type { Processor, PipelineContext } from '../types';
import { isStateClass } from '../../../../extensions/responsive/responsive-decorator';

export class StateProcessor implements Processor {
  name = 'state';
  
  constructor(
    private generateStateCSS: (className: string) => string
  ) {}
  
  canProcess(context: PipelineContext): boolean {
    return isStateClass(context.input);
  }
  
  process(context: PipelineContext): PipelineContext {
    const css = this.generateStateCSS(context.input);
    return {
      ...context,
      css: { result: css }
    };
  }
}