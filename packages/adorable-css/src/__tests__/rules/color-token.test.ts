import { describe, it, expect } from 'vitest';
import { generateCSS } from '../../07-generator/generator';
import { getUsedTokens } from '../../02-design_tokens/tokenRegistry';

describe('Color Token Generation', () => {
  it('should generate CSS variables for semantic colors', () => {
    const css = generateCSS(['c(mute)', 'bg(primary)', 'c(mute-500)', 'bg(mute-900)']);
    console.log('Generated CSS:', css);
    console.log('Used tokens:', getUsedTokens());
    
    // Should include color variable definitions
    expect(css).toContain('--mute');
    expect(css).toContain('--primary');
    expect(css).toContain('--mute-500');
    expect(css).toContain('--mute-900');
  });

  it('should check what tokens are in colorPalette', () => {
    const { colorPalette } = require('../../02-design_tokens/design-system/colors/colors');
    console.log('colorPalette keys:', Object.keys(colorPalette).slice(0, 20));
    console.log('mute tokens:', Object.keys(colorPalette).filter(k => k.includes('mute')));
  });
});