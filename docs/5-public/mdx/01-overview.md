# AdorableCSS v2

> TailwindCSS의 가독성을 개선한 CSS 유틸리티 프레임워크

## 배경

TailwindCSS가 나왔을 때 유틸리티 CSS의 생산성은 좋았지만, 문법의 가독성이 떨어진다고 생각했습니다.
우리는 개발자가 코드를 읽을 때 더 직관적이고 아름다운 경험을 하기를 바랍니다.
이 프로젝트가 CSS 속성을 더 쉽고 즐겁게 이해하는 영감이 되었으면 합니다.

## 주요 특징

### 1. 더 읽기 쉬운 문법

```html
<!-- Tailwind -->
<div class="flex items-center justify-center gap-4 p-6">

<!-- AdorableCSS -->
<div class="hbox(pack) gap(4) p(6)">
```

### 2. CSS 네이티브 값

```css
scale(1.05)      /* transform: scale(1.05) */
opacity(0.5)     /* opacity: 0.5 */
rotate(45deg)    /* transform: rotate(45deg) */
```

### 3. Dot Notation (투명도)

```css
/* Tailwind */
bg-white/50

/* AdorableCSS */
bg(white.5)
```

## 상태 (Status)
이 프로젝트는 **아카이브** 되었습니다. 새로운 기능 개발은 중단되었으며, 사내 프로젝트 및 교육 목적으로만 유지됩니다.
자세한 내용은 [이별 편지](/docs)를 참고해주세요.

## 기본 사용법

```html
<!-- 레이아웃 -->
<!-- Figma Card Component -->
<div class="vbox(fill) w(fill) p(24) r(12) bg(#fff) shadow(md) gap(16)">
  <img class="w(fill) h(200) r(8) cover" src="...">
  <div class="vbox gap(8)">
    <h3 class="font(Inter) font(20/28/-1%/600) c(#000)">Card Title</h3>
    <p class="font(14/20) c(#666) clamp(2)">Description text...</p>
  </div>
  <button class="hbox(pack) w(fill) h(48) r(8) bg(blue) c(#fff) hover:bg(darkblue) active:scale(.98)">
    Click me
  </button>
</div>

<!-- Figma Auto Layout Examples -->
<nav class="hbox gap(auto) w(fill) h(64) px(32) bg(#fff) shadow(sm)">
  <div class="hbox gap(32)">...</div>
  <div class="hbox gap(16)">...</div>
</nav>
```

## Tailwind와의 차이

| 항목 | Tailwind | AdorableCSS |
|------|----------|-------------|
| Flexbox | `flex items-center justify-center` | `hbox(pack)` |
| 투명도 | `bg-white/50` | `bg(white.5)` |
| Transform | `scale-95` | `scale(0.95)` |
| 간격 | `mt-4 mb-6` | `vbox gap(...)` |
