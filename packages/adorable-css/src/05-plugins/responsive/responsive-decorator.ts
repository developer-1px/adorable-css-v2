// Responsive Decorator Pattern for AdorableCSS
import type { CSSRule } from '../../03-rules/types';

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

// Responsive selector analyzer
export class ResponsiveSelector {
  private static readonly RESPONSIVE_PATTERN = /^(\.\.)?(@?[a-z0-9]+(?:\([^)]*\))?):(.*)/;

  static analyze(className: string): ResponsivePattern | null {
    const match = className.match(this.RESPONSIVE_PATTERN);

    if (!match) {
      return null;
    }

    const [, maxWidthPrefix, breakpoint, selector] = match;
    const isMaxWidth = maxWidthPrefix === '..';

    if (!(breakpoint in BREAKPOINTS)) {
      return null;
    }

    return {
      breakpoint: breakpoint as BreakpointKey,
      isMaxWidth,
      selector,
      originalClass: className
    };
  }

  static isResponsive(className: string): boolean {
    return this.RESPONSIVE_PATTERN.test(className);
  }
}

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
export function isResponsiveClass(className: string): boolean {
  return ResponsiveSelector.isResponsive(className);
}

// State pattern definitions
export interface StatePattern {
  state: string;
  selector: string;
  originalClass: string;
  isGroup: boolean; // true for group-hover, group-focus, etc.
  separator: string;
}

// State selector analyzer
export class StateSelector {
  // Updated to include .class variants and explicit support for checks, selected, dark, pseudo-elements
  private static readonly STATE_PATTERN = /^(group-)?(\.[a-zA-Z0-9_-]+|hover|focus|active|visited|disabled|first|last|odd|even|checked|selected|dark|empty|read-only|required|valid|invalid|indeterminate|first-of-type|last-of-type|only-of-type|only-child|before|after|first-line|first-letter|selection|placeholder|backdrop|file-selector-button|mark|marker|-webkit-scrollbar|-webkit-scrollbar-thumb|-webkit-scrollbar-track)(:{1,2})(.*)/;

  static analyze(className: string): StatePattern | null {
    const match = className.match(this.STATE_PATTERN);

    if (!match) {
      return null;
    }

    const [, groupPrefix, state, separator, selector] = match;
    const isGroup = groupPrefix === 'group-';

    return {
      state,
      selector,
      originalClass: className,
      isGroup,
      separator
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
    const state = pattern.state;

    // Determine the state selector part
    let statePart: string;

    if (state === 'dark') {
      // Dark mode: .dark .current-class
      return {
        [`.dark ${classSelector}`]: rule
      };
    } else if (state.startsWith('.')) {
      // Class selector (e.g. .selected)
      statePart = state;
    } else if (state === 'selected') {
      // Map 'selected' to '.selected' class
      statePart = '.selected';
    } else {
      // Use captured separator (Handles :root, ::before, :hover etc explicitly as user wrote)
      statePart = `${pattern.separator}${state}`;
    }

    if (pattern.isGroup) {
      // Group state: .group:hover .current-class
      pseudoSelector = `.group${statePart} ${classSelector}`;
    } else {
      // Regular state: .current-class:hover
      pseudoSelector = `${classSelector}${statePart}`;
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

export function createStateCSS(rule: CSSRule, pattern: StatePattern, classSelector: string): CSSRule {
  const decorator = new StateDecorator();
  return decorator.decorate(rule, pattern, classSelector);
}