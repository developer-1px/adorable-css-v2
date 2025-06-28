import type { CSSRule, RuleHandler } from "../types";

export const grid: RuleHandler = (value?: string): CSSRule => {
  // grid() - default to Apple-style content grid
  if (!value) return { 
    display: "grid",
    "grid-template-columns": "repeat(auto-fit, minmax(300px, 1fr))",
    "gap": "var(--spacing-lg, 1rem)"
  };
  
  // Content-driven grid patterns
  const gridPatterns: Record<string, CSSRule> = {
    // Product grid (like Apple Store)
    products: {
      display: "grid",
      "grid-template-columns": "repeat(auto-fit, minmax(340px, 1fr))",
      "gap": "30px"
    },
    
    // Feature grid (2-3 columns)
    features: {
      display: "grid",
      "grid-template-columns": "repeat(auto-fit, minmax(280px, 1fr))",
      "gap": "40px",
      "@media (min-width: 1069px)": {
        "grid-template-columns": "repeat(3, 1fr)"
      }
    },
    
    // Gallery grid
    gallery: {
      display: "grid",
      "grid-template-columns": "repeat(auto-fit, minmax(250px, 1fr))",
      "gap": "20px"
    },
    
    // Cards grid
    cards: {
      display: "grid",
      "grid-template-columns": "repeat(auto-fit, minmax(320px, 1fr))",
      "gap": "24px"
    },
    
    // Split layout (50/50)
    split: {
      display: "grid",
      "grid-template-columns": "1fr 1fr",
      "gap": "48px",
      "align-items": "center",
      "@media (max-width: 1068px)": {
        "grid-template-columns": "1fr"
      }
    },
    
    // Asymmetric (60/40)
    asymmetric: {
      display: "grid",
      "grid-template-columns": "1.5fr 1fr",
      "gap": "48px",
      "align-items": "center",
      "@media (max-width: 1068px)": {
        "grid-template-columns": "1fr"
      }
    },
    
    // Masonry-like
    masonry: {
      display: "grid",
      "grid-template-columns": "repeat(auto-fit, minmax(300px, 1fr))",
      "grid-auto-rows": "200px",
      "grid-auto-flow": "dense",
      "gap": "20px"
    }
  };
  
  // Check for pattern
  if (gridPatterns[value]) {
    return gridPatterns[value];
  }
  
  // Check if value is just a number (for column count)
  if (/^\d+$/.test(value)) {
    const cols = parseInt(value);
    return {
      display: "grid",
      "grid-template-columns": `repeat(${cols}, minmax(0, 1fr))`,
      "gap": "var(--spacing-lg, 1rem)"
    };
  }
  
  // Handle responsive grid patterns: grid(auto-fit/200px)
  if (value.includes('auto-fit/') || value.includes('auto-fill/')) {
    const [type, minSize] = value.split('/');
    return {
      display: "grid",
      "grid-template-columns": `repeat(${type}, minmax(${minSize}, 1fr))`,
      "gap": "var(--spacing-lg, 1rem)"
    };
  }
  
  // Custom template
  return {
    display: "grid",
    "grid-template-columns": value,
    "gap": "var(--spacing-lg, 1rem)"
  };
};

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

// Grid alignment utilities
export const gridAlign: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  const alignMap: Record<string, string> = {
    start: "start",
    end: "end",
    center: "center",
    stretch: "stretch",
    baseline: "baseline"
  };
  
  return { "align-items": alignMap[value] || value };
};

export const gridJustify: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  const justifyMap: Record<string, string> = {
    start: "start",
    end: "end",
    center: "center",
    stretch: "stretch",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly"
  };
  
  return { "justify-items": justifyMap[value] || value };
};

export const gridPlace: RuleHandler = (value?: string): CSSRule => {
  if (!value) return {};
  
  return { "place-items": value };
};

export const gridRules = {
  grid,
  "grid-cols": gridCols,
  "grid-rows": gridRows,
  "col-span": colSpan,
  "row-span": rowSpan,
  "grid-align": gridAlign,
  "grid-justify": gridJustify,
  "grid-place": gridPlace,
};
