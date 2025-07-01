# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Product Strategy & Vision

**Core Concept**: "Figma-first + Built-in Design System CSS Framework"

### Key Philosophy
- **CSS Native Values**: scale(1.05), opacity(0.5) - CSS 사양을 그대로 따름
- **Figma Auto Layout Mapping**: hbox(), vbox(), w(fill), w(hug) 등 직관적 매핑
- **Integration-First**: CSS Framework 한계를 인정하고 기존 생태계와 시너지 창출

### Development Priorities
1. **Priority 1 (3개월)**: 상태 스타일링, Form 시스템, 의미론적 컴포넌트
2. **Priority 2 (3개월)**: CSS-only 인터랙션, 고급 애니메이션, 타이포그래피
3. **Priority 3 (3개월)**: 접근성, Print, 최신 CSS 기능

### 📚 Documentation Structure
- **[docs/INDEX.md](./docs/INDEX.md)** - 전체 문서 구조 가이드
- **[docs/PRODUCT_STRATEGY.md](./docs/PRODUCT_STRATEGY.md)** - 메인 전략 문서  
- **[docs/REFERENCE.md](./docs/REFERENCE.md)** - API 레퍼런스

## Architecture Overview

### Monorepo Structure
This is a **pnpm workspace** monorepo with three main packages:

- **`packages/adorable-css-core`** - Core CSS framework (published as `adorable-css`)
  - Parser system with custom tokenizer and AST
  - Rule system with priority-based registration
  - Design token system with auto-injection
  - Extension/plugin architecture
  
- **`packages/adorable-css-cdn`** - Browser-ready CDN distribution
  - Depends on core package
  - Provides UMD builds for direct browser usage
  
- **`packages/homepage-kit`** - Documentation site (private)
  - Built with SvelteKit 5
  - MDX support for documentation
  - Interactive playground and demos

### Core Library Architecture
```
packages/adorable-css-core/src/
├── core/           # Core parsing and runtime
│   ├── parser/     # Tokenizer and CSS generation
│   ├── runtime/    # Auto-injection system
│   └── values/     # Value transformation utilities
├── rules/          # CSS rule definitions
│   ├── layout/     # Display, grid, flexbox, spacing
│   ├── style/      # Colors, typography, borders
│   ├── position/   # Positioning and layer system
│   ├── interaction/# Cursor, transitions, animations
│   └── effects/    # Transforms, filters, backdrop
├── design-system/  # Design tokens and themes
│   ├── colors/     # OKLCH-based color system
│   ├── tokens/     # Spacing, typography, shadows
│   └── keyframes/  # Animation definitions
├── extensions/     # Plugin system
│   ├── animations/ # Animation utilities
│   └── responsive/ # Responsive utilities
└── components/     # Pre-built patterns
    ├── primitives/ # Button, card, heading
    ├── patterns/   # Container, prose, section
    └── features/   # Glass, glow, interactive
```

[... rest of the existing content remains the same ...]

## Important Memories
- **TailwindCSS Memory**: tailwindCSS와 제발 헷갈리지마 우리는 adorable-css-v2를 만들고 있어
- **Development Communication**: 항상 중간중간이라도 뭔가 보여줄 수 있는걸 먼저해줘
- **Page Design Commitment**: 지금부터 홈페이지의 모든 페이지 디자인은 adorable-css-v2 component만으로 만들거야.
- 언제나 내가 볼수 있는걸 먼저 세팅하고 조금씩 점진적으로 내가 볼 수 있도록 해줘 한번에 다 만들려고 하지 말고
- 지금부터는 코드를 더 간결하고 simple하고 코드 수를 줄이는 방향으로 작업할거야

[... rest of the existing content remains the same ...]