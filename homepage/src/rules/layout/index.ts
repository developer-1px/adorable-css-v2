import { displayRules } from './display';
import { sizeRules } from './size';
import { spacingRules } from './spacing';

export const layoutRules = {
  ...displayRules,
  ...sizeRules,
  ...spacingRules
};