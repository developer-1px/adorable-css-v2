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

// Animation delay: delay(100) or delay(0.1s)
export const delay: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  // If it's just a number, treat it as milliseconds
  if (!isNaN(Number(value))) {
    return { 'animation-delay': `${value}ms` };
  }
  
  // Otherwise use as is (e.g., "0.5s", "200ms")
  return { 'animation-delay': value };
};

// Animation duration: duration(1000) or duration(1s)
export const duration: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  // If it's just a number, treat it as milliseconds
  if (!isNaN(Number(value))) {
    return { 'animation-duration': `${value}ms` };
  }
  
  // Otherwise use as is (e.g., "1s", "500ms")
  return { 'animation-duration': value };
};

export const animationRules = {
  animate,
  delay,
  duration,
};