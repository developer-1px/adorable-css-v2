import { describe, it, expect } from 'vitest';
import { generateCSS } from '../index';

describe('vbox with text-align', () => {
  it('should generate vbox(center) with text-align center', () => {
    const css = generateCSS(['vbox(center)']);
    console.log('Generated CSS for vbox(center):', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:center');
    expect(css).toContain('text-align:center');
  });

  it('should generate vbox(left) with text-align left', () => {
    const css = generateCSS(['vbox(left)']);
    console.log('Generated CSS for vbox(left):', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:flex-start');
    expect(css).toContain('text-align:left');
  });

  it('should generate vbox(right) with text-align right', () => {
    const css = generateCSS(['vbox(right)']);
    console.log('Generated CSS for vbox(right):', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:flex-end');
    expect(css).toContain('text-align:right');
  });

  it('should generate vbox(stretch) with text-align justify', () => {
    const css = generateCSS(['vbox(stretch)']);
    console.log('Generated CSS for vbox(stretch):', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:stretch');
    expect(css).toContain('text-align:justify');
  });

  it('should generate vbox(fill) with text-align justify', () => {
    const css = generateCSS(['vbox(fill)']);
    console.log('Generated CSS for vbox(fill):', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:stretch');
    expect(css).toContain('text-align:justify');
  });

  it('should generate vbox(pack) with text-align center', () => {
    const css = generateCSS(['vbox(pack)']);
    console.log('Generated CSS for vbox(pack):', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:center');
    expect(css).toContain('justify-content:center');
    expect(css).toContain('text-align:center');
  });

  it('should generate vbox with default alignment (no text-align in vbox rule)', () => {
    const css = generateCSS(['vbox']);
    console.log('Generated CSS for vbox:', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:stretch');
    // Check that vbox rule itself doesn't include text-align
    expect(css).toMatch(/\.vbox\{[^}]*\}/);
    const vboxRule = css.match(/\.vbox\{[^}]*\}/)?.[0] || '';
    expect(vboxRule).not.toContain('text-align');
  });

  it('should handle combined alignments vbox(center+middle)', () => {
    const css = generateCSS(['vbox(center+middle)']);
    console.log('Generated CSS for vbox(center+middle):', css);
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:center');
    expect(css).toContain('justify-content:center');
    expect(css).toContain('text-align:center');
  });
});