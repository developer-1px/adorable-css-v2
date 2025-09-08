import { rule2, getAllValues } from '../ast-utils/rule2-helpers';

// Pointer events control - Figma "Pass through" equivalent
// Usage: pointer-events(none), pointer-events(auto)
export const pointerEvents = rule2((s) => {
  const value = getAllValues(s).join('') || 'auto';
  return `pointer-events:${value}`;
});