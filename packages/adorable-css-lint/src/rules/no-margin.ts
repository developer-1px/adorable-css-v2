import type { Rule } from 'eslint';
import { extractClassNames, parseClassString, parseCSSFunction } from '../parsers/class-parser';
import type { AdorableCSSRuleDefinition } from '../types';

/**
 * margin 사용을 금지하고 gap 기반 레이아웃을 권장하는 규칙
 */
export const noMargin: AdorableCSSRuleDefinition = {
  meta: {
    type: 'problem',
    docs: {
      description: 'AdorableCSS에서 margin 사용을 금지하고 gap 기반 레이아웃 사용을 권장합니다',
      category: 'Best Practices',
      recommended: true,
      url: 'https://adorable-css.com/docs/rules/no-margin'
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          allowedMargins: {
            type: 'array',
            items: { type: 'string' },
            description: '예외적으로 허용할 margin 클래스들'
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      noMargin: 'margin 클래스 "{{className}}"는 사용할 수 없습니다. {{suggestion}}을 사용하세요.',
      noMarginGeneric: 'margin 사용 대신 gap 기반 레이아웃(vbox, hbox)을 사용하세요.'
    }
  },

  create(context: Rule.RuleContext) {
    const options = context.options[0] || {};
    const allowedMargins = new Set(options.allowedMargins || []);
    
    // margin 패턴들
    const marginPatterns = [
      'm', 'mx', 'my', 'mt', 'mr', 'mb', 'ml'
    ];
    
    // margin 대안 제안
    const suggestions: Record<string, string> = {
      'm': 'vbox gap() 또는 hbox gap()',
      'mx': 'hbox(pack) 또는 w(fit) mx(auto)',
      'my': 'vbox gap()',
      'mt': 'vbox gap()으로 부모에서 관리',
      'mr': 'hbox gap()으로 부모에서 관리', 
      'mb': 'vbox gap()으로 부모에서 관리',
      'ml': 'hbox gap()으로 부모에서 관리'
    };

    function checkClassName(className: string, node: any, start: number) {
      const cssFunction = parseCSSFunction(className);
      
      if (!cssFunction) return;
      
      const { name } = cssFunction;
      
      // margin 패턴 확인
      if (marginPatterns.includes(name)) {
        // 허용된 margin인지 확인
        if (allowedMargins.has(className)) {
          return;
        }
        
        const suggestion = suggestions[name] || suggestions.m;
        
        context.report({
          node,
          messageId: 'noMargin',
          data: {
            className,
            suggestion
          },
          fix(fixer) {
            // 간단한 자동 수정 예시
            if (name === 'mb' || name === 'mt') {
              return fixer.replaceTextRange(
                [start, start + className.length],
                `/* TODO: ${className}를 vbox gap()으로 변경 */`
              );
            }
            return null;
          }
        });
      }
    }

    return {
      // JSX className 속성 검사
      JSXAttribute(node: any) {
        if (node.name.name !== 'className') return;
        
        const classMatches = extractClassNames('', node);
        
        classMatches.forEach(match => {
          const classes = parseClassString(match.value);
          let currentPos = match.start;
          
          classes.forEach(className => {
            checkClassName(className, node, currentPos);
            currentPos += className.length + 1; // +1 for space
          });
        });
      },

      // 템플릿 리터럴에서 클래스명 검사 (추후 구현)
      TemplateLiteral(node: any) {
        // TODO: `bg-white ${margin} text-black` 같은 패턴 처리
      },

      // HTML 파일의 class 속성 (추후 구현)
      Attribute(node: any) {
        // TODO: HTML 파일 지원
      }
    };
  }
};