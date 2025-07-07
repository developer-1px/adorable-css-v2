import type { Rule } from 'eslint';

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "Suggest using layer instead of layer",
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code',
    messages: {
      useLayer: 'Use "layer" instead of "absolute inset(0)" for better readability',
    },
  },
  create(context) {
    return {
      Literal(node) {
        if (typeof node.value !== 'string') return;
        
        const value = node.value;
        
        // Check for various patterns of absolute inset(0)
        const patterns = [
          /\babsolute\s+inset\(0\)/g,
          /\binset\(0\)\s+absolute/g,
        ];
        
        let hasMatch = false;
        let matchedPattern: RegExp | null = null;
        
        for (const pattern of patterns) {
          if (pattern.test(value)) {
            hasMatch = true;
            matchedPattern = pattern;
            break;
          }
        }
        
        if (hasMatch && matchedPattern) {
          context.report({
            node,
            messageId: 'useLayer'
            // auto-fix 제거
          });
        }
      },
    };
  },
};

export default rule;