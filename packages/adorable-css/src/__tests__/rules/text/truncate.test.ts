import { describe, it, expect } from 'vitest';
import { truncate } from '../../../03-rules/text/truncate';

describe('truncate', () => {
  it('should apply single-line truncation when no value provided', () => {
    const result = truncate();
    expect(result).toEqual({
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap'
    });
  });

  it('should apply single-line truncation for value "1"', () => {
    const result = truncate('1');
    expect(result).toEqual({
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap'
    });
  });

  it('should apply multi-line clamping for value "2"', () => {
    const result = truncate('2');
    expect(result).toEqual({
      'display': '-webkit-box',
      '-webkit-line-clamp': '2',
      '-webkit-box-orient': 'vertical',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    });
  });

  it('should apply multi-line clamping for value "3"', () => {
    const result = truncate('3');
    expect(result).toEqual({
      'display': '-webkit-box',
      '-webkit-line-clamp': '3',
      '-webkit-box-orient': 'vertical',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    });
  });

  it('should apply multi-line clamping for larger values', () => {
    const result = truncate('5');
    expect(result).toEqual({
      'display': '-webkit-box',
      '-webkit-line-clamp': '5',
      '-webkit-box-orient': 'vertical',
      'overflow': 'hidden',
      'text-overflow': 'ellipsis'
    });
  });

  it('should fallback to single-line for invalid values', () => {
    const result = truncate('invalid');
    expect(result).toEqual({
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap'
    });
  });

  it('should fallback to single-line for zero', () => {
    const result = truncate('0');
    expect(result).toEqual({
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap'
    });
  });

  it('should fallback to single-line for negative values', () => {
    const result = truncate('-1');
    expect(result).toEqual({
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap'
    });
  });
});