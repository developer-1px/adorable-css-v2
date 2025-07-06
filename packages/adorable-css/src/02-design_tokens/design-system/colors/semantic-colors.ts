import type { RuleHandler, CSSRule } from '../../../03-rules/types';

/**
 * Semantic color utilities
 * Using primary/neutral pattern for consistent design
 */

// Text colors
export const textPrimary: RuleHandler = (): CSSRule => ({ color: 'var(--text-primary)' });
export const textSecondary: RuleHandler = (): CSSRule => ({ color: 'var(--text-secondary)' });
export const textSubtle: RuleHandler = (): CSSRule => ({ color: 'var(--text-subtle)' });
export const textAccent: RuleHandler = (): CSSRule => ({ color: 'var(--text-accent)' });
export const textInverse: RuleHandler = (): CSSRule => ({ color: 'var(--text-inverse)' });

// Background colors
export const bgSurface: RuleHandler = (): CSSRule => ({ 'background-color': 'var(--surface-base)' });
export const bgSurfaceSubtle: RuleHandler = (): CSSRule => ({ 'background-color': 'var(--surface-subtle)' });
export const bgSurfaceAccent: RuleHandler = (): CSSRule => ({ 'background-color': 'var(--surface-accent)' });
export const bgSurfaceInverse: RuleHandler = (): CSSRule => ({ 'background-color': 'var(--surface-inverse)' });

// Primary color utilities
export const primary: RuleHandler = (shade?: string): CSSRule => {
  const validShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
  const s = shade && validShades.includes(shade) ? shade : '600';
  return { color: `var(--primary-${s})` };
};

export const bgPrimary: RuleHandler = (shade?: string): CSSRule => {
  const validShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
  const s = shade && validShades.includes(shade) ? shade : '600';
  return { 'background-color': `var(--primary-${s})` };
};

export const borderPrimary: RuleHandler = (shade?: string): CSSRule => {
  const validShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
  const s = shade && validShades.includes(shade) ? shade : '200';
  return { 'border-color': `var(--primary-${s})` };
};

// Neutral color utilities
export const neutral: RuleHandler = (shade?: string): CSSRule => {
  const validShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
  const s = shade && validShades.includes(shade) ? shade : '600';
  return { color: `var(--neutral-${s})` };
};

export const bgNeutral: RuleHandler = (shade?: string): CSSRule => {
  const validShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
  const s = shade && validShades.includes(shade) ? shade : '100';
  return { 'background-color': `var(--neutral-${s})` };
};

export const borderNeutral: RuleHandler = (shade?: string): CSSRule => {
  const validShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
  const s = shade && validShades.includes(shade) ? shade : '200';
  return { 'border-color': `var(--neutral-${s})` };
};

// Border utilities
export const borderDefault: RuleHandler = (): CSSRule => ({ 'border-color': 'var(--border-default)' });
export const borderAccent: RuleHandler = (): CSSRule => ({ 'border-color': 'var(--border-accent)' });
export const borderSubtle: RuleHandler = (): CSSRule => ({ 'border-color': 'var(--border-subtle)' });

// Semantic state colors
export const success: RuleHandler = (): CSSRule => ({ color: 'var(--success)' });
export const error: RuleHandler = (): CSSRule => ({ color: 'var(--error)' });
export const warning: RuleHandler = (): CSSRule => ({ color: 'var(--warning)' });
export const info: RuleHandler = (): CSSRule => ({ color: 'var(--info)' });

export const bgSuccess: RuleHandler = (): CSSRule => ({ 'background-color': 'var(--success)' });
export const bgError: RuleHandler = (): CSSRule => ({ 'background-color': 'var(--error)' });
export const bgWarning: RuleHandler = (): CSSRule => ({ 'background-color': 'var(--warning)' });
export const bgInfo: RuleHandler = (): CSSRule => ({ 'background-color': 'var(--info)' });

// Export all 03-rules
export const semanticColorRules = {
  // Text
  'text-primary': textPrimary,
  'text-secondary': textSecondary,
  'text-subtle': textSubtle,
  'text-accent': textAccent,
  'text-inverse': textInverse,
  
  // Background
  'bg-surface': bgSurface,
  'bg-surface-subtle': bgSurfaceSubtle,
  'bg-surface-accent': bgSurfaceAccent,
  'bg-surface-inverse': bgSurfaceInverse,
  
  // Primary colors
  'primary': primary,
  'bg-primary': bgPrimary,
  'border-primary': borderPrimary,
  
  // Neutral colors
  'neutral': neutral,
  'bg-neutral': bgNeutral,
  'border-neutral': borderNeutral,
  
  // Borders
  'border-default': borderDefault,
  'border-accent': borderAccent,
  'border-subtle': borderSubtle,
  
  // States
  'success': success,
  'error': error,
  'warning': warning,
  'info': info,
  'bg-success': bgSuccess,
  'bg-error': bgError,
  'bg-warning': bgWarning,
  'bg-info': bgInfo
};