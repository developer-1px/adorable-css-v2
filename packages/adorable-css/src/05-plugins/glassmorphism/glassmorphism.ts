// Glassmorphism effects for AdorableCSS v2
// Modern glass-like UI effects with backdrop blur and transparency

import type { RuleHandler, CSSRule } from '../../03-rules/types';

// Predefined glass effect levels
const glassLevels = {
  xs: {
    backdrop: '8px',
    bg: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(255, 255, 255, 0.5)',
    shadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
  },
  sm: {
    backdrop: '12px',
    bg: 'rgba(255, 255, 255, 0.4)',
    border: 'rgba(255, 255, 255, 0.6)',
    shadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
  },
  md: {
    backdrop: '16px',
    bg: 'rgba(255, 255, 255, 0.5)',
    border: 'rgba(255, 255, 255, 0.7)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
  },
  lg: {
    backdrop: '24px',
    bg: 'rgba(255, 255, 255, 0.6)',
    border: 'rgba(255, 255, 255, 0.8)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
  },
  xl: {
    backdrop: '40px',
    bg: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.9)',
    shadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
  }
};

// Dark mode glass effects
const darkGlassLevels = {
  xs: {
    backdrop: '8px',
    bg: 'rgba(0, 0, 0, 0.3)',
    border: 'rgba(255, 255, 255, 0.1)',
    shadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
  },
  sm: {
    backdrop: '12px',
    bg: 'rgba(0, 0, 0, 0.4)',
    border: 'rgba(255, 255, 255, 0.15)',
    shadow: '0 4px 30px rgba(0, 0, 0, 0.4)'
  },
  md: {
    backdrop: '16px',
    bg: 'rgba(0, 0, 0, 0.5)',
    border: 'rgba(255, 255, 255, 0.2)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
  },
  lg: {
    backdrop: '24px',
    bg: 'rgba(0, 0, 0, 0.6)',
    border: 'rgba(255, 255, 255, 0.25)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
  },
  xl: {
    backdrop: '40px',
    bg: 'rgba(0, 0, 0, 0.7)',
    border: 'rgba(255, 255, 255, 0.3)',
    shadow: '0 10px 40px rgba(0, 0, 0, 0.7)'
  }
};

// Main glassmorphism rule
export const glassmorphism: RuleHandler = (value?: string): CSSRule => {
  if (!value) value = 'md'; // Default to medium
  
  // Parse value for dark mode and level
  const isDark = value.startsWith('dark/');
  const level = isDark ? value.replace('dark/', '') : value;
  const config = isDark ? darkGlassLevels[level as keyof typeof darkGlassLevels] : glassLevels[level as keyof typeof glassLevels];
  
  if (!config) {
    // Custom values: glassmorphism(16px/0.5/white)
    const [blur = '16px', opacity = '0.5', color = 'white'] = value.split('/');
    const bgOpacity = parseFloat(opacity);
    
    return {
      'backdrop-filter': `blur(${blur})`,
      '-webkit-backdrop-filter': `blur(${blur})`,
      'background-color': color === 'white' 
        ? `rgba(255, 255, 255, ${bgOpacity})`
        : `rgba(0, 0, 0, ${bgOpacity})`,
      'border': `1px solid ${color === 'white' 
        ? `rgba(255, 255, 255, ${Math.min(bgOpacity + 0.2, 1)})`
        : `rgba(255, 255, 255, ${bgOpacity * 0.3})`}`,
      'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)'
    };
  }
  
  return {
    'backdrop-filter': `blur(${config.backdrop})`,
    '-webkit-backdrop-filter': `blur(${config.backdrop})`,
    'background-color': config.bg,
    'border': `1px solid ${config.border}`,
    'box-shadow': config.shadow
  };
};

// Frosted glass effect (lighter variant)
export const frosted: RuleHandler = (value?: string): CSSRule => {
  const level = value || 'md';
  return {
    ...glassmorphism(level),
    'background-color': 'rgba(255, 255, 255, 0.95)',
    'backdrop-filter': 'blur(20px) saturate(180%)',
    '-webkit-backdrop-filter': 'blur(20px) saturate(180%)'
  };
};

// Acrylic effect (Microsoft Fluent Design inspired)
export const acrylic: RuleHandler = (value?: string): CSSRule => {
  const isDark = value === 'dark';
  
  return {
    'backdrop-filter': 'blur(30px) saturate(125%)',
    '-webkit-backdrop-filter': 'blur(30px) saturate(125%)',
    'background-color': isDark 
      ? 'rgba(32, 32, 32, 0.8)' 
      : 'rgba(252, 252, 252, 0.85)',
    'background-image': `linear-gradient(0deg, 
      ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'} 0%, 
      transparent 100%)`,
    'border': `1px solid ${isDark 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.05)'}`,
    'box-shadow': '0 2px 12px rgba(0, 0, 0, 0.08)'
  };
};

// Neumorphic glass (soft UI with glass)
export const neuGlass: RuleHandler = (value?: string): CSSRule => {
  const isDark = value === 'dark';
  const bg = isDark ? 'rgba(32, 32, 32, 0.6)' : 'rgba(255, 255, 255, 0.6)';
  
  return {
    'backdrop-filter': 'blur(10px)',
    '-webkit-backdrop-filter': 'blur(10px)',
    'background-color': bg,
    'border': `1px solid ${isDark 
      ? 'rgba(255, 255, 255, 0.1)' 
      : 'rgba(255, 255, 255, 0.7)'}`,
    'box-shadow': isDark
      ? 'inset 2px 2px 5px rgba(0, 0, 0, 0.5), inset -2px -2px 5px rgba(255, 255, 255, 0.05)'
      : 'inset 2px 2px 5px rgba(255, 255, 255, 0.8), inset -2px -2px 5px rgba(0, 0, 0, 0.05)'
  };
};

// Glassmorphism 03-rules export
export const glassmorphismRules = {
  glassmorphism,
  glass: glassmorphism, // Alias
  frosted,
  acrylic,
  'neu-glass': neuGlass
};

// Glassmorphism plugin export
export const glassmorphismPlugin = {
  rules: glassmorphismRules,
  
  // Utility to check browser support
  checkSupport: () => {
    if (typeof window === 'undefined') return false;
    return CSS.supports('backdrop-filter', 'blur(10px)') || 
           CSS.supports('-webkit-backdrop-filter', 'blur(10px)');
  }
};

export default glassmorphismPlugin;