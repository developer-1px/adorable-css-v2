# 문법 가이드

AdorableCSS의 완전한 문법 체계와 사용법을 안내합니다.

## 기본 개념

AdorableCSS는 **인간의 사고방식**에 맞춰 설계된 CSS 프레임워크입니다. 디자인을 머릿속에서 생각하는 방식 그대로 코드로 표현할 수 있습니다.

```html
<div class="p(16) bg(blue-500) c(white)">
  안녕하세요!
</div>
```

위 예제에서:
- `p(16)` → `padding: 16px`
- `bg(blue-500)` → `background-color: var(--blue-500)`
- `c(white)` → `color: white`

## 문법 구조

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

/* 폰트 스타일 */
bold      → font-weight: 700
italic    → font-style: italic
underline → text-decoration: underline
```

### 3. 다중 값 문법

#### 슬래시(`/`) 구분자
순서가 있는 값들을 구분할 때 사용합니다:

```css
/* 패딩 - 상/우/하/좌 */
p(10/20/30/40)    → padding: 10px 20px 30px 40px

/* 폰트 - 크기/줄높이/자간 */
font(16/1.5/-2%)  → font-size: 16px; line-height: 1.5; letter-spacing: -0.02em

/* 테두리 - 너비/색상 */
border(2/blue-500) → border: 2px solid var(--blue-500)
```

#### 쉼표(`,`) 구분자
독립적인 값들을 구분할 때 사용합니다:

```css
/* 좌표 - x,y */
(center,top)      → 가로 중앙, 상단
(100%-20,50%+10)  → 계산식 포지셔닝

/* 레이어 - 여러 위치 */
layer(top:20,left:30) → top: 20px; left: 30px
```

### 4. 특수 문법

#### 색상과 투명도: `색상.투명도`
```css
bg(black.5)       → background-color: rgba(0, 0, 0, 0.5)
c(white.8)        → color: rgba(255, 255, 255, 0.8)
border(gray-200.3) → border-color: rgba(var(--gray-200), 0.3)
```

#### 그라디언트: `방향/색상1..색상2`
```css
/* 배경 그라디언트 */
bg(45deg/purple-500..pink-500)   → linear-gradient(45deg, ...)
bg(to-tr/blue-500..green-500)    → to top right
bg(radial/white..transparent)     → radial-gradient

/* 텍스트 그라디언트 */
c(90deg/red..blue..green)        → 다중 색상
```

#### 범위: `최소..최대`
```css
w(100..500)       → min-width: 100px; max-width: 500px
h(50..200)        → min-height: 50px; max-height: 200px
w(100..80%..500)  → 최소..선호..최대 (clamp)
```

#### 표현식: 계산
```css
w(100%-20)        → width: calc(100% - 20px)
top(50%+10)       → top: calc(50% + 10px)
left(100vw-40)    → left: calc(100vw - 40px)
```

## 토큰 시스템

### 디자인 토큰 사용
```css
/* 간격 토큰 */
p(sm)     → padding: var(--spacing-sm)    /* 8px */
gap(lg)   → gap: var(--spacing-lg)        /* 24px */

/* 색상 토큰 */
c(primary)   → color: var(--primary)
bg(accent)   → background: var(--accent)

/* 크기 토큰 */
text(xl)     → font-size: var(--font-xl)
shadow(md)   → box-shadow: var(--shadow-md)
```

## 상태 관리

### 의사 클래스: `상태:속성(값)`
```css
hover:bg(blue-600)       → :hover { background-color: ... }
focus:ring(2)            → :focus { box-shadow: ring }
active:scale(0.98)       → :active { transform: scale(0.98) }
disabled:opacity(0.5)    → :disabled { opacity: 0.5 }
```

### 그룹 상태
```css
/* 부모에 group 클래스 추가 */
<div class="group">
  <p class="group-hover:visible">부모 호버시 표시</p>
</div>
```

### 중첩 상태: `상태1:상태2:속성(값)`
```css
hover:focus:bg(blue-700)  → 호버와 포커스 동시에
md:hover:scale(1.05)      → 중간 화면 이상에서 호버시
```

## 반응형 디자인

### 브레이크포인트: `크기:속성(값)`
```css
/* 최소 너비 (min-width) */
sm:w(full)    → @media (min-width: 640px)
md:grid(2)    → @media (min-width: 768px)
lg:hidden     → @media (min-width: 1024px)

/* 최대 너비 (max-width) */
..md:block    → @media (max-width: 767px)
..sm:vbox     → @media (max-width: 639px)
```

### 사용 가능한 브레이크포인트
- `sm` - 640px
- `md` - 768px  
- `lg` - 1024px
- `xl` - 1280px
- `2xl` - 1536px

## 조합과 우선순위

### 여러 속성 조합: `+`
```css
hover:bg(blue-600)+scale(1.05)  → 호버시 배경과 크기 변경
md:p(lg)+gap(xl)                → 중간 화면에서 패딩과 갭
```

### 우선순위: `!`
```css
p(20)!          → 한 단계 높은 우선순위
bg(red)!!       → 두 단계 높은 우선순위  
c(white)!!!     → 세 단계 높은 우선순위 (!important)
```

## 실전 예제

### 버튼 스타일링
```html
<button class="
  px(20) py(12)
  bg(blue-500) c(white)
  r(lg) font(medium)
  hover:bg(blue-600) hover:shadow(lg)
  active:scale(0.98)
  transition
">
  클릭하세요
</button>
```

### 반응형 카드
```html
<div class="
  w(full) md:w(320)
  p(16) md:p(24)
  bg(white) shadow(md)
  hover:shadow(xl)
  transition
">
  <h3 class="font(lg) bold mb(12)">카드 제목</h3>
  <p class="c(gray-600)">카드 내용...</p>
</div>
```

### 그라디언트 텍스트
```html
<h1 class="
  c(45deg/purple-500..pink-500)
  font(4xl) bold
  text(center)
">
  그라디언트 제목
</h1>
```

## 파서가 인식하는 토큰

AdorableCSS 파서는 다음과 같은 토큰들을 인식합니다:

```
(hexcolor)      #3B82F6, #000 같은 16진수 색상
(color-opacity) white.8, blue-500.5 같은 색상+투명도
(dimension)     20, 50%, 100vh 같은 크기값
(dimension-pair) 64x64, 320x200 같은 크기 쌍
(string)        'text' 또는 "text" 형태의 문자열
(range)         .. 범위 연산자
(gradient)      색상1..색상2 그라디언트
(ident)         속성명, 키워드
```

## 디버깅 팁

1. **브라우저 개발자 도구**: 생성된 클래스명이 그대로 표시됩니다
2. **자동완성**: VSCode 플러그인 사용시 자동완성 지원
3. **타입 안전성**: TypeScript 환경에서 타입 체크 가능

## 마무리

AdorableCSS의 문법은 직관적이고 일관성이 있습니다. Figma에서 디자인하는 것처럼 자연스럽게 CSS를 작성할 수 있으며, 복잡한 스타일도 간단하게 표현할 수 있습니다.