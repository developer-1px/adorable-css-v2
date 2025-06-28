import type { CSSRule, RuleHandler } from '../types';
import { px, pxWithClamp } from '../../core/values/makeValue';
import { isToken, getTokenVar } from '../../design-system/tokens/index';

// Width utilities
export const w: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Special Figma-style values first
  if (args === 'fill') return { flex: '1' };  // Figma's "Fill container"
  if (args === 'hug') return { width: 'fit-content' };  // Figma's "Hug contents"
  
  // Common size values
  if (args === 'full') return { width: '100%' };
  if (args === 'auto') return { width: 'auto' };
  if (args === 'screen') return { width: '100vw' };
  
  // Check for size tokens (includes TailwindCSS scale: 3xs, 2xs, xs, sm, md, lg, xl, 2xl, etc.)
  if (isToken(args, 'size')) {
    return { width: getTokenVar('size', args) };
  }
  
  // w(300) or w(50%) with clamp support: w(sm..lg), w(300..800), w(clamp(300px,50vw,800px))
  return { width: String(pxWithClamp(args)) };
};

// Height utilities
export const h: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Special Figma-style values first
  if (args === 'fill') return { flex: '1' };  // Figma's "Fill container"
  if (args === 'hug') return { height: 'fit-content' };  // Figma's "Hug contents"
  
  // Common size values
  if (args === 'full') return { height: '100%' };
  if (args === 'auto') return { height: 'auto' };
  if (args === 'screen') return { height: '100vh' };
  
  // Check for size tokens (includes TailwindCSS scale: 3xs, 2xs, xs, sm, md, lg, xl, 2xl, etc.)
  if (isToken(args, 'size')) {
    return { height: getTokenVar('size', args) };
  }
  
  // h(200) or h(50%) with clamp support: h(sm..lg), h(200..600), h(clamp(200px,30vh,600px))
  return { height: String(pxWithClamp(args)) };
};

// Min-width utilities
export const minW: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Common size values
  if (args === 'full') return { 'min-width': '100%' };
  if (args === 'screen') return { 'min-width': '100vw' };
  if (args === 'auto') return { 'min-width': 'auto' };
  
  // Check for size tokens (includes TailwindCSS scale: 3xs, 2xs, xs, sm, md, lg, xl, 2xl, etc.)
  if (isToken(args, 'size')) {
    return { 'min-width': getTokenVar('size', args) };
  }
  
  return { 'min-width': String(pxWithClamp(args)) };
};

// Max-width utilities
export const maxW: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Common size values
  if (args === 'full') return { 'max-width': '100%' };
  if (args === 'screen') return { 'max-width': '100vw' };
  if (args === 'none') return { 'max-width': 'none' };
  if (args === 'auto') return { 'max-width': 'auto' };
  
  // Check for size tokens (includes TailwindCSS scale: 3xs, 2xs, xs, sm, md, lg, xl, 2xl, etc.)
  if (isToken(args, 'size')) {
    return { 'max-width': getTokenVar('size', args) };
  }
  
  return { 'max-width': String(pxWithClamp(args)) };
};

// Min-height utilities
export const minH: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Common size values
  if (args === 'full') return { 'min-height': '100%' };
  if (args === 'screen') return { 'min-height': '100vh' };
  if (args === 'auto') return { 'min-height': 'auto' };
  
  // Check for size tokens (includes TailwindCSS scale: 3xs, 2xs, xs, sm, md, lg, xl, 2xl, etc.)
  if (isToken(args, 'size')) {
    return { 'min-height': getTokenVar('size', args) };
  }
  
  return { 'min-height': String(pxWithClamp(args)) };
};

// Max-height utilities
export const maxH: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Common size values
  if (args === 'full') return { 'max-height': '100%' };
  if (args === 'screen') return { 'max-height': '100vh' };
  if (args === 'none') return { 'max-height': 'none' };
  if (args === 'auto') return { 'max-height': 'auto' };
  
  // Check for size tokens (includes TailwindCSS scale: 3xs, 2xs, xs, sm, md, lg, xl, 2xl, etc.)
  if (isToken(args, 'size')) {
    return { 'max-height': getTokenVar('size', args) };
  }
  
  return { 'max-height': String(pxWithClamp(args)) };
};

// Smart Container: Dimension pair handler for syntax like 64x64, 100x50, etc.
// Provides not just dimensions, but a complete smart container with layout and image optimization
export const dimensionPair: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Parse dimension pair (e.g., "64x64", "100%x50px")
  const match = args.match(/^([0-9]*\.?[0-9]+[%a-z]*)x([0-9]*\.?[0-9]+[%a-z]*)$/);
  if (!match) return {};
  
  const [, widthValue, heightValue] = match;
  
  return {
    // Core dimensions
    width: String(px(widthValue)),
    height: String(px(heightValue)),
    
    // Smart container layout
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    
    // Content protection and positioning
    overflow: 'hidden',
    position: 'relative',
    
    // Image optimization for child img elements
    '& img': {
      width: '100%',
      height: '100%',
      'object-fit': 'cover',
      'object-position': 'center'
    }
  };
};

export const sizeRules = {
  w,
  h,
  'min-w': minW,
  'max-w': maxW,
  'min-h': minH,
  'max-h': maxH,
  'dimension-pair': dimensionPair
};