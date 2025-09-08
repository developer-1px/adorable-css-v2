import { describe, it, expect } from 'vitest';
import { generateCSS } from '../../../07-generator/generator';

describe('Color Token Generation', () => {
  it('should generate CSS variables for semantic colors', () => {
    const css = generateCSS(['c(mute)', 'bg(primary)', 'c(mute-500)', 'bg(mute-900)']);
    console.log('Generated CSS:', css);
    
    // Should include color variable definitions
    expect(css).toContain('--mute');
    expect(css).toContain('--primary');
    expect(css).toContain('--mute-500');
    expect(css).toContain('--mute-900');
  });

  it('should check what tokens are in colorPalette', () => {
    // The first test already validates that colors work
    // This validates the CSS contains the expected color variables
    const css = generateCSS(['c(mute)', 'bg(primary)']);
    expect(css).toContain('--mute');
    expect(css).toContain('--primary');
  });
});