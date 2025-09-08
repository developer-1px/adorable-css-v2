// Animation utilities for AdorableCSS v2
// Provides CSS animations including fade-up, slide-in, etc.

// Type definitions
type CSSRule = Record<string, string | Record<string, any>>;
type RuleHandler = (args: string) => CSSRule;

// Animation keyframes definitions
export const animationKeyframes = {
  'fade-up': '@keyframes fade-up{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}',
  'fade-down': '@keyframes fade-down{from{opacity:0;transform:translateY(-30px)}to{opacity:1;transform:translateY(0)}}',
  'fade-left': '@keyframes fade-left{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}',
  'fade-right': '@keyframes fade-right{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}',
  'fade-in': '@keyframes fade-in{from{opacity:0}to{opacity:1}}',
  'scale-up': '@keyframes scale-up{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}',
  'scale-down': '@keyframes scale-down{from{opacity:0;transform:scale(1.05)}to{opacity:1;transform:scale(1)}}',
  'slide-up': '@keyframes slide-up{from{transform:translateY(100%)}to{transform:translateY(0)}}',
  'slide-down': '@keyframes slide-down{from{transform:translateY(-100%)}to{transform:translateY(0)}}',
  'bounce-in': '@keyframes bounce-in{0%{opacity:0;transform:scale(.8)}50%{opacity:1;transform:scale(1.02)}70%{transform:scale(.98)}100%{opacity:1;transform:scale(1)}}',
  'float': '@keyframes float{0%,100%{transform:translate(0,0)scale(1)}25%{transform:translate(40px,-60px)scale(1.02)}50%{transform:translate(-30px,40px)scale(.98)}75%{transform:translate(50px,20px)scale(1.01)}}',
  'float-slow': '@keyframes float-slow{0%,100%{transform:translate(0,0)scale(1)}33%{transform:translate(30px,-30px)scale(1.05)}66%{transform:translate(-20px,20px)scale(.95)}}',
  'float-reverse': '@keyframes float-reverse{0%,100%{transform:translate(0,0)scale(1)}33%{transform:translate(-30px,30px)scale(.95)}66%{transform:translate(20px,-20px)scale(1.05)}}',
  'pulse': '@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}',
  'slide-in': '@keyframes slide-in{from{width:0}to{width:100%}}',
  'fade-in-up': '@keyframes fade-in-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}'
};

// Get all keyframes as CSS string
export function getAllKeyframes(): string {
  return Object.values(animationKeyframes).join('\n');
}

// Animation timing functions
const easingFunctions: Record<string, string> = {
  'ease': 'ease',
  'ease-in': 'ease-in',
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
  'linear': 'linear',
  'bounce': 'cubic-bezier(.68,-.55,.265,1.55)',
  'elastic': 'cubic-bezier(.68,-.55,.265,1.55)',
  'smooth': 'cubic-bezier(.4,0,.2,1)'
};

// Parse animation value using AdorableCSS slash notation
// Examples: fade-up(0.8s/ease-out/delay:300ms)
function parseAnimationValue(value: string): {
  duration: string;
  delay: string;
  easing: string;
  iteration: string;
  direction: string;
  fillMode: string;
} {
  const result = {
    duration: '.8s',
    delay: '0s', 
    easing: 'ease-out',
    iteration: '1',
    direction: 'normal',
    fillMode: 'forwards'
  };
  
  if (!value) return result;
  
  const parts = value.split('/');
  
  parts.forEach(part => {
    const trimmed = part.trim();
    
    // Duration (e.g., .8s, 500ms, 1.2s)
    if (trimmed.match(/^\d*\.?\d+(ms|s)$/)) {
      result.duration = trimmed.startsWith('0.') ? trimmed.substring(1) : trimmed;
    }
    // Delay with colon notation (e.g., delay:300ms, delay:1s)
    else if (trimmed.startsWith('delay:')) {
      result.delay = trimmed.replace('delay:', '');
    }
    // Iteration with colon notation (e.g., repeat:3, repeat:infinite)
    else if (trimmed.startsWith('repeat:')) {
      result.iteration = trimmed.replace('repeat:', '');
    }
    // Direction with colon notation (e.g., direction:reverse)
    else if (trimmed.startsWith('direction:')) {
      result.direction = trimmed.replace('direction:', '');
    }
    // Fill mode with colon notation (e.g., fill:both)
    else if (trimmed.startsWith('fill:')) {
      result.fillMode = trimmed.replace('fill:', '');
    }
    // Easing function (e.g., ease-out, bounce, smooth)
    else if (easingFunctions[trimmed]) {
      result.easing = easingFunctions[trimmed];
    }
    // Legacy support for simple values
    else if (trimmed.match(/^\d+$/) || trimmed === 'infinite') {
      result.iteration = trimmed;
    }
    else if (['normal', 'reverse', 'alternate', 'alternate-reverse'].includes(trimmed)) {
      result.direction = trimmed;
    }
    else if (['none', 'forwards', 'backwards', 'both'].includes(trimmed)) {
      result.fillMode = trimmed;
    }
  });
  
  return result;
}

// Animation rule handlers
export const animationRules: Record<string, RuleHandler> = {
  // Fade animations with auto-opacity
  'fade-up': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '');
    return {
      opacity: '0',
      animation: `fade-up ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  'fade-down': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '');
    return {
      opacity: '0',
      animation: `fade-down ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  'fade-left': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '');
    return {
      opacity: '0',
      animation: `fade-left ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  'fade-right': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '');
    return {
      opacity: '0',
      animation: `fade-right ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  'fade-in': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '');
    return {
      opacity: '0',
      animation: `fade-in ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  'scale-up': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '');
    return {
      opacity: '0',
      animation: `scale-up ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  'scale-down': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '');
    return {
      opacity: '0',
      animation: `scale-down ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  'bounce-in': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '');
    return {
      opacity: '0',
      animation: `bounce-in ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  // Slide animations (no opacity change)
  'slide-up': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '');
    return {
      animation: `slide-up ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  'slide-down': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '');
    return {
      animation: `slide-down ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  // Continuous animations
  'float': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '25s/ease-in-out/repeat:infinite');
    return {
      animation: `float ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  'float-slow': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '40s/ease-in-out/repeat:infinite');
    return {
      animation: `float-slow ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  'float-reverse': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '35s/ease-in-out/repeat:infinite');
    return {
      animation: `float-reverse ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  'pulse': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '2s/ease-in-out/repeat:infinite');
    return {
      animation: `pulse ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  'slide-in': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '0.3s/ease-out');
    return {
      animation: `slide-in ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  'fade-in-up': (value?: string): CSSRule => {
    const parsed = parseAnimationValue(value || '0.6s/ease-out');
    return {
      opacity: '0',
      animation: `fade-in-up ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
    };
  },
  
  // Generic animation utility with AdorableCSS syntax
  // animate(fade-up/0.8s/ease-out/delay:300ms)
  'animate': (value?: string): CSSRule => {
    if (!value) return {};
    
    const parts = value.split('/');
    const animationName = parts[0];
    const restValue = parts.slice(1).join('/');
    
    if (animationKeyframes[animationName as keyof typeof animationKeyframes]) {
      const parsed = parseAnimationValue(restValue);
      const result: CSSRule = {
        animation: `${animationName} ${parsed.duration} ${parsed.easing} ${parsed.delay} ${parsed.iteration} ${parsed.direction} ${parsed.fillMode}`
      };
      
      // Auto-add opacity: 0 for fade animations
      if (animationName.startsWith('fade-') || animationName.includes('scale') || animationName === 'bounce-in') {
        result.opacity = '0';
      }
      
      return result;
    }
    
    return {};
  },
  
  // Animation delay utility
  'animate-delay': (value?: string): CSSRule => {
    if (!value) return {};
    const delay = value.match(/^\d+$/) ? `${value}ms` : value;
    return {
      'animation-delay': delay
    };
  }
};

// Animation plugin export
export const animationsPlugin = {
  rules: animationRules,
  keyframes: animationKeyframes,
  getAllKeyframes,
  
  // Utility to inject keyframes into CSS
  injectKeyframes: (target: HTMLStyleElement | CSSStyleSheet) => {
    const keyframesCSS = getAllKeyframes();
    
    if (target instanceof HTMLStyleElement) {
      target.textContent = (target.textContent || '') + keyframesCSS;
    } else if (target instanceof CSSStyleSheet) {
      try {
        target.insertRule(keyframesCSS);
      } catch (e) {
        console.warn('Failed to inject animation keyframes:', e);
      }
    }
  }
};

