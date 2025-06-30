# AdorableCSS v2

> 🚀 The Next Evolution of Utility-First CSS Framework
> 
> **Built with [Claude Code](https://claude.ai/code)** 🤖

[![npm version](https://img.shields.io/npm/v/adorable-css.svg)](https://www.npmjs.com/package/adorable-css)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 왜 v2를 만들었나요?

AdorableCSS v1이 혁신적인 함수형 문법과 직관적인 API로 많은 사랑을 받았지만, 1년간의 실제 사용 경험을 통해 더 나은 프레임워크를 만들 수 있다는 확신을 얻었습니다.

### v1의 한계
- 복잡한 상태 관리와 우선순위 시스템
- 제한적인 컴포넌트 지원
- 일관성 없는 색상 시스템
- 확장성의 한계

### v2의 혁신
- 🎨 **6-Role Typography System** - 목적에 맞는 타이포그래피 체계
- 🌈 **OKLCH Color System** - 지각적으로 균일한 색상 공간
- 🧩 **Component-First Architecture** - 재사용 가능한 컴포넌트 시스템
- ⚡️ **Enhanced Parser** - 더 강력하고 유연한 파서
- 🎯 **Figma Integration** - 디자인 도구와의 완벽한 연동

## ✨ What's New in v2

### 1. **Typography Revolution**
```html
<!-- v1: 단순한 유틸리티 -->
<h1 class="font(32) bold">Title</h1>

<!-- v2: 역할 기반 타이포그래피 -->
<h1 class="display(hero) gradient">Hero Title</h1>
<h2 class="heading(h2)">Section Title</h2>
<h3 class="title(card)">Card Title</h3>
<p class="body(prose)">Long readable content...</p>
<label class="label(input) required">Email</label>
<span class="caption(form) error">Invalid email</span>
```

### 2. **OKLCH Color System**
```css
/* v1: 기본 색상 */
c(blue) bg(red/50%)

/* v2: OKLCH 기반 정확한 색상 */
c(blue-500) bg(purple-500.8)
bg(135deg/purple-500..pink-500)
c(oklch(70%_0.25_270))
```

### 3. **Component System**
```html
<!-- v2: 내장 컴포넌트 -->
<button class="btn(lg/primary)">Click me</button>
<div class="card(elevated) hover:glow">
  <h3 class="card-title">Product</h3>
</div>
<span class="badge(sm/success)">NEW</span>
```

### 4. **Enhanced Layout System**
```css
/* Figma-inspired layout */
hbox(center) vbox(between)
layer(center) layer(top:20+left:30)
size(16:9) size(320x200)

/* New position syntax */
absolute(center,center)
fixed(right-20,top-20)
```

### 5. **Smart Value System**
```css
/* Mathematical expressions */
w(100%-20) h(100vh-header)
p(xs+4) m(lg*2)

/* Fluid typography */
font(sm..lg) font(1rem..2rem)

/* Container queries */
@container:w(full) @sm:p(20)
```

### 6. **CSS Priority Architecture**
```css
/* Importance levels */
p(20)!   /* [class] selector */
p(20)!!  /* [class][class] selector */
p(20)!!! /* [class][class][class] selector */
```

## Core Philosophy

AdorableCSS v2 is built on a simple principle: **Your CSS should match your design tool's mental model**. 

```css
/* Traditional CSS */
.card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* AdorableCSS - Think like Figma */
<div class="vbox gap(16) p(24) w(fill) bg(purple-500..pink-500/135deg)">
```

## 🚀 Quick Start

```bash
# Install
npm install adorable-css@next

# Or use CDN
<script src="https://unpkg.com/adorable-css@next"></script>
```

```html
<!-- Modern Component Example -->
<div class="vbox gap(xl) p(2xl) bg(white) r(2xl) shadow(xl)">
  <h2 class="display(sm) gradient">Welcome to v2</h2>
  <p class="body(lg) c(gray-700) max-w(prose)">
    Experience the next generation of utility-first CSS
  </p>
  <button class="btn(lg/primary) hover:scale(105) active:scale(95)">
    Get Started →
  </button>
</div>
```

## 📚 Core Concepts

### Design Principles
1. **Predictability** - 예측 가능한 문법
2. **Composability** - 자유로운 조합
3. **Performance** - 최적화된 번들
4. **Developer Experience** - 뛰어난 개발 경험

### Architecture
```
adorable-css-v2/
├── packages/
│   ├── adorable-css/          # Core framework
│   ├── adorable-css-cdn/      # Browser distribution
│   └── homepage-kit/          # Documentation site
├── docs/                      # Documentation
└── examples/                  # Example projects
```

## 🤝 Built with Claude Code

이 프로젝트는 [Claude Code](https://claude.ai/code)와 함께 개발되었습니다. AI와 인간이 협업하여 만든 차세대 CSS 프레임워크입니다.

### Development Process
- 📝 요구사항 정의와 설계 논의
- 🤖 Claude Code의 구현 제안
- 👨‍💻 개발자의 피드백과 개선
- 🔄 반복적인 개선 과정
- ✅ 실시간 테스트와 검증

## 🛠️ Migration from v1

```javascript
// v1 → v2 Migration Guide
const migrations = {
  // Typography
  'font(32) bold': 'heading(h1)',
  'text(16)': 'body(base)',
  
  // Colors
  'c(blue)': 'c(blue-500)',
  'bg(red/50%)': 'bg(red-500.5)',
  
  // Layout
  'flex': 'hbox()',
  'flex-col': 'vbox()',
}
```

자세한 마이그레이션 가이드는 [문서](https://adorablecss.github.io/v2/migration)를 참조하세요.

## 📚 Documentation

### Core Documentation
- **[Documentation Index](./docs/INDEX.md)** - 전체 문서 구조와 가이드
- **[API Reference](./docs/REFERENCE.md)** - 완전한 유틸리티 클래스 레퍼런스
- **[Product Strategy](./docs/PRODUCT_STRATEGY.md)** - 제품 비전과 로드맵

### Key Documents
- **[Core Concepts](./docs/technical/CORE_CONCEPTS_VISUAL.md)** - Figma-first 핵심 개념
- **[Brand Design](./docs/brand/BRAND_DESIGN_CONCEPT.md)** - 브랜드 철학과 디자인 언어
- **[Syntax Updates](./docs/technical/SYNTAX_UPDATES.md)** - 최신 문법 변경사항

### Online Resources
Visit [adorablecss.com](https://adorablecss.com) for:
- Interactive playground
- Migration guides  
- Video tutorials

## Development

```bash
# Clone repository
git clone https://github.com/developer-1px/adorable-css-v2

# Install dependencies (pnpm required)
pnpm install

# Start development
pnpm dev:homepage

# Run tests
pnpm test

# Build for production
pnpm build
```

## Why AdorableCSS v2?

1. **Design-Development Unity**: Same mental model as Figma
2. **No Learning Curve**: If you know Figma, you know AdorableCSS
3. **Performance**: 12KB typical production bundle
4. **Type Safety**: Full TypeScript support with IntelliSense
5. **Framework Agnostic**: Works with React, Vue, Svelte, or vanilla HTML

## 🌟 Showcase

v2를 사용하는 프로젝트들:
- 🎨 Design System Templates
- 📱 Mobile-First Components
- 🖥️ Dashboard Layouts
- 🛍️ E-commerce UI Kit

## 🤝 Contributing

AdorableCSS v2는 오픈소스 프로젝트입니다. 기여를 환영합니다!

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🔗 Links

- [Documentation](https://adorablecss.github.io/v2)
- [Playground](https://adorablecss.github.io/v2/playground)
- [GitHub](https://github.com/developer-1px/adorable-css-v2)
- [v1 Repository](https://github.com/developer-1px/adorable-css)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/developer-1px">developer-1px</a></p>
  <p>🤖 Powered by <a href="https://claude.ai/code">Claude Code</a></p>
</div>