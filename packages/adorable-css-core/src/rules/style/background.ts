import type { CSSRule, RuleHandler } from '../types';
import { makeColor } from '../../core/values/makeValue';

export const bg: RuleHandler = (args?: string): CSSRule => {
  if (!args) return { 'background-color': 'var(--gray-900)' }; // Default to gray-900 for code blocks
  
  // bg(transparent)
  if (args === 'transparent') return { 'background-color': 'transparent' };
  
  // bg(current)
  if (args === 'current') return { 'background-color': 'currentColor' };
  
  // bg(brand) - brand gradient shortcut
  if (args === 'brand' || args === 'gradient-brand') {
    return { 'background': 'linear-gradient(135deg, var(--brand-start, #8b5cf6), var(--brand-end, #ec4899))' };
  }
  
  // bg(linear-gradient(...)) - full gradient syntax
  if (args.startsWith('linear-gradient(') || args.startsWith('radial-gradient(') || args.startsWith('conic-gradient(')) {
    return { 'background': args };
  }
  
  // bg(#fff..#ccc/to-bottom) or bg(135deg/purple-500..pink-500) - enhanced gradient syntax
  if (args.includes('..')) {
    let colors: string[] = [];
    let direction = '135deg'; // default direction
    
    // Check if there's a direction specified with /
    if (args.includes('/')) {
      const parts = args.split('/');
      
      // Check if first part is direction (contains deg or is a keyword)
      if (parts[0].includes('deg') || parts[0].startsWith('to-')) {
        direction = parts[0];
        colors = parts[1].split('..');
      } else {
        // Old format: colors/direction
        colors = parts[0].split('..');
        direction = parts[1];
      }
      
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
      
      direction = directionMap[direction] || direction;
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

export const backgroundRules = {
  bg
};