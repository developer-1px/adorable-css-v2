import type { CSSRule, RuleHandler } from "../types";
import { makeColor } from '../../core/values/makeValue';

export const c: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};

  if (args === "current") return { color: "currentColor" };

  // c(red..blue) - text gradient with .. syntax
  if (args.includes('..')) {
    const [start, end] = args.split('..');
    const startColor = makeColor(start);
    const endColor = makeColor(end);
    return {
      background: `linear-gradient(90deg, ${startColor}, ${endColor})`,
      "-webkit-background-clip": "text",
      "background-clip": "text",
      "-webkit-text-fill-color": "transparent",
    };
  }

  if (
    args.startsWith("linear-gradient") ||
    args.startsWith("radial-gradient")
  ) {
    return {
      background: args.replace(/\//g, " "),
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
    };
  }

  // Handle all colors including opacity syntax (white.8, black.2)
  const processedColor = makeColor(args);
  return { color: processedColor };
};
