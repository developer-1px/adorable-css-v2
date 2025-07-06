import type { CSSRule, RuleHandler } from "../types";
import { px as toPx, pxWithClamp } from '../../core/values/makeValue';
import { isToken } from '../../design-system/tokens/index';
import { generateSpacingCalc } from '../../core/values/dynamicTokens';

type Prefix = "" | "x" | "y" | "t" | "b" | "l" | "r";

const makeSpacingRule = (type: 'padding' | 'margin', prefix: Prefix): RuleHandler => (args?: string): CSSRule => {
  const prop = type;
  const def = generateSpacingCalc('md'); // Use dynamic calc instead of CSS var
  
  if (!args) {
    if (prefix === "") return { [prop]: def };
    if (prefix === "x") return { [`${prop}-left`]: def, [`${prop}-right`]: def };
    if (prefix === "y") return { [`${prop}-top`]: def, [`${prop}-bottom`]: def };
    return { [`${prop}-${prefix === "t" ? "top" : prefix === "b" ? "bottom" : prefix === "l" ? "left" : "right"}`]: def };
  }
  
  if (type === 'padding' && args === 'hug') {
    return prefix === "x" ? { "padding-left": "0.6em", "padding-right": "0.6em" } : { "padding-top": "0.2em", "padding-bottom": "0.2em" };
  }
  
  const vals = args.split("/").map(v => {
    if (isToken(v, 'spacing')) {
      return generateSpacingCalc(v);
    } else {
      const processed = String(pxWithClamp(v));
      // Reject invalid tokens that return themselves
      if (processed === v && !v.match(/^\d+(\.\d+)?(px|rem|em|%)?$/)) {
        return '0'; // Default to 0 for invalid values
      }
      return processed;
    }
  });
  
  if (prefix === "") {
    if (vals.length === 1) return { [prop]: vals[0] };
    if (vals.length === 2) return { [`${prop}-top`]: vals[0], [`${prop}-right`]: vals[1], [`${prop}-bottom`]: vals[0], [`${prop}-left`]: vals[1] };
    if (vals.length === 4) return { [`${prop}-top`]: vals[0], [`${prop}-right`]: vals[1], [`${prop}-bottom`]: vals[2], [`${prop}-left`]: vals[3] };
  }
  
  if (prefix === "x") return { [`${prop}-left`]: vals[0], [`${prop}-right`]: vals[0] };
  if (prefix === "y") return { [`${prop}-top`]: vals[0], [`${prop}-bottom`]: vals[0] };
  return { [`${prop}-${prefix === "t" ? "top" : prefix === "b" ? "bottom" : prefix === "l" ? "left" : "right"}`]: vals[0] };
};

// Padding
export const p = makeSpacingRule('padding', '');
export const px = makeSpacingRule('padding', 'x');
export const py = makeSpacingRule('padding', 'y');
export const pt = makeSpacingRule('padding', 't');
export const pb = makeSpacingRule('padding', 'b');
export const pl = makeSpacingRule('padding', 'l');
export const pr = makeSpacingRule('padding', 'r');

// Margin
export const m = makeSpacingRule('margin', '');
export const mx = makeSpacingRule('margin', 'x');
export const my = makeSpacingRule('margin', 'y');
export const mt = makeSpacingRule('margin', 't');
export const mb = makeSpacingRule('margin', 'b');
export const ml = makeSpacingRule('margin', 'l');
export const mr = makeSpacingRule('margin', 'r');

// Gap
export const gap: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { gap: generateSpacingCalc('md') }; // Use dynamic calc
  if (args === 'auto') return { gap: 'auto', 'justify-content': 'space-between', 'align-content': 'space-between' };
  return { gap: isToken(args, 'spacing') ? generateSpacingCalc(args) : String(toPx(args)) };
};

export const spacingRules = { p, px, py, pt, pb, pl, pr, gap, m, mx, my, mt, mb, ml, mr };