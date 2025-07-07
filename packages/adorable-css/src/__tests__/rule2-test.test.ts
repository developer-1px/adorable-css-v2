import { describe, it, expect, beforeAll } from 'vitest';
import { generateClass } from '../07-generator/generator';
import { initializeRule2Handlers } from '../04-rules';
import { getRegisteredRule2HandlerNames } from '../04-rules/rule2-registry';
import { parseAdorableCSS } from '../01-core/parser/parser';

describe('Rule2 Performance System', () => {
  beforeAll(() => {
    // Ensure Rule2 handlers are initialized
    initializeRule2Handlers();
  });
  
  it('should have Rule2 handlers registered', () => {
    const registeredHandlers = getRegisteredRule2HandlerNames();
    console.log('Registered Rule2 handlers:', registeredHandlers);
    expect(registeredHandlers).toContain('hbox');
    expect(registeredHandlers).toContain('vbox');
    expect(registeredHandlers).toContain('pack');
    expect(registeredHandlers).toContain('w');
    expect(registeredHandlers).toContain('h');
  });
  
  it('should use Rule2 handler for padding', () => {
    const css = generateClass('p(20)');
    // Rule2 uses spacing tokens and returns minified CSS
    expect(css).toContain('padding:');
    expect(css).toContain('20px');
  });

  it('should use Rule2 handler for color', () => {
    const css = generateClass('c(red-500)');
    expect(css).toContain('color:');
    expect(css).toContain('var(--red-500');
  });

  it('should use Rule2 handler for bg', () => {
    const css = generateClass('bg(blue-500)');
    expect(css).toContain('background-color:');
    expect(css).toContain('var(--blue-500');
  });

  it('should use Rule2 handler for margin', () => {
    const css = generateClass('m(10)');
    expect(css).toContain('margin:');
    expect(css).toContain('10px');
  });

  it('should use Rule2 handler for font', () => {
    const css = generateClass('text(xl)');
    expect(css).toContain('font-size:');
    expect(css).toContain('var(--font-xl)');
  });

  it('should handle complex padding values', () => {
    const css = generateClass('p(10/20/30/40)');
    expect(css).toContain('padding:');
    expect(css).toContain('10px 20px 30px 40px');
  });

  it('should handle spacing tokens', () => {
    const css = generateClass('p(md)');
    expect(css).toContain('padding:');
    expect(css).toContain('var(--spacing-md)');
  });

  it('should use Rule2 handler for text', () => {
    const css = generateClass('text(center)');
    expect(css).toContain('text-align:center');
  });

  it('should use Rule2 handler for text complex', () => {
    const css = generateClass('text(center+middle)');
    expect(css).toContain('text-align:center');
    expect(css).toContain('display:flex');
  });

  it('should use Rule2 handler for text nowrap', () => {
    const css = generateClass('text(nowrap)');
    expect(css).toContain('white-space:nowrap');
  });

  it('should use Rule2 handler for text combinations', () => {
    const css = generateClass('text(center+nowrap)');
    expect(css).toContain('text-align:center');
    expect(css).toContain('white-space:nowrap');
  });

  it('should use Rule2 handler for text layout pack', () => {
    const css = generateClass('text(pack)');
    expect(css).toContain('display:flex');
    expect(css).toContain('justify-content:center');
    expect(css).toContain('text-align:center');
  });

  it('should use Rule2 handler for bg gradient', () => {
    const css = generateClass('bg(to-br/mute-900..mute-800)');
    expect(css).toContain('background:linear-gradient');
    expect(css).toContain('to bottom right');
  });

  it('should use Rule2 handler for text gradient', () => {
    const css = generateClass('c(to-br/primary..accent)');
    expect(css).toContain('background:linear-gradient');
    expect(css).toContain('background-clip:text');
    expect(css).toContain('color:transparent');
  });

  it('should use Rule2 handler for gap', () => {
    const css = generateClass('gap(xl)');
    expect(css).toContain('gap:');
    expect(css).toContain('var(--spacing-xl)');
  });

  it('should use Rule2 handler for gap auto', () => {
    const css = generateClass('gap(auto)');
    expect(css).toContain('justify-content:space-between');
  });

  it('should use Rule2 handler for gap-x', () => {
    const css = generateClass('gap-x(lg)');
    expect(css).toContain('column-gap:');
    expect(css).toContain('var(--spacing-lg)');
  });

  it('should use Rule2 handler for width', () => {
    const css = generateClass('w(full)');
    expect(css).toContain('width:100%');
  });

  it('should use Rule2 handler for width with token', () => {
    const css = generateClass('w(lg)');
    expect(css).toContain('width:');
    expect(css).toContain('var(--size-lg)');
  });

  it('should use Rule2 handler for width fill', () => {
    const css = generateClass('w(fill)');
    expect(css).toContain('flex:1');
  });

  it('should use Rule2 handler for height', () => {
    const css = generateClass('h(200)');
    expect(css).toContain('height:200px');
  });

  it('should use Rule2 handler for height fill', () => {
    const css = generateClass('h(fill)');
    expect(css).toContain('flex:1');
  });

  it('should use Rule2 handler for size', () => {
    const css = generateClass('size(32)');
    expect(css).toContain('width:32px');
    expect(css).toContain('height:32px');
  });

  it('should use Rule2 handler for size aspect ratio', () => {
    const css = generateClass('size(16:9)');
    expect(css).toContain('aspect-ratio:16/9');
    expect(css).toContain('width:100%');
  });

  it('should use Rule2 handler for size dimensions', () => {
    const css = generateClass('size(320x200)');
    expect(css).toContain('width:320px');
    expect(css).toContain('height:200px');
  });

  it('should use Rule2 handler for max-w', () => {
    const css = generateClass('max-w(full)');
    expect(css).toContain('max-width:100%');
  });

  it('should use Rule2 handler for min-h', () => {
    const css = generateClass('min-h(screen)');
    expect(css).toContain('min-height:100vh');
  });

  it('should use Rule2 handler for hbox', () => {
    const css = generateClass('hbox()');
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:row');
    expect(css).toContain('align-items:center');
    expect(css).toContain('justify-content:flex-start');
  });

  it('should use Rule2 handler for hbox pack', () => {
    const css = generateClass('hbox(pack)');
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:row');
    expect(css).toContain('align-items:center');
    expect(css).toContain('justify-content:center');
  });

  it('should use Rule2 handler for hbox with alignment', () => {
    const css = generateClass('hbox(center+middle)');
    expect(css).toContain('display:flex');
    expect(css).toContain('align-items:center');
    expect(css).toContain('justify-content:center');
  });

  it('should use Rule2 handler for vbox', () => {
    const css = generateClass('vbox()');
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:stretch');
    expect(css).toContain('text-align:justify');
  });

  it('should use Rule2 handler for vbox pack', () => {
    const css = generateClass('vbox(pack)');
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:column');
    expect(css).toContain('align-items:center');
    expect(css).toContain('justify-content:center');
    expect(css).toContain('text-align:center');
  });

  it('should use Rule2 handler for pack', () => {
    const css = generateClass('pack()');
    expect(css).toContain('display:flex');
    expect(css).toContain('flex-direction:row');
    expect(css).toContain('align-items:center');
    expect(css).toContain('justify-content:center');
  });

  it('should include child flex rules', () => {
    const css = generateClass('hbox()');
    expect(css).toContain(':where(.hbox\\(\\)>*){flex:0 0 auto}');
  });

  it('should use Rule2 handler for truncate', () => {
    const css = generateClass('truncate()');
    expect(css).toContain('overflow:hidden');
    expect(css).toContain('text-overflow:ellipsis');
    expect(css).toContain('white-space:nowrap');
  });

  it('should use Rule2 handler for truncate with lines', () => {
    const css = generateClass('truncate(2)');
    expect(css).toContain('display:-webkit-box');
    expect(css).toContain('-webkit-line-clamp:2');
    expect(css).toContain('-webkit-box-orient:vertical');
    expect(css).toContain('overflow:hidden');
  });

  it('should use Rule2 handler for truncate with invalid value', () => {
    const css = generateClass('truncate(invalid)');
    expect(css).toContain('overflow:hidden');
    expect(css).toContain('text-overflow:ellipsis');
    expect(css).toContain('white-space:nowrap');
  });

  it('should use Rule2 handler for border', () => {
    const css = generateClass('b()');
    expect(css).toContain('border:1px solid currentColor');
  });

  it('should use Rule2 handler for border with width', () => {
    const css = generateClass('b(2)');
    expect(css).toContain('border:2px solid currentColor');
  });

  it('should use Rule2 handler for border with complex value', () => {
    const css = generateClass('b(1/solid/red)');
    expect(css).toContain('border:1px solid');
  });

  it('should use Rule2 handler for border radius', () => {
    const css = generateClass('r()');
    expect(css).toContain('border-radius:');
    // The actual value depends on token implementation
  });

  it('should use Rule2 handler for border radius with value', () => {
    const css = generateClass('r(lg)');
    expect(css).toContain('border-radius:');
    // The actual value depends on token implementation
  });

  it('should use Rule2 handler for border top', () => {
    const css = generateClass('bt(1/solid/blue)');
    expect(css).toContain('border-top:1px solid');
  });

  it('should use Rule2 handler for opacity', () => {
    const css = generateClass('opacity(0.5)');
    expect(css).toContain('opacity:0.5');
  });

  it('should use Rule2 handler for blur', () => {
    const css = generateClass('blur(4)');
    expect(css).toContain('filter:blur(4px)');
  });

  it('should use Rule2 handler for brightness', () => {
    const css = generateClass('brightness(1.2)');
    expect(css).toContain('filter:brightness(1.2)');
  });

});