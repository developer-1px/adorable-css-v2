import type { RuleHandler, CSSRule } from '../../rules/types';

// Scale utilities
export const scale: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  // Convert percentage to decimal (98% -> 0.98)
  if (value.endsWith('%')) {
    const percent = parseFloat(value.slice(0, -1));
    return { transform: `scale(${percent / 100})` };
  }
  
  return { transform: `scale(${value})` };
};

// Rotate utilities
export const rotate: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  // Add 'deg' if it's just a number
  if (/^\d+$/.test(value)) {
    return { transform: `rotate(${value}deg)` };
  }
  
  return { transform: `rotate(${value})` };
};

// Translate utilities
export const translate: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  // translate(x/y) format
  if (value.includes('/')) {
    const [x, y] = value.split('/');
    return { transform: `translate(${x}, ${y})` };
  }
  
  return { transform: `translate(${value})` };
};

// Aspect ratio utilities
export const aspect: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  // aspect(16/9) or aspect(1/1) format
  if (value.includes('/')) {
    return { 'aspect-ratio': value };
  }
  
  return { 'aspect-ratio': value };
};

// Object fit utilities
export const object: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  const objectMap: Record<string, string> = {
    contain: 'contain',
    cover: 'cover',
    fill: 'fill',
    none: 'none',
    'scale-down': 'scale-down'
  };
  
  return { 'object-fit': objectMap[value] || value };
};

export const transformRules = {
  scale,
  rotate,
  translate,
  aspect,
  object
};