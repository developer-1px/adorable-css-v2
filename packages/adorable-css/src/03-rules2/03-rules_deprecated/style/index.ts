import { backgroundRules } from "./background";
import { backgroundClipRules } from "./background-clip";
// Note: border rules migrated to Rule2
import { bc, btc, brc, bbc, blc } from "./border-color";
import { shadowRules } from "./shadow";
// Note: effect rules migrated to Rule2
import { animationRules } from "./animation";
// Note: font, text, c, bold rules migrated to Rule2
import { textShadow } from "../text/text";
import { typographyUtilityRules } from "../text/text-misc";
import { listRules } from "../text/list";
import { responsiveTypographyRules } from "./responsive-typography";

export const typographyRules = {
  'text-shadow': textShadow,
  ...typographyUtilityRules,
  ...listRules,
  ...responsiveTypographyRules,
};

export const visualRules = {
  ...backgroundRules,
  ...backgroundClipRules,
  // Note: borderRules migrated to Rule2
  bc, btc, brc, bbc, blc,
  ...shadowRules,
  // Note: effectRules migrated to Rule2
  ...animationRules,
};
