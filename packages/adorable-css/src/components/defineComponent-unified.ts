import type { StringRuleHandler } from '../rules/types';

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
 *     hover: 'shadow(lg) scale(105)',
 *     focus: 'ring(2/blue-500)',
 *     disabled: 'opacity(50) cursor(not-allowed)'
 *   }
 * });
 * 
 * // Component with compound variants as object syntax
 * // Use pattern matching for flexible styling
 * ```
 */
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

  const handler: StringRuleHandler & { _definition?: ComponentDefinition } = (args?: string): string => {
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
    
    // Add state classes
    if (definition.states) {
      Object.entries(definition.states).forEach(([state, className]) => {
        if (className) {
          // Split the className to handle multiple classes
          const stateClasses = className.split(' ').map(cls => `${state}:${cls}`).join(' ');
          classes.push(stateClasses);
        }
      });
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