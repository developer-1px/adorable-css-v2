import { describe, it, expect } from 'vitest';
import { defineComponent, defineThemedComponent } from '../04-components/defineComponent';

describe('defineComponent (unified)', () => {
  describe('basic functionality', () => {
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
  });

  describe('compound variants (array syntax)', () => {
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
        compounds: [
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
        compounds: [
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
  });

  describe('compound variants (object syntax)', () => {
    it('should apply exact match compound variants', () => {
      const component = defineComponent({
        base: 'r(md)',
        compounds: {
          'primary/sm': 'bg(blue-500) text(xs) px(2)',
          'primary/lg': 'bg(blue-600) text(lg) px(4)'
        }
      });
      
      expect(component('primary/sm')).toBe('r(md) bg(blue-500) text(xs) px(2)');
      expect(component('primary/lg')).toBe('r(md) bg(blue-600) text(lg) px(4)');
    });

    it('should apply wildcard patterns', () => {
      const component = defineComponent({
        base: 'btn',
        compounds: {
          'primary/*': 'text(white)',
          '*/sm': 'py(1)'
        }
      });
      
      expect(component('primary/sm')).toBe('btn text(white) py(1)');
      expect(component('primary/lg')).toBe('btn text(white)');
      expect(component('secondary/sm')).toBe('btn py(1)');
    });
  });

  describe('state variants', () => {
    it('should apply state classes', () => {
      const component = defineComponent({
        base: 'btn',
        variants: {
          primary: 'bg(blue-600)'
        },
        states: {
          hover: 'shadow(lg) scale(1.05)',
          focus: 'ring(2/blue-500)',
          disabled: 'opacity(50) cursor(not-allowed)'
        }
      });
      
      const result = component('primary');
      expect(result).toContain('hover:shadow(lg) hover:scale(1.05)');
      expect(result).toContain('focus:ring(2/blue-500)');
      expect(result).toContain('disabled:opacity(50) disabled:cursor(not-allowed)');
    });

    it('should handle multiple classes in state', () => {
      const component = defineComponent({
        base: 'input',
        states: {
          focus: 'border(blue-500) ring(2)'
        }
      });
      
      const result = component();
      expect(result).toBe('input focus:border(blue-500) focus:ring(2)');
    });
  });

  describe('defaults', () => {
    it('should use default size and variant from defaults object', () => {
      const component = defineComponent({
        base: 'r(md)',
        sizes: {
          sm: 'p(2)',
          md: 'p(4)',
          lg: 'p(6)'
        },
        variants: {
          info: 'bg(blue-100)',
          warning: 'bg(yellow-100)'
        },
        defaults: {
          size: 'md',
          variant: 'info'
        }
      });
      
      const result = component();
      expect(result).toBe('r(md) p(4) bg(blue-100)');
    });
  });

  describe('argument order', () => {
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

  it('should handle complex themed 04-components', () => {
    const component = defineThemedComponent({
      light: {
        base: 'r(md)',
        sizes: {
          sm: 'p(2)',
          lg: 'p(4)'
        },
        variants: {
          card: 'bg(white) shadow(sm)'
        },
        states: {
          hover: 'shadow(md)'
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
        },
        states: {
          hover: 'shadow(xl)'
        }
      }
    });
    
    const result = component('card/lg');
    expect(result).toContain('r(md) p(4) bg(white) shadow(sm) hover:shadow(md)');
    expect(result).toContain('dark:r(md) dark:p(4) dark:bg(gray-800) dark:shadow(lg) dark:hover:shadow(xl)');
  });
});