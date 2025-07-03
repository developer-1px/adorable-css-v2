# AdorableCSS 개요

> "CSS was designed for documents. Figma was designed for interfaces. AdorableCSS bridges this 20-year gap."

AdorableCSS는 Figma의 디자인 시스템과 완벽하게 매핁되는 차세대 CSS 프레임워크입니다. 디자이너가 생각하는 방식 그대로 코드를 작성할 수 있습니다.

## 문제: 디자인과 코드의 간극

매일 수천 명의 개발자가 Figma 디자인을 CSS로 변환하느라 고생합니다:

```css
/* 전통적인 CSS - 디자이너의 의도가 사라짐 */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 16px;
width: 100%;
```

디자이너: "16px 간격의 세로 Auto Layout으로 만들어주세요"
개발자: "flex-direction: column... justify-content... 어?"

## 해결책: Figma의 언어로 말하는 CSS

AdorableCSS는 디자이너의 언어를 그대로 사용합니다:

```html
<!-- AdorableCSS - 디자인이 곳 코드 -->
<div class="vbox(center) gap(16) w(fill)">
```

**같은 결과, 80% 적은 코드**

## 핵심 철학

### 1. Figma-First 접근법
AdorableCSS는 Figma의 디자인 패널 순서와 개념을 그대로 따릅니다:
- **Auto Layout** → `hbox()`, `vbox()` 
- **Fill/Stroke** → `c()`, `bg()`, `border()`
- **Effects** → `shadow()`, `blur()`, `backdrop()`
- **Layer** → `layer()`, `z()`, `absolute`

### 2. CSS Native 문법
CSS 사양을 그대로 따르는 직관적인 문법:
```css
/* CSS Native 값 사용 */
scale(1.05)         /* transform: scale(1.05) */
rotate(45deg)       /* transform: rotate(45deg) */
opacity(0.5)        /* opacity: 0.5 */

/* 단위 자동 변환 */
w(320)              /* width: 320px */
gap(2rem)           /* gap: 2rem */
font(16/1.5)        /* font-size: 16px; line-height: 1.5 */
```

### 3. 의미론적 디자인 시스템
내장된 디자인 토큰과 컴포넌트로 일관된 UI 구축:
```css
/* 디자인 토큰 */
p(md)               /* padding: var(--spacing-md) */
text(xl)            /* font-size: var(--font-xl) */
r(lg)               /* border-radius: var(--radius-lg) */

/* 의미론적 컴포넌트 */
card()              /* 카드 컴포넌트 스타일 */
btn(primary/lg)     /* 프라이머리 대형 버튼 */
heading(h1)         /* h1 제목 스타일 */
```

## 왜 AdorableCSS인가?

### 개발자에게
- **80% 적은 코드**: 같은 결과를 5분의 1 코드로
- **Zero Mental Translation**: 디자인 스펙을 보고 바로 코드 작성
- **5분 학습**: Figma를 알면 바로 사용 가능

### 디자이너에게
- 드디어 개발자가 당신의 비전을 정확히 구현합니다
- "프로덕션에서는 다르게 보여요" 문제 해결
- 공통의 언어로 커뮤니케이션 개선

### 팀에게
- **50% 빠른 개발**: 디자인-개발 사이클 단축
- **디자인 시스템 동기화**: 한 번 정의, 모든 곳에 적용
- **협업 효율 극대화**: 같은 언어로 소통

## 주요 특징

### 1. 통합 문법 시스템
하나의 함수로 여러 속성을 제어:
```css
/* font() - 타이포그래피 통합 */
font(xl/1.5/-2%)    /* font-size + line-height + letter-spacing */

/* layer() - 포지셔닝 통합 */
layer(center)       /* 중앙 정렬 */
layer(top:20+left:30)  /* 상단 20px, 왼쪽 30px */

/* bg() - 배경 통합 */
bg(white)           /* 단색 배경 */
bg(to-tr/purple-500..pink-500)  /* 그라디언트 */
```

### 2. 직관적인 투명도 표현
점(.) 표기법으로 간단한 투명도 적용:
```css
c(black.5)          /* color: rgba(0,0,0,0.5) */
bg(white.2)         /* background: rgba(255,255,255,0.2) */
border(gray-200.8)  /* border-color: rgba(gray-200, 0.8) */
```

### 3. 반응형 디자인
간단한 prefix로 반응형 스타일 적용:
```css
w(full) md:w(768) lg:w(1024)      /* 반응형 너비 */
grid(1) md:grid(2) lg:grid(3)      /* 반응형 그리드 */
p(sm) md:p(md) lg:p(lg)            /* 반응형 패딩 */
```

### 4. 상태 관리
직관적인 상태 prefix:
```css
hover:scale(1.05)   /* hover 시 확대 */
focus:ring(2)       /* focus 시 링 */
active:opacity(0.8) /* active 시 투명도 */
group-hover:visible /* 그룹 hover 효과 */
```

## 아키텍처 개요

### 1. Parser 시스템
고성능 토크나이저와 AST 기반 파서로 복잡한 표현식 처리:
- 함수 호출: `bg(primary)`
- 연산자: `layer(100%-20,top+10)`
- 범위: `w(100..500)`
- 조합: `hover:bg(blue-500.8)`

### 2. Rule 시스템
우선순위 기반 규칙 등록으로 CSS 캐스케이드 제어:
- **Component (100)**: 재사용 가능한 컴포넌트
- **Layout (200)**: 레이아웃 시스템
- **Utility (300)**: 유틸리티 클래스
- **State (400)**: 상태 변경자
- **Responsive (500)**: 반응형 변경자

### 3. 확장 시스템
플러그인 아키텍처로 쉬운 확장:
```typescript
// 커스텀 규칙 추가
registerRule('my-effect', (value) => ({
  /* CSS 속성 */
}));

// 커스텀 키프레임
registerKeyframes('my-animation', {
  /* 키프레임 정의 */
});
```

## 철학: Gap-based Layout

### No Margin Rule
AdorableCSS는 margin을 사용하지 않습니다. 왜일까요?

1. **Figma에는 margin이 없다**: Figma는 gap과 padding만으로 모든 레이아웃을 구성합니다
2. **Margin은 예측 불가능**: margin collapse, 음수 margin 등 복잡한 규칙
3. **Gap은 명확하고 일관됨**: 항상 예상한 대로 동작

```html
<!-- ❌ Wrong: margin으로 간격 조절 -->
<div class="mb(20)">...</div>
<div class="mt(40)">...</div>

<!-- ✅ Correct: gap으로 간격 조절 -->
<div class="vbox gap(20)">
  <div>...</div>
  <div>...</div>
</div>
```

## 성능과 원칙

### Zero Runtime
```
Traditional CSS-in-JS        AdorableCSS
────────────────────────────────────────
Runtime: 50-200KB           Runtime: 0KB
Parse CSS at runtime        Compile-time only
Style injection overhead    Pure CSS output
Bundle bloat               Tree-shakable
```

### 실제 성능 지표
- **12KB** 평균 프로덕션 번들
- **0ms** 런타임 오버헤드
- **100%** tree-shakable
- **< 50ms** 빌드 시간 영향

## 시작하기

### 설치
```bash
npm install adorable-css
```

### 기본 사용
```javascript
import { generateCSS } from 'adorable-css';

// 클래스에서 CSS 생성
const css = generateCSS([
  'hbox(middle)',
  'p(lg)',
  'bg(white)',
  'shadow(md)',
  'hover:shadow(lg)'
]);
```

### HTML에서 사용
```html
<div class="card() p(lg) hover:shadow(lg)">
  <h2 class="heading(h2) mb(md)">제목</h2>
  <p class="text(gray-600) line-height(1.6)">
    내용...
  </p>
</div>
```

## 다음 단계

- [Figma-First CSS Utility](/docs/figma-first-css-utility) - Figma 개념과 CSS 매핑
- [Design Token](/docs/design-token) - 디자인 토큰 시스템
- [Layout](/docs/layout) - 레이아웃 시스템
- [Component](/docs/component) - 컴포넌트 시스템
- [Design System](/docs/design-system) - 디자인 시스템 구축