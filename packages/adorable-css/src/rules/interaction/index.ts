import { cursorRules } from './cursor';
import { eventRules } from './events';
import { groupStateRules } from './group-state';

export const interactionRules = {
  ...cursorRules,
  ...eventRules,
  ...groupStateRules
};