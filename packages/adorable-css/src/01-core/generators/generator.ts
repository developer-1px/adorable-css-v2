import { parseAdorableCSS } from "../parser/parser";
import { getRuleHandler, getRuleWithPriority } from "../../03-rules";
import { priorityRegistry } from "../../03-rules/priority-registry";
import type { CSSRule, ParsedSelector } from "../../03-rules/types";
import { RulePriority } from "../../03-rules/types";
import { cssEscape, cleanDuplicateSelectors } from "../parser/cssEscape";
import { px } from '../values/makeValue';
import {
  ResponsiveSelector,
  isResponsiveClass,
  StateSelector,
  isStateClass,
  createStateCSS
} from "../../05-plugins/responsive/responsive-decorator";
import { generateTokenCSS, defaultTokens, setTokenContext } from '../../02-design_tokens/design-system/tokens/index';
import { generateUsedTokensCSS } from '../../02-design_tokens/tokenRegistry';
import type { DesignTokens } from '../../02-design_tokens/design-system/tokens/index';
import { createParsedSelector } from './ast-helpers';
import { cssObjectToString } from './css-object-generator';
import { createMediaQuery } from './breakpoints';
import { createMemo } from '../utils/memo';
import { resetCSS } from '../reset';
import { getAllKeyframes } from '../../05-plugins/animations/animations';

// Helper function to get layer from priority
function getLayerFromPriority(priority: number): string {
  if (priority >= RulePriority.STATE) return 'state';
  if (priority >= RulePriority.UTILITY) return 'utility';
  if (priority >= RulePriority.LAYOUT) return 'layout';
  return 'component';
}

// Extract importance level from class name using parser AST
interface ImportanceInfo {
  level: number;
  className: string;
}

function extractImportanceLevel(className: string): ImportanceInfo {
  try {
    const parsed = parseAdorableCSS(className);
    if (parsed.value.length > 0) {
      const firstSelector = parsed.value[0];
      const important = firstSelector.important || '';
      const level = important.length;

      return {
        level,
        className: level > 0 ? className.slice(0, -level) : className
      };
    }
  } catch (e) {
    // Fallback: if parsing fails, assume no importance
  }

  return {
    level: 0,
    className
  };
}

// Prepend animation keyframes if needed
function prependKeyframesIfNeeded(css: string, classNames: string[]): string {
  const hasAnimations = classNames.some(c =>
    c.includes('fade-') || c.includes('scale-') ||
    c.includes('slide-') || c.includes('bounce-') ||
    c.includes('float') || c.includes('animate(')
  );

  if (hasAnimations) {
    return getAllKeyframes() + "\n" + css;
  }
  return css;
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


// Resolve string 03-rules recursively with cycle detection
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
  const combinatorItem = v.combinators[0];
  const separator = combinatorItem.combinator; // : or ::
  const pseudoClass = v.selector.image;
  const targetSelector = combinatorItem.selector;

  // Construct pseudo selector using the correct separator
  // e.g. .class:hover or .class::first-line
  const pseudoSelector = `${rawSelector}${separator}${pseudoClass}`;

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

  // Handle dimension-pair 02-design_tokens (e.g., 64x64)
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

  const result = parseAdorableCSS(value);

  // Extract importance level
  extractImportanceLevel(value);

  const rawSelector = "." + cssEscape(value);
  let actualSelector = rawSelector;

  const allCSSResults: { mainCSS: string; nestedCSS: string[]; priority?: number }[] = [];
  let hasValidRules = false;

  result.value.forEach((v: any) => {
    const combinator = v.combinators?.[0]?.combinator;
    const cssResult = combinator === ":" || combinator === "::"
      ? (() => {
        const { selector, cssResult } = handlePseudoClass(v, rawSelector);
        actualSelector = selector;
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

  // Collect all nested CSS 03-rules
  const nestedCSSRules = allCSSResults.flatMap(r => r.nestedCSS);

  // Warn about parsed but empty 03-rules
  if (!hasValidRules && result.value.length > 0) {
    console.warn(`⚠️  AdorableCSS: Class "${value}" parsed successfully but generated no CSS`);
  }

  // Don't generate empty CSS 03-rules
  if (!mainCSS && nestedCSSRules.length === 0) {
    return "";
  }

  // Build final CSS
  const cssParts: string[] = [];

  // Add main rule if there are properties
  if (mainCSS) {
    cssParts.push(`${actualSelector}{${mainCSS}}`);
  }

  // Add nested 03-rules
  cssParts.push(...nestedCSSRules);

  return cleanDuplicateSelectors(cssParts.join(""));
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
  const _layer = rule ? getLayerFromPriority(rule.priority) : 'state';

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
  const { className: cleanClassName } = extractImportanceLevel(responsiveClassName);

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
  const _utilityLayer = rule ? getLayerFromPriority(rule.priority) : 'utility';

  // Build final selector
  const responsiveSelector = "." + cssEscape(cleanClassName);

  // Wrap in media query
  return `${mediaQuery}{${responsiveSelector}{${cssProperties}}}`;
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
    try {
      const css = generateCSSFromAdorableCSS(className);
      if (!css || css.trim() === "") return;

      const ruleName = className.replace(/^(.*:)/, '').match(/^([a-zA-Z0-9-]+)/)?.[1] || '';
      const ruleInfo = getRuleWithPriority(ruleName);
      const layer = ruleInfo?.layer ||
        (ruleInfo && ruleInfo.priority >= RulePriority.COMPONENT ? 'components' : 'utilities');

      layers[layer as keyof typeof layers].push(css);
    } catch (e) {
      // Skip invalid classes silently or with debug log
      // console.debug(`Skipping invalid class: ${className}`);
    }
  });

  // Build final CSS with @layer
  const parts: string[] = [];

  // Define layer order
  parts.push('@layer base, 04-components, composition, utilities;');

  // Add base layer with reset CSS
  parts.push(`@layer base {\n${resetCSS}\n}`);

  // Add 04-components layer
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

  // Generate used 02-design_tokens CSS and prepend to the result
  const usedTokensCSS = generateUsedTokensCSS();
  const finalCSS = usedTokensCSS + '\n\n' + cssRules;

  // Include keyframes if animations are used
  return prependKeyframesIfNeeded(finalCSS, uniqueClasses);
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

  // Prepend 02-design_tokens if requested
  if (includeTokens) {
    const tokenCSS = generateTokenCSS(tokens);
    css = tokenCSS + '\n\n' + css;
  }

  return css;
}

