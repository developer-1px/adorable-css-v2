# AdorableCSS v2

> TailwindCSS의 가독성을 개선한 CSS 유틸리티 프레임워크

[![npm version](https://img.shields.io/npm/v/adorable-css.svg)](https://www.npmjs.com/package/adorable-css)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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
<div class="hbox(center) gap(4) p(6)">
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

## 설치

```bash
npm install adorable-css
```

```typescript
// main.ts
import 'adorable-css'
```

## 기본 사용법

```html
<!-- 레이아웃 -->
<!-- Figma Card Component -->
<div class="vbox(fill) w(fill) p(24) r(12) bg(#fff) shadow(md) gap(16)">
  <img class="w(fill) h(200) r(8) cover" src="...">
  <div class="vbox gap(8)">
    <h3 class="font(Inter/20/28/-1%/600) c(#000)">Card Title</h3>
    <p class="font(14/20) c(#666) clamp(2)">Description text...</p>
  </div>
  <button class="hbox(center) w(fill) h(48) r(8) bg(blue) c(#fff) hover:bg(darkblue) active:scale(.98)">
    Click me
  </button>
</div>

<!-- Figma Auto Layout Examples -->
<nav class="hbox() gap(auto) w(fill) h(64) px(32) bg(#fff) shadow(sm)">
  <div class="hbox gap(32)">...</div>
  <div class="hbox gap(16)">...</div>
</nav>
```

## Tailwind와의 차이

| 항목 | Tailwind | AdorableCSS |
|------|----------|-------------|
| Flexbox | `flex items-center justify-center` | `hbox(center)` |
| 투명도 | `bg-white/50` | `bg(white.5)` |
| Transform | `scale-95` | `scale(0.95)` |
| 간격 | `mt-4 mb-6` | `vbox gap(...)` |

## 문서

- [Overview](docs/5-public/mdx/01-overview.md)
- [문법 가이드](docs/5-public/mdx/11-syntax-guide.md)
- [Tailwind 차이점](docs/5-public/guides/COMMON_MISTAKES_FROM_TAILWIND.md)

## 개발

```bash
# 설치
pnpm install

# 개발
pnpm dev

# 빌드
pnpm build

# 테스트
pnpm test
```

## 라이선스

MIT
