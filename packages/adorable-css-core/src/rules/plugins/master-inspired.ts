import type { RuleHandler, CSSRule } from '../types';
import { makeValue, makeNumber, deg, px, cssvar } from '../../values/makeValue';

// Aspect Ratio Utilities
// Examples: aspect(16/9), aspect(1/1), aspect(4/3), aspect(21/9)
export const aspect: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'aspect-ratio': 'auto' };
  
  // Handle special keywords
  if (args === 'auto') return { 'aspect-ratio': 'auto' };
  if (args === 'square') return { 'aspect-ratio': '1 / 1' };
  if (args === 'video') return { 'aspect-ratio': '16 / 9' };
  
  // Handle ratio format (16/9, 4/3, etc)
  if (args.includes('/')) {
    const [width, height] = args.split('/');
    return { 'aspect-ratio': `${width} / ${height}` };
  }
  
  // Handle single number (treated as width/1)
  return { 'aspect-ratio': `${args} / 1` };
};

// Blend Mode Utilities
// Examples: blend(multiply), blend(screen), blend(overlay)
export const blend: RuleHandler = (args?: string): CSSRule => {
  const blendModes = [
    'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
    'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
    'exclusion', 'hue', 'saturation', 'color', 'luminosity'
  ];
  
  if (!args || !blendModes.includes(args)) {
    return { 'mix-blend-mode': 'normal' };
  }
  
  return { 'mix-blend-mode': args };
};

// Background Blend Mode (for background images)
export const bgBlend: RuleHandler = (args?: string): CSSRule => {
  const blendModes = [
    'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
    'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
    'exclusion', 'hue', 'saturation', 'color', 'luminosity'
  ];
  
  if (!args || !blendModes.includes(args)) {
    return { 'background-blend-mode': 'normal' };
  }
  
  return { 'background-blend-mode': args };
};

// Advanced Transform Shortcuts
// Examples: scale(0.8), scale(1.2), scale(0.8/1.2) for scaleX/scaleY
export const scale: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Handle x/y format
  if (args.includes('/')) {
    const [x, y] = args.split('/');
    return { 'transform': `scale(${x}, ${y})` };
  }
  
  // Single value scales both x and y
  return { 'transform': `scale(${args})` };
};

// Scale X only
export const scaleX: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { 'transform': `scaleX(${args})` };
};

// Scale Y only
export const scaleY: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { 'transform': `scaleY(${args})` };
};

// Rotate transform
// Examples: rotate(45), rotate(-90), rotate(1turn)
export const rotate: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Handle special units
  if (args.endsWith('turn')) {
    return { 'transform': `rotate(${args})` };
  }
  if (args.endsWith('rad')) {
    return { 'transform': `rotate(${args})` };
  }
  
  // Default to degrees
  return { 'transform': `rotate(${deg(args)})` };
};

// Skew transforms
export const skew: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Handle x/y format
  if (args.includes('/')) {
    const [x, y] = args.split('/');
    return { 'transform': `skew(${deg(x)}, ${deg(y)})` };
  }
  
  // Single value skews X only
  return { 'transform': `skewX(${deg(args)})` };
};

export const skewX: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { 'transform': `skewX(${deg(args)})` };
};

export const skewY: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { 'transform': `skewY(${deg(args)})` };
};

// Translate shortcuts (in addition to existing translate)
export const translateX: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { 'transform': `translateX(${px(args)})` };
};

export const translateY: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { 'transform': `translateY(${px(args)})` };
};

// 3D Transforms
export const rotateX: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { 'transform': `rotateX(${deg(args)})` };
};

export const rotateY: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { 'transform': `rotateY(${deg(args)})` };
};

export const rotateZ: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { 'transform': `rotateZ(${deg(args)})` };
};

export const perspective: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  return { 'perspective': px(args) };
};

// Transform origin
export const origin: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'transform-origin': 'center' };
  
  // Handle keywords
  const keywords = ['center', 'top', 'right', 'bottom', 'left'];
  if (keywords.includes(args)) {
    return { 'transform-origin': args };
  }
  
  // Handle x/y format
  if (args.includes('/')) {
    const [x, y] = args.split('/');
    return { 'transform-origin': `${x} ${y}` };
  }
  
  return { 'transform-origin': args };
};

// Mask Utilities
// Examples: mask(linear/black,transparent), mask(radial/white,black)
export const mask: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Handle gradient masks
  if (args.includes('/')) {
    const [type, colors] = args.split('/');
    
    if (type === 'linear' || type === 'radial') {
      const [color1, color2] = colors.split(',');
      const gradientType = type === 'linear' ? 'linear-gradient' : 'radial-gradient';
      
      return {
        '-webkit-mask-image': `${gradientType}(${color1}, ${color2})`,
        'mask-image': `${gradientType}(${color1}, ${color2})`
      };
    }
  }
  
  // Handle image masks
  if (args.startsWith('url(')) {
    return {
      '-webkit-mask-image': args,
      'mask-image': args
    };
  }
  
  return {};
};

// Mask size
export const maskSize: RuleHandler = (args?: string): CSSRule => {
  const sizes = ['contain', 'cover', 'auto'];
  
  if (!args || sizes.includes(args)) {
    return {
      '-webkit-mask-size': args || 'auto',
      'mask-size': args || 'auto'
    };
  }
  
  // Handle custom sizes
  return {
    '-webkit-mask-size': px(args),
    'mask-size': px(args)
  };
};

// Mask position
export const maskPosition: RuleHandler = (args?: string): CSSRule => {
  const positions = ['center', 'top', 'right', 'bottom', 'left'];
  
  if (!args || positions.includes(args)) {
    return {
      '-webkit-mask-position': args || 'center',
      'mask-position': args || 'center'
    };
  }
  
  // Handle x/y format
  if (args.includes('/')) {
    const [x, y] = args.split('/');
    return {
      '-webkit-mask-position': `${x} ${y}`,
      'mask-position': `${x} ${y}`
    };
  }
  
  return {
    '-webkit-mask-position': args,
    'mask-position': args
  };
};

// Mask repeat
export const maskRepeat: RuleHandler = (args?: string): CSSRule => {
  const repeatValues = ['repeat', 'repeat-x', 'repeat-y', 'no-repeat', 'space', 'round'];
  
  if (!args || !repeatValues.includes(args)) {
    return {
      '-webkit-mask-repeat': 'no-repeat',
      'mask-repeat': 'no-repeat'
    };
  }
  
  return {
    '-webkit-mask-repeat': args,
    'mask-repeat': args
  };
};

// Group Hover Utilities
// These work with parent-child relationships
export const group: RuleHandler = (): CSSRule => {
  // This is a marker class for group hover functionality
  return {};
};

// Predefined animation utilities
// Examples: spin(), ping(), pulse(), bounce()
export const spin: RuleHandler = (): CSSRule => {
  return { 'animation': 'spin 1s linear infinite' };
};

export const ping: RuleHandler = (): CSSRule => {
  return { 'animation': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' };
};

export const pulse: RuleHandler = (): CSSRule => {
  return { 'animation': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' };
};

export const bounce: RuleHandler = (): CSSRule => {
  return { 'animation': 'bounce 1s infinite' };
};

export const shake: RuleHandler = (): CSSRule => {
  return { 'animation': 'shake 0.5s ease-in-out infinite' };
};

export const wiggle: RuleHandler = (): CSSRule => {
  return { 'animation': 'wiggle 1s ease-in-out infinite' };
};

export const heartbeat: RuleHandler = (): CSSRule => {
  return { 'animation': 'heartbeat 1.3s ease-in-out infinite' };
};

// Animation easing (timing function)
export const ease: RuleHandler = (args?: string): CSSRule => {
  const easingFunctions: Record<string, string> = {
    'linear': 'linear',
    'in': 'ease-in',
    'out': 'ease-out',
    'in-out': 'ease-in-out',
    'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'snappy': 'cubic-bezier(0.86, 0, 0.07, 1)',
    'back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  };
  
  if (!args || !easingFunctions[args]) {
    return { 'animation-timing-function': 'ease' };
  }
  
  return { 'animation-timing-function': easingFunctions[args] };
};

// Animation iteration count
export const repeat: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  if (args === 'infinite') {
    return { 'animation-iteration-count': 'infinite' };
  }
  
  return { 'animation-iteration-count': args };
};

// Animation direction
export const direction: RuleHandler = (args?: string): CSSRule => {
  const directions = ['normal', 'reverse', 'alternate', 'alternate-reverse'];
  
  if (!args || !directions.includes(args)) {
    return { 'animation-direction': 'normal' };
  }
  
  return { 'animation-direction': args };
};

// Animation fill mode
export const fill: RuleHandler = (args?: string): CSSRule => {
  const fillModes = ['none', 'forwards', 'backwards', 'both'];
  
  if (!args || !fillModes.includes(args)) {
    return { 'animation-fill-mode': 'none' };
  }
  
  return { 'animation-fill-mode': args };
};

// Animation play state
export const play: RuleHandler = (args?: string): CSSRule => {
  const states = ['running', 'paused'];
  
  if (!args || !states.includes(args)) {
    return { 'animation-play-state': 'running' };
  }
  
  return { 'animation-play-state': args };
};

// Keyframes definitions for predefined animations
export const animationKeyframes = {
  spin: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
  ping: `
    @keyframes ping {
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    }
  `,
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: .5; }
    }
  `,
  bounce: `
    @keyframes bounce {
      0%, 100% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
      }
      50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
      }
    }
  `,
  shake: `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
      20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
  `,
  wiggle: `
    @keyframes wiggle {
      0%, 100% { transform: rotate(-3deg); }
      50% { transform: rotate(3deg); }
    }
  `,
  heartbeat: `
    @keyframes heartbeat {
      0% { transform: scale(1); }
      14% { transform: scale(1.3); }
      28% { transform: scale(1); }
      42% { transform: scale(1.3); }
      70% { transform: scale(1); }
    }
  `
};

// Get all keyframes as CSS string
export function getAllKeyframes(): string {
  return Object.values(animationKeyframes).join('\n');
}

// Export all rules
export const masterInspiredRules = {
  // Aspect ratio
  aspect,
  
  // Blend modes
  blend,
  bgBlend,
  
  // Transform shortcuts
  scale,
  scaleX,
  scaleY,
  rotate,
  rotateX,
  rotateY,
  rotateZ,
  skew,
  skewX,
  skewY,
  translateX,
  translateY,
  perspective,
  origin,
  
  // Mask utilities
  mask,
  maskSize,
  maskPosition,
  maskRepeat,
  
  // Group utilities
  group,
  
  // Predefined animations
  spin,
  ping,
  pulse,
  bounce,
  shake,
  wiggle,
  heartbeat,
  
  // Animation properties
  ease,
  repeat,
  direction,
  fill,
  play
};

// Plugin export
export const masterInspiredPlugin = {
  rules: masterInspiredRules,
  keyframes: animationKeyframes,
  getAllKeyframes
};

export default masterInspiredPlugin;