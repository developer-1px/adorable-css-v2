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
import { prependKeyframesIfNeeded } from './animation-handler';
import { cssObjectToString } from './css-object-generator';
import { createMediaQuery } from './breakpoints';
import { extractImportanceLevel, addImportanceToSelector } from './importance-utils';
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
  classes.filter(Boolean).forEach(className => {
    try {
      const parsed = parseAdorableCSS(className);
      if (parsed.value.length === 0) return;
      
      const selector = parsed.value[0].selector;
      const selectorName = selector.name || selector.image;
      const selectorArgs = selector.args?.map((arg: any) => arg.image).join('');
      
      const cssResult = priorityRegistry.hasString(selectorName) 
        ? resolveStringRule(selectorName, selectorArgs, new Set(visited))
        : generateCSSFromSelector(createParsedSelector(selector));
      
      allCSSResults.push(cssResult);
    } catch (e) {
      console.warn(`⚠️  AdorableCSS: Error parsing class "${className}" from string rule "${ruleName}":`, e);
    }
  });
};


// Execute string rule handler safely
const executeStringRuleHandler = (handler: any, args?: string, ruleName?: string): string | (string | CSSRule)[] => {
  try {
    return typeof handler === 'function' 
      ? (args !== undefined ? handler(args) : handler())
      : '';
  } catch (e) {
    console.warn(`⚠️  AdorableCSS: Error executing string rule "${ruleName}":`, e);
    return '';
  }
};

// Process array result from string rule
const processArrayResult = (
  result: (string | CSSRule)[],
  ruleName: string,
  visited: Set<string>,
  parentSelector?: string,
  stringRulePriority?: number
): { mainCSS: string; nestedCSS: string[]; priority?: number }[] => {
  const allCSSResults: { mainCSS: string; nestedCSS: string[]; priority?: number }[] = [];
  
  result.forEach(item => {
    if (typeof item === 'string' && item.trim()) {
      const classes = item.trim().split(/\s+/);
      processClassesFromStringRule(classes, ruleName, visited, allCSSResults);
    } else if (typeof item === 'object' && item !== null) {
      const cssResult = cssObjectToString(item as CSSRule, parentSelector);
      allCSSResults.push({ ...cssResult, priority: stringRulePriority });
    }
  });
  
  return allCSSResults;
};

// Resolve string rules recursively with cycle detection
const resolveStringRule = (
  ruleName: string, 
  args?: string, 
  visited: Set<string> = new Set(),
  parentSelector?: string
): { mainCSS: string; nestedCSS: string[]; priority?: number } => {
  const ruleKey = `${ruleName}(${args || ''})`;
  if (visited.has(ruleKey)) {
    console.warn(`⚠️  AdorableCSS: Circular dependency detected for string rule "${ruleKey}"`);
    return { mainCSS: "", nestedCSS: [], priority: 0 };
  }
  
  visited.add(ruleKey);
  
  const stringRule = priorityRegistry.getStringRule(ruleName);
  if (!stringRule) return { mainCSS: "", nestedCSS: [], priority: 0 };
  
  const result = executeStringRuleHandler(stringRule.handler, args, ruleName);
  if (!result) return { mainCSS: "", nestedCSS: [], priority: stringRule.priority };
  
  const allCSSResults = Array.isArray(result) 
    ? processArrayResult(result, ruleName, visited, parentSelector, stringRule.priority)
    : (() => {
        const adorableCSSString = result as string;
        if (!adorableCSSString.trim()) return [];
        
        const results: { mainCSS: string; nestedCSS: string[]; priority?: number }[] = [];
        const classes = adorableCSSString.trim().split(/\s+/);
        processClassesFromStringRule(classes, ruleName, visited, results);
        return results;
      })();
  
  return {
    mainCSS: allCSSResults.map(r => r.mainCSS).filter(Boolean).join(';'),
    nestedCSS: allCSSResults.flatMap(r => r.nestedCSS),
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

// Handle different selector types with unified interface
const processSelectorValue = (
  v: any, 
  rawSelector: string, 
  parentSelector?: string
): { actualSelector: string; cssResult: { mainCSS: string; nestedCSS: string[]; priority?: number } } => {
  // Pseudo-class selector
  if (v.combinators?.length > 0 && v.combinators[0].combinator === ":") {
    const combinator = v.combinators[0];
    const pseudoClass = v.selector.image;
    const targetSelector = combinator.selector;
    const pseudoSelector = `${rawSelector}:${pseudoClass}`;
    
    return {
      actualSelector: pseudoSelector,
      cssResult: generateCSSFromSelector(createParsedSelector(targetSelector), pseudoSelector)
    };
  }
  
  // Position selector
  const selector = v.selector;
  if (selector.type === "position") {
    const positionResult = cssObjectToString({
      position: "absolute",
      left: String(px(selector.x.image)),
      top: String(px(selector.y.image))
    }, parentSelector);
    return { actualSelector: rawSelector, cssResult: { ...positionResult, priority: 200 } };
  }
  
  // Dimension-pair selector
  if (selector.type === "(dimension-pair)") {
    const dimensionPairHandler = getRuleHandler('dimension-pair');
    if (dimensionPairHandler) {
      const result = dimensionPairHandler(selector.image);
      const cssResult = cssObjectToString(result, parentSelector);
      return { actualSelector: rawSelector, cssResult: { ...cssResult, priority: 200 } };
    }
  }
  
  // Regular selector
  return {
    actualSelector: rawSelector,
    cssResult: generateCSSFromSelector(createParsedSelector(selector), parentSelector)
  };
};

// Internal implementation
function _generateCSSFromAdorableCSS(value: string): string {
  if (!value) return "";
  
  // Handle special class types
  if (isStateClass(value)) return generateStateCSS(value);
  if (isResponsiveClass(value)) return generateResponsiveCSS(value);
  
  try {
    const result = parseAdorableCSS(value);
    extractImportanceLevel(value);
    
    const rawSelector = "." + cssEscape(value);
    let actualSelector = addImportanceToSelector(rawSelector);
    const allCSSResults: { mainCSS: string; nestedCSS: string[]; priority?: number }[] = [];
    
    result.value.forEach((v: any) => {
      const { actualSelector: newSelector, cssResult } = processSelectorValue(v, rawSelector, rawSelector);
      if (newSelector !== rawSelector) {
        actualSelector = addImportanceToSelector(newSelector);
      }
      allCSSResults.push(cssResult);
    });

    // Sort and combine results
    allCSSResults.sort((a, b) => (a.priority || 0) - (b.priority || 0));
    const mainCSS = allCSSResults.map(r => r.mainCSS).filter(Boolean).join(";");
    const nestedCSSRules = allCSSResults.flatMap(r => r.nestedCSS);
    
    // Validation
    const hasValidRules = allCSSResults.some(r => r.mainCSS || r.nestedCSS.length > 0);
    if (!hasValidRules && result.value.length > 0) {
      console.warn(`⚠️  AdorableCSS: Class "${value}" parsed successfully but generated no CSS`);
    }
    
    if (!mainCSS && nestedCSSRules.length === 0) return "";
    
    // Build final CSS
    const cssParts = mainCSS ? [`${actualSelector}{${mainCSS}}`] : [];
    cssParts.push(...nestedCSSRules);
    
    return cleanDuplicateSelectors(cssParts.join(""));
  } catch (e) {
    console.warn(`❌ AdorableCSS: Failed to parse "${value}"`, e);
    return "";
  }
}

// Export memoized version
export const generateCSSFromAdorableCSS = createMemo(_generateCSSFromAdorableCSS);

// Parse CSS properties from CSS string
const parseCSSProperties = (cssProperties: string): Record<string, string> => {
  const cssRule: Record<string, string> = {};
  cssProperties.split(';').forEach(prop => {
    if (prop.trim()) {
      const [key, value] = prop.split(':').map(s => s.trim());
      if (key && value) cssRule[key] = value;
    }
  });
  return cssRule;
};

// Generate state CSS using decorator pattern
function generateStateCSS(stateClassName: string): string {
  const { level: importanceLevel, className: cleanClassName } = extractImportanceLevel(stateClassName);
  
  const pattern = StateSelector.analyze(cleanClassName);
  if (!pattern) {
    console.warn(`⚠️  AdorableCSS: Invalid state pattern "${cleanClassName}"`);
    return "";
  }

  const baseCSS = generateCSSFromAdorableCSS(pattern.selector);
  if (!baseCSS) {
    console.warn(`⚠️  AdorableCSS: Base class "${pattern.selector}" generated no CSS for state "${cleanClassName}"`);
    return "";
  }

  const cssProperties = extractCSSProperties(baseCSS, cleanClassName);
  if (!cssProperties) return "";
  
  const cssRule = parseCSSProperties(cssProperties);
  const fullClassSelector = "." + cssEscape(cleanClassName);
  const stateCSS = createStateCSS(cssRule, pattern, fullClassSelector);
  const result = cssObjectToString(stateCSS);
  
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

  const baseCSS = generateCSSFromAdorableCSS(pattern.selector);
  if (!baseCSS) {
    console.warn(`⚠️  AdorableCSS: Base class "${pattern.selector}" generated no CSS for responsive "${cleanClassName}"`);
    return "";
  }

  const cssProperties = extractCSSProperties(baseCSS, cleanClassName);
  if (!cssProperties) return "";
  
  const mediaQuery = createMediaQuery(pattern.breakpoint, pattern.isMaxWidth);
  if (!mediaQuery) return "";

  const responsiveSelector = "." + cssEscape(cleanClassName);
  const finalSelector = addImportanceToSelector(responsiveSelector);

  return `${mediaQuery}{${finalSelector}{${cssProperties}}}`;
}

// Group CSS by layers based on rule priorities
const groupCSSByLayers = (classList: string[]) => {
  const layers = { base: [] as string[], components: [] as string[], composition: [] as string[], utilities: [] as string[] };
  
  [...new Set(classList)].forEach(className => {
    const css = generateCSSFromAdorableCSS(className);
    if (!css?.trim()) return;
    
    const ruleName = className.replace(/^(.*:)/, '').match(/^([a-zA-Z0-9-]+)/)?.[1] || '';
    const ruleInfo = getRuleWithPriority(ruleName);
    const layer = ruleInfo?.layer || (ruleInfo && ruleInfo.priority >= RulePriority.COMPONENT ? 'components' : 'utilities');
    
    layers[layer as keyof typeof layers].push(css);
  });
  
  return layers;
};

// Build layered CSS structure
const buildLayeredCSS = (layers: ReturnType<typeof groupCSSByLayers>): string => {
  const parts = ['@layer base, components, composition, utilities;', `@layer base {\n${resetCSS}\n}`];
  
  (['components', 'composition', 'utilities'] as const).forEach(layerName => {
    if (layers[layerName].length > 0) {
      parts.push(`@layer ${layerName} {\n${layers[layerName].join("\n")}\n}`);
    }
  });
  
  return parts.join("\n");
};

// Internal implementation
function _generateCSS(classList: string[]): string {
  const layers = groupCSSByLayers(classList);
  const cssRules = cleanDuplicateSelectors(buildLayeredCSS(layers));
  const usedTokensCSS = generateUsedTokensCSS();
  const finalCSS = usedTokensCSS + '\n\n' + cssRules;
  
  return prependKeyframesIfNeeded(finalCSS, [...new Set(classList)]);
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

