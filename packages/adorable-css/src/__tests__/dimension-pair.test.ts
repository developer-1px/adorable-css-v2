import { describe, test, expect } from 'vitest';
import { generateCSSFromAdorableCSS } from '../core/parser/generator';

describe('Smart Container (Dimension Pair Syntax)', () => {
  test('should create smart container with basic dimensions', () => {
    const css = generateCSSFromAdorableCSS('64x64');
    expect(css).toContain('width:64px');
    expect(css).toContain('height:64px');
    
    // Smart container layout features
    expect(css).toContain('display:flex');
    expect(css).toContain('align-items:center');
    expect(css).toContain('justify-content:center');
    expect(css).toContain('overflow:hidden');
    expect(css).toContain('position:relative');
  });

  test('should include image optimization for child elements', () => {
    const css = generateCSSFromAdorableCSS('64x64');
    
    // Image optimization rules (& img gets converted to actual selector)
    expect(css).toContain(' img{');
    expect(css).toContain('object-fit:cover');
    expect(css).toContain('object-position:center');
    expect(css).toContain('width:100%;height:100%');
  });

  test('should handle different dimension units with smart container', () => {
    const css1 = generateCSSFromAdorableCSS('100x50');
    expect(css1).toContain('width:100px');
    expect(css1).toContain('height:50px');
    expect(css1).toContain('display:flex');

    const css2 = generateCSSFromAdorableCSS('100%x200px');
    expect(css2).toContain('width:100%');
    expect(css2).toContain('height:200px');
    expect(css2).toContain('align-items:center');
  });

  test('should handle decimal values with smart features', () => {
    const css = generateCSSFromAdorableCSS('10.5x20.8');
    expect(css).toContain('width:10.5px');
    expect(css).toContain('height:20.8px');
    expect(css).toContain('justify-content:center');
    expect(css).toContain('overflow:hidden');
  });

  test('should generate complete smart container CSS', () => {
    const css = generateCSSFromAdorableCSS('64x64');
    expect(css).toMatch(/^\.[\w\\-\s]+\{.*\}.*\{.*\}$/); // Main rule + nested rule
    
    // Verify it's a complete smart container, not just dimensions
    expect(css.split(';').length).toBeGreaterThan(4); // More than just width/height
  });

  test('should differentiate from basic w() h() utilities', () => {
    const smartContainer = generateCSSFromAdorableCSS('64x64');
    
    // Smart container should have layout features that w() h() don't have
    expect(smartContainer).toContain('display:flex');
    expect(smartContainer).toContain('object-fit:cover');
    
    // Should be more comprehensive than basic dimensions
    expect(smartContainer.length).toBeGreaterThan(100); // Substantial CSS
  });
});