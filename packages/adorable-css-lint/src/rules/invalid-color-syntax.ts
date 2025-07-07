/**
 * ESLint rule to detect invalid color syntax like c(red.6) instead of c(red-600)
 */

export const RULE_NAME = 'invalid-color-syntax';

export const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: '색상 문법은 c(red-600) 형식을 사용해야 합니다',
      category: 'AdorableCSS Syntax',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      invalidColorSyntax: '잘못된 색상 문법 "{{value}}"입니다. c({{corrected}}) 형식을 사용하세요',
    },
  },

  create(context: any) {
    const sourceCode = context.getSourceCode();

    function checkClassName(node: any, className: string) {
      // Pattern to match invalid color syntax like c(red.6), bg(blue.5), etc.
      const invalidColorPattern = /\b(c|bg|border|text-color|border-color)\(([a-z]+)\.(\d+)\)/g;
      
      let match;
      while ((match = invalidColorPattern.exec(className)) !== null) {
        const [fullMatch, property, colorName, intensity] = match;
        const correctedValue = `${colorName}-${intensity}00`;
        
        context.report({
          node,
          messageId: 'invalidColorSyntax',
          data: {
            value: fullMatch,
            corrected: `${property}(${correctedValue})`,
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
              const correctedClass = currentValue.replace(fullMatch, `${property}(${correctedValue})`);
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