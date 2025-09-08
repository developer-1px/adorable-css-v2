import { describe, it, expect } from 'vitest';
import { generateClass } from '../../07-generator/generator';

// Initialize Rule2 handlers for tests
import { initializeRule2Handlers } from '../../04-rules/rule2-registry';
initializeRule2Handlers();

describe('Size with Aspect Ratio', () => {
  it('should handle aspect ratio with width constraint - format: ratio/w:value', () => {
    expect(generateClass('size(16:9/w:300)')).toContain('width:300px');
    expect(generateClass('size(16:9/w:300)')).toContain('aspect-ratio:16/9');
  });

  it('should handle aspect ratio with height constraint - format: ratio/h:value', () => {
    expect(generateClass('size(4:3/h:200)')).toContain('height:200px');
    expect(generateClass('size(4:3/h:200)')).toContain('aspect-ratio:4/3');
  });

  it('should handle width constraint first - format: w:value/ratio', () => {
    expect(generateClass('size(w:400/16:9)')).toContain('width:400px');
    expect(generateClass('size(w:400/16:9)')).toContain('aspect-ratio:16/9');
  });

  it('should handle height constraint first - format: h:value/ratio', () => {
    expect(generateClass('size(h:300/4:3)')).toContain('height:300px');
    expect(generateClass('size(h:300/4:3)')).toContain('aspect-ratio:4/3');
  });

  it('should handle different units', () => {
    expect(generateClass('size(16:9/w:50%)')).toContain('width:50%');
    expect(generateClass('size(16:9/w:20rem)')).toContain('width:20rem');
    expect(generateClass('size(h:100vh/16:9)')).toContain('height:100vh');
  });

  it('should handle token values', () => {
    expect(generateClass('size(16:9/w:lg)')).toContain('width:');
    expect(generateClass('size(h:xl/4:3)')).toContain('height:');
  });

  it('should fallback to original behavior for simple aspect ratio', () => {
    expect(generateClass('size(16:9)')).toContain('aspect-ratio:16/9');
    expect(generateClass('size(16:9)')).toContain('width:100%');
  });

  it('should handle decimal ratios', () => {
    expect(generateClass('size(1.5:1/w:300)')).toContain('aspect-ratio:1.5/1');
    expect(generateClass('size(w:200/2.5:1)')).toContain('aspect-ratio:2.5/1');
  });

  it('should work with complex constraint values', () => {
    expect(generateClass('size(16:9/w:calc(100%-20px))')).toContain('width:calc(100%-20px)');
    expect(generateClass('size(h:var(--height)/4:3)')).toContain('height:var(--height)');
  });
});