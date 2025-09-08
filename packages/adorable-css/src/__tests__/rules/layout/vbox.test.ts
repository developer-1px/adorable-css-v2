import { describe, it, expect } from 'vitest';
import { generateClass } from '../../07-generator/generator';

describe('vbox with text-align', () => {
  it('should generate vbox(center) with text-align center', () => {
    const css = generateClass('vbox(center)');
    console.log('Generated CSS for vbox(center):', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:center');
    expect(css).toContain('text-align:center');
  });

  it('should generate vbox(left) with text-align left', () => {
    const css = generateClass('vbox(left)');
    console.log('Generated CSS for vbox(left):', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:flex-start');
    expect(css).toContain('text-align:left');
  });

  it('should generate vbox(right) with text-align right', () => {
    const css = generateClass('vbox(right)');
    console.log('Generated CSS for vbox(right):', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:flex-end');
    expect(css).toContain('text-align:right');
  });

  it('should generate vbox(stretch) with text-align justify', () => {
    const css = generateClass('vbox(stretch)');
    console.log('Generated CSS for vbox(stretch):', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:stretch');
    expect(css).toContain('text-align:justify');
  });

  it('should generate vbox(fill) with text-align justify', () => {
    const css = generateClass('vbox(fill)');
    console.log('Generated CSS for vbox(fill):', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:stretch');
    expect(css).toContain('text-align:justify');
  });

  it('should generate vbox(pack) with text-align center', () => {
    const css = generateClass('vbox(pack)');
    console.log('Generated CSS for vbox(pack):', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:center');
    expect(css).toContain('justify-content:center');
    expect(css).toContain('text-align:center');
  });

  it('should generate vbox with default alignment (no text-align in vbox rule)', () => {
    const css = generateClass('vbox');
    console.log('Generated CSS for vbox:', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:stretch');
    // Check that vbox rule itself includes text-align:justify by default
    expect(css).toMatch(/\.vbox\{[^}]*\}/);
    const vboxRule = css.match(/\.vbox\{[^}]*\}/)?.[0] || '';
    expect(vboxRule).toContain('text-align:justify');
  });

  it('should handle combined alignments vbox(center+middle)', () => {
    const css = generateClass('vbox(center+middle)');
    console.log('Generated CSS for vbox(center+middle):', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:center');
    expect(css).toContain('justify-content:center');
    expect(css).toContain('text-align:center');
  });
});