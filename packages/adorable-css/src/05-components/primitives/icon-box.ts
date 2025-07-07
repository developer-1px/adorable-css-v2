// Type definitions
type CSSRule = Record<string, string | Record<string, any>>;
export type RuleHandler = (args: string) => CSSRule;
export type KeywordRuleHandler = () => CSSRule;
import type { StringRuleHandler } from '../defineComponent-unified';

// Icon box component - perfect for icon containers in cards, features, etc.
export const iconBoxString: StringRuleHandler = (args?: string): string | (string | CSSRule)[] => {
  const size = args || '48';
  
  // Common icon box sizes
  const sizeMap: Record<string, string> = {
    'sm': '32',
    'md': '40', 
    'lg': '48',
    'xl': '56',
    '32': '32',
    '40': '40',
    '48': '48',
    '56': '56',
    '64': '64'
  };
  
  const finalSize = sizeMap[size] || size;
  
  return [
    `size(${finalSize}) hbox(pack) r(lg)`,
    {
      'flex-shrink': '0',
      'transition': 'all 0.2s ease',
      '& > svg, & > img': {
        'width': '24px',
        'height': '24px'
      }
    }
  ];
};

// Export the rule
export const iconBoxRules = {
  'icon-box': iconBoxString
};