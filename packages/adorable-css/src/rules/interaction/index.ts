import { cursorRules } from './cursor';
import { eventRules } from './events';
import { groupStateRules } from './group-state';
import { interactionRules as interactiveRules } from './interactive';

export const interactionRules = {
  ...cursorRules,
  ...eventRules,
  ...groupStateRules,
  ...interactiveRules
};