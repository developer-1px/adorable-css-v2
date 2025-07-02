import type { CSSRule, RuleHandler } from '../types';

const ms = (v: string) => !isNaN(Number(v)) ? `${v}ms` : v;

const presets: Record<string, string> = {
  'fade-in': 'fade-in var(--duration-500) var(--ease-in-out)',
  'slide-up': 'slide-up var(--duration-500) var(--ease-in-out)',
  'bounce': 'bounce var(--duration-500) var(--ease-in-out)',
  'spin': 'spin var(--duration-1000) linear infinite'
};

export const animation: RuleHandler = (v?: string): CSSRule => {
  if (!v) return {};
  if (v === 'none') return { animation: 'none' };
  if (presets[v]) return { animation: presets[v] };
  
  // Handle custom animation with duration: animation(fade-in/300)
  if (v.includes('/')) {
    const [name, duration] = v.split('/');
    if (presets[name]) {
      const preset = presets[name];
      return { animation: preset.replace(/var\(--duration-\d+\)/, ms(duration)) };
    }
  }
  
  return { animation: v };
};

export const animate = animation; // Alias for compatibility

export const delay: RuleHandler = (v?: string): CSSRule => v ? { 'animation-delay': ms(v) } : {};
export const duration: RuleHandler = (v?: string): CSSRule => v ? { 'animation-duration': ms(v) } : {};

export const animationRules = { animation, animate, delay, duration };