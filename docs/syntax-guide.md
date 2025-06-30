# AdorableCSS 문법 가이드

> "코드는 사람이 읽기 위해 작성되고, 컴퓨터가 실행하는 것은 부수적이다" - Donald Knuth

AdorableCSS는 **인간의 사고방식**에 맞춰 설계된 CSS 프레임워크입니다. 우리가 디자인을 머릿속에서 생각하는 방식 그대로 코드로 표현할 수 있도록 만들었습니다.

## 📌 기본 개념

AdorableCSS는 클래스 이름을 통해 스타일을 적용합니다. 각 클래스는 하나의 CSS 속성을 담당하며, 함수형 문법을 사용해 값을 전달합니다.

```html
<div class="p(16) bg(blue-500) c(white)">
  안녕하세요!
</div>
```

위 예제에서:
- `p(16)` → `padding: 16px`
- `bg(blue-500)` → `background-color: var(--blue-500)`
- `c(white)` → `color: white`

## 🎯 문법 구조

### 1. 기본 문법: `속성(값)`

가장 기본적인 형태는 **속성 이름**과 **괄호 안의 값**으로 구성됩니다.

```css
/* 패딩 */
p(20)     → padding: 20px
px(20)    → padding-left: 20px; padding-right: 20px
py(20)    → padding-top: 20px; padding-bottom: 20px

/* 마진 */
m(20)     → margin: 20px
mx(auto)  → margin-left: auto; margin-right: auto

/* 너비/높이 */
w(100)    → width: 100px
h(50)     → height: 50px
w(full)   → width: 100%
```

### 2. 키워드 문법: `속성`

일부 속성은 괄호 없이 키워드만으로도 사용할 수 있습니다.

```css
/* 포지션 */
relative  → position: relative
absolute  → position: absolute
fixed     → position: fixed

/* 디스플레이 */
block     → display: block
flex      → display: flex
grid      → display: grid
hidden    → display: none
```

### 3. 다중 값 문법: `속성(값1/값2/값3)`

여러 값을 슬래시(`/`)로 구분하여 전달할 수 있습니다.

```css
/* 패딩 - 상/우/하/좌 */
p(10/20/30/40)    → padding: 10px 20px 30px 40px

/* 마진 - 상하/좌우 */
m(20/40)          → margin: 20px 40px

/* 테두리 - 너비/색상/스타일 */
b(2/red/dashed)   → border: 2px dashed red
```

### 4. 특수 문법

#### 색상과 투명도: `색상.투명도`
```css
bg(black.5)       → background-color: rgba(0, 0, 0, 0.5)
c(white.8)        → color: rgba(255, 255, 255, 0.8)
border(gray-200.3) → border-color: rgba(var(--gray-200), 0.3)
```

#### 그라데이션: `방향/색상1..색상2`
```css
bg(45deg/purple-500..pink-500)   → linear-gradient(45deg, purple, pink)
bg(to-tr/blue-500..green-500)    → linear-gradient(to top right, blue, green)
c(90deg/red..blue)               → 텍스트 그라데이션
```

## 🎨 상태 및 반응형

### 1. 호버/포커스 상태: `상태:속성(값)`

상태 선택자를 콜론(`:`)으로 앞에 붙입니다.

```css
hover:bg(blue-600)    → :hover { background-color: blue }
focus:ring(2)         → :focus { box-shadow: ring }
active:scale(0.95)    → :active { transform: scale(0.95) }
disabled:opacity(50)  → :disabled { opacity: 0.5 }
```

### 2. 반응형 디자인: `크기:속성(값)`

반응형 브레이크포인트를 콜론(`:`)으로 앞에 붙입니다.

```css
md:w(50)      → @media (min-width: 768px) { width: 50px }
lg:grid(3)    → @media (min-width: 1024px) { grid-template-columns: repeat(3, 1fr) }
~md:hidden    → @media (max-width: 768px) { display: none }
```

브레이크포인트:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### 3. 중요도 표시: `속성(값)!`

느낌표(`!`)를 추가하여 CSS 우선순위를 높일 수 있습니다.

```css
p(16)!      → [class].p\(16\)\! { padding: 16px }
p(16)!!     → [class][class].p\(16\)\!\! { padding: 16px }
p(16)!!!    → [class][class][class].p\(16\)\!\!\! { padding: 16px }
```

## 📐 고급 문법

### 1. 좌표 포지션: `(x,y)`

요소의 위치를 직관적으로 지정할 수 있습니다.

```css
absolute (center,center)     → 중앙 정렬
fixed (right-20,top-20)      → 우측 상단에서 20px 떨어진 위치
absolute (50%-40,top)        → 중앙에서 왼쪽으로 40px
```

### 2. 크기 지정: `size(값)`

다양한 방식으로 크기를 지정할 수 있습니다.

```css
size(64)          → width: 64px; height: 64px (정사각형)
size(16:9)        → 16:9 비율 유지
size(320x200)     → width: 320px; height: 200px
size(sm)          → 토큰 기반 크기
```

### 3. 레이어 포지션: `layer(위치)`

복잡한 절대 위치를 간단하게 표현합니다.

```css
layer(center)           → 중앙 정렬
layer(top:20+left:30)   → top: 20px; left: 30px
layer(fill/20)          → 전체 채우기 + 20px 여백
```

## 🔧 특수 기능

### 1. Figma 스타일 레이아웃

Figma의 Auto Layout과 동일한 개념을 사용합니다.

```css
hbox()        → display: flex; flex-direction: row
vbox()        → display: flex; flex-direction: column
w(fill)       → flex: 1 (남은 공간 채우기)
w(hug)        → width: fit-content (내용에 맞춤)
gap(16)       → gap: 16px
```

### 2. 컨테이너 쿼리

반응형 컨테이너를 위한 특수 문법:

```css
@container:w(full)    → 컨테이너 쿼리 기반 너비
@sm:p(20)            → 작은 컨테이너에서 패딩 적용
```

## 💡 팁과 모범 사례

### 1. 짧은 별칭 활용
```css
/* 긴 형태 대신 짧은 별칭 사용 */
padding(20)    → p(20)
margin(20)     → m(20)
background()   → bg()
```

### 2. 의미있는 조합
```css
/* 버튼 스타일 */
class="px(16) py(8) bg(blue-500) c(white) r(8) hover:bg(blue-600) cursor(pointer)"

/* 카드 스타일 */
class="p(20) bg(white) shadow(md) r(12) border(1/gray-200)"
```

### 3. 상태와 반응형 조합
```css
/* 모바일에서는 숨기고, 데스크탑에서 호버 효과 */
class="hidden md:block md:hover:scale(105)"
```

## 🚀 실전 예제

### 버튼 컴포넌트
```html
<button class="
  px(20) py(10)
  bg(blue-500) c(white)
  r(8)
  font(medium)
  hover:bg(blue-600)
  active:scale(95)
  transition(all/200ms)
  cursor(pointer)
">
  클릭하세요
</button>
```

### 반응형 카드
```html
<div class="
  p(16) md:p(24)
  bg(white) 
  shadow(sm) hover:shadow(lg)
  r(12)
  transition(shadow/300ms)
  w(full) md:w(320)
">
  <h3 class="text(xl) bold c(gray-900) mb(8)">제목</h3>
  <p class="text(sm) c(gray-600) leading(relaxed)">
    내용이 들어갑니다...
  </p>
</div>
```

### 중앙 정렬 모달
```html
<div class="
  fixed (center,center)
  w(90%) max-w(500)
  p(32)
  bg(white)
  shadow(2xl)
  r(16)
  z(1000)
">
  모달 내용
</div>
```

## 🎓 다음 단계

이제 AdorableCSS의 기본 문법을 이해하셨습니다! 더 자세한 내용은 다음 문서를 참고하세요:

- [색상 시스템](./color-system.md) - OKLCH 기반 색상 체계
- [레이아웃 시스템](./layout-system.md) - Flexbox와 Grid
- [애니메이션](./animations.md) - 트랜지션과 키프레임
- [컴포넌트 패턴](./components.md) - 재사용 가능한 스타일 패턴