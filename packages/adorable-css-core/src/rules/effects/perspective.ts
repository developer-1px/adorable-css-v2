import { CSSRule, RuleHandler } from '../../types';

/**
 * Perspective utilities for 3D transforms
 * perspective(1000) -> perspective: 1000px
 * perspective(none) -> perspective: none
 */
export const perspective: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { perspective: '1000px' };
  
  if (args === 'none') {
    return { perspective: 'none' };
  }
  
  // Handle numeric values
  if (!isNaN(Number(args))) {
    return { perspective: `${args}px` };
  }
  
  // Handle values with units
  return { perspective: args };
};

/**
 * Transform style utilities for 3D
 * transform-style(preserve-3d) -> transform-style: preserve-3d
 * transform-style(flat) -> transform-style: flat
 */
export const transformStyle: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'transform-style': 'preserve-3d' };
  
  const validValues = ['preserve-3d', 'flat'];
  if (validValues.includes(args)) {
    return { 'transform-style': args };
  }
  
  return { 'transform-style': args };
};

/**
 * Perspective origin utilities
 * perspective-origin(center) -> perspective-origin: center
 * perspective-origin(top+left) -> perspective-origin: top left
 */
export const perspectiveOrigin: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'perspective-origin': 'center' };
  
  // Handle combined values like "top+left"
  if (args.includes('+')) {
    const values = args.split('+').join(' ');
    return { 'perspective-origin': values };
  }
  
  const presetValues: Record<string, string> = {
    'center': 'center',
    'top': 'top',
    'bottom': 'bottom',
    'left': 'left',
    'right': 'right',
    'top-left': 'top left',
    'top-right': 'top right',
    'bottom-left': 'bottom left',
    'bottom-right': 'bottom right',
  };
  
  return { 'perspective-origin': presetValues[args] || args };
};

/**
 * Backface visibility utilities
 * backface(hidden) -> backface-visibility: hidden
 * backface(visible) -> backface-visibility: visible
 */
export const backface: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'backface-visibility': 'hidden' };
  
  const validValues = ['hidden', 'visible'];
  if (validValues.includes(args)) {
    return { 'backface-visibility': args };
  }
  
  return { 'backface-visibility': args };
};

export const perspectiveRules = {
  perspective,
  'transform-style': transformStyle,
  'perspective-origin': perspectiveOrigin,
  backface,
};