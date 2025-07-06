# 🤖 Claude를 위한 AdorableCSS 온보딩 가이드

> Claude Code와 같은 AI 도구들이 AdorableCSS를 올바르게 사용하기 위한 필수 가이드

## 🎯 핵심 메시지

**AdorableCSS는 Tailwind가 아닙니다!** 비슷해 보이지만 완전히 다른 철학과 문법을 가지고 있습니다.

---

## 🚫 절대 하지 말아야 할 것들

### 1. **Margin 사용 금지**
```html
<!-- ❌ 절대 하지 마세요 -->
<div class="mb(4xl) mt(lg) mx(auto)">

<!-- ✅ 올바른 방법 -->
<div class="vbox gap(4xl)">
  <div class="center">Content</div>
</div>
```

**이유**: AdorableCSS는 gap 기반 레이아웃을 사용합니다. margin은 예측 불가능한 레이아웃을 만들고 AdorableCSS 철학에 어긋납니다.

### 2. **Tailwind 스타일 투명도 금지**
```html
<!-- ❌ Tailwind 스타일 - 사용하지 마세요 -->
<div class="bg(white/50) c(black/80)">

<!-- ✅ AdorableCSS 스타일 -->
<div class="bg(white.5) c(black.8)">
```

**이유**: AdorableCSS는 dot notation을 사용합니다. `/` 대신 `.`을 사용해야 합니다.

### 3. **잘못된 scale 값**
```html
<!-- ❌ 백분율 스타일 -->
<div class="scale(95) opacity(50)">

<!-- ✅ CSS 네이티브 값 -->
<div class="scale(0.95) opacity(0.5)">
```

**이유**: AdorableCSS는 CSS 네이티브 값을 그대로 사용합니다.

---

## ✅ AdorableCSS 핵심 원칙

### 1. **Figma-First 사고**
```html
<!-- Figma의 "Auto Layout Vertical" -->
<div class="vbox gap(16)">

<!-- Figma의 "Auto Layout Horizontal" -->
<div class="hbox gap(16)">

<!-- Figma의 "Fill Container" -->
<div class="w(fill) h(fill)">

<!-- Figma의 "Hug Contents" -->
<div class="w(hug) h(hug)">
```

### 2. **Gap 기반 레이아웃**
```html
<!-- 자식 요소들 사이의 간격은 부모가 제어 -->
<div class="vbox gap(lg)">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- 내부 여백은 padding 사용 -->
<div class="p(xl) bg(white)">
  Content with internal spacing
</div>
```

### 3. **CSS 네이티브 값 사용**
```html
<!-- 변환(Transform) -->
<div class="scale(1.05) rotate(45deg)">

<!-- 필터 -->
<div class="blur(10px) brightness(1.2)">

<!-- 투명도 -->
<div class="opacity(0.8)">

<!-- 애니메이션 -->
<div class="duration(0.3s)">
```

---

## 📚 필수 암기 문법

### **색상 + 투명도**
```html
<!-- 기본 색상 -->
<div class="c(white) bg(black)">

<!-- 투명도 적용 (dot notation) -->
<div class="c(white.8) bg(black.1)">

<!-- 색상 토큰 + 투명도 -->
<div class="c(purple-500.9) bg(gray-100.5)">
```

### **레이아웃 시스템**
```html
<!-- 세로 배치 -->
<div class="vbox gap(md)">

<!-- 가로 배치 -->
<div class="hbox gap(lg)">

<!-- 중앙 정렬 -->
<div class="vbox(center) hbox(center)">

<!-- 공간 분배 -->
<div class="hbox(pack)"> <!-- justify-content: space-between -->
```

### **크기 시스템**
```html
<!-- Figma 스타일 크기 -->
<div class="w(fill)">   <!-- width: 100% -->
<div class="w(hug)">    <!-- width: fit-content -->
<div class="w(200)">    <!-- width: 200px -->

<!-- 범위 크기 -->
<div class="w(200..400)"> <!-- min-width: 200px, max-width: 400px -->
```

### **포지셔닝**
```html
<!-- Figma 제약 조건 스타일 -->
<div class="layer(center)">        <!-- 완전 중앙 -->
<div class="layer(top:20/left:30)"> <!-- top: 20px, left: 30px -->
<div class="layer(fill)">          <!-- top:0, right:0, bottom:0, left:0 -->
```

---

## 🎯 실제 사용 예제

### **Card 컴포넌트**
```html
<!-- ✅ AdorableCSS 스타일 -->
<div class="
  vbox gap(md) p(xl) 
  bg(white) r(lg) shadow(md)
  hover:scale(1.02) transition
">
  <h3 class="font(lg) 600">Card Title</h3>
  <p class="c(gray.7)">Card description text</p>
  <button class="
    px(lg) py(sm) 
    bg(blue.9) c(white) r(md)
    hover:bg(blue.8)
  ">
    Action
  </button>
</div>
```

### **네비게이션 바**
```html
<!-- ✅ AdorableCSS 스타일 -->
<nav class="
  hbox(pack) p(md/lg) 
  bg(white.95) backdrop-blur(md)
  border-b(1/gray.2)
">
  <div class="hbox(center) gap(sm)">
    <img class="w(32) h(32)" src="logo.svg">
    <span class="font(lg) 600">Brand</span>
  </div>
  
  <div class="hbox gap(md)">
    <a class="px(md) py(sm) hover:bg(gray.1) r(sm)">Home</a>
    <a class="px(md) py(sm) hover:bg(gray.1) r(sm)">About</a>
    <a class="px(md) py(sm) hover:bg(gray.1) r(sm)">Contact</a>
  </div>
</nav>
```

---

## 🔍 자주 하는 실수와 해결법

### **실수 1: Tailwind 문법 사용**
```html
<!-- ❌ Tailwind 스타일 -->
<div class="flex flex-col gap-4 p-6 bg-white/50">

<!-- ✅ AdorableCSS 스타일 -->
<div class="vbox gap(lg) p(xl) bg(white.5)">
```

### **실수 2: Margin 사용**
```html
<!-- ❌ Margin 사용 -->
<div class="mb(xl)">
  <h2 class="mt(lg)">Title</h2>
</div>

<!-- ✅ Gap 사용 -->
<div class="vbox gap(xl)">
  <h2>Title</h2>
</div>
```

### **실수 3: 잘못된 투명도 표기**
```html
<!-- ❌ 슬래시 사용 -->
<div class="bg(black/20) c(white/80)">

<!-- ✅ 점 사용 -->
<div class="bg(black.2) c(white.8)">
```

### **실수 4: 백분율/정수 변환 값 사용**
```html
<!-- ❌ 백분율로 변환 -->
<div class="scale(105) opacity(80)">

<!-- ✅ CSS 네이티브 값 -->
<div class="scale(1.05) opacity(0.8)">
```

---

## 🧠 기억해야 할 핵심 원칙

1. **"Write CSS the way you think in Figma"**
2. **No Margin Rule** - gap과 padding만 사용
3. **Dot notation for opacity** - `.5` not `/50`
4. **CSS Native Values** - `0.95` not `95`
5. **Figma-first naming** - `vbox`, `hbox`, `w(fill)`, `w(hug)`

---

## 📋 체크리스트

코드를 작성할 때 다음을 확인하세요:

- [ ] margin 사용하지 않았는가?
- [ ] 투명도에 dot notation(`.5`) 사용했는가?
- [ ] CSS 네이티브 값(`0.95`, `0.3s`) 사용했는가?
- [ ] Figma 용어(`vbox`, `hbox`, `fill`, `hug`) 사용했는가?
- [ ] gap 기반 레이아웃을 사용했는가?

---

**🎯 목표**: Claude가 AdorableCSS 코드를 작성할 때 Tailwind와 혼동하지 않고, AdorableCSS만의 고유한 철학과 문법을 정확히 사용하도록 하는 것입니다.