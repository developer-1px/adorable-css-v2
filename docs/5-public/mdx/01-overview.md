# AdorableCSS: 디자인과 개발의 언어 장벽을 허무는 혁신

> "CSS는 문서를 위해 설계되었고, Figma는 인터페이스를 위해 탄생했습니다. AdorableCSS는 이 20년 간의 간극을 메웁니다."

AdorableCSS는 단순한 CSS 프레임워크를 넘어, 디자이너와 개발자가 동일한 언어로 소통하고 협업할 수 있도록 돕는 **커뮤니케이션 시스템**입니다. Figma에서 디자인하는 방식 그대로 코드를 작성하고, 그 코드가 디자인 의도를 완벽하게 반영하도록 설계되었습니다.

## 우리가 해결하려는 문제: 끝나지 않는 번역의 고통

수많은 프로젝트에서 디자이너와 개발자는 다음과 같은 문제에 직면합니다:

- **디자인과 코드의 불일치**: Figma에서 완벽했던 디자인이 코드에서는 미묘하게 다르게 구현됩니다. "이건 디자인과 달라요!"라는 피드백은 일상이 됩니다.
- **비효율적인 커뮤니케이션**: 디자이너는 시각적 의도를 설명하고, 개발자는 이를 CSS 속성으로 '번역'해야 합니다. 이 과정에서 오해가 발생하고, 불필요한 재작업이 반복됩니다.
- **복잡한 CSS 문법**: `display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 16px; width: 100%;`... 디자이너의 "16px 간격의 세로 Auto Layout"이라는 명확한 의도가 개발자에게는 복잡한 CSS 속성들의 조합으로 다가옵니다.
- **느린 개발 속도**: 디자인 변경이 발생할 때마다 복잡한 CSS를 수정하고, 여러 브라우저에서 테스트하는 데 많은 시간이 소요됩니다.

AdorableCSS는 이러한 고통스러운 '번역' 과정을 제거하고, 디자인 의도를 코드에 직접적으로 반영함으로써 팀의 생산성과 협업 효율을 극대화합니다.

## AdorableCSS의 해답: Figma의 언어로 말하는 코드

AdorableCSS는 디자이너가 Figma에서 사용하는 개념과 용어를 코드에 그대로 매핑합니다. 이제 디자이너의 의도는 더 이상 '번역'되지 않고, '직접적인 코드'가 됩니다.

```html
<!-- Figma: 16px 간격의 세로 Auto Layout, 가운데 정렬, 너비 꽉 채우기 -->
<div class="vbox(center) gap(16) w(fill)">
  <!-- ... -->
</div>
```

**결과물은 동일하지만, 코드는 80% 더 간결하고, 의도는 100% 더 명확해집니다.**

## 핵심 철학: 디자인 시스템을 코드로 구현하는 새로운 패러다임

### 1. Figma-First 접근법: 디자인 도구의 개념을 코드에 이식

AdorableCSS는 Figma의 디자인 패널 순서와 개념을 CSS 유틸리티 클래스에 그대로 반영합니다. 이는 디자이너가 Figma에서 디자인하는 사고방식을 개발자가 코드에 적용할 수 있게 하여, 디자인과 개발 간의 인지적 부하를 최소화합니다.

- **Auto Layout** → `hbox()`, `vbox()`: Figma의 Auto Layout 개념을 가로/세로 박스 모델로 직관적으로 표현합니다.
- **Fill/Stroke** → `c()`, `bg()`, `border()`: 색상, 배경, 테두리 스타일을 Figma와 동일한 방식으로 적용합니다.
- **Effects** → `shadow()`, `blur()`, `backdrop()`: 그림자, 블러 등 시각 효과를 쉽게 제어합니다.
- **Layer** → `layer()`, `z()`, `absolute`: Figma의 레이어 개념을 활용하여 요소의 위치와 z-index를 직관적으로 관리합니다.

### 2. CSS Native 문법의 직관적 확장: 익숙함 속의 강력함

AdorableCSS는 기존 CSS 사양을 존중하면서도, 더욱 직관적이고 간결한 문법을 제공합니다. 복잡한 CSS 속성 조합 대신, 단일 함수 호출로 여러 속성을 제어하거나, 단위 변환을 자동으로 처리합니다.

```css
/* CSS Native 값 사용 및 자동 변환 */
scale(1.05)         /* transform: scale(1.05) */
rotate(45deg)       /* transform: rotate(45deg) */
opacity(0.5)        /* opacity: 0.5 */
w(320)              /* width: 320px (단위 자동 추가) */
gap(2rem)           /* gap: 2rem */
font(16/1.5)        /* font-size: 16px; line-height: 1.5 */
```

### 3. 의미론적 디자인 시스템 통합: 단일 진실 공급원

내장된 디자인 토큰과 컴포넌트 시스템을 통해 디자인 시스템을 코드에 완벽하게 동기화합니다. 이는 디자인 토큰 불일치로 인한 버그를 원천적으로 방지하고, 디자인 일관성을 유지하는 데 필수적입니다.

```css
/* 디자인 토큰 (Figma Variables와 1:1 매칭) */
p(md)               /* padding: var(--spacing-md) */
text(xl)            /* font-size: var(--font-xl) */
r(lg)               /* border-radius: var(--radius-lg) */

/* 의미론적 컴포넌트 (Figma Components와 1:1 매칭) */
card()              /* 카드 컴포넌트의 기본 스타일 */
btn(primary/lg)     /* 프라이머리 타입의 대형 버튼 */
heading(h1)         /* h1 제목 스타일 */
```

## 왜 AdorableCSS를 선택해야 하는가?

### 개발자에게: 생산성과 즐거움의 극대화
- **80% 적은 코드**: 동일한 시각적 결과를 훨씬 적은 코드로 구현하여 개발 시간을 단축합니다.
- **Zero Mental Translation**: 디자인 스펙을 보고 CSS 속성을 고민할 필요 없이, Figma의 개념을 그대로 코드로 옮깁니다.
- **5분 학습**: Figma의 Auto Layout, Constraints, Components 개념을 이해한다면 AdorableCSS는 5분 안에 익숙해질 수 있습니다.
- **유지보수의 용이성**: 직관적인 클래스명으로 코드 가독성이 높아지고, 디자인 변경에 대한 대응이 빨라집니다.

### 디자이너에게: 비전의 완벽한 구현
- **"프로덕션에서는 다르게 보여요" 문제 해결**: 당신의 디자인 의도가 코드에 정확히 반영되어, 더 이상 불일치로 인한 스트레스가 없습니다.
- **공통의 언어로 커뮤니케이션 개선**: 개발자와 동일한 용어로 소통하며, 디자인 피드백이 훨씬 명확하고 효율적으로 전달됩니다.
- **코드 리뷰 참여**: 직관적인 클래스명 덕분에 CSS 지식 없이도 코드의 디자인 구현을 직접 확인할 수 있습니다.

### 팀에게: 협업의 시너지와 제품 품질 향상
- **50% 빠른 개발 사이클**: 디자인-개발 핸드오프 및 QA 시간이 획기적으로 단축되어 제품 출시 속도가 빨라집니다.
- **디자인 시스템의 완벽한 동기화**: 디자인 시스템의 변경 사항이 코드에 즉시 반영되어 일관된 사용자 경험을 제공합니다.
- **협업 효율 극대화**: 디자이너와 개발자가 같은 목표를 향해 더 긴밀하게 협력하며, 팀 전체의 생산성이 향상됩니다.

## AdorableCSS의 주요 특징

### 1. 통합 문법 시스템: 복잡성을 단순화

하나의 함수 호출로 여러 CSS 속성을 통합적으로 제어하여, 코드의 양을 줄이고 가독성을 높입니다.

```css
/* font() - 타이포그래피 통합 제어 */
font(xl/1.5/-2%)    /* font-size, line-height, letter-spacing을 한 번에 */

/* layer() - 포지셔닝 통합 제어 */
layer(center)       /* 요소를 부모의 중앙에 정렬 */
layer(top:20+left:30)  /* 상단 20px, 왼쪽 30px 위치 */

/* bg() - 배경 스타일 통합 제어 */
bg(white)           /* 단색 배경 */
bg(to-tr/purple-500..pink-500)  /* 그라디언트 배경 */
```

### 2. 직관적인 투명도 표현: 간결하고 명확하게

점(.) 표기법을 사용하여 색상에 투명도를 간단하게 적용할 수 있습니다. `rgba()` 함수를 직접 사용할 필요 없이, 직관적으로 투명도를 조절합니다.

```css
c(black.5)          /* color: rgba(0,0,0,0.5) */
bg(white.2)         /* background: rgba(255,255,255,0.2) */
border(gray-200.8)  /* border-color: rgba(gray-200, 0.8) */
```

### 3. 반응형 디자인: 디자이너의 브레이크포인트를 그대로

간단한 prefix를 사용하여 다양한 화면 크기에 대한 반응형 스타일을 적용합니다. Figma에서 정의된 브레이크포인트를 코드에 그대로 매핑하여, 반응형 구현을 직관적으로 만듭니다.

```css
w(full) md:w(768) lg:w(1024)      /* 모바일, 태블릿, 데스크탑 너비 */
grid(1) md:grid(2) lg:grid(3)      /* 반응형 그리드 컬럼 수 */
p(sm) md:p(md) lg:p(lg)            /* 반응형 패딩 */
```

### 4. 상태 관리: 동적인 UI를 쉽게 구현

직관적인 상태 prefix를 통해 요소의 다양한 상태(hover, focus, active 등)에 따른 스타일 변화를 쉽게 정의할 수 있습니다.

```css
hover:scale(1.05)   /* 마우스 오버 시 확대 */
focus:ring(2)       /* 포커스 시 링 효과 */
active:opacity(0.8) /* 클릭 시 투명도 감소 */
group-hover:visible /* 부모 요소 hover 시 자식 요소 표시 */
```

## 아키텍처 개요: 견고하고 유연한 기반

AdorableCSS는 고성능과 확장성을 염두에 두고 설계되었습니다.

### 1. Parser 시스템
고성능 토크나이저와 AST(추상 구문 트리) 기반 파서를 사용하여 복잡한 표현식과 함수 호출을 효율적으로 처리합니다.
- **함수 호출**: `bg(primary)`, `font(xl/1.5)`
- **연산자**: `layer(100%-20,top+10)`와 같은 복잡한 계산식 지원
- **범위**: `w(100..500)`와 같이 특정 범위 내의 값 지정
- **조합**: `hover:bg(blue-500.8)`와 같이 상태와 투명도를 결합한 표현

### 2. Rule 시스템
우선순위 기반 규칙 등록 시스템을 통해 CSS 캐스케이드(Cascade)를 예측 가능하게 제어합니다. 이는 스타일 충돌을 최소화하고, 일관된 스타일 적용을 보장합니다.
- **Component (100)**: 재사용 가능한 컴포넌트의 기본 스타일
- **Layout (200)**: `hbox`, `vbox`와 같은 레이아웃 시스템
- **Utility (300)**: `p(16)`, `bg(red)`와 같은 개별 유틸리티 클래스
- **State (400)**: `hover:`, `focus:`와 같은 상태 변경자
- **Responsive (500)**: `md:`, `lg:`와 같은 반응형 변경자

### 3. 확장 시스템
플러그인 아키텍처를 통해 사용자가 쉽게 커스텀 규칙, 키프레임, 테마 등을 추가하여 AdorableCSS를 프로젝트의 요구사항에 맞춰 확장할 수 있습니다.

```typescript
// 커스텀 규칙 추가 예시
registerRule('my-effect', (value) => ({
  // CSS 속성 정의
  transform: `translateY(${value})`
}));

// 커스텀 키프레임 등록 예시
registerKeyframes('my-animation', {
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
});
```

## 철학: Gap-based Layout - Margin 없는 세상

AdorableCSS는 `margin` 속성의 사용을 지양하고 `gap`과 `padding`을 통한 레이아웃을 권장합니다. 왜일까요?

1.  **Figma와의 완벽한 일치**: Figma의 Auto Layout은 `margin` 개념 없이 `gap`과 `padding`만으로 모든 간격을 제어합니다. AdorableCSS는 이 디자인 도구의 철학을 그대로 따릅니다.
2.  **예측 가능한 간격**: `margin`은 `margin collapse`, 음수 `margin` 등 복잡하고 예측 불가능한 동작을 유발할 수 있습니다. 반면 `gap`은 항상 예상한 대로 요소들 사이의 간격을 명확하게 정의합니다.
3.  **일관된 레이아웃**: `gap`을 사용하면 컨테이너 내부의 요소 간 간격이 일관되게 유지되어, 복잡한 레이아웃에서도 안정적인 결과를 얻을 수 있습니다.

```html
<!-- ❌ 잘못된 사용: margin으로 간격 조절 -->
<div class="mb(20)">...</div>
<div class="mt(40)">...</div>

<!-- ✅ 올바른 사용: gap으로 간격 조절 -->
<div class="vbox gap(20)">
  <div>...</div>
  <div>...</div>
</div>
```

## 성능과 원칙: Zero Runtime, 최대 효율

AdorableCSS는 런타임 오버헤드 없이 최적의 성능을 제공하도록 설계되었습니다.

| 특징                  | 전통적인 CSS-in-JS                 | AdorableCSS                      |
| :-------------------- | :--------------------------------- | :------------------------------- |
| **런타임**            | 50-200KB                           | **0KB**                          |
| **CSS 처리**          | 런타임 시 CSS 파싱 및 주입         | **빌드 타임에만 처리**           |
| **스타일 주입 오버헤드** | 존재                               | **없음 (순수 CSS 출력)**         |
| **번들 크기**         | 번들 비대화 (bloat)                | **Tree-shakable**                |

### 실제 성능 지표
-   **평균 12KB**의 프로덕션 번들 크기
-   **0ms**의 런타임 오버헤드
-   **100%** tree-shakable (사용하지 않는 스타일은 번들에 포함되지 않음)
-   **50ms 미만**의 빌드 시간 영향

## 시작하기: AdorableCSS와 함께하는 첫걸음

### 설치
```bash
npm install adorable-css
```

### 기본 사용 예시

AdorableCSS는 빌드 타임에 클래스 이름을 기반으로 CSS를 생성합니다. 이는 런타임 오버헤드 없이 최적화된 CSS를 제공합니다.

```javascript
import { generateCSS } from 'adorable-css';

// HTML/JSX에서 사용된 클래스 이름을 기반으로 CSS 생성
const css = generateCSS([
  'hbox(middle)',
  'p(lg)',
  'bg(white)',
  'shadow(md)',
  'hover:shadow(lg)'
]);

console.log(css);
/*
.hbox\(middle\) {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.p\(lg\) {
  padding: var(--spacing-lg);
}
.bg\(white\) {
  background-color: #fff;
}
.shadow\(md\) {
  box-shadow: var(--shadow-md);
}
.hover\:shadow\(lg\):hover {
  box-shadow: var(--shadow-lg);
}
*/
```

### HTML/프레임워크에서 사용

생성된 CSS를 프로젝트에 포함시키고, HTML/JSX에서 AdorableCSS 클래스를 사용합니다.

```html
<div class="card() p(lg) hover:shadow(lg)">
  <h2 class="heading(h2) mb(md)">제목</h2>
  <p class="text(gray-600) line-height(1.6)">
    이것은 AdorableCSS를 사용하여 스타일링된 예시입니다. 
    디자이너의 의도를 그대로 코드로 옮겨, 빠르고 효율적인 개발이 가능합니다.
  </p>
</div>
```

## 다음 단계

AdorableCSS의 강력한 기능과 철학에 대해 더 깊이 알아보세요:

-   [Figma-First CSS Utility](/docs/5-public/mdx/02-figma-first-css-utility.md) - Figma 개념과 AdorableCSS 클래스 매핑 상세 가이드
-   [Design Token](/docs/5-public/mdx/03-design-token.md) - 디자인 토큰 시스템의 작동 방식과 활용법
-   [Layout](/docs/5-public/mdx/04-layout.md) - `hbox`, `vbox` 등 레이아웃 시스템 심층 분석
-   [Component](/docs/5-public/mdx/05-component.md) - 디자인 시스템 컴포넌트를 코드로 구현하는 방법
-   [Syntax Guide](/docs/5-public/mdx/11-syntax-guide.md) - AdorableCSS의 모든 유틸리티 클래스 문법 참조
-   [Getting Started](/docs/5-public/getting-started/PROJECT_SETUP.md) - 프로젝트에 AdorableCSS를 설정하고 사용하는 방법