/**
 * ESLint rule to detect size() syntax and suggest w() h() instead
 */

export const RULE_NAME = 'use-width-height-instead-of-size';

export const rule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'size() 대신 w()와 h()를 사용해야 합니다',
      category: 'AdorableCSS Syntax',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      useSeparateWidthHeight: 'size({{value}}) 대신 w({{value}}) h({{value}})를 사용하세요',
    },
  },

  create(context: any) {
    const sourceCode = context.getSourceCode();

    function checkClassName(node: any, className: string) {
      // Pattern to match size() syntax like size(8), size(32), etc.
      const sizePattern = /\bsize\(([^)]+)\)/g;
      
      let match;
      while ((match = sizePattern.exec(className)) !== null) {
        const [fullMatch, value] = match;
        
        context.report({
          node,
          messageId: 'useSeparateWidthHeight',
          data: {
            value: value,
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
              const correctedClass = currentValue.replace(fullMatch, `w(${value}) h(${value})`);
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