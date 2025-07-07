import { rule2, getFirstValue } from '../../../01-core/ast-utils';
import { color } from '../../../03-values/value-transform';
import { makeColor } from '../../../03-values/makeValue';
import { isToken, getTokenVar } from '../../../03-values/token-resolver';

const DIRS: Record<string, string> = {
  'to-top': 'to top', 'to-right': 'to right', 'to-bottom': 'to bottom', 'to-left': 'to left',
  'to-top-right': 'to top right', 'to-top-left': 'to top left',
  'to-bottom-right': 'to bottom right', 'to-bottom-left': 'to bottom left',
  'to-t': 'to top', 'to-r': 'to right', 'to-b': 'to bottom', 'to-l': 'to left',
  'to-tr': 'to top right', 'to-tl': 'to top left',
  'to-br': 'to bottom right', 'to-bl': 'to bottom left'
};

// Background helper function
function processBackground(astNode: any): string {
  // Handle both wrapped (astNode.selector.args) and direct (astNode.args) function cases
  const value = astNode.selector?.args?.[0]?.image || astNode.args?.[0]?.image;
  if (!value) return '';
  
  // Special keyword: auto for accessible text color
  if (value === 'auto') {
    return 'background-color:currentColor;color:var(--ac-auto-text-color, #000)';
  }
  
  // Check AST nodes for range types (including triple-range)
  const args = astNode.selector?.args || astNode.args;
  const rangeArg = args?.find((arg: any) => arg.type === 'range' || arg.type === 'triple-range');
  
  // Check for direction with range pattern: bg(to-right/red..blue)
  if (args && args.length >= 3) {
    const first = args[0];
    const second = args[1];
    const third = args[2];
    
    // Check if pattern is: direction / range
    if (first.image && second.image === '/' && (third.type === 'range' || third.type === 'triple-range')) {
      const dir = DIRS[first.image] || first.image;
      const colors: string[] = [];
      
      if (third.type === 'triple-range') {
        colors.push(third.min?.image || '', third.preferred?.image || '', third.max?.image || '');
      } else {
        colors.push(third.min?.image || '', third.max?.image || '');
      }
      
      return `background:linear-gradient(${dir},${colors.filter(Boolean).map(makeColor).join(',')})`;
    }
  }
  
  if (rangeArg) {
    const colors: string[] = [];
    
    if (rangeArg.type === 'triple-range') {
      // Handle min..preferred..max
      colors.push(rangeArg.min?.image || '', rangeArg.preferred?.image || '', rangeArg.max?.image || '');
    } else {
      // Handle regular range min..max
      colors.push(rangeArg.min?.image || '', rangeArg.max?.image || '');
    }
    
    return `background:linear-gradient(135deg,${colors.filter(Boolean).map(makeColor).join(',')})`;
  }
  
  // Fall back to string processing for backward compatibility
  if (astNode.args && astNode.args.length >= 1) {
    const args = astNode.args.map((a: any) => a.image || a);
    const [first, second] = args;
    const isDir = (s: string) => s?.includes('deg') || s?.startsWith('to-');
    
    if (args.length >= 2 && isDir(first)) {
      const dir = DIRS[first] || first;
      const colors = second.split('..').map(makeColor);
      return `background:linear-gradient(${dir},${colors.join(',')})`;
    } else if (first?.includes('..')) {
      const colors = first.split('..').map(makeColor);
      const dir = args[1] && DIRS[args[1]] ? DIRS[args[1]] : args[1] || '135deg';
      return `background:linear-gradient(${dir},${colors.join(',')})`;
    }
  }
  
  // Semantic colors (primary-*, secondary-*, etc)
  if (value.includes('-')) {
    const [category, shade] = value.split('-');
    const semanticCategories = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'];
    
    if (semanticCategories.includes(category)) {
      // Use CSS variable for semantic colors
      const bgColor = `var(--${category}-${shade || '500'})`;
      
      // Auto text color for semantic backgrounds
      const textColor = ['100', '200', '300', '400'].includes(shade || '500') 
        ? 'var(--ac-color-gray-900)' 
        : 'white';
      
      return `background-color:${bgColor};color:${textColor}`;
    }
  }
  
  // Gradient values
  if (value.startsWith('gradient(')) {
    const gradientValue = value.slice(9, -1); // Remove 'gradient(' and ')'
    return `background:${gradientValue}`;
  }
  
  // Linear gradient shorthand (old format)
  if (value.includes('/')) {
    const parts = value.split('/');
    if (parts.length >= 2) {
      const [direction, ...colors] = parts;
      const gradientColors = colors.map(c => color(c)).join(', ');
      return `background:linear-gradient(${direction}, ${gradientColors})`;
    }
  }
  
  // All color values (includes tokens)
  return `background-color:${color(value)}`;
}

// Main background rule - Figma fill property
export const bg = rule2((astNode: any) => {
  return processBackground(astNode);
});

// Background color only (no auto-text)
export const bgColor = rule2((astNode: any) => {
  const value = getFirstValue(astNode);
  if (!value) return '';
  
  // For bgColor, we only set background-color, not text color
  if (value === 'auto') {
    return 'background-color:currentColor';
  }
  
  // All color values (includes tokens)
  return `background-color:${color(value)}`;
});

// Background image
export const bgImage = rule2((astNode: any) => {
  const value = getFirstValue(astNode);
  if (!value) return '';
  
  if (value === 'none') return 'background-image:none';
  
  // URL pattern
  if (value.startsWith('url(') || value.includes('://')) {
    return `background-image:${value.startsWith('url(') ? value : `url(${value})`}`;
  }
  
  // Gradient
  return `background-image:${value}`;
});

// Background size
export const bgSize = rule2((astNode: any) => {
  const value = getFirstValue(astNode) || 'cover';
  
  const sizeMap: Record<string, string> = {
    'cover': 'cover',
    'contain': 'contain',
    'auto': 'auto',
    'full': '100% 100%',
  };
  
  return `background-size:${sizeMap[value] || value}`;
});

// Background position
export const bgPosition = rule2((astNode: any) => {
  const value = getFirstValue(astNode) || 'center';
  
  const positionMap: Record<string, string> = {
    'center': 'center',
    'top': 'top',
    'right': 'right',
    'bottom': 'bottom',
    'left': 'left',
    'top-left': 'top left',
    'top-right': 'top right',
    'bottom-left': 'bottom left',
    'bottom-right': 'bottom right',
  };
  
  return `background-position:${positionMap[value] || value}`;
});

// Background repeat
export const bgRepeat = rule2((astNode: any) => {
  const value = getFirstValue(astNode) || 'repeat';
  
  const repeatMap: Record<string, string> = {
    'repeat': 'repeat',
    'no-repeat': 'no-repeat',
    'repeat-x': 'repeat-x',
    'repeat-y': 'repeat-y',
    'round': 'round',
    'space': 'space',
  };
  
  return `background-repeat:${repeatMap[value] || value}`;
});

// Background attachment
export const bgAttachment = rule2((astNode: any) => {
  const value = getFirstValue(astNode) || 'scroll';
  
  const attachmentMap: Record<string, string> = {
    'fixed': 'fixed',
    'local': 'local',
    'scroll': 'scroll',
  };
  
  return `background-attachment:${attachmentMap[value] || value}`;
});