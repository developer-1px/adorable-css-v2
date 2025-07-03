// Comprehensive Semantic Design System inspired by Practical UI
// This provides a complete, consistent design language

export interface SemanticDesignSystem {
  // Color System
  colors: {
    // Brand Colors
    brand: {
      primary: string;
      secondary: string;
      accent: string;
    };
    
    // UI Colors
    ui: {
      background: string;
      surface: string;
      surfaceAlt: string;
      border: string;
      borderHover: string;
      divider: string;
    };
    
    // Text Colors
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      disabled: string;
      inverse: string;
      link: string;
      linkHover: string;
    };
    
    // State Colors
    state: {
      success: string;
      successLight: string;
      warning: string;
      warningLight: string;
      error: string;
      errorLight: string;
      info: string;
      infoLight: string;
    };
    
    // Interactive Colors
    interactive: {
      hover: string;
      active: string;
      focus: string;
      selected: string;
    };
  };
  
  // Typography System
  typography: {
    // Font Families
    fontFamily: {
      sans: string;
      mono: string;
      display: string;
    };
    
    // Type Scale
    scale: {
      xs: { size: string; lineHeight: string; letterSpacing: string };
      sm: { size: string; lineHeight: string; letterSpacing: string };
      base: { size: string; lineHeight: string; letterSpacing: string };
      lg: { size: string; lineHeight: string; letterSpacing: string };
      xl: { size: string; lineHeight: string; letterSpacing: string };
      '2xl': { size: string; lineHeight: string; letterSpacing: string };
      '3xl': { size: string; lineHeight: string; letterSpacing: string };
      '4xl': { size: string; lineHeight: string; letterSpacing: string };
      '5xl': { size: string; lineHeight: string; letterSpacing: string };
      '6xl': { size: string; lineHeight: string; letterSpacing: string };
    };
    
    // Font Weights
    weight: {
      thin: number;
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
      black: number;
    };
  };
  
  // Spacing System
  spacing: {
    xs: string;    // 4px
    sm: string;    // 8px
    md: string;    // 12px
    lg: string;    // 16px
    xl: string;    // 24px
    '2xl': string; // 32px
    '3xl': string; // 48px
    '4xl': string; // 64px
    '5xl': string; // 80px
    '6xl': string; // 96px
  };
  
  // Border Radius
  radius: {
    none: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
  };
  
  // Shadows
  shadow: {
    none: string;
    xs: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
  };
  
  // Transitions
  transition: {
    duration: {
      fast: string;
      base: string;
      slow: string;
      slower: string;
    };
    easing: {
      linear: string;
      in: string;
      out: string;
      inOut: string;
      bounce: string;
    };
  };
  
  // Breakpoints
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  
  // Z-index Scale
  zIndex: {
    base: number;
    dropdown: number;
    sticky: number;
    banner: number;
    overlay: number;
    modal: number;
    popover: number;
    toast: number;
    tooltip: number;
  };
}

// Default Semantic Design System
export const defaultSemanticSystem: SemanticDesignSystem = {
  colors: {
    brand: {
      primary: 'purple-500',
      secondary: 'pink-500',
      accent: 'blue-500',
    },
    ui: {
      background: 'white',
      surface: 'gray-50',
      surfaceAlt: 'gray-100',
      border: 'gray-200',
      borderHover: 'gray-300',
      divider: 'gray-100',
    },
    text: {
      primary: 'gray-900',
      secondary: 'gray-700',
      tertiary: 'gray-500',
      disabled: 'gray-400',
      inverse: 'white',
      link: 'blue-600',
      linkHover: 'blue-700',
    },
    state: {
      success: 'green-600',
      successLight: 'green-50',
      warning: 'amber-600',
      warningLight: 'amber-50',
      error: 'red-600',
      errorLight: 'red-50',
      info: 'blue-600',
      infoLight: 'blue-50',
    },
    interactive: {
      hover: 'gray-50',
      active: 'gray-100',
      focus: 'purple-500',
      selected: 'purple-50',
    },
  },
  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
      display: 'Inter, system-ui, -apple-system, sans-serif',
    },
    scale: {
      xs: { size: '0.75rem', lineHeight: '1rem', letterSpacing: '0.025em' },
      sm: { size: '0.875rem', lineHeight: '1.25rem', letterSpacing: '0.025em' },
      base: { size: '1rem', lineHeight: '1.5rem', letterSpacing: '0' },
      lg: { size: '1.125rem', lineHeight: '1.75rem', letterSpacing: '-0.025em' },
      xl: { size: '1.25rem', lineHeight: '1.75rem', letterSpacing: '-0.025em' },
      '2xl': { size: '1.5rem', lineHeight: '2rem', letterSpacing: '-0.025em' },
      '3xl': { size: '1.875rem', lineHeight: '2.25rem', letterSpacing: '-0.025em' },
      '4xl': { size: '2.25rem', lineHeight: '2.5rem', letterSpacing: '-0.05em' },
      '5xl': { size: '3rem', lineHeight: '1', letterSpacing: '-0.05em' },
      '6xl': { size: '3.75rem', lineHeight: '1', letterSpacing: '-0.05em' },
    },
    weight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '3rem',    // 48px
    '4xl': '4rem',    // 64px
    '5xl': '5rem',    // 80px
    '6xl': '6rem',    // 96px
  },
  radius: {
    none: '0',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  shadow: {
    none: 'none',
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    base: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '2xl': '0 35px 60px -15px rgb(0 0 0 / 0.3)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  transition: {
    duration: {
      fast: '150ms',
      base: '250ms',
      slow: '350ms',
      slower: '500ms',
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1600,
    tooltip: 1700,
  },
};

// Helper function to generate CSS variables from the semantic system
export function generateSemanticCSS(system: SemanticDesignSystem = defaultSemanticSystem): string {
  const cssVars: string[] = [];
  
  // Colors
  Object.entries(system.colors).forEach(([category, values]) => {
    Object.entries(values).forEach(([key, value]) => {
      cssVars.push(`  --${category}-${key}: var(--${value});`);
    });
  });
  
  // Typography
  cssVars.push('\n  /* Typography */');
  Object.entries(system.typography.scale).forEach(([key, value]) => {
    cssVars.push(`  --text-${key}: ${value.size};`);
    cssVars.push(`  --leading-${key}: ${value.lineHeight};`);
    cssVars.push(`  --tracking-${key}: ${value.letterSpacing};`);
  });
  
  Object.entries(system.typography.weight).forEach(([key, value]) => {
    cssVars.push(`  --weight-${key}: ${value};`);
  });
  
  // Spacing
  cssVars.push('\n  /* Spacing */');
  Object.entries(system.spacing).forEach(([key, value]) => {
    cssVars.push(`  --space-${key}: ${value};`);
  });
  
  // Border Radius
  cssVars.push('\n  /* Border Radius */');
  Object.entries(system.radius).forEach(([key, value]) => {
    cssVars.push(`  --radius-${key}: ${value};`);
  });
  
  // Shadows
  cssVars.push('\n  /* Shadows */');
  Object.entries(system.shadow).forEach(([key, value]) => {
    cssVars.push(`  --shadow-${key}: ${value};`);
  });
  
  // Transitions
  cssVars.push('\n  /* Transitions */');
  Object.entries(system.transition.duration).forEach(([key, value]) => {
    cssVars.push(`  --duration-${key}: ${value};`);
  });
  
  Object.entries(system.transition.easing).forEach(([key, value]) => {
    cssVars.push(`  --ease-${key}: ${value};`);
  });
  
  // Z-index
  cssVars.push('\n  /* Z-index */');
  Object.entries(system.zIndex).forEach(([key, value]) => {
    cssVars.push(`  --z-${key}: ${value};`);
  });
  
  return cssVars.join('\n');
}

// Export semantic classes for common patterns
export const semanticClasses = {
  // Text styles
  'text-primary': 'c(text-primary)',
  'text-secondary': 'c(text-secondary)', 
  'text-muted': 'c(text-tertiary)',
  'text-disabled': 'c(text-disabled)',
  
  // Background styles
  'bg-surface': 'bg(ui-surface)',
  'bg-surface-alt': 'bg(ui-surfaceAlt)',
  
  // Interactive states
  'hover-bg': 'hover:bg(interactive-hover)',
  'active-bg': 'active:bg(interactive-active)',
  'focus-ring': 'focus:ring(2/4/interactive-focus)',
  
  // Common patterns
  'card': 'bg(white) r(lg) shadow(sm) border(1/ui-border)',
  'card-hover': 'hover:shadow(md) hover:border(ui-borderHover)',
  'button-primary': 'bg(brand-primary) c(white) hover:bg(brand-primary-600)',
  'button-secondary': 'bg(ui-surface) c(text-primary) hover:bg(ui-surfaceAlt)',
  'input': 'border(1/ui-border) focus:border(brand-primary) focus:ring(2/4/brand-primary.2)',
};