import { rule2, getFirstValue } from '../../../01-core/ast-utils';

export const truncate = rule2((s) => {
  const lines = parseInt(getFirstValue(s) || '1');
  return isNaN(lines) || lines <= 1 ? 'overflow:hidden;text-overflow:ellipsis;white-space:nowrap' : `display:-webkit-box;-webkit-line-clamp:${lines};-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis`;
});