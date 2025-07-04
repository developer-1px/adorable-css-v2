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
import { bold } from "../text/bold";
import { typographyUtilityRules } from "../text/typography-utils";
import { listRules } from "../text/list";
import { responsiveTypographyRules } from "./responsive-typography";

export const typographyRules = {
  font,
  'font-family': fontFamily,
  text,
  'text-shadow': textShadow,
  c,
  bold,
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
