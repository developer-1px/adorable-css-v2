import type { CSSRule, RuleHandler } from '../types';

// Animation: animate(name/duration/timing/iteration)
export const animate: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  const parts = value.split('/');
  const name = parts[0] || 'none';
  const duration = parts[1] || '1s';
  const timing = parts[2] || 'ease';
  const iteration = parts[3] || '1';
  
  return { animation: `${name} ${duration} ${timing} ${iteration}` };
};

export const animationRules = {
  animate,
};