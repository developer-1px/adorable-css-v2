import { describe, it, expect } from 'vitest';
import { generateCSS } from '../../index';

describe('truncate integration', () => {
  it('should generate CSS for single-line truncation', () => {
    const css = generateCSS(['truncate']);
    expect(css).toContain('.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}');
  });

  it('should generate CSS for explicit single-line truncation', () => {
    const css = generateCSS(['truncate(1)']);
    expect(css).toContain('.truncate\\(1\\){overflow:hidden;text-overflow:ellipsis;white-space:nowrap}');
  });

  it('should generate CSS for 2-line clamping', () => {
    const css = generateCSS(['truncate(2)']);
    expect(css).toContain('.truncate\\(2\\){display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}');
  });

  it('should generate CSS for 3-line clamping', () => {
    const css = generateCSS(['truncate(3)']);
    expect(css).toContain('.truncate\\(3\\){display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}');
  });

  it('should work with multiple classes', () => {
    const css = generateCSS(['w(300)', 'truncate(2)', 'c(mute-700)']);
    expect(css).toContain('.w\\(300\\){width:300px}');
    expect(css).toContain('.truncate\\(2\\){display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}');
    expect(css).toContain('.c\\(mute-700\\){color:var(--mute-700)}');
  });
});