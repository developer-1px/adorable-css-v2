/**
 * 값 변환 유틸리티 함수들
 * makeValue.ts에서 분리하여 코드 라인수 감소
 */

import { isToken } from './is-token'
import { generateSpacingCalc, generateFontCalc, generateSizeCalc } from '../../02-design_tokens/dynamicTokens'

// CSS 변수 처리
export const cssvar = (value: string | number) => {
  const strValue = String(value);

  // CSS 변수 처리
  if (strValue.startsWith('--')) return `var(${value})`;

  // 토큰 처리
  if (isToken(strValue, 'spacing')) {
    return generateSpacingCalc(strValue);
  }

  if (isToken(strValue, 'font')) {
    return generateFontCalc(strValue);
  }

  if (isToken(strValue, 'size')) {
    return generateSizeCalc(strValue);
  }

  return value;
}

// CSS 문자열 처리
export const cssString = (value: string | number) => (String(value).startsWith('--') ? `var(${value})` : `"${value}"`)

// 값 분할 및 변환
export const splitValues = (value: string, project = cssvar) => {
  if (value.includes('|')) return value.split('|').map(project)
  return value.split('/').map(project)
}

export const makeValues = (value: string, project = cssvar) => splitValues(value, project).join(' ')
export const makeCommaValues = (value: string, project = cssvar) => value.split(',').map(project).join(',')

// 숫자 처리
export const makeNumber = (num: number) => num.toFixed(2).replace(/^0+|\.00$|0+$/g, '') || '0'

// 비율 계산
export const makeRatio = (value: string) => {
  const [w, h] = value.split(/[:/]/)
  return ((+h / +w) * 100).toFixed(2) + '%'
}

// 퍼센트를 em으로 변환
export const percentToEm = (value: string) => {
  if (value.endsWith('%')) return +value.slice(0, -1) / 100 + 'em'
  return px(value)
}

// 길이 단위 처리 (px)
export const px = (value: string | number) => {
  if (value === undefined || value === null) throw new Error('px: value is undefined')
  if (value === 0 || value === '0') return 0

  const v = String(value)

  // CSS 변수 처리
  if (v.startsWith('--')) return cssvar('' + value)

  // 토큰 처리  
  if (isToken(v, 'spacing')) return generateSpacingCalc(v)
  if (isToken(v, 'font')) return generateFontCalc(v)
  if (isToken(v, 'size')) return generateSizeCalc(v)

  // 이미 단위가 있는 경우
  if (/[a-z%]$/i.test(v)) return value

  // 숫자만 있는 경우 px 추가
  if (/^-?\d+(\.\d+)?$/.test(v)) return v + 'px'

  // CSS 함수나 키워드인 경우
  if (v.includes('(') || /^(auto|inherit|initial|unset|none|max-content|min-content|fit-content)$/.test(v)) {
    return value
  }

  // 유효하지 않은 값
  if (!v.match(/^[\w\-.%]+$/)) return '0'

  return value
}

// 각도 단위 처리 (deg)
export const deg = (value: string | number) => {
  if (value === undefined || value === null) throw new Error('deg: value is undefined')
  if (value === 0 || value === '0') return 0

  const v = String(value)

  // CSS 변수 처리
  if (v.startsWith('--')) return cssvar('' + value)

  // 이미 단위가 있는 경우
  if (/[a-z%]$/i.test(v)) return value

  // 숫자만 있는 경우 deg 추가
  if (/^-?\d+(\.\d+)?$/.test(v)) return v + 'deg'

  return value
}

// 사이드 값 처리
export const makeSide = (value: string) => makeValues(value, px)