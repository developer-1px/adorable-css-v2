import { rule2, getFirstValue } from '../../ast-utils/rule2-helpers';

// Object fit utilities
export const objectFit = rule2((astNode: any) => {
  const value = getFirstValue(astNode) || 'cover';
  
  const fitMap: Record<string, string> = {
    'fill': 'fill',
    'contain': 'contain',
    'cover': 'cover',
    'none': 'none',
    'scale-down': 'scale-down',
  };
  
  return `object-fit:${fitMap[value] || value}`;
});

// Object position utilities
export const objectPosition = rule2((astNode: any) => {
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
  
  return `object-position:${positionMap[value] || value}`;
});

// Combined object utilities (shorthand)
export const object = rule2((astNode: any) => {
  const value = getFirstValue(astNode);
  if (!value) return '';
  
  // Handle position values
  const positionValues = ['center', 'top', 'right', 'bottom', 'left', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
  if (positionValues.includes(value)) {
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
    return `object-position:${positionMap[value]}`;
  }
  
  // Handle fit values
  const fitMap: Record<string, string> = {
    'fill': 'fill',
    'contain': 'contain',
    'cover': 'cover',
    'none': 'none',
    'scale-down': 'scale-down',
  };
  
  return `object-fit:${fitMap[value] || value}`;
});

// Universal cover utility - works for both background and object
export const cover = rule2(() => {
  return 'background-size:cover;object-fit:cover';
});

// Universal contain utility - works for both background and object
export const contain = rule2(() => {
  return 'background-size:contain;object-fit:contain';
});

// Universal fill utility
export const fill = rule2(() => {
  return 'background-size:100% 100%;object-fit:fill';
});