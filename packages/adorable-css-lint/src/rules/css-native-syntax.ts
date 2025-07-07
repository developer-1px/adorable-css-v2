import type { Rule } from 'eslint';
import { extractClassNames, parseClassString, parseCSSFunction } from '../parsers/class-parser';
import type { AdorableCSSRuleDefinition } from '../types';

/**
 * CSS 네이티브 문법 사용을 강제하는 규칙
 * scale(1.05), opacity(0.8), rotate(45deg) 등
 */
export const cssNativeSyntax: AdorableCSSRuleDefinition = {
  meta: {
    type: 'problem',
    docs: {
      description: 'CSS 네이티브 문법 사용을 강제합니다 (scale(1.05), opacity(0.8) 등)',
      category: 'Best Practices',
      recommended: true,
      url: 'https://adorable-css.com/docs/rules/css-native-syntax'
    },
    fixable: 'code',
    schema: [],
    messages: {
      invalidScale: 'scale({{value}})는 잘못된 문법입니다. scale({{fix}})를 사용하세요.',
      invalidOpacity: 'opacity({{value}})는 잘못된 문법입니다. opacity({{fix}})를 사용하세요.',
      invalidRotate: 'rotate({{value}})에는 단위가 필요합니다. rotate({{fix}})를 사용하세요.',
      invalidTransform: 'transform에 하이픈 문법은 사용할 수 없습니다. {{fix}}를 사용하세요.',
      cssNative: '{{property}}에는 CSS 네이티브 값을 사용하세요: {{suggestion}}'
    }
  },

  create(context: Rule.RuleContext) {
    
    // CSS 속성별 검증 규칙
    const validationRules = {
      scale: {
        // scale(105) → scale(1.05)
        validate: (value: string) => {
          const num = parseFloat(value);
          if (num > 10) {
            return {
              valid: false,
              fix: (num / 100).toString()
            };
          }
          return { valid: true };
        }
      },
      
      opacity: {
        // opacity(80) → opacity(0.8)  
        validate: (value: string) => {
          const num = parseFloat(value);
          if (num > 1) {
            return {
              valid: false,
              fix: (num / 100).toString()
            };
          }
          return { valid: true };
        }
      },
      
      rotate: {
        // rotate(45) → rotate(45deg)
        validate: (value: string) => {
          const num = parseFloat(value);
          if (!isNaN(num) && !value.includes('deg') && !value.includes('rad') && !value.includes('turn')) {
            return {
              valid: false,
              fix: `${value}deg`
            };
          }
          return { valid: true };
        }
      }
    };

    // transform 하이픈 문법 확인 (scale-105, rotate-45 등)
    const hyphenTransformPattern = /^(scale|rotate|translate|skew)-(\d+)$/;

    function checkClassName(className: string, node: any, start: number) {
      // 하이픈 transform 문법 확인
      const hyphenMatch = className.match(hyphenTransformPattern);
      if (hyphenMatch) {
        const [, property, value] = hyphenMatch;
        const fix = property === 'scale' 
          ? `scale(${parseInt(value) / 100})`
          : `${property}(${value}deg)`;
          
        context.report({
          node,
          messageId: 'invalidTransform',
          data: { fix }
          // auto-fix 제거
        });
        return;
      }

      // CSS 함수 문법 확인
      const cssFunction = parseCSSFunction(className);
      if (!cssFunction) return;
      
      const { name, value } = cssFunction;
      const rule = validationRules[name as keyof typeof validationRules];
      
      if (rule) {
        const result = rule.validate(value);
        
        if (!result.valid && result.fix) {
          const messageId = `invalid${name.charAt(0).toUpperCase() + name.slice(1)}` as any;
          
          context.report({
            node,
            messageId,
            data: {
              value,
              fix: result.fix
            }
            // auto-fix 제거
          });
        }
      }
    }

    return {
      JSXAttribute(node: any) {
        if (node.name.name !== 'className') return;
        
        const classMatches = extractClassNames('', node);
        
        classMatches.forEach(match => {
          const classes = parseClassString(match.value);
          let currentPos = match.start;
          
          classes.forEach(className => {
            checkClassName(className, node, currentPos);
            currentPos += className.length + 1;
          });
        });
      }
    };
  }
};