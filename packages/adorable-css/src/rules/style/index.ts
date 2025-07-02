import { backgroundRules } from "./background";
import { borderRules } from "./border";
import { bc, btc, brc, bbc, blc } from "./border-color";
import { shadowRules } from "./shadow";
import { effectRules } from "./effects";
import { animationRules } from "./animation";
import { font, fontFamily } from "./font";
import { text, textShadow } from "./text";
import { c } from "./color";
import { bold } from "./bold";
import { typographyUtilityRules } from "./typography-utils";
import { listRules } from "./list";

export const typographyRules = {
  font,
  'font-family': fontFamily,
  text,
  'text-shadow': textShadow,
  c,
  bold,
  ...typographyUtilityRules,
  ...listRules,
};

export const visualRules = {
  ...backgroundRules,
  ...borderRules,
  bc, btc, brc, bbc, blc,
  ...shadowRules,
  ...effectRules,
  ...animationRules,
};
