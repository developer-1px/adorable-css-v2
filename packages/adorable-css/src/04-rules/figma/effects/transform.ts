import { rule2, getFirstValue, getAllArgs, extractValue } from '../../ast-utils/rule2-helpers';

export const scale = rule2(s => {
  const value = getFirstValue(s);
  return `transform:scale(${value})`;
});

export const rotate = rule2(s => {
  const value = getFirstValue(s);
  return `transform:rotate(${value.includes('deg') ? value : value + 'deg'})`;
});

export const translate = rule2(s => {
  // Handle multiple values separated by comma
  const args = getAllArgs(s);
  const values = args
    .map(arg => extractValue(arg))
    .filter(val => val && val !== ',');
  
  return `transform:translate(${values.join(',')})`;
});

export const translateX = rule2(s => {
  const value = getFirstValue(s);
  return `transform:translateX(${value})`;
});

export const translateY = rule2(s => {
  const value = getFirstValue(s);
  return `transform:translateY(${value})`;
});