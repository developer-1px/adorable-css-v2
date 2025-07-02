import type { CSSRule, RuleHandler } from '../types';

/**
 * Enhanced transform utilities that support multiple transforms
 * transform(rotate(45)+scale(1.2)) -> transform: rotate(45deg) scale(1.2)
 * transform(translateX(50%)+rotate(45)) -> transform: translateX(50%) rotate(45deg)
 */
export const transform: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { transform: 'none' };
  
  if (args === 'none') {
    return { transform: 'none' };
  }
  
  // Handle multiple transforms separated by +
  if (args.includes('+')) {
    const transforms = args.split('+').map(parseTransform).join(' ');
    return { transform: transforms };
  }
  
  // Handle single transform
  return { transform: parseTransform(args) };
};

/**
 * Parse individual transform function
 */
function parseTransform(transformStr: string): string {
  const trimmed = transformStr.trim();
  
  // Handle function-style transforms like rotate(45), scale(1.2), etc.
  const functionMatch = trimmed.match(/^([a-zA-Z]+)\(([^)]*)\)$/);
  if (functionMatch) {
    const [, func, value] = functionMatch;
    return formatTransformFunction(func, value);
  }
  
  // Handle simple values that need function wrapping
  if (trimmed.startsWith('rotate')) {
    const value = trimmed.replace('rotate', '').replace(/[()]/g, '');
    return `rotate(${addDegreeUnit(value)})`;
  }
  
  if (trimmed.startsWith('scale')) {
    const value = trimmed.replace('scale', '').replace(/[()]/g, '');
    return `scale(${value})`;
  }
  
  return trimmed;
}

/**
 * Format transform function with proper units
 */
function formatTransformFunction(func: string, value: string): string {
  switch (func) {
    case 'rotate':
    case 'rotateX':
    case 'rotateY':
    case 'rotateZ':
      return `${func}(${addDegreeUnit(value)})`;
    
    case 'translate':
    case 'translateX':
    case 'translateY':
    case 'translateZ':
      return `${func}(${addLengthUnit(value)})`;
    
    case 'scale':
    case 'scaleX':
    case 'scaleY':
    case 'scaleZ':
      return `${func}(${value})`;
    
    case 'skew':
    case 'skewX':
    case 'skewY':
      return `${func}(${addDegreeUnit(value)})`;
    
    default:
      return `${func}(${value})`;
  }
}

/**
 * Add degree unit if not present
 */
function addDegreeUnit(value: string): string {
  if (value.includes('deg') || value.includes('rad') || value.includes('turn')) {
    return value;
  }
  return `${value}deg`;
}

/**
 * Add length unit if not present and not percentage
 */
function addLengthUnit(value: string): string {
  if (value.includes('%') || value.includes('px') || value.includes('rem') || value.includes('em') || value.includes('vh') || value.includes('vw')) {
    return value;
  }
  // If it's a number, add px
  if (!isNaN(Number(value))) {
    return `${value}px`;
  }
  return value;
}

/**
 * Transform origin utilities
 * transform-origin(center) -> transform-origin: center
 * transform-origin(top+left) -> transform-origin: top left
 */
export const transformOrigin: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'transform-origin': 'center' };
  
  // Handle combined values like "top+left"
  if (args.includes('+')) {
    const values = args.split('+').join(' ');
    return { 'transform-origin': values };
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
  
  return { 'transform-origin': presetValues[args] || args };
};

/**
 * Scale utility - shorthand for transform: scale()
 */
export const scale: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { transform: 'scale(1)' };
  return { transform: `scale(${args})` };
};

/**
 * Rotate utility - shorthand for transform: rotate()
 */
export const rotate: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { transform: 'rotate(0deg)' };
  return { transform: `rotate(${addDegreeUnit(args)})` };
};

export const transformRules = {
  transform,
  'transform-origin': transformOrigin,
  scale,
  rotate,
};