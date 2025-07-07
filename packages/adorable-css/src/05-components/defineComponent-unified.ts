import { parseAdorableCSS } from '../01-core/parser/parser';
import { generateCSS } from '../07-generator/generator';

// Type definitions
type CSSRule = Record<string, string | Record<string, any>>;
export type StringRuleHandler = (args?: string) => string | (string | CSSRule)[];
type RuleHandler = (args: string) => CSSRule;
type KeywordRuleHandler = () => CSSRule;

/**
 * Component definition structure supporting all features
 */
export interface ComponentDefinition {
  // Base styles applied to all variants
  base: string;
  
  // Size variants
  sizes?: Record<string, string>;
  
  // Style variants
  variants?: Record<string, string>;
  
  // Compound variants for specific combinations
  compounds?: Record<string, string> | Array<{
    variant?: string | string[];
    size?: string | string[];
    class: string;
  }>;
  
  // State variants (hover, focus, etc.)
  states?: {
    hover?: string;
    focus?: string;
    active?: string;
    disabled?: string;
    [key: string]: string | undefined;
  };
  
  // Nested selectors (e.g., 'h1': 'text(5xl) font(850)')
  // Automatically converted to '& h1' unless already prefixed with &
  selectors?: Record<string, string>;
  
  // Variant-specific selector overrides
  variantSelectors?: Record<string, Record<string, string>>;
  
  // Responsive variants
  responsive?: {
    sm?: Partial<ComponentDefinition>;
    md?: Partial<ComponentDefinition>;
    lg?: Partial<ComponentDefinition>;
    xl?: Partial<ComponentDefinition>;
  };
  
  // Default values
  defaults?: {
    size?: string;
    variant?: string;
  };
}

/**
 * Options for component behavior
 */
export interface ComponentOptions {
  // List of size options for parsing
  sizeOptions?: string[];
  // Default size if not specified
  defaultSize?: string;
  // Default variant if not specified
  defaultVariant?: string;
  // Custom argument parser
  parseArgs?: (args: string) => { variant: string; size: string; [key: string]: any };
}

/**
 * Helper to parse component arguments
 */
function parseComponentArgs(
  args: string | undefined,
  sizeOptions: string[],
  defaultSize: string,
  defaultVariant: string
): { variant: string; size: string } {
  if (!args) {
    return { variant: defaultVariant, size: defaultSize };
  }

  const parts = args.split('/');
  
  // Handle explicit variant/size syntax
  if (parts.length === 2) {
    const [first, second] = parts;
    
    // Determine which is size and which is variant based on sizeOptions
    if (sizeOptions.includes(first) && !sizeOptions.includes(second)) {
      // First is size, second is variant (e.g., "sm/primary")
      return { variant: second, size: first };
    } else if (sizeOptions.includes(second) && !sizeOptions.includes(first)) {
      // First is variant, second is size (e.g., "primary/sm")
      return { variant: first, size: second };
    } else if (sizeOptions.includes(first) && sizeOptions.includes(second)) {
      // Both are sizes - use first as size, second as variant (fallback)
      return { variant: second, size: first };
    } else {
      // Neither is a size, use first as variant, second as size (fallback)
      return { variant: first, size: second };
    }
  }
  
  // Single argument - need to determine if it's size or variant
  if (parts.length === 1) {
    const arg = parts[0];
    
    // If it matches a size option, treat as size
    if (sizeOptions.includes(arg)) {
      return { variant: defaultVariant, size: arg };
    }
    
    // Otherwise treat as variant
    return { variant: arg, size: defaultSize };
  }
  
  // Fallback to defaults
  return { variant: defaultVariant, size: defaultSize };
}

/**
 * Extract definition from a component created with defineComponent
 * This is useful for component preview tools
 */
export function getComponentDefinition(
  component: StringRuleHandler & { _definition?: ComponentDefinition }
): ComponentDefinition | null {
  return component._definition || null;
}

/**
 * Unified component definition function that supports all features:
 * - Basic variants and sizes
 * - Compound variants (both object and array syntax)
 * - State variants (hover, focus, etc.)
 * - Responsive variants
 * - Custom defaults and options
 * 
 * @example
 * ```ts
 * // Simple component
 * const badge = defineComponent({
 *   base: 'inline-flex rounded-full',
 *   sizes: {
 *     sm: 'px(2) text(xs)',
 *     lg: 'px(4) fonr(lg)'
 *   },
 *   variants: {
 *     primary: 'bg(blue-600) text(white)',
 *     secondary: 'bg(gray-100) text(gray-800)'
 *   }
 * });
 * 
 * // Advanced component with states and compound variants
 * const button = defineComponent({
 *   base: 'inline-flex items(center) cursor(pointer)',
 *   sizes: {
 *     sm: 'h(32) px(12)',
 *     lg: 'h(48) px(20)'
 *   },
 *   variants: {
 *     primary: 'bg(blue-600) text(white)',
 *     secondary: 'bg(gray-100) text(gray-900)'
 *   },
 *   compounds: [
 *     {
 *       variant: 'primary',
 *       size: 'lg',
 *       class: 'uppercase tracking(wide)'
 *     }
 *   ],
 *   states: {
 *     hover: 'shadow(lg) scale(1.05)',
 *     focus: 'ring(2/blue-500)',
 *     disabled: 'opacity(50) cursor(not-allowed)'
 *   }
 * });
 * 
 * // Component with compound variants as object syntax
 * // Use pattern matching for flexible styling
 * ```
 */
/**
 * Helper to process selector
 * Automatically adds '&' prefix if not present (except for class selectors starting with '.')
 */
function processSelector(selector: string): string {
  // Already has & prefix, use as is
  if (selector.startsWith('&')) {
    return selector;
  }
  
  // Add space before selector for descendant combinator
  return `& ${selector}`;
}

/**
 * Convert AdorableCSS classes to actual CSS properties
 * @param adorableCSS - The AdorableCSS string to convert
 * @param visited - Set of visited components to prevent recursion
 * @param depth - Current recursion depth
 */
function adorableCSSToCSS(adorableCSS: string, visited: Set<string> = new Set(), depth: number = 0): CSSRule {
  if (!adorableCSS) return {};
  
  // Prevent infinite recursion with depth limit
  const MAX_RECURSION_DEPTH = 10;
  if (depth > MAX_RECURSION_DEPTH) {
    console.warn(`Maximum recursion depth (${MAX_RECURSION_DEPTH}) exceeded for AdorableCSS: "${adorableCSS}"`);
    return {};
  }
  
  // Prevent circular dependencies by tracking visited classes
  const classKey = `${adorableCSS}@${depth}`;
  if (visited.has(classKey)) {
    console.warn(`Circular dependency detected for AdorableCSS: "${adorableCSS}" at depth ${depth}`);
    return {};
  }
  
  // Add current class to visited set
  const newVisited = new Set(visited);
  newVisited.add(classKey);
  
  try {
    // Add timeout mechanism for CSS generation
    const startTime = Date.now();
    const TIMEOUT_MS = 5000; // 5 second timeout
    
    // Generate CSS using the main generator
    const cssString = generateCSS([adorableCSS]);
    
    // Check if generation took too long
    const elapsed = Date.now() - startTime;
    if (elapsed > TIMEOUT_MS) {
      console.warn(`CSS generation timeout (${elapsed}ms) for AdorableCSS: "${adorableCSS}"`);
      return {};
    }
    
    // Parse the generated CSS to extract properties
    return parseCSSStringToObject(cssString);
  } catch (e) {
    console.warn(`Failed to process AdorableCSS "${adorableCSS}" at depth ${depth}:`, e);
    return {};
  }
}

/**
 * Parse CSS string into a CSS object with properties
 * This extracts CSS properties from the generated CSS string
 */
function parseCSSStringToObject(cssString: string): CSSRule {
  const cssObject: CSSRule = {};
  
  if (!cssString.trim()) return cssObject;
  
  // Remove CSS selectors and extract just the properties
  // This is a simplified parser that works with the generator output
  const lines = cssString.split('\n');
  const currentProperties: Record<string, string> = {};
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip empty lines, comments, and selectors
    if (!trimmed || trimmed.startsWith('/*') || trimmed.startsWith('@') || trimmed.endsWith('{') || trimmed === '}') {
      continue;
    }
    
    // Extract CSS property-value pairs
    if (trimmed.includes(':') && trimmed.endsWith(';')) {
      const [property, ...valueParts] = trimmed.split(':');
      const value = valueParts.join(':').replace(';', '').trim();
      
      if (property && value) {
        currentProperties[property.trim()] = value;
      }
    }
  }
  
  return currentProperties;
}

export function defineComponent(
  definition: ComponentDefinition,
  options: ComponentOptions = {}
): StringRuleHandler {
  const {
    sizeOptions = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    defaultSize = definition.defaults?.size || 'default',
    defaultVariant = definition.defaults?.variant || 'default',
    parseArgs = (args) => parseComponentArgs(args, sizeOptions, defaultSize, defaultVariant)
  } = options;

  const handler: StringRuleHandler & { _definition?: ComponentDefinition } = (args?: string): string | (string | CSSRule)[] => {
    const { variant, size } = parseArgs(args || '');
    const classes: string[] = [];
    
    // Add base classes
    if (definition.base) {
      classes.push(definition.base);
    }
    
    // Add size classes
    if (definition.sizes?.[size]) {
      classes.push(definition.sizes[size]);
    }
    
    // Add variant classes
    if (definition.variants?.[variant]) {
      classes.push(definition.variants[variant]);
    }
    
    // Handle compound variants
    if (definition.compounds) {
      if (Array.isArray(definition.compounds)) {
        // Array syntax with conditions
        definition.compounds.forEach(compound => {
          const variantMatches = !compound.variant || 
            (Array.isArray(compound.variant) ? compound.variant.includes(variant) : compound.variant === variant);
          const sizeMatches = !compound.size || 
            (Array.isArray(compound.size) ? compound.size.includes(size) : compound.size === size);
          
          if (variantMatches && sizeMatches) {
            classes.push(compound.class);
          }
        });
      } else {
        // Object syntax with patterns
        const compoundKey = `${variant}/${size}`;
        
        // Check exact match
        if (definition.compounds[compoundKey]) {
          classes.push(definition.compounds[compoundKey]);
        }
        
        // Check wildcard patterns
        const variantWildcard = definition.compounds[`${variant}/*`];
        const sizeWildcard = definition.compounds[`*/${size}`];
        
        if (variantWildcard) classes.push(variantWildcard);
        if (sizeWildcard) classes.push(sizeWildcard);
      }
    }
    
    // Handle state classes (hover:, focus:, active:, etc.)
    if (definition.states) {
      Object.entries(definition.states).forEach(([state, className]) => {
        if (className) {
          const stateClasses = className.split(' ').map(cls => `${state}:${cls}`).join(' ');
          classes.push(stateClasses);
        }
      });
    }
    
    // Handle selectors if present
    if (definition.selectors || definition.variantSelectors?.[variant]) {
      const cssRule: CSSRule = {};
      
      // Add base selectors
      if (definition.selectors) {
        const visited = new Set<string>();
        Object.entries(definition.selectors).forEach(([selector, adorableCSS]) => {
          const processedSelector = processSelector(selector);
          const cssObject = adorableCSSToCSS(adorableCSS, visited, 0);
          if (Object.keys(cssObject).length > 0) {
            cssRule[processedSelector] = cssObject;
          }
        });
      }
      
      // Add variant-specific selector overrides
      if (definition.variantSelectors?.[variant]) {
        const visited = new Set<string>();
        Object.entries(definition.variantSelectors[variant]).forEach(([selector, adorableCSS]) => {
          const processedSelector = processSelector(selector);
          const cssObject = adorableCSSToCSS(adorableCSS, visited, 0);
          if (Object.keys(cssObject).length > 0) {
            // If selector already exists, merge the properties
            if (cssRule[processedSelector]) {
              Object.assign(cssRule[processedSelector] as CSSRule, cssObject);
            } else {
              cssRule[processedSelector] = cssObject;
            }
          }
        });
      }
      
      // Return array with classes and CSS rule
      return [classes.filter(Boolean).join(' ').trim(), cssRule];
    }
    
    return classes.filter(Boolean).join(' ').trim();
  };
  
  // Attach definition for inspection
  handler._definition = definition;
  
  return handler;
}

/**
 * Create 04-components with built-in dark mode support
 * 
 * @example
 * ```ts
 * const card = defineThemedComponent({
 *   light: {
 *     base: 'bg(white) border(gray-200)',
 *     variants: {
 *       elevated: 'shadow(lg)'
 *     }
 *   },
 *   dark: {
 *     base: 'bg(gray-800) border(gray-700)',
 *     variants: {
 *       elevated: 'shadow(2xl/black.5)'
 *     }
 *   }
 * });
 * ```
 */
export function defineThemedComponent(
  themes: {
    light: ComponentDefinition;
    dark?: ComponentDefinition;
  },
  options: ComponentOptions = {}
): StringRuleHandler {
  return (args?: string): string => {
    const lightResult = defineComponent(themes.light, options)(args);
    const lightClasses = typeof lightResult === 'string' ? lightResult : '';
    
    if (!themes.dark) {
      return lightClasses;
    }
    
    const darkResult = defineComponent(themes.dark, options)(args);
    const darkClasses = typeof darkResult === 'string' ? darkResult : '';
    
    // Prefix dark classes with dark:
    const darkClassesWithPrefix = darkClasses
      .split(' ')
      .map((cls: string) => `dark:${cls}`)
      .join(' ');
    
    return `${lightClasses} ${darkClassesWithPrefix}`.trim();
  };
}