// Responsive Decorator Pattern for AdorableCSS

// Type definition
type CSSRule = Record<string, string | Record<string, any>>;

// Responsive breakpoint definitions
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
  '4xl': '2560px',
  '5xl': '3200px',
  '6xl': '3840px',
  '7xl': '4096px'
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

// Responsive pattern analysis
export interface ResponsivePattern {
  breakpoint: BreakpointKey;
  isMaxWidth: boolean; // true for ..lg:, false for lg:
  selector: string;
  originalClass: string;
}

// Decorator interface for CSS rule transformation
export interface CSSRuleDecorator {
  decorate(rule: CSSRule, pattern: ResponsivePattern): CSSRule;
}

// Media query generator decorator
export class MediaQueryDecorator implements CSSRuleDecorator {
  decorate(rule: CSSRule, pattern: ResponsivePattern): CSSRule {
    const breakpointValue = BREAKPOINTS[pattern.breakpoint];
    
    if (!breakpointValue) {
      return rule;
    }

    // Generate media query
    const mediaQuery = pattern.isMaxWidth 
      ? `@media (max-width: ${breakpointValue})`
      : `@media (min-width: ${breakpointValue})`;

    // Wrap the original rule in media query
    return {
      [mediaQuery]: rule
    };
  }
}

// Responsive pattern analysis
const RESPONSIVE_PATTERN = /^(\.\.)?([a-z0-9]+):(.*)/;

export const analyzeResponsivePattern = (className: string): ResponsivePattern | null => {
  const match = className.match(RESPONSIVE_PATTERN);
  
  if (!match) return null;

  const [, maxWidthPrefix, breakpoint, selector] = match;
  const isMaxWidth = maxWidthPrefix === '..';
  
  if (!(breakpoint in BREAKPOINTS)) return null;

  return {
    breakpoint: breakpoint as BreakpointKey,
    isMaxWidth,
    selector,
    originalClass: className
  };
};

export const isResponsivePattern = (className: string): boolean =>
  analyzeResponsivePattern(className) !== null;

// Backward compatibility
export const ResponsiveSelector = {
  analyze: analyzeResponsivePattern,
  isResponsive: isResponsivePattern
};

// Main responsive decorator factory
export class ResponsiveDecoratorFactory {
  private mediaQueryDecorator = new MediaQueryDecorator();

  createResponsiveRule(baseRule: CSSRule, pattern: ResponsivePattern): CSSRule {
    return this.mediaQueryDecorator.decorate(baseRule, pattern);
  }

  // Process multiple responsive classes
  processResponsiveClasses(rules: { className: string; cssRule: CSSRule }[]): CSSRule[] {
    const processedRules: CSSRule[] = [];
    const groupedRules: Map<string, { pattern: ResponsivePattern; rule: CSSRule }[]> = new Map();

    // Group 03-rules by media query
    rules.forEach(({ className, cssRule }) => {
      const pattern = ResponsiveSelector.analyze(className);
      
      if (!pattern) {
        // Non-responsive rule
        processedRules.push(cssRule);
        return;
      }

      // Group responsive 03-rules
      const mediaKey = `${pattern.isMaxWidth ? 'max' : 'min'}-${pattern.breakpoint}`;
      if (!groupedRules.has(mediaKey)) {
        groupedRules.set(mediaKey, []);
      }
      groupedRules.get(mediaKey)!.push({ pattern, rule: cssRule });
    });

    // Generate media query blocks
    groupedRules.forEach((rulesGroup) => {
      if (rulesGroup.length === 0) return;

      const firstPattern = rulesGroup[0].pattern;
      const combinedRule: CSSRule = {};

      // Combine all 03-rules for the same media query
      rulesGroup.forEach(({ rule }) => {
        Object.assign(combinedRule, rule);
      });

      // Create responsive rule
      const responsiveRule = this.createResponsiveRule(combinedRule, firstPattern);
      processedRules.push(responsiveRule);
    });

    return processedRules;
  }
}

// Utility functions for easier integration
export function createResponsiveCSS(className: string, baseCSS: CSSRule): CSSRule | null {
  const pattern = ResponsiveSelector.analyze(className);
  if (!pattern) return null;

  const factory = new ResponsiveDecoratorFactory();
  return factory.createResponsiveRule(baseCSS, pattern);
}

export function isResponsiveClass(className: string): boolean {
  return ResponsiveSelector.isResponsive(className);
}

export function extractBaseClass(responsiveClassName: string): string {
  const pattern = ResponsiveSelector.analyze(responsiveClassName);
  return pattern ? pattern.selector : responsiveClassName;
}

// Debug helper
export function debugResponsivePattern(className: string): void {
  const pattern = ResponsiveSelector.analyze(className);
  if (pattern) {
    // Pattern found - debugging can be added here if needed
    return;
  } else {
    // No pattern found - debugging can be added here if needed
    return;
  }
}

// State pattern definitions
export interface StatePattern {
  state: string;
  selector: string;
  originalClass: string;
  isGroup: boolean; // true for group-hover, group-focus, etc.
}

// State selector analyzer
export class StateSelector {
  private static readonly STATE_PATTERN = /^(group-)?(hover|focus|active|disabled|first|last|odd|even|checked|selected):(.*)/;

  static analyze(className: string): StatePattern | null {
    const match = className.match(this.STATE_PATTERN);
    
    if (!match) {
      return null;
    }

    const [, groupPrefix, state, selector] = match;
    const isGroup = groupPrefix === 'group-';
    
    return {
      state,
      selector,
      originalClass: className,
      isGroup
    };
  }

  static isState(className: string): boolean {
    return this.STATE_PATTERN.test(className);
  }
}

// State decorator for pseudo-classes
export class StateDecorator {
  decorate(rule: CSSRule, pattern: StatePattern, classSelector: string): CSSRule {
    let pseudoSelector: string;
    
    if (pattern.isGroup) {
      // Group state: .group:hover .current-class
      pseudoSelector = `.group:${pattern.state} ${classSelector}`;
    } else {
      // Regular state: .current-class:hover
      pseudoSelector = `${classSelector}:${pattern.state}`;
    }
    
    return {
      [pseudoSelector]: rule
    };
  }
}

// Helper functions
export function isStateClass(className: string): boolean {
  return StateSelector.isState(className);
}

export function extractStateBaseClass(className: string): string {
  const pattern = StateSelector.analyze(className);
  return pattern ? pattern.selector : className;
}

export function createStateCSS(rule: CSSRule, pattern: StatePattern, classSelector: string): CSSRule {
  const decorator = new StateDecorator();
  return decorator.decorate(rule, pattern, classSelector);
}