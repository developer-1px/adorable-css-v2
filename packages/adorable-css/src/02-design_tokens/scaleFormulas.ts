/**
 * Scale formula implementations
 */

import type { TokenScaleConfig } from './scaleConfig';

export function calculateMultiplier(
  step: number,
  config: TokenScaleConfig,
  category: 'font' | 'spacing' | 'size' | 'container' = 'spacing'
): number {
  const customValue = config.values?.[step.toString()];
  if (customValue !== undefined) return customValue;
  
  const baseStep = category === 'font' ? 0 : 1;
  const ratio = config.ratio || 1.25;
  const factor = config.factor || 1.5;
  
  switch (config.mode) {
    case 'linear': return step;
    case 'exponential': return Math.pow(factor, step - baseStep);
    case 'ratio': return Math.pow(ratio, step - baseStep);
    case 'custom': return config.formula?.(step) ?? Math.pow(ratio, step - baseStep);
    default: return step;
  }
}

export const formatMultiplier = (value: number): string =>
  value === Math.floor(value) ? value.toString() : value.toFixed(4).replace(/\.?0+$/, '');