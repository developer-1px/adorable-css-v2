import { defineComponent } from '../defineComponent-unified';
import type { StringRuleHandler } from '../../rules/types';

// Code component - semantic typography for code snippets
export const codeString: StringRuleHandler = (args?: string) => {
  const baseStyles = 'mono';
  
  if (!args) {
    // Default inline code style
    return `${baseStyles} caption(sm) bg(gray-100) px(xs) py(0.5) r(sm)`;
  }
  
  // Handle size variants
  const sizeMap: Record<string, string> = {
    'xs': `${baseStyles} caption(xs)`,
    'sm': `${baseStyles} caption(sm)`,
    'md': `${baseStyles} body(sm)`,
    'lg': `${baseStyles} body(md)`,
    'base': `${baseStyles} body(sm)`,
    // Special code variants
    'inline': `${baseStyles} caption(sm) bg(gray-100) px(xs) py(0.5) r(sm)`,
    'block': `${baseStyles} body(sm) block bg(gray-900) c(gray-100) p(lg) r(lg) overflow-x(auto)`,
    'minimal': `${baseStyles} caption(sm)`,
    // Colored variants
    'primary': `${baseStyles} caption(sm) bg(primary-100) c(primary-700) px(xs) py(0.5) r(sm)`,
    'success': `${baseStyles} caption(sm) bg(success-100) c(success-700) px(xs) py(0.5) r(sm)`,
    'warning': `${baseStyles} caption(sm) bg(warning-100) c(warning-900) px(xs) py(0.5) r(sm)`,
    'error': `${baseStyles} caption(sm) bg(error-100) c(error-700) px(xs) py(0.5) r(sm)`,
  };
  
  return sizeMap[args] || `${baseStyles} ${args}`;
};

// Export the rule
export const codeRule = {
  code: codeString
};