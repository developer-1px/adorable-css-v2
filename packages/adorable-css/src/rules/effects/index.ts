import { backdropRules } from './backdrop';
import { perspectiveRules } from './perspective';
import { transformRules } from './transforms';
import { translateRules } from './translate';
import { elevation } from './elevation';

export const effectsRules = {
  ...backdropRules,
  ...perspectiveRules,
  ...transformRules,
  ...translateRules,
  elevation,
};

export * from './backdrop';
export * from './perspective';
export * from './transforms';
export * from './translate';
export * from './elevation';