---
title: Getting Started with AdorableCSS
description: Complete guide to getting started with AdorableCSS including installation, configuration, and basic usage
order: 2
category: Getting Started
---

# Getting Started with AdorableCSS

Welcome to AdorableCSS v2! This guide will help you get up and running with our Figma-first CSS framework.

## 설치 방법

AdorableCSS는 다양한 방법으로 설치하고 사용할 수 있습니다.

### NPM/PNPM 패키지 설치

```bash
npm install adorable-css
# 또는
pnpm add adorable-css
```

### CDN 사용

빠른 프로토타이핑을 위해 CDN을 사용할 수 있습니다:

```html
<script src="https://unpkg.com/adorable-css/dist/adorable.min.js"></script>
```

### 프로그래매틱 사용

```typescript
import { parse, getCSSSync, injectGlobal } from 'adorable-css';

// CSS 클래스 파싱
const css = getCSSSync('hbox gap(16) p(24)');

// 브라우저 환경에서 자동 스타일 주입 (개발용)
if (typeof window !== 'undefined') {
  injectGlobal();
}
```

### 빌드 도구 통합 (계획 중)

Vite, PostCSS 등의 빌드 도구와의 통합 플러그인은 현재 개발 중입니다. 커뮤니티 기여를 환영합니다!

## Your First Component

Once installed, you can start using AdorableCSS utilities in your HTML:

```html
<div class="vbox gap(lg) p(xl) bg(white) r(xl) shadow(lg)">
  <h2 class="heading(h2) c(primary)">Hello World</h2>
  <p class="font(md) c(gray-600)">
    Welcome to AdorableCSS! This card uses our utilities to create
    a beautiful, responsive design with minimal code.
  </p>
  <button class="px(lg) py(md) bg(primary) c(white) r(lg) hover:shadow(lg) transition">
    Get Started
  </button>
</div>
```

## Smart Containers

One of our newest features is Smart Containers - a powerful shorthand for creating perfect container elements:

```html
<!-- Traditional approach -->
<div class="w(64) h(64) display(flex) align-items(center) justify-content(center)">
  <img src="avatar.jpg" style="object-fit: cover;" />
</div>

<!-- Smart Container approach -->
<div class="size(64)">
  <img src="avatar.jpg" />
</div>
```

Smart Containers automatically include:
- **Auto-centering**: Built-in flex layout with center alignment
- **Image optimization**: Child images get `object-fit: cover` automatically
- **Content protection**: `overflow: hidden` prevents layout breaks
- **Positioning ready**: `position: relative` for absolute children

## Core Principles

AdorableCSS is built on three core principles:

### 1. Figma-First Design
Every utility maps directly to Figma's mental model. If you know Figma, you already know AdorableCSS.

```html
<!-- Figma: Auto Layout, Vertical, Gap: 16 -->
<div class="vbox gap(lg)">
  <!-- Content here -->
</div>

<!-- Figma: Fill container -->
<div class="w(fill)">Content</div>
```

### 2. Declarative Syntax
Write what you mean. `vbox gap(lg)` is clearer than memorizing flexbox properties.

```html
<!-- Clear intent -->
<div class="hbox(between) gap(md)">
  <span>Label</span>
  <button>Action</button>
</div>
```

### 3. 런타임 없는 순수 CSS
모든 유틸리티는 순수 CSS로 컴파일됩니다. JavaScript 런타임이나 오버헤드 없이 빠른 캐싱 가능한 스타일시트를 생성합니다.

## Next Steps

Now that you have AdorableCSS installed, explore these topics:

- [Syntax Reference](/docs/syntax) - Learn the complete syntax
- [Layout System](/docs/layout) - Master our Figma-inspired layout utilities
- [Design Tokens](/docs/tokens) - Understand our design token system
- [Smart Containers](/docs/smart-containers) - Dive deeper into container utilities
- [Examples](/docs/examples) - See real-world examples

Ready to build something amazing? Let's go! 🚀