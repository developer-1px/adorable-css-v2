import { cursorRules } from './cursor';
import { eventRules } from './events';

export const interactionRules = {
  ...cursorRules,
  ...eventRules
};