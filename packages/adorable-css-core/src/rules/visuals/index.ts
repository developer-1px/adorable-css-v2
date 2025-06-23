import { backgroundRules } from './background';
import { borderRules } from './border';
import { shadowRules } from './shadow';

export const visualRules = {
  ...backgroundRules,
  ...borderRules,
  ...shadowRules
};