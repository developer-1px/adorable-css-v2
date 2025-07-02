# Design Token 시스템

> "디자인 토큰은 디자인 시스템의 원자(atom)입니다. 모든 UI 결정의 기초가 되죠."

AdorableCSS의 디자인 토큰 시스템은 Figma Variables와 완벽하게 동기화됩니다.

## 왜 디자인 토큰이 중요한가?

### 문제: 매직 넘버의 난립
```css
/* 이런 코드를 본 적 있나요? */
padding: 24px;      /* 이 24는 어디서 온 건가요? */
color: #6366f1;     /* 이 색은 무슨 의미인가요? */
font-size: 18px;    /* 이게 제목인가요, 본문인가요? */
```

### 해결: 의미 있는 토큰
```css
/* AdorableCSS의 토큰 시스템 */
p(lg)               /* padding: var(--spacing-lg) = 24px */
c(primary)          /* color: var(--primary) = brand color */
text(lg)            /* font-size: var(--font-lg) = heading size */
```

토큰의 장점:
- **일관성**: 모든 곳에서 같은 간격 사용
- **유지보수성**: 한 곳에서 변경하면 전체 적용
- **의미 전달**: 코드가 의도를 담음

## 토큰 카테고리

### 1. 간격 (Spacing)
일관된 간격 시스템으로 조화로운 레이아웃 구성:

```css
/* 간격 토큰 */
--spacing-xs: 0.25rem;    /* 4px */
--spacing-sm: 0.5rem;     /* 8px */
--spacing-md: 1rem;       /* 16px */
--spacing-lg: 1.5rem;     /* 24px */
--spacing-xl: 2rem;       /* 32px */
--spacing-2xl: 3rem;      /* 48px */
--spacing-3xl: 4rem;      /* 64px */
--spacing-4xl: 6rem;      /* 96px */

/* 사용 예시 */
p(md)                     /* padding: var(--spacing-md) */
gap(lg)                   /* gap: var(--spacing-lg) */
m(xl)                     /* margin: var(--spacing-xl) */
```

### 2. 타이포그래피 (Typography)
계층적 타입 시스템:

```css
/* 폰트 크기 */
--font-3xs: 0.5rem;       /* 8px */
--font-2xs: 0.625rem;     /* 10px */
--font-xs: 0.75rem;       /* 12px */
--font-sm: 0.875rem;      /* 14px */
--font-md: 1rem;          /* 16px */
--font-lg: 1.125rem;      /* 18px */
--font-xl: 1.25rem;       /* 20px */
--font-2xl: 1.5rem;       /* 24px */
--font-3xl: 1.875rem;     /* 30px */
--font-4xl: 2.25rem;      /* 36px */
--font-5xl: 3rem;         /* 48px */
--font-6xl: 3.75rem;      /* 60px */

/* 폰트 굵기 */
--fontWeight-thin: 100;
--fontWeight-light: 300;
--fontWeight-normal: 400;
--fontWeight-medium: 500;
--fontWeight-semi: 600;
--fontWeight-bold: 700;
--fontWeight-extra: 800;
--fontWeight-black: 900;

/* 줄 높이 */
--lineHeight-none: 1;
--lineHeight-tight: 1.25;
--lineHeight-snug: 1.375;
--lineHeight-normal: 1.5;
--lineHeight-relaxed: 1.625;
--lineHeight-loose: 2;

/* 자간 */
--letterSpacing-tighter: -0.05em;
--letterSpacing-tight: -0.025em;
--letterSpacing-normal: 0;
--letterSpacing-wide: 0.025em;
--letterSpacing-wider: 0.05em;
--letterSpacing-widest: 0.1em;
```

### 3. 색상 시스템 (Colors)
OKLCH 기반의 고급 색상 시스템:

```css
/* 기본 색상 팔레트 */
--gray-50: oklch(98.3% 0.004 247.9);
--gray-100: oklch(96.8% 0.006 247.9);
--gray-200: oklch(93.8% 0.009 247.9);
--gray-300: oklch(88.5% 0.013 247.9);
--gray-400: oklch(78.8% 0.019 247.9);
--gray-500: oklch(68.2% 0.023 252.5);
--gray-600: oklch(58.7% 0.028 255.1);
--gray-700: oklch(50.7% 0.027 254.5);
--gray-800: oklch(35% 0.022 255.6);
--gray-900: oklch(22.1% 0.015 261.6);

/* 의미론적 색상 */
--primary: var(--blue-600);
--secondary: var(--gray-600);
--accent: var(--purple-600);
--success: var(--green-600);
--warning: var(--amber-600);
--error: var(--red-600);
--info: var(--blue-500);

/* 브랜드 색상 (그라디언트) */
--brand: linear-gradient(135deg, var(--blue-600), var(--purple-600));
--brand-start: var(--blue-600);
--brand-end: var(--purple-600);
```

### 4. 크기 (Sizing)
일관된 크기 시스템:

```css
/* 크기 토큰 */
--size-4xs: 8rem;         /* 128px */
--size-3xs: 12rem;        /* 192px */
--size-2xs: 16rem;        /* 256px */
--size-xs: 20rem;         /* 320px */
--size-sm: 24rem;         /* 384px */
--size-md: 28rem;         /* 448px */
--size-lg: 32rem;         /* 512px */
--size-xl: 36rem;         /* 576px */
--size-2xl: 42rem;        /* 672px */
--size-3xl: 48rem;        /* 768px */
--size-4xl: 56rem;        /* 896px */
--size-5xl: 64rem;        /* 1024px */
--size-6xl: 72rem;        /* 1152px */

/* 컨테이너 크기 */
--container-xs: 475px;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1440px;
--container-prose: 65ch;  /* 읽기 최적 너비 */
```

### 5. 반경 (Radius)
모서리 둥글기 시스템:

```css
--radius-none: 0;
--radius-xs: 0.125rem;    /* 2px */
--radius-sm: 0.25rem;     /* 4px */
--radius-md: 0.375rem;    /* 6px */
--radius-lg: 0.5rem;      /* 8px */
--radius-xl: 0.75rem;     /* 12px */
--radius-2xl: 1rem;       /* 16px */
--radius-3xl: 1.5rem;     /* 24px */
--radius-full: 9999px;    /* 완전한 원 */
```

### 6. 그림자 (Shadows)
깊이감을 위한 그림자 시스템:

```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
```

### 7. 애니메이션 (Animation)
부드러운 전환을 위한 토큰:

```css
/* 지속 시간 */
--duration-instant: 50ms;
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;
--duration-slowest: 1000ms;

/* 이징 함수 */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 8. Z-Index
레이어 관리 시스템:

```css
--z-hide: -1;
--z-auto: auto;
--z-base: 0;
--z-docked: 10;
--z-dropdown: 1000;
--z-sticky: 1100;
--z-banner: 1200;
--z-overlay: 1300;
--z-modal: 1400;
--z-popover: 1500;
--z-skipLink: 1600;
--z-toast: 1700;
--z-tooltip: 1800;
```

## 토큰 사용하기

### 1. 직접 참조
```css
/* CSS에서 */
.my-class {
  padding: var(--spacing-md);
  font-size: var(--font-lg);
  color: var(--gray-900);
}

/* AdorableCSS에서 */
p(md)              /* var(--spacing-md) */
text(lg)           /* var(--font-lg) */
c(gray-900)        /* var(--gray-900) */
```

### 2. JavaScript에서 접근
```javascript
import { defaultTokens } from 'adorable-css';

// 토큰 값 사용
const spacing = defaultTokens.spacing.md;  // "1rem"
const fontSize = defaultTokens.font.lg;     // "1.125rem"
```

### 3. 커스텀 토큰 추가
```javascript
import { setTokenContext } from 'adorable-css';

// 커스텀 토큰 정의
const customTokens = {
  ...defaultTokens,
  spacing: {
    ...defaultTokens.spacing,
    xxl: '4rem',  // 추가 간격
  },
  colors: {
    ...defaultTokens.colors,
    brand: '#FF6B6B',  // 브랜드 색상
  }
};

// 토큰 설정
setTokenContext(customTokens);
```

## 테마 시스템

### 1. 색상 테마
AdorableCSS는 여러 색상 테마를 지원합니다:

```javascript
import { setTheme } from 'adorable-css';

// 사용 가능한 테마
setTheme('default');     // 기본 테마
setTheme('vibrant');     // 선명한 테마
setTheme('pastel');      // 파스텔 테마
setTheme('dark');        // 다크 테마
setTheme('warm');        // 따뜻한 테마
setTheme('cool');        // 차가운 테마
```

### 2. 커스텀 테마 생성
```javascript
import { createCustomTheme } from 'adorable-css';

// 커스텀 테마 생성
createCustomTheme('my-theme', {
  temperature: 0.8,    // 따뜻함 (0-1)
  saturation: 1.2,     // 채도 (0.5-1.5)
  lightness: 0.9       // 밝기 (0.5-1.5)
});

// 사용
setTheme('my-theme');
```

### 3. 의미론적 색상 설정
```javascript
import { configureSemanticColors } from 'adorable-css';

// 의미론적 색상 커스터마이징
configureSemanticColors({
  primary: 'indigo-600',
  secondary: 'pink-500',
  accent: 'purple-600',
  success: 'green-500',
  warning: 'yellow-500',
  error: 'red-600'
});
```

## 반응형 토큰

### 1. 컨테이너 쿼리
```css
/* 반응형 컨테이너 패딩 */
.container {
  padding: var(--container-px-responsive);
}

@media (min-width: 735px) {
  --container-px-responsive: 24px;
}

@media (min-width: 1069px) {
  --container-px-responsive: 32px;
}
```

### 2. 유동적 타이포그래피
```css
/* Clamp를 사용한 유동적 크기 */
font(..5xl)   /* font-size: clamp(2.4rem, 4.8vw, var(--font-5xl)) */
```

## 토큰 자동 주입

AdorableCSS는 import 시 자동으로 토큰을 주입합니다:

```javascript
import 'adorable-css';  // 토큰 자동 주입

// 주입 비활성화
import { configureAutoInject } from 'adorable-css';
configureAutoInject({ enabled: false });

// 수동 주입
import { injectTokens } from 'adorable-css';
injectTokens();
```

## 실전 예제: 디자인 시스템 구축

### 1. 기본 설정
```javascript
// design-system/tokens.js
export const tokens = {
  // 브랜드 컬러
  brand: {
    primary: '#6366f1',
    secondary: '#ec4899',
    accent: '#8b5cf6'
  },
  
  // 간격 체계 (8px 기반)
  spacing: {
    xs: '0.5rem',   // 8px
    sm: '1rem',     // 16px 
    md: '1.5rem',   // 24px
    lg: '2rem',     // 32px
    xl: '3rem'      // 48px
  },
  
  // 타이포그래피 스케일
  fontSize: {
    xs: '0.75rem',  // 12px
    sm: '0.875rem', // 14px
    base: '1rem',   // 16px
    lg: '1.125rem', // 18px
    xl: '1.5rem',   // 24px
    '2xl': '2rem'   // 32px
  }
};
```

### 2. Figma와 동기화
```javascript
// Figma Tokens Plugin에서 export한 JSON
import figmaTokens from './figma-tokens.json';
import { setTokenContext } from 'adorable-css';

// Figma와 코드 동기화
setTokenContext({
  ...defaultTokens,
  ...figmaTokens
});
```

### 3. 실제 사용
```html
<!-- 일관된 간격과 타이포그래피 -->
<div class="vbox gap(md) p(lg)">
  <h1 class="text(2xl) bold c(gray-900)">대제목</h1>
  <p class="text(base) c(gray-600) line-height(relaxed)">
    본문 내용...
  </p>
  <button class="btn(primary/lg)">
    시작하기
  </button>
</div>
```

## 타입 안전성

TypeScript를 사용하면 토큰에 대한 완전한 타입 지원을 받을 수 있습니다:

```typescript
import type { DesignTokens } from 'adorable-css';

// 타입 안전한 토큰 사용
const tokens: DesignTokens = {
  spacing: {
    md: '1rem',
    // 자동 완성 지원
  }
};
```

## 성능 최적화

### 1. 토큰 트리 쉐이킹
사용하지 않는 토큰은 자동으로 제거됩니다.

### 2. CSS 변수 최적화
필요한 CSS 변수만 생성되어 파일 크기를 최소화합니다.

### 3. 런타임 캐싱
토큰 값은 한 번 계산되고 캐싱됩니다.

## 토큰 철학: 디자인 결정의 체계화

### 토큰이 없을 때
- 개발자 A: "padding은 16px로 하죠"
- 개발자 B: "아니요, 20px이 더 좋아 보여요"
- 디자이너: "기획서에는 24px로 나와 있는데..."

### 토큰이 있을 때
- 모두: "`p(md)` 쓰면 돼요" (끝)

이것이 토큰의 진짜 가치입니다. **결정을 시스템화**하는 것.

## 다음 단계

- [Layout](./04-layout.md) - 레이아웃 시스템 활용
- [Component](./05-component.md) - 토큰 기반 컴포넌트 구축
- [Design System](./06-design-system.md) - 완전한 디자인 시스템 구축