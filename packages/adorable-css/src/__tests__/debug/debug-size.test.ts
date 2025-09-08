import { describe, it, expect } from 'vitest';
import { processDoubleSize } from '../../04-rules/figma/layout/size-utils';

describe('Debug Size Utils', () => {
  it('should debug processDoubleSize function', () => {
    console.log('Testing: 16:9/w:300');
    const result1 = processDoubleSize('16:9/w:300');
    console.log('Result:', result1);
    
    console.log('Testing: w:400/16:9');
    const result2 = processDoubleSize('w:400/16:9');
    console.log('Result:', result2);
    
    console.log('Testing: 16:9');
    const result3 = processDoubleSize('16:9');
    console.log('Result:', result3);
    
    expect(result1).toBeTruthy();
  });
});