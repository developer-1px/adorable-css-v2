/**
 * ESLint rule to detect invalid border syntax like border-l(3/white) instead of border-l(3/solid/white)
 */

export const RULE_NAME = 'invalid-border-syntax';

export const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'border 문법은 border-l(3/solid/white) 형식을 사용해야 합니다',
      category: 'AdorableCSS Syntax',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      invalidBorderSyntax: '잘못된 border 문법 "{{value}}"입니다. {{corrected}} 형식을 사용하세요',
    },
  },

  create(context: any) {
    const sourceCode = context.getSourceCode();

    function checkClassName(node: any, className: string) {
      // Pattern to match invalid border syntax like border-l(3/white), border-t(2/red), etc.
      const invalidBorderPattern = /\b(border-[ltrbxy]?)\((\d+)\/([a-z-]+(?:\.\d+)?)\)/g;
      
      let match;
      while ((match = invalidBorderPattern.exec(className)) !== null) {
        const [fullMatch, borderSide, width, color] = match;
        const correctedValue = `${borderSide}(${width}/solid/${color})`;
        
        context.report({
          node,
          messageId: 'invalidBorderSyntax',
          data: {
            value: fullMatch,
            corrected: correctedValue,
          },
          fix(fixer: any) {
            // Determine the correct target node and its value
            let targetNode, currentValue;
            if (node.name && (node.name.name === 'class' || node.name.name === 'className')) {
              // JSX attribute case
              targetNode = node.value;
              currentValue = node.value.value;
            } else {
              // Literal case
              targetNode = node;
              currentValue = node.value;
            }
            
            if (typeof currentValue === 'string') {
              const correctedClass = currentValue.replace(fullMatch, correctedValue);
              return fixer.replaceText(targetNode, `"${correctedClass}"`);
            }
            return null;
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
        if (node.name && (node.name.name === 'class' || node.name.name === 'className') && node.value) {
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