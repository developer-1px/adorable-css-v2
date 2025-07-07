import { describe, it, expect, beforeEach } from 'vitest';
import { displayString } from '../05-components/primitives/typography/display';
import { clearTokenRegistry, generateUsedTokensCSS } from '../02-design_tokens/tokenRegistry';

describe('Display Component Font Token Generation', () => {
  beforeEach(() => {
    clearTokenRegistry();
  });

  it('should generate font 02-design_tokens for display(2xl) that uses text(8xl)', () => {
    // Generate display with 2xl size
    const result = displayString('2xl');
    console.log('display(2xl) result:', result);
    
    // The display component uses text(8xl) for size 2xl
    expect(result).toContain('text(8xl');
    
    // Check if the token was registered and generate CSS
    const css = generateUsedTokensCSS();
    console.log('Generated CSS:', css);
    
    // Should contain font-8xl token
    expect(css).toContain('--font-8xl');
  });

  it('should generate font 02-design_tokens for all display sizes', () => {
    // Test all display sizes
    const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];
    
    sizes.forEach(size => {
      const result = displayString(size);
      console.log(`display(${size}) result:`, result);
    });
    
    // Generate CSS for all used 02-design_tokens
    const css = generateUsedTokensCSS();
    console.log('Generated CSS for all sizes:', css);
    
    // Should contain all expected font 02-design_tokens
    ['3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl', '10xl', '11xl'].forEach(token => {
      expect(css).toContain(`--font-${token}`);
    });
  });

  it('should show token step calculations', () => {
    // Import getTokenStep to check the calculations
    import('../02-design_tokens/scaleConfig').then(({ getTokenStep }) => {
      const tokens = ['6xl', '7xl', '8xl', '9xl', '10xl', '11xl'];
      tokens.forEach(token => {
        const step = getTokenStep(token, 'font');
        console.log(`Token ${token}: step = ${step}`);
      });
    });
  });
});