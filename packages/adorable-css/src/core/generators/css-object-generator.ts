import type { CSSRule } from "../../rules/types";

/**
 * CSS Object를 문자열로 변환하는 제너레이터
 * 중첩 선택자 지원
 */
export class CSSObjectGenerator {
  /**
   * CSS 객체를 문자열로 변환
   * @param obj CSS 규칙 객체
   * @param parentSelector 부모 선택자 (중첩 처리용)
   * @returns mainCSS와 nestedCSS 배열
   */
  generate(obj: CSSRule, parentSelector?: string): { mainCSS: string; nestedCSS: string[] } {
    const properties: string[] = [];
    const nestedRules: string[] = [];
    
    Object.entries(obj || {}).forEach(([key, value]) => {
      // Skip undefined values
      if (value === undefined) return;
      
      if (typeof value === 'object' && value !== null) {
        // Nested rule (selector)
        const nestedCSS = this.generate(value as CSSRule, parentSelector);
        if (nestedCSS.mainCSS) {
          const fullSelector = parentSelector ? key.replace('&', parentSelector) : key;
          nestedRules.push(`${fullSelector}{${nestedCSS.mainCSS}}`);
        }
        nestedRules.push(...nestedCSS.nestedCSS);
      } else {
        // Regular CSS property
        properties.push(`${key}:${value}`);
      }
    });
    
    return {
      mainCSS: properties.join(";"),
      nestedCSS: nestedRules
    };
  }
}

// Singleton instance
export const cssObjectGenerator = new CSSObjectGenerator();