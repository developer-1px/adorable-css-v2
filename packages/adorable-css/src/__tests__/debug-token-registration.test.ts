import { describe, it, expect, beforeEach } from 'vitest';
import { clearTokenRegistry, generateUsedTokensCSS, getUsedTokens } from '../02-design_tokens/tokenRegistry';
import { font } from '../03-rules/text/font';
import { parseAdorableCSS } from '../01-core/parser/parser';

describe('Token Registration Debug', () => {
  beforeEach(() => {
    clearTokenRegistry();
  });

  it('should register font 02-design_tokens when using font() rule directly', () => {
    // Test the font rule directly
    const result = font('8xl');
    console.log('font(8xl) result:', result);
    
    // Check if token was registered
    const usedTokens = getUsedTokens();
    console.log('Used 02-design_tokens after font(8xl):', {
      font: Array.from(usedTokens.font),
      spacing: Array.from(usedTokens.spacing)
    });
    
    // Generate CSS
    const css = generateUsedTokensCSS();
    console.log('Generated CSS:', css);
    
    expect(css).toContain('--font-8xl');
  });

  it('should register 02-design_tokens when parsing AdorableCSS styles', () => {
    // Test parsing a style that includes font(8xl)
    const styleString = 'font(8xl/1/-3.5%) bold(black)';
    const parsed = parseAdorableCSS(styleString);
    console.log('Parsed style:', parsed);
    
    // Check if token was registered
    const usedTokens = getUsedTokens();
    console.log('Used 02-design_tokens after parsing:', {
      font: Array.from(usedTokens.font),
      spacing: Array.from(usedTokens.spacing)
    });
    
    // Generate CSS
    const css = generateUsedTokensCSS();
    console.log('Generated CSS:', css);
    
    expect(css).toContain('--font-8xl');
  });

  it('should check what 02-design_tokens are being registered', () => {
    // Register various 02-design_tokens manually
    const tokens = ['6xl', '7xl', '8xl', '9xl', '10xl', '11xl'];
    tokens.forEach(token => {
      const result = font(token);
      console.log(`font(${token}) result:`, result);
    });
    
    // Check what's registered
    const usedTokens = getUsedTokens();
    console.log('All used 02-design_tokens:', {
      font: Array.from(usedTokens.font),
      spacing: Array.from(usedTokens.spacing),
      size: Array.from(usedTokens.size),
      container: Array.from(usedTokens.container)
    });
    
    // Generate CSS
    const css = generateUsedTokensCSS();
    console.log('Generated CSS:', css);
  });
});