import { backgroundRules } from "./background";
import { backgroundClipRules } from "./background-clip";
import { borderRules } from "./border";
import { bc, btc, brc, bbc, blc } from "./border-color";
import { shadowRules } from "./shadow";
import { effectRules } from "./effects";
import { animationRules } from "./animation";
import { font, fontFamily } from "../text/font";
import { text, textShadow } from "../text/text";
import { c } from "../text/color";
import { bold, semibold, medium, light, fontWeightRules } from "../text/bold";
import { typographyUtilityRules } from "../text/text-misc";
import { listRules } from "../text/list";
import { responsiveTypographyRules } from "./responsive-typography";

export const typographyRules = {
  font,
  'font-family': fontFamily,
  text,
  'text-shadow': textShadow,
  c,
  ...fontWeightRules,
  ...typographyUtilityRules,
  ...listRules,
  ...responsiveTypographyRules,
};

export const visualRules = {
  ...backgroundRules,
  ...backgroundClipRules,
  ...borderRules,
  bc, btc, brc, bbc, blc,
  ...shadowRules,
  ...effectRules,
  ...animationRules,
};
