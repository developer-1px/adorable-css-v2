import { describe, it, expect } from 'vitest';
import { codeString } from '../../components/primitives/code';

describe('code component', () => {
  it('should generate default inline code style', () => {
    const result = codeString();
    expect(result).toBe('mono caption(sm) bg(gray-100) px(xs) py(0.5) r(sm)');
  });

  it('should handle size variants', () => {
    expect(codeString('xs')).toBe('mono caption(xs)');
    expect(codeString('sm')).toBe('mono caption(sm)');
    expect(codeString('md')).toBe('mono body(sm)');
    expect(codeString('lg')).toBe('mono body(md)');
    expect(codeString('base')).toBe('mono body(sm)');
  });

  it('should handle style variants', () => {
    expect(codeString('inline')).toBe('mono caption(sm) bg(gray-100) px(xs) py(0.5) r(sm)');
    expect(codeString('block')).toBe('mono body(sm) block bg(gray-900) c(gray-100) p(lg) r(lg) overflow-x(auto)');
    expect(codeString('minimal')).toBe('mono caption(sm)');
  });

  it('should handle colored variants', () => {
    expect(codeString('primary')).toBe('mono caption(sm) bg(primary-100) c(primary-700) px(xs) py(0.5) r(sm)');
    expect(codeString('success')).toBe('mono caption(sm) bg(success-100) c(success-700) px(xs) py(0.5) r(sm)');
    expect(codeString('warning')).toBe('mono caption(sm) bg(warning-100) c(warning-900) px(xs) py(0.5) r(sm)');
    expect(codeString('error')).toBe('mono caption(sm) bg(error-100) c(error-700) px(xs) py(0.5) r(sm)');
  });

  it('should handle custom args', () => {
    const result = codeString('custom-class');
    expect(result).toBe('mono custom-class');
  });
});