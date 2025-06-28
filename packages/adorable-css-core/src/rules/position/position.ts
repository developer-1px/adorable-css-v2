import type { CSSRule, RuleHandler, KeywordRuleHandler } from "../types";
import { px } from '../../core/values/makeValue';
import { isToken, getTokenVar } from '../../design-system/tokens/index';

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
  (value?: string): CSSRule => {
    if (!value) return {};
    
    // Handle negative values
    const isNegative = value.startsWith('-');
    const absValue = isNegative ? value.substring(1) : value;
    
    // Check for spacing tokens (xs, sm, md, lg, xl, etc.)
    if (isToken(absValue, 'spacing')) {
      const tokenVar = getTokenVar('spacing', absValue);
      return { [property]: isNegative ? `calc(-1 * ${tokenVar})` : tokenVar };
    }
    
    // Handle specific values
    if (value === 'auto') return { [property]: 'auto' };
    
    // Default to px conversion
    return { [property]: String(px(value)) };
  };

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

// Layer utility (Figma-style positioning) - v1 spec
export const layer: RuleHandler = (value = ""): CSSRule => {
  // Default: layer() = layer(fill)
  if (!value || value === "fill") {
    return {
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0"
    };
  }

  // layer(center) - center positioning
  if (value === "center") {
    return {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    };
  }

  // Parse the value
  const pos: Record<string, string> = { top: "0", right: "0", bottom: "0", left: "0" };
  const outsides: string[] = [];
  let outside = false;

  value.split(/[+/]/).forEach((v) => {
    const [direction, dirValue = "0"] = v.split(":");
    switch (direction) {
      case "top": {
        pos.top = dirValue;
        delete pos.bottom;
        outsides.push("top");
        return;
      }
      case "right": {
        pos.right = dirValue;
        delete pos.left;
        outsides.push("right");
        return;
      }
      case "bottom": {
        pos.bottom = dirValue;
        delete pos.top;
        outsides.push("bottom");
        return;
      }
      case "left": {
        pos.left = dirValue;
        delete pos.right;
        outsides.push("left");
        return;
      }
      case "outside": {
        outside = true;
        return;
      }
    }
  });

  if (outside) {
    const revert = (b: string, a: string) => {
      pos[a] = pos[b] === "0" ? "100%" : `calc(100% + ${px(pos[b])})`;
      delete pos[b];
    };

    outsides.forEach((direction) => {
      switch (direction) {
        case "top":
          return revert("top", "bottom");
        case "right":
          return revert("right", "left");
        case "bottom":
          return revert("bottom", "top");
        case "left":
          return revert("left", "right");
      }
    });
  }

  const styles: CSSRule = {
    position: "absolute",
  };

  Object.entries(pos).forEach(([key, value]) => {
    if (value !== undefined) {
      // Check for spacing tokens
      if (isToken(value, 'spacing')) {
        styles[key] = getTokenVar('spacing', value);
      } else if (value === 'auto') {
        styles[key] = 'auto';
      } else {
        styles[key] = String(px(value));
      }
    }
  });

  return styles;
};

// Position shorthand: (10,20) -> position: absolute; left: 10px; top: 20px;
export const position: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  // Parse (x,y) format
  const match = value.match(/^\(([^,]+),([^)]+)\)$/);
  if (!match) return {};
  
  const [, x, y] = match;
  const xTrimmed = x.trim();
  const yTrimmed = y.trim();
  
  // Process X coordinate
  let leftValue: string;
  if (isToken(xTrimmed, 'spacing')) {
    leftValue = getTokenVar('spacing', xTrimmed);
  } else if (xTrimmed === 'auto') {
    leftValue = 'auto';
  } else {
    leftValue = String(px(xTrimmed));
  }
  
  // Process Y coordinate
  let topValue: string;
  if (isToken(yTrimmed, 'spacing')) {
    topValue = getTokenVar('spacing', yTrimmed);
  } else if (yTrimmed === 'auto') {
    topValue = 'auto';
  } else {
    topValue = String(px(yTrimmed));
  }
  
  return {
    position: 'absolute',
    left: leftValue,
    top: topValue
  };
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
  '': position, // Empty string to handle (x,y) syntax
};