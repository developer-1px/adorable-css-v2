import type { CSSRule, RuleHandler } from '../types';

// List style handler
export const list: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'list-style': 'none' };
  
  // Handle common list style types
  const listTypes = [
    'none', 
    'disc', 
    'circle', 
    'square', 
    'decimal', 
    'decimal-leading-zero',
    'lower-alpha', 
    'upper-alpha', 
    'lower-roman', 
    'upper-roman',
    'lower-greek',
    'armenian',
    'georgian',
    'hebrew',
    'hiragana',
    'katakana',
    'hiragana-iroha',
    'katakana-iroha'
  ];
  
  if (listTypes.includes(args)) {
    return { 'list-style-type': args };
  }
  
  // Handle position values
  if (args === 'inside' || args === 'outside') {
    return { 'list-style-position': args };
  }
  
  // Handle 'initial', 'inherit', 'unset'
  if (['initial', 'inherit', 'unset'].includes(args)) {
    return { 'list-style': args };
  }
  
  // Default to none if unrecognized
  return { 'list-style': 'none' };
};

// List style type handler
export const listStyle: RuleHandler = (args?: string): CSSRule => {
  return list(args);
};

// List style position handler
export const listPosition: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'list-style-position': 'outside' };
  
  if (args === 'inside' || args === 'outside') {
    return { 'list-style-position': args };
  }
  
  return { 'list-style-position': 'outside' };
};

// Export all list utilities
export const listRules = {
  list,
  'list-style': listStyle,
  'list-position': listPosition,
};