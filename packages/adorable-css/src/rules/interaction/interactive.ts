import type { CSSRule, RuleHandler } from '../types';

/**
 * Interactive utility for comprehensive hover, focus, and active states
 * Provides 5 levels of interaction from subtle to dramatic
 */
export const interactive: RuleHandler = (level?: string): CSSRule => {
  if (!level) return {};
  
  const levelNum = parseInt(level);
  if (isNaN(levelNum) || levelNum < 1 || levelNum > 5) return {};

  
  switch (levelNum) {
    case 1:
      // Subtle interaction - minimal feedback
      return {
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
          opacity: '0.8',
        },
        '&:active': {
          opacity: '0.7',
        },
        '&:focus-visible': {
          outline: '2px solid var(--primary, oklch(62.7% 0.233 303.9))',
          'outline-offset': '2px',
        }
      };
      
    case 2:
      // Light interaction - gentle transform
      return {
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-1px)',
          'box-shadow': 'var(--shadow-sm)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
        '&:focus-visible': {
          outline: '2px solid var(--primary, oklch(62.7% 0.233 303.9))',
          'outline-offset': '2px',
        }
      };
      
    case 3:
      // Medium interaction - noticeable feedback
      return {
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-2px) scale(1.02)',
          'box-shadow': 'var(--shadow-md)',
        },
        '&:active': {
          transform: 'translateY(0) scale(0.98)',
        },
        '&:focus-visible': {
          outline: '2px solid var(--primary, oklch(62.7% 0.233 303.9))',
          'outline-offset': '2px',
          'box-shadow': '0 0 0 4px var(--primary-100, oklch(92.7% 0.05 303.9))',
        }
      };
      
    case 4:
      // Strong interaction - prominent feedback
      return {
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        'transform-style': 'preserve-3d',
        '&:hover': {
          transform: 'translateY(-4px) scale(1.05)',
          'box-shadow': 'var(--shadow-lg)',
        },
        '&:active': {
          transform: 'translateY(-1px) scale(0.95)',
          'box-shadow': 'var(--shadow-sm)',
        },
        '&:focus-visible': {
          outline: '3px solid var(--primary, oklch(62.7% 0.233 303.9))',
          'outline-offset': '2px',
          'box-shadow': '0 0 0 6px var(--primary-100, oklch(92.7% 0.05 303.9))',
        }
      };
      
    case 5:
      // Dramatic interaction - maximum feedback
      return {
        transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        cursor: 'pointer',
        'transform-style': 'preserve-3d',
        '&:hover': {
          transform: 'translateY(-6px) scale(1.08) rotateX(-5deg)',
          'box-shadow': '0 20px 40px -12px rgba(0, 0, 0, 0.25)',
          'filter': 'brightness(1.1)',
        },
        '&:active': {
          transform: 'translateY(-2px) scale(0.92)',
          'box-shadow': 'var(--shadow-sm)',
          'filter': 'brightness(0.95)',
        },
        '&:focus-visible': {
          outline: '3px solid var(--primary, oklch(62.7% 0.233 303.9))',
          'outline-offset': '3px',
          'box-shadow': '0 0 0 8px var(--primary-100, oklch(92.7% 0.05 303.9))',
        }
      };
      
    default:
      return {};
  }
};

// Additional interaction utilities
export const hoverable: RuleHandler = (): CSSRule => ({
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    opacity: '0.8',
  }
});

export const clickable: RuleHandler = (): CSSRule => ({
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  'user-select': 'none',
  '&:hover': {
    opacity: '0.8',
  },
  '&:active': {
    transform: 'scale(0.95)',
  }
});

export const focusable: RuleHandler = (): CSSRule => ({
  '&:focus-visible': {
    outline: '2px solid var(--primary, oklch(62.7% 0.233 303.9))',
    'outline-offset': '2px',
  }
});

export const pressable: RuleHandler = (): CSSRule => ({
  transition: 'all 0.1s ease',
  cursor: 'pointer',
  'user-select': 'none',
  '&:active': {
    transform: 'scale(0.95)',
  }
});

export const interactionRules = {
  interactive,
  hoverable,
  clickable,
  focusable,
  pressable,
};