import type { RuleHandler, CSSRule } from '../../rules/types';
import { isToken, getTokenVar } from '../../design-system/tokens/index';
import { generateContainerCalc } from '../../core/values/dynamicTokens';

const paddingMap: Record<string, string> = {
  '0': '0',
  'xs': '0.25rem',
  'sm': '0.5rem',
  'md': '1rem',
  'lg': '1.5rem',
  'xl': '2rem',
  '2xl': '3rem'
};

// container - Apple-inspired responsive container
export const container: RuleHandler = (args?: string): CSSRule => {
  if (!args) {
    // Default container with responsive padding
    return {
      'width': '100%',
      'max-width': '980px',  // Apple's default content width
      'margin-left': 'auto',
      'margin-right': 'auto',
      'padding-left': 'max(22px, env(safe-area-inset-left))',
      'padding-right': 'max(22px, env(safe-area-inset-right))',
      '@media (min-width: 735px)': {
        'padding-left': '24px',
        'padding-right': '24px'
      },
      '@media (min-width: 1069px)': {
        'padding-left': '32px',
        'padding-right': '32px'
      }
    };
  }

  // Parse the arguments
  const parts = args.split('/');
  const size = parts[0];
  const paddingPart = parts[1];

  // Apple-inspired container sizes
  const containerSizes: Record<string, string> = {
    'compact': '692px',    // Compact reading width
    'default': '980px',    // Standard content
    'wide': '1190px',      // Wide content
    'full': '100%',        // Full width
    // Legacy support
    'narrow': '600px',
    'wide-legacy': '1600px'
  };

  // Base container styles with responsive padding
  const styles: CSSRule = {
    'width': '100%',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'padding-left': 'max(22px, env(safe-area-inset-left))',
    'padding-right': 'max(22px, env(safe-area-inset-right))',
    '@media (min-width: 735px)': {
      'padding-left': '24px',
      'padding-right': '24px'
    },
    '@media (min-width: 1069px)': {
      'padding-left': '32px',
      'padding-right': '32px'
    }
  };

  // Set max-width based on size
  if (containerSizes[size]) {
    styles['max-width'] = containerSizes[size];
  } else if (isToken(size, 'container')) {
    // Use container tokens (proper tokens for layout containers)
    styles['max-width'] = getTokenVar('container', size);
  } else if (isToken(size, 'size')) {
    // Fallback to size tokens for backward compatibility
    styles['max-width'] = getTokenVar('size', size);
  } else {
    // Default to standard width
    styles['max-width'] = '980px';
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