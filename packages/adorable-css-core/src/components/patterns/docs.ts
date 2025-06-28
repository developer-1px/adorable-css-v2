import type { StringRuleHandler, CSSRule } from '../../rules/types';

// Modern technical documentation components

// Page container - Modern tech blog style
export const docsPageString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'min-h(screen) bg(gray-50)',
      {
        'font-family': '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        'line-height': '1.6',
        'color': '#1f2937',
        'font-feature-settings': '"rlig" 1, "calt" 1, "ss01" 1',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        'text-rendering': 'optimizeLegibility'
      }
    ]
  };
  
  return variants[variant] || variants.default;
};

// Hero section - Modern tech blog hero
export const docsHeroString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'py(24) px(8) bg(white) border-b(1/gray-200)',
      {
        'max-width': '1200px',
        'margin': '0 auto',
        'background': 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        'border-bottom': '1px solid #e5e7eb',
        'box-shadow': '0 1px 3px 0 rgb(0 0 0 / 0.1)'
      }
    ]
  };
  
  return variants[variant] || variants.default;
};

// Content section - Modern blog section style
export const docsSectionString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'max-w(6xl) mx(auto) px(8) py(16) bg(white) my(8) r(xl) shadow(sm)',
      {
        'width': '100%',
        'border': '1px solid #f3f4f6'
      }
    ]
  };
  
  return variants[variant] || variants.default;
};

// Section title - Modern tech blog heading
export const docsSectionTitleString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'text(4xl) bold c(gray-900) mb(16) pb(8)',
      {
        'font-weight': '800',
        'letter-spacing': '-0.04em',
        'line-height': '1.1',
        'position': 'relative',
        'background': 'linear-gradient(135deg, #1f2937 0%, #4b5563 100%)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        'background-clip': 'text',
        
        '&::after': {
          'content': '""',
          'position': 'absolute',
          'bottom': '0',
          'left': '0',
          'width': '60px',
          'height': '4px',
          'background': 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
          'border-radius': '2px'
        }
      }
    ]
  };
  
  return variants[variant] || variants.default;
};

// Utility item - Better spacing and code presentation
export const docsItemString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'mb(8) overflow(hidden) r(lg) border(1/gray-200) bg(white)',
      {
        'box-shadow': '0 1px 3px 0 rgb(0 0 0 / 0.1)'
      }
    ]
  };
  
  return variants[variant] || variants.default;
};

// Table for rules documentation - Modern tech blog table
export const docsTableString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'w(full) border(1/gray-200) r(xl) overflow(hidden) bg(white) shadow(sm)',
      {
        'width': '100%',
        'border-collapse': 'collapse',
        'table-layout': 'fixed',
        'background': 'linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)',
        'border': '1px solid #e5e7eb',
        'box-shadow': '0 4px 6px -1px rgb(0 0 0 / 0.1)'
      }
    ]
  };
  
  return variants[variant] || variants.default;
};

// Table header - Modern tech blog table header
export const docsTableHeaderString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'px(8) py(5) text(left) text(sm) bold c(gray-800)',
      {
        'font-weight': '700',
        'text-transform': 'uppercase',
        'letter-spacing': '0.1em',
        'background': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        'border-bottom': '2px solid #cbd5e1',
        'position': 'relative',
        
        '&::after': {
          'content': '""',
          'position': 'absolute',
          'bottom': '0',
          'left': '0',
          'right': '0',
          'height': '1px',
          'background': 'linear-gradient(90deg, transparent 0%, #3b82f6 50%, transparent 100%)'
        }
      }
    ]
  };
  
  return variants[variant] || variants.default;
};

// Table row - Modern tech blog table row with enhanced hover
export const docsTableRowString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'border-b(1/gray-100)',
      {
        'transition': 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'position': 'relative',
        
        '&:hover': {
          'background': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          'transform': 'translateY(-1px)',
          'box-shadow': '0 4px 12px rgb(0 0 0 / 0.05)'
        },
        
        '&:last-child': {
          'border-bottom': 'none'
        },
        
        '&::before': {
          'content': '""',
          'position': 'absolute',
          'left': '0',
          'top': '0',
          'bottom': '0',
          'width': '3px',
          'background': 'linear-gradient(180deg, #3b82f6, #1d4ed8)',
          'opacity': '0',
          'transition': 'opacity 0.2s ease'
        },
        
        '&:hover::before': {
          'opacity': '1'
        }
      }
    ]
  };
  
  return variants[variant] || variants.default;
};

// Class name cell
export const docsTableCellClassString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'w(40%) border-r(1/gray-200) p(0)',
      {
        'vertical-align': 'top'
      }
    ]
  };
  
  return variants[variant] || variants.default;
};

// CSS output cell
export const docsTableCellCSSString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'w(60%) p(4)',
      {
        'vertical-align': 'top'
      }
    ]
  };
  
  return variants[variant] || variants.default;
};

// Navigation sidebar - Modern tech blog nav
export const docsNavString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'w(320px) flex(0_0_auto) border-r(1/gray-200) bg(white) h(100vh) overflow-y(auto)',
      {
        'position': 'sticky',
        'top': '0',
        'background': 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
        'border-right': '1px solid #e5e7eb',
        'box-shadow': 'inset -1px 0 0 0 #f3f4f6'
      }
    ]
  };
  
  return variants[variant] || variants.default;
};

// Main content area
export const docsMainString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'flex(1) max-w(4xl) px(6)',
      {
        'min-width': '0'
      }
    ]
  };
  
  return variants[variant] || variants.default;
};

// Table of Contents (right sidebar) - Modern tech blog TOC
export const docsTocString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'w(280px) flex(0_0_auto) border-l(1/gray-200) bg(white)',
      {
        'position': 'sticky',
        'top': '0',
        'height': '100vh',
        'overflow-y': 'auto',
        'background': 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
        'border-left': '1px solid #e5e7eb',
        'box-shadow': 'inset 1px 0 0 0 #f3f4f6'
      }
    ]
  };
  
  return variants[variant] || variants.default;
};

// Code block with syntax highlighting feel
export const docsCodeString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'relative rounded(md) bg(muted) px(3) py(2) font(mono) text(sm)',
      {
        'position': 'relative',
        'border-radius': '0.375rem',
        'background': 'hsl(var(--muted))',
        'padding': '0.5rem 0.75rem',
        'font-family': 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        'font-size': '0.875rem',
        'font-weight': '600',
        'color': 'hsl(var(--foreground))'
      }
    ],
    
    inline: [
      'relative rounded(sm) bg(muted) px(1.5) py(0.5) font(mono) text(sm)',
      {
        'position': 'relative',
        'border-radius': '0.25rem',
        'background': 'hsl(var(--muted))',
        'padding': '0.125rem 0.375rem',
        'font-family': 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        'font-size': '0.875rem',
        'font-weight': '600',
        'color': 'hsl(var(--foreground))'
      }
    ],
    
    block: [
      'relative overflow-x(auto) rounded(lg) border bg(muted/50) p(4) font(mono) text(sm)',
      {
        'position': 'relative',
        'overflow-x': 'auto',
        'border-radius': '0.5rem',
        'border': '1px solid hsl(var(--border))',
        'background': 'hsl(var(--muted) / 0.5)',
        'padding': '1rem',
        'font-family': 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        'font-size': '0.875rem',
        'line-height': '1.7',
        'color': 'hsl(var(--foreground))'
      }
    ]
  };
  
  return variants[variant] || variants.default;
};

// Card component for info boxes - extends basic card
export const docsCardString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'card p(xl)',
      {}
    ],
    
    warning: [
      'card bg(amber-50) border(1/amber-200) c(amber-900) p(xl)',
      {}
    ],
    
    success: [
      'card bg(green-50) border(1/green-200) c(green-900) p(xl)', 
      {}
    ],
    
    info: [
      'card bg(blue-50) border(1/blue-200) c(blue-900) p(xl)',
      {}
    ]
  };
  
  return variants[variant] || variants.default;
};

// Button for interactive elements - extends basic button
export const docsButtonString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const variant = args || 'default';
  
  const variants: Record<string, (string | CSSRule)[]> = {
    default: [
      'button',
      {}
    ],
    
    secondary: [
      'button(secondary)',
      {}
    ],
    
    ghost: [
      'button(ghost)',
      {}
    ]
  };
  
  return variants[variant] || variants.default;
};

// Export string-based rules
export const docsRules = {
  'docs-page': docsPageString,
  'docs-hero': docsHeroString,
  'docs-section': docsSectionString,
  'docs-section-title': docsSectionTitleString,
  'docs-item': docsItemString,
  'docs-table': docsTableString,
  'docs-table-header': docsTableHeaderString,
  'docs-table-row': docsTableRowString,
  'docs-table-cell-class': docsTableCellClassString,
  'docs-table-cell-css': docsTableCellCSSString,
  'docs-nav': docsNavString,
  'docs-main': docsMainString,
  'docs-toc': docsTocString,
  'docs-code': docsCodeString,
  'docs-card': docsCardString,
  'docs-button': docsButtonString
};