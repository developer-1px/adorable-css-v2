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
  
  // Check for container tokens first (for width utilities)
  if (isToken(args, 'container')) {
    return { width: getTokenVar('container', args) };
  }
  
  // Fallback to size tokens for backward compatibility
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
  
  // Check for container tokens first (for height utilities)
  if (isToken(args, 'container')) {
    return { height: getTokenVar('container', args) };
  }
  
  // Fallback to size tokens for backward compatibility
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
  
  // Check for container tokens first
  if (isToken(args, 'container')) {
    return { 'min-width': getTokenVar('container', args) };
  }
  
  // Fallback to size tokens for backward compatibility
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
  
  // Check for container tokens first
  if (isToken(args, 'container')) {
    return { 'max-width': getTokenVar('container', args) };
  }
  
  // Fallback to size tokens for backward compatibility
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
  
  // Check for container tokens first
  if (isToken(args, 'container')) {
    return { 'min-height': getTokenVar('container', args) };
  }
  
  // Fallback to size tokens for backward compatibility
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
  
  // Check for container tokens first
  if (isToken(args, 'container')) {
    return { 'max-height': getTokenVar('container', args) };
  }
  
  // Fallback to size tokens for backward compatibility
  if (isToken(args, 'size')) {
    return { 'max-height': getTokenVar('size', args) };
  }
  
  return { 'max-height': String(pxWithClamp(args)) };
};

// Unified size utility - supports multiple patterns
export const size: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Pattern 1: Aspect ratio (16:9, 4:3, 1:1, etc.)
  const ratioMatch = args.match(/^(\d+):(\d+)$/);
  if (ratioMatch) {
    const [, width, height] = ratioMatch;
    const aspectRatio = `${width} / ${height}`;
    return {
      'aspect-ratio': aspectRatio,
      width: '100%' // Let aspect-ratio control the height
    };
  }
  
  // Pattern 2: Explicit dimensions (320x200, 100x50, etc.)
  const dimensionMatch = args.match(/^([0-9]*\.?[0-9]+[%a-z]*)x([0-9]*\.?[0-9]+[%a-z]*)$/);
  if (dimensionMatch) {
    const [, widthValue, heightValue] = dimensionMatch;
    return {
      width: String(px(widthValue)),
      height: String(px(heightValue))
    };
  }
  
  // Pattern 3: Single value (apply to both width and height)
  // size(32) -> width: 32px; height: 32px;
  // size(sm) -> width: var(--size-sm); height: var(--size-sm);
  
  // Handle special keywords first (before token check)
  if (args === 'full') {
    return { width: '100%', height: '100%' };
  }
  if (args === 'auto') {
    return { width: 'auto', height: 'auto' };
  }
  if (args === 'fill') {
    return { width: '100%', height: '100%' };
  }
  if (args === 'hug') {
    return { width: 'fit-content', height: 'fit-content' };
  }
  if (args === 'text') {
    return { width: 'max-content', height: 'max-content' };
  }
  
  // Check for size tokens
  if (isToken(args, 'size')) {
    const tokenValue = getTokenVar('size', args);
    return {
      width: tokenValue,
      height: tokenValue
    };
  }
  
  // Default: treat as pixel value for both dimensions
  const pixelValue = String(pxWithClamp(args));
  return {
    width: pixelValue,
    height: pixelValue
  };
};

export const sizeRules = {
  w,
  h,
  'min-w': minW,
  'max-w': maxW,
  'min-h': minH,
  'max-h': maxH,
  size,
};