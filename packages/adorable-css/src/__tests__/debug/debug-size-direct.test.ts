import { describe, it, expect } from 'vitest';
import { processDoubleSize } from '../../04-rules/figma/layout/size-utils';

describe('Debug processDoubleSize Direct', () => {
  it('should test values directly', () => {
    console.log('Testing 16:9/w:300:', processDoubleSize('16:9/w:300'));
    console.log('Testing w:400/16:9:', processDoubleSize('w:400/16:9'));
    console.log('Testing 4:3/h:200:', processDoubleSize('4:3/h:200'));
    console.log('Testing h:300/4:3:', processDoubleSize('h:300/4:3'));
    
    expect(processDoubleSize('16:9/w:300')).toContain('width:300px');
    expect(processDoubleSize('16:9/w:300')).toContain('aspect-ratio:16/9');
  });
});