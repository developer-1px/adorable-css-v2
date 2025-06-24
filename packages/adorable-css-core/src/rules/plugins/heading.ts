import type { CSSRule, RuleHandler } from '../types';
import { defaultTokens } from '../../tokens';

// Heading utility - applies complete heading styles with typography and spacing
export const heading: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Validate heading level
  const validLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  if (!validLevels.includes(args)) {
    console.warn(`Invalid heading level: ${args}. Valid levels are: ${validLevels.join(', ')}`);
    return {};
  }
  
  const headingKey = args as keyof typeof defaultTokens.heading;
  const headingStyles = defaultTokens.heading[headingKey];
  
  return {
    'font-size': headingStyles.fontSize,
    'line-height': headingStyles.lineHeight,
    'letter-spacing': headingStyles.letterSpacing,
    'font-weight': headingStyles.fontWeight,
    'margin-bottom': headingStyles.marginBottom,
    'margin-top': '0', // Reset top margin for consistency
  };
};

export const headingRules = {
  heading,
};