---
title: AdorableCSS v2 기술 아키텍처 심층 분석
description: AdorableCSS v2의 핵심 아키텍처, 파서 시스템, 룰 엔진, 토큰 시스템에 대한 완전한 기술적 분석
order: 52
category: Technical Deep Dive
---

# AdorableCSS v2 기술 아키텍처 심층 분석

AdorableCSS v2는 Figma의 디자인 개념을 CSS로 직접 매핑하는 차세대 CSS 프레임워크입니다. 이 문서에서는 실제 구현된 기술 아키텍처를 상세히 살펴봅니다.

## 개요

AdorableCSS v2의 목표는 단순합니다: **Figma에서 디자인하는 것처럼 CSS를 작성하는 것**. 디자이너와 개발자 간의 인지적 간극을 줄이고, Figma의 멘탈 모델을 CSS 유틸리티로 직접 표현할 수 있게 합니다.

## 핵심 철학

### 1. Figma-First 디자인

전통적인 CSS 프레임워크와 달리, AdorableCSS는 Figma의 개념에서 시작합니다:

```html
<!-- 전통적인 CSS 접근 -->
<div class="display-flex flex-direction-column gap-16">

<!-- AdorableCSS 접근 -->
<div class="vbox gap(16)">
```

이는 단순한 문법적 편의가 아닙니다. 디자이너가 "16px 간격의 수직 Auto Layout"이라고 말하면, 정확히 그대로 코드를 작성할 수 있습니다.

### 2. 런타임 없는 순수 CSS

AdorableCSS는 빌드 시점에 순수 CSS를 생성합니다. JavaScript 런타임이나 클라이언트 측 파싱이 없어 브라우저가 효율적으로 캐싱할 수 있습니다.

### 3. 파서 기반 아키텍처

프레임워크의 강력함은 복잡한 표현식을 이해하는 커스텀 파서에서 나옵니다:

```css
/* 단순 값 */
w(300)           → width: 300px
w(50%)           → width: 50%

/* 복잡한 표현식 */
layer(top:20+left:30)  → position: absolute; top: 20px; left: 30px
font(lg/1.5/-2%)       → font-size: var(--font-lg); line-height: 1.5; letter-spacing: -0.02em
```

## 기술 아키텍처

### 파서 시스템

AdorableCSS의 핵심은 정교한 파서 시스템입니다:

#### 1. 토크나이저 (Tokenizer)
```typescript
// createTokenizer와 createParser 유틸리티 함수 사용
const tokenizer = createTokenizer(input);
const tokens = tokenizer.tokenize();
// 토큰 타입: (dimension-pair), (hexcolor), (color), (string), (range) 등
```

#### 2. 파싱 (Parser)
```typescript
// parseAdorableCSS 함수로 복잡한 파싱 로직 처리
const result = parseAdorableCSS("hover:md:w(300..500)");
// Result: {
//   prefixes: ['hover', 'md'],
//   property: 'w',
//   args: '300..500',
//   type: 'range'
// }
```

#### 3. CSS 생성
```typescript
// 우선순위 기반 CSS 생성
const css = generateCSS(parsed);
// 우선순위: COMPONENT(100) < LAYOUT(200) < UTILITY(300) < STATE(400) < RESPONSIVE(500)
```

### 규칙 시스템 (Rule System)

규칙들은 카테고리별로 구성되며, 각각 특정 관심사를 처리합니다:

```typescript
// 실제 구현된 레이아웃 규칙
export const hbox: RuleHandler = (arg?: string) => {
  const aligns = makeBoxAligns(arg, 'horizontal');
  return [
    {
      display: 'flex',
      'flex-direction': aligns.reverse ? 'row-reverse' : 'row',
      'flex-wrap': aligns.wrap,
      'justify-content': aligns.justify,
      'align-items': aligns.align,
      '& where(&>*)': {
        'flex-shrink': '0'
      }
    }
  ];
};

// vbox는 비슷하게 vertical로 구현
// gap은 makeValues를 통해 토큰 지원
```

### 값 처리 시스템 (Value Processing)

`makeValues` (makeValue의 실제 구현)는 다양한 값 타입을 지능적으로 처리합니다:

```typescript
export function makeValues(input: string | undefined): string {
  if (!input) return '';
  
  // XL 토큰 지원 (6xl, 7xl)
  if (input.match(/^\d+xl$/)) {
    return `var(--${input})`;
  }
  
  // 색상 토큰 + 투명도 (dot notation)
  // purple-500.8 → color-mix(in srgb, var(--purple-500) 80%, transparent)
  
  // Clamp 문법 지원
  // xl..30px → clamp(var(--xl), 100%, 30px)
  
  // Range 문법
  // 300..500 → clamp(300px, 100%, 500px)
  
  // OKLCH 색상 시스템 통합
  // 계산식 처리, 분수→퍼센트 변환 등
}
```

## 핵심 혁신 기능

### 1. 제약 기반 크기 조정 (Constraint-Based Sizing)

Figma의 제약 조건에서 영감을 받은 min/max 크기 조정:

```css
w(300..500)  → width: clamp(300px, 100%, 500px)
w(..500)     → max-width: 500px
w(300..)     → min-width: 300px
```

### 2. 레이어 포지셔닝 (Layer Positioning)

`layer()` 유틸리티는 복잡한 포지셔닝을 처리합니다:

```css
layer(top:20+left:30)       → position: absolute; top: 20px; left: 30px
layer(center)               → position: absolute; inset: 0; margin: auto
layer(top+x-center)         → position: absolute; top: 0; left: 50%; transform: translateX(-50%)
layer(fill/20)              → position: absolute; inset: 20px
layer(outside)              → position: absolute (외부 포지셔닝)
```

### 3. 반응형 프리픽스 (Responsive Prefixes)

직관적인 반응형 디자인 지원:

```css
sm:w(full)     → @media (min-width: 640px) { width: 100% }
..md:hidden    → @media (max-width: 767px) { display: none }
/* 주의: sm..md: 범위 문법은 현재 지원하지 않음 */
```

### 4. 상태 데코레이터 (State Decorators)

```css
hover:scale(105)      → :hover { transform: scale(1.05) }
focus:ring(2)         → :focus { outline: 2px solid ... }
group-hover:visible   → .group:hover & { visibility: visible }
```

## 플러그인 아키텍처

AdorableCSS는 플러그인을 통해 확장 가능합니다:

```typescript
// 실제 구현된 플러그인 구조
export interface Plugin {
  rules: Record<string, RuleHandler>;
  keyframes?: Record<string, Keyframes>;
  // 우선순위 기반 등록
  priority?: RulePriority;
}

// Glass morphism 플러그인 예시
export const glassRules = {
  glass: (value?: string) => {
    const [blur = '10', opacity = '0.1'] = parseArgs(value);
    return {
      'backdrop-filter': `blur(${px(blur)})`,
      background: makeColor(`white.${opacity}`),
      border: `1px solid ${makeColor('white.2')}`
    };
  }
};

// 문자열 규칙 반환 지원 (AdorableCSS 클래스)
export const cardRules = {
  card: () => 'bg(white) r(lg) shadow(md) p(24)'
};
```

## 빌드 도구 통합

AdorableCSS는 다양한 방식으로 사용할 수 있습니다:

### 1. CDN 사용
```html
<script src="https://unpkg.com/adorable-css/dist/adorable.min.js"></script>
```

### 2. NPM 패키지
```bash
npm install adorable-css
```

### 3. 프로그래매틱 사용
```typescript
import { parse, getCSSSync } from 'adorable-css';

// 클래스 파싱
const css = getCSSSync('hbox gap(16) p(24)');

// 런타임 주입 (개발용)
if (typeof window !== 'undefined') {
  injectGlobal(); // 자동 스타일 주입
}
```

### 4. PostCSS/Vite 통합 (계획 중)
현재 공식 플러그인은 개발 중이며, 커뮤니티 기여를 환영합니다.

## 고급 기능

### 1. 디자인 토큰 시스템

통합된 토큰 시스템이 이미 구현되어 있습니다:

```typescript
// 실제 토큰 정의
export const tokens = {
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  fontSize: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20 },
  colors: { /* OKLCH 기반 색상 시스템 */ },
  shadows: { /* 그림자 토큰 */ },
  radius: { /* 모서리 반경 토큰 */ }
};

// 토큰 사용
p(md)   → padding: 16px  
font(lg) → font-size: 18px
c(primary) → color: var(--primary)
```

### 2. 컴포넌트 프리셋

사전 정의된 컴포넌트 스타일:

```typescript
// 실제 구현된 컴포넌트
btn → 'hbox(center|middle) px(16) py(8) r(md) ...'
card → 'bg(white) r(lg) shadow(md) p(24)'
heading → 'font(2xl) bold lh(tight) c(gray-900)'
badge → 'inline-flex px(8) py(2) r(full) text(xs) ...'
```

### 3. 키프레임 애니메이션

```typescript
// 내장 애니메이션
animate(fade-in)    → animation: fade-in 0.3s ease-out
animate(slide-up)   → animation: slide-up 0.5s ease-out  
animate(bounce)     → animation: bounce 1s infinite

// 커스텀 duration/easing
animate(spin/2s/linear) → animation: spin 2s linear infinite
```

## 성능 최적화

### 1. 우선순위 기반 CSS 생성

```typescript
enum RulePriority {
  COMPONENT = 100,    // card, btn, heading
  LAYOUT = 200,       // hbox, vbox, grid
  UTILITY = 300,      // c, bg, p, m
  STATE = 400,        // hover:, focus:
  RESPONSIVE = 500    // md:, lg:
}
```

### 2. 효율적인 선택자 생성

- CSS 이스케이프 처리로 안전한 클래스명 생성
- 결정론적 클래스명으로 브라우저 캐싱 최적화
- 사용된 유틸리티만 포함하는 최적화된 CSS

### 3. 런타임 최적화

- 메모이제이션을 통한 파싱 성능 향상
- 효율적인 토큰 캐싱
- 최소한의 DOM 조작

## 결론

AdorableCSS v2는 CSS 작성 방식의 패러다임 전환을 나타냅니다. Figma의 멘탈 모델에서 시작하여 강력한 파서 기반 아키텍처를 구축함으로써, 강력하면서도 직관적인 프레임워크를 만들었습니다.

핵심 통찰은 **우리가 이미 생각하는 방식과 일치하는 추상화가 최고**라는 것입니다. 디자이너는 Auto Layout, 제약 조건, 레이어로 생각합니다. CSS 프레임워크도 그래야 합니다.