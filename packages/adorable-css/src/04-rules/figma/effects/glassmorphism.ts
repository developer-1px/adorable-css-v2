import { rule2 } from '../../../01-core/ast-utils';

/**
 * Glassmorphism effects for Rule2 system
 */

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
    shadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
  },
  xl: {
    backdrop: '32px',
    bg: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.9)',
    shadow: '0 16px 48px rgba(0, 0, 0, 0.18)'
  }
};

export const glassmorphism = rule2((s) => {
  const args = s.args || s.selector?.args;
  
  // Default glassmorphism if no args
  if (!args || args.length === 0) {
    const level = glassLevels.md;
    return `backdrop-filter: blur(${level.backdrop}); background: ${level.bg}; border: 1px solid ${level.border}; box-shadow: ${level.shadow}`;
  }
  
  // Extract the first argument (level)
  const firstArg = args[0];
  const level = firstArg.image || firstArg.value || firstArg;
  const levelStr = String(level);
  
  // Use predefined level or default to md
  const glassLevel = glassLevels[levelStr as keyof typeof glassLevels] || glassLevels.md;
  
  return `backdrop-filter: blur(${glassLevel.backdrop}); background: ${glassLevel.bg}; border: 1px solid ${glassLevel.border}; box-shadow: ${glassLevel.shadow}`;
});

export const glassmorphismHandlers = {
  glassmorphism
};