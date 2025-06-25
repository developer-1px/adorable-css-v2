import type { CSSRule, RuleHandler } from '../types';
import { makeColor } from '../../values/makeValue';

export const bg: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // bg(transparent)
  if (args === 'transparent') return { 'background-color': 'transparent' };
  
  // bg(current)
  if (args === 'current') return { 'background-color': 'currentColor' };
  
  // bg(linear-gradient(...)) - full gradient syntax
  if (args.startsWith('linear-gradient(') || args.startsWith('radial-gradient(') || args.startsWith('conic-gradient(')) {
    return { 'background': args };
  }
  
  // bg(#fff..#ccc/to-bottom) or bg(#ccc..#aaa..#eee/135deg) - enhanced gradient syntax
  if (args.includes('..')) {
    let colors: string[] = [];
    let direction = '135deg'; // default direction
    
    // Check if there's a direction specified after /
    if (args.includes('/')) {
      const [colorPart, dirPart] = args.split('/');
      colors = colorPart.split('..');
      
      // Convert direction keywords to degrees
      const directionMap: Record<string, string> = {
        'to-top': 'to top',
        'to-right': 'to right',
        'to-bottom': 'to bottom',
        'to-left': 'to left',
        'to-top-right': 'to top right',
        'to-top-left': 'to top left',
        'to-bottom-right': 'to bottom right',
        'to-bottom-left': 'to bottom left'
      };
      
      direction = directionMap[dirPart] || dirPart;
    } else {
      colors = args.split('..');
    }
    
    // Build the gradient string
    const colorStops = colors.map(color => makeColor(color)).join(', ');
    return { 'background': `linear-gradient(${direction}, ${colorStops})` };
  }
  
  // bg(linear/45deg/#f00/#00f) - gradient
  if (args.startsWith('linear/')) {
    const gradientValue = args.replace(/\//g, ' ').replace('linear ', 'linear-gradient(');
    return { 'background': gradientValue + ')' };
  }
  
  // bg(radial/circle/#f00/#00f) - radial gradient
  if (args.startsWith('radial/')) {
    const gradientValue = args.replace(/\//g, ' ').replace('radial ', 'radial-gradient(');
    return { 'background': gradientValue + ')' };
  }
  
  // bg(#fff) or bg(#000.5) - regular colors
  return { 'background-color': String(makeColor(args)) };
};

// Background opacity utility
export const bgOpacity: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Convert percentage or decimal to opacity value
  let opacity = args;
  if (args.includes('%')) {
    opacity = (parseFloat(args) / 100).toString();
  } else if (parseFloat(args) > 1) {
    opacity = (parseFloat(args) / 100).toString();
  }
  
  return { 
    opacity: opacity
  };
};

export const backgroundRules = {
  bg,
  'bg-opacity': bgOpacity
};