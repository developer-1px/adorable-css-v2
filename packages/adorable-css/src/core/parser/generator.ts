import { parseAdorableCSS } from "./parser";
import { getRuleHandler, getRuleWithPriority } from "../../rules";
import { priorityRegistry } from "../../rules/priority-registry";
import type { CSSRule, ParsedSelector, StringRuleDefinition } from "../../rules/types";
import { RulePriority } from "../../rules/types";
import { cssEscape, cleanDuplicateSelectors } from "./cssEscape";
import { px } from '../values/makeValue';
import { 
  ResponsiveSelector, 
  isResponsiveClass, 
  StateSelector,
  isStateClass,
  createStateCSS
} from "../../extensions/responsive/responsive-decorator";
import { generateTokenCSS, defaultTokens, setTokenContext } from '../../design-system/tokens/index';
import type { DesignTokens } from '../../design-system/tokens/index';
import { createParsedSelector } from '../generators/ast-helpers';
import { AnimationHandler } from '../generators/animation-handler';
import { cssObjectToString } from '../generators/css-object-generator';
import { createMediaQuery } from '../generators/breakpoints';
import { extractImportanceLevel, addImportanceToSelector } from '../generators/importance-utils';
import { createMemo } from '../utils/memo';
import { resetCSS } from '../reset';

// Helper function to get layer from priority
function getLayerFromPriority(priority: number): string {
  if (priority >= RulePriority.STATE) return 'state';
  if (priority >= RulePriority.UTILITY) return 'utility';
  if (priority >= RulePriority.LAYOUT) return 'layout';
  return 'component';
}

// Extract CSS properties from generated CSS string
export const extractCSSProperties = (baseCSS: string, className: string): string | null => {
  // Handle layer-wrapped CSS: @layer utility{.class{props}}
  let selectorMatch = baseCSS.match(/@layer\s+\w+\s*\{[^{]+\{([^}]+)\}\}/);
  
  // Fallback to non-layer CSS: .class{props}
  if (!selectorMatch) {
    selectorMatch = baseCSS.match(/[^{]+\{([^}]+)\}/);
  }
  
  if (!selectorMatch) {
    console.warn(`⚠️  AdorableCSS: Could not parse base CSS for class "${className}"`);
    console.warn(`   Base CSS: "${baseCSS}"`);
    return null;
  }
  return selectorMatch[1];
};

// Process AdorableCSS classes from string rule
const processClassesFromStringRule = (
  classes: string[],
  ruleName: string,
  visited: Set<string>,
  allCSSResults: { mainCSS: string; nestedCSS: string[]; priority?: number }[]
): void => {
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
};


// Resolve string rules recursively with cycle detection
const resolveStringRule = (
  ruleName: string, 
  args?: string, 
  visited: Set<string> = new Set(),
  parentSelector?: string
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
        processClassesFromStringRule(classes, ruleName, visited, allCSSResults);
      } else if (typeof item === 'object' && item !== null) {
        // Raw CSS object - convert directly
        const cssResult = cssObjectToString(item as CSSRule, parentSelector);
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
    processClassesFromStringRule(classes, ruleName, visited, allCSSResults);
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
    // Check if this is a string rule
    if (priorityRegistry.hasString(selector.name)) {
      const args = selector.type === "function" && selector.args ? selector.args.join("") : undefined;
      return resolveStringRule(selector.name, args, new Set(), parentSelector);
    }
    
    // Get handler and rule info
    const handler = getRuleHandler(selector.name);
    const ruleInfo = getRuleWithPriority(selector.name);
    
    if (!handler) {
      console.warn(`⚠️  AdorableCSS: Rule handler not found for "${selector.name}"`);
      return { mainCSS: "", nestedCSS: [], priority: 0 };
    }

    // Execute handler
    const args = selector.type === "function" && selector.args ? selector.args.join("") : "";
    const result = handler(args);
    const cssResult = cssObjectToString(result, parentSelector);
    
    return { ...cssResult, priority: ruleInfo?.priority || 0 };
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

// Internal implementation
function _generateCSSFromAdorableCSS(value: string): string {
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
    
    // Extract importance level
    const { level: importanceLevel } = extractImportanceLevel(value);
    
    const rawSelector = "." + cssEscape(value);
    let actualSelector = addImportanceToSelector(rawSelector);

    const allCSSResults: { mainCSS: string; nestedCSS: string[]; priority?: number }[] = [];
    let hasValidRules = false;

    result.value.forEach((v: any) => {
      const cssResult = v.combinators?.length > 0 && v.combinators[0].combinator === ":"
        ? (() => {
            const { selector, cssResult } = handlePseudoClass(v, rawSelector);
            actualSelector = addImportanceToSelector(selector);
            return cssResult;
          })()
        : handleRegularSelector(v, rawSelector);
      
      allCSSResults.push(cssResult);
      if (cssResult.mainCSS || cssResult.nestedCSS.length > 0) {
        hasValidRules = true;
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
    
    // Build final CSS
    const cssParts: string[] = [];
    
    // Add main rule if there are properties
    if (mainCSS) {
      cssParts.push(`${actualSelector}{${mainCSS}}`);
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

// Export memoized version
export const generateCSSFromAdorableCSS = createMemo(_generateCSSFromAdorableCSS);

// Generate state CSS using decorator pattern
function generateStateCSS(stateClassName: string): string {
  const { level: importanceLevel, className: cleanClassName } = extractImportanceLevel(stateClassName);
  
  const pattern = StateSelector.analyze(cleanClassName);
  if (!pattern) {
    console.warn(`⚠️  AdorableCSS: Invalid state pattern "${cleanClassName}"`);
    return "";
  }

  // Extract base class and generate its CSS
  const baseCSS = generateCSSFromAdorableCSS(pattern.selector);
  if (!baseCSS) {
    console.warn(`⚠️  AdorableCSS: Base class "${pattern.selector}" generated no CSS for state "${cleanClassName}"`);
    return "";
  }

  // Parse CSS properties
  const cssProperties = extractCSSProperties(baseCSS, cleanClassName);
  if (!cssProperties) return "";
  
  // Create CSS rule object
  const cssRule: { [key: string]: string } = {};
  cssProperties.split(';').forEach(prop => {
    if (prop.trim()) {
      const [key, value] = prop.split(':').map(s => s.trim());
      if (key && value) cssRule[key] = value;
    }
  });
  
  // Get the layer for the base rule
  const ruleName = pattern.selector.split('(')[0];
  const rule = priorityRegistry.getAnyRule(ruleName);
  const layer = rule ? getLayerFromPriority(rule.priority) : 'state';
  
  // Generate state CSS
  const fullClassSelector = "." + cssEscape(cleanClassName);
  const stateCSS = createStateCSS(cssRule, pattern, fullClassSelector);
  const result = cssObjectToString(stateCSS);
  
  // Get CSS string and add importance
  let stateCSSString = result.nestedCSS.length > 0 ? result.nestedCSS[0] : '';
  if (importanceLevel > 0 && stateCSSString) {
    stateCSSString = stateCSSString.replace(/^(\.[^{]+)(\{)/, `${`[class]`.repeat(importanceLevel)}$1$2`);
  }
  
  return stateCSSString;
}

// Generate responsive CSS using decorator pattern
function generateResponsiveCSS(responsiveClassName: string): string {
  const { level: importanceLevel, className: cleanClassName } = extractImportanceLevel(responsiveClassName);
  
  const pattern = ResponsiveSelector.analyze(cleanClassName);
  if (!pattern) {
    console.warn(`⚠️  AdorableCSS: Invalid responsive pattern "${cleanClassName}"`);
    return "";
  }

  // Extract base class and generate its CSS
  const baseCSS = generateCSSFromAdorableCSS(pattern.selector);
  if (!baseCSS) {
    console.warn(`⚠️  AdorableCSS: Base class "${pattern.selector}" generated no CSS for responsive "${cleanClassName}"`);
    return "";
  }

  // Parse CSS properties
  const cssProperties = extractCSSProperties(baseCSS, cleanClassName);
  if (!cssProperties) return "";
  
  // Generate media query
  const mediaQuery = createMediaQuery(pattern.breakpoint, pattern.isMaxWidth);
  if (!mediaQuery) return "";

  // Get the layer for the base rule
  const basePattern = ResponsiveSelector.analyze(pattern.selector);
  const ruleName = basePattern?.selector || pattern.selector;
  const rule = priorityRegistry.getAnyRule(ruleName.split('(')[0]);
  const layer = rule ? getLayerFromPriority(rule.priority) : 'utility';
  
  // Build final selector with importance
  const responsiveSelector = "." + cssEscape(cleanClassName);
  const finalSelector = addImportanceToSelector(responsiveSelector);

  // Wrap in media query
  return `${mediaQuery}{${finalSelector}{${cssProperties}}}`;
}

// Internal implementation
function _generateCSS(classList: string[]): string {
  // Remove duplicates first to avoid generating redundant CSS
  const uniqueClasses = [...new Set(classList)];
  
  // Group CSS by layer
  const layers = {
    base: [] as string[],
    components: [] as string[],
    composition: [] as string[],
    utilities: [] as string[]
  };
  
  uniqueClasses.forEach(className => {
    const css = generateCSSFromAdorableCSS(className);
    if (!css || css.trim() === "") return;
    
    // Determine layer based on class pattern
    // Components: body(), heading(), button(), etc.
    // Composition: hbox(), vbox(), grid(), layer(), etc. (layout compositions)
    // Utilities: Everything else (c(), p(), m(), etc.)
    if (/^(body|heading|title|label|caption|button|card|container|section|prose|glass|glow|interactive)\(/.test(className)) {
      layers.components.push(css);
    } else if (/^(hbox|vbox|grid|layer|stack|center|between|around|evenly)\(/.test(className)) {
      layers.composition.push(css);
    } else {
      layers.utilities.push(css);
    }
  });
  
  // Build final CSS with @layer
  const parts: string[] = [];
  
  // Define layer order
  parts.push('@layer base, components, composition, utilities;');
  
  // Add base layer with reset CSS
  parts.push(`@layer base {\n${resetCSS}\n}`);
  
  // Add components layer
  if (layers.components.length > 0) {
    parts.push(`@layer components {\n${layers.components.join("\n")}\n}`);
  }
  
  // Add composition layer
  if (layers.composition.length > 0) {
    parts.push(`@layer composition {\n${layers.composition.join("\n")}\n}`);
  }
  
  // Add utilities layer
  if (layers.utilities.length > 0) {
    parts.push(`@layer utilities {\n${layers.utilities.join("\n")}\n}`);
  }
  
  const cssRules = cleanDuplicateSelectors(parts.join("\n"));
  
  // Include keyframes if animations are used
  return AnimationHandler.prependKeyframesIfNeeded(cssRules, uniqueClasses);
}

// Export directly (array input, not suitable for simple memo)
export const generateCSS = _generateCSS;

/**
 * Options for CSS generation
 */
export interface GenerateCSSOptions {
  includeTokens?: boolean;
  tokens?: DesignTokens;
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
    tokens = defaultTokens
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
    css = tokenCSS + '\n\n' + css;
  }
  
  return css;
}

