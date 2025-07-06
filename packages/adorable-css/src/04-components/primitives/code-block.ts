import type { StringRuleHandler, CSSRule } from '../../03-rules/types';

// Code block component for displaying code snippets
export const codeBlockString: StringRuleHandler = (_args?: string): string | (string | CSSRule)[] => {
  return [
    'r(lg) p(24) overflow(auto) font(mono/sm) leading(relaxed) bg(gray-50) c(black)',
  ];
};

// Inline code component
export const inlineCodeString: StringRuleHandler = (): string | (string | CSSRule)[] => {
  return [
    'font(mono/sm) px(6) py(2) r(sm)',
    {
      'background': 'var(--gray-100)',
      'color': 'var(--gray-800)',
      'border': '1px solid var(--gray-200)'
    }
  ];
};

// Export the 03-rules
export const codeBlockRules = {
  'code-block': codeBlockString,
  'inline-code': inlineCodeString
};