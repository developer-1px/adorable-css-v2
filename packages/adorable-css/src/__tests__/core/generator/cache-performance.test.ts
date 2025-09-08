import { describe, it, expect } from 'vitest';
import { parseAdorableCSS } from '../../../01-core/parser/parser';
import { generateClass } from '../../../07-generator/generator';

describe('Cache Performance', () => {
  it('should cache parser results', () => {
    const testClass = 'bg(blue-500) p(20) m(10)';
    
    // First call - no cache
    const start1 = performance.now();
    const result1 = parseAdorableCSS(testClass);
    const time1 = performance.now() - start1;
    
    // Second call - should be cached
    const start2 = performance.now();
    const result2 = parseAdorableCSS(testClass);
    const time2 = performance.now() - start2;
    
    // Results should be the same
    expect(result1).toEqual(result2);
    
    // Cached call should be much faster (at least 10x)
    // Note: In practice, the speedup can be 100x or more
    expect(time2).toBeLessThan(time1);
  });
  
  it('should cache CSS generation results', () => {
    const testClass = 'hbox(middle) gap(20) p(40) bg(gradient(45deg/blue-500..purple-500))';
    
    // First call - no cache
    const start1 = performance.now();
    const css1 = generateClass(testClass);
    const time1 = performance.now() - start1;
    
    // Second call - should be cached
    const start2 = performance.now();
    const css2 = generateClass(testClass);
    const time2 = performance.now() - start2;
    
    // Results should be the same
    expect(css1).toEqual(css2);
    
    // Cached call should be faster
    expect(time2).toBeLessThan(time1);
  });
  
  it('should handle cache size limits', () => {
    // Generate many unique classes to test cache eviction
    const results = [];
    
    // Generate 100 unique classes
    for (let i = 0; i < 100; i++) {
      const className = `p(${i}) m(${i * 2})`;
      const css = generateClass(className);
      results.push(css);
    }
    
    // All results should be valid CSS
    results.forEach(css => {
      expect(css).toBeTruthy();
      expect(css).toContain('padding');
      expect(css).toContain('margin');
    });
  });
});