import type { Rule } from 'eslint';

export interface AdorableCSSRuleContext extends Rule.RuleContext {
  // AdorableCSS 관련 추가 컨텍스트가 필요하면 여기에 정의
}

export interface ClassNameMatch {
  value: string;
  start: number;
  end: number;
  raw: string;
}

export interface LintError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning' | 'suggestion';
  rule: string;
  suggestion?: string;
  fix?: string;
}

export interface AdorableCSSRuleDefinition extends Rule.RuleModule {
  meta: Rule.RuleMetaData & {
    docs: {
      description: string;
      category: 'Possible Errors' | 'Best Practices' | 'Stylistic Issues';
      recommended: boolean;
      url?: string;
    };
    fixable?: 'code' | 'whitespace';
    schema: any[];
    messages: Record<string, string>;
  };
}