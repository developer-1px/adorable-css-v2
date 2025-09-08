import { describe, test, expect } from 'vitest';
import { generateClass } from '../../07-generator/generator';

describe('text() with text alignment', () => {
  test('should still support text alignment', () => {
    expect(generateClass('text(center)')).toBe('.text\\(center\\){text-align:center}');
    expect(generateClass('text(left)')).toBe('.text\\(left\\){text-align:left}');
    expect(generateClass('text(right)')).toBe('.text\\(right\\){text-align:right}');
    expect(generateClass('text(justify)')).toBe('.text\\(justify\\){text-align:justify}');
  });
});