# AdorableCSS

> TailwindCSS의 가독성을 개선한 CSS 유틸리티 프레임워크

## 배경

TailwindCSS가 나왔을 때 유틸리티 CSS의 생산성은 좋았지만, 문법의 가독성이 떨어진다고 생각했습니다.
AI 시대가 오면서 TailwindCSS가 사실상 표준이 되어 이 프로젝트의 의미는 퇴색되었지만,
그래도 CSS 속성을 더 쉽게 이해하는 데 도움이 되었으면 합니다.

## 주요 특징

### 1. 더 읽기 쉬운 문법

```html
<!-- Tailwind -->
<div class="flex items-center justify-center gap-4 p-6">

<!-- AdorableCSS -->
<div class="hbox(center) gap(4) p(6)">
```

### 2. CSS 네이티브 값 사용

```css
/* CSS 표준 값 그대로 사용 */
scale(1.05)      /* transform: scale(1.05) */
opacity(0.5)     /* opacity: 0.5 */
rotate(45deg)    /* transform: rotate(45deg) */
```

### 3. 간단한 문법

```html
<!-- 레이아웃 -->
<div class="vbox gap(16)">          <!-- 세로 배치 + 16px 간격 -->
<div class="hbox(pack)">            <!-- 가로 배치 + space-between -->

<!-- 크기 -->
<div class="w(320) h(240)">         <!-- width: 320px, height: 240px -->

<!-- 색상 -->
<div class="bg(blue) c(white)">     <!-- background: blue, color: white -->

<!-- 투명도 (dot notation) -->
<div class="bg(black.5)">           <!-- background: rgba(0,0,0,0.5) -->
```

## 설치

```bash
npm install adorable-css
```

```typescript
// main.ts
import 'adorable-css'
```

## 기본 사용법

### Flexbox 레이아웃

```html
<!-- 세로 정렬 -->
<div class="vbox gap(md)">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- 가로 정렬 -->
<div class="hbox(center) gap(lg)">
  <button>Cancel</button>
  <button>OK</button>
</div>
```

### 반응형

```html
<div class="
  vbox
  md:hbox
  gap(sm)
  md:gap(lg)
">
  <!-- 모바일: 세로, 데스크탑: 가로 -->
</div>
```

### 상태

```html
<button class="
  bg(blue) c(white)
  hover:bg(blue-600)
  active:scale(0.95)
">
  Click me
</button>
```

## Tailwind와의 차이

| Tailwind | AdorableCSS | 설명 |
|----------|-------------|------|
| `flex items-center justify-center` | `hbox(center)` | 더 간결함 |
| `bg-white/50` | `bg(white.5)` | Dot notation |
| `scale-95` | `scale(0.95)` | CSS 표준 값 |
| `mt-4 mb-6` | `vbox gap(...)` | margin 대신 gap |

## 다음 단계

- [문법 가이드](/docs/syntax-guide) - 전체 문법 참조
- [Tailwind 차이점](/docs/common-mistakes-tailwind) - Tailwind 사용자를 위한 가이드
- [Cheat Sheet](/docs/cheat-sheet) - 빠른 참조
