import { describe, it, expect, beforeEach } from 'vitest';
import { clearTokenRegistry } from '../02-design_tokens/tokenRegistry';
import { generateCSS } from '../07-generator/generator';

describe('Final Font Token Diagnosis', () => {
  beforeEach(() => {
    clearTokenRegistry();
  });

  it('should verify that font-8xl and above are generated correctly', () => {
    // Test all large font 02-design_tokens individually and together
    const classes = [
      'text(6xl)',
      'text(7xl)', 
      'text(8xl)',
      'text(9xl)',
      'text(10xl)',
      'text(11xl)',
      'text(12xl)',
      'text(15xl)',
      'text(20xl)'
    ];
    
    console.log('Testing font token generation...');
    const css = generateCSS(classes);
    console.log('Generated CSS:', css);
    
    // Verify all 02-design_tokens are present
    classes.forEach(className => {
      const tokenName = className.replace('text(', '').replace(')', '');
      expect(css).toContain(`--font-${tokenName}`);
      console.log(`✓ --font-${tokenName} found in CSS`);
    });
  });

  it('should check what the problem is with display component styles', () => {
    // Test exactly what display(2xl) generates
    const displayClasses = [
      'balance', 
      'text(8xl/1/-3.5%)', 
      'font(black)', 
      'tracking(-0.04em)'
    ];
    
    console.log('Testing display component style classes...');
    
    // Test each class individually
    displayClasses.forEach(className => {
      const css = generateCSS([className]);
      console.log(`${className} generates:`, css.includes('--font-8xl') ? 'CONTAINS font-8xl' : 'NO font-8xl');
    });
    
    // Test all together
    const css = generateCSS(displayClasses);
    console.log('All display classes together:', css.includes('--font-8xl') ? 'CONTAINS font-8xl' : 'NO font-8xl');
    
    expect(css).toContain('--font-8xl');
  });

  it('should show token calculations for large fonts', () => {
    import('../02-design_tokens/scaleConfig').then(({ getTokenStep }) => {
      import('../02-design_tokens/scaleFormulas').then(({ calculateMultiplier }) => {
        import('../02-design_tokens/scaleConfig').then(({ DEFAULT_SCALE_CONFIG }) => {
          const tokens = ['6xl', '7xl', '8xl', '9xl', '10xl', '11xl', '12xl', '15xl', '20xl'];
          console.log('\nFont token calculations:');
          tokens.forEach(token => {
            const step = getTokenStep(token, 'font');
            const multiplier = calculateMultiplier(step, DEFAULT_SCALE_CONFIG.font, 'font');
            const fontSize = Math.round(16 * multiplier);
            console.log(`${token}: step=${step}, multiplier=${multiplier.toFixed(4)}, fontSize=${fontSize}px`);
          });
        });
      });
    });
  });
});