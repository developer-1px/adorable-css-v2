import { parseAdorableCSS } from "./parser";
import { getRuleHandler } from "../rules";
import type { CSSRule, ParsedSelector } from "../rules/types";
import { cssEscape } from "./cssEscape";
import { px } from "../values/makeValue";
import { getAllKeyframes } from "../rules/plugins/animations";
import { 
  ResponsiveSelector, 
  ResponsiveDecoratorFactory, 
  isResponsiveClass, 
  extractBaseClass,
  debugResponsivePattern,
  createResponsiveCSS
} from "./responsive-decorator";
import { generateTokenCSS, defaultTokens, setTokenContext } from "../tokens";
import type { DesignTokens } from "../tokens";

// Convert CSS object to string (supports nested selectors)
const cssObjectToString = (obj: CSSRule, parentSelector?: string): { mainCSS: string; nestedCSS: string[] } => {
  const properties: string[] = [];
  const nestedRules: string[] = [];
  
  Object.entries(obj || {}).forEach(([key, value]) => {
    // Skip undefined values
    if (value === undefined) return;
    
    if (typeof value === 'object' && value !== null) {
      // Nested rule (selector)
      const nestedCSS = cssObjectToString(value as CSSRule);
      if (nestedCSS.mainCSS) {
        const fullSelector = parentSelector ? key.replace('&', parentSelector) : key;
        nestedRules.push(`${fullSelector}{${nestedCSS.mainCSS}}`);
      }
      nestedRules.push(...nestedCSS.nestedCSS);
    } else {
      // Regular CSS property
      properties.push(`${key}:${value}`);
    }
  });
  
  return {
    mainCSS: properties.join(";"),
    nestedCSS: nestedRules
  };
};

// Create ParsedSelector from AST node
const createParsedSelector = (node: any): ParsedSelector => ({
  type: node.name ? "function" : "keyword",
  name: node.name || node.image,
  args: node.args?.map((arg: any) => arg.image),
});

// Generate CSS from parsed selector
const generateCSSFromSelector = (selector: ParsedSelector, parentSelector?: string): { mainCSS: string; nestedCSS: string[] } => {
  const handler = getRuleHandler(selector.name);
  if (!handler) {
    // Log warning for missing rule handler
    console.warn(`⚠️  AdorableCSS: Rule handler not found for "${selector.name}"`);
    console.warn(`   Parsed successfully but no implementation exists.`);
    console.warn(`   Consider adding this rule to the rule handlers.`);
    return { mainCSS: "", nestedCSS: [] };
  }

  const result =
    selector.type === "function" && selector.args
      ? handler(selector.args.join(""))
      : handler("");

  return cssObjectToString(result, parentSelector);
};

// Handle pseudo-class selector
const handlePseudoClass = (
  v: any,
  rawSelector: string
): { selector: string; cssResult: { mainCSS: string; nestedCSS: string[] } } => {
  const combinator = v.combinators[0];
  const pseudoClass = v.selector.image;
  const targetSelector = combinator.selector;
  const pseudoSelector = `${rawSelector}:${pseudoClass}`;

  return {
    selector: pseudoSelector,
    cssResult: generateCSSFromSelector(createParsedSelector(targetSelector), pseudoSelector),
  };
};

// Handle regular selector
const handleRegularSelector = (v: any, parentSelector?: string): { mainCSS: string; nestedCSS: string[] } => {
  const selector = v.selector;
  if (selector.type === "position") {
    return cssObjectToString({
      position: "absolute",
      left: String(px(selector.x.image)),
      top: String(px(selector.y.image)),
    }, parentSelector);
  }
  return generateCSSFromSelector(createParsedSelector(selector), parentSelector);
};

export function generateCSSFromAdorableCSS(value: string): string {
  if (!value) return "";
  
  // Check if this is a responsive class
  if (isResponsiveClass(value)) {
    return generateResponsiveCSS(value);
  }
  
  try {
    const result = parseAdorableCSS(value);
    const rawSelector = "." + cssEscape(value);
    let actualSelector = rawSelector;

    const allCSSResults: { mainCSS: string; nestedCSS: string[] }[] = [];
    let hasValidRules = false;

    result.value.forEach((v: any) => {
      if (v.combinators?.length > 0 && v.combinators[0].combinator === ":") {
        const { selector, cssResult } = handlePseudoClass(v, rawSelector);
        actualSelector = selector;
        allCSSResults.push(cssResult);
        if (cssResult.mainCSS || cssResult.nestedCSS.length > 0) {
          hasValidRules = true;
        }
      } else {
        const cssResult = handleRegularSelector(v, rawSelector);
        allCSSResults.push(cssResult);
        if (cssResult.mainCSS || cssResult.nestedCSS.length > 0) {
          hasValidRules = true;
        }
      }
    });

    // Combine all main CSS properties
    const mainCSSParts = allCSSResults.map(r => r.mainCSS).filter(Boolean);
    const mainCSS = mainCSSParts.join(";");
    
    // Collect all nested CSS rules
    const nestedCSSRules = allCSSResults.flatMap(r => r.nestedCSS);
    
    // Warn about parsed but empty rules
    if (!hasValidRules && result.value.length > 0) {
      console.warn(`⚠️  AdorableCSS: Class "${value}" parsed successfully but generated no CSS`);
      console.warn(`   This likely means the rule handlers are missing or returned empty results.`);
      console.warn(`   Parsed structure:`, JSON.stringify(result.value, null, 2));
    }
    
    // Don't generate empty CSS rules
    if (!mainCSS && nestedCSSRules.length === 0) {
      return "";
    }
    
    // Build final CSS
    const cssParts: string[] = [];
    
    // Add main rule if there are properties
    if (mainCSS) {
      cssParts.push(`${actualSelector}{${mainCSS}}`);
    }
    
    // Add nested rules
    cssParts.push(...nestedCSSRules);
    
    return cssParts.join("");
  } catch (e) {
    console.warn(`❌ AdorableCSS: Failed to parse "${value}"`);
    console.warn(`   Error:`, e);
    return ""; // Fail gracefully
  }
}

// Generate responsive CSS using decorator pattern
function generateResponsiveCSS(responsiveClassName: string): string {
  const pattern = ResponsiveSelector.analyze(responsiveClassName);
  if (!pattern) {
    console.warn(`⚠️  AdorableCSS: Invalid responsive pattern "${responsiveClassName}"`);
    return "";
  }

  // Extract base class and generate its CSS
  const baseClassName = pattern.selector;
  const baseCSS = generateCSSFromAdorableCSS(baseClassName);
  
  if (!baseCSS) {
    console.warn(`⚠️  AdorableCSS: Base class "${baseClassName}" generated no CSS for responsive "${responsiveClassName}"`);
    return "";
  }

  // Parse the base CSS to extract the rule content
  // Pattern matches: .selector{properties} and captures properties
  const selectorMatch = baseCSS.match(/^[^{]+\{([^}]+)\}/);
  if (!selectorMatch) {
    console.warn(`⚠️  AdorableCSS: Could not parse base CSS for responsive class "${responsiveClassName}"`);
    console.warn(`   Base CSS: "${baseCSS}"`);
    return "";
  }

  const cssProperties = selectorMatch[1];
  const responsiveSelector = "." + cssEscape(responsiveClassName);
  
  // Generate media query
  const breakpointValue = ResponsiveSelector.analyze(responsiveClassName)?.breakpoint;
  if (!breakpointValue) return "";
  
  const breakpoints = {
    sm: '640px', md: '768px', lg: '1024px', xl: '1280px', 
    '2xl': '1536px', '3xl': '1920px', '4xl': '2560px', 
    '5xl': '3200px', '6xl': '3840px', '7xl': '4096px'
  } as const;
  
  const breakpointPx = breakpoints[breakpointValue as keyof typeof breakpoints];
  if (!breakpointPx) return "";

  const mediaQuery = pattern.isMaxWidth 
    ? `@media (max-width: ${breakpointPx})`
    : `@media (min-width: ${breakpointPx})`;

  return `${mediaQuery}{${responsiveSelector}{${cssProperties}}}`;
}

export function generateCSS(classList: string[]): string {
  const cssRules = classList
    .map((v) => generateCSSFromAdorableCSS(v))
    .filter(css => css && css.trim() !== "")
    .join("\n");
  
  // Check if any animation classes are used
  const hasAnimations = classList.some(className => 
    className.includes('fade-') || 
    className.includes('scale-') ||
    className.includes('slide-') ||
    className.includes('bounce-') ||
    className.includes('float') ||
    className.includes('animate(')
  );
  
  // Include keyframes if animations are used
  if (hasAnimations) {
    const keyframes = getAllKeyframes();
    return keyframes + "\n" + cssRules;
  }
  
  return cssRules;
}

/**
 * Options for CSS generation
 */
export interface GenerateCSSOptions {
  includeTokens?: boolean;
  tokens?: DesignTokens;
  minify?: boolean;
}

/**
 * Generate CSS from AdorableCSS classes with optional token injection
 */
export function generateCSSWithTokens(
  input: string | string[], 
  options: GenerateCSSOptions = {}
): string {
  const { 
    includeTokens = true, 
    tokens = defaultTokens,
    minify = false 
  } = options;
  
  // Set token context for rule handlers
  setTokenContext(tokens);
  
  // Generate base CSS
  let css: string;
  if (Array.isArray(input)) {
    css = generateCSS(input);
  } else {
    css = generateCSSFromAdorableCSS(input);
  }
  
  // Reset token context to default
  setTokenContext(defaultTokens);
  
  // Prepend tokens if requested
  if (includeTokens) {
    const tokenCSS = generateTokenCSS(tokens);
    css = tokenCSS + (minify ? '' : '\n\n') + css;
  }
  
  // Minify if requested
  if (minify) {
    css = css
      .replace(/\s*{\s*/g, '{')
      .replace(/;\s*/g, ';')
      .replace(/\s*}\s*/g, '}')
      .replace(/:\s*/g, ':')
      .replace(/\n/g, '');
  }
  
  return css;
}
