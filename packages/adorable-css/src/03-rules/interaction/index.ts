import { cursorRules } from './cursor';
import { transitionRules } from './transitions';
import { eventRules } from './events';
import { groupStateRules } from './group-state';
import { interactionRules as interactiveRules } from './interactive';

export { transitionRules };

export const interactionRules = {
  ...cursorRules,
  ...eventRules,
  ...groupStateRules,
  ...interactiveRules
};