import { describe, it, expect, beforeEach } from 'vitest';
import { clearTokenRegistry, generateUsedTokensCSS, getUsedTokens } from '../02-design_tokens/tokenRegistry';
import { generateCSS, generateClass } from '../07-generator/generator';

describe('Complete Token Generation Test', () => {
  beforeEach(() => {
    clearTokenRegistry();
  });

  it('should register 02-design_tokens when generating CSS for individual classes', () => {
    // Test individual classes that use font 02-design_tokens
    const classes = [
      'text(8xl)',
      'text(9xl)',
      'text(10xl)',
      'text(11xl)'
    ];
    
    classes.forEach(className => {
      const css = generateClass(className);
      console.log(`${className} -> CSS: ${css}`);
    });
    
    // Check registered 02-design_tokens
    const usedTokens = getUsedTokens();
    console.log('Used 02-design_tokens:', {
      font: Array.from(usedTokens.font),
      spacing: Array.from(usedTokens.spacing)
    });
    
    // Generate final CSS with 02-design_tokens
    const css = generateUsedTokensCSS();
    console.log('Generated token CSS:', css);
    
    // Should contain all font 02-design_tokens
    expect(css).toContain('--font-8xl');
    expect(css).toContain('--font-9xl');
    expect(css).toContain('--font-10xl');
    expect(css).toContain('--font-11xl');
  });

  it('should register 02-design_tokens when generating CSS for multiple classes together', () => {
    // Test multiple classes at once
    const classes = [
      'text(8xl)',
      'text(9xl)',
      'text(10xl)',
      'text(11xl)',
      'p(4xl)',
      'm(2xl)'
    ];
    
    const css = generateCSS(classes);
    console.log('Complete CSS output:', css);
    
    // Check that 02-design_tokens are included in the output
    expect(css).toContain('--font-8xl');
    expect(css).toContain('--font-9xl');
    expect(css).toContain('--font-10xl');
    expect(css).toContain('--font-11xl');
    expect(css).toContain('--spacing-4xl');
    expect(css).toContain('--spacing-2xl');
  });

  it('should register 02-design_tokens from display component styles', () => {
    // Test styles similar to what display component generates
    const classes = [
      'balance',
      'text(8xl/1/-3.5%)',
      'font(black)',
      'tracking(-0.04em)'
    ];
    
    const css = generateCSS(classes);
    console.log('Display-style CSS output:', css);
    
    // Should include the font token
    expect(css).toContain('--font-8xl');
  });

  it('should show what the display component actually generates', () => {
    // Import and test the actual display component
    import('../05-components/primitives/typography/display').then(({ displayString }) => {
      const result = displayString('2xl');
      console.log('display(2xl) actual result:', result);
      
      // Parse this into individual classes and generate CSS
      const classes = result.split(' ').filter(Boolean);
      console.log('Individual classes:', classes);
      
      const css = generateCSS(classes);
      console.log('CSS from display(2xl):', css);
      
      expect(css).toContain('--font-8xl');
    });
  });
});