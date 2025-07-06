/**
 * Border 처리 로직
 * makeBorder 함수를 분리하여 코드 라인수 감소
 */

import { makeColor } from './makeColor.ts'
import { splitValues, px } from './value-utils'

// Border 스타일 상수
const BORDER_STYLES = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']

export const makeBorder = (value: string) => {
  if (!value || value === 'none' || value === '0' || value === '-') return 'none'

  let widthValue = null
  let styleValue = null
  let colorValue = null

  // 입력값 처리 및 각 값 유형 식별
  splitValues(value, (val) => {
    if (+val > 0) {
      widthValue = px(val)
      return widthValue
    }

    if (BORDER_STYLES.includes(String(val))) {
      styleValue = val
      return val
    }

    colorValue = makeColor(String(val))
    return colorValue
  })

  // 기본값 설정
  if (!widthValue) widthValue = '1px'
  if (!styleValue) styleValue = 'solid'

  // 값을 표준 순서로 반환: width style color
  return `${widthValue} ${styleValue}${colorValue ? ' ' + colorValue : ''}`
}