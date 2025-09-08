// Type definitions
type CSSRule = Record<string, string | Record<string, any>>;
export type StringRuleHandler = (args?: string) => string | (string | CSSRule)[];

// Component definition interfaces
export interface ComponentDefinition {
  base: string;
  sizes?: Record<string, string>;
  variants?: Record<string, string>;
  compounds?: Array<{
    variant?: string | string[];
    size?: string | string[];
    class: string;
  }> | Record<string, string>;
  states?: Record<string, string>;
  selectors?: Record<string, string>;
  variantSelectors?: Record<string, Record<string, string>>;
  defaults?: {
    size?: string;
    variant?: string;
  };
}

export interface ComponentOptions {
  sizeOptions?: string[];
  defaultSize?: string;
  defaultVariant?: string;
}

// Parse argument string like 'primary/sm' or 'sm/primary'
function parseArguments(
  args?: string, 
  definition?: ComponentDefinition
): { variant?: string; size?: string } {
  if (!args) return {};
  
  const parts = args.split('/');
  if (parts.length === 1) {
    // Single argument - could be size or variant
    return { variant: parts[0], size: parts[0] };
  }
  
  // Two parts - determine which is size and which is variant
  const availableSizes = definition?.sizes ? Object.keys(definition.sizes) : [];
  const availableVariants = definition?.variants ? Object.keys(definition.variants) : [];
  
  const [first, second] = parts;
  
  // Check if first part is a size and second is a variant
  if (availableSizes.includes(first) && availableVariants.includes(second)) {
    return { size: first, variant: second };
  }
  
  // Check if first part is a variant and second is a size  
  if (availableVariants.includes(first) && availableSizes.includes(second)) {
    return { variant: first, size: second };
  }
  
  // Default assumption: variant/size
  return {
    variant: first,
    size: second
  };
}

// Apply state prefixes to classes
function applyStates(states: Record<string, string>): string {
  const stateClasses: string[] = [];
  
  for (const [state, classes] of Object.entries(states)) {
    const classTokens = classes.split(/\s+/).filter(Boolean);
    
    for (const token of classTokens) {
      stateClasses.push(`${state}:${token}`);
    }
  }
  
  return stateClasses.join(' ');
}

// Apply compound variants
function applyCompounds(
  compounds: ComponentDefinition['compounds'],
  selectedVariant?: string,
  selectedSize?: string
): string {
  if (!compounds) return '';
  
  const compoundClasses: string[] = [];
  
  if (Array.isArray(compounds)) {
    // Array syntax with objects
    for (const compound of compounds) {
      const { variant, size, class: compoundClass } = compound;
      
      // Check if variant matches
      const variantMatches = !variant || 
        (Array.isArray(variant) ? variant.includes(selectedVariant || '') : variant === selectedVariant);
      
      // Check if size matches  
      const sizeMatches = !size ||
        (Array.isArray(size) ? size.includes(selectedSize || '') : size === selectedSize);
      
      if (variantMatches && sizeMatches) {
        compoundClasses.push(compoundClass);
      }
    }
  } else {
    // Object syntax with patterns
    for (const [pattern, compoundClass] of Object.entries(compounds)) {
      const [variantPattern, sizePattern] = pattern.split('/');
      
      // Check variant pattern (supports wildcards)
      const variantMatches = variantPattern === '*' || variantPattern === selectedVariant;
      
      // Check size pattern (supports wildcards)
      const sizeMatches = !sizePattern || sizePattern === '*' || sizePattern === selectedSize;
      
      if (variantMatches && sizeMatches) {
        compoundClasses.push(compoundClass);
      }
    }
  }
  
  return compoundClasses.join(' ');
}

// Main defineComponent function
export function defineComponent(
  definition: ComponentDefinition,
  options?: ComponentOptions
): StringRuleHandler {
  return (args?: string): string => {
    const { variant: argVariant, size: argSize } = parseArguments(args, definition);
    
    // Resolve base classes
    const baseClasses = definition.base;
    
    // Determine final size and variant
    const finalSize = argSize || definition.defaults?.size || options?.defaultSize || 'default';
    const finalVariant = argVariant || definition.defaults?.variant || options?.defaultVariant || 'default';
    
    // Collect classes
    const classes: string[] = [baseClasses];
    
    // Add size classes
    if (definition.sizes) {
      // Check if the size exists in sizes definition
      const availableSizes = Object.keys(definition.sizes);
      if (availableSizes.includes(finalSize)) {
        classes.push(definition.sizes[finalSize]);
      } else if (availableSizes.includes(argSize || '')) {
        classes.push(definition.sizes[argSize!]);
      } else if (definition.sizes.default) {
        classes.push(definition.sizes.default);
      }
    }
    
    // Add variant classes
    if (definition.variants) {
      // Check if the variant exists in variants definition
      const availableVariants = Object.keys(definition.variants);
      if (availableVariants.includes(finalVariant)) {
        classes.push(definition.variants[finalVariant]);
      } else if (availableVariants.includes(argVariant || '')) {
        classes.push(definition.variants[argVariant!]);
      } else if (definition.variants.default) {
        classes.push(definition.variants.default);
      }
    }
    
    // Add compound classes
    if (definition.compounds) {
      const compoundClasses = applyCompounds(definition.compounds, finalVariant, finalSize);
      if (compoundClasses) {
        classes.push(compoundClasses);
      }
    }
    
    // Add state classes
    if (definition.states) {
      const stateClasses = applyStates(definition.states);
      if (stateClasses) {
        classes.push(stateClasses);
      }
    }
    
    return classes.filter(Boolean).join(' ');
  };
}

// Themed component support
export interface ThemedComponentDefinition {
  light: ComponentDefinition;
  dark?: ComponentDefinition;
}

export function defineThemedComponent(
  themedDefinition: ThemedComponentDefinition,
  options?: ComponentOptions
): StringRuleHandler {
  return (args?: string): string | (string | CSSRule)[] => {
    const lightComponent = defineComponent(themedDefinition.light, options);
    const lightClasses = lightComponent(args);
    
    if (!themedDefinition.dark) {
      return lightClasses;
    }
    
    const darkComponent = defineComponent(themedDefinition.dark, options);
    const darkClasses = darkComponent(args);
    
    // For themed components, we need to handle complex results properly
    // For now, convert to string if needed
    const lightString = typeof lightClasses === 'string' ? lightClasses : 
      Array.isArray(lightClasses) ? lightClasses.filter(item => typeof item === 'string').join(' ') : '';
    
    const darkString = typeof darkClasses === 'string' ? darkClasses :
      Array.isArray(darkClasses) ? darkClasses.filter(item => typeof item === 'string').join(' ') : '';
    
    // Prefix dark classes with 'dark:'
    const prefixedDarkClasses = darkString
      .split(' ')
      .filter(Boolean)
      .map(cls => `dark:${cls}`)
      .join(' ');
    
    return `${lightString} ${prefixedDarkClasses}`;
  };
}