import type { Rule } from 'eslint';
import { extractClassNames, parseClassString, parseCSSFunction } from '../parsers/class-parser';
import type { AdorableCSSRuleDefinition } from '../types';

/**
 * hbox/vbox에서 center+middle 대신 pack 사용을 권장하는 규칙
 */
export const boxPackSyntax: AdorableCSSRuleDefinition = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'hbox/vbox에서 center+middle 조합 대신 pack 사용을 권장합니다',
      category: 'Best Practices',
      recommended: true,
      url: 'https://adorable-css.com/docs/rules/box-pack-syntax'
    },
    fixable: 'code',
    schema: [],
    messages: {
      usePackSyntax: '"{{className}}" 대신 "{{suggestion}}"을 사용하세요. center+middle은 pack과 동일합니다.',
      invalidCombination: '"{{className}}"에서 잘못된 조합입니다. center와 middle은 함께 사용할 수 없습니다.'
    }
  },

  create(context: Rule.RuleContext) {
    function checkClassName(className: string, node: Rule.Node, _loc?: { start: number; end: number }) {
      const cssFunction = parseCSSFunction(className);
      
      if (!cssFunction) return;
      
      const { name, value } = cssFunction;
      
      // hbox 또는 vbox인지 확인
      if (name === 'hbox' || name === 'vbox') {
        // value가 center+middle 또는 middle+center 패턴인지 확인
        const normalizedValue = value.replace(/\s/g, '');
        
        if (normalizedValue === 'center+middle' || normalizedValue === 'middle+center') {
          const suggestion = `${name}(pack)`;
          
          context.report({
            node,
            messageId: 'usePackSyntax',
            data: {
              className,
              suggestion
            }
            // auto-fix 제거
          });
        }
        
        // center와 middle이 다른 값과 함께 사용되는 경우도 체크
        const values = value.split('+').map(v => v.trim());
        if (values.includes('center') && values.includes('middle') && values.length > 2) {
          // center+middle+다른값 형태인 경우
          const otherValues = values.filter(v => v !== 'center' && v !== 'middle');
          const suggestion = `${name}(pack+${otherValues.join('+')})`;
          
          context.report({
            node,
            messageId: 'usePackSyntax',
            data: {
              className,
              suggestion
            }
            // auto-fix 제거
          });
        }
      }
    }

    return {
      // JSX className 속성 검사
      JSXAttribute(node: Rule.Node) {
        if (node.name.name !== 'className') return;
        
        const classMatches = extractClassNames('', node);
        
        classMatches.forEach(match => {
          const classes = parseClassString(match.value);
          let currentPos = match.start + 1; // +1 for opening quote
          
          classes.forEach(className => {
            const loc = {
              start: currentPos,
              end: currentPos + className.length
            };
            checkClassName(className, node, loc);
            currentPos += className.length + 1; // +1 for space
          });
        });
      },

      // 템플릿 리터럴에서 클래스명 검사
      TemplateLiteral(_node: Rule.Node) {
        // TODO: 추후 구현
      },

      // Svelte class attribute support
      SvelteAttribute(node: Rule.Node) {
        if (node.key?.name !== 'class') return;
        
        // Handle SvelteLiteral values
        if (node.value && Array.isArray(node.value)) {
          node.value.forEach((valueNode: any) => {
            if (valueNode.type === 'SvelteLiteral' && typeof valueNode.value === 'string') {
              const classes = parseClassString(valueNode.value);
              let currentPos = valueNode.start + 1; // +1 for quote
              
              classes.forEach(className => {
                const loc = {
                  start: currentPos,
                  end: currentPos + className.length
                };
                checkClassName(className, node, loc);
                currentPos += className.length + 1;
              });
            }
          });
        }
      },
      
      // Support for class directives like class:active={condition}
      SvelteDirective(node: Rule.Node) {
        if (node.kind !== 'Class') return;
        
        // For class:name={condition}, check the name part
        if (node.key?.name?.name) {
          const className = node.key.name.name;
          // For now, disable auto-fix for SvelteDirective nodes due to range issues
          const modifiedNode = { ...node, __noAutoFix: true };
          checkClassName(className, modifiedNode);
        }
      }
    };
  }
};