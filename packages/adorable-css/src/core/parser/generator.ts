import { parseAdorableCSS } from "./parser";
import { getRuleHandler, getPriorityRuleHandler, getRuleWithPriority } from "../../rules";
import { priorityRegistry } from "../../rules/priority-registry";
import type { CSSRule, ParsedSelector, StringRuleDefinition } from "../../rules/types";
import { cssEscape, cleanDuplicateSelectors } from "./cssEscape";
import { px } from '../values/makeValue';
import { getAllKeyframes } from "../../extensions/animations/animations";
import { 
  ResponsiveSelector, 
  ResponsiveDecoratorFactory, 
  isResponsiveClass, 
  extractBaseClass,
  debugResponsivePattern,
  createResponsiveCSS,
  StateSelector,
  isStateClass,
  extractStateBaseClass,
  createStateCSS
} from "../../extensions/responsive/responsive-decorator";
import { generateTokenCSS, defaultTokens, setTokenContext } from '../../design-system/tokens/index';
import type { DesignTokens } from '../../design-system/tokens/index';

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
  args: node.args?.map((arg: any) => {
    // Handle triple-range syntax: convert to string format handlers expect
    if (arg.type === 'triple-range') {
      return `${arg.min.image}..${arg.preferred.image}..${arg.max.image}`;
    }
    // Handle double-range syntax
    if (arg.type === 'range') {
      const minPart = arg.min ? arg.min.image : '';
      const maxPart = arg.max ? arg.max.image : '';
      return `${minPart}..${maxPart}`;
    }
    return arg.image;
  }),
});

// Resolve string rules recursively with cycle detection
const resolveStringRule = (
  ruleName: string, 
  args?: string, 
  visited: Set<string> = new Set()
): { mainCSS: string; nestedCSS: string[]; priority?: number } => {
  // Check for circular dependencies
  const ruleKey = `${ruleName}(${args || ''})`;
  if (visited.has(ruleKey)) {
    console.warn(`⚠️  AdorableCSS: Circular dependency detected for string rule "${ruleKey}"`);
    return { mainCSS: "", nestedCSS: [], priority: 0 };
  }
  
  visited.add(ruleKey);
  
  // Get string rule definition
  const stringRule = priorityRegistry.getStringRule(ruleName);
  if (!stringRule) {
    return { mainCSS: "", nestedCSS: [], priority: 0 };
  }
  
  // Execute string rule handler to get AdorableCSS classes or mixed array
  const handler = stringRule.handler;
  let result: string | (string | CSSRule)[];
  
  try {
    result = typeof handler === 'function' 
      ? (args !== undefined ? handler(args) : handler())
      : '';
  } catch (e) {
    console.warn(`⚠️  AdorableCSS: Error executing string rule "${ruleName}":`, e);
    return { mainCSS: "", nestedCSS: [], priority: stringRule.priority };
  }
  
  // Handle mixed array format: [adorableCSS, rawCSS, adorableCSS, ...]
  const allCSSResults: { mainCSS: string; nestedCSS: string[]; priority?: number }[] = [];
  
  if (Array.isArray(result)) {
    // Process mixed array of AdorableCSS classes and raw CSS objects
    for (const item of result) {
      if (typeof item === 'string') {
        // AdorableCSS class - parse and resolve
        if (!item.trim()) continue;
        
        const classes = item.trim().split(/\s+/);
        for (const className of classes) {
          if (!className) continue;
          
          try {
            const parsed = parseAdorableCSS(className);
            if (parsed.value.length > 0) {
              const selector = parsed.value[0].selector;
              const selectorName = selector.name || selector.image;
              const selectorArgs = selector.args?.map((arg: any) => arg.image).join('');
              
              // If it's a string rule, resolve recursively
              if (priorityRegistry.hasString(selectorName)) {
                const recursiveResult = resolveStringRule(selectorName, selectorArgs, new Set(visited));
                allCSSResults.push(recursiveResult);
              } else {
                // Otherwise, generate CSS normally
                const cssResult = generateCSSFromSelector(createParsedSelector(selector));
                allCSSResults.push(cssResult);
              }
            }
          } catch (e) {
            console.warn(`⚠️  AdorableCSS: Error parsing class "${className}" from string rule "${ruleName}":`, e);
          }
        }
      } else if (typeof item === 'object' && item !== null) {
        // Raw CSS object - convert directly
        const cssResult = cssObjectToString(item as CSSRule);
        allCSSResults.push({ 
          ...cssResult, 
          priority: stringRule.priority 
        });
      }
    }
  } else {
    // Legacy string format - parse as before
    const adorableCSSString = result as string;
    
    if (!adorableCSSString.trim()) {
      return { mainCSS: "", nestedCSS: [], priority: stringRule.priority };
    }
    
    // Parse the returned string into individual classes
    const classes = adorableCSSString.trim().split(/\s+/);
    
    // Resolve each class recursively
    for (const className of classes) {
      if (!className) continue;
      
      // Check if this is another string rule
      try {
        const parsed = parseAdorableCSS(className);
        if (parsed.value.length > 0) {
          const selector = parsed.value[0].selector;
          const selectorName = selector.name || selector.image;
          const selectorArgs = selector.args?.map((arg: any) => arg.image).join('');
          
          // If it's a string rule, resolve recursively
          if (priorityRegistry.hasString(selectorName)) {
            const recursiveResult = resolveStringRule(selectorName, selectorArgs, new Set(visited));
            allCSSResults.push(recursiveResult);
          } else {
            // Otherwise, generate CSS normally
            const cssResult = generateCSSFromSelector(createParsedSelector(selector));
            allCSSResults.push(cssResult);
          }
        }
      } catch (e) {
        console.warn(`⚠️  AdorableCSS: Error parsing class "${className}" from string rule "${ruleName}":`, e);
      }
    }
  }
  
  // Combine results, preserving the original string rule's priority as base
  const mainCSSParts = allCSSResults.map(r => r.mainCSS).filter(Boolean);
  const nestedCSSRules = allCSSResults.flatMap(r => r.nestedCSS);
  
  return {
    mainCSS: mainCSSParts.join(';'),
    nestedCSS: nestedCSSRules,
    priority: stringRule.priority
  };
};

// Generate CSS from parsed selector with priority awareness
const generateCSSFromSelector = (selector: ParsedSelector, parentSelector?: string): { mainCSS: string; nestedCSS: string[]; priority?: number } => {
  // First check if this is a string rule
  if (priorityRegistry.hasString(selector.name)) {
    const args = selector.type === "function" && selector.args 
      ? selector.args.join("") 
      : undefined;
    return resolveStringRule(selector.name, args);
  }
  
  // Try priority-aware CSS object handler
  let handler = getPriorityRuleHandler(selector.name);
  let ruleInfo = getRuleWithPriority(selector.name);
  
  // Fall back to legacy handler if not found in priority registry
  if (!handler) {
    handler = getRuleHandler(selector.name);
  }
  
  if (!handler) {
    // Log warning for missing rule handler
    console.warn(`⚠️  AdorableCSS: Rule handler not found for "${selector.name}"`);
    return { mainCSS: "", nestedCSS: [], priority: 0 };
  }

  const result =
    selector.type === "function" && selector.args
      ? handler(selector.args.join(""))
      : handler("");

  const cssResult = cssObjectToString(result, parentSelector);
  
  return { 
    ...cssResult, 
    priority: ruleInfo?.priority || 0 
  };
};

// Handle pseudo-class selector
const handlePseudoClass = (
  v: any,
  rawSelector: string
): { selector: string; cssResult: { mainCSS: string; nestedCSS: string[]; priority?: number } } => {
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
const handleRegularSelector = (v: any, parentSelector?: string): { mainCSS: string; nestedCSS: string[]; priority?: number } => {
  const selector = v.selector;
  if (selector.type === "position") {
    const positionResult = cssObjectToString({
      position: "absolute",
      left: String(px(selector.x.image)),
      top: String(px(selector.y.image)),
    }, parentSelector);
    return { ...positionResult, priority: 200 }; // Layout priority
  }
  
  // Handle dimension-pair tokens (e.g., 64x64)
  if (selector.type === "(dimension-pair)") {
    const dimensionPairHandler = getRuleHandler('dimension-pair');
    if (dimensionPairHandler) {
      const result = dimensionPairHandler(selector.image);
      const cssResult = cssObjectToString(result, parentSelector);
      return { ...cssResult, priority: 200 }; // Layout priority
    }
  }
  
  return generateCSSFromSelector(createParsedSelector(selector), parentSelector);
};

export function generateCSSFromAdorableCSS(value: string): string {
  if (!value) return "";
  
  // Check if this is a state class FIRST (hover:, focus:, group-hover:, etc.)
  // This must come before responsive check as both use colon syntax
  if (isStateClass(value)) {
    return generateStateCSS(value);
  }
  
  // Check if this is a responsive class
  if (isResponsiveClass(value)) {
    return generateResponsiveCSS(value);
  }
  
  try {
    const result = parseAdorableCSS(value);
    const rawSelector = "." + cssEscape(value);
    let actualSelector = rawSelector;

    const allCSSResults: { mainCSS: string; nestedCSS: string[]; priority?: number }[] = [];
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

    // Sort CSS results by priority (low to high) for proper CSS cascading
    allCSSResults.sort((a, b) => (a.priority || 0) - (b.priority || 0));

    // Combine all main CSS properties in priority order
    const mainCSSParts = allCSSResults.map(r => r.mainCSS).filter(Boolean);
    const mainCSS = mainCSSParts.join(";");
    
    // Collect all nested CSS rules
    const nestedCSSRules = allCSSResults.flatMap(r => r.nestedCSS);
    
    // Warn about parsed but empty rules
    if (!hasValidRules && result.value.length > 0) {
      console.warn(`⚠️  AdorableCSS: Class "${value}" parsed successfully but generated no CSS`);
    }
    
    // Don't generate empty CSS rules
    if (!mainCSS && nestedCSSRules.length === 0) {
      return "";
    }
    
    // Build final CSS with specificity boosting for high-priority rules
    const cssParts: string[] = [];
    
    // Check if we have high-priority rules that need specificity boost
    const hasHighPriorityRules = allCSSResults.some(r => (r.priority || 0) >= 300);
    
    // Add main rule if there are properties
    if (mainCSS) {
      let finalSelector = actualSelector;
      
      // Boost specificity for high-priority rules to ensure they override component rules
      if (hasHighPriorityRules) {
        // Double the class selector to increase specificity without !important
        finalSelector = actualSelector + actualSelector.replace(/^\./, '.');
      }
      
      cssParts.push(`${finalSelector}{${mainCSS}}`);
    }
    
    // Add nested rules
    cssParts.push(...nestedCSSRules);
    
    return cleanDuplicateSelectors(cssParts.join(""));
  } catch (e) {
    console.warn(`❌ AdorableCSS: Failed to parse "${value}"`);
    console.warn(`   Error:`, e);
    return ""; // Fail gracefully
  }
}

// Generate state CSS using decorator pattern
function generateStateCSS(stateClassName: string): string {
  const pattern = StateSelector.analyze(stateClassName);
  if (!pattern) {
    console.warn(`⚠️  AdorableCSS: Invalid state pattern "${stateClassName}"`);
    return "";
  }

  // Extract base class and generate its CSS
  const baseClassName = pattern.selector;
  const baseCSS = generateCSSFromAdorableCSS(baseClassName);
  
  if (!baseCSS) {
    console.warn(`⚠️  AdorableCSS: Base class "${baseClassName}" generated no CSS for state "${stateClassName}"`);
    return "";
  }

  // Parse the base CSS to extract the rule content
  // Pattern matches: .selector{properties} and captures properties
  // Handle both single and doubled selectors (for specificity)
  const selectorMatch = baseCSS.match(/[^{]+\{([^}]+)\}/);
  if (!selectorMatch) {
    console.warn(`⚠️  AdorableCSS: Could not parse base CSS for state class "${stateClassName}"`);
    console.warn(`   Base CSS: "${baseCSS}"`);
    return "";
  }

  const cssProperties = selectorMatch[1];
  const baseClassSelector = "." + cssEscape(baseClassName);
  
  // Create state selector using StateDecorator
  const cssRule: { [key: string]: string } = {};
  cssProperties.split(';').forEach(prop => {
    if (prop.trim()) {
      const [key, value] = prop.split(':').map(s => s.trim());
      if (key && value) {
        cssRule[key] = value;
      }
    }
  });
  
  const stateCSS = createStateCSS(cssRule, pattern, baseClassSelector);
  
  // Convert the state CSS object to string
  const result = cssObjectToString(stateCSS);
  
  // For state CSS, the result is in nestedCSS, not mainCSS
  return result.nestedCSS.length > 0 ? result.nestedCSS[0] : '';
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
  // Remove duplicates first to avoid generating redundant CSS
  const uniqueClasses = [...new Set(classList)];
  
  const cssRulesArray = uniqueClasses
    .map((v) => generateCSSFromAdorableCSS(v))
    .filter(css => css && css.trim() !== "");
  
  // Remove duplicate CSS rules as well
  const uniqueCssRules = [...new Set(cssRulesArray)];
  const cssRules = cleanDuplicateSelectors(uniqueCssRules.join("\n"));
  
  // Check if any animation classes are used
  const hasAnimations = uniqueClasses.some(className => 
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
