/**
 * Responsive processor - handles md:, lg:, etc.
 */

import type { Processor, PipelineContext } from '../types';
import { isResponsiveClass } from '../../../../extensions/responsive/responsive-decorator';

export class ResponsiveProcessor implements Processor {
  name = 'responsive';
  
  constructor(
    private generateResponsiveCSS: (className: string) => string
  ) {}
  
  canProcess(context: PipelineContext): boolean {
    return isResponsiveClass(context.input);
  }
  
  process(context: PipelineContext): PipelineContext {
    const css = this.generateResponsiveCSS(context.input);
    return {
      ...context,
      css: { result: css }
    };
  }
}