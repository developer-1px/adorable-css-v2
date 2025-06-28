// State Decorator for pseudo-classes like hover:, focus:, group-hover: etc.
import type { CSSRule } from '../../rules/types';

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