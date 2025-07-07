// Type definitions
type CSSRule = Record<string, string | Record<string, any>>;
export type RuleHandler = (args: string) => CSSRule;
export type KeywordRuleHandler = () => CSSRule;
import type { StringRuleHandler } from '../defineComponent-unified';
// Code block component for displaying code snippets
export const codeBlockString: StringRuleHandler = (_args?: string): string | (string | CSSRule)[] => {
  return [
    'r(lg) p(24) overflow(auto) text(mono/sm) leading(relaxed) bg(gray-50) c(black)',
  ];
};

// Inline code component
export const inlineCodeString: StringRuleHandler = (): string | (string | CSSRule)[] => {
  return [
    'text(mono/sm) px(6) py(2) r(sm)',
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