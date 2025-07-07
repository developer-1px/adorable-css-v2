/**
 * Transition 처리 로직
 * makeTransition 함수를 분리하여 코드 라인수 감소
 */

import { makeValues } from './value-utils'

export const makeTransition = (value: string) => {
  if (!/\d/.test(value)) return value
  if (!value.includes('=')) return makeValues(value)
  return value
    .split(/[/|]/)
    .map((item) => item.replace('=', ' '))
    .join(',')
}