import { rule2 } from '../ast-utils/rule2-helpers';

/**
 * Animation utilities for Rule2 system
 * Simplified animation handlers that work with the showroom
 */

// Simple animation handler that just sets animation property
export const float = rule2((s) => {
  const args = s.args || s.selector?.args;
  
  // Default float animation
  if (!args || args.length === 0) {
    return 'animation: float 6s ease-in-out infinite';
  }
  
  // Parse value like "6s/ease-in-out/repeat:infinite"
  const firstArg = args[0];
  const value = firstArg.image || firstArg.value || firstArg;
  const valueStr = String(value);
  
  // Simple parsing for duration/easing/repeat
  if (valueStr.includes('/')) {
    const parts = valueStr.split('/');
    let duration = '6s';
    let easing = 'ease-in-out';
    let iteration = 'infinite';
    
    parts.forEach(part => {
      const trimmed = part.trim();
      if (trimmed.match(/^\d*\.?\d+(ms|s)$/)) {
        duration = trimmed;
      } else if (trimmed.includes('ease') || trimmed === 'linear') {
        easing = trimmed;
      } else if (trimmed.startsWith('repeat:')) {
        iteration = trimmed.replace('repeat:', '');
      }
    });
    
    return `animation: float ${duration} ${easing} ${iteration}`;
  }
  
  return `animation: float ${valueStr}`;
});

export const slideUp = rule2((s) => {
  const args = s.args || s.selector?.args;
  
  // Default slide-up animation
  if (!args || args.length === 0) {
    return 'opacity: 0; animation: slide-up 0.6s ease-out forwards';
  }
  
  // Parse value like "0.6s/ease-out"
  const firstArg = args[0];
  const value = firstArg.image || firstArg.value || firstArg;
  const valueStr = String(value);
  
  if (valueStr.includes('/')) {
    const parts = valueStr.split('/');
    let duration = '0.6s';
    let easing = 'ease-out';
    
    parts.forEach(part => {
      const trimmed = part.trim();
      if (trimmed.match(/^\d*\.?\d+(ms|s)$/)) {
        duration = trimmed;
      } else if (trimmed.includes('ease') || trimmed === 'linear') {
        easing = trimmed;
      }
    });
    
    return `opacity: 0; animation: slide-up ${duration} ${easing} forwards`;
  }
  
  return `opacity: 0; animation: slide-up ${valueStr} forwards`;
});

export const animationHandlers = {
  float,
  'slide-up': slideUp
};