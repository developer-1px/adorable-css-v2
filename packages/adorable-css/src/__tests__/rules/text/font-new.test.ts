import { describe, it, expect } from 'vitest';
import { generateClass } from '../../../07-generator/generator';

describe('Font Rule - Contextual Processing', () => {
  it('should handle font-size only', () => {
    const css = generateClass('font(16px)');
    expect(css).toContain('font-size:16px');
  });

  it('should handle font-size with token', () => {
    const css = generateClass('font(lg)');
    expect(css).toContain('font-size:var(--font-lg)');
  });

  it('should handle font-family keywords contextually', () => {
    const css1 = generateClass('font(16px/mono)');
    expect(css1).toContain('font-size:16px');
    expect(css1).toContain('font-family:monospace');

    const css2 = generateClass('font(lg/serif)');
    expect(css2).toContain('font-family:serif');

    const css3 = generateClass('font(lg/sans)');
    expect(css3).toContain('font-family:sans-serif');
  });

  it('should handle font-weight keywords contextually', () => {
    const css1 = generateClass('font(16px/bold)');
    expect(css1).toContain('font-weight:700');

    const css2 = generateClass('font(lg/black)');
    expect(css2).toContain('font-weight:900');

    const css3 = generateClass('font(lg/thin)');
    expect(css3).toContain('font-weight:100');

    const css4 = generateClass('font(lg/semibold)');
    expect(css4).toContain('font-weight:600');
  });

  it('should handle line-height keywords contextually', () => {
    const css1 = generateClass('font(16px/tight)');
    expect(css1).toContain('line-height:1.25');

    const css2 = generateClass('font(lg/relaxed)');
    expect(css2).toContain('line-height:1.625');

    const css3 = generateClass('font(lg/normal)');
    expect(css3).toContain('line-height:1.5');
  });

  it('should handle letter-spacing keywords contextually', () => {
    const css1 = generateClass('font(16px/tighter)');
    expect(css1).toContain('letter-spacing:-0.05em');

    const css2 = generateClass('font(lg/wider)');
    expect(css2).toContain('letter-spacing:0.05em');

    const css3 = generateClass('font(lg/widest)');
    expect(css3).toContain('letter-spacing:0.1em');
  });

  it('should handle multiple contextual values', () => {
    const css = generateClass('font(lg/bold/tight/mono)');
    expect(css).toContain('font-size:var(--font-lg)');
    expect(css).toContain('font-weight:700');
    expect(css).toContain('line-height:1.25');
    expect(css).toContain('font-family:monospace');
  });

  it('should handle numeric line-height', () => {
    const css1 = generateClass('font(16px/1.5)');
    expect(css1).toContain('line-height:1.5');

    const css2 = generateClass('font(lg/2)');
    expect(css2).toContain('line-height:2');
  });

  it('should handle pixel line-height', () => {
    const css = generateClass('font(16px/24px)');
    expect(css).toContain('line-height:24px');
  });

  it('should handle percentage letter-spacing', () => {
    const css = generateClass('font(16px/-3.5%)');
    expect(css).toContain('letter-spacing:-0.035em');
  });

  it('should handle complex combinations', () => {
    const css1 = generateClass('font(2xl/1.1/-3%)');
    expect(css1).toContain('font-size:var(--font-2xl)');
    expect(css1).toContain('line-height:1.1');
    expect(css1).toContain('letter-spacing:-0.03em');

    const css2 = generateClass('font(sm/semibold)');
    expect(css2).toContain('font-size:var(--font-sm)');
    expect(css2).toContain('font-weight:600');
    expect(css2).not.toContain('line-height:semiboldpx'); // Should NOT have this error
  });

  // These are the cases that were failing before
  it('should fix previous errors', () => {
    // font(mono) should be font-family, not font-size
    const css1 = generateClass('font(mono)');
    expect(css1).not.toContain('font-size:mono');
    
    // font(black) should be font-weight, not font-size
    const css2 = generateClass('font(black)');
    expect(css2).not.toContain('font-size:black');
    
    // font(bold) should be font-weight, not font-size  
    const css3 = generateClass('font(bold)');
    expect(css3).not.toContain('font-size:bold');
    
    // font(medium) should be font-weight, not font-size
    const css4 = generateClass('font(medium)');
    expect(css4).not.toContain('font-size:medium');
  });
});