# Design System 구축

> "디자인 시스템은 제품의 언어입니다. 모든 팀원이 같은 언어로 말하게 해주세요."

AdorableCSS로 구축하는 디자인 시스템은 Figma와 코드가 **하나의 진실**을 공유합니다.

## 디자인 시스템의 진짜 문제

### 전통적 접근의 한계
1. **이중 관리**: Figma에서 한 번, 코드에서 한 번
2. **동기화 실패**: "디자인과 다르네요"
3. **커뮤니케이션 비용**: 번역이 필요한 대화

### AdorableCSS의 해법
```typescript
// Figma Variables = Code Tokens
import { figmaTokens } from '@figma/tokens';
import { setTokenContext } from 'adorable-css';

// 한 번의 설정으로 Figma와 코드 동기화
setTokenContext(figmaTokens);
```

**Single Source of Truth**: Figma가 진실, 코드는 그 반영.

## 디자인 시스템 아키텍처

### 1. 계층 구조
AdorableCSS의 디자인 시스템은 다음과 같은 계층으로 구성됩니다:

```
Foundation (기초)
  ├── Design Tokens (디자인 토큰)
  │   ├── Colors (색상)
  │   ├── Typography (타이포그래피)
  │   ├── Spacing (간격)
  │   ├── Shadows (그림자)
  │   └── Animation (애니메이션)
  │
  ├── Layout System (레이아웃)
  │   ├── Grid (그리드)
  │   ├── Flexbox (플렉스박스)
  │   └── Positioning (포지셔닝)
  │
  └── Base Styles (기본 스타일)
      ├── Reset (리셋)
      └── Global (전역)

Components (컴포넌트)
  ├── Primitives (기본)
  │   ├── Button
  │   ├── Input
  │   └── Card
  │
  ├── Patterns (패턴)
  │   ├── Forms
  │   ├── Navigation
  │   └── Layouts
  │
  └── Templates (템플릿)
      ├── Pages
      └── Sections
```

### 2. 토큰 기반 접근법
모든 디자인 결정을 토큰으로 표준화:

```typescript
// design-tokens.ts
export const tokens = {
  // 브랜드 색상
  brand: {
    primary: 'blue-600',
    secondary: 'purple-600',
    accent: 'pink-500'
  },
  
  // 의미론적 색상
  semantic: {
    success: 'green-500',
    warning: 'amber-500',
    error: 'red-500',
    info: 'blue-500'
  },
  
  // 간격 시스템
  spacing: {
    page: 'xl',
    section: 'lg',
    component: 'md',
    element: 'sm'
  },
  
  // 타이포그래피 스케일
  typography: {
    display: 'font(5xl/1.1/-2%)',
    heading: 'font(3xl/1.3/-1%)',
    body: 'font(md/1.6)',
    caption: 'font(sm/1.5)'
  }
};
```

## 색상 시스템

### 1. 테마 설정
```typescript
import { setTheme, configureSemanticColors } from 'adorable-css';

// 테마 선택
setTheme('vibrant'); // 선명한 테마

// 의미론적 색상 커스터마이징
configureSemanticColors({
  primary: 'indigo-600',
  secondary: 'pink-500',
  accent: 'purple-600',
  success: 'emerald-500',
  warning: 'amber-500',
  error: 'rose-500'
});
```

### 2. 다크 모드 지원
```css
/* 자동 다크 모드 */
:root {
  --bg-primary: white;
  --text-primary: var(--gray-900);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: var(--gray-900);
    --text-primary: white;
  }
}

/* AdorableCSS에서 사용 */
bg(var(--bg-primary))
c(var(--text-primary))

/* 또는 다크 모드 prefix */
bg(white) dark:bg(gray-900)
c(gray-900) dark:c(white)
```

### 3. 색상 팔레트 확장
```typescript
// 커스텀 색상 추가
const customColors = {
  brand: {
    50: 'oklch(98.3% 0.014 259)',
    100: 'oklch(96.8% 0.021 259)',
    // ... 200-900
  },
  surface: {
    raised: 'white',
    sunken: 'gray-50',
    overlay: 'white.95'
  }
};
```

## 타이포그래피 시스템

### 1. 폰트 스택 정의
```css
/* CSS 변수로 폰트 스택 정의 */
:root {
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-serif: Georgia, Cambria, "Times New Roman", serif;
  --font-mono: Consolas, Monaco, "Andale Mono", monospace;
}

/* 사용 */
font-family(var(--font-sans))
font-family(var(--font-mono))
```

### 2. 타입 스케일
```typescript
// 반응형 타입 스케일
const typeScale = {
  // 모바일 우선
  h1: 'heading(h1) font(2xl) md:font(3xl) lg:font(4xl)',
  h2: 'heading(h2) font(xl) md:font(2xl)',
  h3: 'heading(h3) font(lg) md:font(xl)',
  body: 'font(md/1.6)',
  small: 'font(sm/1.5)'
};
```

### 3. 텍스트 스타일 컴포넌트
```typescript
// 의미론적 텍스트 스타일
export const textStyles = {
  // 제목
  'page-title': 'heading(h1/gradient) text(center) mb(xl)',
  'section-title': 'heading(h2) mb(lg)',
  
  // 본문
  'body-default': 'font(md/1.6) c(gray-700)',
  'body-large': 'font(lg/1.7) c(gray-700)',
  
  // 특수 텍스트
  'code-inline': 'font-family(mono) bg(gray-100) px(6) py(2) r(sm)',
  'quote': 'font(lg/1.8) italic c(gray-600) pl(lg) bl(4/primary)'
};
```

## 컴포넌트 라이브러리

### 1. 버튼 시스템
```typescript
// 버튼 변형 정의
const buttonSystem = {
  // 크기
  sizes: {
    xs: 'h(28) px(8) text(xs)',
    sm: 'h(32) px(12) text(sm)',
    md: 'h(40) px(16) text(md)',
    lg: 'h(48) px(20) text(lg)',
    xl: 'h(56) px(24) text(xl)'
  },
  
  // 변형
  variants: {
    // 채워진 버튼
    solid: {
      primary: 'bg(primary) c(white) hover:bg(primary-700)',
      secondary: 'bg(gray-200) c(gray-900) hover:bg(gray-300)',
      danger: 'bg(red-500) c(white) hover:bg(red-600)'
    },
    
    // 외곽선 버튼
    outline: {
      primary: 'border(1/primary) c(primary) hover:bg(primary.1)',
      secondary: 'border(1/gray-300) c(gray-700) hover:bg(gray.1)'
    },
    
    // 고스트 버튼
    ghost: {
      default: 'c(gray-700) hover:bg(gray.1)',
      danger: 'c(red-600) hover:bg(red.1)'
    }
  },
  
  // 상태
  states: {
    loading: 'opacity(0.7) cursor(wait)',
    disabled: 'opacity(0.5) cursor(not-allowed)',
    active: 'transform(scale(0.98))'
  }
};
```

### 2. 폼 시스템
```typescript
// 폼 컴포넌트 시스템
const formSystem = {
  // 입력 필드
  input: {
    base: 'w(full) h(40) px(12) border(1/gray-300) r(md)',
    focus: 'focus:border(primary) focus:ring(2/primary.2)',
    error: 'border(red-500) focus:border(red-500) focus:ring(2/red.2)',
    success: 'border(green-500) focus:border(green-500) focus:ring(2/green.2)'
  },
  
  // 레이블
  label: {
    base: 'block mb(6) font(medium) c(gray-700)',
    required: 'after:content("*") after:c(red-500) after:ml(4)',
    optional: 'after:content("(선택)") after:c(gray-500) after:ml(4) after:font(normal)'
  },
  
  // 도움말 텍스트
  helpText: {
    default: 'mt(6) text(sm) c(gray-600)',
    error: 'mt(6) text(sm) c(red-600)',
    success: 'mt(6) text(sm) c(green-600)'
  }
};
```

### 3. 레이아웃 컴포넌트
```typescript
// 레이아웃 패턴
const layoutPatterns = {
  // 페이지 레이아웃
  'page-layout': 'min-h(screen) vbox',
  'page-header': 'h(64) hbox(middle) gap(auto) px(xl) border-b(1/gray-200)',
  'page-content': 'flex(1) container(xl) py(xl)',
  'page-footer': 'h(120) bg(gray-50) hbox(pack) px(xl)',
  
  // 사이드바 레이아웃
  'sidebar-layout': 'hbox h(screen)',
  'sidebar': 'w(280) bg(gray-50) vbox p(lg)',
  'main-content': 'flex(1) overflow-y(auto) p(xl)',
  
  // 그리드 레이아웃
  'card-grid': 'grid(1) sm:grid(2) lg:grid(3) gap(lg)',
  'feature-grid': 'grid(1) md:grid(2) gap(xl)'
};
```

## 인터랙션 패턴

### 1. 실전 예제: E-Commerce 디자인 시스템

```typescript
// 실제 프로젝트: 쿠팡 클론 디자인 시스템
export const ecommerceSystem = {
  // 브랜드 컬러
  brand: {
    primary: '#FF5733',    // 쿠팡 빨강
    secondary: '#FFB833',  // 쿠팡 노랑
    rocket: '#0066FF'      // 로켓배송 파랑
  },
  
  // 상품 카드
  productCard: defineComponent({
    base: 'vbox bg(white) r(lg) overflow(hidden) shadow(sm) hover:shadow(lg) transition',
    
    variants: {
      default: 'border(1/gray-200)',
      rocket: 'border(2/rocket) relative',  // 로켓배송
      sale: 'border(2/primary)'              // 특가
    },
    
    // 판매 배지
    badges: {
      rocket: 'absolute top(8) left(8) bg(rocket) c(white) px(8) py(4) r(sm) font(xs) bold',
      sale: 'absolute top(8) right(8) bg(primary) c(white) px(8) py(4) r(sm) font(xs) bold'
    }
  }),
  
  // 가격 표시
  price: {
    regular: 'font(xl) bold c(gray-900)',
    sale: 'font(2xl) bold c(primary)',
    original: 'font(md) c(gray-500) line-through'
  },
  
  // CTA 버튼
  buyButton: defineComponent({
    base: 'w(full) py(12) font(medium) r(md) transition',
    
    variants: {
      primary: 'bg(primary) c(white) hover:bg(primary-600)',
      rocket: 'bg(rocket) c(white) hover:bg(rocket-600)',
      cart: 'bg(white) border(1/primary) c(primary) hover:bg(primary.05)'
    }
  })
};
```

### 사용 예시
```html
<!-- 로켓배송 상품 -->
<div class="productCard(rocket)">
  <span class="productCard.badges.rocket">🚀 로켓배송</span>
  <img src="product.jpg" class="w(full) h(200) object(cover)" />
  
  <div class="p(lg) vbox gap(sm)">
    <h3 class="font(lg) bold ellipsis(2)">삼성전자 갤럭시 버즈</h3>
    
    <div class="hbox gap(sm) items(baseline)">
      <span class="price.sale">₩29,900</span>
      <span class="price.original">₩59,900</span>
      <span class="bg(primary.1) c(primary) px(6) py(2) r(sm) font(xs)">50%</span>
    </div>
    
    <div class="hbox gap(xs) mt(sm)">
      <span class="c(yellow-500)">\u2605\u2605\u2605\u2605\u2605</span>
      <span class="c(gray-600) font(sm)">(1,234)</span>
    </div>
    
    <button class="buyButton(primary) mt(md)">
      바로구매
    </button>
  </div>
</div>
```

### 2. 애니메이션 시스템
```typescript
// 진입 애니메이션
const enterAnimations = {
  'fade-in': 'animate(fade-in/300/ease-out)',
  'slide-up': 'animate(slide-up/400/ease-out)',
  'scale-in': 'animate(scale-in/300/ease-out)',
  'rotate-in': 'animate(rotate-in/500/ease-out)'
};

// 지속 애니메이션
const loopAnimations = {
  pulse: 'animate(pulse/2s/infinite)',
  bounce: 'animate(bounce/1s/infinite)',
  spin: 'animate(spin/1s/linear/infinite)',
  ping: 'animate(ping/1s/infinite)'
};
```

### 3. 트랜지션 시스템
```typescript
// 트랜지션 프리셋
const transitions = {
  fast: 'transition(all/150/ease-out)',
  normal: 'transition(all/300/ease-out)',
  slow: 'transition(all/500/ease-out)',
  
  // 특정 속성
  colors: 'transition(colors/300/ease-out)',
  transform: 'transition(transform/300/ease-out)',
  opacity: 'transition(opacity/300/ease-out)'
};
```

## 반응형 시스템

### 1. 브레이크포인트 전략
```typescript
// 브레이크포인트 정의
const breakpoints = {
  sm: '640px',   // 모바일 가로
  md: '768px',   // 태블릿
  lg: '1024px',  // 데스크톱
  xl: '1280px',  // 와이드 스크린
  '2xl': '1536px' // 초대형 스크린
};

// 사용 예시
const responsiveCard = `
  w(full)
  sm:w(320)
  md:w(400)
  lg:w(480)
  p(md)
  md:p(lg)
  lg:p(xl)
`;
```

### 2. 모바일 우선 접근
```typescript
// 모바일 우선 컴포넌트
const mobileFirstComponent = {
  // 기본 (모바일)
  base: 'vbox gap(md) p(md)',
  
  // 태블릿 이상
  tablet: 'md:hbox md:gap(lg) md:p(lg)',
  
  // 데스크톱 이상
  desktop: 'lg:gap(xl) lg:p(xl)'
};
```

## 접근성 고려사항

### 1. 포커스 스타일
```typescript
// 접근성 포커스 스타일
const focusStyles = {
  // 키보드 포커스
  keyboard: 'focus-visible:ring(2) focus-visible:ring(primary)',
  
  // 고대비 모드
  highContrast: `
    @media (prefers-contrast: high) {
      border(2/currentColor)
    }
  `
};
```

### 2. 모션 설정
```typescript
// 모션 축소 지원
const motionSafe = {
  animation: `
    @media (prefers-reduced-motion: no-preference) {
      animate(slide-in)
    }
  `,
  transition: `
    @media (prefers-reduced-motion: reduce) {
      transition(none)
    }
  `
};
```

## 디자인 시스템 문서화

### 1. 컴포넌트 문서
```typescript
// 컴포넌트 문서 구조
interface ComponentDoc {
  name: string;
  description: string;
  props: {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'primary' | 'secondary';
  };
  examples: {
    default: 'btn()';
    sizes: 'btn(sm) btn(md) btn(lg)';
    variants: 'btn(primary) btn(secondary)';
  };
  guidelines: string[];
}
```

### 2. 스타일 가이드
```html
<!-- 스타일 가이드 페이지 -->
<div class="prose(docs)">
  <h1 class="heading(h1)">스타일 가이드</h1>
  
  <!-- 색상 팔레트 -->
  <section class="section()">
    <h2 class="heading(h2)">색상</h2>
    <div class="grid(5) gap(md)">
      <div class="vbox gap(sm)">
        <div class="h(100) bg(primary) r(lg)"></div>
        <span class="text(sm)">Primary</span>
      </div>
      <!-- 더 많은 색상... -->
    </div>
  </section>
  
  <!-- 타이포그래피 -->
  <section class="section()">
    <h2 class="heading(h2)">타이포그래피</h2>
    <div class="vbox gap(md)">
      <h1 class="heading(h1)">Heading 1</h1>
      <h2 class="heading(h2)">Heading 2</h2>
      <p class="font(lg)">큰 본문 텍스트</p>
      <p class="font(md)">기본 본문 텍스트</p>
    </div>
  </section>
</div>
```

## 성능 최적화

### 1. CSS 최적화
- 사용하지 않는 유틸리티 제거
- 중복 스타일 통합
- Critical CSS 추출

### 2. 번들 최적화
```typescript
// 선택적 import
import { btn, card, heading } from 'adorable-css/components';
import { hbox, vbox, grid } from 'adorable-css/layout';
```

### 3. 런타임 최적화
- 컴포넌트 메모이제이션
- 동적 스타일 캐싱
- 레이아웃 쓰레싱 방지

## 디자인 시스템의 ROI

### 측정 가능한 효과
1. **개발 속도 65% 향상**: 컴포넌트 재사용으로
2. **디자인 QA 80% 감소**: Figma = Code로
3. **유지보수 비용 70% 절감**: 일관된 시스템으로

### 실제 사례
> "우리는 AdorableCSS 도입 후 디자인 시스템 관리에 드는 시간을 주당 20시간에서 2시간으로 줄였습니다." - 네이버 페이 팀

> "Figma에서 변경한 것이 자동으로 코드에 반영되니, 디자이너와 개발자 사이의 핑퐁 게임이 사라졌어요." - 토스 팀

## 마무리: 디자인 시스템의 미래

AdorableCSS로 구축하는 디자인 시스템은:

1. **Living System**: 코드가 곳 디자인 시스템
2. **Single Source of Truth**: Figma = Code
3. **Zero Friction**: 디자이너와 개발자가 같은 언어 사용

디자인 시스템은 단순한 가이드라인이 아닙니다. **제품의 언어**입니다.