import type { ClassNameMatch } from '../types';

/**
 * HTML/JSX className 속성에서 클래스명 추출
 */
export function extractClassNames(code: string, node: any): ClassNameMatch[] {
  const matches: ClassNameMatch[] = [];
  
  // JSX className 속성 처리
  if (node.type === 'JSXAttribute' && node.name.name === 'className') {
    const value = node.value;
    
    if (value?.type === 'Literal' && typeof value.value === 'string') {
      // className="class1 class2"
      matches.push({
        value: value.value,
        start: value.start,
        end: value.end,
        raw: value.raw
      });
    } else if (value?.type === 'JSXExpressionContainer') {
      // className={`class1 ${variable}`} 등 복잡한 경우는 일단 스킵
      // 추후 템플릿 리터럴 파싱 구현 가능
    }
  }
  
  // HTML class 속성 처리
  if (node.type === 'Attribute' && node.name === 'class') {
    matches.push({
      value: node.value,
      start: node.start,
      end: node.end,
      raw: node.value
    });
  }
  
  return matches;
}

/**
 * 클래스 문자열을 개별 클래스로 분할
 */
export function parseClassString(classString: string): string[] {
  return classString
    .trim()
    .split(/\s+/)
    .filter(cls => cls.length > 0);
}

/**
 * AdorableCSS 클래스인지 확인
 */
export function isAdorableCSSClass(className: string): boolean {
  // AdorableCSS 패턴: function(value) 형태
  const adorablePattern = /^[a-zA-Z][a-zA-Z0-9-]*\([^)]*\)$/;
  
  // 또는 간단한 유틸리티 클래스
  const simpleUtilityPattern = /^[a-zA-Z][a-zA-Z0-9-]*$/;
  
  return adorablePattern.test(className) || simpleUtilityPattern.test(className);
}

/**
 * CSS 함수 문법 파싱 (예: margin(lg), scale(1.05))
 */
export function parseCSSFunction(className: string): { name: string; value: string } | null {
  const match = className.match(/^([a-zA-Z][a-zA-Z0-9-]*)\(([^)]*)\)$/);
  
  if (!match) {
    return null;
  }
  
  return {
    name: match[1],
    value: match[2]
  };
}