import { describe, it, expect } from 'vitest';
import { generateCSS } from '../../index';

describe('Section Component', () => {
  it('should handle default section', () => {
    const css = generateCSS(['section()']);
    expect(css).toContain('max-width:768px');
    expect(css).toContain('margin-inline:auto');
    expect(css).toContain('padding-inline:');
  });

  it('should handle text variant', () => {
    const css = generateCSS(['section(text)']);
    expect(css).toContain('max-width:620px');
  });

  it('should handle wide variant', () => {
    const css = generateCSS(['section(wide)']);
    expect(css).toContain('max-width:1024px');
  });

  it('should handle full variant', () => {
    const css = generateCSS(['section(full)']);
    expect(css).toContain('width:100%');
  });

  it('should handle other section utilities', () => {
    expect(generateCSS(['contain()'])).toContain('background-size:contain');
    expect(generateCSS(['stack()'])).toContain('display:flex');
    expect(generateCSS(['stack()'])).toContain('flex-direction:column');
  });
});