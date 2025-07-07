import { describe, it, expect } from 'vitest';
import { generateClass } from '../07-generator/generator';

describe('Section Component', () => {
  it('should handle default section', () => {
    const css = generateClass('section');
    expect(css).toContain('max-width:768px');
    expect(css).toContain('margin-inline:auto');
    expect(css).toContain('padding-inline:');
  });

  it('should handle text variant', () => {
    const css = generateClass('section(text)');
    expect(css).toContain('max-width:620px');
  });

  it('should handle wide variant', () => {
    const css = generateClass('section(wide)');
    expect(css).toContain('max-width:1024px');
  });

  it('should handle full variant', () => {
    const css = generateClass('section(full)');
    expect(css).toContain('width:100%');
  });

  it('should handle other section utilities', () => {
    expect(generateClass('contain')).toContain('max-width:64rem');
    expect(generateClass('stack')).toContain('display:flex');
    expect(generateClass('stack')).toContain('flex-direction:column');
  });
});