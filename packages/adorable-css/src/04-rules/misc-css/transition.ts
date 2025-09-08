import { rule2 } from '../ast-utils/rule2-helpers';
import { makeTransition } from '../../03-values/makeTransition';

/**
 * Transition utilities
 */

export const transition = rule2((s) => {
  const args = s.args || s.selector?.args;
  
  // Default transition if no args
  if (!args || args.length === 0) {
    return 'transition: all 0.2s ease-in-out';
  }
  
  // Extract the first argument (transition value)
  const firstArg = args[0];
  const value = firstArg.image || firstArg.value || firstArg;
  
  // Use makeTransition for processing
  const processed = makeTransition(String(value));
  
  return `transition: ${processed}`;
});

export const transitionHandlers = {
  transition
};