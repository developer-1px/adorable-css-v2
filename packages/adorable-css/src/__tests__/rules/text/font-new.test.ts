import { describe, it, expect } from 'vitest';
import { generateClass } from '../../07-generator/generator';

describe('Font Rule - Contextual Processing', () => {
  it('should handle font-size only', () => {
    const css = generateClass('text(16px)');
    expect(css).toContain('font-size:16px');
  });

  it('should handle font-size with token', () => {
    const css = generateClass('text(lg)');
    expect(css).toContain('font-size:var(--text-lg)');
  });

  it('should handle font-family keywords contextually', () => {
    const css1 = generateClass('text(16px/mono)');
    expect(css1).toContain('font-size:16px');
    expect(css1).toContain('font-family:monospace');

    const css2 = generateClass('text(lg/serif)');
    expect(css2).toContain('font-family:serif');

    const css3 = generateClass('text(lg/sans)');
    expect(css3).toContain('font-family:sans-serif');
  });

  it('should handle font-weight keywords contextually', () => {
    const css1 = generateClass('text(16px/bold)');
    expect(css1).toContain('font-weight:700');

    const css2 = generateClass('text(lg/black)');
    expect(css2).toContain('font-weight:900');

    const css3 = generateClass('text(lg/thin)');
    expect(css3).toContain('font-weight:100');

    const css4 = generateClass('text(lg/semibold)');
    expect(css4).toContain('font-weight:600');
  });

  it('should handle line-height keywords contextually', () => {
    // 'tight' is now a letter-spacing keyword
    const css1 = generateClass('text(16px/tight)');
    expect(css1).toContain('letter-spacing:-0.025em');

    const css2 = generateClass('text(lg/relaxed)');
    expect(css2).toContain('line-height:1.625');

    const css3 = generateClass('text(lg/normal)');
    expect(css3).toContain('line-height:1.5');
  });

  it('should handle letter-spacing keywords contextually', () => {
    const css1 = generateClass('text(16px/tighter)');
    expect(css1).toContain('letter-spacing:-0.05em');

    const css2 = generateClass('text(lg/wider)');
    expect(css2).toContain('letter-spacing:0.05em');

    const css3 = generateClass('text(lg/widest)');
    expect(css3).toContain('letter-spacing:0.1em');
  });

  it('should handle multiple contextual values', () => {
    const css = generateClass('text(lg/bold/tight/mono)');
    expect(css).toContain('font-size:var(--font-lg)');
    expect(css).toContain('font-weight:700');
    expect(css).toContain('letter-spacing:-0.025em'); // 'tight' is now letter-spacing
    expect(css).toContain('font-family:monospace');
  });

  it('should handle numeric line-height', () => {
    const css1 = generateClass('text(16px/1.5)');
    expect(css1).toContain('line-height:1.5');

    const css2 = generateClass('text(lg/2)');
    expect(css2).toContain('line-height:2');
  });

  it('should handle pixel line-height', () => {
    const css = generateClass('text(16px/24px)');
    expect(css).toContain('line-height:24px');
  });

  it('should handle percentage letter-spacing', () => {
    const css = generateClass('text(16px/-3.5%)');
    expect(css).toContain('letter-spacing:-0.035em');
  });

  it('should handle complex combinations', () => {
    const css1 = generateClass('text(2xl/1.1/-3%)');
    expect(css1).toContain('font-size:var(--font-2xl)');
    expect(css1).toContain('line-height:1.1');
    expect(css1).toContain('letter-spacing:-0.03em');

    const css2 = generateClass('text(sm/semibold)');
    expect(css2).toContain('font-size:var(--font-sm)');
    expect(css2).toContain('font-weight:600');
    expect(css2).not.toContain('line-height:semiboldpx'); // Should NOT have this error
  });

  // These are the cases that were failing before
  it('should fix previous errors', () => {
    // text(mono) should be font-family, not font-size
    const css1 = generateClass('text(mono)');
    expect(css1).not.toContain('font-size:mono');
    
    // text(black) should be font-weight, not font-size
    const css2 = generateClass('text(black)');
    expect(css2).not.toContain('font-size:black');
    
    // text(bold) should be font-weight, not font-size  
    const css3 = generateClass('text(bold)');
    expect(css3).not.toContain('font-size:bold');
    
    // text(medium) should be font-weight, not font-size
    const css4 = generateClass('text(medium)');
    expect(css4).not.toContain('font-size:medium');
  });
});