import { describe, it, expect } from 'vitest';
import { defineComponent, defineThemedComponent } from '../components/defineComponent-advanced';

describe('defineComponent', () => {
  it('should apply base classes', () => {
    const component = defineComponent({
      base: 'inline-flex items(center) gap(8)'
    });
    
    const result = component();
    expect(result).toBe('inline-flex items(center) gap(8)');
  });

  it('should combine base, size, and variant', () => {
    const component = defineComponent({
      base: 'inline-flex items(center)',
      sizes: {
        sm: 'h(32) px(12)',
        default: 'h(40) px(16)',
        lg: 'h(48) px(20)'
      },
      variants: {
        primary: 'bg(blue-600) c(white)',
        secondary: 'bg(gray-100) c(gray-900)'
      }
    });
    
    const result = component('primary/lg');
    expect(result).toBe('inline-flex items(center) h(48) px(20) bg(blue-600) c(white)');
  });

  it('should apply compound variants', () => {
    const component = defineComponent({
      base: 'btn',
      sizes: {
        sm: 'text(sm)',
        lg: 'text(lg)'
      },
      variants: {
        primary: 'bg(blue-600)',
        secondary: 'bg(gray-100)'
      },
      compoundVariants: [
        {
          variant: 'primary',
          size: 'lg',
          class: 'uppercase tracking(wide)'
        }
      ]
    });
    
    const result = component('primary/lg');
    expect(result).toBe('btn text(lg) bg(blue-600) uppercase tracking(wide)');
  });

  it('should apply compound variants with array matches', () => {
    const component = defineComponent({
      base: 'btn',
      sizes: {
        sm: 'px(2)',
        lg: 'px(4)'
      },
      variants: {
        primary: 'bg(blue-600)',
        secondary: 'bg(gray-100)',
        danger: 'bg(red-600)'
      },
      compoundVariants: [
        {
          variant: ['secondary', 'danger'],
          size: 'sm',
          class: 'border(2)'
        }
      ]
    });
    
    expect(component('secondary/sm')).toBe('btn px(2) bg(gray-100) border(2)');
    expect(component('danger/sm')).toBe('btn px(2) bg(red-600) border(2)');
    expect(component('primary/sm')).toBe('btn px(2) bg(blue-600)');
  });

  it('should apply state classes', () => {
    const component = defineComponent({
      base: 'btn',
      variants: {
        primary: 'bg(blue-600)'
      },
      states: {
        hover: 'shadow(lg) scale(105)',
        focus: 'ring(2/blue-500)',
        disabled: 'opacity(50) cursor(not-allowed)'
      }
    });
    
    const result = component('primary');
    expect(result).toBe('btn bg(blue-600) hover:shadow(lg) scale(105) focus:ring(2/blue-500) disabled:opacity(50) cursor(not-allowed)');
  });

  it('should handle default size and variant', () => {
    const component = defineComponent({
      base: 'btn',
      sizes: {
        default: 'h(40) px(16)'
      },
      variants: {
        default: 'bg(gray-900) c(white)'
      }
    });
    
    const result = component();
    expect(result).toBe('btn h(40) px(16) bg(gray-900) c(white)');
  });

  it('should handle compound variants with no size restriction', () => {
    const component = defineComponent({
      base: 'link',
      sizes: {
        sm: 'text(sm)',
        lg: 'text(lg)'
      },
      variants: {
        link: 'underline'
      },
      compoundVariants: [
        {
          variant: 'link',
          class: 'hover:underline-offset(4)'
        }
      ]
    });
    
    expect(component('link/sm')).toBe('link text(sm) underline hover:underline-offset(4)');
    expect(component('link/lg')).toBe('link text(lg) underline hover:underline-offset(4)');
  });
});

describe('defineThemedComponent', () => {
  it('should apply light theme only when dark is not provided', () => {
    const component = defineThemedComponent({
      light: {
        base: 'bg(white) c(gray-900)',
        variants: {
          elevated: 'shadow(lg)'
        }
      }
    });
    
    const result = component('elevated');
    expect(result).toBe('bg(white) c(gray-900) shadow(lg)');
  });

  it('should combine light and dark themes', () => {
    const component = defineThemedComponent({
      light: {
        base: 'bg(white) c(gray-900)',
        variants: {
          elevated: 'shadow(lg)'
        }
      },
      dark: {
        base: 'bg(gray-800) c(white)',
        variants: {
          elevated: 'shadow(2xl/black.5)'
        }
      }
    });
    
    const result = component('elevated');
    expect(result).toBe('bg(white) c(gray-900) shadow(lg) dark:bg(gray-800) dark:c(white) dark:shadow(2xl/black.5)');
  });

  it('should handle base-only themes', () => {
    const component = defineThemedComponent({
      light: {
        base: 'bg(white) border(gray-200)'
      },
      dark: {
        base: 'bg(gray-800) border(gray-700)'
      }
    });
    
    const result = component();
    expect(result).toBe('bg(white) border(gray-200) dark:bg(gray-800) dark:border(gray-700)');
  });

  it('should handle different variants in light and dark', () => {
    const component = defineThemedComponent({
      light: {
        base: 'r(md)',
        sizes: {
          sm: 'p(2)',
          lg: 'p(4)'
        },
        variants: {
          card: 'bg(white) shadow(sm)'
        }
      },
      dark: {
        base: 'r(md)', 
        sizes: {
          sm: 'p(2)',
          lg: 'p(4)'
        },
        variants: {
          card: 'bg(gray-800) shadow(lg)'
        }
      }
    });
    
    const result = component('card/lg');
    expect(result).toBe('r(md) p(4) bg(white) shadow(sm) dark:r(md) dark:p(4) dark:bg(gray-800) dark:shadow(lg)');
  });
});