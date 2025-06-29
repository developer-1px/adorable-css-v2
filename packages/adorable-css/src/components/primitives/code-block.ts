import type { StringRuleHandler, CSSRule } from '../../rules/types';

// Code block component for displaying code snippets
export const codeBlockString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const theme = args || 'dark';
  
  const themes = {
    dark: {
      bg: 'var(--gray-900)',
      color: 'var(--gray-300)',
      border: 'transparent'
    },
    light: {
      bg: 'var(--gray-50)',
      color: 'var(--gray-800)',
      border: 'var(--gray-200)'
    },
    branded: {
      bg: 'white',
      color: 'var(--gray-900)',
      border: 'var(--purple-500)'
    }
  };
  
  const themeStyles = themes[theme as keyof typeof themes] || themes.dark;
  
  return [
    'r(lg) p(24) overflow(auto) font(mono/sm) leading(relaxed)',
    {
      'background': themeStyles.bg,
      'color': themeStyles.color,
      'border': `2px solid ${themeStyles.border}`,
      'white-space': 'pre',
      'tab-size': '2',
      '& code': {
        'background': 'transparent',
        'padding': '0',
        'font-size': 'inherit',
        'color': 'inherit'
      },
      // Scrollbar styling
      '&::-webkit-scrollbar': {
        'height': '8px',
        'width': '8px'
      },
      '&::-webkit-scrollbar-track': {
        'background': 'transparent'
      },
      '&::-webkit-scrollbar-thumb': {
        'background': 'rgba(255, 255, 255, 0.2)',
        'border-radius': '4px'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        'background': 'rgba(255, 255, 255, 0.3)'
      }
    }
  ];
};

// Inline code component
export const inlineCodeString: StringRuleHandler = (): string | (string | CSSRule)[] => {
  return [
    'font(mono/sm) px(6) py(2) r(sm)',
    {
      'background': 'var(--gray-100)',
      'color': 'var(--gray-800)',
      'border': '1px solid var(--gray-200)'
    }
  ];
};

// Export the rules
export const codeBlockRules = {
  'code-block': codeBlockString,
  'inline-code': inlineCodeString
};