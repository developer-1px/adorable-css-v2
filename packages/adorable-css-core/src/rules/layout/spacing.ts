import type { CSSRule, RuleHandler } from "../types";
import { px, pxWithClamp } from '../../core/values/makeValue';
import { isToken, getTokenVar } from '../../design-system/tokens/index';

const makePaddingRule = (
  prefix: "" | "x" | "y" | "t" | "b" | "l" | "r"
): RuleHandler => {
  return (args?: string): CSSRule => {
    if (!args) {
      // Default to md spacing
      const defaultValue = getTokenVar('spacing', 'md');
      if (prefix === "") return { padding: defaultValue };
      if (prefix === "x") return { "padding-left": defaultValue, "padding-right": defaultValue };
      if (prefix === "y") return { "padding-top": defaultValue, "padding-bottom": defaultValue };
      if (prefix === "t") return { "padding-top": defaultValue };
      if (prefix === "b") return { "padding-bottom": defaultValue };
      if (prefix === "l") return { "padding-left": defaultValue };
      if (prefix === "r") return { "padding-right": defaultValue };
    }
    if (args === "hug")
      return prefix === "x"
        ? { "padding-left": "0.6em", "padding-right": "0.6em" }
        : { "padding-top": "0.2em", "padding-bottom": "0.2em" };

    const values = args.split("/");
    const properties: Record<string, string> = {};

    // Process values with token and clamp support
    const cssValues = values.map((v) => {
      if (isToken(v, 'spacing')) {
        return getTokenVar('spacing', v);
      }
      // Use pxWithClamp to support clamp() and range syntax
      return String(pxWithClamp(v));
    });

    if (prefix === "") {
      if (cssValues.length === 1) return { padding: cssValues[0] };
      if (cssValues.length === 2)
        return {
          "padding-top": cssValues[0],
          "padding-right": cssValues[1],
          "padding-bottom": cssValues[0],
          "padding-left": cssValues[1],
        };
      if (cssValues.length === 4)
        return {
          "padding-top": cssValues[0],
          "padding-right": cssValues[1],
          "padding-bottom": cssValues[2],
          "padding-left": cssValues[3],
        };
    }
    if (prefix === "x") {
      properties["padding-left"] = cssValues[0];
      properties["padding-right"] = cssValues[0];
    }
    if (prefix === "y") {
      properties["padding-top"] = cssValues[0];
      properties["padding-bottom"] = cssValues[0];
    }
    if (prefix === "t") properties["padding-top"] = cssValues[0];
    if (prefix === "b") properties["padding-bottom"] = cssValues[0];
    if (prefix === "l") properties["padding-left"] = cssValues[0];
    if (prefix === "r") properties["padding-right"] = cssValues[0];

    return properties;
  };
};

export const p = makePaddingRule("");

const makeMarginRule = (
  prefix: "" | "x" | "y" | "t" | "b" | "l" | "r"
): RuleHandler => {
  return (args?: string): CSSRule => {
    if (!args) {
      // Default to md spacing
      const defaultValue = getTokenVar('spacing', 'md');
      if (prefix === "") return { margin: defaultValue };
      if (prefix === "x") return { "margin-left": defaultValue, "margin-right": defaultValue };
      if (prefix === "y") return { "margin-top": defaultValue, "margin-bottom": defaultValue };
      if (prefix === "t") return { "margin-top": defaultValue };
      if (prefix === "b") return { "margin-bottom": defaultValue };
      if (prefix === "l") return { "margin-left": defaultValue };
      if (prefix === "r") return { "margin-right": defaultValue };
    }

    const values = args.split("/");
    const properties: Record<string, string> = {};

    // Process values with token and clamp support
    const cssValues = values.map((v) => {
      if (isToken(v, 'spacing')) {
        return getTokenVar('spacing', v);
      }
      // Use pxWithClamp to support clamp() and range syntax
      return String(pxWithClamp(v));
    });

    if (prefix === "") {
      if (cssValues.length === 1) return { margin: cssValues[0] };
      if (cssValues.length === 2)
        return {
          "margin-top": cssValues[0],
          "margin-right": cssValues[1],
          "margin-bottom": cssValues[0],
          "margin-left": cssValues[1],
        };
      if (cssValues.length === 4)
        return {
          "margin-top": cssValues[0],
          "margin-right": cssValues[1],
          "margin-bottom": cssValues[2],
          "margin-left": cssValues[3],
        };
    }
    if (prefix === "x") {
      properties["margin-left"] = cssValues[0];
      properties["margin-right"] = cssValues[0];
    }
    if (prefix === "y") {
      properties["margin-top"] = cssValues[0];
      properties["margin-bottom"] = cssValues[0];
    }
    if (prefix === "t") properties["margin-top"] = cssValues[0];
    if (prefix === "b") properties["margin-bottom"] = cssValues[0];
    if (prefix === "l") properties["margin-left"] = cssValues[0];
    if (prefix === "r") properties["margin-right"] = cssValues[0];

    return properties;
  };
};

export const m = makeMarginRule("");
export const mx = makeMarginRule("x");
export const my = makeMarginRule("y");
export const mt = makeMarginRule("t");
export const mb = makeMarginRule("b");
export const ml = makeMarginRule("l");
export const mr = makeMarginRule("r");

export const gap: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { gap: getTokenVar('spacing', 'md') }; // Default to md spacing
  
  // Special case for gap(auto) - space-between behavior
  if (args === 'auto') {
    // Return special marker that generator will handle
    return { 
      gap: 'auto',
      'justify-content': 'space-between',
      'align-content': 'space-between'
    };
  }
  
  if (isToken(args, 'spacing')) {
    return { gap: getTokenVar('spacing', args) };
  }
  return { gap: String(px(args)) };
};

export const spacingRules = {
  p,
  px: makePaddingRule("x"),
  py: makePaddingRule("y"),
  pt: makePaddingRule("t"),
  pb: makePaddingRule("b"),
  pl: makePaddingRule("l"),
  pr: makePaddingRule("r"),
  gap,
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
};
