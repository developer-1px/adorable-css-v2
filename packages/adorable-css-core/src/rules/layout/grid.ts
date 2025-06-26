import type { CSSRule, RuleHandler } from "../types";

export const grid: RuleHandler = (): CSSRule => ({ display: "grid" });

const makeGridTemplateRule =
  (property: "grid-template-columns" | "grid-template-rows"): RuleHandler =>
  (value?: string): CSSRule => {
    if (!value) return {};
    return { [property]: `repeat(${value}, minmax(0, 1fr))` };
  };

export const gridCols = makeGridTemplateRule("grid-template-columns");
export const gridRows = makeGridTemplateRule("grid-template-rows");

const makeGridSpanRule =
  (property: "grid-column" | "grid-row"): RuleHandler =>
  (value?: string): CSSRule => {
    if (!value) return {};
    return { [property]: `span ${value} / span ${value}` };
  };

export const colSpan = makeGridSpanRule("grid-column");
export const rowSpan = makeGridSpanRule("grid-row");

export const gridRules = {
  grid,
  "grid-cols": gridCols,
  "grid-rows": gridRows,
  "col-span": colSpan,
  "row-span": rowSpan,
};
