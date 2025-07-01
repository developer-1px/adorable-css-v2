import { describe, it, expect, beforeEach } from 'vitest';
import { createCSSPipeline } from '../core/generators/pipeline/create-pipeline';
import { CacheProcessor } from '../core/generators/pipeline/processors/cache-processor';

describe('CSS Pipeline', () => {
  // Mock functions for state and responsive
  const mockGenerateStateCSS = (className: string) => {
    if (className === 'hover:c(red-500)') {
      return '.hover\\:c\\(red-500\\):hover{color:oklch(63.7% 0.208 25.3)}';
    }
    return '';
  };
  
  const mockGenerateResponsiveCSS = (className: string) => {
    if (className === 'md:w(100)') {
      return '@media (min-width: 768px){.md\\:w\\(100\\){width:100px}}';
    }
    return '';
  };
  
  beforeEach(() => {
    // Clear cache before each test
    const cache = new CacheProcessor();
  });
  
  it('should handle state classes', () => {
    const pipeline = createCSSPipeline({
      generateStateCSS: mockGenerateStateCSS,
      generateResponsiveCSS: mockGenerateResponsiveCSS
    });
    
    const result = pipeline.execute('hover:c(red-500)');
    expect(result).toBe('.hover\\:c\\(red-500\\):hover{color:oklch(63.7% 0.208 25.3)}');
  });
  
  it('should handle responsive classes', () => {
    const pipeline = createCSSPipeline({
      generateStateCSS: mockGenerateStateCSS,
      generateResponsiveCSS: mockGenerateResponsiveCSS
    });
    
    const result = pipeline.execute('md:w(100)');
    expect(result).toBe('@media (min-width: 768px){.md\\:w\\(100\\){width:100px}}');
  });
  
  it('should handle cache', () => {
    const pipeline = createCSSPipeline({
      generateStateCSS: mockGenerateStateCSS,
      generateResponsiveCSS: mockGenerateResponsiveCSS
    });
    
    // First call
    const result1 = pipeline.execute('hover:c(red-500)');
    CacheProcessor.cacheResult('hover:c(red-500)', result1);
    
    // Second call should use cache
    const result2 = pipeline.execute('hover:c(red-500)');
    expect(result2).toBe(result1);
  });
  
  it('should return empty string for invalid input', () => {
    const pipeline = createCSSPipeline({
      generateStateCSS: mockGenerateStateCSS,
      generateResponsiveCSS: mockGenerateResponsiveCSS
    });
    
    const result = pipeline.execute('invalid{{syntax');
    expect(result).toBe('');
  });
});