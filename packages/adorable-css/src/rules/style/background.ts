import type { CSSRule, RuleHandler } from '../types';
import { makeColor } from '../../core/values/makeValue';
import { hexToOklch, hexToRgb } from '../../design-system/colors/advanced-colors';

// Calculate auto text color based on background lightness
function getAutoTextColor(backgroundColor: string): string {
  // Handle CSS variables
  if (backgroundColor.startsWith('var(') || backgroundColor.startsWith('oklch(')) {
    // For CSS variables and OKLCH colors, use CSS contrast-color if available
    return `contrast-color(${backgroundColor})`;
  }
  
  // Convert color to hex if possible
  let hexColor = backgroundColor;
  if (backgroundColor.startsWith('#')) {
    hexColor = backgroundColor;
  } else if (backgroundColor.startsWith('rgb')) {
    // Simple RGB to hex conversion for basic cases
    const match = backgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      hexColor = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
  }
  
  // Use OKLCH lightness to determine text color
  const oklch = hexToOklch(hexColor);
  if (oklch) {
    // OKLCH lightness threshold: 0.6 is a good balance point
    // Higher lightness = use dark text, lower lightness = use light text
    return oklch.l > 0.6 ? '#000000' : '#ffffff';
  }
  
  // Fallback: use relative luminance calculation
  const rgb = hexToRgb(hexColor);
  if (rgb) {
    // Convert to relative luminance (Y in XYZ color space)
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }
  
  // Final fallback
  return '#000000';
}

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

  // Handle semantic backgrounds
  if (args === 'gradient') {
    // Use brand gradient as default gradient
    return { 'background': 'linear-gradient(135deg, var(--brand-start, #8b5cf6), var(--brand-end, #ec4899))' };
  }
  
  if (args === 'surface') {
    // Use surface-base semantic color
    const surfaceColor = makeColor('surface-base');
    return { 'background-color': surfaceColor };
  }
  
  if (args === 'muted' || args === 'mute') {
    // Support both 'muted' and 'mute' for consistency
    const mutedColor = makeColor('surface-subtle');
    return { 'background-color': mutedColor };
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
      
      // Convert direction keywords to CSS gradient directions
      const directionMap: Record<string, string> = {
        // Full direction names
        'to-top': 'to top',
        'to-right': 'to right', 
        'to-bottom': 'to bottom',
        'to-left': 'to left',
        'to-top-right': 'to top right',
        'to-top-left': 'to top left',
        'to-bottom-right': 'to bottom right',
        'to-bottom-left': 'to bottom left',
        
        // Short direction names (more convenient)
        'to-t': 'to top',
        'to-r': 'to right',
        'to-b': 'to bottom', 
        'to-l': 'to left',
        'to-tr': 'to top right',
        'to-tl': 'to top left',
        'to-br': 'to bottom right',
        'to-bl': 'to bottom left',
        
        // Common degree equivalents for convenience
        '0deg': 'to top',
        '90deg': 'to right',
        '180deg': 'to bottom',
        '270deg': 'to left',
        '45deg': 'to top right',
        '135deg': 'to bottom right',
        '225deg': 'to bottom left',
        '315deg': 'to top left'
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
  
  // Check for auto-text syntax: bg(color/auto-text)
  if (args.includes('/auto-text')) {
    const color = args.replace('/auto-text', '');
    const backgroundColor = String(makeColor(color));
    const textColor = getAutoTextColor(backgroundColor);
    
    return { 
      'background-color': backgroundColor,
      'color': textColor
    };
  }
  
  // bg(#fff) or bg(#000.5) - regular colors
  return { 'background-color': String(makeColor(args)) };
};

export const backgroundRules = {
  bg
};