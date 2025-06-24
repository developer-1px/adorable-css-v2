import { backdropRules } from './backdrop';
import { perspectiveRules } from './perspective';
import { transformRules } from './transforms';

export const effectsRules = {
  ...backdropRules,
  ...perspectiveRules,
  ...transformRules,
};

export * from './backdrop';
export * from './perspective';
export * from './transforms';