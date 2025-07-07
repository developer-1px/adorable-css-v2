import { rule2, getFirstValue } from '../../../01-core/ast-utils';

export const scale = rule2(s => {
  const value = getFirstValue(s);
  return `transform:scale(${value})`;
});

export const rotate = rule2(s => {
  const value = getFirstValue(s);
  return `transform:rotate(${value.includes('deg') ? value : value + 'deg'})`;
});

export const translate = rule2(s => {
  const value = getFirstValue(s);
  return `transform:translate(${value})`;
});

export const translateX = rule2(s => {
  const value = getFirstValue(s);
  return `transform:translateX(${value})`;
});

export const translateY = rule2(s => {
  const value = getFirstValue(s);
  return `transform:translateY(${value})`;
});