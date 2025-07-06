/**
 * Position 처리 로직
 * makePosition 관련 함수들을 분리하여 코드 라인수 감소
 */

import { px } from './value-utils'

export const makePosition1 = (value: string) => {
  const values = value.split(' ').map(px)
  values[1] = values[1] || values[0]
  values[2] = values[2] || values[0]
  values[3] = values[3] || values[1] || values[0]

  return ['top', 'right', 'bottom', 'left']
    .map((prop, index) => {
      const value = values[index]
      if (!value || value === '-') return
      return `${prop}:${value};`
    })
    .filter(Boolean)
    .join('')
}

export const makePosition2X = (x: string) => {
  if (x.startsWith('center')) {
    const offset = x.slice(6) || 0
    return {
      left: '50%',
      transform: `translateX(-50%) translateX(${px(offset)})`,
    }
  }

  const [left, right] = x.split(/\.\..|~/)
  return {
    ...(left ? { left: px(left) } : {}),
    ...(right ? { right: px(right) } : {}),
  }
}

export const makePosition2Y = (y: string) => {
  if (y.startsWith('center')) {
    const offset = y.slice(6) || 0
    return {
      top: '50%',
      transform: `translateY(-50%) translateY(${px(offset)})`,
    }
  }

  const [top, bottom] = y.split(/\.\..|~/)
  return {
    ...(top ? { top: px(top) } : {}),
    ...(bottom ? { bottom: px(bottom) } : {}),
  }
}

export const makePosition2 = (x: string, y: string) => {
  const posX = makePosition2X(x)
  const posY = makePosition2Y(y)

  let transform = {}
  if (posX.transform && posY.transform) {
    transform = { transform: `${posX.transform} ${posY.transform}` }
  }

  return {
    ...makePosition2X(x),
    ...makePosition2Y(y),
    ...transform,
  }
}