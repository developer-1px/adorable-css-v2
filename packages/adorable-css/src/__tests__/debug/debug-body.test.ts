import { describe, test, expect } from 'vitest';
import { generateClass, generateCSS } from '../../07-generator/generator';
import { getRule2Definition } from '../../04-rules/rule2-registry';
import { parseAdorableCSS } from '../../01-core/parser/parser';
import { registerComponentsAsRule2 } from '../../05-components/register-components';

describe('Debug Body Component', () => {
  test('should have body rule2 registered', () => {
    // Register components manually for testing
    registerComponentsAsRule2();
    
    const rule2Def = getRule2Definition('body');
    console.log('Body rule2 definition:', rule2Def);
    expect(rule2Def).toBeDefined();
    expect(rule2Def?.handler).toBeDefined();
  });

  test('should parse body() correctly', () => {
    const parsed = parseAdorableCSS('body()');
    console.log('Parsed body():', JSON.stringify(parsed, null, 2));
    expect(parsed.value).toHaveLength(1);
    expect(parsed.value[0].selector.name).toBe('body');
  });

  test('should call rule2 handler directly', () => {
    const rule2Def = getRule2Definition('body');
    if (rule2Def) {
      const parsed = parseAdorableCSS('body()');
      const node = parsed.value[0];
      console.log('Calling handler with node:', node);
      
      try {
        const result = rule2Def.handler(node);
        console.log('Handler result:', result);
        expect(result).toBeTruthy();
      } catch (e) {
        console.error('Handler error:', e);
      }
    }
  });

  test('should generate CSS for multiple body classes', () => {
    const css = generateCSS(['body()', 'body(lg)', 'body(muted)']);
    console.log('Generated CSS for multiple body classes:', css);
    expect(css).toBeTruthy();
  });

  test('should debug generateClass step by step', () => {
    console.log('Testing generateClass step by step...');
    
    // Test simple class first
    const simpleCSS = generateClass('c(red-500)');
    console.log('Simple class c(red-500):', simpleCSS);
    
    // Test body component
    const bodyCSS = generateClass('body()');
    console.log('Body component body():', bodyCSS);
    
    // Test with different syntax
    const bodyLgCSS = generateClass('body(lg)');
    console.log('Body lg body(lg):', bodyLgCSS);
  });
});