import type { Rule } from 'eslint';
import { extractClassNames, parseClassString, parseCSSFunction } from '../parsers/class-parser';
import type { AdorableCSSRuleDefinition } from '../types';

/**
 * AdorableCSS 점 표기법 강제 (bg(white.5) vs bg(white/50))
 */
export const opacityDotSyntax: AdorableCSSRuleDefinition = {
  meta: {
    type: 'problem',
    docs: {
      description: 'AdorableCSS 점 표기법을 강제합니다 (bg(white.5) vs bg(white/50))',
      category: 'Stylistic Issues',
      recommended: true,
      url: 'https://adorable-css.com/docs/rules/opacity-dot-syntax'
    },
    fixable: 'code',
    schema: [],
    messages: {
      useSlashSyntax: '{{property}}에서 슬래시(/) 대신 점(.) 표기법을 사용하세요: {{fix}}',
      invalidOpacityRange: '투명도 값은 0-1 사이여야 합니다: {{value}}'
    }
  },

  create(context: Rule.RuleContext) {
    
    // 투명도를 지원하는 CSS 속성들
    const opacityProperties = [
      'bg', 'background',
      'c', 'color', 'text',
      'border', 'b', 'bt', 'br', 'bb', 'bl',
      'shadow', 'drop-shadow'
    ];

    function checkClassName(className: string, node: any, start: number) {
      const cssFunction = parseCSSFunction(className);
      if (!cssFunction) return;
      
      const { name, value } = cssFunction;
      
      // 투명도 지원 속성인지 확인
      if (!opacityProperties.includes(name)) return;
      
      // 슬래시 표기법 확인: bg(white/50), c(black/80)
      const slashMatch = value.match(/^([^/]+)\/(\d+)$/);
      if (slashMatch) {
        const [, color, opacityPercent] = slashMatch;
        const opacityDecimal = parseInt(opacityPercent) / 100;
        
        // 유효한 투명도 범위 확인
        if (opacityDecimal < 0 || opacityDecimal > 1) {
          context.report({
            node,
            messageId: 'invalidOpacityRange',
            data: { value: opacityPercent }
          });
          return;
        }
        
        const fix = `${name}(${color}.${opacityDecimal})`;
        
        context.report({
          node,
          messageId: 'useSlashSyntax',
          data: {
            property: name,
            fix
          }
          // auto-fix 제거
        });
      }
      
      // 점 표기법이지만 잘못된 값 확인: bg(white.150)
      const dotMatch = value.match(/^([^.]+)\.(\d*\.?\d+)$/);
      if (dotMatch) {
        const [, color, opacityValue] = dotMatch;
        const opacity = parseFloat(opacityValue);
        
        if (opacity < 0 || opacity > 1) {
          context.report({
            node,
            messageId: 'invalidOpacityRange',
            data: { value: opacityValue }
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