import { describe, it, expect } from 'vitest';
import { generateClass } from '../../07-generator/generator';

describe('truncate rules', () => {
  it('should generate CSS for single-line truncation', () => {
    const css = generateClass('truncate');
    expect(css).toBe('.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}');
  });

  it('should generate CSS for explicit single-line truncation', () => {
    const css = generateClass('truncate(1)');
    expect(css).toBe('.truncate\\(1\\){overflow:hidden;text-overflow:ellipsis;white-space:nowrap}');
  });

  it('should generate CSS for 2-line clamping', () => {
    const css = generateClass('truncate(2)');
    expect(css).toBe('.truncate\\(2\\){display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}');
  });

  it('should generate CSS for 3-line clamping', () => {
    const css = generateClass('truncate(3)');
    expect(css).toBe('.truncate\\(3\\){display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}');
  });

  it('should generate CSS individually for each class', () => {
    const widthCss = generateClass('w(300)');
    const truncateCss = generateClass('truncate(2)');
    const colorCss = generateClass('c(mute-700)');
    
    expect(widthCss).toBe('.w\\(300\\){width:300px}');
    expect(truncateCss).toBe('.truncate\\(2\\){display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}');
    expect(colorCss).toBe('.c\\(mute-700\\){color:var(--mute-700)}');
  });
});