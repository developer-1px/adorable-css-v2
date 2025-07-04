import { describe, it, expect } from 'vitest';
import { defineComponent } from '../components/defineComponent';

describe('defineComponent', () => {
  it('should return base classes when no arguments provided', () => {
    const component = defineComponent({
      base: 'inline-flex items(center)'
    });
    
    const result = component();
    expect(result).toBe('inline-flex items(center)');
  });

  it('should combine base, size, and variant classes', () => {
    const component = defineComponent({
      base: 'inline-flex items(center)',
      sizes: {
        sm: 'px(2) py(1)',
        default: 'px(4) py(2)',
        lg: 'px(6) py(3)'
      },
      variants: {
        primary: 'bg(blue-600) c(white)',
        secondary: 'bg(gray-100) c(gray-800)',
        default: 'bg(gray-900) c(white)'
      }
    });
    
    const result = component('primary/sm');
    expect(result).toBe('inline-flex items(center) px(2) py(1) bg(blue-600) c(white)');
  });

  it('should handle size-only argument', () => {
    const component = defineComponent({
      base: 'r(md)',
      sizes: {
        sm: 'px(2)',
        lg: 'px(6)'
      },
      variants: {
        default: 'bg(gray-100)'
      }
    });
    
    const result = component('lg');
    expect(result).toBe('r(md) px(6) bg(gray-100)');
  });

  it('should handle variant-only argument', () => {
    const component = defineComponent({
      base: 'r(md)',
      sizes: {
        default: 'px(4)'
      },
      variants: {
        primary: 'bg(blue-600)',
        secondary: 'bg(gray-100)'
      }
    });
    
    const result = component('secondary');
    expect(result).toBe('r(md) px(4) bg(gray-100)');
  });

  it('should use default size and variant when not specified', () => {
    const component = defineComponent({
      base: 'r(md)',
      sizes: {
        default: 'px(4)',
        sm: 'px(2)'
      },
      variants: {
        default: 'bg(gray-100)',
        primary: 'bg(blue-600)'
      }
    });
    
    const result = component();
    expect(result).toBe('r(md) px(4) bg(gray-100)');
  });

  it('should respect custom options', () => {
    const component = defineComponent({
      base: 'text',
      sizes: {
        xs: 'font(xs)',
        sm: 'font(sm)',
        md: 'font(base)'
      },
      variants: {
        muted: 'c(gray-600)',
        emphasis: 'c(gray-900)'
      }
    }, {
      sizeOptions: ['xs', 'sm', 'md'],
      defaultSize: 'md',
      defaultVariant: 'muted'
    });
    
    const result = component();
    expect(result).toBe('text font(base) c(gray-600)');
  });

  it('should handle arguments in any order', () => {
    const component = defineComponent({
      base: 'btn',
      sizes: {
        sm: 'h(32)',
        lg: 'h(48)'
      },
      variants: {
        primary: 'bg(blue-600)'
      }
    });
    
    // Both should work the same
    expect(component('primary/sm')).toBe('btn h(32) bg(blue-600)');
    expect(component('sm/primary')).toBe('btn h(32) bg(blue-600)');
  });
});

describe('defineComponent with compounds', () => {
  it('should apply compound variants', () => {
    const component = defineComponent({
      base: 'r(full) inline-flex',
      compounds: {
        'primary/sm': 'bg(blue-500) text(xs) px(2)',
        'primary/lg': 'bg(blue-600) text(lg) px(4)'
      }
    });
    
    const result = component('primary/sm');
    expect(result).toBe('r(full) inline-flex bg(blue-500) text(xs) px(2)');
  });

  it('should apply wildcard patterns for variants', () => {
    const component = defineComponent({
      base: 'btn',
      compounds: {
        'primary/*': 'text(white)',
        '*/sm': 'py(1)'
      }
    });
    
    const result = component('primary/sm');
    expect(result).toBe('btn text(white) py(1)');
  });

  it('should combine base definition with compound variants', () => {
    const component = defineComponent({
      base: 'btn',
      sizes: {
        sm: 'h(32)',
        lg: 'h(48)'
      },
      variants: {
        primary: 'bg(blue-600)',
        secondary: 'bg(gray-100)'
      },
      compounds: {
        'primary/lg': 'uppercase tracking(wide)'
      }
    });
    
    const result = component('primary/lg');
    expect(result).toBe('btn h(48) bg(blue-600) uppercase tracking(wide)');
  });

  it('should handle size wildcard patterns', () => {
    const component = defineComponent({
      base: 'badge',
      sizes: {
        sm: 'text(xs)',
        lg: 'text(lg)'
      },
      compounds: {
        '*/sm': 'px(2) py(0.5)',
        '*/lg': 'px(4) py(2)'
      }
    });
    
    const result = component('lg');
    expect(result).toBe('badge text(lg) px(4) py(2)');
  });
});