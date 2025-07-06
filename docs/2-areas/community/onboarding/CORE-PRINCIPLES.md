# 🎯 AdorableCSS 핵심 원칙

> 모든 AdorableCSS 사용자가 반드시 알아야 하는 기본 원칙들

## 🚫 금지 사항 (절대 하지 마세요)

### 1. **Margin 사용 금지**
```css
/* ❌ 금지된 사용법 */
margin: 20px 0;
margin-top: 16px;
margin-bottom: 24px;
mx(auto)
mb(4xl)
mt(lg)
```

**이유**: 
- margin은 예측 불가능한 레이아웃을 만듭니다
- 컴포넌트 간 결합도를 높입니다  
- Figma에는 margin 개념이 없습니다

**대신 사용하세요**:
```html
<!-- gap 기반 레이아웃 -->
<div class="vbox gap(xl)">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- 중앙 정렬은 부모에서 제어 -->
<div class="hbox(center)">
  <div class="w(400)">Centered content</div>
</div>
```

### 2. **Tailwind 스타일 투명도 금지**
```css
/* ❌ Tailwind 스타일 - 사용 금지 */
bg(white/50)
c(black/80)
bg(purple-500/20)
```

**올바른 AdorableCSS 방식**:
```css
/* ✅ Dot notation 사용 */
bg(white.5)      /* 50% 투명도 */
c(black.8)       /* 80% 투명도 */  
bg(purple-500.2) /* 20% 투명도 */
```

### 3. **백분율 변환 값 사용 금지**
```css
/* ❌ 백분율로 변환하지 마세요 */
scale(105)       /* 105% */
opacity(50)      /* 50% */
rotate(90)       /* 90도가 아님 */
```

**CSS 네이티브 값 사용**:
```css
/* ✅ CSS 사양을 그대로 사용 */
scale(1.05)      /* CSS: scale: 1.05 */
opacity(0.5)     /* CSS: opacity: 0.5 */
rotate(90deg)    /* CSS: rotate: 90deg */
```

---

## ✅ 필수 원칙

### 1. **Figma-First 사고**

AdorableCSS는 Figma의 멘탈 모델을 CSS로 그대로 옮깁니다:

```html
<!-- Figma Auto Layout Vertical → vbox -->
<div class="vbox gap(16)">

<!-- Figma Auto Layout Horizontal → hbox -->  
<div class="hbox gap(16)">

<!-- Figma Fill Container → w(fill) -->
<div class="w(fill)">

<!-- Figma Hug Contents → w(hug) -->
<div class="w(hug)">

<!-- Figma Center Constraint → layer(center) -->
<div class="layer(center)">
```

### 2. **Gap 기반 레이아웃**

모든 간격은 부모 컨테이너의 `gap`으로 제어합니다:

```html
<!-- 세로 간격 -->
<div class="vbox gap(lg)">
  <header>Header</header>
  <main>Main Content</main>
  <footer>Footer</footer>  
</div>

<!-- 가로 간격 -->
<div class="hbox gap(md)">
  <button>Cancel</button>
  <button>Confirm</button>
</div>

<!-- 내부 여백은 padding -->
<div class="p(xl) bg(white) r(lg)">
  Card content with internal spacing
</div>
```

### 3. **CSS 네이티브 값 우선**

CSS 사양의 값을 그대로 사용합니다:

```html
<!-- Transform -->
<div class="scale(1.05) rotate(45deg)">
  
<!-- Filter -->  
<div class="blur(10px) brightness(1.2)">

<!-- Animation -->
<div class="duration(0.3s) ease(ease-out)">

<!-- Opacity -->
<div class="opacity(0.8)">
```

### 4. **컴포넌트 격리**

각 컴포넌트는 자신의 외부 여백에 대해 알지 못합니다:

```html
<!-- ❌ 컴포넌트가 자신의 외부 여백을 관리 -->
<div class="card mb(xl)">

<!-- ✅ 부모가 자식들의 간격을 관리 -->
<div class="vbox gap(xl)">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
</div>
```

---

## 📝 필수 문법 규칙

### **색상 + 투명도**
```css
/* 기본 형태 */
color.opacity

/* 예시 */
white.5      /* white with 50% opacity */
black.1      /* black with 10% opacity */
red.8        /* red with 80% opacity */
purple-500.3 /* purple-500 with 30% opacity */
```

### **크기 지정**
```css
/* 고정 크기 */
w(200)       /* width: 200px */
h(300)       /* height: 300px */

/* Figma 스타일 */
w(fill)      /* width: 100% */
w(hug)       /* width: fit-content */

/* 범위 크기 */
w(200..400)  /* min-width: 200px, max-width: 400px */
```

### **간격 지정**
```css
/* 내부 여백 */
p(lg)        /* padding: 16px */
px(xl)       /* padding-left/right: 20px */  
py(md)       /* padding-top/bottom: 12px */

/* 요소 간 간격 */
gap(lg)      /* gap: 16px */
gap(xl)      /* gap: 20px */
```

### **레이아웃**
```css
/* Flexbox */
vbox         /* flex-direction: column */
hbox         /* flex-direction: row */
vbox(center) /* align-items: center */
hbox(pack)   /* justify-content: space-between */

/* Position */
layer(center)        /* absolute center */
layer(top:20/left:30) /* top: 20px, left: 30px */
layer(fill)          /* top:0, right:0, bottom:0, left:0 */
```

---

## 🎯 실전 적용 가이드

### **버튼 컴포넌트**
```html
<button class="
  px(lg) py(sm)
  bg(blue.9) c(white) 
  r(md) font(sm) 600
  hover:bg(blue.8) hover:scale(1.02)
  active:scale(0.98)
  transition
">
  Click me
</button>
```

### **카드 레이아웃**
```html
<div class="
  vbox gap(md) p(xl)
  bg(white) r(lg) shadow(md)
  border(1/gray.2)
">
  <h3 class="font(lg) 600 c(gray.9)">Card Title</h3>
  <p class="c(gray.7) leading(relaxed)">
    Card description text goes here
  </p>
  <div class="hbox gap(sm)">
    <button class="btn-primary">Action</button>
    <button class="btn-secondary">Cancel</button>
  </div>
</div>
```

### **네비게이션**
```html
<nav class="
  hbox(pack) px(lg) py(md)
  bg(white.95) backdrop-blur(md)
  border-b(1/gray.2)
">
  <div class="hbox(center) gap(sm)">
    <img class="w(24) h(24)" src="logo.svg">
    <span class="font(lg) 600">Brand</span>
  </div>
  
  <div class="hbox gap(md)">
    <a class="nav-link">Home</a>
    <a class="nav-link">About</a>
    <a class="nav-link">Contact</a>
  </div>
</nav>
```

---

## 🧠 암기해야 할 핵심

### **절대 금지**
1. `margin` 사용
2. `/` 투명도 표기  
3. 백분율 변환 값
4. Tailwind 스타일 클래스명

### **반드시 사용**
1. `gap` 기반 간격
2. `.` 투명도 표기
3. CSS 네이티브 값
4. Figma 용어 (vbox, hbox, fill, hug)

### **핵심 문법**
- `vbox gap(lg)` - 세로 배치 + 간격
- `hbox(center)` - 가로 배치 + 중앙 정렬
- `w(fill)` - 너비 채우기
- `bg(white.5)` - 반투명 배경
- `scale(1.05)` - CSS 네이티브 변환

---

**💡 기억하세요**: AdorableCSS는 "CSS the way you think in Figma"입니다. Tailwind의 습관을 버리고 Figma의 사고방식을 채택하세요!