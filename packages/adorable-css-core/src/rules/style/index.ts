import { backgroundRules } from "./background";
import { borderRules } from "./border";
import { bc, btc, brc, bbc, blc } from "./border-color";
import { shadowRules } from "./shadow";
import { effectRules } from "./effects";
import { animationRules } from "./animation";
import { font } from "./font";
import { text } from "./text";
import { c } from "./color";
import { bold } from "./bold";
import { typographyUtilityRules } from "./typography-utils";

export const typographyRules = {
  font,
  text,
  c,
  bold,
  ...typographyUtilityRules,
};

export const visualRules = {
  ...backgroundRules,
  ...borderRules,
  bc, btc, brc, bbc, blc,
  ...shadowRules,
  ...effectRules,
  ...animationRules,
};
