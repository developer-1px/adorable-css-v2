/**
 * ESLint rule to detect unsupported gradient syntax like bg(gradient-to-r/black/0/black/0.8)
 */

export const RULE_NAME = 'unsupported-gradient-syntax';

export const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: '그라디언트 문법은 현재 지원되지 않습니다. CSS 직접 사용을 권장합니다',
      category: 'AdorableCSS Syntax',
      recommended: true,
    },
    fixable: false,
    schema: [],
    messages: {
      unsupportedGradient: '그라디언트 문법 "{{value}}"는 지원되지 않습니다. style 속성에서 CSS gradient를 직접 사용하세요',
    },
  },

  create(context: any) {
    const sourceCode = context.getSourceCode();

    function checkClassName(node: any, className: string) {
      // Pattern to match gradient syntax like bg(gradient-to-r/...), bg(gradient-to-t/...), etc.
      const gradientPattern = /\b(bg|background)\(gradient-[a-z-]+\/[^)]+\)/g;
      
      let match;
      while ((match = gradientPattern.exec(className)) !== null) {
        const [fullMatch] = match;
        
        context.report({
          node,
          messageId: 'unsupportedGradient',
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