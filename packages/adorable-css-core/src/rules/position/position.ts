import type { CSSRule, RuleHandler, KeywordRuleHandler } from "../types";
import { px } from "../../values/makeValue";

// Position types
export const staticPosition: KeywordRuleHandler = () => ({
  position: "static",
});
export const relative: KeywordRuleHandler = () => ({ position: "relative" });
export const absolute: KeywordRuleHandler = () => ({ position: "absolute" });
export const fixed: KeywordRuleHandler = () => ({ position: "fixed" });
export const sticky: KeywordRuleHandler = () => ({ position: "sticky" });

const makePositionRule =
  (property: "top" | "right" | "bottom" | "left"): RuleHandler =>
  (value?: string): CSSRule =>
    value ? { [property]: String(px(value)) } : {};

export const top = makePositionRule("top");
export const right = makePositionRule("right");
export const bottom = makePositionRule("bottom");
export const left = makePositionRule("left");

// Z-index
export const z: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  if (args === "top") return { "z-index": "9999" };
  return { "z-index": args };
};

// Layer utility (Figma-style positioning)
export const layer: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { position: "absolute" };

  const result: CSSRule = { position: "absolute" };

  // layer(top:20+left:30) - multiple positions
  if (args.includes("+")) {
    const positions = args.split("+");
    positions.forEach((pos) => {
      const [side, value] = pos.split(":");
      if (side && value) {
        result[side] = String(px(value));
      }
    });
  }
  // layer(top:20) - single position
  else if (args.includes(":")) {
    const [side, value] = args.split(":");
    if (side && value) {
      result[side] = String(px(value));
    }
  }
  // layer(top) - edge positioning
  else {
    if (args === "top") result.top = "0";
    if (args === "right") result.right = "0";
    if (args === "bottom") result.bottom = "0";
    if (args === "left") result.left = "0";
  }

  return result;
};

export const positionRules = {
  absolute,
  fixed,
  relative,
  static: staticPosition,
  sticky,
  top,
  right,
  bottom,
  left,
  z,
  layer,
};
