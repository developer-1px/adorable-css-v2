import { defineComponent } from '../defineComponent-unified';
import type { ComponentDefinition } from '../defineComponent-unified';

// Input component definition
export const inputDefinition: ComponentDefinition = {
  base: 'flex h(40) w(full) r(md) px(12) py(8) font(sm) c(gray-900) bg(transparent) outline(none) transition-all placeholder:c(gray-500)',

  variants: {
    default: 'border(1/gray-200) hover:border(gray-300) focus:border(gray-900) focus:ring(1/gray-900) disabled:cursor(not-allowed) disabled:opacity(50) disabled:bg(gray-50)',
    ghost: 'bg(gray-100) border(1/transparent) hover:bg(gray-200) focus:bg(white) focus:border(gray-900) focus:ring(1/gray-900) disabled:cursor(not-allowed) disabled:opacity(50)',
    underlined: 'px(0) r(0) border(none) border-b(1/gray-300) hover:border-b(gray-400) focus:border-b(2/gray-900) focus:pb(7) disabled:cursor(not-allowed) disabled:opacity(50) disabled:border-b(gray-200)',
    error: 'border(1/red-500) hover:border(red-600) focus:border(red-500) focus:ring(1/red-500) disabled:cursor(not-allowed) disabled:opacity(50) disabled:bg(gray-50) disabled:border(red-300)'
  },
  
  states: {
    hover: 'border(gray-300)',
    focus: 'border(gray-900) ring(1/gray-900)',
    disabled: 'cursor(not-allowed) opacity(50) bg(gray-50)'
  }
};

// Input component using defineComponent
export const inputString = defineComponent(inputDefinition);

// Textarea component definition
export const textareaDefinition: ComponentDefinition = {
  base: 'flex w(full) r(md) font(sm) c(gray-900) bg(transparent) resize(vertical) outline(none) transition-all lh(1.5) placeholder:c(gray-500) border(1/gray-200) hover:border(gray-300) focus:border(gray-900) focus:ring(1/gray-900) disabled:cursor(not-allowed) disabled:opacity(50) disabled:bg(gray-50) disabled:resize(none)',
  
  sizes: {
    sm: 'min-h(80) py(8) px(12)',
    default: 'min-h(120) py(12) px(12)',
    lg: 'min-h(160) py(16) px(16)'
  }
};

// Textarea component using defineComponent
export const textareaString = defineComponent(textareaDefinition);

// Export string-based 03-rules
export const inputRules = {
  'input': inputString,
  'textarea': textareaString
};