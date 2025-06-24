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
  // Default: inset(0) - cover entire parent
  if (!args) {
    return { 
      position: "absolute",
      top: "0",
      right: "0", 
      bottom: "0",
      left: "0"
    };
  }

  const result: CSSRule = { position: "absolute" };

  // layer(center) - center positioning
  if (args === "center") {
    return {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    };
  }

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
