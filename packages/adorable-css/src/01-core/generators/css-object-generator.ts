import type { CSSRule } from "../../03-rules/types";

/**
 * CSS 객체를 문자열로 변환
 */
export const cssObjectToString = (obj: CSSRule, parentSelector?: string): { mainCSS: string; nestedCSS: string[] } => {
  const properties: string[] = [];
  const nestedRules: string[] = [];
  
  Object.entries(obj || {}).forEach(([key, value]) => {
    if (value === undefined) return;
    
    if (typeof value === 'object' && value !== null) {
      const nestedCSS = cssObjectToString(value as CSSRule, parentSelector);
      if (nestedCSS.mainCSS) {
        const fullSelector = parentSelector ? key.replace('&', parentSelector) : key;
        nestedRules.push(`${fullSelector}{${nestedCSS.mainCSS}}`);
      }
      nestedRules.push(...nestedCSS.nestedCSS);
    } else {
      properties.push(`${key}:${value}`);
    }
  });
  
  return {
    mainCSS: properties.join(";"),
    nestedCSS: nestedRules
  };
};