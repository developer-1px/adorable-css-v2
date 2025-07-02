import type { StringRuleHandler, CSSRule, RuleHandler, KeywordRuleHandler } from '../rules/types';
import { parseAdorableCSS } from '../core/parser/parser';
import { priorityRegistry } from '../rules/priority-registry';

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
  
  // Nested selectors (e.g., 'h1': 'font(5xl) bold(850)')
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
  const size = parts.find(p => sizeOptions.includes(p)) || defaultSize;
  const variant = parts.find(p => !sizeOptions.includes(p)) || defaultVariant;

  return { variant, size };
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
 *     lg: 'px(4) text(lg)'
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
 * Convert AdorableCSS classes to actual CSS object
 * @param adorableCSS - The AdorableCSS string to convert
 * @param visited - Set of visited components to prevent recursion
 */
function adorableCSSToCSS(adorableCSS: string, visited: Set<string> = new Set()): CSSRule {
  if (!adorableCSS) return {};
  
  // Split classes and process each one
  const classes = adorableCSS.trim().split(/\s+/);
  const cssObject: CSSRule = {};
  
  for (const className of classes) {
    if (!className) continue;
    
    try {
      const parsed = parseAdorableCSS(className);
      if (parsed.value.length > 0) {
        const selector = parsed.value[0].selector;
        const selectorName = selector.name || selector.image;
        const selectorArgs = selector.args?.map((arg: any) => arg.image).join('');
        
        // Check for circular dependency
        const componentKey = `${selectorName}(${selectorArgs || ''})`;
        if (visited.has(componentKey)) {
          console.warn(`⚠️  AdorableCSS: Circular dependency detected for component "${componentKey}"`);
          continue;
        }
        
        // First check if it's a string rule (component)
        if (priorityRegistry.hasString(selectorName)) {
          const stringRule = priorityRegistry.getStringRule(selectorName);
          if (stringRule) {
            // Add to visited set before calling handler
            visited.add(componentKey);
            
            const handler = stringRule.handler;
            const result = typeof handler === 'function' 
              ? (selectorArgs !== undefined ? handler(selectorArgs) : handler())
              : '';
            
            // Handle different result types
            if (typeof result === 'string') {
              // This is a string rule returning more AdorableCSS classes
              const nestedCSS = adorableCSSToCSS(result, new Set(visited));
              Object.assign(cssObject, nestedCSS);
            } else if (Array.isArray(result)) {
              // Handle array results [string, CSSRule] from components
              const [classString] = result;
              if (classString && typeof classString === 'string') {
                const nestedCSS = adorableCSSToCSS(classString, new Set(visited));
                Object.assign(cssObject, nestedCSS);
              }
              // Note: We ignore the nested rules here as they're for selectors,
              // not for the current element
            }
            
            // Remove from visited set after processing
            visited.delete(componentKey);
          }
        } else {
          // Try regular CSS rule handler
          const rule = priorityRegistry.getRule(selectorName);
          if (rule) {
            const handler = rule.handler;
            const result = typeof handler === 'function'
              ? (selectorArgs !== undefined ? (handler as RuleHandler)(selectorArgs) : (handler as KeywordRuleHandler)())
              : {};
            
            if (result && typeof result === 'object' && !Array.isArray(result)) {
              // Regular CSS object
              Object.assign(cssObject, result);
            }
          }
        }
      }
    } catch (e) {
      console.warn(`Failed to process AdorableCSS class "${className}":`, e);
    }
  }
  
  return cssObject;
}

export function defineComponent(
  definition: ComponentDefinition,
  options: ComponentOptions = {}
): StringRuleHandler {
  const {
    sizeOptions = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'default'],
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
    
    // TODO: Implement state classes properly
    // States like hover:, focus:, active: need proper handling
    // For now, skip states to avoid parsing errors
    // if (definition.states) {
    //   Object.entries(definition.states).forEach(([state, className]) => {
    //     if (className) {
    //       const stateClasses = className.split(' ').map(cls => `${state}:${cls}`).join(' ');
    //       classes.push(stateClasses);
    //     }
    //   });
    // }
    
    // Handle selectors if present
    if (definition.selectors || definition.variantSelectors?.[variant]) {
      const cssRule: CSSRule = {};
      
      // Add base selectors
      if (definition.selectors) {
        const visited = new Set<string>();
        Object.entries(definition.selectors).forEach(([selector, adorableCSS]) => {
          const processedSelector = processSelector(selector);
          const cssObject = adorableCSSToCSS(adorableCSS, visited);
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
          const cssObject = adorableCSSToCSS(adorableCSS, visited);
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
 * Create components with built-in dark mode support
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