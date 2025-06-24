import { displayRules } from "./display";
import { sizeRules } from "./size";
import { spacingRules } from "./spacing";
import { gridRules } from "./grid";
import { overflowRules } from "./overflow";
import { insetRules } from "./inset";

export const layoutRules = {
  ...displayRules,
  ...sizeRules,
  ...spacingRules,
  ...gridRules,
  ...overflowRules,
  ...insetRules,
};
