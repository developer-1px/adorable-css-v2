import { displayRules } from "./display";
import { sizeRules } from "./size";
import { spacingRules } from "./spacing";
import { gridRules } from "./grid";
import { overflowRules } from "./overflow";
import { insetRules } from "./inset";
import { scrollMt, scrollMb, scrollMl, scrollMr, scrollM } from "./scroll-margin";

export const layoutRules = {
  ...displayRules,
  ...sizeRules,
  ...spacingRules,
  ...gridRules,
  ...overflowRules,
  ...insetRules,
  'scroll-mt': scrollMt,
  'scroll-mb': scrollMb,
  'scroll-ml': scrollMl,
  'scroll-mr': scrollMr,
  'scroll-m': scrollM,
};

console.log(sizeRules)