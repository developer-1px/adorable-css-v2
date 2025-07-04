import type { StringRuleHandler, CSSRule } from '../../rules/types';

// Modern technical documentation components using AdorableCSS string composition

// Main docs container - 3-column layout wrapper with modern background
const docsMain: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string>  = {
    default: 'min-h(screen) bg(gray-50) hbox(top) relative overflow(hidden)',
    gradient: 'min-h(screen) bg(to-br/gray-50..white) hbox(top) relative overflow(hidden)',
    pattern: 'min-h(screen) bg(white) hbox(top) relative overflow(hidden) before:layer(fill/-10) before:bg(radial-gradient(circle_at_20%_80%,purple-100.1_0%,transparent_50%)) before:bg(radial-gradient(circle_at_80%_20%,blue-100.1_0%,transparent_50%)) before:bg(radial-gradient(circle_at_40%_40%,pink-100.1_0%,transparent_30%))'
  };
  
  return variants[variant] || variants.default;
};

// Navigation sidebar with glassmorphism effect
const docsNav: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'w(280) h(screen) sticky top(0) bg(white.7) backdrop-blur(lg) backdrop-saturate(180%) border-r(1/gray-200.3) scroll(y) shadow(lg)',
    glass: 'w(280) h(screen) sticky top(0) bg(gradient-to-b/from-white.6/to-gray-50.6) backdrop-blur(xl) backdrop-saturate(150%) border-r(1/white.2) scroll(y) shadow(2xl)',
    compact: 'w(240) h(screen) sticky top(0) bg(white.8) backdrop-blur(md) border-r(1/gray-200.5) scroll(y) shadow(md)',
    dark: 'w(280) h(screen) sticky top(0) bg(gray-900.9) backdrop-blur(lg) border-r(1/gray-700.5) scroll(y) shadow(2xl) c(gray-100)'
  };
  
  return variants[variant] || variants.default;
};

// Main content area with modern spacing and layout
const docsContent: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'flex(1) max-w(4xl) mx(auto) px(8) py(16) min-h(calc(100vh-80px))',
    wide: 'flex(1) max-w(6xl) mx(auto) px(8) py(16) min-h(calc(100vh-80px))',
    centered: 'flex(1) max-w(3xl) mx(auto) px(6) py(20) min-h(calc(100vh-80px))',
    article: 'flex(1) max-w(prose) mx(auto) px(6) py(16) min-h(calc(100vh-80px))'
  };
  
  return variants[variant] || variants.default;
};

// Table of Contents (right sidebar) with floating card style
const docsToc: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'w(250) h(fit) max-h(calc(100vh-120px)) sticky top(80) ml(8) mr(4) bg(white) r(xl) shadow(xl) scroll(y) ring(1/gray-200) p(6)',
    floating: 'w(250) h(fit) max-h(calc(100vh-120px)) sticky top(80) ml(8) mr(4) bg(white.95) backdrop-blur(sm) r(2xl) shadow(2xl/shadow-lg) scroll(y) ring(1/gray-100) p(6) hover:shadow(2xl/shadow-xl) transition',
    glass: 'w(250) h(fit) max-h(calc(100vh-120px)) sticky top(80) ml(8) mr(4) bg(to-br/from-white.7/to-gray-50.5) backdrop-blur(md) r(2xl) shadow(xl) scroll(y) ring(1/white.3) p(6) hover:shadow(2xl) transition',
    hidden: 'hidden'
  };
  
  return variants[variant] || variants.default;
};

// Section wrapper with modern spacing and dividers
const docsSection: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'section mb(16) relative',
    hero: 'section hero py(24) mb(20) bg(to-br/gray-50..white) r(2xl) px(8) border(1/gray-100)',
    compact: 'section mb(10)',
    divided: 'section mb(16) pb(16) border-b(1/gray-200) relative after:layer(bottom-8+left+50%) after:w(100) after:h(1) after:bg(gradient-to-r/transparent..gray-300..transparent)'
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

// Breadcrumb navigation with modern style
const docsBreadcrumb: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'hbox(middle) gap(2) text(sm) c(gray-500) mb(8) px(1)',
    separator: 'c(gray-300) text(xs)',
    modern: 'hbox(middle) gap(3) text(sm) mb(8) bg(gray-50) px(4) py(2) r(full) border(1/gray-200)',
    minimal: 'hbox(middle) gap(2) text(xs) c(gray-400) mb(6) uppercase tracking(wide)'
  };
  
  return variants[variant] || variants.default;
};

// Breadcrumb link
const docsBreadcrumbLink: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'c(gray-600) hover:c(indigo-600) transition font(medium)',
    current: 'c(gray-900) font(semibold)',
    home: 'c(gray-500) hover:c(gray-700) transition'
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

// Pagination - previous/next navigation with modern cards
const docsPagination: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'grid grid-cols(2) gap(4) mt(20) pt(12) border-t(2/gray-100)',
    minimal: 'hbox(middle) gap(auto) mt(16) pt(8) border-t(1/gray-200)',
    cards: 'grid grid-cols(2) gap(6) mt(24)'
  };
  
  return variants[variant] || variants.default;
};

// Pagination item with hover effects
const docsPaginationItem: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'group p(4) r(lg) border(1/gray-200) bg(white) hover:border(indigo-300) hover:shadow(lg) transition cursor-pointer',
    prev: 'group p(4) r(lg) border(1/gray-200) bg(white) hover:border(indigo-300) hover:shadow(lg) hover:translate-x(-2) transition cursor-pointer text-left',
    next: 'group p(4) r(lg) border(1/gray-200) bg(white) hover:border(indigo-300) hover:shadow(lg) hover:translate-x(2) transition cursor-pointer text-right',
    glass: 'group p(4) r(xl) bg(white.8) backdrop-blur(sm) ring(1/gray-200) hover:bg(white.95) hover:shadow(xl) transition cursor-pointer'
  };
  
  return variants[variant] || variants.default;
};

// Pagination label
const docsPaginationLabel: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'text(xs) uppercase tracking(wider) c(gray-500) mb(1)',
    gradient: 'text(xs) uppercase tracking(wider) c(gradient-to-r/gray-400..gray-600) font(medium) mb(1)'
  };
  
  return variants[variant] || variants.default;
};

// Pagination title
const docsPaginationTitle: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'text(base) font(semibold) c(gray-900) group-hover:c(indigo-600) transition',
    gradient: 'text(base) font(bold) c(gray-900) group-hover:c(gradient-to-r/indigo-600..purple-600) transition'
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

// Navigation link with modern hover effects
const docsNavLink: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'block px(4) py(2.5) mx(2) r(lg) text(sm) c(gray-700) transition hbox(middle) gap(2) hover:bg(gray-100) hover:c(gray-900) hover:translate-x(2)',
    active: 'block px(4) py(2.5) mx(2) r(lg) text(sm) c(white) bg(gradient-to-r/indigo-500..purple-600) font(medium) shadow(md) hbox(middle) gap(2) hover:shadow(lg) transition',
    glass: 'block px(4) py(2.5) mx(2) r(lg) text(sm) c(gray-700) backdrop-blur(sm) transition hbox(middle) gap(2) hover:bg(white.5) hover:c(gray-900) hover:shadow(sm) hover:translate-x(1)',
    compact: 'block px(3) py(2) mx(2) r(md) text(sm) c(gray-600) transition hbox(middle) gap(2) hover:bg(gray-100) hover:c(gray-900)'
  };
  
  return variants[variant] || variants.default;
};

// Navigation section header
const docsNavSection: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'px(4) py(2) mx(2) text(xs) font(semibold) uppercase tracking(wider) c(gray-500)',
    gradient: 'px(4) py(2) mx(2) text(xs) font(bold) uppercase tracking(wider) c(gradient-to-r/purple-600..indigo-600)',
    minimal: 'px(4) py(2) mx(2) text(xs) font(medium) c(gray-400)'
  };
  
  return variants[variant] || variants.default;
};

// TOC link with progress indicator
const docsTocLink: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'block py(2) pr(3) text(sm) c(gray-600) border-r(2/transparent) transition hover:c(gray-900) hover:border-r(2/gray-300)',
    active: 'block py(2) pr(3) text(sm) c(indigo-600) border-r(3/indigo-500) font(medium) bg(indigo-50.3) r(md) px(3) mr(-3)',
    progress: 'block py(2) pr(3) text(sm) c(gray-600) border-r(2/transparent) relative transition hover:c(gray-900) before:layer(left/0+center) before:w(3) before:h(3) before:r(full) before:bg(gray-300) before:transition hover:before:bg(indigo-500) hover:before:scale(1.2)',
    minimal: 'block py(1.5) text(sm) c(gray-500) hover:c(gray-900) transition'
  };
  
  return variants[variant] || variants.default;
};

// TOC header with style
const docsTocHeader: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'text(sm) font(semibold) c(gray-900) mb(4) pb(2) border-b(1/gray-200)',
    gradient: 'text(sm) font(bold) c(gradient-to-r/indigo-600..purple-600) mb(4) pb(2) border-b(2/gradient-to-r/indigo-200..purple-200)',
    minimal: 'text(xs) font(medium) uppercase tracking(wider) c(gray-500) mb(3)'
  };
  
  return variants[variant] || variants.default;
};

// Search input with modern style
const docsSearchInput: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, string> = {
    default: 'w(full) px(4) py(3) bg(white) border(1/gray-200) r(lg) text(sm) placeholder:c(gray-400) focus:outline-none focus:ring(2/indigo-500/0.2) focus:border(indigo-500) transition shadow(sm) hover:shadow(md)',
    glass: 'w(full) px(4) py(3) bg(white.8) backdrop-blur(sm) border(1/gray-200.5) r(xl) text(sm) placeholder:c(gray-400) focus:outline-none focus:ring(2/white.3) focus:border(white.5) transition shadow(md)',
    compact: 'w(full) px(3) py(2) bg(gray-50) border(1/gray-200) r(md) text(sm) placeholder:c(gray-400) focus:outline-none focus:ring(2/indigo-500/0.1) focus:border(indigo-400) transition'
  };
  
  return variants[variant] || variants.default;
};

// Export docs rules with both kebab-case and dot notation support
export const docsRules = {
  // // Main layout
  // 'docs': docsMain,
  // 'docs-nav': docsNav,
  // 'docs-main': docsContent,
  // 'docs-content': docsContent,
  // 'docs-toc': docsToc,
  // 'docs-sidebar': docsNav,
  //
  // // Content components
  // 'docs-section': docsSection,
  // 'docs-heading': docsHeading,
  // 'docs-prose': docsProse,
  //
  // // UI components
  // 'docs-card': docsCard,
  // 'docs-button': docsButton,
  // 'docs-badge': docsBadge,
  // 'docs-code': docsCode,
  // 'docs-table': docsTable,
  // 'docs-callout': docsCallout,
  //
  // // Navigation components
  // 'docs-breadcrumb': docsBreadcrumb,
  // 'docs-search': docsSearch,
  // 'docs-pagination': docsPagination,
  // 'docs-nav-link': docsNavLink,
  // 'docs-nav-section': docsNavSection,
  // 'docs-toc-link': docsTocLink,
  // 'docs-toc-header': docsTocHeader,
  // 'docs-search-input': docsSearchInput,
  // 'docs-breadcrumb-link': docsBreadcrumbLink,
  // 'docs-pagination-item': docsPaginationItem,
  // 'docs-pagination-label': docsPaginationLabel,
  // 'docs-pagination-title': docsPaginationTitle
};