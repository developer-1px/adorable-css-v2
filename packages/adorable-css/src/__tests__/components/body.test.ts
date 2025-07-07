import { describe, test, expect, beforeAll } from 'vitest';
import { generateClass } from '../../07-generator/generator';
import { bodyString } from '../../05-components/primitives/typography/body';
import { registerComponentsAsRule2 } from '../../05-components/register-components';

describe('Body Component', () => {
  beforeAll(() => {
    // Register components for testing
    registerComponentsAsRule2();
  });
  test('should generate default body component', () => {
    const css = generateClass('body()');
    console.log('Default body CSS:', css);
    
    expect(css).toContain('color:var(--gray-800)');
    expect(css).toContain('transition');
    expect(css).toContain('font-size');
    expect(css).toContain('line-height');
    expect(css).toContain('font-weight');
  });

  test('should generate body with size', () => {
    const css = generateClass('body(lg)');
    console.log('Body lg CSS:', css);
    
    expect(css).toContain('color:var(--gray-800)');
    expect(css).toContain('font-size:var(--font-lg)');
    expect(css).toContain('line-height:1.6');
  });

  test('should generate body with variant', () => {
    const css = generateClass('body(muted)');
    console.log('Body muted CSS:', css);
    
    expect(css).toContain('color:var(--gray-600)');
  });

  test('should work as function call', () => {
    const result = bodyString();
    console.log('bodyString() result:', result);
    
    expect(typeof result).toBe('string');
    expect(result).toContain('text(base/1.6)');
  });

  test('should work with arguments', () => {
    const result = bodyString('lg');
    console.log('bodyString(lg) result:', result);
    
    expect(typeof result).toBe('string');
    expect(result).toContain('text(lg/1.6)');
  });

  test('should handle prose size', () => {
    const css = generateClass('body(prose)');
    console.log('Body prose CSS:', css);
    
    expect(css).toContain('font-size:var(--font-lg)');
    expect(css).toContain('line-height:1.8');
    expect(css).toContain('max-width:prose');
  });

  test('should handle compound variants', () => {
    const css = generateClass('body(article)');
    console.log('Body article CSS:', css);
    
    expect(css).toContain('max-width:prose');
  });
});