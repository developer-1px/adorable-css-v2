import type { CSSRule, RuleHandler, KeywordRuleHandler } from "../types";
import { px } from '../../01-core/values/makeValue';
import { isToken, getTokenVar } from '../../02-design_tokens/design-system/tokens/index';

// --- Helper Functions ---

function resolveValue(value: string): string {
  // Check for spacing tokens
  if (isToken(value, 'spacing')) {
    return getTokenVar('spacing', value);
  }

  // Check for size tokens
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

interface CoordinateResult extends CSSRule {
  transform?: string;
}

function parseCoordinate(value: string, axis: 'x' | 'y'): CoordinateResult {
  const result: CoordinateResult = {};

  // Handle ~ prefix (from end: right/bottom)
  if (value.startsWith('~') || value.startsWith('..')) {
    const val = resolveValue(value.replace(/^(\.\.|~)/, ''));
    if (axis === 'x') {
      result.right = val;
    } else {
      result.bottom = val;
    }
    return result;
  }

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

  // Handle simple values (pixels, percentages, tokens)
  const resolvedValue = resolveValue(value);
  if (axis === 'x') {
    result.left = resolvedValue;
  } else {
    result.top = resolvedValue;
  }

  return result;
}

const handlePositionArgs = (value: string | undefined, posType: string): CSSRule => {
  // If no value, just return position type
  if (!value) return { position: posType };

  // Parse (x,y) or x,y format
  const cleanValue = value.startsWith('(') && value.endsWith(')')
    ? value.slice(1, -1)
    : value;

  const parts = cleanValue.split(',');

  // If passed just a single token that is not a coordinate pair?
  // User might use absolute(top:0) if supported, but here we strictly support (x,y)
  if (parts.length !== 2) return { position: posType };

  const [xValue, yValue] = parts;

  const result: CSSRule = {
    position: posType
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

  return result;
}

const makePositionRule =
  (property: "top" | "right" | "bottom" | "left"): RuleHandler =>
    (value?: string): CSSRule => {
      if (!value) return {};

      // Handle negative values
      const isNegative = value.startsWith('-');
      const absValue = isNegative ? value.substring(1) : value;

      // Check for tokens
      if (isToken(absValue, 'spacing')) {
        const tokenVar = getTokenVar('spacing', absValue);
        return { [property]: isNegative ? `calc(-1 * ${tokenVar})` : tokenVar };
      }

      // Handle specific values
      if (value === 'auto') return { [property]: 'auto' };

      // Default to px conversion
      return { [property]: String(px(value)) };
    };

// --- Exported Rules ---

export const staticPosition: KeywordRuleHandler = () => ({ position: "static" });
export const relative: RuleHandler = (v) => handlePositionArgs(v, "relative");
export const absolute: RuleHandler = (v) => handlePositionArgs(v, "absolute");
export const fixed: RuleHandler = (v) => handlePositionArgs(v, "fixed");
export const sticky: RuleHandler = (v) => handlePositionArgs(v, "sticky");

export const top = makePositionRule("top");
export const right = makePositionRule("right");
export const bottom = makePositionRule("bottom");
export const left = makePositionRule("left");

export const x: RuleHandler = (v) => {
  if (!v) return {};
  const parsed = parseCoordinate(v, 'x');
  const style: CSSRule = { ...parsed };
  delete style.transform;
  if (parsed.transform) style.transform = parsed.transform;
  return style;
};

export const y: RuleHandler = (v) => {
  if (!v) return {};
  const parsed = parseCoordinate(v, 'y');
  const style: CSSRule = { ...parsed };
  delete style.transform;
  if (parsed.transform) style.transform = parsed.transform;
  return style;
};

// Z-index
export const z: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  if (args === "top") return { "z-index": "9999" };
  return { "z-index": args };
};

// Layer utility (Figma-style positioning)
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

// Position shorthand
export const position: RuleHandler = (value?: string): CSSRule => {
  return handlePositionArgs(value, 'absolute');
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
  x,
  y,
  z,
  layer,
  '': position, // Empty string to handle (x,y) syntax
};