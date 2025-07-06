import { describe, it, expect } from 'vitest';
import { prose } from '../../components/patterns/prose';
import { headingString } from '../../components/primitives/typography/heading';

describe('prose heading integration', () => {
  it('should test heading component directly', () => {
    const result = headingString('h1');
    console.log('Heading result:', result);
    console.log('Type:', typeof result);
    console.log('Is array:', Array.isArray(result));
  });

  it('should properly handle heading component in selectors', () => {
    const result = prose();
    
    if (Array.isArray(result)) {
      const [classes, cssRule] = result;
      console.log('Prose classes:', classes);
      console.log('CSS Rule h1:', cssRule['& h1']);
      
      // h1 selector should have CSS properties from heading component
      expect(cssRule['& h1']).toBeDefined();
      
      // Log the actual CSS properties to debug
      const h1CSS = cssRule['& h1'];
      if (h1CSS && typeof h1CSS === 'object') {
        console.log('h1 CSS properties:', Object.keys(h1CSS));
        console.log('h1 font-size:', h1CSS['font-size']);
      }
    }
  });
});