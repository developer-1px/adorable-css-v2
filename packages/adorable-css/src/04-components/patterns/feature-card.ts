import type { StringRuleHandler, CSSRule } from '../../03-rules/types';

// Feature card component - commonly used pattern for feature showcases
export const featureCardString: StringRuleHandler = (): string | (string | CSSRule)[] => {
  return [
    'card vbox gap(16) p(24) bg(white) border(1/gray-200) transition',
    {
      'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        'transform': 'translateY(-2px)',
        'box-shadow': 'var(--shadow-lg)',
        'border-color': 'var(--gray-300)'
      }
    }
  ];
};

// Feature card with gradient background
export const featureCardGradientString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const gradient = args || 'purple-500..pink-500';
  
  return [
    `card vbox gap(16) p(24) bg(135deg/${gradient}) c(white) transition`,
    {
      'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        'transform': 'translateY(-2px) scale(1.02)',
        'box-shadow': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }
    }
  ];
};

// Export the 03-rules
export const featureCardRules = {
  'feature-card': featureCardString,
  'feature-card-gradient': featureCardGradientString
};