import type { StringRuleHandler } from '../rules/types';
import { defineComponent as defineBaseComponent } from './defineComponent-unified';

export interface ComponentVariant {
  base: string;
  sizes?: Record<string, string>;
  variants?: Record<string, string>;
}

export interface ComponentOptions {
  defaultSize?: string;
  defaultVariant?: string;
}

/**
 * Advanced component definition with state variants and responsive support
 */
export interface AdvancedComponentDefinition {
  base: string;
  sizes?: Record<string, string>;
  variants?: Record<string, string>;
  // Compound variants for specific combinations
  compoundVariants?: Array<{
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
  };
  // Responsive variants
  responsive?: {
    sm?: Partial<AdvancedComponentDefinition>;
    md?: Partial<AdvancedComponentDefinition>;
    lg?: Partial<AdvancedComponentDefinition>;
    xl?: Partial<AdvancedComponentDefinition>;
  };
}

/**
 * Define a component with CVA-like API (Class Variance Authority pattern)
 * 
 * @example
 * ```ts
 * const button = defineComponent({
 *   base: 'rounded-md font-medium transition-all',
 *   sizes: {
 *     sm: 'h(32) px(12) text(sm)',
 *     md: 'h(40) px(16) text(base)',
 *     lg: 'h(48) px(20) text(lg)'
 *   },
 *   variants: {
 *     primary: 'bg(blue-600) text(white)',
 *     secondary: 'bg(gray-200) text(gray-900)',
 *     danger: 'bg(red-600) text(white)'
 *   },
 *   compoundVariants: [
 *     {
 *       variant: 'primary',
 *       size: 'lg',
 *       class: 'uppercase tracking(wide)'
 *     },
 *     {
 *       variant: ['secondary', 'danger'],
 *       size: 'sm',
 *       class: 'border(2)'
 *     }
 *   ],
 *   states: {
 *     hover: 'shadow(lg) scale(1.05)',
 *     disabled: 'opacity(50) cursor(not-allowed)'
 *   }
 * });
 * 
 * // Usage:
 * button('primary/lg') // => all classes including compound variant
 * ```
 */
export function defineComponent(
  definition: AdvancedComponentDefinition
): StringRuleHandler {
  return (args?: string): string => {
    // Parse arguments
    const parts = args?.split('/') || [];
    const sizeOptions = Object.keys(definition.sizes || {});
    const size = parts.find(p => sizeOptions.includes(p)) || 'default';
    const variant = parts.find(p => !sizeOptions.includes(p)) || 'default';
    
    // Collect classes
    const classes: string[] = [definition.base];
    
    // Add size classes
    if (definition.sizes?.[size]) {
      classes.push(definition.sizes[size]);
    }
    
    // Add variant classes
    if (definition.variants?.[variant]) {
      classes.push(definition.variants[variant]);
    }
    
    // Check compound variants
    definition.compoundVariants?.forEach(compound => {
      const variantMatches = !compound.variant || 
        (Array.isArray(compound.variant) ? compound.variant.includes(variant) : compound.variant === variant);
      const sizeMatches = !compound.size || 
        (Array.isArray(compound.size) ? compound.size.includes(size) : compound.size === size);
      
      if (variantMatches && sizeMatches) {
        classes.push(compound.class);
      }
    });
    
    // Add state classes (always included, CSS will handle the actual states)
    if (definition.states) {
      Object.entries(definition.states).forEach(([state, className]) => {
        if (className) {
          classes.push(`${state}:${className}`);
        }
      });
    }
    
    return classes.filter(Boolean).join(' ').trim();
  };
}

/**
 * Create components with built-in dark mode support
 * 
 * @example
 * ```ts
 * const card = defineThemedComponent({
 *   light: {
 *     base: 'bg(white) border(gray-200) text(gray-900)',
 *     variants: {
 *       elevated: 'shadow(lg)',
 *       flat: 'shadow(none)'
 *     }
 *   },
 *   dark: {
 *     base: 'dark:bg(gray-800) dark:border(gray-700) dark:text(white)',
 *     variants: {
 *       elevated: 'dark:shadow(2xl/black.5)',
 *       flat: 'dark:shadow(none)'
 *     }
 *   }
 * });
 * ```
 */
export function defineThemedComponent(
  themes: {
    light: ComponentVariant;
    dark?: ComponentVariant;
  },
  options: ComponentOptions = {}
): StringRuleHandler {
  return (args?: string): string => {
    const lightResult = defineBaseComponent(themes.light, options)(args);
    const lightClasses = typeof lightResult === 'string' ? lightResult : '';
    
    if (!themes.dark) {
      return lightClasses;
    }
    
    const darkResult = defineBaseComponent(themes.dark, options)(args);
    const darkClasses = typeof darkResult === 'string' ? darkResult : '';
    
    // Prefix dark classes with dark:
    const darkClassesWithPrefix = darkClasses
      .split(' ')
      .map((cls: string) => `dark:${cls}`)
      .join(' ');
    
    return `${lightClasses} ${darkClassesWithPrefix}`.trim();
  };
}