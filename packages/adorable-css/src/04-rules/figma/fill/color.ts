import { makeColor } from '../../../03-values/makeValue';
import { rule2, getFirstValue, getAllArgs } from '../../../01-core/ast-utils';

const DIRS: Record<string, string> = {
  'to-top': 'to top', 'to-right': 'to right', 'to-bottom': 'to bottom', 'to-left': 'to left',
  'to-top-right': 'to top right', 'to-top-left': 'to top left',
  'to-bottom-right': 'to bottom right', 'to-bottom-left': 'to bottom left',
  'to-t': 'to top', 'to-r': 'to right', 'to-b': 'to bottom', 'to-l': 'to left',
  'to-tr': 'to top right', 'to-tl': 'to top left',
  'to-br': 'to bottom right', 'to-bl': 'to bottom left'
};

const getGradient = (s: any): string | null => {
  const args = getAllArgs(s);
  if (!args || args.length === 0) return null;
  
  // Check for direction with range pattern: c(to-bottom/blue..green)
  if (args.length >= 3) {
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
      
      return `linear-gradient(${dir},${colors.filter(Boolean).map(makeColor).join(',')})`;
    }
  }
  
  // Check AST nodes for range types (including triple-range)
  const rangeArg = args.find(arg => arg.type === 'range' || arg.type === 'triple-range');
  if (rangeArg) {
    const colors: string[] = [];
    
    if (rangeArg.type === 'triple-range') {
      // Handle min..preferred..max
      colors.push(rangeArg.min?.image || '', rangeArg.preferred?.image || '', rangeArg.max?.image || '');
    } else {
      // Handle regular range min..max
      colors.push(rangeArg.min?.image || '', rangeArg.max?.image || '');
    }
    
    return `linear-gradient(135deg,${colors.filter(Boolean).map(makeColor).join(',')})`;
  }
  
  // Check for direction/colors pattern or multiple colors with ..
  const argValues = args.map(a => a.image || '');
  if (argValues.length >= 1) {
    const [first, second] = argValues;
    const isDir = (s: string) => s?.includes('deg') || s?.startsWith('to-');
    
    if (argValues.length >= 2 && isDir(first)) {
      const dir = DIRS[first] || first;
      const colors = second.split('..').map(makeColor);
      return `linear-gradient(${dir},${colors.join(',')})`;
    } else if (first?.includes('..')) {
      const colors = first.split('..').map(makeColor);
      const dir = argValues[1] && DIRS[argValues[1]] ? DIRS[argValues[1]] : argValues[1] || '135deg';
      return `linear-gradient(${dir},${colors.join(',')})`;
    }
  }
  
  return null;
};

export const colorHandlers = {
  'c': rule2((s) => {
    const arg = getFirstValue(s);
    if (!arg) return 'color:inherit';
    
    const gradient = getGradient(s);
    if (gradient) {
      return `background:${gradient};background-clip:text;-webkit-background-clip:text;color:transparent`;
    }
    
    const color = makeColor(arg);
    return color ? `color:${color}` : 'color:inherit';
  })
};