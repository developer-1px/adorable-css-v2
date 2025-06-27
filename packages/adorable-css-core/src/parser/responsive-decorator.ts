// Responsive Decorator Pattern for AdorableCSS
import type { CSSRule } from '../rules/types';

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
      console.warn(`⚠️  Unknown breakpoint: ${pattern.breakpoint}`);
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
  private static readonly RESPONSIVE_PATTERN = /^(\.\.)?([a-z0-9]+):(.*)/;

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

    // Group rules by media query
    rules.forEach(({ className, cssRule }) => {
      const pattern = ResponsiveSelector.analyze(className);
      
      if (!pattern) {
        // Non-responsive rule
        processedRules.push(cssRule);
        return;
      }

      // Group responsive rules
      const mediaKey = `${pattern.isMaxWidth ? 'max' : 'min'}-${pattern.breakpoint}`;
      if (!groupedRules.has(mediaKey)) {
        groupedRules.set(mediaKey, []);
      }
      groupedRules.get(mediaKey)!.push({ pattern, rule: cssRule });
    });

    // Generate media query blocks
    groupedRules.forEach((rulesGroup, mediaKey) => {
      if (rulesGroup.length === 0) return;

      const firstPattern = rulesGroup[0].pattern;
      const combinedRule: CSSRule = {};

      // Combine all rules for the same media query
      rulesGroup.forEach(({ rule }, index) => {
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
    console.log(`🔍 Responsive Pattern Analysis for "${className}":`);
    console.log(`   Breakpoint: ${pattern.breakpoint} (${BREAKPOINTS[pattern.breakpoint]})`);
    console.log(`   Type: ${pattern.isMaxWidth ? 'max-width' : 'min-width'}`);
    console.log(`   Base selector: ${pattern.selector}`);
  } else {
    console.log(`❌ No responsive pattern found in "${className}"`);
  }
}