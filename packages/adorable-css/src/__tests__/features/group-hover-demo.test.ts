import { describe, test, expect } from 'vitest';
import { generateCSS } from '../../07-generator/generator';

describe('Group Hover Demo', () => {
  test('should generate complete group-hover demo CSS', () => {
    const classes = [
      'group',
      'p(lg)', 
      'border(1/gray-200)',
      'r(lg)',
      'cursor(pointer)',
      'transition(all/200ms)',
      'hover:shadow(lg)',
      'hover:border(1/blue-500)',
      'group-hover:c(blue-500)',
      'group-hover:bg(blue-50)',
      'group-hover:translate-y(-2px)'
    ];
    
    const css = generateCSS(classes);
    console.log('Generated Group Hover Demo CSS:');
    console.log(css);
    
    // Check for group hover states
    expect(css).toContain('.group:hover');
    expect(css).toContain('color:var(--blue-500)');
    expect(css).toContain('background-color:var(--blue-50)');
    expect(css).toContain('transform:translateY(-2px)');
    
    // Check for regular hover states  
    expect(css).toContain(':hover');
    expect(css).toContain('box-shadow');
    expect(css).toContain('border');
    
    // Check for base styles
    expect(css).toContain('padding');
    expect(css).toContain('border-radius');
    expect(css).toContain('cursor:pointer');
    expect(css).toContain('transition');
  });

  test('should demonstrate complex group states', () => {
    const classes = [
      'group',
      'relative',
      'p(md)',
      'group-hover:scale(1.05)',
      'group-focus:opacity(90)',
      'group-active:scale(0.95)'
    ];
    
    const css = generateCSS(classes);
    console.log('Complex Group States CSS:');
    console.log(css);
    
    expect(css).toContain('.group:hover');
    expect(css).toContain('.group:focus');
    expect(css).toContain('.group:active');
    expect(css).toContain('transform:scale(1.05)');
    expect(css).toContain('opacity:90');
    expect(css).toContain('transform:scale(0.95)');
  });
});