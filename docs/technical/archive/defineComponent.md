그러며# defineComponent

`defineComponent`는 AdorableCSS에서 재사용 가능한 컴포넌트를 정의하는 통합 헬퍼 함수입니다. 
CVA(Class Variance Authority) 패턴에서 영감을 받아, 다양한 변형(variants)과 크기(sizes)를 가진 컴포넌트를 쉽게 만들 수 있습니다.

## 기본 사용법

가장 간단한 형태의 컴포넌트 정의:

```typescript
import { defineComponent } from 'adorable-css';

const badge = defineComponent({
  base: 'inline-flex items(center) r(full)',
  sizes: {
    sm: 'px(2) text(xs)',
    default: 'px(4) py(1) text(sm)',
    lg: 'px(6) py(2) text(base)'
  },
  variants: {
    primary: 'bg(blue-600) c(white)',
    secondary: 'bg(gray-100) c(gray-800)',
    default: 'bg(gray-200) c(gray-900)'
  }
});

// 사용
badge() // default size + default variant
badge('primary') // default size + primary variant  
badge('lg') // lg size + default variant
badge('primary/lg') // primary variant + lg size
badge('lg/primary') // 동일한 효과 (순서 무관)
```

## 고급 기능

### 1. Compound Variants (복합 변형)

특정 변형과 크기 조합에 추가 스타일을 적용할 수 있습니다:

```typescript
const button = defineComponent({
  base: 'inline-flex items(center) cursor(pointer)',
  sizes: {
    sm: 'h(32) px(12)',
    lg: 'h(48) px(20)'
  },
  variants: {
    primary: 'bg(blue-600) c(white)',
    secondary: 'bg(gray-100) c(gray-900)'
  },
  compounds: [
    {
      variant: 'primary',
      size: 'lg',
      class: 'uppercase tracking(wide)'
    },
    {
      variant: ['secondary', 'outline'],
      size: 'sm',
      class: 'border(2)'
    }
  ]
});
```

### 2. Object 형태의 Compound Variants

와일드카드 패턴을 사용하여 더 간결하게 작성할 수 있습니다:

```typescript
const card = defineComponent({
  base: 'r(lg) p(4)',
  compounds: {
    'elevated/lg': 'shadow(2xl) p(8)',
    'flat/*': 'shadow(none)', // 모든 flat variant
    '*/sm': 'p(2)' // 모든 sm size
  }
});
```

### 3. State Variants (상태 변형)

hover, focus, disabled 등의 상태를 쉽게 추가할 수 있습니다:

```typescript
const input = defineComponent({
  base: 'w(full) r(md) px(3) py(2)',
  variants: {
    default: 'border(1/gray-300)',
    error: 'border(1/red-500)'
  },
  states: {
    hover: 'border(gray-400)',
    focus: 'ring(2/blue-500) border(blue-500)',
    disabled: 'opacity(50) cursor(not-allowed)'
  }
});

// 결과: hover:border(gray-400) focus:ring(2/blue-500) border(blue-500) ...
```

### 4. 기본값 설정

컴포넌트의 기본 크기와 변형을 지정할 수 있습니다:

```typescript
const alert = defineComponent({
  base: 'p(4) r(md)',
  sizes: {
    sm: 'text(sm)',
    md: 'text(base)',
    lg: 'text(lg)'
  },
  variants: {
    info: 'bg(blue-100) c(blue-800)',
    warning: 'bg(yellow-100) c(yellow-800)',
    error: 'bg(red-100) c(red-800)'
  },
  defaults: {
    size: 'md',
    variant: 'info'
  }
});

alert() // md size + info variant
```

## 실제 예제

### Button 컴포넌트

```typescript
export const btnString = defineComponent({
  base: 'inline-flex items(center) justify(center) gap(8) cursor(pointer) r(md) transition-all',
  
  sizes: {
    sm: 'h(36) px(12) text(xs)',
    default: 'h(40) px(16) py(8) text(sm)',
    lg: 'h(44) px(32) text(sm)',
    icon: 'h(40) w(40) p(0)'
  },
  
  variants: {
    default: 'bg(gray-900) c(white) hover:bg(gray-800)',
    secondary: 'bg(white) c(gray-900) border(1/gray-200) hover:bg(gray-100)',
    destructive: 'bg(red-600) c(white) hover:bg(red-700)',
    ghost: 'bg(transparent) c(gray-700) hover:bg(gray-100)',
    link: 'bg(transparent) c(gray-900) underline-offset(4) hover:underline'
  },
  
  compounds: [
    {
      variant: 'link',
      size: ['sm', 'default', 'lg'],
      class: 'h(auto) px(0) py(0)'
    }
  ],
  
  states: {
    focus: 'outline(none) ring(2/blue-500) ring-offset(2)',
    disabled: 'pointer-events(none) opacity(50)'
  }
});
```

### Card 컴포넌트

```typescript
export const cardString = defineComponent({
  base: 'relative clip transition-all',
  
  sizes: {
    sm: 'p(16) r(md)',
    default: 'p(24) r(lg)',
    lg: 'p(32) r(xl)',
    xl: 'p(48) r(2xl)'
  },
  
  variants: {
    default: 'bg(white) shadow(sm) border(1/gray-200) hover:shadow(md)',
    outlined: 'bg(white) border(1/gray-200) shadow(none)',
    ghost: 'bg(gray-50) border(1/transparent) hover:bg(gray-100)',
    glass: 'backdrop-blur(12) bg(white.7) border(1/white.3) shadow(lg/black.1)'
  },
  
  states: {
    focus: 'outline(none) ring(2/blue-500) ring-offset(2)'
  }
});
```

## 테마 지원

다크 모드를 지원하는 컴포넌트를 만들 수 있습니다:

```typescript
import { defineThemedComponent } from 'adorable-css';

const themedCard = defineThemedComponent({
  light: {
    base: 'bg(white) border(gray-200)',
    variants: {
      elevated: 'shadow(lg)'
    }
  },
  dark: {
    base: 'bg(gray-800) border(gray-700)',
    variants: {
      elevated: 'shadow(2xl/black.5)'
    }
  }
});

// 결과: bg(white) ... dark:bg(gray-800) ...
```

## 타입 정의

```typescript
interface ComponentDefinition {
  base: string;
  sizes?: Record<string, string>;
  variants?: Record<string, string>;
  compounds?: Record<string, string> | Array<{
    variant?: string | string[];
    size?: string | string[];
    class: string;
  }>;
  states?: {
    hover?: string;
    focus?: string;
    active?: string;
    disabled?: string;
    [key: string]: string | undefined;
  };
  defaults?: {
    size?: string;
    variant?: string;
  };
}
```

## 장점

1. **타입 안전성**: TypeScript와 완벽하게 통합
2. **유연성**: 다양한 패턴 지원 (객체, 배열, 와일드카드)
3. **재사용성**: 한 번 정의하고 여러 곳에서 사용
4. **일관성**: 프로젝트 전체에서 일관된 컴포넌트 API
5. **확장성**: 필요에 따라 기능 추가 가능

## 마이그레이션 가이드

기존 CSS 객체 방식에서 `defineComponent`로 마이그레이션:

```typescript
// Before
export const buttonString = (args?: string) => {
  const variant = args || 'default';
  const classes = ['btn', 'px(4)', 'py(2)'];
  
  if (variant === 'primary') {
    classes.push('bg(blue-600)', 'c(white)');
  }
  // ... 복잡한 조건문
  
  return classes.join(' ');
};

// After
export const buttonString = defineComponent({
  base: 'btn px(4) py(2)',
  variants: {
    default: 'bg(gray-200) c(gray-900)',
    primary: 'bg(blue-600) c(white)'
  }
});
```

`defineComponent`를 사용하면 더 읽기 쉽고 유지보수하기 좋은 컴포넌트를 만들 수 있습니다.