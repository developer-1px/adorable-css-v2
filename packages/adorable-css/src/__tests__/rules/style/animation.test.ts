import { describe, it, expect } from 'vitest';
import { animation } from '../../../04-rules/03-rules_deprecated/style/animation';

describe('animation rule', () => {
  it('should handle predefined animations', () => {
    expect(animation('fade-in')).toEqual({ animation: 'fade-in var(--duration-500) var(--ease-in-out)' });
    expect(animation('slide-up')).toEqual({ animation: 'slide-up var(--duration-500) var(--ease-in-out)' });
    expect(animation('bounce')).toEqual({ animation: 'bounce var(--duration-500) var(--ease-in-out)' });
    expect(animation('spin')).toEqual({ animation: 'spin var(--duration-1000) linear infinite' });
  });

  it('should handle duration with predefined animations', () => {
    expect(animation('fade-in/300')).toEqual({ animation: 'fade-in 300ms var(--ease-in-out)' });
    expect(animation('slide-up/1s')).toEqual({ animation: 'slide-up 1s var(--ease-in-out)' });
    expect(animation('bounce/500ms')).toEqual({ animation: 'bounce 500ms var(--ease-in-out)' });
  });

  it('should handle custom animation values', () => {
    expect(animation('my-animation 2s ease-in')).toEqual({ animation: 'my-animation 2s ease-in' });
    expect(animation('custom 1s linear infinite')).toEqual({ animation: 'custom 1s linear infinite' });
  });

  it('should handle none value', () => {
    expect(animation('none')).toEqual({ animation: 'none' });
  });

  it('should return empty object for no value', () => {
    expect(animation()).toEqual({});
  });
});