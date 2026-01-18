# AdorableCSS v2

> TailwindCSS의 가독성을 개선한 CSS 유틸리티 프레임워크

[![npm version](https://img.shields.io/npm/v/adorable-css.svg)](https://www.npmjs.com/package/adorable-css)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

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
<div class="vbox gap(16)">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- 카드 -->
<div class="vbox p(24) r(12) bg(white) shadow(md)">
  <h3 class="font(lg) 600">Title</h3>
  <p class="c(gray-600)">Description</p>
</div>

<!-- 버튼 -->
<button class="
  px(lg) py(sm)
  bg(blue) c(white) r(md)
  hover:bg(blue-600)
">
  Click me
</button>
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
