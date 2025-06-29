import { backdropRules } from './backdrop';
import { perspectiveRules } from './perspective';
import { transformRules } from './transforms';
import { elevation } from './elevation';

export const effectsRules = {
  ...backdropRules,
  ...perspectiveRules,
  ...transformRules,
  elevation,
};

export * from './backdrop';
export * from './perspective';
export * from './transforms';
export * from './elevation';