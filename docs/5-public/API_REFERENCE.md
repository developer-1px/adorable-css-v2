# API Reference

## Rules Reference

AdorableCSS의 모든 규칙과 유틸리티 클래스에 대한 완전한 레퍼런스입니다.

### 레이아웃 (Layout)

#### Auto Layout (Flexbox)
```css
/* 기본 박스 */
hbox()              /* display: flex; flex-direction: row; align-items: center */
vbox()              /* display: flex; flex-direction: column */

/* 정렬 옵션 */
hbox(left)          /* justify-content: flex-start */
hbox(pack)        /* justify-content: center */
hbox(right)         /* justify-content: flex-end */
hbox(middle) gap(auto)       /* justify-content: space-between */
hbox(around)        /* justify-content: space-around */
hbox(evenly)        /* justify-content: space-evenly */

/* 교차축 정렬 */
hbox(top)           /* align-items: flex-start */
hbox(middle)        /* align-items: center */
hbox(bottom)        /* align-items: flex-end */
hbox(fill)          /* align-items: stretch */

/* 복합 정렬 */
hbox(center+middle) /* 완전 중앙 정렬 */
vbox(between+center)/* 위아래 끝 + 가로 중앙 */

/* Wrap */
wrap                /* flex-wrap: wrap */
nowrap              /* flex-wrap: nowrap */
wrap-reverse        /* flex-wrap: wrap-reverse */
```

#### Grid
```css
/* 기본 그리드 */
grid                /* display: grid */
grid(3)             /* grid-template-columns: repeat(3, 1fr) */
grid(auto-fit)      /* repeat(auto-fit, minmax(200px, 1fr)) */

/* 커스텀 템플릿 */
grid-cols(200px_1fr_200px)  /* 사이드바 레이아웃 */
grid-rows(60px_1fr_100px)   /* 헤더-콘텐츠-푸터 */

/* 그리드 아이템 */
col-span(2)         /* grid-column: span 2 */
row-span(3)         /* grid-row: span 3 */
grid-area(header)   /* grid-area: header */
```

#### 간격 (Gap)
```css
gap(16)             /* gap: 16px */
gap(sm)             /* gap: var(--spacing-sm) */
gap(auto)           /* justify-content: space-between */
gap-x(20)           /* column-gap: 20px */
gap-y(10)           /* row-gap: 10px */
```

### 크기 (Size)

#### 너비 (Width)
```css
/* 고정 너비 */
w(320)              /* width: 320px */
w(50%)              /* width: 50% */
w(100vw)            /* width: 100vw */

/* 토큰 너비 */
w(sm)               /* width: var(--size-sm) */
w(container)        /* width: var(--container-lg) */

/* 특수 값 */
w(full)             /* width: 100% */
w(screen)           /* width: 100vw */
w(auto)             /* width: auto */
w(min)              /* width: min-content */
w(max)              /* width: max-content */
w(fit)              /* width: fit-content */

/* Figma 제약 */
w(fill)             /* width: 100%; flex: 1 */
w(hug)              /* width: fit-content */

/* 최소/최대 */
min-w(320)          /* min-width: 320px */
max-w(1200)         /* max-width: 1200px */
```

#### 높이 (Height)
```css
/* 고정 높이 */
h(200)              /* height: 200px */
h(100vh)            /* height: 100vh */

/* 특수 값 */
h(full)             /* height: 100% */
h(screen)           /* height: 100vh */
h(auto)             /* height: auto */
h(fill)             /* height: 100%; flex: 1 */
h(hug)              /* height: fit-content */

/* 최소/최대 */
min-h(100)          /* min-height: 100px */
max-h(500)          /* max-height: 500px */
```

#### Size 유틸리티
```css
size(64)            /* width: 64px; height: 64px */
size(16:9)          /* aspect-ratio: 16/9 */
size(320x200)       /* width: 320px; height: 200px */
size(text)          /* width: max-content; height: max-content */
```

### 간격 (Spacing)

#### 패딩 (Padding)
```css
/* 전체 패딩 */
p(20)               /* padding: 20px */
p(sm)               /* padding: var(--spacing-sm) */

/* 축별 패딩 */
px(20)              /* padding-left: 20px; padding-right: 20px */
py(10)              /* padding-top: 10px; padding-bottom: 10px */

/* 개별 패딩 */
pt(10)              /* padding-top */
pr(20)              /* padding-right */
pb(30)              /* padding-bottom */
pl(40)              /* padding-left */
```

#### 마진 (Margin)
```css
/* 전체 마진 */
m(20)               /* margin: 20px */
m(auto)             /* margin: auto */

/* 축별 마진 */
mx(auto)            /* margin-left: auto; margin-right: auto */
my(20)              /* margin-top: 20px; margin-bottom: 20px */

/* 개별 마진 */
mt(10)              /* margin-top */
mr(20)              /* margin-right */
mb(30)              /* margin-bottom */
ml(40)              /* margin-left */
```

### 포지션 (Position)

#### Position 타입
```css
relative            /* position: relative */
absolute            /* position: absolute */
fixed               /* position: fixed */
sticky              /* position: sticky */
static              /* position: static */
```

#### Layer 시스템
```css
/* 중앙 정렬 */
layer(center)       /* 완벽한 중앙 정렬 */

/* 모서리 정렬 */
layer(top-left)     /* 왼쪽 상단 */
layer(top-right)    /* 오른쪽 상단 */
layer(bottom-left)  /* 왼쪽 하단 */
layer(bottom-right) /* 오른쪽 하단 */

/* 복합 포지셔닝 */
layer(top:20/left:30)    /* top: 20px; left: 30px */
layer(center/top:20)     /* 가로 중앙, top: 20px */

/* Fill 포지셔닝 */
layer(fill)         /* inset: 0 */
layer(fill/20)      /* inset: 20px */
```

#### 좌표 시스템
```css
(20,30)             /* left: 20px; top: 30px */
(center,top)        /* 가로 중앙, 상단 */
(100%-20,50%+10)    /* 계산식 포지셔닝 */
```

#### 개별 위치
```css
top(20)             /* top: 20px */
right(0)            /* right: 0 */
bottom(auto)        /* bottom: auto */
left(50%)           /* left: 50% */
inset(20)           /* inset: 20px */
```

#### Z-index
```css
z(10)               /* z-index: 10 */
z(modal)            /* z-index: var(--z-modal) */
z(dropdown)         /* z-index: var(--z-dropdown) */
```

### 색상 (Color)

#### 텍스트 색상
```css
c(black)            /* color: black */
c(white)            /* color: white */
c(gray-500)         /* color: var(--gray-500) */
c(primary)          /* color: var(--primary) */

/* 투명도 */
c(black.5)          /* color: rgba(0,0,0,0.5) */
c(white.8)          /* color: rgba(255,255,255,0.8) */
c(blue-500.3)       /* 30% 투명도 */

/* 그라디언트 텍스트 */
c(45deg/purple-500..pink-500)
c(to-r/blue-500..green-500)
```

#### 배경색
```css
bg(white)           /* background-color: white */
bg(gray-100)        /* background-color: var(--gray-100) */
bg(transparent)     /* background-color: transparent */

/* 투명도 */
bg(black.1)         /* 10% 투명 검정 */
bg(white.95)        /* 95% 불투명 흰색 */

/* 그라디언트 */
bg(purple-500..pink-500)           /* 기본 135deg */
bg(45deg/red-500..yellow-500)      /* 각도 지정 */
bg(to-br/blue-500..green-500)      /* 방향 키워드 */
bg(radial/purple-500..transparent)  /* 방사형 */
```

### 타이포그래피

#### 폰트 크기
```css
font(16)            /* font-size: 16px */
font(sm)            /* font-size: var(--font-sm) */
font(xl)            /* font-size: var(--font-xl) */

/* 통합 문법 */
font(16/1.5)        /* font-size + line-height */
font(16/1.5/-2%)    /* + letter-spacing */
```

#### 폰트 굵기
```css
bold()              /* font-weight: 700 */
bold(600)           /* font-weight: 600 */
bold(semi)          /* Deprecated: use bold(600) */
bold(400)           /* font-weight: 400 (normal) */
bold(300)           /* font-weight: 300 (light) */
```

#### 텍스트 정렬
```css
text(center)        /* text-align: center */
text(left)          /* text-align: left */
text(right)         /* text-align: right */
text(justify)       /* text-align: justify */
```

#### 텍스트 장식
```css
underline           /* text-decoration: underline */
line-through        /* text-decoration: line-through */
no-underline        /* text-decoration: none */
decoration(primary) /* text-decoration-color: var(--primary) */
```

#### 기타 텍스트
```css
italic              /* font-style: italic */
uppercase           /* text-transform: uppercase */
lowercase           /* text-transform: lowercase */
capitalize          /* text-transform: capitalize */
truncate            /* 텍스트 말줄임 */
```

### 테두리 (Border)

#### 전체 테두리
```css
border(1)           /* border: 1px solid */
border(2/blue-500)  /* border: 2px solid var(--blue-500) */
border(1/gray-200.5)/* 50% 투명 테두리 */
border(none)        /* border: none */
```

#### 개별 테두리
```css
bt(1/gray-200)      /* border-top */
br(2/primary)       /* border-right */
bb(1/transparent)   /* border-bottom */
bl(4/accent)        /* border-left */
```

#### 테두리 반경
```css
r(8)                /* border-radius: 8px */
r(sm)               /* border-radius: var(--radius-sm) */
r(lg)               /* border-radius: var(--radius-lg) */
r(full)             /* border-radius: 9999px */

/* 개별 모서리 */
r-tl(8)             /* border-top-left-radius */
r-tr(8)             /* border-top-right-radius */
r-bl(8)             /* border-bottom-left-radius */
r-br(8)             /* border-bottom-right-radius */
```

### 효과 (Effects)

#### 그림자
```css
shadow(sm)          /* box-shadow: var(--shadow-sm) */
shadow(lg)          /* box-shadow: var(--shadow-lg) */
shadow(none)        /* box-shadow: none */
shadow(inner)       /* 내부 그림자 */
shadow(2xl/black.5) /* 커스텀 그림자 */
```

#### 투명도
```css
opacity(0.5)        /* opacity: 0.5 */
opacity(0)          /* opacity: 0 (invisible) */
opacity(1)          /* opacity: 1 (visible) */
```

#### 필터
```css
blur(4)             /* filter: blur(4px) */
blur(sm)            /* filter: blur(var(--blur-sm)) */
brightness(1.1)     /* filter: brightness(1.1) */
contrast(1.2)       /* filter: contrast(1.2) */
grayscale           /* filter: grayscale(1) */
```

#### 백드롭 필터
```css
backdrop(8)         /* backdrop-filter: blur(8px) */
backdrop(lg)        /* backdrop-filter: blur(var(--blur-lg)) */
```

### 변환 (Transform)

#### 크기 조절
```css
scale(1.05)         /* transform: scale(1.05) */
scale-x(1.2)        /* transform: scaleX(1.2) */
scale-y(0.8)        /* transform: scaleY(0.8) */
```

#### 회전
```css
rotate(45)          /* transform: rotate(45deg) */
rotate(-90)         /* transform: rotate(-90deg) */
```

#### 이동
```css
translate-x(10)     /* transform: translateX(10px) */
translate-y(-20)    /* transform: translateY(-20px) */
translate-x(50%)    /* transform: translateX(50%) */
```

#### 기울이기
```css
skew-x(10)          /* transform: skewX(10deg) */
skew-y(-5)          /* transform: skewY(-5deg) */
```

### 애니메이션

#### 트랜지션
```css
transition          /* transition: all 0.3s ease */
transition(300)     /* transition: all 300ms ease */
transition(all/500/ease-out)
transition(colors)  /* transition: background-color, color, border-color */
transition(none)    /* transition: none */
```

#### 애니메이션
```css
animate(fade-in)    /* animation: fade-in 0.3s ease */
animate(slide-up/500)
animate(bounce/1s/infinite)
animate(spin/1s/linear/infinite)
```

### 상태 (States)

#### 의사 클래스
```css
hover:scale(1.05)   /* :hover { transform: scale(1.05) } */
focus:ring(2)       /* :focus { box-shadow: ring } */
active:opacity(0.8) /* :active { opacity: 0.8 } */
disabled:opacity(0.5)
```

#### 그룹 상태
```css
group               /* 부모 요소에 추가 */
group-hover:visible /* 부모 hover 시 표시 */
group-focus:opacity(1)
```

### 반응형

#### 브레이크포인트
```css
sm:w(full)          /* @media (min-width: 640px) */
md:grid(2)          /* @media (min-width: 768px) */
lg:gap(xl)          /* @media (min-width: 1024px) */
xl:p(2xl)           /* @media (min-width: 1280px) */
```

### 유틸리티

#### 표시/숨김
```css
hidden              /* display: none */
block               /* display: block */
inline              /* display: inline */
inline-block        /* display: inline-block */
flex                /* display: flex */
grid                /* display: grid */
```

#### 오버플로우
```css
clip    /* overflow: hidden */
overflow(auto)      /* overflow: auto */
overflow(scroll)    /* overflow: scroll */
overflow-x(auto)    /* overflow-x: auto */
overflow-y(hidden)  /* overflow-y: hidden */
clip                /* overflow: hidden (단축) */
scrollable          /* overflow: auto (단축) */
```

#### 커서
```css
cursor(pointer)     /* cursor: pointer */
cursor(default)     /* cursor: default */
cursor(not-allowed) /* cursor: not-allowed */
cursor(grab)        /* cursor: grab */
```

#### 기타
```css
select(none)        /* user-select: none */
select(text)        /* user-select: text */
pointer-events(none)/* pointer-events: none */
resize(none)        /* resize: none */
```

### 컴포넌트

#### 내장 컴포넌트
```css
btn()               /* 기본 버튼 */
btn(primary)        /* 주요 버튼 */
btn(secondary/lg)   /* 보조 대형 버튼 */

card()              /* 기본 카드 */
card(elevated)      /* 그림자 강조 카드 */
card(glass)         /* 글래스모피즘 카드 */

heading(h1)         /* h1 제목 */
heading(h2/gradient)/* 그라디언트 h2 제목 */

prose()             /* 문서 스타일 */
prose(docs)         /* 문서용 스타일 */

container()         /* 반응형 컨테이너 */
container(lg)       /* 대형 컨테이너 */
```

### 특수 효과

#### Glass 효과
```css
glass()             /* 기본 글래스모피즘 */
glass(strong)       /* 강한 효과 */
glass(20/0.2/blue)  /* blur/opacity/tint */
```

#### Interactive 효과
```css
interactive(1)      /* 미세한 효과 */
interactive(3)      /* 중간 효과 */
interactive(5)      /* 매우 강한 효과 */
clickable()         /* 클릭 가능 */
hoverable()         /* 호버 효과 */
```

#### Glow 효과
```css
glow()              /* 기본 글로우 */
glow(primary)       /* 주요 색상 글로우 */
glow(lg)            /* 강한 글로우 */
```

## JavaScript API

AdorableCSS를 프로그래매틱하게 사용하기 위한 JavaScript API 가이드입니다.

### 기본 사용법

#### CSS 생성

```javascript
import { generateCSS } from 'adorable-css';

// 클래스 배열에서 CSS 생성
const css = generateCSS(['hbox', 'gap(16)', 'p(24)', 'bg(white)']);
console.log(css);
// 출력: .hbox{display:flex;flex-direction:row;align-items:center} ...

// 단일 클래스
const singleCSS = generateCSS(['hover:scale(1.05)']);
```

#### 파싱

```javascript
import { parseAdorableCSS } from 'adorable-css';

// AdorableCSS 문법 파싱
const ast = parseAdorableCSS('hover:md:scale(1.1)');
console.log(ast);
// {
//   type: 'utility',
//   prefixes: ['hover', 'md'],
//   property: 'scale',
//   args: [{ type: 'value', value: '1.1' }],
//   important: false
// }
```

#### 규칙 조회

```javascript
import { getRuleHandler } from 'adorable-css';

// 특정 규칙 핸들러 가져오기
const scaleHandler = getRuleHandler('scale');
if (scaleHandler) {
  const css = scaleHandler('1.05');
  console.log(css); // { transform: 'scale(1.05)' }
}
```

### 브라우저 환경

#### 자동 스타일 주입

```javascript
import { injectGlobal } from 'adorable-css';

// DOM에 자동으로 스타일 주입 (개발용)
if (typeof window !== 'undefined') {
  injectGlobal();
}

// 이제 HTML에서 직접 사용 가능
// <div class="hbox gap(lg) p(xl)">...</div>
```

#### CDN 사용

```html
<script src="https://unpkg.com/adorable-css/dist/adorable.min.js"></script>
<script>
  // 전역 AdorableCSS 객체 사용
  const css = AdorableCSS.generateCSS(['card()', 'p(lg)', 'shadow(md)']);
  
  // 자동 주입
  AdorableCSS.injectGlobal();
</script>
```

### 디자인 토큰

#### 토큰 접근

```javascript
import { defaultTokens } from 'adorable-css';

// 토큰 값 사용
const spacing = defaultTokens.spacing.md;  // "1rem"
const fontSize = defaultTokens.font.lg;     // "1.125rem"
const color = defaultTokens.colors.blue[500]; // "oklch(...)"
```

#### 토큰 설정

```javascript
import { setTokenContext, generateTokenCSS } from 'adorable-css';

// 커스텀 토큰 설정
const customTokens = {
  ...defaultTokens,
  spacing: {
    ...defaultTokens.spacing,
    xxl: '4rem'  // 추가 간격
  },
  colors: {
    ...defaultTokens.colors,
    brand: '#FF6B6B'  // 브랜드 색상
  }
};

setTokenContext(customTokens);

// 토큰 CSS 생성
const tokenCSS = generateTokenCSS();
```

#### 토큰 자동 주입

```javascript
import { autoInjectTokens, configureAutoInject, isTokensInjected } from 'adorable-css';

// 자동 주입 비활성화
configureAutoInject({ enabled: false });

// 수동 주입
if (!isTokensInjected()) {
  autoInjectTokens();
}
```

### 색상 시스템

#### 테마 설정

```javascript
import { setTheme, getCurrentTheme } from 'adorable-css';

// 테마 변경
setTheme('vibrant');  // 'default', 'vibrant', 'pastel', 'dark', 'warm', 'cool'

// 현재 테마 확인
const theme = getCurrentTheme();
console.log(theme); // 'vibrant'
```

#### 의미론적 색상

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

#### 커스텀 테마

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

### 컴포넌트 시스템

#### 컴포넌트 정의

```javascript
import { defineComponent } from 'adorable-css';

// 커스텀 컴포넌트 정의
const myButton = defineComponent({
  base: 'inline-flex items(center) px(16) h(40) r(md) transition',
  
  sizes: {
    sm: 'h(32) px(12) text(sm)',
    md: 'h(40) px(16) text(md)',
    lg: 'h(48) px(20) text(lg)'
  },
  
  variants: {
    primary: 'bg(primary) c(white) hover:bg(primary-700)',
    secondary: 'bg(gray-100) c(gray-900) hover:bg(gray-200)',
    danger: 'bg(red-500) c(white) hover:bg(red-600)'
  },
  
  compounds: [
    {
      variant: 'primary',
      size: 'lg',
      class: 'font-weight(bold)'
    }
  ],
  
  defaults: {
    size: 'md',
    variant: 'primary'
  }
});

// 컴포넌트 등록
import { registerComponent } from 'adorable-css';
registerComponent('my-btn', myButton);
```

#### 테마 지원 컴포넌트

```javascript
import { defineThemedComponent } from 'adorable-css';

const themedCard = defineThemedComponent({
  light: {
    base: 'bg(white) c(gray-900) shadow(md)',
    variants: {
      elevated: 'shadow(xl)',
      flat: 'shadow(none) border(1/gray-200)'
    }
  },
  dark: {
    base: 'bg(gray-800) c(white) shadow(xl/black.3)',
    variants: {
      elevated: 'shadow(2xl/black.5)',
      flat: 'shadow(none) border(1/gray-700)'
    }
  }
});
```

### 확장성

#### 커스텀 규칙 추가

```javascript
import { priorityRegistry, RulePriority } from 'adorable-css';

// 새로운 유틸리티 추가
priorityRegistry.register('glow', (value = '10') => ({
  boxShadow: `0 0 ${value}px currentColor`,
  filter: 'brightness(1.1)'
}), RulePriority.UTILITY);

// 사용
const css = generateCSS(['glow(20)', 'c(blue-500)']);
```

#### 커스텀 키프레임

```javascript
import { registerKeyframes } from 'adorable-css';

// 키프레임 추가
registerKeyframes('slide-in', {
  from: {
    transform: 'translateX(-100%)',
    opacity: '0'
  },
  to: {
    transform: 'translateX(0)',
    opacity: '1'
  }
});

// 사용
const css = generateCSS(['animate(slide-in/500/ease-out)']);
```

#### 플러그인 시스템

```javascript
import { createPlugin } from 'adorable-css';

const myPlugin = createPlugin({
  name: 'my-plugin',
  
  rules: {
    'my-utility': (value) => ({
      // CSS 속성
    })
  },
  
  keyframes: {
    // 키프레임 정의
  },
  
  tokens: {
    // 추가 토큰
  }
});

// 플러그인 등록
import { registerPlugin } from 'adorable-css';
registerPlugin(myPlugin);
```

### 성능 최적화

#### 캐싱

```javascript
import { createMemo } from 'adorable-css';

// 메모이제이션된 함수 생성
const memoizedGenerate = createMemo((classes) => {
  return generateCSS(classes);
});

// 동일한 입력에 대해 캐시된 결과 반환
const css1 = memoizedGenerate(['hbox', 'gap(lg)']);
const css2 = memoizedGenerate(['hbox', 'gap(lg)']); // 캐시에서 반환
```

#### 선택적 Import

```javascript
// 필요한 것만 import
import { generateCSS } from 'adorable-css/core';
import { btn, card } from 'adorable-css/components';
import { hbox, vbox } from 'adorable-css/layout';
```

### 타입스크립트

#### 타입 정의

```typescript
import type {
  CSSRule,
  DesignTokens,
  RuleHandler,
  ComponentDefinition
} from 'adorable-css';

// 타입 안전한 규칙 정의
const myRule: RuleHandler = (value?: string): CSSRule => {
  return {
    display: 'flex',
    gap: value || '1rem'
  };
};

// 타입 안전한 토큰
const tokens: DesignTokens = {
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem'
  }
};
```

### 디버깅

#### 디버그 모드

```javascript
import { enableDebugMode } from 'adorable-css';

// 디버그 모드 활성화
enableDebugMode();

// 이제 파싱 과정과 CSS 생성 과정이 콘솔에 출력됨
```

#### 에러 처리

```javascript
try {
  const css = generateCSS(['invalid(syntax']);
} catch (error) {
  if (error instanceof AdorableCSSError) {
    console.error('Parsing error:', error.message);
    console.error('At position:', error.position);
  }
}
```

### 마이그레이션

#### v1에서 v2로

```javascript
// v1
import adorable from 'adorable-css';
adorable.parse('w-100 h-100');

// v2
import { generateCSS } from 'adorable-css';
generateCSS(['w(100)', 'h(100)']);
```

## 마무리

AdorableCSS의 JavaScript API는 강력하고 유연하며, 타입스크립트 지원을 통해 안전한 개발 경험을 제공합니다. 이를 통해 AdorableCSS를 빌드 시스템에 통합하거나, 런타임에 동적으로 스타일을 생성하는 등 다양한 방식으로 활용할 수 있습니다.
