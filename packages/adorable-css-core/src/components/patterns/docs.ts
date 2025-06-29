import type { StringRuleHandler, CSSRule } from '../../rules/types';

// Modern technical documentation components using AdorableCSS string composition

// Main docs container - 3-column layout wrapper
const docsMain: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string>  = {
    default: 'min-h(screen) bg(white) hbox(top)'
  };
  
  return variants[variant] || variants.default;
};

// Navigation sidebar
const docsNav: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'w(280) h(screen) sticky top(0) border-r(1/gray-200) bg(gray-50) overflow-y(auto)',
    compact: 'w(240) h(screen) sticky top(0) border-r(1/gray-200) bg(gray-50) overflow-y(auto)'
  };
  
  return variants[variant] || variants.default;
};

// Main content area
const docsContent: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'flex(1) max-w(4xl) mx(auto) px(8) py(12)',
    wide: 'flex(1) max-w(6xl) mx(auto) px(8) py(12)'
  };
  
  return variants[variant] || variants.default;
};

// Table of Contents (right sidebar)
const docsToc: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'w(250) h(screen) sticky top(0) border-l(1/gray-200) bg(white) overflow-y(auto) px(4) py(8)',
    hidden: 'hidden'
  };
  
  return variants[variant] || variants.default;
};

// Section wrapper - using existing section component style
const docsSection: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'section mb(12)',
    hero: 'section hero py(20) mb(16)',
    compact: 'section mb(8)'
  };
  
  return variants[variant] || variants.default;
};

// Heading - using existing heading component
const docsHeading: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const level = args || 'h2';
  
  const variants: Record<string, string> = {
    h1: 'heading(h1) mb(8)',
    h2: 'heading(h2) mt(12) mb(6)',
    h3: 'heading(h3) mt(8) mb(4)',
    h4: 'heading(h4) mt(6) mb(3)'
  };
  
  return variants[level] || variants.h2;
};

// Prose content - using existing prose component
const docsProse: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'prose',
    lg: 'prose(lg)',
    sm: 'prose(sm)'
  };
  
  return variants[variant] || variants.default;
};

// Card - using existing card component
const docsCard: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'card',
    warning: 'card bg(amber-50) border(amber-200) c(amber-900)',
    info: 'card bg(blue-50) border(blue-200) c(blue-900)',
    success: 'card bg(green-50) border(green-200) c(green-900)',
    error: 'card bg(red-50) border(red-200) c(red-900)'
  };
  
  return variants[variant] || variants.default;
};

// Button - using existing button component
const docsButton: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'button',
    primary: 'button(primary)',
    secondary: 'button(secondary)',
    ghost: 'button(ghost)',
    link: 'button(link)'
  };
  
  return variants[variant] || variants.default;
};

// Badge - using existing badge component
const docsBadge: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'badge',
    sm: 'badge(sm)',
    lg: 'badge(lg)',
    primary: 'badge(primary)',
    secondary: 'badge(secondary)',
    success: 'badge(success)',
    warning: 'badge(warning)',
    error: 'badge(error)'
  };
  
  return variants[variant] || variants.default;
};

// Code block - inline or block code
const docsCode: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'inline';
  
  const variants: Record<string, string> = {
    inline: 'font(mono) text(sm) bg(gray-100) px(1.5) py(0.5) r(sm)',
    block: 'block font(mono) text(sm) bg(gray-900) c(gray-100) p(4) r(md) overflow-x(auto)',
    terminal: 'block font(mono) text(sm) bg(black) c(green-400) p(4) r(md) overflow-x(auto)'
  };
  
  return variants[variant] || variants.inline;
};

// Breadcrumb navigation
const docsBreadcrumb: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'hbox(middle) gap(2) text(sm) c(gray-600) mb(6)',
    separator: 'c(gray-400)'
  };
  
  return variants[variant] || variants.default;
};

// Search bar
const docsSearch: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'input w(full) max-w(md)',
    compact: 'input(sm) w(full) max-w(sm)'
  };
  
  return variants[variant] || variants.default;
};

// Pagination - previous/next navigation
const docsPagination: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'hbox(between) mt(16) pt(8) border-t(1/gray-200)',
    item: 'button(ghost) hbox(middle) gap(2)'
  };
  
  return variants[variant] || variants.default;
};

// Table - simple docs table
const docsTable: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'w(full) border(1/gray-200) r(lg) overflow(hidden) bg(white)',
    striped: 'w(full) border(1/gray-200) r(lg) overflow(hidden) bg(white)'
  };
  
  return variants[variant] || variants.default;
};

// Callout/Alert box
const docsCallout: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'info';
  
  const variants: Record<string, string> = {
    info: 'card bg(blue-50) border-l(4/blue-500) c(blue-900) pl(6)',
    warning: 'card bg(amber-50) border-l(4/amber-500) c(amber-900) pl(6)',
    error: 'card bg(red-50) border-l(4/red-500) c(red-900) pl(6)',
    success: 'card bg(green-50) border-l(4/green-500) c(green-900) pl(6)',
    tip: 'card bg(purple-50) border-l(4/purple-500) c(purple-900) pl(6)'
  };
  
  return variants[variant] || variants.info;
};

// Export docs rules with both kebab-case and dot notation support
export const docsRules = {
  // Main layout
  'docs': docsMain,
  'docs-nav': docsNav,
  'docs-main': docsContent,
  'docs-content': docsContent,
  'docs-toc': docsToc,
  'docs-sidebar': docsNav,
  
  // Content components
  'docs-section': docsSection,
  'docs-heading': docsHeading,
  'docs-prose': docsProse,
  
  // UI components
  'docs-card': docsCard,
  'docs-button': docsButton,
  'docs-badge': docsBadge,
  'docs-code': docsCode,
  'docs-table': docsTable,
  'docs-callout': docsCallout,
  
  // Navigation components
  'docs-breadcrumb': docsBreadcrumb,
  'docs-search': docsSearch,
  'docs-pagination': docsPagination
};