---
title: Rules 시스템 - CSS 규칙의 체계적 관리
description: AdorableCSS v2의 5단계 우선순위 기반 Rules 시스템과 Figma-First 설계 철학
order: 56
category: Technical Deep Dive
---

# Rules 시스템: CSS 규칙의 체계적 관리

AdorableCSS v2의 **Rules 시스템**은 CSS 프레임워크 역사상 가장 체계적이고 확장 가능한 규칙 관리 시스템입니다. Figma의 디자인 패널 순서를 그대로 반영하여, 디자이너가 생각하는 방식으로 CSS 규칙이 구성되어 있습니다.

## 🏗️ Rules 시스템 아키텍처

### Figma-First 규칙 분류

AdorableCSS v2는 **Figma 디자인 패널의 순서**를 정확히 따라 규칙을 분류합니다:

```typescript
// Figma 패널 순서 기반 분류
enum FigmaDesignOrder {
  POSITION = 1,        // Position (X, Y) - 최우선
  AUTO_LAYOUT = 2,     // Auto Layout - 레이아웃 구조
  VISUAL = 3,          // Fill, Stroke, Effects
  TEXT = 4,            // Typography
  CSS = 5,             // CSS 속성들
  INTERACTION = 6      // Prototype 상호작용
}
```

### 폴더 구조와 역할

```
src/rules/
├── index.ts                 # 중앙 등록 시스템
├── priority-registry.ts     # 우선순위 기반 레지스트리
├── rule-definitions.ts      # 메타데이터 중심 규칙 정의
├── position/               # 🎯 Position (Figma 1순위)
│   ├── position.ts         # layer(), absolute, relative
│   ├── inset.ts           # top(), left(), right(), bottom()
│   └── coordinates.ts     # (x,y) 좌표 시스템
├── layout/                 # 📐 Auto Layout (Figma 2순위)
│   ├── display.ts         # hbox(), vbox(), pack()
│   ├── size.ts            # w(), h(), size()
│   ├── spacing.ts         # p(), m(), gap()
│   ├── grid.ts            # grid() CSS Grid 시스템
│   └── overflow.ts        # overflow 처리
├── style/                  # 🎨 Visual (Figma 3순위)
│   ├── background.ts      # bg() 배경 시스템
│   ├── border.ts          # border(), r() 테두리
│   ├── color.ts           # c() 색상 시스템
│   ├── typography.ts      # font(), text(), bold()
│   └── effects.ts         # shadow(), filter() 효과
├── interaction/            # 🔄 Interaction (Figma 6순위)
│   ├── transitions.ts     # transition(), animate()
│   ├── cursor.ts          # cursor() 커서 스타일
│   └── focus.ts           # focus 상태 관리
└── effects/                # ✨ Effects (시각적 효과)
    ├── transforms.ts      # transform(), scale(), rotate()
    ├── backdrop.ts        # backdrop-filter
    └── elevation.ts       # 높이감 표현
```

## 🎯 우선순위 기반 시스템

### 5단계 우선순위 체계

```typescript
export enum RulePriority {
  COMPONENT = 100,    // card, btn, heading - 기본 컴포넌트
  LAYOUT = 200,       // hbox, vbox, grid - Figma Auto Layout
  UTILITY = 300,      // c, bg, p, m - 세밀한 스타일링
  STATE = 400,        // hover:, focus:, active: - 상태 변경
  RESPONSIVE = 500    // md:, lg:, xl: - 반응형 오버라이드
}
```

이 체계를 통해 **CSS 적용 순서가 100% 예측 가능**하며, `!important` 없이도 모든 우선순위 충돌이 해결됩니다.

### 자동 CSS 순서 생성

```css
/* 우선순위에 따른 자동 CSS 생성 순서 */

/* 1. COMPONENT (100) - 기본 구조 */
.card { 
  background: white; 
  padding: 24px; 
  border-radius: 12px; 
}

/* 2. LAYOUT (200) - 레이아웃 정의 */
.hbox\(center\|middle\) { 
  display: flex; 
  justify-content: center; 
  align-items: center; 
}

/* 3. UTILITY (300) - 스타일 오버라이드 */
.bg\(blue-500\) { 
  background-color: var(--blue-500); 
}

/* 4. STATE (400) - 상호작용 */
.hover\:bg\(blue-600\):hover { 
  background-color: var(--blue-600); 
}

/* 5. RESPONSIVE (500) - 반응형 최종 */
@media (min-width: 768px) {
  .md\:px\(32\) { 
    padding-left: 2rem; 
    padding-right: 2rem; 
  }
}
```

## 📐 Layout Rules: Figma Auto Layout 완벽 구현

### hbox/vbox: 직관적인 플렉스박스

```html
<!-- Figma: Horizontal Auto Layout, Center, Middle, 16px gap -->
<div class="hbox(center|middle) gap(16)">
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
</div>

<!-- Figma: Vertical Auto Layout, Space Between -->
<div class="vbox(between) h(300) gap(24)">
  <header>Header</header>
  <main>Content</main>
  <footer>Footer</footer>
</div>
```

### 내부 구현의 정교함

```typescript
// display.ts - Figma Auto Layout 직접 매핑
export const hbox: RuleHandler = (args = '') => {
  const layout = parseLayoutArgs(args); // center|middle → 정렬 파싱
  
  return {
    'display': 'flex',
    'flex-direction': layout.reverse ? 'row-reverse' : 'row',
    'justify-content': layout.justify, // center, between, end
    'align-items': layout.align,       // middle, top, bottom
    'flex-wrap': layout.wrap ? 'wrap' : 'nowrap',
    
    // Figma의 "Hug contents" 기본 동작
    '& > *': {
      'flex': '0 0 auto'
    }
  };
};

// 고급 정렬 파싱
const ALIGNMENT_MAP = {
  row: {
    justify: { left: 'flex-start', center: 'center', right: 'flex-end', between: 'space-between' },
    align: { top: 'flex-start', middle: 'center', bottom: 'flex-end', fill: 'stretch' }
  },
  column: {
    justify: { top: 'flex-start', center: 'center', bottom: 'flex-end', between: 'space-between' },
    align: { left: 'flex-start', center: 'center', right: 'flex-end', fill: 'stretch' }
  }
};
```

### size(): Figma의 크기 제약 조건

```html
<!-- Figma의 Fill & Hug 개념 직접 매핑 -->
<div class="w(fill)">Fill container width</div>
<div class="w(hug)">Hug contents</div>

<!-- 범위 기반 크기 조절 -->
<div class="w(300..500)">최소 300px, 최대 500px</div>
<div class="h(sm..lg)">토큰 기반 범위</div>

<!-- 비율 기반 크기 -->
<div class="size(16:9)">16:9 aspect ratio</div>
<div class="size(64)">64x64 정사각형</div>
```

### 내부 구현: 스마트 크기 변환

```typescript
// size.ts - 지능형 크기 처리
export const w: RuleHandler = (value?: string): CSSRule => {
  // Figma 제약 조건 직접 매핑
  if (value === 'fill') return { flex: '1', width: '100%' };
  if (value === 'hug') return { width: 'fit-content' };
  
  // 범위 문법: w(300..500) → clamp(300px, 100%, 500px)
  if (value.includes('..')) {
    const [min, max] = value.split('..');
    return { 
      width: `clamp(${px(min)}, 100%, ${px(max)})` 
    };
  }
  
  // 토큰 지원: w(lg) → width: var(--size-lg)
  if (isToken(value, 'size')) {
    return { width: `var(--size-${value})` };
  }
  
  // 기본값: w(300) → width: 300px
  return { width: px(value) };
};
```

## 🎯 Position Rules: Figma 레이어 시스템

### layer(): 혁신적인 포지셔닝

```html
<!-- 완벽한 중앙 정렬 - 단 하나의 클래스 -->
<div class="layer(center)">
  Perfect center
</div>

<!-- 특정 위치 + 산술 연산 -->
<div class="layer(top:20+right:30)">
  상단 20px, 우측 30px
</div>

<!-- 전체 채우기 + 패딩 -->
<div class="layer(fill/20)">
  20px 안쪽 여백을 가진 전체 채우기
</div>

<!-- 토큰 기반 위치 -->
<div class="layer(top:lg+left:xl)">
  토큰 기반 정확한 위치
</div>
```

### 좌표 시스템: (x,y) 표기법

```html
<!-- 좌표 기반 위치 지정 -->
<div class="absolute (center,center)">중앙</div>
<div class="absolute (right,top)">우상단</div>
<div class="absolute (center+20,bottom-10)">계산된 위치</div>

<!-- 토큰과 조합 -->
<div class="absolute (right-sm,top+lg)">토큰 기반 오프셋</div>
```

## 🎨 Style Rules: 현대적 색상과 타이포그래피

### OKLCH 기반 색상 시스템

```html
<!-- 지각적으로 균일한 색상 -->
<div class="c(blue-500)">OKLCH 기반 텍스트</div>
<div class="bg(purple-500.8)">80% 투명도 배경</div>

<!-- 고급 그라디언트 -->
<div class="bg(135deg/purple-500..pink-500)">방향 우선 그라디언트</div>
<div class="c(to-br/blue-500..cyan-400)">그라디언트 텍스트</div>
```

### 타이포그래피: 복합 속성 지원

```html
<!-- 멀티파트 폰트 설정 -->
<h1 class="font(2xl/1.2/-1%/Inter)">
  크기/행간/자간/패밀리 한번에
</h1>

<!-- 전용 font-weight 유틸리티 -->
<p class="bold">기본 700</p>
<p class="bold(semi)">semibold</p>
<p class="bold(600)">커스텀 weight</p>

<!-- 반응형 폰트 크기 -->
<h1 class="font(lg..3xl)">clamp 기반 반응형</h1>
```

## ✨ Effects Rules: 모던 CSS 효과

### transform: 다중 변형 지원

```html
<!-- 단일 변형 -->
<div class="scale(105)">5% 확대</div>
<div class="rotate(45)">45도 회전</div>

<!-- 복합 변형 -->
<div class="transform(rotate(45)+scale(1.2))">회전 + 확대</div>
<div class="transform(translateX(50%)+rotate(45))">이동 + 회전</div>

<!-- 3D 변형 -->
<div class="transform3d(rotateX(45)+translateZ(20))">3D 효과</div>
```

### backdrop: 모던 필터 효과

```html
<!-- Glass morphism -->
<div class="backdrop(blur-md)">블러 배경</div>
<div class="backdrop(blur-sm+saturate(1.5))">블러 + 채도</div>

<!-- 복합 필터 -->
<div class="backdrop(blur-lg+brightness(1.1)+contrast(1.2))">
  다중 백드롭 필터
</div>
```

## 🔧 하이브리드 규칙 시스템

### 문자열 + CSS 객체 혼합

AdorableCSS v2는 **세 가지 타입의 규칙**을 지원합니다:

```typescript
// 1. CSS Object Rules (일반적)
export const padding: RuleHandler = (value?: string): CSSRule => {
  return { padding: px(value) };
};

// 2. String Rules (AdorableCSS 클래스 반환)
export const cardString: StringRuleHandler = (): string => {
  return 'bg(white) p(24) r(lg) shadow(sm)';
};

// 3. Hybrid Rules (둘 다 반환 가능)
export const button: StringRuleHandler = (): (string | CSSRule)[] => {
  return [
    'inline-flex items(center) justify(center) gap(8)', // AdorableCSS
    {
      'background': 'var(--gray-900)',  // Raw CSS
      'transition': 'all 0.2s ease',
      '&:hover': { 'background': 'var(--gray-800)' }
    }
  ];
};
```

## 📊 메타데이터 기반 자동화

### 자동 문서화와 검색

```typescript
// rule-definitions.ts - 메타데이터 중심 정의
export const RULE_GROUPS: RuleDefinitions = {
  position: {
    name: 'Position',
    priority: RulePriority.LAYOUT,
    metadata: {
      group: 'Position',
      figmaSection: 'Position (X, Y)',
      description: 'Figma-style layer positioning system',
      syntax: 'layer(value)',
      examples: ['layer(center)', 'layer(top:20+left:30)', 'layer(fill/20)']
    }
  },
  autoLayout: {
    name: 'Auto Layout', 
    priority: RulePriority.LAYOUT,
    metadata: {
      group: 'Auto Layout',
      figmaSection: 'Auto Layout',
      description: 'Figma Auto Layout direct mapping',
      syntax: 'hbox(alignment), vbox(alignment)',
      examples: ['hbox(center|middle)', 'vbox(between)', 'pack']
    }
  }
};
```

### 자동 API 문서 생성

메타데이터를 기반으로 **자동으로 API 문서가 생성**됩니다:

- **그룹별 분류**: Figma 섹션 순서대로
- **검색 기능**: 규칙 이름, 설명, 예시로 검색
- **타입 추론**: TypeScript 타입 자동 생성
- **예시 코드**: 라이브 예시와 CSS 출력

## 🚀 혁신적 특징들

### 1. Figma 패널 순서 준수

```typescript
// Position → Auto Layout → Visual → Text → CSS → Interaction
const FIGMA_DESIGN_ORDER = [
  'position',     // layer(), absolute, relative
  'autoLayout',   // hbox(), vbox(), grid()
  'visual',       // bg(), border(), shadow()
  'text',         // font(), c(), bold()
  'css',          // display, overflow, z-index
  'interaction'   // hover:, focus:, transition()
];
```

### 2. 토큰 시스템 완전 통합

```html
<!-- 모든 규칙에서 토큰 사용 가능 -->
<div class="p(lg) m(xl) font(2xl) r(md) shadow(lg)">
  일관된 디자인 토큰 사용
</div>

<!-- 토큰 + 계산식 조합 -->
<div class="p(lg+8) w(100%-xl) top(center-sm)">
  토큰과 픽셀값 자유로운 조합
</div>
```

### 3. 고급 파싱 엔진

```typescript
// 복합 구문 파싱 지원
font(lg/1.5/-1%/Inter)           // 폰트 멀티파트
layer(top:20+left:30)            // 위치 산술 연산
transform(rotate(45)+scale(1.2)) // 다중 변형
bg(135deg/purple-500..pink-500)  // 그라디언트 방향
```

### 4. 우선순위 자동 해결

```css
/* CSS 생성 시 자동으로 우선순위 정렬 */
.component { /* COMPONENT: 100 */ }
.layout { /* LAYOUT: 200 */ }
.utility { /* UTILITY: 300 */ }
.state:hover { /* STATE: 400 */ }
@media { .responsive { /* RESPONSIVE: 500 */ } }
```

## 🎯 실전 활용 패턴

### 완전한 Figma 워크플로우

```html
<!-- 1. Position으로 레이어 배치 -->
<div class="layer(center)">
  <!-- 2. Auto Layout으로 구조 -->
  <div class="vbox(center) gap(24) p(32)">
    <!-- 3. Visual로 스타일링 -->
    <div class="bg(white) r(xl) shadow(lg)">
      <!-- 4. Text로 타이포그래피 -->
      <h2 class="font(2xl) bold c(gray-900)">제목</h2>
      <p class="c(gray-600)">설명</p>
      
      <!-- 5. Interaction으로 상호작용 -->
      <button class="hover:scale(105) focus:ring(blue-300)">
        버튼
      </button>
    </div>
  </div>
</div>
```

## 📋 결론: CSS 규칙 관리의 새로운 패러다임

AdorableCSS v2의 Rules 시스템은:

- ✅ **Figma-First**: 디자이너의 사고 과정을 그대로 코드로
- ✅ **우선순위 기반**: 100% 예측 가능한 CSS 적용 순서  
- ✅ **하이브리드 아키텍처**: 유연한 규칙 정의 방식
- ✅ **메타데이터 중심**: 자동 문서화와 검색 기능
- ✅ **토큰 통합**: 일관된 디자인 시스템 연결

이제 CSS 규칙은 더 이상 **임의적이고 예측 불가능한 시스템**이 아닌, **체계적이고 논리적인 디자인 언어**가 되었습니다. Figma에서 디자인하는 순서 그대로 CSS를 작성할 수 있는 **진정한 Design-to-Code 워크플로우**를 실현했습니다.

**Position → Auto Layout → Visual → Text → Interaction**

이 간단한 순서만 기억하면, 어떤 복잡한 UI도 체계적으로 구현할 수 있습니다. 이것이 AdorableCSS Rules 시스템이 만드는 CSS의 미래입니다.