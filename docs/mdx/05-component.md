# Component 시스템

> "컴포넌트는 디자인 결정의 문서화입니다. 한 번 만들고 어디서나 사용하세요."

AdorableCSS의 컴포넌트 시스템은 CSS-in-JS의 생산성과 Utility-First의 간결함을 결합합니다.

## 왜 컴포넌트 시스템이 필요한가?

### 문제: 복사-붙여넣기 지옥
```html
<!-- 똑같은 버튼을 100번 만들 때... -->
<button class="px(16) py(8) bg(blue-500) c(white) r(8) hover:bg(blue-600) cursor(pointer)">
  버튼 1
</button>
<button class="px(16) py(8) bg(blue-500) c(white) r(8) hover:bg(blue-600) cursor(pointer)">
  버튼 2
</button>
<!-- 반복... -->
```

### 해결: 컴포넌트 정의
```html
<!-- 한 번 정의, 어디서나 사용 -->
<button class="btn(primary)">버튼 1</button>
<button class="btn(primary)">버튼 2</button>
<button class="btn(primary/lg)">큰 버튼</button>
<button class="btn(secondary/sm)">작은 보조 버튼</button>
```

이것이 컴포넌트의 힘입니다: **일관성**과 **생산성**.

## defineComponent API

### 기본 구조
AdorableCSS는 컴포넌트 정의를 위한 통합 API를 제공합니다:

```typescript
import { defineComponent } from 'adorable-css';

const myComponent = defineComponent({
  // 기본 스타일 (필수)
  base: 'inline-flex items(center) gap(sm)',
  
  // 크기 변형
  sizes: {
    sm: 'h(32) px(12) text(sm)',
    md: 'h(40) px(16) text(md)',
    lg: 'h(48) px(20) text(lg)'
  },
  
  // 스타일 변형
  variants: {
    primary: 'bg(primary) c(white)',
    secondary: 'bg(gray-100) c(gray-900)',
    danger: 'bg(red-500) c(white)'
  },
  
  // 복합 변형 (특정 조합에 추가 스타일)
  compounds: [
    {
      variant: 'primary',
      size: 'lg',
      class: 'font-weight(bold) uppercase'
    }
  ],
  
  // 상태 스타일
  states: {
    hover: 'brightness(1.1)',
    focus: 'ring(2/primary)',
    disabled: 'opacity(0.5) cursor(not-allowed)'
  },
  
  // 기본값
  defaults: {
    size: 'md',
    variant: 'primary'
  }
});
```

### 사용 방법
```html
<!-- 기본 사용 -->
<button class="btn()">기본 버튼</button>

<!-- 변형 사용 -->
<button class="btn(secondary)">보조 버튼</button>

<!-- 크기와 변형 조합 -->
<button class="btn(primary/lg)">큰 주요 버튼</button>

<!-- 여러 변형 조합 -->
<button class="btn(danger/sm)">작은 위험 버튼</button>
```

## Built-in 컴포넌트

### 1. Primitives (기본 컴포넌트)

#### Button (`btn`)
다양한 스타일과 크기의 버튼 컴포넌트:

```css
/* 크기 */
btn(sm)         /* 작은 버튼 (h: 32px) */
btn()           /* 기본 버튼 (h: 40px) */
btn(lg)         /* 큰 버튼 (h: 44px) */
btn(icon)       /* 아이콘 버튼 (정사각형) */

/* 변형 */
btn(primary)    /* 주요 액션 */
btn(secondary)  /* 보조 액션 */
btn(destructive) /* 위험한 액션 */
btn(outline)    /* 외곽선 버튼 */
btn(ghost)      /* 투명 버튼 */
btn(link)       /* 링크 스타일 */

/* 조합 */
btn(primary/lg) /* 큰 주요 버튼 */
btn(ghost/icon) /* 고스트 아이콘 버튼 */
```

#### Card (`card`)
컨텐츠를 담는 카드 컴포넌트:

```css
/* 크기 */
card(sm)        /* 작은 카드 (p: 16px) */
card()          /* 기본 카드 (p: 24px) */
card(lg)        /* 큰 카드 (p: 32px) */

/* 변형 */
card(outlined)  /* 테두리 카드 */
card(elevated)  /* 그림자 강조 */
card(glass)     /* 글래스모피즘 */
card(gradient)  /* 그라디언트 배경 */
card(interactive) /* 호버 효과 */

/* 특수 카드 */
card(feature)   /* 기능 소개용 */
card(flat)      /* 평면 스타일 */
```

#### Heading (`heading`)
계층적 제목 시스템:

```css
/* 제목 레벨 */
heading(h1)     /* 가장 큰 제목 */
heading(h2)     /* 섹션 제목 */
heading(h3)     /* 서브섹션 제목 */
heading(h4)     /* 소제목 */
heading(h5)     /* 작은 제목 */
heading(h6)     /* 가장 작은 제목 */

/* 특수 스타일 */
heading(display) /* 디스플레이 제목 */
heading(hero)   /* 히어로 제목 (반응형) */
heading(caption) /* 캡션 스타일 */

/* 변형 */
heading(h1/gradient)  /* 그라디언트 제목 */
heading(h2/muted)     /* 약한 제목 */
heading(h3/primary)   /* 주요 색상 제목 */
heading(hero/rainbow) /* 무지개 히어로 제목 */
```

#### Form 컴포넌트
폼 요소들:

```css
/* Input */
input()         /* 기본 입력 필드 */
input(error)    /* 오류 상태 */
input(success)  /* 성공 상태 */

/* Textarea */
textarea()      /* 기본 텍스트영역 */
textarea(lg)    /* 큰 텍스트영역 */

/* Checkbox & Radio */
checkbox()      /* 체크박스 */
radio()         /* 라디오 버튼 */
```

### 2. Patterns (패턴 컴포넌트)

#### Container (`container`)
반응형 컨테이너:

```css
/* 크기별 컨테이너 */
container(sm)   /* max-w: 640px */
container(md)   /* max-w: 768px */
container(lg)   /* max-w: 1024px */
container(xl)   /* max-w: 1280px */
container(2xl)  /* max-w: 1440px */

/* 특수 컨테이너 */
container(prose) /* 읽기 최적화 (65ch) */
container(full) /* 전체 너비 */
```

#### Prose (`prose`)
읽기 최적화된 텍스트 스타일:

```css
/* 기본 사용 */
prose()         /* 기본 문서 스타일 */
prose(sm)       /* 작은 텍스트 */
prose(lg)       /* 큰 텍스트 */

/* 변형 */
prose(docs)     /* 문서용 스타일 */
prose(article)  /* 기사 스타일 */
prose(technical) /* 기술 문서 */
prose(marketing) /* 마케팅 콘텐츠 */
```

Prose는 내부 HTML 요소를 자동으로 스타일링합니다:
- 제목 (h1-h6)
- 문단 (p)
- 링크 (a)
- 목록 (ul, ol)
- 인용문 (blockquote)
- 코드 (code, pre)
- 테이블 (table)

#### Section (`section`)
페이지 섹션 구성:

```css
/* 간격 변형 */
section(compact) /* 작은 패딩 */
section()       /* 기본 패딩 */
section(spacious) /* 큰 패딩 */

/* 스타일 변형 */
section(hero)   /* 히어로 섹션 */
section(feature) /* 기능 섹션 */
section(cta)    /* CTA 섹션 */
```

### 3. Features (기능 컴포넌트)

#### Glass 효과
글래스모피즘 효과:

```css
/* 기본 글래스 */
glass()         /* 기본 효과 */
glass(strong)   /* 강한 효과 */
glass(subtle)   /* 약한 효과 */

/* 커스텀 글래스 */
glass(20/0.2/blue) /* blur/opacity/tint */

/* 글래스 컴포넌트 */
glass-card()    /* 글래스 카드 */
glass-nav()     /* 글래스 네비게이션 */
glass-dark()    /* 다크 글래스 */
```

#### Interactive 효과
상호작용 강도 시스템:

```css
/* 레벨별 효과 */
interactive(1)  /* 미세한 효과 */
interactive(2)  /* 약한 효과 */
interactive(3)  /* 중간 효과 */
interactive(4)  /* 강한 효과 */
interactive(5)  /* 매우 강한 효과 */

/* 특정 상호작용 */
clickable()     /* 클릭 가능 */
hoverable()     /* 호버 효과 */
pressable()     /* 누름 효과 */
draggable()     /* 드래그 가능 */
selectable()    /* 선택 가능 */
```

#### Glow 효과
빛나는 효과:

```css
/* 기본 글로우 */
glow()          /* 기본 효과 */
glow(primary)   /* 주요 색상 */
glow(accent)    /* 강조 색상 */

/* 강도 조절 */
glow(sm)        /* 약한 글로우 */
glow(lg)        /* 강한 글로우 */
```

## 커스텀 컴포넌트 만들기

### 1. 실전 예제: 프로덕트 카드
```typescript
import { defineComponent } from 'adorable-css';

// 실제 프로젝트에서 사용하는 카드 컴포넌트
export const productCard = defineComponent({
  // 기본 스타일
  base: 'vbox bg(white) r(xl) overflow(hidden) transition',
  
  // 크기 변형
  sizes: {
    sm: 'w(280)',
    md: 'w(320)',     // 기본값
    lg: 'w(400)'
  },
  
  // 스타일 변형
  variants: {
    default: 'shadow(md) hover:shadow(lg)',
    featured: 'shadow(xl) border(2/primary) hover:scale(1.02)',
    minimal: 'border(1/gray-200)',
    sale: 'shadow(lg/red-500.3) border(2/red-500)'
  },
  
  // 상태 스타일
  states: {
    hover: 'transform(translateY(-2px))',
    'group-hover': 'shadow(xl)'  // 그룹 호버 지원
  },
  
  // 복합 조건 (특정 조합에만 적용)
  compounds: [
    {
      variant: 'featured',
      size: 'lg',
      class: 'p(xl) gap(lg)'  // 특별 패딩과 간격
    },
    {
      variant: 'sale',
      size: 'sm',
      class: 'relative'  // 세일 배지용
    }
  ],
  
  // 기본값
  defaults: {
    size: 'md',
    variant: 'default'
  }
});
```

### 사용 예시
```html
<!-- 기본 상품 카드 -->
<div class="productCard()">
  <img src="product.jpg" class="w(full) h(200) object(cover)" />
  <div class="p(lg) vbox gap(sm)">
    <h3 class="font(lg) bold">상품명</h3>
    <p class="c(gray-600)">상품 설명</p>
    <span class="font(xl) bold c(primary)">₩29,900</span>
  </div>
</div>

<!-- 특성 상품 (Featured) -->
<div class="productCard(featured/lg)">
  <!-- 더 큰 카드에 특별한 스타일 적용 -->
</div>

<!-- 세일 상품 -->
<div class="productCard(sale/sm)">
  <span class="absolute top(10) right(10) bg(red-500) c(white) px(8) py(4) r(full)">
    SALE
  </span>
  <!-- 상품 내용 -->
</div>
```

### 2. 테마 지원 컴포넌트
```typescript
import { defineThemedComponent } from 'adorable-css';

export const themedButton = defineThemedComponent({
  light: {
    base: 'bg(white) c(gray-900) border(1/gray-200)',
    variants: {
      primary: 'bg(blue-500) c(white)',
      secondary: 'bg(gray-100)'
    }
  },
  dark: {
    base: 'bg(gray-800) c(white) border(1/gray-700)',
    variants: {
      primary: 'bg(blue-600) c(white)',
      secondary: 'bg(gray-700)'
    }
  }
});
```

### 3. 복잡한 컴포넌트
```typescript
export const dataTable = defineComponent({
  base: 'w(full) bg(white) r(lg) overflow(hidden)',
  
  selectors: {
    '& thead': 'bg(gray-50) border-b(1/gray-200)',
    '& th': 'p(12) text(left) font(semi) c(gray-900)',
    '& td': 'p(12) border-b(1/gray-100)',
    '& tr:hover': 'bg(gray-50/0.5)',
    '& tr:last-child td': 'border-b(none)'
  },
  
  variants: {
    striped: {
      '& tbody tr:nth-child(even)': 'bg(gray-50)'
    },
    compact: {
      '& th, & td': 'p(8) text(sm)'
    }
  }
});
```

## 컴포넌트 조합 패턴

### 1. 컴포넌트 합성
```html
<!-- 카드 안의 버튼 -->
<div class="card(lg)">
  <h3 class="heading(h3) mb(md)">카드 제목</h3>
  <p class="text(gray-600) mb(lg)">카드 내용...</p>
  <button class="btn(primary)">액션</button>
</div>
```

### 2. 컴포넌트 확장
```html
<!-- 기본 컴포넌트에 유틸리티 추가 -->
<button class="btn(primary) w(full) transition hover:scale(1.02)">
  전체 너비 버튼
</button>
```

### 3. 컴포넌트 변형 조합
```html
<!-- 여러 컴포넌트 특성 조합 -->
<div class="card(glass) interactive(3) p(xl)">
  <div class="prose(docs)">
    <h2>글래스 인터랙티브 카드</h2>
    <p>호버 시 부드럽게 움직입니다.</p>
  </div>
</div>
```

## 성능 최적화

### 1. 컴포넌트 캐싱
- 자주 사용되는 컴포넌트 조합은 자동으로 캐싱
- 동일한 조합 재사용 시 파싱 생략

### 2. 선택적 로드
- 사용하지 않는 컴포넌트는 번들에서 제외
- 트리 쉐이킹으로 최적화

### 3. CSS 중복 제거
- 동일한 스타일은 한 번만 생성
- 효율적인 CSS 출력

## 컴포넌트 철학: 비즈니스 로직의 캐프슐화

### 전통적 접근
```css
/* CSS 클래스: "어떻게 보일까?" */
.btn-primary {
  background: blue;
  color: white;
  /* ... */
}
```

### AdorableCSS 접근
```typescript
/* 컴포넌트: "무엇을 할까?" */
defineComponent({
  // 주요 버튼 = 주요 액션을 수행
  variants: {
    primary: 'bg(primary) c(white)',
    secondary: 'bg(gray-100) c(gray-900)',
    danger: 'bg(red-500) c(white)'  // 위험한 액션
  }
})
```

컴포넌트는 **비즈니스 로직**을 코드에 담습니다.

## 다음 단계

- [Design System](./06-design-system.md) - 완전한 디자인 시스템 구축