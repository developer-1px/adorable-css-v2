import type { CSSRule, RuleHandler, KeywordRuleHandler } from "../types";
import { px } from '../../01-core/values/makeValue';
import { isToken, getTokenVar } from '../../02-design_tokens/design-system/tokens/index';

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
    
    // Check for spacing 02-design_tokens (xs, sm, md, lg, xl, etc.)
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
      // Check for spacing 02-design_tokens
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

// Position shorthand with enhanced coordinate syntax
// Examples: (0,0), (center,top), (100%,center+20), (left+sm,bottom-xs)
export const position: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  // Parse (x,y) format
  const match = value.match(/^\(([^,]+),([^)]+)\)$/);
  if (!match) return {};
  
  const [, xValue, yValue] = match;
  const result: CSSRule = {
    position: 'absolute'
  };
  
  // Parse X coordinate
  const xParsed = parseCoordinate(xValue.trim(), 'x');
  Object.assign(result, xParsed);
  
  // Parse Y coordinate
  const yParsed = parseCoordinate(yValue.trim(), 'y');
  Object.assign(result, yParsed);
  
  // If we need centering transforms, add them
  const transforms: string[] = [];
  if (xParsed.transform) transforms.push(xParsed.transform);
  if (yParsed.transform) transforms.push(yParsed.transform);
  
  if (transforms.length > 0) {
    result.transform = transforms.join(' ');
  }
  
  // Clean up temporary transform properties
  delete result.transform;
  if (xParsed.transform || yParsed.transform) {
    result.transform = transforms.join(' ');
  }
  
  return result;
};

interface CoordinateResult extends CSSRule {
  transform?: string;
}

function parseCoordinate(value: string, axis: 'x' | 'y'): CoordinateResult {
  const result: CoordinateResult = {};
  
  // Handle special keywords
  if (value === 'center') {
    if (axis === 'x') {
      result.left = '50%';
      result.transform = 'translateX(-50%)';
    } else {
      result.top = '50%';
      result.transform = 'translateY(-50%)';
    }
    return result;
  }
  
  if (axis === 'x') {
    if (value === 'left' || value === 'start') {
      result.left = '0';
      return result;
    }
    if (value === 'right' || value === 'end') {
      result.right = '0';
      return result;
    }
  } else {
    if (value === 'top' || value === 'start') {
      result.top = '0';
      return result;
    }
    if (value === 'bottom' || value === 'end') {
      result.bottom = '0';
      return result;
    }
  }
  
  // Handle arithmetic expressions (center+20, bottom-xs, 100%-sm, etc.)
  const arithmeticMatch = value.match(/^(center|top|bottom|left|right|start|end|[\d.]+%?)([+-])(.+)$/);
  if (arithmeticMatch) {
    const [, base, operator, offset] = arithmeticMatch;
    const offsetValue = resolveValue(offset);
    
    if (base === 'center') {
      if (axis === 'x') {
        result.left = operator === '+' 
          ? `calc(50% + ${offsetValue})`
          : `calc(50% - ${offsetValue})`;
        result.transform = 'translateX(-50%)';
      } else {
        result.top = operator === '+' 
          ? `calc(50% + ${offsetValue})`
          : `calc(50% - ${offsetValue})`;
        result.transform = 'translateY(-50%)';
      }
    } else if (axis === 'x' && (base === 'left' || base === 'start')) {
      result.left = operator === '+' ? offsetValue : `calc(0px - ${offsetValue})`;
    } else if (axis === 'x' && (base === 'right' || base === 'end')) {
      result.right = operator === '+' ? offsetValue : `calc(0px - ${offsetValue})`;
    } else if (axis === 'y' && (base === 'top' || base === 'start')) {
      result.top = operator === '+' ? offsetValue : `calc(0px - ${offsetValue})`;
    } else if (axis === 'y' && (base === 'bottom' || base === 'end')) {
      result.bottom = operator === '+' ? offsetValue : `calc(0px - ${offsetValue})`;
    } else if (base.endsWith('%')) {
      // Handle percentage base (like 100%-20)
      if (axis === 'x') {
        result.left = operator === '+' 
          ? `calc(${base} + ${offsetValue})`
          : `calc(${base} - ${offsetValue})`;
      } else {
        result.top = operator === '+' 
          ? `calc(${base} + ${offsetValue})`
          : `calc(${base} - ${offsetValue})`;
      }
    }
    
    return result;
  }
  
  // Handle simple values (pixels, percentages, 02-design_tokens)
  const resolvedValue = resolveValue(value);
  if (axis === 'x') {
    result.left = resolvedValue;
  } else {
    result.top = resolvedValue;
  }
  
  return result;
}

function resolveValue(value: string): string {
  // Check for spacing 02-design_tokens
  if (isToken(value, 'spacing')) {
    return getTokenVar('spacing', value);
  }
  
  // Check for size 02-design_tokens
  if (isToken(value, 'size')) {
    return getTokenVar('size', value);
  }
  
  // Handle percentage values
  if (value.endsWith('%')) {
    return value;
  }
  
  // Handle pixel values
  return String(px(value));
}

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