import { backgroundRules } from "./background";
import { borderRules } from "./border";
import { shadowRules } from "./shadow";
import { effectRules } from "./effects";
import { animationRules } from "./animation";

export const visualRules = {
  ...backgroundRules,
  ...borderRules,
  ...shadowRules,
  ...effectRules,
  ...animationRules,
};
