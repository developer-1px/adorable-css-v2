# AdorableCSS v2 Reference

> 전체 API 레퍼런스 및 사용 가이드

## 🎯 핵심 컨셉

### CSS @layer 시스템

AdorableCSS는 CSS @layer를 활용하여 예측 가능한 캐스케이드를 구현합니다:

```css
@layer component, layout, utility, state;
```

- **component**: 사전 정의된 UI 컴포넌트 (Priority 100)
- **layout**: 레이아웃 및 공간 설정 (Priority 200)
- **utility**: 시각적 스타일링 (Priority 300)
- **state**: 상태 및 인터랙션 (Priority 400)

### 문법 패턴

| 패턴 | 예시 | 설명 |
|------|------|------|
| 키워드 | `relative` | 단순 키워드 |
| 함수 | `w(100)` | 단일 값 |
| 토큰 | `p(lg)` | 디자인 토큰 |
| 슬래시 | `p(10/20)` | 다중 값 |
| 플러스 | `hbox(top+left)` | 값 결합 |
| 콜론 | `layer(top:20)` | 키-값 쌍 |
| 범위 | `bg(red..blue)` | 그라데이션 |
| 투명도 | `c(blue.5)` | 50% 투명도 |
| 계산 | `w(100%-20)` | CSS calc() |
| 상태 | `hover:scale(1.05)` | 의사 클래스 |
| 반응형 | `md:hidden` | 미디어 쿼리 |
| 중요도 | `w(full)!` | !important |

## 📦 Components (@layer component)

### 사전 정의된 컴포넌트

| 컴포넌트 | 설명 | 포함된 스타일 |
|----------|------|-------------|
| `card` | 기본 카드 | 배경, 패딩, 모서리, 그림자 |
| `btn` | 버튼 | 패딩, 모서리, 호버 효과 |
| `heading` | 제목 | 타이포그래피, 간격 |
| `hero` | 히어로 섹션 | 크기, 패딩, 배경 |
| `section` | 컨텐츠 섹션 | 패딩, 최대 너비 |
| `container` | 컨테이너 | 최대 너비, 중앙 정렬 |
| `prose` | 긴 글 | 타이포그래피, 간격 |

```html
<!-- 컴포넌트 사용 예시 -->
<div class="card">
  <h2 class="heading">Title</h2>
  <p class="prose">Content...</p>
  <button class="btn">Action</button>
</div>
```

## 📏 Layout (@layer layout)

### Positioning

### Layer Utility (Recommended)
- `layer()` or `layer(fill)` - Covers entire parent (position: absolute, all sides 0)
- `layer(center)` - Centers element (top: 50%, left: 50%, transform: translate(-50%, -50%))
- `layer(top:20)` - Positioned from top
- `layer(top:20/left:30)` - Multiple positions
- `layer(top:20+outside)` - Outside positioning (bottom: calc(100% + 20px))
- `layer(top:-20/right:-40)` - Negative positioning

### Legacy Positioning
- `absolute`, `relative`, `fixed`, `sticky`, `static`
- `top(10)`, `right(10)`, `bottom(10)`, `left(10)`
- `z(10)`, `z(top)` - Z-index (z(top) = 9999)

### Layout

#### Flexbox (v2 Enhanced)
- `hbox()` - Horizontal flex (align-items: center by default)
- `vbox()` - Vertical flex (align-items: fill by default)
- `hbox(pack)` or `vbox(pack)` - Center all (justify-content: center, align-items: center)

#### Horizontal Box (hbox) Alignment
- `hbox(top)` - Align top (align-items: flex-start)
- `hbox(middle)` - Align middle (align-items: center) [default]
- `hbox(bottom)` - Align bottom (align-items: flex-end)
- `hbox(fill)` - Fill container (align-items: stretch)

#### Horizontal Box (hbox) Justification
- `hbox(left)` - Justify left (justify-content: flex-start)
- `hbox(pack)` - Justify center (justify-content: center)
- `hbox(right)` - Justify right (justify-content: flex-end)

#### Vertical Box (vbox) Alignment
- `vbox(left)` - Align left (align-items: flex-start)
- `vbox(center)` - Align center (align-items: center)
- `vbox(right)` - Align right (align-items: flex-end)
- `vbox(fill)` - Fill container (align-items: stretch) [default]

#### Vertical Box (vbox) Justification
- `vbox(top)` - Justify top (justify-content: flex-start)
- `vbox(middle)` - Justify middle (justify-content: center)
- `vbox(bottom)` - Justify bottom (justify-content: flex-end)

#### Combined Modifiers
- `hbox(center+middle)` - Center horizontally and vertically
- `hbox(right+bottom)` - Right bottom alignment
- `hbox(left+middle+reverse)` - Flex-direction: row-reverse
- `hbox(center+wrap)` - With flex-wrap

#### Special Cases
- `gap(auto)` - Space between items (justify-content: space-between)
- `gap(16)` - Gap between items
- `pack()` - Shorthand for hbox(center+middle)
- `wrap()` - hbox with flex-wrap

#### Container Utility
- `container()` - Default container (max-width: 1280px, auto margins, responsive padding)
- `container(sm)` - Small container (640px)
- `container(md)` - Medium container (768px)
- `container(lg)` - Large container (1024px)
- `container(xl)` - Extra large container (1280px)
- `container(2xl)` - 2x large container (1536px)
- `container(7xl)` - 7x large container (4480px)
- `container(full)` - Full width container
- `container(narrow)` - Narrow container (600px)
- `container(wide)` - Wide container (1600px)

#### Container with Padding
- `container(xl/px:0)` - No padding
- `container(xl/px:sm)` - Small padding (0.5rem)
- `container(xl/px:lg)` - Large padding (1.5rem)
- `container(xl/px:lg+md)` - Asymmetric padding (left: 1.5rem, right: 1rem)

#### Sizing

##### 기본 크기
- `w(100)`, `h(100)` - Fixed size
- `w(fill)`, `h(fill)` - 100%
- `w(hug)`, `h(hug)` - Fit content
- `w(200..400)` - Min/max constraints
- `w(100~200~300)` - Min/preferred/max
- `min-w(100)`, `max-w(400)`, `min-h(50)`, `max-h(200)`

##### 특수 크기

| 클래스 | CSS | 설명 |
|-------|-----|------|
| `size(100)` | width: 100px; height: 100px | 정사각형 |
| `size(16:9)` | aspect-ratio: 16/9 | 비율 |
| `size(320x200)` | width: 320px; height: 200px | 고정 크기 |

#### Grid
- `grid` - Display grid
- `grid-cols(3)` - 3 columns
- `grid-rows(2)` - 2 rows

### Spacing

#### Padding & Margin

| 클래스 | 토큰 값 | 설명 |
|-------|----------|------|
| `p(xs)` | 0.25rem | Extra small |
| `p(sm)` | 0.5rem | Small |
| `p(md)` | 1rem | Medium |
| `p(lg)` | 1.5rem | Large |
| `p(xl)` | 2rem | Extra large |
| `p(2xl)` | 3rem | 2x large |
| `p(3xl)` | 4rem | 3x large |

#### Gap

```html
<!-- Flexbox gap -->
<div class="hbox gap(md)">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Auto gap (space-between) -->
<div class="hbox gap(auto)">
  <div>Left</div>
  <div>Right</div>
</div>
```

## 🎨 Utility (@layer utility)

### Typography

### Font Utility
- `font(16)` - Font size only
- `font(Inter/16/1.5/0.05em)` - Family/size/line-height/letter-spacing
- `font(3xl)` - Token size (3xl = 1.875rem)
- `font-family(Inter)` - Font family only

#### 의미론적 타이포그래피

| 클래스 | 크기 | 사용처 |
|-------|-----|--------|
| `display(sm)` | 3rem | 작은 디스플레이 |
| `display(md)` | 4rem | 중간 디스플레이 |
| `display(lg)` | 6rem | 큰 디스플레이 |
| `heading(sm)` | 1.25rem | 작은 제목 |
| `heading(md)` | 1.5rem | 중간 제목 |
| `heading(lg)` | 2rem | 큰 제목 |
| `title(sm)` | 1rem | 작은 타이틀 |
| `title(md)` | 1.125rem | 중간 타이틀 |
| `title(lg)` | 1.25rem | 큰 타이틀 |
| `body(sm)` | 0.875rem | 작은 본문 |
| `body(md)` | 1rem | 기본 본문 |
| `body(lg)` | 1.125rem | 큰 본문 |
| `label(sm)` | 0.75rem | 작은 레이블 |
| `label(md)` | 0.875rem | 기본 레이블 |
| `label(lg)` | 1rem | 큰 레이블 |
| `caption(sm)` | 0.625rem | 작은 캐프션 |
| `caption(md)` | 0.75rem | 기본 캐프션 |

### Font Weights

| 클래스 | Weight | 설명 |
|-------|--------|------|
| `bold(200)` | 200 | 매우 얇음 |
| `bold(300)` | 300 | 얇음 |
| `bold(400)` | 400 | 기본 |
| `bold(500)` | 500 | 중간 |
| `bold(600)` | 600 | 약간 굵음 |
| `bold(700)` | 700 | 굵음 (기본) |
| `bold(900)` | 900 | 매우 굵음 |
| `bold()` | 700 | bold(700)과 동일 |

### Text Utilities
- `text(center)`, `text(left)`, `text(right)`, `text(justify)`
- `uppercase`, `lowercase`, `capitalize`
- `italic`, `underline`, `line-through`, `no-underline`
- `truncate` - Text overflow ellipsis
- `nowrap`, `pre`, `pre-wrap`
- `line-height(1.5)` or `line-height(relaxed)`
- `letter-spacing(0.05em)` or `letter-spacing(wide)`
- `underline-offset(4)`

### Gradient Text

```html
<!-- 그라디언트 텍스트 -->
<h1 class="font(4xl) bold(700) bg-clip(text) c(135deg/#667eea..#764ba2)">
  Gradient Text
</h1>
```

### Colors

#### OKLCH 색상 시스템

AdorableCSS는 지각적 균일성을 위해 OKLCH 색상 공간을 사용합니다:

| 토큰 | 색상 | 사용처 |
|-------|------|--------|
| `gray-50` ~ `gray-950` | 회색 | 중립 색상 |
| `red-50` ~ `red-950` | 빨강 | 오류, 경고 |
| `green-50` ~ `green-950` | 초록 | 성공, 확인 |
| `blue-50` ~ `blue-950` | 파랑 | 정보, 링크 |
| `yellow-50` ~ `yellow-950` | 노랑 | 주의 |
| `purple-50` ~ `purple-950` | 보라 | 브랜드 |

#### Text Color
- `c(#000)` - Hex 색상
- `c(red)` - 기본 색상
- `c(blue-500)` - 토큰 색상
- `c(blue-500.5)` - 50% 투명도
- `c(--custom-var)` - CSS 변수

#### Background

##### 단색 배경
- `bg(white)` - 기본 색상
- `bg(gray-100)` - 토큰 색상
- `bg(blue-500.5)` - 50% 투명도

##### 그라디언트 배경
```html
<!-- 선형 그라디언트 -->
<div class="bg(to-r/#667eea..#764ba2)">
<div class="bg(135deg/#667eea..#764ba2)">

<!-- 방사형 그라디언트 -->
<div class="bg(radial/#667eea..#764ba2)">
<div class="bg(circle/#667eea..#764ba2)">
```

#### Border Color

| 클래스 | 설명 |
|-------|------|
| `bc(gray-200)` | 모든 테두리 색상 |
| `btc(red)` | 위쪽 테두리 색상 |
| `brc(blue)` | 오른쪽 테두리 색상 |
| `bbc(green)` | 아래쪽 테두리 색상 |
| `blc(purple)` | 왼쪽 테두리 색상 |

### Effects

#### Shadow

| 클래스 | 효과 | 사용처 |
|-------|------|--------|
| `shadow(sm)` | 작은 그림자 | 버튼, 입력 필드 |
| `shadow(md)` | 중간 그림자 | 카드 |
| `shadow(lg)` | 큰 그림자 | 모달 |
| `shadow(xl)` | 매우 큰 그림자 | 팝업 |
| `shadow(2xl)` | 2x 큰 그림자 | 드롭다운 |
| `shadow(none)` | 그림자 없음 | 초기화 |

#### Opacity & Blur

```html
<!-- 투명도 -->
<div class="opacity(0.5)">50% 투명</div>

<!-- 블러 -->
<div class="blur(4)">4px 블러</div>
<div class="backdrop-blur(10)">10px 배경 블러</div>
```

### Borders & Radius

#### Border

```html
<!-- 기본 테두리 -->
<div class="b(1/gray-200)">1px 회색 테두리</div>

<!-- 방향별 테두리 -->
<div class="bt(2/blue-500)">2px 위쪽 테두리</div>
<div class="bx(1/gray)">1px 수평 테두리</div>
<div class="by(1/gray)">1px 수직 테두리</div>

<!-- 테두리 스타일 -->
<div class="b(2/dashed/black)">2px 점선 테두리</div>
<div class="b(1/solid/red)">1px 실선 테두리</div>
```

#### Border Radius

| 클래스 | 토큰 값 | 설명 |
|-------|----------|------|
| `r(sm)` | 0.25rem | 작은 모서리 |
| `r(md)` | 0.5rem | 중간 모서리 |
| `r(lg)` | 0.75rem | 큰 모서리 |
| `r(xl)` | 1rem | 매우 큰 모서리 |
| `r(2xl)` | 1.5rem | 2x 큰 모서리 |
| `r(full)` | 9999px | 원형 |
- `r(8/16/24/32)` - All corners different
- `rt(8)`, `rr(8)`, `rb(8)`, `rl(8)` - Individual sides

## Effects

### Shadow
- `shadow(sm)`, `shadow(md)`, `shadow(lg)`, `shadow(xl)`, `shadow(2xl)`
- `shadow(0_4px_6px_rgba(0,0,0,0.1))` - Custom shadow
- `shadow(inset_0_2px_4px_rgba(0,0,0,0.2))` - Inset shadow

### Filters
- `blur(10)` - Blur filter
- `backdrop-blur(10)` - Backdrop blur
- `opacity(50)` - Opacity 50%
- `saturate(150)` - Saturation
- `brightness(90)` - Brightness
- `contrast(120)` - Contrast

### Transform
- `scale(1.05)` - Scale 1.05
- `scale-x(110)`, `scale-y(90)` - Directional scale
- `translate-x(10)`, `translate-y(-20)` - Translation
- `rotate(45)`, `rotate(-15)` - Rotation
- `skew-x(10)`, `skew-y(5)` - Skew
- `transform(rotate(45)+scale(1.1))` - Combined transforms
- `transform-origin(center)`, `transform-origin(top_left)`

### 3D Transforms (New)
- `perspective(1000)` - Perspective
- `transform-style(preserve-3d)` - 3D transform style
- `rotate-x(45)`, `rotate-y(45)`, `rotate-z(45)` - 3D rotations
- `translate-z(10)` - Z translation

## Animation

### Transition
- `transition` - Default all 150ms
- `transition(300)` - Custom duration
- `transition(opacity_300ms_ease-in-out)` - Specific property
- `duration(200)` - Transition duration
- `ease-in`, `ease-out`, `ease-in-out`, `ease-linear`

### Animation
- `animate(spin)` - Spin animation
- `animate(ping)` - Ping animation
- `animate(pulse)` - Pulse animation
- `animate(bounce)` - Bounce animation
- `animation-delay(100)` - Delay
- `animation-duration(2s)` - Duration

## Display & Visibility

### Display
- `hidden` - display: none
- `block`, `inline`, `inline-block`
- `flex`, `inline-flex` - Display flex
- `flex(1)` - flex: 1 1 0%
- `grid`, `inline-grid` - Display grid

### Visibility
- `visible`, `invisible` - Visibility
- `opacity(0)` to `opacity(100)` - Opacity levels

## Overflow & Scrolling

### Overflow
- `overflow(hidden)`, `overflow(auto)`, `overflow(visible)`, `overflow(scroll)`
- `overflow-x(auto)`, `overflow-y(hidden)` - Directional
- `clip` - Shorthand for overflow(hidden)
- `scroll` - Shorthand for overflow(auto)
- `scroll(x)` - overflow-x: auto
- `scroll(y)` - overflow-y: auto

### Scroll Margin (New)
- `scroll-mt(20)` - Scroll margin top
- `scroll-mb(20)` - Scroll margin bottom
- `scroll-ml(20)` - Scroll margin left
- `scroll-mr(20)` - Scroll margin right
- `scroll-m(20)` - All sides

## Interactivity

### Cursor
- `cursor(pointer)`, `cursor(default)`, `cursor(not-allowed)`
- `cursor(grab)`, `cursor(grabbing)`
- `cursor(wait)`, `cursor(text)`, `cursor(move)`

### Pointer Events
- `pointer-events(none)` - Disable pointer events
- `pointer-events(auto)` - Enable pointer events

### User Select
- `select(none)` - Disable selection
- `select(text)` - Text selection only
- `select(all)` - Select all on click
- `select(auto)` - Default behavior

### Resize
- `resize(none)`, `resize(both)`
- `resize(horizontal)`, `resize(vertical)`

## Pseudo Classes & States

Prefix any utility:
- `hover:bg(blue-500)` - Hover state
- `focus:ring(2/blue-500)` - Focus state
- `active:scale(0.95)` - Active state
- `disabled:opacity(50)` - Disabled state
- `group-hover:opacity(100)` - Group hover
- `peer-checked:bg(green-500)` - Peer states
- `first:mt(0)` - First child
- `last:mb(0)` - Last child
- `odd:bg(gray-50)` - Odd children
- `even:bg(white)` - Even children

## Responsive Design

### Breakpoint Prefixes
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

### Max-width Breakpoints
- `~sm:` - Below 640px
- `~md:` - Below 768px
- `~lg:` - Below 1024px
- `~xl:` - Below 1280px

### Examples
- `hidden md:block` - Hidden on mobile, visible on desktop
- `grid(1) md:grid(2) lg:grid(3)` - Responsive grid
- `font(sm) lg:font(lg)` - Responsive typography

## Special Utilities

### Aspect Ratio
- `size(16:9)` - 16:9 aspect ratio
- `size(1:1)` - Square
- `size(4:3)` - 4:3 ratio

### Object Fit
- `object(cover)`, `object(contain)`
- `object(fill)`, `object(none)`, `object(scale-down)`

### Screen Reader
- `sr-only` - Visually hidden but accessible
- `not-sr-only` - Undo sr-only

## Plugins

### Glass Effect
- `glass()` - Basic glassmorphism
- `glass(20)` - Custom blur amount
- `glass(20/0.2)` - Blur/opacity
- `glass(20/0.2/white)` - Blur/opacity/color

### Glow Effect
- `glow()` - Default glow
- `glow(blue)` - Colored glow
- `glow(20/blue)` - Size/color
- `glow(10/20/blue)` - X/Y/color

### Card Styles
- `card()` - Basic card
- `card(elevated)` - Elevated card
- `card(outlined)` - Outlined card
- `card(interactive)` - Interactive card

## Design Tokens

AdorableCSS v2 includes comprehensive design tokens for:
- **Colors**: Full color palette with 11 shades per color
- **Spacing**: Consistent spacing scale (xs to 3xl)
- **Typography**: Font sizes, line heights, letter spacing
- **Shadows**: Elevation system (sm to 2xl)
- **Radius**: Border radius scale
- **Breakpoints**: Responsive design breakpoints

Access tokens via their names in utilities:
- `bg(blue-500)` - Color token
- `p(lg)` - Spacing token
- `font(2xl)` - Typography token
- `shadow(md)` - Shadow token
- `r(lg)` - Radius token