/**
 * ESLint rule to detect unsupported stroke syntax like stroke(2.gray.6)
 */

export const RULE_NAME = 'unsupported-stroke-syntax';

export const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'stroke 문법은 지원되지 않습니다. text-stroke나 CSS 직접 사용을 권장합니다',
      category: 'AdorableCSS Syntax',
      recommended: true,
    },
    fixable: false,
    schema: [],
    messages: {
      unsupportedStroke: 'stroke 문법 "{{value}}"는 지원되지 않습니다. text-stroke() 또는 CSS의 -webkit-text-stroke를 사용하세요',
    },
  },

  create(context: any) {
    const sourceCode = context.getSourceCode();

    function checkClassName(node: any, className: string) {
      // Pattern to match stroke syntax like stroke(2.gray.6), stroke(1/red), etc.
      const strokePattern = /\bstroke\([^)]+\)/g;
      
      let match;
      while ((match = strokePattern.exec(className)) !== null) {
        const [fullMatch] = match;
        
        context.report({
          node,
          messageId: 'unsupportedStroke',
          data: {
            value: fullMatch,
          },
        });
      }
    }

    return {
      Literal(node: any) {
        if (node.parent && node.parent.type === 'JSXExpressionContainer') return;
        if (typeof node.value === 'string') {
          checkClassName(node, node.value);
        }
      },
      JSXAttribute(node: any) {
        if (node.name && node.name.name === 'class' && node.value) {
          if (node.value.type === 'Literal') {
            checkClassName(node, node.value.value);
          } else if (node.value.type === 'JSXExpressionContainer' && node.value.expression.type === 'Literal') {
            checkClassName(node, node.value.expression.value);
          }
        }
      },
    };
  },
};

export default rule;