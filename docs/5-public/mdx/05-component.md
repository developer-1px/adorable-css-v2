# 컴포넌트 시스템: 디자인 시스템의 재사용 가능한 빌딩 블록

> "컴포넌트는 디자인 결정의 문서화이자, 디자인 시스템의 핵심 빌딩 블록입니다. 한 번 정의하고 어디서나 일관되게 사용하세요."

AdorableCSS의 컴포넌트 시스템은 CSS-in-JS의 강력한 생산성과 Utility-First CSS의 간결함을 결합하여, 디자이너와 개발자 모두에게 최적화된 워크플로우를 제공합니다. 이를 통해 디자인 시스템의 일관성을 유지하면서 개발 효율성을 극대화할 수 있습니다.

## 왜 컴포넌트 시스템이 필수적인가?

### 문제: 반복되는 '매직 클래스'와 유지보수의 악몽

컴포넌트 시스템이 제대로 구축되지 않은 프로젝트에서는 다음과 같은 문제가 발생하기 쉽습니다:

```html
<!-- 똑같은 버튼을 100번 만들 때... 매번 동일한 유틸리티 클래스를 반복 -->
<button class="px(16) py(8) bg(blue-500) c(white) r(8) hover:bg(blue-600) cursor(pointer)">
  버튼 1
</button>
<button class="px(16) py(8) bg(blue-500) c(white) r(8) hover:bg(blue-600) cursor(pointer)">
  버튼 2
</button>
<!-- ... 이런 반복이 수십, 수백 번 이어집니다. -->
```

-   **코드 중복**: 동일한 스타일을 가진 요소마다 수많은 유틸리티 클래스를 반복적으로 작성해야 합니다. 이는 코드의 양을 불필요하게 늘리고 가독성을 떨어뜨립니다.
-   **유지보수성 저하**: 버튼의 색상이나 패딩이 변경되면, 해당 스타일이 적용된 모든 HTML 요소를 찾아 일일이 수정해야 합니다. 이는 시간이 많이 소요되며, 휴먼 에러로 인한 디자인 불일치를 야기할 수 있습니다.
-   **일관성 부족**: 개발자마다 유틸리티 클래스를 조합하는 방식이 달라지면서, 동일한 컴포넌트임에도 불구하고 미묘하게 다른 스타일이 적용될 수 있습니다.
-   **디자인 의도 파악의 어려움**: HTML 마크업만으로는 해당 요소가 어떤 '컴포넌트'인지, 어떤 '역할'을 하는지 파악하기 어렵습니다. 이는 새로운 팀원의 온보딩을 어렵게 하고, 디자인 시스템의 규칙을 코드에 반영하기 어렵게 만듭니다.

### 해결: AdorableCSS의 `defineComponent`를 통한 컴포넌트 정의

AdorableCSS는 `defineComponent` API를 통해 이러한 문제들을 해결합니다. `defineComponent`를 사용하면, 특정 UI 패턴이나 요소에 대한 스타일 규칙을 한 곳에 모아 정의하고, 이를 재사용 가능한 '컴포넌트'로 만들 수 있습니다.

```html
<!-- AdorableCSS 컴포넌트: 한 번 정의, 어디서나 의미론적으로 사용 -->
<button class="btn(primary)">기본 버튼</button>
<button class="btn(primary/lg)">큰 주요 버튼</button>
<button class="btn(secondary/sm)">작은 보조 버튼</button>
```

이것이 AdorableCSS 컴포넌트 시스템의 핵심적인 가치입니다:

-   **일관성**: 모든 팀원이 동일하게 정의된 컴포넌트를 사용하므로, UI의 시각적 일관성이 보장됩니다.
-   **생산성**: 복잡한 유틸리티 클래스 조합을 반복할 필요 없이, 간결한 컴포넌트 클래스 하나로 스타일을 적용할 수 있어 개발 속도가 향상됩니다.
-   **유지보수성**: 컴포넌트의 스타일 변경이 필요할 때, `defineComponent` 내의 정의만 수정하면 해당 컴포넌트를 사용하는 모든 곳에 자동으로 반영됩니다.
-   **의미론적 명확성**: `btn(primary)`와 같이 컴포넌트의 역할과 상태를 클래스 이름에 명확하게 담아, 코드의 가독성과 디자인 의도 파악을 용이하게 합니다.

## `defineComponent` API: 컴포넌트 정의의 표준

AdorableCSS의 `defineComponent` API는 컴포넌트의 기본 스타일, 크기, 변형(variants), 상태(states), 그리고 복합적인 조건(compounds)에 따른 스타일을 체계적으로 정의할 수 있도록 설계되었습니다.

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

## Built-in 컴포넌트: AdorableCSS가 제공하는 기본 빌딩 블록

AdorableCSS는 웹 개발에서 자주 사용되는 UI 요소들을 `defineComponent` API를 사용하여 미리 정의된 형태로 제공합니다. 이 내장 컴포넌트들은 AdorableCSS의 철학을 따르며, 일관된 디자인과 높은 재사용성을 보장합니다. 이를 통해 개발자는 반복적인 스타일링 작업 없이 핵심 기능 구현에 집중할 수 있습니다.

### 1. Primitives (기본 컴포넌트): UI의 최소 단위

#### Button (`btn`): 다양한 액션을 위한 표준 버튼

`btn()` 컴포넌트는 웹 애플리케이션에서 가장 흔하게 사용되는 버튼을 위한 유연하고 강력한 스타일링을 제공합니다. 다양한 크기, 스타일 변형, 그리고 상태를 쉽게 적용할 수 있습니다.

```css
/* 크기 (Sizes): 버튼의 높이와 패딩, 폰트 크기 조절 */
btn(sm)         /* 작은 버튼 (height: 32px, padding-x: 12px, font-size: sm) */
btn()           /* 기본 버튼 (height: 40px, padding-x: 16px, font-size: md) */
btn(lg)         /* 큰 버튼 (height: 48px, padding-x: 20px, font-size: lg) */
btn(icon)       /* 아이콘 전용 버튼 (정사각형 형태, 아이콘 크기에 최적화) */

/* 변형 (Variants): 버튼의 시각적 스타일 및 역할 정의 */
btn(primary)    /* 주요 액션 버튼 (예: 브랜드 색상 배경, 흰색 텍스트) */
btn(secondary)  /* 보조 액션 버튼 (예: 회색 배경, 어두운 텍스트) */
btn(destructive) /* 위험한 액션 버튼 (예: 빨간색 배경, 흰색 텍스트) */
btn(outline)    /* 외곽선 버튼 (예: 투명 배경, 테두리 색상) */
btn(ghost)      /* 투명 버튼 (예: 배경 없음, 텍스트 색상만) */
btn(link)       /* 링크 스타일 버튼 (텍스트만 강조, 밑줄 등) */

/* 조합 (Compounds): 크기와 변형을 동시에 적용 */
btn(primary/lg) /* 큰 주요 액션 버튼 */
btn(ghost/icon) /* 고스트 스타일의 아이콘 버튼 */
```

#### Card (`card`): 콘텐츠를 담는 유연한 컨테이너

`card()` 컴포넌트는 다양한 종류의 콘텐츠를 담을 수 있는 유연한 컨테이너를 제공합니다. 그림자, 테두리, 배경 등 다양한 시각적 스타일을 적용하여 정보의 계층을 명확하게 할 수 있습니다.

```css
/* 크기 (Sizes): 카드의 내부 패딩 조절 */
card(sm)        /* 작은 카드 (padding: 16px) */
card()          /* 기본 카드 (padding: 24px) */
card(lg)        /* 큰 카드 (padding: 32px) */

/* 변형 (Variants): 카드의 시각적 스타일 정의 */
card(outlined)  /* 테두리가 있는 카드 */
card(elevated)  /* 그림자가 강조된 카드 (깊이감 표현) */
card(glass)     /* 글래스모피즘 효과가 적용된 카드 */
card(gradient)  /* 그라디언트 배경이 적용된 카드 */
card(interactive) /* 호버 시 시각적 피드백이 있는 카드 */

/* 특수 카드: 특정 목적을 위한 사전 정의된 스타일 */
card(feature)   /* 기능 소개, 강조 등에 사용되는 카드 */
card(flat)      /* 그림자나 테두리 없이 평면적인 스타일의 카드 */
```

#### Heading (`heading`): 계층적 제목 시스템

`heading()` 컴포넌트는 웹 페이지의 정보 구조를 명확하게 하는 계층적 제목 스타일을 제공합니다. 다양한 레벨의 제목과 특수 스타일을 쉽게 적용할 수 있습니다.

```css
/* 제목 레벨 (Sizes): h1부터 h6까지의 시맨틱한 제목 크기 */
heading(h1)     /* 가장 큰 제목 (font-size: var(--font-6xl) 등) */
heading(h2)     /* 섹션 제목 */
heading(h3)     /* 서브섹션 제목 */
heading(h4)     /* 소제목 */
heading(h5)     /* 작은 제목 */
heading(h6)     /* 가장 작은 제목 */

/* 특수 스타일 (Variants): 제목의 시각적 강조 */
heading(display) /* 매우 크고 시선을 끄는 디스플레이용 제목 */
heading(hero)   /* 히어로 섹션 등에서 사용되는 반응형 제목 */
heading(caption) /* 이미지나 표 등에 사용되는 작은 캡션 스타일 */

/* 변형 조합: 레벨과 스타일을 동시에 적용 */
heading(h1/gradient)  /* h1 제목에 그라디언트 색상 적용 */
heading(h2/muted)     /* h2 제목을 약한 색상으로 표시 */
heading(h3/primary)   /* h3 제목에 브랜드 주 색상 적용 */
heading(hero/rainbow) /* 히어로 제목에 무지개 색상 그라디언트 적용 */
```

#### Form 컴포넌트: 일관된 입력 요소

AdorableCSS는 웹 폼을 위한 일관된 스타일의 입력 요소들을 제공합니다. 이를 통해 사용자 입력 경험의 일관성을 유지하고, 폼 디자인의 복잡성을 줄일 수 있습니다.

```css
/* Input: 텍스트 입력 필드 */
input()         /* 기본 입력 필드 스타일 */
input(error)    /* 오류 상태 입력 필드 (예: 빨간색 테두리) */
input(success)  /* 성공 상태 입력 필드 (예: 초록색 테두리) */

/* Textarea: 여러 줄 텍스트 입력 필드 */
textarea()      /* 기본 텍스트영역 스타일 */
textarea(lg)    /* 큰 텍스트영역 (높이 증가) */

/* Checkbox & Radio: 선택형 입력 요소 */
checkbox()      /* 기본 체크박스 스타일 */
radio()         /* 기본 라디오 버튼 스타일 */
```

### 2. Patterns (패턴 컴포넌트): 재사용 가능한 UI 섹션

패턴 컴포넌트는 여러 기본 컴포넌트와 레이아웃 유틸리티를 조합하여 만들어진, 특정 목적을 가진 재사용 가능한 UI 섹션입니다. 이를 통해 페이지의 구조를 빠르게 구축하고 일관성을 유지할 수 있습니다.

#### Container (`container`): 콘텐츠 너비 제어 및 중앙 정렬

`container()` 컴포넌트는 웹 페이지의 콘텐츠 영역을 정의하고, 최대 너비를 제어하며, 자동으로 중앙에 정렬합니다. 이는 다양한 화면 크기에서 콘텐츠의 가독성과 레이아웃의 안정성을 보장하는 데 필수적입니다.

```css
/* 크기별 컨테이너: 미리 정의된 최대 너비 (디자인 토큰 `--container-` 참조) */
container(sm)   /* max-width: var(--container-sm); (예: 640px) */
container(md)   /* max-width: var(--container-md); (예: 768px) */
container(lg)   /* max-width: var(--container-lg); (예: 1024px) */
container(xl)   /* max-width: var(--container-xl); (예: 1280px) */
container(2xl)  /* max-width: var(--container-2xl); (예: 1440px) */

/* 특수 컨테이너: 특정 목적을 위한 컨테이너 */
container(prose) /* max-width: var(--container-prose); (예: 65ch, 읽기 최적화된 텍스트 너비) */
container(full) /* width: 100%; (최대 너비 제한 없이 전체 너비 사용) */
```

#### Prose (`prose`): 가독성 높은 텍스트 블록 스타일링

`prose()` 컴포넌트는 마크다운이나 CMS(콘텐츠 관리 시스템)에서 생성된 긴 텍스트 콘텐츠의 가독성을 높이기 위한 스타일을 제공합니다. 이 컴포넌트를 적용하면, 내부의 `h1`-`h6`, `p`, `a`, `ul`, `ol`, `blockquote`, `code`, `pre`, `table` 등 표준 HTML 요소들이 자동으로 일관된 타이포그래피와 간격으로 스타일링됩니다. 개발자가 각 태그에 일일이 클래스를 부여할 필요 없이, 콘텐츠의 시각적 일관성을 유지할 수 있습니다.

```css
/* 기본 사용: 콘텐츠 블록에 기본 문서 스타일 적용 */
prose()         /* 기본 문서 스타일 (폰트 크기, 줄 높이, 간격 등) */
prose(sm)       /* 작은 텍스트에 최적화된 문서 스타일 */
prose(lg)       /* 큰 텍스트에 최적화된 문서 스타일 */

/* 변형: 특정 콘텐츠 유형에 맞는 스타일 */
prose(docs)     /* 기술 문서에 적합한 스타일 (예: 코드 블록 강조) */
prose(article)  /* 블로그 게시물, 기사 등에 적합한 스타일 (예: 이미지 여백) */
prose(technical) /* 코드 예제, 표 등이 많은 기술 문서에 최적화된 스타일 */
prose(marketing) /* 마케팅 콘텐츠에 적합한 시각적 스타일 (예: CTA 버튼 강조) */
```

#### Section (`section`): 페이지 섹션 구성 및 스타일링

`section()` 컴포넌트는 웹 페이지의 주요 섹션을 구조화하고, 섹션 간의 간격과 배경 스타일을 일관되게 관리하는 데 사용됩니다. 이를 통해 페이지의 시각적 흐름을 명확하게 하고, 재사용 가능한 섹션 템플릿을 구축할 수 있습니다.

```css
/* 간격 변형: 섹션의 상하 패딩 조절 */
section(compact) /* 상하 패딩이 작은 섹션 */
section()       /* 기본 상하 패딩 섹션 */
section(spacious) /* 상하 패딩이 큰 섹션 */

/* 스타일 변형: 섹션의 시각적 테마 */
section(hero)   /* 페이지 상단의 큰 이미지/텍스트 섹션 (예: 풀스크린 배경, 중앙 정렬) */
section(feature) /* 제품/서비스의 특정 기능을 소개하는 섹션 (예: 아이콘과 텍스트 조합) */
section(cta)    /* Call-to-Action (행동 유도) 버튼이 강조된 섹션 (예: 눈에 띄는 배경색) */
```

### 3. Features (기능 컴포넌트): 특별한 시각적 효과

기능 컴포넌트는 특정 시각적 효과나 인터랙션을 쉽게 적용할 수 있도록 미리 정의된 스타일을 제공합니다. 이를 통해 복잡한 CSS 속성 조합 없이도 풍부한 사용자 경험을 구현할 수 있습니다.

#### Glass 효과 (`glass`): 글래스모피즘 디자인

`glass()` 컴포넌트는 배경 블러, 투명도, 테두리 등을 조합하여 글래스모피즘(Glassmorphism) 디자인 효과를 쉽게 적용할 수 있게 합니다.

```css
/* 기본 글래스 효과: 미리 정의된 강도 */
glass()         /* 기본 글래스모피즘 효과 */
glass(strong)   /* 강한 블러와 투명도 */
glass(subtle)   /* 약한 블러와 투명도 */

/* 커스텀 글래스 효과: 블러, 투명도, 색조 직접 설정 */
glass(20/0.2/blue) /* backdrop-filter: blur(20px); background-color: rgba(blue, 0.2); (블러 강도/배경 투명도/배경 색조) */

/* 글래스 컴포넌트: 글래스 효과가 적용된 특정 UI 요소 */
glass-card()    /* 글래스모피즘 스타일의 카드 */
glass-nav()     /* 글래스모피즘 스타일의 네비게이션 바 */
glass-dark()    /* 다크 모드에 최적화된 글래스 효과 */
```

#### Interactive 효과 (`interactive`): 상호작용 피드백

`interactive()` 컴포넌트는 요소의 상호작용(hover, click 등)에 대한 시각적 피드백을 일관된 강도로 제공합니다. 이는 사용자에게 명확한 인터랙션 가이드를 제공하여 사용성을 높입니다.

```css
/* 레벨별 효과: 상호작용 강도 조절 */
interactive(1)  /* 미세한 상호작용 효과 */
interactive(2)  /* 약한 상호작용 효과 */
interactive(3)  /* 중간 강도의 상호작용 효과 */
interactive(4)  /* 강한 상호작용 효과 */
interactive(5)  /* 매우 강한 상호작용 효과 */

/* 특정 상호작용: 특정 인터랙션에 대한 스타일 */
clickable()     /* 클릭 가능한 요소에 대한 시각적 피드백 */
hoverable()     /* 호버 가능한 요소에 대한 시각적 피드백 */
pressable()     /* 누를 때 피드백이 있는 요소 */
draggable()     /* 드래그 가능한 요소에 대한 시각적 피드백 */
selectable()    /* 선택 가능한 요소에 대한 시각적 피드백 */
```

#### Glow 효과 (`glow`): 빛나는 시각적 강조

`glow()` 컴포넌트는 요소 주변에 부드러운 빛나는 효과를 추가하여 시각적 강조를 제공합니다. 이는 특정 요소에 주의를 집중시키거나, 브랜드 아이덴티티를 표현하는 데 사용될 수 있습니다.

```css
/* 기본 글로우 효과: 미리 정의된 색상과 강도 */
glow()          /* 기본 글로우 효과 (예: 흰색 또는 기본 강조 색상) */
glow(primary)   /* 브랜드 주 색상으로 빛나는 효과 */
glow(accent)    /* 강조 색상으로 빛나는 효과 */

/* 강도 조절: 그림자의 크기나 블러 강도 조절 */
glow(sm)        /* 약한 글로우 효과 */
glow(lg)        /* 강한 글로우 효과 */
```

## 커스텀 컴포넌트 만들기: 프로젝트의 고유한 UI 요소 정의

AdorableCSS의 `defineComponent` API를 사용하면, 내장 컴포넌트 외에도 프로젝트의 특정 요구사항에 맞는 커스텀 컴포넌트를 쉽게 정의할 수 있습니다. 이는 디자인 시스템의 유연성을 극대화하고, 재사용 가능한 UI 패턴을 코드베이스에 통합하는 데 필수적입니다.

### 1. 실전 예제: 프로덕트 카드 (`productCard`)

다음은 실제 웹 애플리케이션에서 흔히 볼 수 있는 '상품 카드' 컴포넌트를 `defineComponent`를 사용하여 정의하는 예시입니다. 이 컴포넌트는 다양한 크기, 스타일 변형, 그리고 상호작용 상태를 지원합니다.

```typescript
import { defineComponent } from 'adorable-css';

// `productCard` 컴포넌트 정의
export const productCard = defineComponent({
  // `base`: 컴포넌트의 기본 스타일을 정의합니다. 모든 변형과 크기에 공통적으로 적용됩니다.
  base: 'vbox bg(white) r(xl) overflow(hidden) transition', // 세로 방향 Flexbox, 흰색 배경, 둥근 모서리, 내용물 넘침 숨김, 부드러운 전환 효과
  
  // `sizes`: 컴포넌트의 크기 변형을 정의합니다. Figma의 크기 제약(Constraints)과 유사합니다.
  sizes: {
    sm: 'w(280)',     // 작은 카드: 너비 280px
    md: 'w(320)',     // 중간 카드 (기본값): 너비 320px
    lg: 'w(400)'      // 큰 카드: 너비 400px
  },
  
  // `variants`: 컴포넌트의 시각적 스타일 변형을 정의합니다. Figma의 Variants와 유사합니다.
  variants: {
    default: 'shadow(md) hover:shadow(lg)', // 기본 스타일: 중간 그림자, 호버 시 큰 그림자
    featured: 'shadow(xl) border(2/primary) hover:scale(1.02)', // 추천 상품: 큰 그림자, 주 색상 테두리, 호버 시 약간 확대
    minimal: 'border(1/gray-200)', // 최소한의 스타일: 얇은 회색 테두리
    sale: 'shadow(lg/red-500.3) border(2/red-500)' // 세일 상품: 빨간색 그림자, 빨간색 테두리
  },
  
  // `states`: 컴포넌트의 특정 상태(예: 호버, 포커스, 비활성화)에 따른 스타일을 정의합니다.
  states: {
    hover: 'transform(translateY(-2px))',  // 호버 시 Y축으로 -2px 이동 (살짝 뜨는 효과)
    'group-hover': 'shadow(xl)'           // 부모 요소에 호버 시 자식 요소에 큰 그림자 적용
  },
  
  // `compounds`: 특정 `variant`와 `size` 조합에만 적용되는 추가 스타일을 정의합니다.
  compounds: [
    {
      variant: 'featured',
      size: 'lg',
      class: 'p(xl) gap(lg)'  // 추천 상품 중 큰 카드에 특별 패딩과 간격 적용
    },
    {
      variant: 'sale',
      size: 'sm',
      class: 'relative'  // 세일 상품 중 작은 카드에 상대 위치 지정 (세일 배지 배치용)
    }
  ],
  
  // `defaults`: 컴포넌트의 기본 `size`와 `variant`를 설정합니다.
  defaults: {
    size: 'md',
    variant: 'default'
  }
});
```

### 사용 예시: `productCard` 컴포넌트 활용

`productCard` 컴포넌트는 HTML/JSX에서 다음과 같이 간결하게 사용할 수 있습니다. `productCard()` 함수 호출을 통해 컴포넌트의 클래스 이름을 생성하고, 필요에 따라 `variant`와 `size`를 인자로 전달합니다.

```html
<!-- 기본 상품 카드: 기본 크기(md)와 기본 스타일(default) 적용 -->
<div class="productCard()">
  <img src="product.jpg" class="w(full) h(200) object(cover)" alt="상품 이미지" />
  <div class="p(lg) vbox gap(sm)">
    <h3 class="font(lg) bold">상품명</h3>
    <p class="c(gray-600)">상품 설명이 여기에 들어갑니다. 간결하고 명확하게 상품의 특징을 요약합니다.</p>
    <span class="font(xl) bold c(primary)">₩29,900</span>
  </div>
</div>

<!-- 특성 상품 (Featured): featured 변형과 lg 크기 적용 -->
<div class="productCard(featured/lg)">
  <img src="featured-product.jpg" class="w(full) h(250) object(cover)" alt="추천 상품 이미지" />
  <div class="p(xl) vbox gap(lg)">
    <h3 class="font(2xl) bold c(primary)">오늘의 특가 상품</h3>
    <p class="c(gray-700)">이 상품은 특별한 기능과 할인 혜택을 제공합니다. 놓치지 마세요!</p>
    <span class="font(3xl) bold c(red-500)">₩19,900</span>
  </div>
</div>

<!-- 세일 상품: sale 변형과 sm 크기 적용, 추가 유틸리티로 배지 배치 -->
<div class="productCard(sale/sm)">
  <span class="absolute top(10) right(10) bg(red-500) c(white) px(8) py(4) r(full) text(sm) bold">
    SALE
  </span>
  <img src="sale-product.jpg" class="w(full) h(180) object(cover)" alt="세일 상품 이미지" />
  <div class="p(lg) vbox gap(sm)">
    <h3 class="font(md) bold">기간 한정 세일</h3>
    <p class="c(gray-500)">놀라운 가격으로 만나보세요!</p>
    <span class="font(lg) bold c(red-500)">₩9,900</span>
  </div>
</div>
```

### 2. 테마 지원 컴포넌트 (`defineThemedComponent`): 다크 모드 및 브랜드 테마 구현

`defineThemedComponent` API는 컴포넌트가 여러 테마(예: 라이트 모드, 다크 모드)에 따라 다른 스타일을 가질 수 있도록 합니다. 이는 디자인 시스템의 유연성을 높이고, 사용자에게 개인화된 경험을 제공하는 데 필수적입니다.

```typescript
import { defineThemedComponent } from 'adorable-css';

// 테마에 따라 스타일이 달라지는 버튼 컴포넌트 정의
export const themedButton = defineThemedComponent({
  // 'light' 테마일 때의 스타일 정의
  light: {
    base: 'bg(white) c(gray-900) border(1/gray-200)', // 기본 배경 흰색, 텍스트 회색, 얇은 회색 테두리
    variants: {
      primary: 'bg(blue-500) c(white)', // 주 색상 버튼: 파란색 배경, 흰색 텍스트
      secondary: 'bg(gray-100)'        // 보조 색상 버튼: 연한 회색 배경
    }
  },
  // 'dark' 테마일 때의 스타일 정의
  dark: {
    base: 'bg(gray-800) c(white) border(1/gray-700)', // 기본 배경 어두운 회색, 텍스트 흰색, 어두운 회색 테두리
    variants: {
      primary: 'bg(blue-600) c(white)', // 주 색상 버튼: 더 진한 파란색 배경, 흰색 텍스트
      secondary: 'bg(gray-700)'        // 보조 색상 버튼: 중간 회색 배경
    }
  }
});
```

`themedButton()` 컴포넌트는 현재 활성화된 테마에 따라 자동으로 적절한 스타일을 적용합니다. 이를 통해 다크 모드와 같은 기능을 쉽게 구현하고, 브랜드별 테마를 유연하게 관리할 수 있습니다.

### 3. 복잡한 컴포넌트: 셀렉터를 활용한 내부 요소 스타일링

`defineComponent`의 `selectors` 속성을 사용하면, 컴포넌트 내부의 특정 HTML 요소나 가상 요소에 직접 스타일을 적용할 수 있습니다. 이는 복잡한 구조의 컴포넌트를 정의할 때 유용하며, CSS-in-JS의 강력한 기능을 활용하여 컴포넌트의 스타일을 한 곳에서 관리할 수 있게 합니다.

```typescript
import { defineComponent } from 'adorable-css';

// 데이터 테이블 컴포넌트 정의
export const dataTable = defineComponent({
  // 테이블의 기본 스타일
  base: 'w(full) bg(white) r(lg) overflow(hidden)', // 너비 100%, 흰색 배경, 둥근 모서리, 내용물 넘침 숨김
  
  // `selectors`: 컴포넌트 내부 요소에 대한 스타일 정의
  selectors: {
    '& thead': 'bg(gray-50) border-b(1/gray-200)', // 테이블 헤더: 연한 회색 배경, 하단 테두리
    '& th': 'p(12) text(left) font(semi) c(gray-900)', // 테이블 헤더 셀: 패딩, 왼쪽 정렬, 세미볼드 폰트, 어두운 텍스트
    '& td': 'p(12) border-b(1/gray-100)', // 테이블 데이터 셀: 패딩, 하단 테두리
    '& tr:hover': 'bg(gray-50/0.5)', // 테이블 로우 호버 시: 연한 회색 배경에 투명도 적용
    '& tr:last-child td': 'border-b(none)' // 마지막 로우의 셀: 하단 테두리 제거
  },
  
  // `variants`: 테이블의 시각적 변형
  variants: {
    striped: {
      '& tbody tr:nth-child(even)': 'bg(gray-50)' // 짝수 로우에 배경색 적용 (스트라이프 효과)
    },
    compact: {
      '& th, & td': 'p(8) text(sm)' // 테이블 셀의 패딩과 폰트 크기 줄임 (컴팩트 모드)
    }
  }
});
```

`dataTable()` 컴포넌트는 복잡한 테이블 구조의 스타일링을 간결하게 정의할 수 있도록 돕습니다. `&` 기호는 현재 컴포넌트의 루트 요소를 참조하며, 이를 통해 중첩된 셀렉터를 쉽게 작성할 수 있습니다.

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

- [Design System](/docs/design-system) - 완전한 디자인 시스템 구축