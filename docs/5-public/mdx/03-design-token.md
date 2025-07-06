# 디자인 토큰 시스템: 디자인과 개발을 잇는 단일 진실 공급원

> "디자인 토큰은 디자인 시스템의 원자(atom)입니다. 모든 UI 결정의 기초가 되며, 디자인과 개발 간의 언어 장벽을 허무는 핵심 요소입니다."

AdorableCSS의 디자인 토큰 시스템은 Figma Variables와 완벽하게 동기화되어, 디자이너가 정의한 시각적 속성들이 코드에 일관되고 의미론적으로 반영되도록 합니다.

## 왜 디자인 토큰이 필수적인가?

### 문제: '매직 넘버'와 불일치의 악순환

디자인 시스템이 부재하거나 디자인 토큰이 제대로 활용되지 않는 프로젝트에서는 다음과 같은 문제가 빈번하게 발생합니다:

```css
/* 흔히 볼 수 있는 코드: 의미를 알 수 없는 '매직 넘버' */
padding: 24px;      /* 이 24px은 어떤 의미인가요? 특정 컴포넌트에만 적용되는 값인가요, 아니면 전역적인 간격 규칙인가요? */
color: #6366f1;     /* 이 HEX 코드는 어떤 브랜드 색상인가요? Primary 색상인가요, Accent 색상인가요? */
font-size: 18px;    /* 이 폰트 크기는 제목에 사용되는 건가요, 아니면 본문 텍스트인가요? */
```

-   **일관성 부족**: 개발자마다, 혹은 컴포넌트마다 동일한 시각적 요소(예: 버튼의 패딩)에 다른 값을 사용하게 되어 디자인 일관성이 무너집니다.
-   **유지보수성 저하**: 디자인 변경이 발생했을 때, 모든 코드에서 해당 값을 찾아 수동으로 변경해야 하므로 시간과 노력이 많이 들고, 누락될 위험이 큽니다.
-   **의도 파악의 어려움**: 코드만으로는 해당 값이 어떤 디자인 의도를 가지고 있는지 파악하기 어렵습니다. 이는 새로운 팀원의 온보딩을 어렵게 하고, 협업 효율을 떨어뜨립니다.
-   **디자인-개발 불일치**: 디자이너가 Figma에서 정의한 값과 개발자가 코드에 적용한 값이 달라 '디자인과 다르다'는 피드백이 끊이지 않습니다.

### 해결: 의미론적 디자인 토큰을 통한 시스템화

AdorableCSS는 이러한 문제를 해결하기 위해 의미론적 디자인 토큰을 도입합니다. 디자인 토큰은 단순히 값을 저장하는 변수가 아니라, 디자인 의도와 규칙을 담고 있는 '명명된 값'입니다.

```css
/* AdorableCSS의 토큰 시스템: 의미가 명확한 토큰 사용 */
p(lg)               /* padding: var(--spacing-lg) = 24px (대형 간격) */
c(primary)          /* color: var(--primary) = 브랜드의 주 색상 */
text(lg)            /* font-size: var(--font-lg) = 대형 텍스트 (예: 섹션 제목) */
```

디자인 토큰의 핵심적인 장점은 다음과 같습니다:

-   **디자인 일관성 보장**: 모든 팀원이 동일한 '명명된 값'을 사용하므로, UI 요소들이 일관된 디자인 규칙을 따르게 됩니다.
-   **뛰어난 유지보수성**: 디자인 변경이 필요할 때, 토큰의 정의만 수정하면 해당 토큰을 사용하는 모든 곳에 자동으로 반영되어 효율적인 유지보수가 가능합니다.
-   **명확한 의도 전달**: 코드를 통해 디자인의 의도와 목적을 명확하게 전달할 수 있어, 디자이너와 개발자 간의 커뮤니케이션 오류를 줄입니다.
-   **디자인-개발 동기화**: Figma Variables와 직접 연동하여, 디자인 툴에서 정의된 값이 코드에 실시간으로 반영되도록 합니다.

## 토큰 카테고리: 디자인 시스템의 구조화

### 1. 간격 (Spacing): 일관된 공간 시스템 구축

간격 토큰은 UI 요소들 간의 여백과 크기를 일관되게 관리하기 위한 핵심 요소입니다. AdorableCSS는 8px 그리드 시스템을 기반으로 한 간격 토큰을 제공하여, 디자인의 일관성을 유지하고 예측 가능한 레이아웃을 가능하게 합니다.

```css
/* 간격 토큰 정의 (CSS 변수 형태) */
--spacing-xs: 0.25rem;    /* 4px (0.25 * 16px) */
--spacing-sm: 0.5rem;     /* 8px (0.5 * 16px) */
--spacing-md: 1rem;       /* 16px (1 * 16px) */
--spacing-lg: 1.5rem;     /* 24px (1.5 * 16px) */
--spacing-xl: 2rem;       /* 32px (2 * 16px) */
--spacing-2xl: 3rem;      /* 48px (3 * 16px) */
--spacing-3xl: 4rem;      /* 64px (4 * 16px) */
--spacing-4xl: 6rem;      /* 96px (6 * 16px) */

/* AdorableCSS에서 간격 토큰 사용 예시 */
p(md)                     /* padding: var(--spacing-md); (내부 여백) */
gap(lg)                   /* gap: var(--spacing-lg); (Flex/Grid 아이템 간 간격) */
m(xl)                     /* margin: var(--spacing-xl); (외부 여백 - 사용 지양, gap 권장) */
```

**참고**: AdorableCSS는 `margin` 사용을 지양하고 `gap`을 통한 간격 제어를 권장합니다. 이는 Figma의 Auto Layout 철학과 일치하며, `margin collapse`와 같은 예측 불가능한 CSS 동작을 방지하여 더욱 안정적인 레이아웃을 구축할 수 있게 합니다. `m(xl)`과 같은 `margin` 유틸리티는 특정 레거시 상황이나 예외적인 경우에만 사용하도록 가이드하는 것이 좋습니다.

### 2. 타이포그래피 (Typography): 계층적 타입 시스템 구축

타이포그래피 토큰은 텍스트의 크기, 굵기, 줄 높이, 자간 등을 일관되게 관리하여, 웹사이트 전체의 가독성과 시각적 계층을 명확하게 합니다. AdorableCSS는 디자인 시스템에 정의된 폰트 스케일을 CSS 변수로 제공하여, 디자이너의 타이포그래피 의도를 코드에 정확하게 반영할 수 있게 합니다.

```css
/* 폰트 크기 (font-size): 의미론적 스케일 */
--font-3xs: 0.5rem;       /* 8px */
--font-2xs: 0.625rem;     /* 10px */
--font-xs: 0.75rem;       /* 12px */
--font-sm: 0.875rem;      /* 14px */
--font-md: 1rem;          /* 16px (기본 본문 텍스트 크기) */
--font-lg: 1.125rem;      /* 18px */
--font-xl: 1.25rem;       /* 20px */
--font-2xl: 1.5rem;       /* 24px */
--font-3xl: 1.875rem;     /* 30px */
--font-4xl: 2.25rem;      /* 36px */
--font-5xl: 3rem;         /* 48px */
--font-6xl: 3.75rem;      /* 60px */

/* 폰트 굵기 (font-weight): 의미론적 이름과 숫자 값 매핑 */
--fontWeight-thin: 100;
--fontWeight-light: 300;
--fontWeight-normal: 400;
--fontWeight-medium: 500;
--fontWeight-semi: 600;   /* Deprecated: bold(600) 사용을 권장합니다. */
--fontWeight-bold: 700;
--fontWeight-extra: 800;
--fontWeight-black: 900;

/* 줄 높이 (line-height): 텍스트 가독성 및 레이아웃 제어 */
--lineHeight-none: 1;     /* line-height: 1 */
--lineHeight-tight: 1.25; /* line-height: 1.25 */
--lineHeight-snug: 1.375; /* line-height: 1.375 */
--lineHeight-normal: 1.5; /* line-height: 1.5 (기본값) */
--lineHeight-relaxed: 1.625;/* line-height: 1.625 */
--lineHeight-loose: 2;    /* line-height: 2 */

/* 자간 (letter-spacing): 텍스트 밀도 조절 */
--letterSpacing-tighter: -0.05em;
--letterSpacing-tight: -0.025em;
--letterSpacing-normal: 0;
--letterSpacing-wide: 0.025em;
--letterSpacing-wider: 0.05em;
--letterSpacing-widest: 0.1em;
```

### 3. 색상 시스템 (Colors): OKLCH 기반의 고급 색상 팔레트

색상 토큰은 UI의 시각적 아이덴티티를 정의하는 핵심 요소입니다. AdorableCSS는 OKLCH 색상 모델을 기반으로 한 고급 색상 시스템을 제공하여, 더욱 넓은 색상 범위와 정확한 색상 표현을 가능하게 합니다. 이는 디자이너가 의도한 색상을 코드에 정확하게 반영하고, 접근성을 고려한 색상 팔레트를 구축하는 데 도움을 줍니다.

```css
/* 기본 색상 팔레트: OKLCH 포맷으로 정의된 다양한 회색조 */
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

/* 의미론적 색상: UI 요소의 역할에 따라 정의된 색상 (기본 색상 팔레트 참조) */
--primary: var(--blue-600);    /* 브랜드의 주 색상 */
--secondary: var(--gray-600);  /* 보조 색상 */
--accent: var(--purple-600);   /* 강조 색상 */
--success: var(--green-600);   /* 성공 상태 색상 */
--warning: var(--amber-600);   /* 경고 상태 색상 */
--error: var(--red-600);       /* 오류 상태 색상 */
--info: var(--blue-500);       /* 정보성 메시지 색상 */

/* 브랜드 색상 (그라디언트): 복합적인 브랜드 아이덴티티 표현 */
--brand: linear-gradient(135deg, var(--blue-600), var(--purple-600));
--brand-start: var(--blue-600);
--brand-end: var(--purple-600);
```

**OKLCH 색상 모델의 장점:**
-   **인간의 시각에 더 가까움**: 색상, 채도, 밝기를 직관적으로 제어할 수 있어 디자이너가 의도한 색상을 정확하게 표현하기 용이합니다.
-   **일관된 밝기**: 채도나 색조가 변해도 밝기가 일정하게 유지되어, 다양한 색상 조합에서도 일관된 시각적 경험을 제공합니다.
-   **넓은 색상 범위**: 기존 sRGB보다 더 넓은 색상 영역을 표현할 수 있어, 더욱 풍부하고 생동감 있는 디자인이 가능합니다.
-   **접근성**: 밝기(Lightness) 값을 직접 제어할 수 있어, WCAG(웹 콘텐츠 접근성 가이드라인)를 준수하는 대비를 쉽게 맞출 수 있습니다.

AdorableCSS는 이러한 OKLCH 기반의 색상 토큰을 통해 디자인 시스템의 색상 팔레트를 코드에 완벽하게 동기화하고, 디자이너와 개발자가 색상에 대한 동일한 이해를 가질 수 있도록 돕습니다.

### 4. 크기 (Sizing): 일관된 크기 시스템

크기 토큰은 UI 요소의 너비와 높이, 그리고 컨테이너의 최대 너비 등을 일관되게 관리하는 데 사용됩니다. AdorableCSS는 다양한 스케일의 크기 토큰을 제공하여, 반응형 디자인과 유연한 레이아웃을 쉽게 구현할 수 있도록 돕습니다.

```css
/* 크기 토큰: 다양한 스케일의 고정 크기 */
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

/* 컨테이너 크기: 특정 콘텐츠 영역의 최대 너비 정의 */
--container-xs: 475px;
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1440px;
--container-prose: 65ch;  /* 읽기 최적 너비 (가독성을 위한 문자 단위) */
```

### 5. 반경 (Radius): 모서리 둥글기 시스템

반경 토큰은 UI 요소의 모서리 둥글기를 일관되게 적용하는 데 사용됩니다. 이는 디자인의 부드러움과 일관성을 유지하는 데 기여합니다.

```css
--radius-none: 0;         /* 0px (직각) */
--radius-xs: 0.125rem;    /* 2px */
--radius-sm: 0.25rem;     /* 4px */
--radius-md: 0.375rem;    /* 6px */
--radius-lg: 0.5rem;      /* 8px */
--radius-xl: 0.75rem;     /* 12px */
--radius-2xl: 1rem;       /* 16px */
--radius-3xl: 1.5rem;     /* 24px */
--radius-full: 9999px;    /* 완전한 원 (circle) */
```

### 6. 그림자 (Shadows): 깊이감과 입체감 표현

그림자 토큰은 UI 요소에 깊이감과 입체감을 부여하여 시각적 계층을 명확하게 합니다. AdorableCSS는 다양한 강도의 그림자 토큰을 제공하여, 디자인 시스템의 시각적 가이드를 따르도록 합니다.

```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
```

### 7. 애니메이션 (Animation): 부드러운 전환과 인터랙션

애니메이션 토큰은 UI 요소의 상태 변화나 전환에 부드러운 움직임을 부여하여 사용자 경험을 향상시킵니다. AdorableCSS는 애니메이션의 지속 시간과 이징 함수를 토큰으로 관리하여, 일관된 애니메이션 효과를 적용할 수 있게 합니다.

```css
/* 지속 시간 (Duration): 애니메이션/트랜지션의 길이 */
--duration-instant: 50ms;
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 700ms;
--duration-slowest: 1000ms;

/* 이징 함수 (Easing Function): 애니메이션의 속도 변화 곡선 */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 8. Z-Index: 레이어 관리 시스템

Z-Index 토큰은 UI 요소의 쌓임 순서(stacking order)를 관리하여, 모달, 툴팁, 드롭다운 등 겹쳐지는 요소들의 시각적 계층을 명확하게 합니다. 의미론적인 Z-Index 토큰을 사용함으로써, 복잡한 Z-Index 값들을 기억할 필요 없이 UI의 깊이감을 쉽게 제어할 수 있습니다.

```css
--z-hide: -1;       /* 요소를 숨기거나 뒤로 보낼 때 */
--z-auto: auto;     /* 기본값 */
--z-base: 0;        /* 기본 레이어 */
--z-docked: 10;     /* 도킹된 요소 (예: 하단 바) */
--z-dropdown: 1000; /* 드롭다운 메뉴 */
--z-sticky: 1100;   /* 스티키 헤더/푸터 */
--z-banner: 1200;   /* 배너, 알림 바 */
--z-overlay: 1300;  /* 오버레이 (모달 뒤 배경) */
--z-modal: 1400;    /* 모달 창 */
--z-popover: 1500;  /* 팝오버, 컨텍스트 메뉴 */
--z-skipLink: 1600; /* 스킵 링크 (접근성) */
--z-toast: 1700;    /* 토스트 메시지 */
--z-tooltip: 1800;  /* 툴팁 */
```

## 토큰 사용하기: 코드에서 디자인 토큰 활용

AdorableCSS에서 정의된 디자인 토큰은 CSS 변수 형태로 제공되어, CSS와 JavaScript 코드 모두에서 쉽게 접근하고 활용할 수 있습니다. 이는 디자인 시스템의 일관성을 유지하면서 개발 효율성을 높이는 데 기여합니다.

### 1. 직접 참조: AdorableCSS 유틸리티 및 순수 CSS에서 사용

AdorableCSS 유틸리티 클래스 내에서 토큰을 직접 참조하거나, 필요한 경우 순수 CSS 코드에서도 CSS 변수 형태로 토큰을 사용할 수 있습니다.

```css
/* 순수 CSS에서 디자인 토큰 참조 */
.my-custom-component {
  padding: var(--spacing-md);   /* AdorableCSS의 간격 토큰 사용 */
  font-size: var(--font-lg);    /* AdorableCSS의 폰트 크기 토큰 사용 */
  color: var(--gray-900);       /* AdorableCSS의 색상 토큰 사용 */
  border-radius: var(--radius-sm); /* AdorableCSS의 반경 토큰 사용 */
}

/* AdorableCSS 유틸리티에서 디자인 토큰 사용 */
p(md)              /* padding: var(--spacing-md); */
text(lg)           /* font-size: var(--font-lg); */
c(gray-900)        /* color: var(--gray-900); */
r(sm)              /* border-radius: var(--radius-sm); */
```

### 2. JavaScript에서 접근: 동적 스타일링 및 로직에 활용

AdorableCSS는 JavaScript 환경에서도 디자인 토큰에 접근할 수 있는 방법을 제공하여, 동적인 스타일링이나 UI 로직에 디자인 토큰 값을 활용할 수 있게 합니다.

```javascript
import { defaultTokens } from 'adorable-css';

// AdorableCSS에 내장된 기본 토큰 값에 접근
const spacingMd = defaultTokens.spacing.md;  // 예: "1rem"
const fontSizeLg = defaultTokens.font.lg;     // 예: "1.125rem"
const primaryColor = defaultTokens.colors.primary; // 예: "var(--blue-600)"

console.log(`Spacing MD: ${spacingMd}`);
console.log(`Font Size LG: ${fontSizeLg}`);
console.log(`Primary Color: ${primaryColor}`);

// React 컴포넌트 등에서 동적으로 스타일을 적용할 때 활용
function MyComponent() {
  return (
    <div style={{
      padding: defaultTokens.spacing.lg,
      backgroundColor: defaultTokens.colors.primary
    }}>
      Hello AdorableCSS!
    </div>
  );
}
```

### 3. 커스텀 토큰 추가: 프로젝트 맞춤형 디자인 시스템 구축

AdorableCSS는 기존의 기본 토큰을 확장하거나 새로운 토큰을 추가하여 프로젝트의 고유한 디자인 시스템을 구축할 수 있는 유연성을 제공합니다. `setTokenContext` 함수를 사용하여 커스텀 토큰을 전역적으로 설정할 수 있습니다.

```javascript
import { defaultTokens, setTokenContext } from 'adorable-css';

// 프로젝트의 특정 요구사항에 맞는 커스텀 토큰 정의
const customTokens = {
  ...defaultTokens, // 기존 기본 토큰을 유지하면서 확장
  spacing: {
    ...defaultTokens.spacing,
    xxl: '4rem',  // 새로운 간격 토큰 추가 (64px)
    xxxl: '5rem', // 또 다른 간격 토큰 추가 (80px)
  },
  colors: {
    ...defaultTokens.colors,
    brand: '#FF6B6B',  // 프로젝트의 메인 브랜드 색상 정의
    brandLight: '#FFC0CB', // 브랜드 색상의 밝은 변형
  },
  // 새로운 카테고리의 토큰 추가도 가능
  breakpoints: {
    tablet: '768px',
    desktop: '1024px',
  }
};

// AdorableCSS 컨텍스트에 커스텀 토큰 설정
setTokenContext(customTokens);

// 이제 AdorableCSS 유틸리티에서 새로운 토큰을 사용할 수 있습니다.
// 예: <div class="p(xxl) bg(brand)">...</div>
```

## 테마 시스템: 동적인 디자인 경험 구현

AdorableCSS는 단순한 디자인 토큰 관리를 넘어, 테마 시스템을 통해 UI의 시각적 특성을 동적으로 변경할 수 있는 강력한 기능을 제공합니다. 이를 통해 다크 모드, 브랜드별 테마, 사용자 맞춤형 테마 등 다양한 디자인 경험을 유연하게 구현할 수 있습니다.

### 1. 내장 색상 테마 활용

AdorableCSS는 몇 가지 미리 정의된 색상 테마를 제공하여, 별도의 설정 없이도 다양한 분위기의 UI를 빠르게 적용할 수 있습니다. `setTheme` 함수를 사용하여 전역적으로 테마를 변경할 수 있습니다.

```javascript
import { setTheme } from 'adorable-css';

// AdorableCSS에 내장된 사용 가능한 테마 목록
setTheme('default');     // 기본 테마 (밝은 모드, 중립적인 색상)
setTheme('vibrant');     // 선명하고 생동감 있는 색상 테마
setTheme('pastel');      // 부드럽고 차분한 파스텔 톤 테마
setTheme('dark');        // 어두운 배경에 최적화된 다크 모드 테마
setTheme('warm');        // 따뜻한 계열의 색상 (주황, 빨강 등) 강조 테마
setTheme('cool');        // 차가운 계열의 색상 (파랑, 초록 등) 강조 테마
```

### 2. 커스텀 테마 생성 및 적용

프로젝트의 고유한 브랜드 아이덴티티나 특정 요구사항에 맞춰 완전히 새로운 커스텀 테마를 생성할 수 있습니다. `createCustomTheme` 함수를 사용하여 색상, 채도, 밝기 등 테마의 핵심 속성을 정의하고, 이를 `setTheme`으로 적용합니다.

```javascript
import { createCustomTheme, setTheme } from 'adorable-css';

// 'my-theme'라는 이름의 커스텀 테마 생성
createCustomTheme('my-theme', {
  temperature: 0.8,    // 색상의 따뜻함 정도 (0: 차가움, 1: 따뜻함) - 예: 0.8은 비교적 따뜻한 톤
  saturation: 1.2,     // 색상의 채도 (0.5: 저채도, 1.5: 고채도) - 예: 1.2는 기본보다 약간 높은 채도
  lightness: 0.9       // 색상의 밝기 (0.5: 어두움, 1.5: 밝음) - 예: 0.9는 비교적 밝은 톤
});

// 생성된 커스텀 테마를 현재 애플리케이션에 적용
setTheme('my-theme');
```

이러한 파라미터는 AdorableCSS의 내부 색상 생성 로직에 영향을 주어, 기존의 색상 팔레트를 기반으로 새로운 테마를 동적으로 생성합니다.

### 3. 의미론적 색상 설정 커스터마이징

AdorableCSS는 `primary`, `secondary`, `success`, `error` 등 의미론적인 색상 이름을 통해 UI 요소의 역할을 명확히 합니다. 이 의미론적 색상들이 실제 어떤 색상 팔레트의 값을 참조할지 프로젝트의 필요에 따라 유연하게 재구성할 수 있습니다.

```javascript
import { configureSemanticColors } from 'adorable-css';

// 의미론적 색상 이름을 특정 색상 팔레트의 값으로 매핑
configureSemanticColors({
  primary: 'indigo-600',   // 주 색상을 indigo-600으로 설정
  secondary: 'pink-500',   // 보조 색상을 pink-500으로 설정
  accent: 'purple-600',    // 강조 색상을 purple-600으로 설정
  success: 'green-500',    // 성공 메시지 색상을 green-500으로 설정
  warning: 'yellow-500',   // 경고 메시지 색상을 yellow-500으로 설정
  error: 'red-600'         // 오류 메시지 색상을 red-600으로 설정
});
```

이 기능을 통해 디자인 시스템의 핵심 색상 규칙을 코드에 반영하고, 테마 변경 시에도 의미론적 일관성을 유지할 수 있습니다.

## 반응형 토큰: 유연한 UI를 위한 동적 스케일링

반응형 디자인은 현대 웹 개발의 필수 요소입니다. AdorableCSS는 단순히 브레이크포인트별 스타일을 적용하는 것을 넘어, 디자인 토큰 자체를 반응형으로 관리할 수 있는 기능을 제공하여 더욱 유연하고 적응성 높은 UI를 구축할 수 있도록 돕습니다.

### 1. 컨테이너 쿼리 기반 반응형 토큰

전통적인 미디어 쿼리는 뷰포트 크기에 따라 스타일을 변경하지만, 컨테이너 쿼리는 부모 요소의 크기에 따라 자식 요소의 스타일을 변경할 수 있게 합니다. AdorableCSS는 이를 활용하여 컴포넌트 수준의 반응형 디자인을 가능하게 합니다. 아래 예시는 컨테이너의 너비에 따라 패딩 토큰의 값이 동적으로 변하는 것을 보여줍니다.

```css
/* 반응형 컨테이너 패딩: 부모 컨테이너의 크기에 따라 패딩 값 변경 */
.container {
  padding: var(--container-px-responsive); /* CSS 변수를 통해 반응형 패딩 값 참조 */
}

@media (min-width: 735px) {
  --container-px-responsive: 24px; /* 뷰포트 너비가 735px 이상일 때 패딩 24px */
}

@media (min-width: 1069px) {
  --container-px-responsive: 32px; /* 뷰포트 너비가 1069px 이상일 때 패딩 32px */
}
```

이러한 방식은 컴포넌트의 재사용성을 높이고, 복잡한 레이아웃에서도 예측 가능한 반응형 동작을 구현하는 데 유리합니다.

### 2. 유동적 타이포그래피 (`font()`의 Clamp 기능)

사용자 경험을 최적화하기 위해 텍스트 크기를 뷰포트 크기에 따라 유동적으로 조절하는 것은 중요합니다. AdorableCSS는 CSS `clamp()` 함수를 활용하여 최소, 최대, 그리고 선호하는 텍스트 크기를 정의함으로써, 화면 크기에 따라 폰트 크기가 부드럽게 변화하도록 합니다.

```css
/* Clamp를 사용한 유동적 폰트 크기: font(최소크기..최대크기) */
font(..5xl)   /* font-size: clamp(2.4rem, 4.8vw, var(--font-5xl)); */
              /* 최소 2.4rem, 최대 --font-5xl (48px), 뷰포트 너비에 따라 4.8vw로 유동적 변화 */
```

`font(..5xl)`과 같은 문법은 `clamp()` 함수를 자동으로 생성하여, 텍스트가 너무 작아지거나 너무 커지는 것을 방지하면서도 다양한 화면 크기에서 최적의 가독성을 제공합니다. 이는 특히 반응형 헤딩이나 본문 텍스트에 유용합니다.

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

- [Layout](/docs/layout) - 레이아웃 시스템 활용
- [Component](/docs/component) - 토큰 기반 컴포넌트 구축
- [Design System](/docs/design-system) - 완전한 디자인 시스템 구축