import type { CSSRule, KeywordRuleHandler } from '../types';

// Group state utilities for parent-child hover interactions
// These create CSS rules that target child elements when parent is hovered

// Group class - add to parent element
export const group: KeywordRuleHandler = (): CSSRule => ({
  // Just a marker class, no CSS needed
});

// Group hover utilities - these create parent hover selectors that affect the current element
export const groupHover: KeywordRuleHandler = (): CSSRule => ({
  // This will be processed by the responsive decorator to create .group:hover .current-class
});

// Group focus utilities
export const groupFocus: KeywordRuleHandler = (): CSSRule => ({
  // This will be processed by the responsive decorator to create .group:focus .current-class
});

// Group active utilities  
export const groupActive: KeywordRuleHandler = (): CSSRule => ({
  // This will be processed by the responsive decorator to create .group:active .current-class
});

export const groupStateRules = {
  group,
  'group-hover': groupHover,
  'group-focus': groupFocus,
  'group-active': groupActive
};