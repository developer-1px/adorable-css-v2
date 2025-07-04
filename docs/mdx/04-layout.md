# Layout 시스템

> "Margin이 없는 세상을 상상해보세요. Figma가 그렇습니다."

AdorableCSS의 레이아웃 철학은 단순합니다: **Gap-based Layout**. Margin의 복잡함을 버리고, Figma처럼 생각하세요.

## No Margin Rule: 왜 Margin을 버렸는가?

### Margin의 문제점
1. **Margin Collapse**: 예측 불가능한 동작
```css
/* 위 요소 margin-bottom: 20px, 아래 요소 margin-top: 30px */
/* 실제 간격: 30px (더 큰 값으로 collapse) */
```

2. **음수 Margin**: 복잡한 레이아웃 해킹
3. **불필요한 복잡도**: 외부 간격과 내부 간격의 혼재

### Gap의 장점
1. **예측 가능**: 항상 설정한 값 그대로
2. **간단함**: 부모가 자식 간격 관리
3. **Figma와 동일**: 디자인 도구와 1:1 매핑

```html
<!-- ❌ 전통적 방식: margin으로 간격 조절 -->
<div class="mb-4">...</div>
<div class="mt-6">...</div>  <!-- 실제 간격은? -->

<!-- ✅ AdorableCSS: gap으로 명확한 간격 -->
<div class="vbox gap(20)">
  <div>...</div>
  <div>...</div>  <!-- 간격: 정확히 20px -->
</div>
```

## Auto Layout 매핑

### 1. 기본 박스 모델
Figma의 Frame과 Auto Layout을 `hbox()`와 `vbox()`로 표현:

```css
/* 가로 박스 (Horizontal Auto Layout) */
hbox()              /* display: flex; flex-direction: row; align-items: center */
hbox(top)           /* align-items: flex-start */
hbox(middle)        /* align-items: center (기본값) */
hbox(bottom)        /* align-items: flex-end */

/* 세로 박스 (Vertical Auto Layout) */
vbox()              /* display: flex; flex-direction: column */
vbox(left)          /* align-items: flex-start */
vbox(center)        /* align-items: center */
vbox(right)         /* align-items: flex-end */
vbox(fill)          /* align-items: stretch (기본값) */

/* 정렬 조합 */
hbox(middle+pack)   /* 가로 세로 중앙 정렬 */
vbox(center+pack)   /* 세로 박스 중앙 정렬 */
```

### 2. 간격 시스템 (Gap)
Figma의 Item Spacing 구현:

```css
/* 고정 간격 */
gap(16)             /* gap: 16px */
gap(sm)             /* gap: var(--spacing-sm) */
gap(md)             /* gap: var(--spacing-md) */

/* 자동 간격 (Space Between) */
gap(auto)           /* gap: auto; justify-content: space-between */

/* 방향별 간격 */
gap-x(20)           /* column-gap: 20px */
gap-y(10)           /* row-gap: 10px */
```

### 3. 패딩 시스템
Figma의 Padding 완벽 구현:

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

/* 반응형 패딩 */
p(sm) md:p(md) lg:p(lg)
```

## 크기 시스템

### 1. 너비 (Width)
Figma의 Width 속성 매핑:

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

/* Fill Container (Figma) */
w(fill)             /* width: 100%; flex: 1 */

/* Hug Contents (Figma) */
w(hug)              /* width: fit-content */
```

### 2. 높이 (Height)
```css
/* 고정 높이 */
h(200)              /* height: 200px */
h(100vh)            /* height: 100vh */

/* 특수 값 */
h(full)             /* height: 100% */
h(screen)           /* height: 100vh */
h(auto)             /* height: auto */

/* 최소/최대 */
min-h(100)          /* min-height: 100px */
max-h(500)          /* max-height: 500px */
```

### 3. 종횡비 (Aspect Ratio)
```css
/* 일반 비율 */
size(16:9)          /* aspect-ratio: 16/9 */
size(4:3)           /* aspect-ratio: 4/3 */
size(1:1)           /* aspect-ratio: 1/1 (정사각형) */

/* Size 유틸리티로 크기와 비율 동시 설정 */
size(200)           /* width: 200px; height: 200px */
size(16:9)          /* aspect-ratio: 16/9 */
size(320x200)       /* width: 320px; height: 200px */
```

## Grid 시스템

### 1. 기본 그리드
CSS Grid를 쉽게 사용:

```css
/* 자동 그리드 */
grid                /* display: grid; auto-fit columns */
grid(3)             /* grid-template-columns: repeat(3, 1fr) */
grid(4)             /* grid-template-columns: repeat(4, 1fr) */

/* 반응형 그리드 */
grid(1) md:grid(2) lg:grid(3) xl:grid(4)

/* 그리드 간격 */
grid(3) gap(20)     /* 3열 그리드, 20px 간격 */
```

### 2. 고급 그리드
```css
/* 커스텀 그리드 템플릿 */
grid-cols(200px_1fr_200px)   /* 사이드바 레이아웃 */
grid-cols(repeat(auto-fit,minmax(300px,1fr)))

/* 그리드 영역 */
grid-area(header)   /* grid-area: header */
col-span(2)         /* grid-column: span 2 */
row-span(3)         /* grid-row: span 3 */
```

## Position 시스템

### 1. Layer 포지셔닝
AdorableCSS의 독창적인 레이어 시스템:

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
layer(fill)         /* inset: 0 (전체 채우기) */
layer(fill/20)      /* inset: 20px */
```

### 2. 좌표 시스템
직관적인 좌표 표현:

```css
/* 절대 좌표 */
(20,30)             /* left: 20px; top: 30px */
(center,top)        /* 가로 중앙, 상단 */

/* 계산식 */
(100%-20,50%+10)    /* left: calc(100% - 20px); top: calc(50% + 10px) */

/* 토큰 사용 */
(left+sm,top+md)    /* left + spacing-sm, top + spacing-md */
```

### 3. Position 유틸리티
```css
/* 포지션 타입 */
relative            /* position: relative */
absolute            /* position: absolute */
fixed               /* position: fixed */
sticky              /* position: sticky */

/* 개별 위치 */
top(20)             /* top: 20px */
right(0)            /* right: 0 */
bottom(auto)        /* bottom: auto */
left(50%)           /* left: 50% */

/* Z-index */
z(10)               /* z-index: 10 */
z(modal)            /* z-index: var(--z-modal) */
```

## Container 시스템

### 1. 반응형 컨테이너
```css
/* 기본 컨테이너 */
container           /* 중앙 정렬, 반응형 패딩 */
container(lg)       /* max-width: var(--container-lg) */
container(xl)       /* max-width: var(--container-xl) */

/* 읽기 최적화 컨테이너 */
container(prose)    /* max-width: 65ch */
```

### 2. 컨테이너 쿼리
```css
/* 컨테이너 기반 반응형 */
@container (min-width: 400px) {
  /* 스타일 */
}
```

## Flexbox 고급 기능

### 1. Flex 속성
```css
/* Flex 증가/축소 */
flex(1)             /* flex: 1 1 0% */
flex(auto)          /* flex: 1 1 auto */
flex(initial)       /* flex: 0 1 auto */
flex(none)          /* flex: none */

/* 개별 속성 */
grow                /* flex-grow: 1 */
grow(2)             /* flex-grow: 2 */
shrink(0)           /* flex-shrink: 0 */
basis(200)          /* flex-basis: 200px */
```

### 2. 정렬 옵션
```css
/* Justify Content */
pack                /* justify-content: center */
between             /* justify-content: space-between */
around              /* justify-content: space-around */
evenly              /* justify-content: space-evenly */

/* Align Items */
items(start)        /* align-items: flex-start */
items(center)       /* align-items: center */
items(end)          /* align-items: flex-end */
items(fill)         /* align-items: stretch */

/* Wrap */
wrap                /* flex-wrap: wrap */
nowrap              /* flex-wrap: nowrap */
wrap-reverse        /* flex-wrap: wrap-reverse */
```

## Overflow 제어

```css
/* 기본 overflow */
clip    /* overflow: hidden */
overflow(auto)      /* overflow: auto */
overflow(scroll)    /* overflow: scroll */
overflow(visible)   /* overflow: visible */

/* 축별 overflow */
overflow-x(auto)    /* overflow-x: auto */
overflow-y(hidden)  /* overflow-y: hidden */

/* 단축어 */
clip                /* overflow: hidden */
scrollable          /* overflow: auto */
```

## 실전 레이아웃 패턴

### 1. The Holy Grail Layout
전통적으로 가장 어려운 레이아웃을 AdorableCSS로:

```html
<!-- 전통적 CSS: 50+ 줄 -->
<!-- AdorableCSS: 5줄 -->
<div class="vbox h(screen)">
  <header class="hbox(middle) gap(auto) px(xl) py(md) bg(white) shadow(sm)">
    <div class="hbox gap(lg)">
      <img class="w(40) h(40)" src="logo.png" />
      <nav class="hbox gap(md)">
        <a class="c(gray-700) hover:c(primary)">홈</a>
        <a class="c(gray-700) hover:c(primary)">소개</a>
        <a class="c(gray-700) hover:c(primary)">문서</a>
      </nav>
    </div>
    <button class="btn(primary)">시작하기</button>
  </header>
  
  <div class="hbox flex(1) clip">
    <aside class="w(240) bg(gray-50) p(lg) overflow-y(auto)">
      <!-- 사이드바 -->
    </aside>
    
    <main class="flex(1) p(xl) overflow-y(auto)">
      <!-- 메인 컨텐츠 -->
    </main>
  </div>
  
  <footer class="px(xl) py(md) bg(gray-900) c(white)">
    © 2024 AdorableCSS
  </footer>
</div>
```

### 2. 카드 그리드
```html
<div class="container grid(1) md:grid(2) lg:grid(3) gap(lg)">
  <div class="card() p(lg)">
    <h3 class="heading(h3) mb(sm)">카드 제목</h3>
    <p class="text(gray-600)">카드 내용...</p>
  </div>
  <!-- 더 많은 카드들... -->
</div>
```

### 3. 사이드바 레이아웃
```html
<div class="hbox h(screen)">
  <aside class="w(280) vbox p(lg) bg(gray-50)">
    <!-- 사이드바 내용 -->
  </aside>
  <main class="flex(1) p(xl) overflow-y(auto)">
    <!-- 메인 컨텐츠 -->
  </main>
</div>
```

### 4. 모달 오버레이 (중앙 정렬의 진수)
```html
<!-- 전통적 방식: position + transform 헤킹 -->
<div style="
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
">

<!-- AdorableCSS: 직관적 -->
<div class="layer(fill) bg(black.5) z(modal)">
  <div class="layer(center) card() w(480) max-h(80vh) overflow-y(auto)">
    <h2 class="heading(h3) mb(md)">모달 제목</h2>
    <p class="text(gray-600) mb(lg)">모달 내용...</p>
    <div class="hbox(right) gap(sm)">
      <button class="btn(ghost)">취소</button>
      <button class="btn(primary)">확인</button>
    </div>
  </div>
</div>
```

### 5. 비율 기반 레이아웃
```html
<!-- 16:9 비디오 컨테이너 -->
<div class="size(16:9) bg(black) r(lg) clip">
  <video class="w(full) h(full) object(cover)" />
</div>

<!-- 1:1 프로필 이미지 -->
<div class="size(120) r(full) clip">
  <img class="w(full) h(full) object(cover)" />
</div>
```

## 성능 최적화 팁

### 1. 레이아웃 시프트 방지
```css
/* 고정 크기 지정 */
w(320) h(200)      /* 레이아웃 시프트 방지 */

/* 종횡비 유지 */
size(16:9)         /* 이미지 로드 전 공간 확보 */
```

### 2. 하드웨어 가속
```css
/* transform 사용 */
layer(center)       /* transform 기반 중앙 정렬 */
translate-x(50%)    /* GPU 가속 */
```

### 3. 컨테이너 쿼리 활용
부모 크기 기반 반응형으로 더 효율적인 레이아웃 구성

## Layout의 철학: Constraints over Positioning

### 전통적 CSS
"요소를 어디에 배치할까?" (position, top, left...)

### AdorableCSS
"요소가 어떤 제약을 가져야 할까?" (fill, hug, constraints)

이것이 Figma가 레이아웃을 생각하는 방식이고, AdorableCSS가 추구하는 방향입니다.

```html
<!-- 예시: 반응형 카드 그리드 -->
<div class="container grid(1) sm:grid(2) lg:grid(3) xl:grid(4) gap(lg)">
  <!-- 카드들은 컨테이너의 제약에 따라 배치됨 -->
</div>
```

## 다음 단계

- [Component](/docs/component) - 레이아웃 기반 컴포넌트 구축
- [Design System](/docs/design-system) - 완전한 디자인 시스템 구축