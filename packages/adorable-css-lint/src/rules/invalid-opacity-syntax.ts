/**
 * ESLint rule to detect invalid opacity syntax like bg(gray.5.7) instead of bg(gray-500.7)
 */

export const RULE_NAME = 'invalid-opacity-syntax';

export const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: '투명도 문법은 bg(gray-500.7) 형식을 사용해야 합니다',
      category: 'AdorableCSS Syntax',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      invalidOpacitySyntax: '잘못된 투명도 문법 "{{value}}"입니다. {{corrected}} 형식을 사용하세요',
    },
  },

  create(context: any) {
    const sourceCode = context.getSourceCode();

    function checkClassName(node: any, className: string) {
      // Pattern to match invalid opacity syntax like bg(gray.5.7), c(blue.3.2), etc.
      const invalidOpacityPattern = /\b(c|bg|border|text-color|border-color)\(([a-z]+)\.(\d+)\.(\d+)\)/g;
      
      let match;
      while ((match = invalidOpacityPattern.exec(className)) !== null) {
        const [fullMatch, property, colorName, intensity, opacity] = match;
        const correctedValue = `${colorName}-${intensity}00.${opacity}`;
        
        context.report({
          node,
          messageId: 'invalidOpacitySyntax',
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