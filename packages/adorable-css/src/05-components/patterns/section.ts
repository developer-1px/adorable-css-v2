// Type definitions
type CSSRule = Record<string, string | Record<string, any>>;
import type { StringRuleHandler } from '../defineComponent';

// Section utilities for consistent spacing and layout

// String-based section 04-components (new approach)
export const sectionString: StringRuleHandler = (args?: string): string => {
  if (!args) {
    // Default section - medium width, centered
    return 'max-w(768px) mx(auto) px(lg)';
  }
  
  const sectionVariants: Record<string, string> = {
    // Content width variants (Medium.com style)
    text: 'max-w(620px) mx(auto) px(lg)',        // Text reading optimized
    narrow: 'max-w(620px) mx(auto) px(lg)',      // Alias for text
    medium: 'max-w(768px) mx(auto) px(lg)',      // Default content
    wide: 'max-w(1024px) mx(auto) px(lg)',       // Wide content
    breakout: 'max-w(1200px) mx(auto) px(lg)',   // Slightly breaking out
    full: 'w(full) px(lg)',                      // Full width
    canvas: 'w(full)',                           // No padding, full canvas
    
    // Legacy variants (maintain backwards compatibility)
    large: 'relative w(100%) py(clamp-section-large)',
    compact: 'relative w(100%) py(clamp-section-compact)', 
    feature: 'relative w(100%) pt(clamp-feature-top) pb(clamp-feature-bottom)',
    flush: 'relative w(100%) p(0)',
    gallery: 'relative w(100%) py(clamp-section-default) clip'
  };
  
  return sectionVariants[args] || 'max-w(768px) mx(auto) px(lg)';
};

export const containString: StringRuleHandler = (args?: string): string => {
  const variant = args || 'default';
  
  const containVariants: Record<string, string> = {
    narrow: 'w(100%) max-w(48rem) mx(auto) px(responsive-padding)',
    wide: 'w(100%) max-w(80rem) mx(auto) px(responsive-padding)',
    full: 'w(100%) max-w(96rem) mx(auto) px(responsive-padding)',
    default: 'w(100%) max-w(64rem) mx(auto) px(responsive-padding)'
  };
  
  return containVariants[variant] || containVariants.default;
};

export const contentString: StringRuleHandler = (args?: string): string => {
  const variant = args || 'default';
  
  const contentVariants: Record<string, string> = {
    centered: 'vbox items(center) text(center) gap(xl)',
    hero: 'vbox items(center) text(center) gap(2xl) max-w(48rem) mx(auto)',
    default: 'vbox gap(lg)'
  };
  
  return contentVariants[variant] || contentVariants.default;
};

export const stackString: StringRuleHandler = (args?: string): string => {
  const gap = args || 'lg';
  return `vbox gap(${gap}) w(100%)`;
};

export const flowString: StringRuleHandler = (args?: string): string => {
  const variant = args || 'default';
  
  const flowVariants: Record<string, string> = {
    narrow: 'leading(1.7) c(gray-700) max-w(65ch)',
    wide: 'leading(1.7) c(gray-700) max-w(80ch)',
    default: 'leading(1.7) c(gray-700) max-w(70ch)'
  };
  
  return flowVariants[variant] || flowVariants.default;
};

export const rhythmString: StringRuleHandler = (args?: string): string => {
  const variant = args || 'default';
  
  const rhythmVariants: Record<string, string> = {
    tight: 'vbox gap(2xl)',
    loose: 'vbox gap(5xl)',
    varied: 'vbox gap(3xl)',
    default: 'vbox gap(4xl)'
  };
  
  return rhythmVariants[variant] || rhythmVariants.default;
};

export const leadString: StringRuleHandler = (): string => {
  return 'text(lg) leading(1.7) c(gray-600) max-w(65ch) mx(auto)';
};

// Export string-based 03-rules
export const sectionRules = {
  'section': sectionString,
  'contain': containString,
  'content': contentString,
  'stack': stackString,
  'flow': flowString,
  'rhythm': rhythmString,
  'lead': leadString
};