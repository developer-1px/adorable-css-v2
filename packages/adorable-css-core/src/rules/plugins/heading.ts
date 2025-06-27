import type { CSSRule, RuleHandler } from '../types';
import { isToken, getTokenVar } from '../../tokens';

// Heading style definitions - each heading has weight, size, line-height, and letter-spacing
const headingStyles = {
  // Size-based headings (xs to 8xl following font scale)
  xs: { weight: '600', fontSize: 'sm', lineHeight: 'normal', letterSpacing: 'normal' },
  sm: { weight: '600', fontSize: 'md', lineHeight: 'normal', letterSpacing: 'normal' },
  md: { weight: '600', fontSize: 'lg', lineHeight: 'snug', letterSpacing: 'tight' },
  lg: { weight: '600', fontSize: 'xl', lineHeight: 'snug', letterSpacing: 'tight' },
  xl: { weight: '700', fontSize: '2xl', lineHeight: 'snug', letterSpacing: 'tight' },
  '2xl': { weight: '700', fontSize: '3xl', lineHeight: 'snug', letterSpacing: 'tight' },
  '3xl': { weight: '700', fontSize: '4xl', lineHeight: 'tight', letterSpacing: 'tighter' },
  '4xl': { weight: '700', fontSize: '5xl', lineHeight: 'tight', letterSpacing: 'tighter' },
  '5xl': { weight: '800', fontSize: '6xl', lineHeight: 'tight', letterSpacing: 'tighter' },
  '6xl': { weight: '800', fontSize: '7xl', lineHeight: 'tight', letterSpacing: 'tighter' },
  '7xl': { weight: '900', fontSize: '8xl', lineHeight: 'tight', letterSpacing: 'tighter' },
  '8xl': { weight: '900', fontSize: '9xl', lineHeight: 'tight', letterSpacing: 'tighter' },
  
  // Semantic headings (h1-h6)
  h1: { weight: '700', fontSize: '6xl', lineHeight: 'tight', letterSpacing: 'tighter' },    // Hero titles (76.29px)
  h2: { weight: '700', fontSize: '5xl', lineHeight: 'tight', letterSpacing: 'tighter' },    // Section titles (61.04px)
  h3: { weight: '600', fontSize: '4xl', lineHeight: 'snug', letterSpacing: 'tight' },       // Subsection titles (48.83px)
  h4: { weight: '600', fontSize: '3xl', lineHeight: 'snug', letterSpacing: 'tight' },       // Content headings (39.06px)
  h5: { weight: '600', fontSize: '2xl', lineHeight: 'snug', letterSpacing: 'tight' },       // Minor headings (31.25px)
  h6: { weight: '600', fontSize: 'xl', lineHeight: 'normal', letterSpacing: 'normal' },     // Small headings (25px)
} as const;

// Heading utility - applies complete heading styles with typography and spacing
export const heading: RuleHandler = (args?: string): CSSRule => {
  if (!args) return {};
  
  // Check if it's a valid heading style
  const headingKey = args as keyof typeof headingStyles;
  if (!headingStyles[headingKey]) {
    const validLevels = Object.keys(headingStyles).join(', ');
    console.warn(`Invalid heading style: ${args}. Valid styles are: ${validLevels}`);
    return {};
  }
  
  const style = headingStyles[headingKey];
  
  // Build CSS properties using tokens
  const result: CSSRule = {
    'font-weight': style.weight,
    'font-size': getTokenVar('font', style.fontSize),
    'line-height': getTokenVar('lineHeight', style.lineHeight),
    'letter-spacing': getTokenVar('letterSpacing', style.letterSpacing),
    'margin-top': '0',
    'margin-bottom': '0.75rem', // Default bottom margin
  };
  
  return result;
};

export const headingRules = {
  heading,
};