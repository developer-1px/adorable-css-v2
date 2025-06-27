import type { RuleHandler, CSSRule } from '../../rules/types';

const sizeMap: Record<string, string> = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px',
  '4xl': '2560px',
  '5xl': '3200px',
  '6xl': '3840px',
  '7xl': '4480px',
  full: '100%',
  narrow: '600px',
  wide: '1600px'
};

const paddingMap: Record<string, string> = {
  '0': '0',
  'xs': '0.25rem',
  'sm': '0.5rem',
  'md': '1rem',
  'lg': '1.5rem',
  'xl': '2rem',
  '2xl': '3rem'
};

// container - Basic container
export const container: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    // Level 1: Basic container
    return {
      'width': '100%',
      'max-width': 'var(--container-xl, 1280px)',
      'margin-left': 'auto',
      'margin-right': 'auto',
      'padding-left': 'var(--container-px-responsive, 1rem)',
      'padding-right': 'var(--container-px-responsive, 1rem)'
    };
  }

  // Parse the arguments
  const parts = args.split('/');
  const size = parts[0];
  const paddingPart = parts[1];

  // Base container styles
  const styles: CSSRule = {
    'width': '100%',
    'margin-left': 'auto',
    'margin-right': 'auto'
  };

  // Set max-width based on size
  if (size === 'full') {
    styles['max-width'] = '100%';
  } else if (sizeMap[size]) {
    styles['max-width'] = `var(--container-${size}, ${sizeMap[size]})`;
  } else {
    // Default to xl if size not recognized
    styles['max-width'] = 'var(--container-xl, 1280px)';
  }

  // Handle padding
  if (paddingPart) {
    if (paddingPart.startsWith('px:')) {
      const paddingValue = paddingPart.substring(3);
      
      // Check for asymmetric padding (px:lg+md)
      if (paddingValue.includes('+')) {
        const [left, right] = paddingValue.split('+');
        styles['padding-left'] = paddingMap[left] ?? '1rem';
        styles['padding-right'] = paddingMap[right] ?? '1rem';
      } else {
        // Symmetric padding
        const padding = paddingMap[paddingValue] ?? '1rem';
        styles['padding-left'] = padding;
        styles['padding-right'] = padding;
      }
    }
  } else {
    // Default padding
    styles['padding-left'] = 'var(--container-px-responsive, 1rem)';
    styles['padding-right'] = 'var(--container-px-responsive, 1rem)';
  }

  return styles;
};

// Export the rules
export const containerRules = {
  container
};