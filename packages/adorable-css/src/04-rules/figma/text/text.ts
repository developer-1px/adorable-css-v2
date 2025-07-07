import { rule2, getFirstValue } from '../../../01-core/ast-utils';

const TEXT_MAP = {
  left:'text-align:left',center:'text-align:center',right:'text-align:right',justify:'text-align:justify',start:'text-align:start',end:'text-align:end',
  uppercase:'text-transform:uppercase',lowercase:'text-transform:lowercase',capitalize:'text-transform:capitalize',
  underline:'text-decoration:underline',overline:'text-decoration:overline',
  nowrap:'white-space:nowrap',wrap:'white-space:normal',pre:'white-space:pre','pre-wrap':'white-space:pre-wrap','pre-line':'white-space:pre-line',
  top:'display:flex;flex-direction:column;justify-content:flex-start',
  middle:'display:flex;flex-direction:column;justify-content:center',
  bottom:'display:flex;flex-direction:column;justify-content:flex-end',
  pack:'display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center'
};

export const nowrap = rule2(() => 'white-space:nowrap');
export const wrap = rule2(() => 'white-space:normal');
export const pre = rule2(() => 'white-space:pre');
export const preWrap = rule2(() => 'white-space:pre-wrap');
export const preLine = rule2(() => 'white-space:pre-line');
export const uppercase = rule2(() => 'text-transform:uppercase');
export const lowercase = rule2(() => 'text-transform:lowercase');
export const capitalize = rule2(() => 'text-transform:capitalize');
export const underline = rule2(() => 'text-decoration:underline');
export const overline = rule2(() => 'text-decoration:overline');
export const strike = rule2(() => 'text-decoration:line-through');

export const text = rule2((s) => {
  const val = getFirstValue(s) || '';
  if (!val) return '';
  return val.includes('+') ? val.split('+').map(v => TEXT_MAP[v as keyof typeof TEXT_MAP]).filter(Boolean).join(';') : TEXT_MAP[val as keyof typeof TEXT_MAP] || '';
});