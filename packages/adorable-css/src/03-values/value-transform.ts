/**
 * AST 기반 value 변환 유틸리티
 */

import { isToken, getTokenVar } from '../02-design_tokens/token-resolver';
import { makeColor } from './makeValue';

type TokenType = 'spacing' | 'font' | 'text' | 'size' | 'color' | 'none';

/**
 * AST 값을 CSS value로 변환
 * @param value - 변환할 값
 * @param tokenType - 토큰 타입 (spacing, font, size, color)
 */
export function transformValue(value: string | number, tokenType: TokenType = 'none'): string {
  if (value === undefined || value === null) return '0';
  if (value === 0 || value === '0') return '0';

  const v = String(value);

  // CSS 변수 처리
  if (v.startsWith('--')) return `var(${v})`;
  
  // 토큰 처리
  if (tokenType !== 'none' && isToken(v, tokenType)) {
    switch (tokenType) {
      case 'spacing':
        return getTokenVar('spacing', v);
      case 'font':
      case 'text':
        return getTokenVar('text', v);
      case 'size':
        return getTokenVar('size', v);
      case 'color':
        return makeColor(v);
    }
  }

  // clamp/range syntax는 03-values에서 처리
  // 여기서는 그대로 반환
  if (v.includes('clamp(') || v.includes('..')) {
    return v;
  }

  // 이미 단위가 있는 경우
  if (/[a-z%]$/i.test(v)) return v;
  
  // 숫자만 있는 경우 px 추가 (음수 포함)
  if (/^-?\d+(\.\d+)?$/.test(v)) return v + 'px';
  
  // CSS 함수나 키워드인 경우
  if (v.includes('(') || /^(auto|inherit|initial|unset|none|max-content|min-content|fit-content)$/.test(v)) {
    return v;
  }
  
  return v;
}

/**
 * spacing 토큰 타입의 value 변환
 */
export const spacing = (value: string | number) => transformValue(value, 'spacing');

/**
 * font 토큰 타입의 value 변환
 */
export const font = (value: string | number) => transformValue(value, 'font');

/**
 * size 토큰 타입의 value 변환
 */
export const size = (value: string | number) => transformValue(value, 'size');

/**
 * color 토큰 타입의 value 변환
 */
export const color = (value: string | number) => {
  // Always use makeColor for color values
  if (value === undefined || value === null) return 'transparent';
  return makeColor(String(value));
};